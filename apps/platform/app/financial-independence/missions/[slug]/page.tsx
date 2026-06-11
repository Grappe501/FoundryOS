import { notFound } from 'next/navigation';
import { WorldMissionShell } from '../../../../components/world-experience/WorldMissionShell';
import { FI_MISSIONS, FI_PORTFOLIO_KEY, getFiMission } from '../../../../lib/financial-independence-world';
import { getWorldExperienceConfig } from '../../../../lib/world-experience/registry';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return FI_MISSIONS.map((m) => ({ slug: m.slug }));
}

export default async function MissionPage({ params }: Props) {
  const { slug } = await params;
  const mission = getFiMission(slug);
  if (!mission) notFound();
  const label = getWorldExperienceConfig('financial-independence')?.portfolioLabel ?? 'My Wealth Portfolio';
  return <WorldMissionShell worldSlug="financial-independence" mission={mission} portfolioKey={FI_PORTFOLIO_KEY} basePath="/financial-independence" portfolioLabel={label} />;
}
