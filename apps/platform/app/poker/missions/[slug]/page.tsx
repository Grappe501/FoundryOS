import { notFound } from 'next/navigation';
import { WorldMissionShell } from '../../../../components/world-experience/WorldMissionShell';
import { POKER_MISSIONS, POKER_PORTFOLIO_KEY, POKER_PORTFOLIO_LABEL, getPokerMission } from '../../../../lib/poker-world';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return POKER_MISSIONS.map((m) => ({ slug: m.slug }));
}

export default async function PokerMissionPage({ params }: Props) {
  const { slug } = await params;
  const mission = getPokerMission(slug);
  if (!mission) notFound();

  return (
    <WorldMissionShell worldSlug="poker" mission={mission} portfolioKey={POKER_PORTFOLIO_KEY} basePath="/poker" portfolioLabel={POKER_PORTFOLIO_LABEL} />
  );
}
