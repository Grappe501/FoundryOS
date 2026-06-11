import { PS_MISSIONS } from '../../../lib/public-speaking-world';
import { WorldMissionTracks } from '../../../components/world/WorldMissionTracks';

export const metadata = { title: 'Missions | Public Speaking' };

export default function MissionsPage() {
  return <WorldMissionTracks missions={PS_MISSIONS} basePath="/public-speaking" accent="#6B8BB8" />;
}
