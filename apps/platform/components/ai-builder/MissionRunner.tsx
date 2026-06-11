'use client';

import type { AiBuilderMission } from '../../lib/ai-builder-world';
import { WorldMissionRunner } from '../world/WorldMissionRunner';

const PORTFOLIO_KEY = 'foundry-ai-portfolio';

export type PortfolioEntry = {
  missionSlug: string;
  missionTitle: string;
  completedAt: string;
  reflection: string;
};

export function getPortfolio(): PortfolioEntry[] {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(PORTFOLIO_KEY) ?? '[]') as PortfolioEntry[];
  } catch {
    return [];
  }
}

export function MissionRunner({ mission }: { mission: AiBuilderMission }) {
  return (
    <WorldMissionRunner
      mission={mission}
      portfolioKey={PORTFOLIO_KEY}
      basePath="/ai-builder"
      pathSlug="ai-builder"
      portfolioLabel="My AI Portfolio"
    />
  );
}
