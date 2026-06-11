import { POKER_MISSIONS } from '../../../lib/poker-world';
import { WorldMissionTracks } from '../../../components/world/WorldMissionTracks';

export const metadata = { title: 'Missions | Poker' };

export default function MissionsPage() {
  return <WorldMissionTracks missions={POKER_MISSIONS} basePath="/poker" accent="#6B9BC9" subtitle="10 strategic experiences — hand analysis, journal, bankroll, drills." />;
}
