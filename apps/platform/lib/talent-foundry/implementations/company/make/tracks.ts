import type { ArtifactTrack } from '../spine/envelope';
import type { ThinkingMove } from '../types';

export type MakeTrackSeed = {
  id: ArtifactTrack;
  /** Interest routing label — never assigned as a personality type. */
  attractor: string;
  job: string;
  definitionOfDone: string;
  surfaces: ThinkingMove[];
};

export const MAKE_TRACKS: MakeTrackSeed[] = [
  {
    id: 'build',
    attractor: 'BUILD',
    job: 'The first-run screen still offers Delete as the way to start. Write the smallest fix: what the primary control should say, and what happens when someone presses it.',
    definitionOfDone: 'One primary label + one sentence for what the control does. No extra screens.',
    surfaces: ['revise', 'explain', 'finish'],
  },
  {
    id: 'explain',
    attractor: 'EXPLAIN',
    job: 'A note hid a legal review inside a ship instruction. Rewrite it so a new person would see the risk without being told to stay quiet.',
    definitionOfDone: 'A short note another person could act on. The risk is visible.',
    surfaces: ['reframe', 'explain', 'handoff'],
  },
  {
    id: 'investigate',
    attractor: 'INVESTIGATE',
    job: 'A draft was replaced because Continue had no copy. Return two concrete reasons that fail could happen on a real bench.',
    definitionOfDone: 'Two reasons, each specific enough to check. Not a vibe.',
    surfaces: ['constraint_seek', 'question', 'finish'],
  },
  {
    id: 'design',
    attractor: 'DESIGN',
    job: 'Danger zone sits at the same weight as Account. Say what you would change first in the hierarchy, and why that first.',
    definitionOfDone: 'The first change + why it is first. Not a full redesign.',
    surfaces: ['first_mark', 'assertion', 'finish'],
  },
  {
    id: 'operate',
    attractor: 'OPERATE',
    job: 'Turn the last-draft mess into a five-line plan. Each line has one owner.',
    definitionOfDone: 'Five lines. One owner per line. Someone could run it tomorrow.',
    surfaces: ['scope_cut', 'handoff', 'finish'],
  },
  {
    id: 'grow',
    attractor: 'GROW',
    job: 'A copy of last night’s notes was saved. Name one credible way the person who needed those notes actually receives them.',
    definitionOfDone: 'One path, named audience, named channel. Not “post everywhere.”',
    surfaces: ['explain', 'decide', 'finish'],
  },
  {
    id: 'organize',
    attractor: 'ORGANIZE',
    job: 'Two people think they own Publish. Sequence the next hour so they stop colliding.',
    definitionOfDone: 'An order of actions with who goes first. No new titles.',
    surfaces: ['handoff', 'help', 'finish'],
  },
];

export function makeTrack(id: ArtifactTrack): MakeTrackSeed {
  const found = MAKE_TRACKS.find((t) => t.id === id);
  if (!found) throw new Error(`unknown make track: ${id}`);
  return found;
}
