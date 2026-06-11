import { notFound } from 'next/navigation';
import { WorldMissionShell } from '../../../../components/world-experience/WorldMissionShell';
import { BOURBON_MISSIONS, BOURBON_PORTFOLIO_KEY, BOURBON_PORTFOLIO_LABEL, getBourbonMission } from '../../../../lib/bourbon-world';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return BOURBON_MISSIONS.map((m) => ({ slug: m.slug }));
}

export default async function BourbonMissionPage({ params }: Props) {
  const { slug } = await params;
  const mission = getBourbonMission(slug);
  if (!mission) notFound();

  return (
    <WorldMissionShell
      worldSlug="bourbon"
      mission={mission}
      portfolioKey={BOURBON_PORTFOLIO_KEY}
      basePath="/bourbon"
      portfolioLabel={BOURBON_PORTFOLIO_LABEL}
    />
  );
}
