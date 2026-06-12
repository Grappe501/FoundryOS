import { FI_MISSIONS } from '../../../lib/financial-independence-world';
import { FI_IMMERSION } from '../../../lib/immersion/worlds/financial-independence';
import { WorldMissionTracks } from '../../../components/world/WorldMissionTracks';

export const metadata = { title: 'Missions | Financial Independence' };

export default function MissionsPage() {
  return <WorldMissionTracks missions={FI_MISSIONS} basePath="/financial-independence" accent="var(--foundry-primary)" />;
}
