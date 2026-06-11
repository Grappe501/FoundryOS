export type SupabaseEnv = {
  url: string;
  anonKey: string;
  serviceRoleKey?: string;
};

const PLACEHOLDER_PATTERNS = [
  'your-project.supabase.co',
  'your-anon-key',
  'your-service-role-key',
];

function isPlaceholder(value: string | undefined): boolean {
  if (!value) return true;
  return PLACEHOLDER_PATTERNS.some((p) => value.includes(p));
}

export function getSupabaseEnv(): SupabaseEnv | null {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (isPlaceholder(url) || isPlaceholder(anonKey)) return null;

  return {
    url: url!,
    anonKey: anonKey!,
    serviceRoleKey: isPlaceholder(serviceRoleKey) ? undefined : serviceRoleKey,
  };
}

export function isSupabaseConfigured(): boolean {
  return getSupabaseEnv() !== null;
}
