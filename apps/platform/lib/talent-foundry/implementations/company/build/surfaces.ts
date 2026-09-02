import type { ArtifactTrack } from '../spine/envelope';

export type BuildSurface = {
  id: string;
  track: ArtifactTrack | 'any';
  product: string;
  bound: string;
  theyDo: string;
};

/** Isolated sandbox benches. Not live FoundryOS. Not the campaign. */
export const BUILD_SURFACES: BuildSurface[] = [
  {
    id: 'B-build',
    track: 'build',
    product: 'Pulse fragment (sandbox)',
    bound: 'No production migrations. No live deploy.',
    theyDo: 'Delete is still the primary control on a copy of the fragment.',
  },
  {
    id: 'B-explain',
    track: 'explain',
    product: 'Bench note on the sandbox fragment',
    bound: 'No customer list. No public post.',
    theyDo: 'The risk line is still hidden. The fence is the send button.',
  },
  {
    id: 'B-investigate',
    track: 'investigate',
    product: 'Sandbox event log',
    bound: 'No production database. No secrets.',
    theyDo: 'One empty reason sits next to a feeling. Name what would count.',
  },
  {
    id: 'B-design',
    track: 'design',
    product: 'Pulse first-run (sandbox)',
    bound: 'Do not ship the palette. Do not touch the live door.',
    theyDo: 'Account and Danger still share a weight. Move one.',
  },
  {
    id: 'B-operate',
    track: 'operate',
    product: 'Owner board (sandbox)',
    bound: 'No deploy. No campaign route.',
    theyDo: 'Five lines. Two empty. The fence is the deploy button.',
  },
  {
    id: 'B-grow',
    track: 'grow',
    product: 'Notes path (sandbox)',
    bound: 'No blast to a live list.',
    theyDo: 'Post everywhere is still the draft. Name who receives the notes.',
  },
  {
    id: 'B-organize',
    track: 'organize',
    product: 'Handoff board (sandbox)',
    bound: 'No real cohort invite. No calendar hold.',
    theyDo: 'Both owners were told to go first. Pick the first move.',
  },
  {
    id: 'B-any',
    track: 'any',
    product: 'Sandbox bench',
    bound: 'No live systems. No pay implied.',
    theyDo: 'A real-shaped object sits inside a fence.',
  },
];

export function buildSurfaceFor(track: ArtifactTrack | null): BuildSurface {
  return BUILD_SURFACES.find((s) => s.track === track) ?? BUILD_SURFACES.find((s) => s.track === 'any')!;
}
