import { getWorldDepthOrThrow } from '../../../lib/world-depth/registry';
import { WorldParentDepth } from '../../../components/world-depth/WorldParentDepth';

export default function ParentsPage() {
  const bundle = getWorldDepthOrThrow('bbq');
  return <WorldParentDepth bundle={bundle} />;
}
