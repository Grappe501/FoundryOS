import { getWorldDepthOrThrow } from '../../../lib/world-depth/registry';
import { WorldParentDepth } from '../../../components/world-depth/WorldParentDepth';

export default function ParentsPage() {
  const bundle = getWorldDepthOrThrow('civic-engagement');
  return <WorldParentDepth bundle={bundle} />;
}
