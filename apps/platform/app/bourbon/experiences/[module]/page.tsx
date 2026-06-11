import { getWorldExperienceConfig } from '../../../../lib/world-experience/registry';
import { WorldExperienceModulePage } from '../../../../components/world-experience/WorldExperiencesRoute';

type Props = { params: Promise<{ module: string }> };

export function generateStaticParams() {
  return (getWorldExperienceConfig('bourbon')?.modules ?? []).map((m) => ({ module: m.slug }));
}

export default async function ModulePage({ params }: Props) {
  const { module } = await params;
  return <WorldExperienceModulePage slug="bourbon" moduleSlug={module} />;
}
