import { getWorldDepthOrThrow } from '../../../lib/world-depth/registry';
import { WorldParentDepth } from '../../../components/world-depth/WorldParentDepth';

export default function ParentsPage() {
  const bundle = getWorldDepthOrThrow('public-speaking');
  return <WorldParentDepth bundle={bundle} />;
}
