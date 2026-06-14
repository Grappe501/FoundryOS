/** Level 3 — shelf gap analysis vs theme ideal */

import { getBottle } from '../bourbon-level-1/bottles';
import { getShelfTheme, type ShelfTheme } from './shelf-themes';
import { getShelfRoleLabel, type ShelfRole } from './shelf-slots';

export type GapResult = {
  theme: ShelfTheme;
  ownedSlugs: string[];
  filledRoles: ShelfRole[];
  missingRoles: ShelfRole[];
  extraBottles: { slug: string; name: string; note: string }[];
  redundantMash: string | null;
  priceSpread: { min: number; max: number; avg: number };
  recommendations: string[];
};

export function analyzeShelfGap(themeId: string, ownedSlugs: string[]): GapResult | null {
  const theme = getShelfTheme(themeId);
  if (!theme) return null;

  const ownedSet = new Set(ownedSlugs);
  const idealRoles = theme.bottles.map((b) => b.role);
  const filledRoles = idealRoles.filter((role) =>
    theme.bottles.some((b) => b.role === role && ownedSet.has(b.bottleSlug)),
  );
  const missingRoles = [...new Set(idealRoles.filter((r) => !filledRoles.includes(r)))];

  const idealSlugs = new Set(theme.bottles.map((b) => b.bottleSlug));
  const extraBottles = ownedSlugs
    .filter((s) => !idealSlugs.has(s))
    .map((slug) => {
      const b = getBottle(slug);
      return { slug, name: b?.name ?? slug, note: 'Not in theme — redundancy or personal pick?' };
    });

  const ownedBottles = ownedSlugs.map((s) => getBottle(s)).filter(Boolean);
  const mashCounts: Record<string, number> = {};
  for (const b of ownedBottles) {
    if (!b) continue;
    mashCounts[b.mashbill] = (mashCounts[b.mashbill] ?? 0) + 1;
  }
  const dupMash = Object.entries(mashCounts).find(([, n]) => n >= 3);
  const redundantMash = dupMash ? `Three+ ${dupMash[0]} bottles — consider category or proof fork instead.` : null;

  const prices = ownedBottles.map((b) => b!.priceUsd);
  const priceSpread = {
    min: prices.length ? Math.min(...prices) : 0,
    max: prices.length ? Math.max(...prices) : 0,
    avg: prices.length ? Math.round(prices.reduce((a, b) => a + b, 0) / prices.length) : 0,
  };

  const recommendations: string[] = [];
  for (const role of missingRoles) {
    const ideal = theme.bottles.find((b) => b.role === role);
    if (ideal) recommendations.push(`Add ${getShelfRoleLabel(role)}: ${getBottle(ideal.bottleSlug)?.name ?? ideal.bottleSlug}`);
  }
  if (redundantMash) recommendations.push(redundantMash);
  if (theme.gapPrompt) recommendations.push(theme.gapPrompt);

  return {
    theme,
    ownedSlugs,
    filledRoles: [...new Set(filledRoles)],
    missingRoles,
    extraBottles,
    redundantMash,
    priceSpread,
    recommendations,
  };
}
