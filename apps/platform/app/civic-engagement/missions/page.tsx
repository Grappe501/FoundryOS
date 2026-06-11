import { CIVIC_ENGAGEMENT_MISSIONS } from '../../../lib/civic-engagement-world';
import { WorldMissionTracks } from '../../../components/world/WorldMissionTracks';

export const metadata = { title: 'Missions | Civic Engagement' };

export default function MissionsPage() {
  return (
    <WorldMissionTracks
      missions={CIVIC_ENGAGEMENT_MISSIONS}
      basePath="/civic-engagement"
      accent="#6B9BC9"
      subtitle="15 missions — voting, local government, advocacy, organizing, leadership. One of Foundry's most differentiated worlds."
    />
  );
}
