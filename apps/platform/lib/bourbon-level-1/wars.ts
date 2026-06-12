export type DistilleryWar = {
  slug: string;
  title: string;
  a: { producerSlug: string; name: string; flagship: string; mashbill: string; proof: string; value: string; bargain: string; premium: string };
  b: { producerSlug: string; name: string; flagship: string; mashbill: string; proof: string; value: string; bargain: string; premium: string };
  verdict: string;
};

export const DISTILLERY_WARS: DistilleryWar[] = [
  {
    slug: 'buffalo-trace-vs-heaven-hill',
    title: 'Buffalo Trace vs Heaven Hill',
    a: { producerSlug: 'buffalo-trace', name: 'Buffalo Trace', flagship: 'Buffalo Trace', mashbill: 'Low rye BT mash #1', proof: '90', value: 'Strong daily pours; hype on allocated bottles', bargain: 'Evan Williams comparison unfair — BT is the bargain here', premium: 'Eagle Rare, Weller line' },
    b: { producerSlug: 'heaven-hill', name: 'Heaven Hill', flagship: 'Evan Williams Black', mashbill: 'Traditional HH recipe', proof: '86–100 range', value: 'Best price-to-quality ratio in bourbon', bargain: 'Evan Williams BiB at ~$15', premium: 'Elijah Craig Barrel Proof' },
    verdict: 'Trace wins romance and allocated hunting; Heaven Hill wins weekly shelf value. Most enthusiasts need both houses represented.',
  },
  {
    slug: 'makers-vs-wild-turkey',
    title: "Maker's Mark vs Wild Turkey",
    a: { producerSlug: 'makers-mark', name: "Maker's Mark", flagship: "Maker's Mark", mashbill: 'Wheated — red winter wheat', proof: '90', value: 'Hosting and giftability', bargain: "Maker's Mark itself", premium: "Maker's 46" },
    b: { producerSlug: 'wild-turkey', name: 'Wild Turkey', flagship: 'Wild Turkey 101', mashbill: 'High rye', proof: '101', value: 'Bold flavor per dollar', bargain: '101', premium: "Russell's Reserve Single Barrel" },
    verdict: 'Wheat vs rye in one comparison. Sweet crowd-pleaser vs spice benchmark — your Bourbon DNA often starts here.',
  },
  {
    slug: 'four-roses-vs-woodford',
    title: 'Four Roses vs Woodford Reserve',
    a: { producerSlug: 'four-roses', name: 'Four Roses', flagship: 'Yellow Label / Single Barrel', mashbill: 'High rye (multiple recipes)', proof: '80–100', value: 'Fruit and spice education', bargain: 'Yellow Label', premium: 'Single Barrel OBSV picks' },
    b: { producerSlug: 'woodford-reserve', name: 'Woodford Reserve', flagship: 'Woodford Reserve', mashbill: 'Traditional, pot still character', proof: '90.4', value: 'Premium mouthfeel and presentation', bargain: 'Woodford standard', premium: 'Double Oaked' },
    verdict: 'Four Roses teaches mash bill variation; Woodford teaches texture and polish. Different lessons, not a clear winner.',
  },
  {
    slug: 'jim-beam-vs-old-forester',
    title: 'Jim Beam vs Old Forester',
    a: { producerSlug: 'jim-beam', name: 'Jim Beam', flagship: 'White Label / Knob Creek', mashbill: 'Traditional Beam', proof: '80–100+', value: 'Scale and consistency', bargain: 'Beam White Label', premium: "Booker's" },
    b: { producerSlug: 'old-forester', name: 'Old Forester', flagship: '86 Proof / 1920', mashbill: 'Traditional Brown-Forman', proof: '86–115', value: 'Vertical tasting within one brand', bargain: 'Old Forester 86', premium: '1920 Prohibition Style' },
    verdict: 'Beam owns volume; Old Forester owns brand story depth. Old Forester Whiskey Row series is one of the best self-contained curricula in bourbon.',
  },
];

export function getWar(slug: string): DistilleryWar | undefined {
  return DISTILLERY_WARS.find((w) => w.slug === slug);
}
