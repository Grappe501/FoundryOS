import { getDatabaseStatus, getLivePlatformCounts, isSupabaseConfigured } from '@foundry/db';

export type OperationsMetric = {
  key: string;
  label: string;
  value: string | number;
  status: 'live' | 'pending' | 'planned';
  note?: string;
};

/** Operations cockpit — scales before PASS-014 (Bourbon launch) */
export async function getOperationsMetrics(): Promise<{
  configured: boolean;
  db_connected: boolean;
  metrics: OperationsMetric[];
}> {
  const configured = isSupabaseConfigured();
  const [dbStatus, live] = configured
    ? await Promise.all([getDatabaseStatus(), getLivePlatformCounts()])
    : [null, null];

  const metrics: OperationsMetric[] = [
    {
      key: 'entities',
      label: 'Entities',
      value: live?.total_entities ?? 0,
      status: configured && dbStatus?.connected ? 'live' : 'pending',
    },
    {
      key: 'relationships',
      label: 'Relationships',
      value: live?.total_relationships ?? 0,
      status: configured && dbStatus?.connected ? 'live' : 'pending',
    },
    {
      key: 'collections',
      label: 'Collections',
      value: live?.total_collections ?? 0,
      status: configured && dbStatus?.connected ? 'live' : 'pending',
    },
    {
      key: 'ownership_links',
      label: 'Ownership Links',
      value: live?.total_user_entity_relationships ?? 0,
      status: configured && dbStatus?.connected ? 'live' : 'pending',
    },
    {
      key: 'users',
      label: 'Users',
      value: live?.users_registered ?? 0,
      status: configured && dbStatus?.connected ? 'live' : 'pending',
    },
    {
      key: 'reviews',
      label: 'Reviews',
      value: '—',
      status: 'planned',
      note: 'Live count after PASS-008',
    },
    {
      key: 'rankings',
      label: 'Rankings',
      value: '—',
      status: 'planned',
      note: 'Live count after PASS-008',
    },
    {
      key: 'storage',
      label: 'Storage Buckets',
      value: dbStatus?.storage_buckets?.length ?? 0,
      status: dbStatus?.storage_buckets?.length ? 'live' : 'pending',
      note: dbStatus?.storage_buckets?.join(', ') || 'entity-images, avatars',
    },
    {
      key: 'db_latency',
      label: 'DB Latency',
      value: dbStatus?.latency_ms != null ? `${dbStatus.latency_ms}ms` : '—',
      status: dbStatus?.connected ? 'live' : 'pending',
    },
    {
      key: 'db_size',
      label: 'DB Size',
      value: '—',
      status: 'planned',
      note: 'Supabase dashboard / PASS-009',
    },
    {
      key: 'ai_costs',
      label: 'AI Costs',
      value: '—',
      status: 'planned',
      note: 'PASS-006+ content factory',
    },
    {
      key: 'netlify_deploys',
      label: 'Netlify Deployments',
      value: '—',
      status: 'planned',
      note: 'Webhook integration PASS-009',
    },
  ];

  return {
    configured,
    db_connected: dbStatus?.connected ?? false,
    metrics,
  };
}
