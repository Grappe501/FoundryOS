import { notFound } from 'next/navigation';
import { WorldMissionShell } from '../../../../components/world-experience/WorldMissionShell';
import { CIVIC_ENGAGEMENT_MISSIONS, CIVIC_ENGAGEMENT_PORTFOLIO_KEY, CIVIC_ENGAGEMENT_PORTFOLIO_LABEL, getCivicEngagementMission } from '../../../../lib/civic-engagement-world';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return CIVIC_ENGAGEMENT_MISSIONS.map((m) => ({ slug: m.slug }));
}

export default async function MissionPage({ params }: Props) {
  const { slug } = await params;
  const mission = getCivicEngagementMission(slug);
  if (!mission) notFound();
  return (
    <WorldMissionShell
      worldSlug="civic-engagement"
      mission={mission}
      portfolioKey={CIVIC_ENGAGEMENT_PORTFOLIO_KEY}
      basePath="/civic-engagement"
      portfolioLabel={CIVIC_ENGAGEMENT_PORTFOLIO_LABEL}
    />
  );
}
