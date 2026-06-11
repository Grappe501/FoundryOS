import { BBQ_MISSIONS } from '../../../lib/bbq-world';
import { WorldMissionTracks } from '../../../components/world/WorldMissionTracks';

export const metadata = { title: 'Missions | BBQ' };

export default function MissionsPage() {
  return <WorldMissionTracks missions={BBQ_MISSIONS} basePath="/bbq" accent="#C96B6B" subtitle="10 pitmaster experiences — cook logs, temps, competition, judging." />;
}
