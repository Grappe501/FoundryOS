import Link from 'next/link';
import { WorldMissionRunner, type WorldMission } from '../world/WorldMissionRunner';
import { WorldMission1Premium } from './WorldMission1Premium';
import { getWorldExperienceConfig } from '../../lib/world-experience/registry';
import { getWorldAssets } from '../../lib/world-assets';

export function WorldMissionShell({
  worldSlug,
  mission,
  portfolioKey,
  basePath,
  portfolioLabel,
}: {
  worldSlug: string;
  mission: WorldMission;
  portfolioKey: string;
  basePath: string;
  portfolioLabel: string;
}) {
  const config = getWorldExperienceConfig(worldSlug);
  const assets = getWorldAssets(worldSlug);
  const isMission1 = config?.mission1Slug === mission.slug;

  return (
    <section style={{ marginTop: 16 }}>
      <Link href={`${basePath}/missions`} style={{ color: '#6B6B70', fontSize: 13, textDecoration: 'none' }}>
        ← All missions
      </Link>
      <p style={{ color: assets.accent, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 16 }}>
        Mission {mission.number}
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>{mission.title}</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12 }}>{mission.subtitle}</p>
      <section style={{ marginTop: 20, padding: 16, background: assets.cardBg, borderRadius: 8, border: `1px solid ${assets.heroBorder}` }}>
        <p style={{ color: assets.accent, fontSize: 13, margin: 0 }}>
          <strong style={{ fontWeight: 400 }}>Why this matters: </strong>
          {mission.futureProof}
        </p>
      </section>
      {isMission1 && <WorldMission1Premium slug={worldSlug} />}
      <WorldMissionRunner
        mission={mission}
        portfolioKey={portfolioKey}
        basePath={basePath}
        pathSlug={worldSlug}
        portfolioLabel={portfolioLabel}
      />
    </section>
  );
}
