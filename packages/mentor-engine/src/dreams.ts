/** PASS-034A — Dream mapping (what you want) */

export type DreamWant = {
  slug: string;
  label: string;
  mentorHook: string;
};

export const DREAM_WANTS: DreamWant[] = [
  { slug: 'make-money', label: 'Make more money', mentorHook: 'revenue and value creation' },
  { slug: 'start-business', label: 'Start a business', mentorHook: 'validation before scale' },
  { slug: 'build-software', label: 'Build software', mentorHook: 'shipping real tools' },
  { slug: 'speak-confidently', label: 'Speak confidently', mentorHook: 'reps over charisma' },
  { slug: 'community-leader', label: 'Become a community leader', mentorHook: 'organizing and voice' },
  { slug: 'understand-investing', label: 'Understand investing', mentorHook: 'compound growth habits' },
  { slug: 'financial-freedom', label: 'Achieve financial freedom', mentorHook: 'options and security' },
  { slug: 'create-art', label: 'Master a craft obsession', mentorHook: 'depth over consumption' },
  { slug: 'help-others', label: 'Help others become better', mentorHook: 'mentorship and teaching' },
  { slug: 'civic-impact', label: 'Make civic impact', mentorHook: 'how power actually works' },
];

export function getDream(slug: string): DreamWant | undefined {
  return DREAM_WANTS.find((d) => d.slug === slug);
}
