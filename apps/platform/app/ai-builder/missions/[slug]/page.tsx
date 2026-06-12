import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MissionRunner } from '../../../../components/ai-builder/MissionRunner';
import { WorldMission1Premium } from '../../../../components/world-experience/WorldMission1Premium';
import { AI_BUILDER_MISSIONS, getMission } from '../../../../lib/ai-builder-world';
import { getWorldExperienceConfig } from '../../../../lib/world-experience/registry';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return AI_BUILDER_MISSIONS.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const mission = getMission(slug);
  if (!mission) return { title: 'Mission not found' };
  return { title: `${mission.title} | AI Builder World` };
}

export default async function MissionPage({ params }: Props) {
  const { slug } = await params;
  const mission = getMission(slug);
  if (!mission) notFound();
  const isMission1 = getWorldExperienceConfig('ai-builder')?.mission1Slug === slug;

  return (
    <section style={{ marginTop: 16 }}>
      <Link href="/ai-builder/missions" style={{ color: '#6B6B70', fontSize: 13, textDecoration: 'none' }}>
        ← All missions
      </Link>
      <p style={{ color: '#6B9B6B', fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 16 }}>
        Mission {mission.number}
      </p>
      <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 8 }}>{mission.title}</h1>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12 }}>{mission.subtitle}</p>
      <section style={{ marginTop: 20, padding: 16, background: '#1A160F', borderRadius: 8, border: '1px solid #4A4020' }}>
        <p style={{ color: 'var(--foundry-primary)', fontSize: 13, margin: 0 }}>
          <strong style={{ fontWeight: 400 }}>Why this matters: </strong>
          {mission.futureProof}
        </p>
      </section>
      {isMission1 && <WorldMission1Premium slug="ai-builder" />}
      <MissionRunner mission={mission} />
    </section>
  );
}
