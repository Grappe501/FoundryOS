import { getWorldDepthOrThrow } from '../../../lib/world-depth/registry';
import { WorldCommunityDepth } from '../../../components/world-depth/WorldCommunityDepth';

export default function CommunityPage() {
  const bundle = getWorldDepthOrThrow('poker');
  return <WorldCommunityDepth bundle={bundle} />;
}
