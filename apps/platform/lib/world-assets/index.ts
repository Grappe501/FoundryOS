/** PASS-032B — Visual asset direction per world (no copyrighted brand assets) */

export type WorldAssetDirection = {
  slug: string;
  heroGradient: string;
  heroBorder: string;
  heroTexture: string;
  accent: string;
  accentMuted: string;
  cardBg: string;
  iconLanguage: string;
  photographyDirection: string;
  allowedSources: string[];
  forbidden: string[];
};

export const WORLD_ASSETS: Record<string, WorldAssetDirection> = {
  'ai-builder': {
    slug: 'ai-builder',
    heroGradient: 'linear-gradient(135deg, #0A1210 0%, #0F1A14 50%, #081410 100%)',
    heroBorder: '#2A4A3A',
    heroTexture: 'subtle circuit grid · terminal green glow',
    accent: '#6B9B6B',
    accentMuted: '#3A5A3A',
    cardBg: '#0F1412',
    iconLanguage: 'Minimal line icons · nodes, prompts, workflows',
    photographyDirection: 'Screenshots of real builds · no stock robots',
    allowedSources: ['original UI screenshots', 'abstract node diagrams', 'user project captures'],
    forbidden: ['OpenAI logo misuse', 'celebrity AI hype imagery'],
  },
  'financial-independence': {
    slug: 'financial-independence',
    heroGradient: 'linear-gradient(135deg, #0A0F14 0%, #101820 50%, #0A1018 100%)',
    heroBorder: '#2A3A5A',
    heroTexture: 'ledger lines · calm navy depth',
    accent: '#6B8BB8',
    accentMuted: '#3A4A6A',
    cardBg: '#0F1218',
    iconLanguage: 'Charts, ledgers, growth curves — restrained',
    photographyDirection: 'Clean desk setups · spreadsheets · no luxury flex',
    allowedSources: ['original charts', 'abstract finance graphics', 'licensed stock'],
    forbidden: ['Lamborghini wealth porn', 'crypto meme aesthetics'],
  },
  'public-speaking': {
    slug: 'public-speaking',
    heroGradient: 'linear-gradient(135deg, #12100A 0%, #1A160F 50%, #100E0A 100%)',
    heroBorder: '#4A4020',
    heroTexture: 'spotlight vignette · warm stage amber',
    accent: '#C8A96E',
    accentMuted: '#6A5A30',
    cardBg: '#14110F',
    iconLanguage: 'Mic, waveform, stage — elegant not corporate',
    photographyDirection: 'Empty stage light · speaker silhouette · no TED knockoff branding',
    allowedSources: ['original stage photography', 'waveform graphics', 'licensed stock'],
    forbidden: ['TED logo', 'celebrity speaker photos without license'],
  },
  bourbon: {
    slug: 'bourbon',
    heroGradient: 'linear-gradient(135deg, #141008 0%, #1A160F 40%, #0F0C08 100%)',
    heroBorder: '#4A4020',
    heroTexture: 'barrel stave grain · amber glass glow',
    accent: '#C8A96E',
    accentMuted: '#5A4A28',
    cardBg: '#12100C',
    iconLanguage: 'Abstract bottle silhouettes · tasting glass · flavor wheel',
    photographyDirection: 'Amber gradients · warehouse texture · NO brand bottle labels',
    allowedSources: [
      'original illustrations',
      'AI non-branded bottle silhouettes',
      'licensed stock tasting photography',
      'flavor-wheel graphics',
      'map-style distillery cards without logos',
    ],
    forbidden: [
      'Buffalo Trace, Maker\'s Mark, Weller official images',
      'any trademarked label photography without license',
      'celebrity bourbon photos',
    ],
  },
  bbq: {
    slug: 'bbq',
    heroGradient: 'linear-gradient(135deg, #140A08 0%, #1A100E 50%, #0F0806 100%)',
    heroBorder: '#4A3020',
    heroTexture: 'smoke wisps · charred wood grain',
    accent: '#B06B50',
    accentMuted: '#5A3828',
    cardBg: '#14100E',
    iconLanguage: 'Fire, thermometer, smoke — pitmaster craft',
    photographyDirection: 'Smoke and fire abstract · bark close-ups · no competition logos',
    allowedSources: ['original cook photos (user)', 'smoke textures', 'licensed stock fire'],
    forbidden: ['KCBS official logos', 'branded rub labels without permission'],
  },
  poker: {
    slug: 'poker',
    heroGradient: 'linear-gradient(135deg, #0A0C14 0%, #101420 50%, #080A10 100%)',
    heroBorder: '#3A4A6A',
    heroTexture: 'felt texture · chip edge highlights',
    accent: '#6B9BC9',
    accentMuted: '#3A4A5A',
    cardBg: '#0F1014',
    iconLanguage: 'Cards, chips, position diagrams — analytical not casino kitsch',
    photographyDirection: 'Green felt abstract · hand history diagrams · no casino branding',
    allowedSources: ['original hand diagrams', 'chip stack silhouettes', 'licensed stock'],
    forbidden: ['WSOP logos', 'PokerStars branding', 'celebrity player photos'],
  },
  'civic-engagement': {
    slug: 'civic-engagement',
    heroGradient: 'linear-gradient(135deg, #0A0E14 0%, #101620 50%, #080C12 100%)',
    heroBorder: '#2A4A5A',
    heroTexture: 'civic blueprint grid · town hall warmth',
    accent: '#6B9BB8',
    accentMuted: '#3A5A6A',
    cardBg: '#0F1216',
    iconLanguage: 'Ballot, map pin, gavel — civic not partisan',
    photographyDirection: 'Town halls · community meetings · no campaign logos',
    allowedSources: ['original civic graphics', 'map placeholders', 'licensed stock public meetings'],
    forbidden: ['party logos', 'candidate headshots without permission', 'trademarked campaign assets'],
  },
};

export function getWorldAssets(slug: string): WorldAssetDirection {
  return WORLD_ASSETS[slug] ?? WORLD_ASSETS['ai-builder']!;
}
