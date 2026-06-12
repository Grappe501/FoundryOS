export type PairingPick = {
  food: string;
  slug: string;
  bourbons: { name: string; bottleSlug: string; why: string }[];
  lessonSlug?: string;
};

export const BOURBON_PAIRINGS: PairingPick[] = [
  { food: 'Steak', slug: 'steak', bourbons: [{ name: 'Wild Turkey 101', bottleSlug: 'wild-turkey-101', why: 'Rye spice cuts through fat; 101 proof stands up to char.' }, { name: 'Knob Creek 9 Year', bottleSlug: 'knob-creek-9', why: 'Oak and caramel echo grill marks.' }], lessonSlug: 'first-nosing-ritual' },
  { food: 'BBQ', slug: 'bbq', bourbons: [{ name: 'Four Roses Yellow Label', bottleSlug: 'four-roses-yellow', why: 'Fruit and spice complement smoke without fighting sauce.' }, { name: '1792 Small Batch', bottleSlug: '1792-small-batch', why: 'Pepper notes pair with black pepper rub.' }], lessonSlug: 'first-nosing-ritual' },
  { food: 'Dark Chocolate', slug: 'chocolate', bourbons: [{ name: 'Woodford Reserve', bottleSlug: 'woodford-reserve', why: 'Cocoa and dried fruit bridge bitter chocolate.' }, { name: 'Old Forester 1920', bottleSlug: 'old-forester-1920', why: 'Cherry and chocolate at high proof — decadent.' }] },
  { food: 'Cigar', slug: 'cigar', bourbons: [{ name: "Booker's", bottleSlug: 'bookers', why: 'Barrel proof intensity matches full-bodied smoke.' }, { name: 'Old Forester 1920', bottleSlug: 'old-forester-1920', why: 'Leather and oak parallel maduro wrappers.' }] },
  { food: 'Aged Cheese', slug: 'cheese', bourbons: [{ name: 'Eagle Rare 10', bottleSlug: 'eagle-rare', why: 'Vanilla and toffee soften sharp cheddar.' }, { name: "Michter's US*1", bottleSlug: 'michters-us1', why: 'Silky texture with creamy blues.' }] },
  { food: 'Pecan Pie', slug: 'dessert', bourbons: [{ name: "Maker's Mark", bottleSlug: 'makers-mark', why: 'Wheated sweetness mirrors nutty caramel.' }, { name: 'Buffalo Trace', bottleSlug: 'buffalo-trace', why: 'Classic vanilla-corn dessert bridge.' }] },
];
