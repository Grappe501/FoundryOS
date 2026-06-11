/** Real markets — every one uses the same architecture */
export const REAL_MARKETS = [
  {
    slug: 'education',
    display_name: 'Education',
    segments: ['K–12', 'College', 'Trades', 'Professional development'],
  },
  {
    slug: 'career',
    display_name: 'Career Development',
    segments: ['Leadership', 'Management', 'Sales', 'Engineering', 'Campaigns', 'Entrepreneurship'],
  },
  {
    slug: 'hobby',
    display_name: 'Hobby Development',
    segments: ['Poker', 'Gardening', 'Chess', 'Magic', 'Photography'],
  },
  {
    slug: 'community',
    display_name: 'Community Development',
    segments: ['Clubs', 'Organizations', 'Associations', 'Professional societies'],
  },
  {
    slug: 'life',
    display_name: 'Life Development',
    segments: ['Parenting', 'Health', 'Fitness', 'Relationships', 'Faith', 'Service'],
  },
] as const;
