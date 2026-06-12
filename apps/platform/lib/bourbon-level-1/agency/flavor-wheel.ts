export const FLAVOR_WHEEL_NOTES = [
  'vanilla',
  'caramel',
  'oak',
  'fruit',
  'nut',
  'honey',
  'spice',
  'cherry',
  'chocolate',
  'smoke',
  'floral',
  'leather',
] as const;

export type FlavorNote = (typeof FLAVOR_WHEEL_NOTES)[number];

export type FlavorWheelProfile = {
  notes: Partial<Record<FlavorNote, number>>;
  updatedAt: string;
};

export function emptyFlavorWheel(): FlavorWheelProfile {
  return { notes: {}, updatedAt: new Date().toISOString() };
}

export function topFlavorNotes(profile: FlavorWheelProfile, n = 5): FlavorNote[] {
  return (Object.entries(profile.notes) as [FlavorNote, number][])
    .sort((a, b) => b[1] - a[1])
    .slice(0, n)
    .map(([note]) => note);
}

export function flavorWheelSummary(profile: FlavorWheelProfile): string {
  const top = topFlavorNotes(profile, 4);
  if (top.length === 0) return 'Drag flavors to build your personal profile — saved into Bourbon DNA.';
  return `Your wheel emphasizes ${top.join(', ')}. This feeds your DNA flavor lean.`;
}
