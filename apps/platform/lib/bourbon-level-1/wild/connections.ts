/** Bourbon Connections Graph — explore the universe, not a course */

export type ConnectionNode = {
  id: string;
  label: string;
  tease: string;
  href?: string;
};

export type ConnectionEdge = {
  from: string;
  to: string;
  label: string;
};

export const CONNECTION_NODES: ConnectionNode[] = [
  { id: 'bourbon', label: 'Bourbon', tease: 'You are here', href: '/bourbon/level-1' },
  { id: 'kentucky', label: 'Kentucky', tease: 'Limestone, corn, rickhouses', href: '/bourbon/map' },
  { id: 'france', label: 'France · House of Bourbon', tease: 'The name before the whiskey', href: '/bourbon/origins' },
  { id: 'new-orleans', label: 'New Orleans', tease: 'Bourbon Street — not the drink', href: '/bourbon/wild/bourbon-street' },
  { id: 'horse-racing', label: 'Horse Racing', tease: 'Derby, juleps, tailgates', href: '/bourbon/pop-culture#sports' },
  { id: 'jazz', label: 'Jazz', tease: 'French Quarter nights', href: '/bourbon/wild/new-orleans-jazz' },
  { id: 'prohibition', label: 'Prohibition', tease: 'Medicinal permits & near-death', href: '/bourbon/stories/prohibition' },
  { id: 'american-history', label: 'American History', tease: 'Revolutionary allies & counties', href: '/bourbon/origins' },
  { id: 'country-music', label: 'Country Music', tease: 'Lyrics, lore, honky-tonks', href: '/bourbon/pop-culture#music' },
  { id: 'distilleries', label: 'Distilleries', tease: '12 houses deep dive', href: '/bourbon/producers' },
  { id: 'agriculture', label: 'Agriculture · Corn', tease: 'Why mash bills start here', href: '/bourbon/lab' },
  { id: 'movies', label: 'Movies & TV', tease: 'Justified, Kingsman, Lost in Translation', href: '/bourbon/pop-culture#movies' },
  { id: 'presidents', label: 'Presidents', tease: 'State dinners & preferences', href: '/bourbon/pop-culture#politics' },
  { id: 'bbq', label: 'BBQ & Smoke', tease: 'Pairing nights', href: '/bourbon/pairings' },
  { id: 'speaking', label: 'Public Speaking', tease: 'Host a tasting with narrative', href: '/public-speaking' },
];

export const CONNECTION_EDGES: ConnectionEdge[] = [
  { from: 'bourbon', to: 'kentucky', label: 'spiritual home' },
  { from: 'bourbon', to: 'france', label: 'namesake' },
  { from: 'bourbon', to: 'distilleries', label: 'where it is made' },
  { from: 'bourbon', to: 'agriculture', label: '51% corn' },
  { from: 'bourbon', to: 'prohibition', label: 'survived' },
  { from: 'bourbon', to: 'horse-racing', label: 'Derby culture' },
  { from: 'bourbon', to: 'country-music', label: 'lyric shorthand' },
  { from: 'bourbon', to: 'movies', label: 'pop culture' },
  { from: 'bourbon', to: 'presidents', label: 'politics' },
  { from: 'bourbon', to: 'bbq', label: 'pairing' },
  { from: 'france', to: 'new-orleans', label: 'colonial honor' },
  { from: 'france', to: 'american-history', label: 'Revolutionary ally' },
  { from: 'new-orleans', to: 'jazz', label: 'French Quarter' },
  { from: 'kentucky', to: 'horse-racing', label: 'Churchill Downs' },
  { from: 'horse-racing', to: 'bourbon', label: 'mint julep' },
  { from: 'distilleries', to: 'kentucky', label: 'campus tours' },
  { from: 'bourbon', to: 'speaking', label: 'host narrative' },
];

export function getConnectedNodes(nodeId: string): ConnectionNode[] {
  const linked = new Set<string>();
  for (const e of CONNECTION_EDGES) {
    if (e.from === nodeId) linked.add(e.to);
    if (e.to === nodeId) linked.add(e.from);
  }
  return CONNECTION_NODES.filter((n) => linked.has(n.id));
}

export function getNode(id: string): ConnectionNode | undefined {
  return CONNECTION_NODES.find((n) => n.id === id);
}
