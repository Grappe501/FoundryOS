'use client';

import { useTheme } from './ThemeProvider';

type Props = {
  compact?: boolean;
};

export function ThemeToggle({ compact = false }: Props) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Light mode' : 'Dark mode'}
      className="foundry-theme-toggle"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: compact ? 0 : 6,
        padding: compact ? '6px 10px' : '6px 12px',
        fontSize: compact ? 14 : 12,
        borderRadius: 6,
        border: '1px solid var(--foundry-border)',
        background: 'var(--foundry-surface)',
        color: 'var(--foundry-text-muted)',
        cursor: 'pointer',
        lineHeight: 1,
      }}
    >
      <span aria-hidden>{isDark ? '☀' : '☾'}</span>
      {!compact && <span>{isDark ? 'Light' : 'Dark'}</span>}
    </button>
  );
}
