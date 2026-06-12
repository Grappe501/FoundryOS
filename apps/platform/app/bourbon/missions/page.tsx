import { BOURBON_MISSIONS } from '../../../lib/bourbon-world';
import { WorldMissionTracks } from '../../../components/world/WorldMissionTracks';

export const metadata = { title: 'Missions | Bourbon' };

export default function MissionsPage() {
  return <WorldMissionTracks missions={BOURBON_MISSIONS} basePath="/bourbon" accent="var(--foundry-primary)" subtitle="10 steward experiences — tastings, journals, travel, pairings." />;
}
