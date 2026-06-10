/**
 * Design tokens — CSS custom properties for theming.
 * Per-category overrides via theme_config from database.
 */
export const tokens = {
  colors: {
    background: 'var(--foundry-bg, #0A0A0B)',
    surface: 'var(--foundry-surface, #141416)',
    surfaceElevated: 'var(--foundry-surface-elevated, #1C1C1F)',
    border: 'var(--foundry-border, #2A2A2E)',
    text: 'var(--foundry-text, #F0F0F2)',
    textMuted: 'var(--foundry-text-muted, #8A8A8E)',
    primary: 'var(--foundry-primary, #C8A96E)',
    accent: 'var(--foundry-accent, #E8D5B0)',
    success: 'var(--foundry-success, #4ADE80)',
    warning: 'var(--foundry-warning, #FBBF24)',
    error: 'var(--foundry-error, #F87171)',
  },
  fonts: {
    sans: 'var(--foundry-font-sans, "Inter", system-ui, sans-serif)',
    mono: 'var(--foundry-font-mono, "JetBrains Mono", monospace)',
  },
  radius: {
    sm: '4px',
    md: '8px',
    lg: '12px',
    xl: '16px',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '24px',
    xl: '32px',
    '2xl': '48px',
  },
} as const;
