import { notFound } from 'next/navigation';
import { WorldMissionShell } from '../../../../components/world-experience/WorldMissionShell';
import { BBQ_MISSIONS, BBQ_PORTFOLIO_KEY, BBQ_PORTFOLIO_LABEL, getBbqMission } from '../../../../lib/bbq-world';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BBQ_MISSIONS.map((m) => ({ slug: m.slug }));
}

export default async function MissionPage({ params }: Props) {
  const { slug } = await params;
  const mission = getBbqMission(slug);
  if (!mission) notFound();
  return <WorldMissionShell worldSlug="bbq" mission={mission} portfolioKey={BBQ_PORTFOLIO_KEY} basePath="/bbq" portfolioLabel={BBQ_PORTFOLIO_LABEL} />;
}
