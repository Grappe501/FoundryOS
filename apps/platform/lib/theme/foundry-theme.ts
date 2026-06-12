/**
 * Foundry brand colors — CSS custom properties are the runtime source of truth.
 *
 * TEMPORARY (PASS-040B2): primary is blue so deploys are visually obvious.
 * Revert `--foundry-primary` in globals.css to var(--foundry-primary) next round.
 */
export const FOUNDRY_PRIMARY = '#4A90D9';
export const FOUNDRY_PRIMARY_CSS = 'var(--foundry-primary)';
export const FOUNDRY_ACCENT = '#7CB4F0';

/** Bourbon gold — restore as primary when this pass marker ends */
export const FOUNDRY_PRIMARY_GOLD = 'var(--foundry-primary)';
