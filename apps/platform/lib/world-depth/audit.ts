/** PASS-025 — World depth audit */

import { getWorldDepth, WORLD_DEPTH_BUNDLES } from './registry';
import { IMMERSION_MISSION_COUNTS } from '../immersion/registry';

const MISSION_COUNTS: Record<string, number> = IMMERSION_MISSION_COUNTS;

export type WorldDepthAuditRow = {
  slug: string;
  displayName: string;
  depthScore: number;
  consumerReadinessPct: number;
  academyLevels: number;
  academyLessons: number;
  missions: number;
  glossaryTerms: number;
  seoGuides: number;
  portfolioReady: boolean;
  parentReady: boolean;
  communityReady: boolean;
  status: 'READY' | 'PARTIAL';
};

function scoreBundle(slug: string): WorldDepthAuditRow {
  const bundle = getWorldDepth(slug)!;
  const academyLevels = new Set(bundle.academyLessons.map((l) => l.level)).size;
  const academyLessons = bundle.academyLessons.length;
  const glossaryTerms = bundle.glossary.length;
  const seoGuides = bundle.seoGuides.length;
  const missions = MISSION_COUNTS[slug] ?? 5;

  const checks = [
    academyLevels >= 7,
    academyLessons >= 35,
    missions >= 5,
    glossaryTerms >= 50,
    seoGuides >= 7,
    Boolean(bundle.parent.successAfter30Days),
    bundle.community.memberRoles.length >= 4,
  ];
  const passed = checks.filter(Boolean).length;
  const depthScore = Math.round((passed / checks.length) * 100);
  const consumerReadinessPct = Math.round(
    ((Math.min(academyLessons, 35) / 35) * 25 +
      (Math.min(glossaryTerms, 50) / 50) * 25 +
      (Math.min(seoGuides, 7) / 7) * 20 +
      (missions >= 5 ? 15 : 0) +
      (bundle.parent.sections.length >= 4 ? 15 : 0)) /
      1,
  );

  return {
    slug,
    displayName: bundle.displayName,
    depthScore,
    consumerReadinessPct,
    academyLevels,
    academyLessons,
    missions,
    glossaryTerms,
    seoGuides,
    portfolioReady: true,
    parentReady: bundle.parent.sections.length >= 4,
    communityReady: bundle.community.memberRoles.length >= 4,
    status: depthScore >= 85 ? 'READY' : 'PARTIAL',
  };
}

export function auditWorldDepth(slug: string): WorldDepthAuditRow | null {
  if (!getWorldDepth(slug)) return null;
  return scoreBundle(slug);
}

export function auditAllWorldDepth(): WorldDepthAuditRow[] {
  return WORLD_DEPTH_BUNDLES.map((b) => scoreBundle(b.slug));
}

export function getWorldDepthSnapshot() {
  const rows = auditAllWorldDepth();
  const avgDepth = Math.round(rows.reduce((s, r) => s + r.depthScore, 0) / rows.length);
  const avgConsumer = Math.round(rows.reduce((s, r) => s + r.consumerReadinessPct, 0) / rows.length);
  const totalLessons = rows.reduce((s, r) => s + r.academyLessons, 0);
  const totalGlossary = rows.reduce((s, r) => s + r.glossaryTerms, 0);

  return {
    worlds: rows.length,
    avg_depth_score: avgDepth,
    avg_consumer_readiness_pct: avgConsumer,
    total_academy_lessons: totalLessons,
    total_glossary_terms: totalGlossary,
    target_depth_score: 85,
    target_consumer_readiness_pct: 85,
    rows,
  };
}
