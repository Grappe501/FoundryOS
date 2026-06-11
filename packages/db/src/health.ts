import { createAnonClient, createServiceClient } from './client';
import { isSupabaseConfigured } from './env';

export type DatabaseStatus = {
  configured: boolean;
  connected: boolean;
  latency_ms: number | null;
  project_url: string | null;
  service_role_available: boolean;
  error: string | null;
  tables: Record<string, number | null>;
  rls_checks: RlsCheck[];
  storage_buckets: string[];
  migrations_applied: boolean;
};

export type RlsCheck = {
  table: string;
  anon_readable: boolean;
  note: string;
};

const CORE_TABLES = [
  'verticals',
  'topics',
  'entities',
  'entity_relationships',
  'user_entity_relationships',
  'collections',
  'platform_metrics',
  'content_pages',
  'transformation_loops',
] as const;

async function countTable(
  client: ReturnType<typeof createServiceClient>,
  table: string
): Promise<number | null> {
  if (!client) return null;
  const { count, error } = await client.from(table).select('*', { count: 'exact', head: true });
  if (error) return null;
  return count ?? 0;
}

async function checkAnonRead(table: string): Promise<boolean> {
  const anon = createAnonClient();
  if (!anon) return false;
  const { error } = await anon.from(table).select('*', { head: true, count: 'exact' });
  return !error;
}

export async function getDatabaseStatus(): Promise<DatabaseStatus> {
  const base: DatabaseStatus = {
    configured: isSupabaseConfigured(),
    connected: false,
    latency_ms: null,
    project_url: process.env.NEXT_PUBLIC_SUPABASE_URL ?? null,
    service_role_available: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    error: null,
    tables: {},
    rls_checks: [],
    storage_buckets: [],
    migrations_applied: false,
  };

  if (!base.configured) {
    base.error = 'Supabase keys not configured — copy .env.example to .env.local';
    return base;
  }

  const service = createServiceClient();
  const anon = createAnonClient();

  const pingClient = service ?? anon;
  if (!pingClient) {
    base.error = 'Could not create Supabase client';
    return base;
  }

  const start = Date.now();
  const { error: pingError } = await pingClient.from('platform_metrics').select('metric_key').limit(1);
  base.latency_ms = Date.now() - start;

  if (pingError) {
    base.error = pingError.message;
    return base;
  }

  base.connected = true;
  base.migrations_applied = true;

  const countClient = service ?? anon;
  for (const table of CORE_TABLES) {
    base.tables[table] = await countTable(countClient, table);
  }

  base.rls_checks = [
    {
      table: 'platform_metrics',
      anon_readable: await checkAnonRead('platform_metrics'),
      note: 'Mission Control public metrics',
    },
    {
      table: 'entities',
      anon_readable: await checkAnonRead('entities'),
      note: 'Published entities only via RLS',
    },
    {
      table: 'user_entity_relationships',
      anon_readable: await checkAnonRead('user_entity_relationships'),
      note: 'Should be false without auth (ownership graph protected)',
    },
    {
      table: 'content_pages',
      anon_readable: await checkAnonRead('content_pages'),
      note: 'Published + score >= threshold only',
    },
  ];

  if (service) {
    const { data: buckets } = await service.storage.listBuckets();
    base.storage_buckets = (buckets ?? []).map((b) => b.name);
  }

  return base;
}

async function metricCount(
  client: NonNullable<ReturnType<typeof createAnonClient>>,
  key: string
): Promise<number | null> {
  const { data, error } = await client
    .from('platform_metrics')
    .select('metric_value')
    .eq('metric_key', key)
    .maybeSingle();
  if (error || !data?.metric_value) return null;
  const value = data.metric_value as { count?: number };
  return typeof value.count === 'number' ? value.count : null;
}

export async function getLivePlatformCounts(): Promise<{
  total_entities: number;
  total_collections: number;
  total_relationships: number;
  total_user_entity_relationships: number;
  topics_seeded: number;
  verticals_seeded: number;
  users_registered: number;
} | null> {
  const service = createServiceClient();
  const anon = createAnonClient();
  const client = service ?? anon;
  if (!client) return null;

  const [
    entities,
    collections,
    entityRels,
    userEntityRels,
    topics,
    verticals,
    profiles,
    entitiesMetric,
    collectionsMetric,
    relationshipsMetric,
    uerMetric,
    topicsMetric,
    verticalsMetric,
  ] = await Promise.all([
    countTable(client, 'entities'),
    countTable(client, 'collections'),
    countTable(client, 'entity_relationships'),
    countTable(client, 'user_entity_relationships'),
    countTable(client, 'topics'),
    countTable(client, 'verticals'),
    countTable(client, 'user_profiles'),
    metricCount(client, 'total_entities'),
    metricCount(client, 'total_collections'),
    metricCount(client, 'total_relationships'),
    metricCount(client, 'total_user_entity_relationships'),
    metricCount(client, 'total_topics'),
    metricCount(client, 'total_verticals'),
  ]);

  return {
    total_entities: entities ?? entitiesMetric ?? 0,
    total_collections: collections ?? collectionsMetric ?? 0,
    total_relationships: entityRels ?? relationshipsMetric ?? 0,
    total_user_entity_relationships: userEntityRels ?? uerMetric ?? 0,
    topics_seeded: topics ?? topicsMetric ?? 0,
    verticals_seeded: verticals ?? verticalsMetric ?? 0,
    users_registered: profiles ?? 0,
  };
}
