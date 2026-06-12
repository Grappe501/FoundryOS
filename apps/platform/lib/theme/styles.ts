/** Shared inline style tokens — prefer CSS classes where possible */

export const pageShell = {
  minHeight: '100vh',
  backgroundColor: 'var(--foundry-bg)',
  color: 'var(--foundry-text)',
  padding: '2rem',
  maxWidth: 960,
  margin: '0 auto',
} as const;

export const pageShellWide = { ...pageShell, maxWidth: 1100 } as const;

export const card = {
  background: 'var(--foundry-surface)',
  border: '1px solid var(--foundry-border-subtle)',
  borderRadius: 'var(--foundry-radius-md)',
} as const;

export const cardWarm = {
  ...card,
  border: '1px solid var(--foundry-border-warm)',
} as const;

export const eyebrow = {
  color: 'var(--foundry-primary)',
  fontSize: 11,
  letterSpacing: '0.12em',
  textTransform: 'uppercase' as const,
  margin: 0,
};

export const textMuted = { color: 'var(--foundry-text-muted)' };
export const textFaint = { color: 'var(--foundry-text-faint)' };
