import { notFound } from 'next/navigation';
import { WorldMissionShell } from '../../../../components/world-experience/WorldMissionShell';
import { PS_MISSIONS, PS_PORTFOLIO_KEY, getPsMission } from '../../../../lib/public-speaking-world';
import { getWorldExperienceConfig } from '../../../../lib/world-experience/registry';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return PS_MISSIONS.map((m) => ({ slug: m.slug }));
}

export default async function MissionPage({ params }: Props) {
  const { slug } = await params;
  const mission = getPsMission(slug);
  if (!mission) notFound();
  const label = getWorldExperienceConfig('public-speaking')?.portfolioLabel ?? 'My Speaking Portfolio';
  return <WorldMissionShell worldSlug="public-speaking" mission={mission} portfolioKey={PS_PORTFOLIO_KEY} basePath="/public-speaking" portfolioLabel={label} />;
}
