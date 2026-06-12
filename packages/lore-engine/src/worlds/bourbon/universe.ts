import type { UniverseMapNode, FoundryOriginal } from '../../types';

export const BOURBON_UNIVERSE_MAP: UniverseMapNode[] = [
  { id: 'bourbon-center', label: 'Bourbon', angle: 0, distance: 0, tease: 'The native spirit — start here', body: 'American whiskey with rules, mythology, and a global cult following.', href: '/bourbon/lore' },
  { id: 'kentucky', label: 'Kentucky', angle: 0, distance: 1, tease: '95% of production, 100% of mythology', body: 'Limestone water, rickhouse rows, the Trail — the cathedral of bourbon.', href: '/bourbon/map' },
  { id: 'france', label: 'France', angle: 40, distance: 1, tease: 'House of Bourbon — the name before the whiskey', body: 'Bourbon County honors French royalty. The whiskey branch and Bourbon Street branch split here.', href: '/bourbon/origins' },
  { id: 'jazz', label: 'Jazz', angle: 80, distance: 1.1, tease: 'Speakeasy culture and cocktail craft', body: 'Prohibition pushed bourbon into hidden bars — jazz, rye cocktails, and rebellion.', href: '/bourbon/pop-culture' },
  { id: 'derby', label: 'Horse Racing', angle: 120, distance: 1, tease: 'Mint juleps and Derby rituals', body: 'The Kentucky Derby made the julep a national symbol — bourbon as celebration.', href: '/bourbon/pop-culture' },
  { id: 'prohibition', label: 'Prohibition', angle: 160, distance: 1.15, tease: '1920–1933 — who survived?', body: 'Six medicinal permit holders. Inventory aged in silence. The industry rebuilt different.', href: '/bourbon/lore#lore-timeline' },
  { id: 'politics', label: 'Politics', angle: 200, distance: 1.2, tease: '1964 — America\'s Native Spirit', body: 'Congress declared bourbon distinctive — trade protection and national identity.', href: '/bourbon/lore#lore-timeline' },
  { id: 'river-trade', label: 'River Trade', angle: 240, distance: 1, tease: 'Ohio and Mississippi moved the barrels', body: 'Before rails, rivers shipped whiskey. Louisville and Frankfort grew from water access.', href: '/bourbon/connections' },
  { id: 'civil-war', label: 'Civil War', angle: 280, distance: 1.25, tease: 'Distilling paused, demand shifted', body: 'Corn abundance and post-war recovery shaped Kentucky production patterns.', href: '/bourbon/stories' },
  { id: 'cooperage', label: 'Cooperage', angle: 320, distance: 1.1, tease: 'Char, staves, and the hidden variable', body: 'New oak barrels — char level decides caramel vs tannin. Cooperage is half the flavor.', href: '/bourbon/lab' },
  { id: 'distilling-science', label: 'Distilling Science', angle: 350, distance: 1.3, tease: 'Mash, yeast, proof, entry', body: 'DSP numbers, barrel entry proof, rickhouse floor — science disguised as romance.', href: '/bourbon/x-ray' },
];

export const BOURBON_FOUNDRY_ORIGINALS: FoundryOriginal[] = [
  { id: 'motw-1', kind: 'mystery-of-week', title: 'Why did this barrel taste different?', body: 'Same mash, same house — floor 7 vs floor 1. One bottle wins blind. The other is "fine."' },
  { id: 'fd-1', kind: 'forgotten-distillery', title: 'Forgotten: Old Taylor Castle', body: 'A castle on the Kentucky River — ruins now, but the brand lived on through Sazerac. Ghost architecture, real juice history.' },
  { id: 'row-1', kind: 'rivalry-of-week', title: 'Rivalry: Wheated vs High-Rye', body: 'Maker\'s camp vs Turkey camp. Blind your friends. Watch marriages strain.' },
  { id: 'mb-1', kind: 'mythbuster', title: 'Mythbuster: Older is always better', body: 'False — often. Try 6yr vs 15yr blind. Oak can overwhelm. Age is data, not destiny.', href: '/bourbon/myths' },
  { id: 'lp-1', kind: 'legendary-pour', title: 'Legendary Pour: Wild Turkey 101', body: 'The $28 bottle that teaches proof, rye, and honesty. Everything else is optional.', href: '/bourbon/bottles/wild-turkey-101' },
];
