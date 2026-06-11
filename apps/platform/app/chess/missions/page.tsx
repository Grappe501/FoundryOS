import { CHESS_MISSIONS } from '../../../lib/chess-world';
import { CHESS_IMMERSION } from '../../../lib/immersion/worlds/chess';
import { WorldMissionTracks } from '../../../components/world/WorldMissionTracks';

export const metadata = { title: 'Missions | Chess' };

export default function ChessMissionsPage() {
  return (
    <WorldMissionTracks
      missions={CHESS_MISSIONS}
      basePath="/chess"
      accent="#8A9B7A"
      subtitle={`${CHESS_IMMERSION.missionTarget} missions — ${CHESS_IMMERSION.tracks.map((t) => t.label).join(', ')}.`}
    />
  );
}
