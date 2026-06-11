import { AI_BUILDER_MISSIONS } from '../../../lib/ai-builder-world';
import { AI_BUILDER_IMMERSION } from '../../../lib/immersion/worlds/ai-builder';
import { WorldMissionTracks } from '../../../components/world/WorldMissionTracks';

export const metadata = { title: 'Missions | AI Builder World' };

export default function MissionsPage() {
  return (
    <WorldMissionTracks
      missions={AI_BUILDER_MISSIONS}
      basePath="/ai-builder"
      subtitle="25 missions across 5 tracks — 50+ hours. Experiences you ship, not videos you watch."
    />
  );
}
