import { getWorldDepthOrThrow } from '../../../lib/world-depth/registry';
import { WorldLearnIndex } from '../../../components/world-depth/WorldLearnGuide';

export default function LearnIndexPage() {
  const bundle = getWorldDepthOrThrow('financial-independence');
  return <WorldLearnIndex bundle={bundle} basePath="/financial-independence" />;
}
