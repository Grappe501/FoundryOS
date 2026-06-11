/** Meta for ensureWorldCommunity during seed — avoids importing apps/platform from db */

export const COMMUNITY_WORLD_META: Record<
  string,
  { display_name: string; tagline: string; community_type: string }
> = {
  'ai-builder': {
    display_name: 'Foundry AI Lab',
    tagline: 'Build one useful AI workflow',
    community_type: 'lab',
  },
  'financial-independence': {
    display_name: 'Wealth Builders Circle',
    tagline: 'Save, earn, or invest challenge',
    community_type: 'circle',
  },
  'public-speaking': {
    display_name: 'Speaker Circle',
    tagline: '3-minute talk prompt',
    community_type: 'circle',
  },
  bourbon: {
    display_name: 'Central Arkansas Bourbon Society',
    tagline: 'Blind tasting',
    community_type: 'society',
  },
  bbq: {
    display_name: 'Pitmaster Collective',
    tagline: 'Cook and post results',
    community_type: 'collective',
  },
  poker: {
    display_name: 'Strategic Thinking Society',
    tagline: 'Analyze a hand',
    community_type: 'society',
  },
  'civic-engagement': {
    display_name: 'Civic Action Circle',
    tagline: 'Attend something · Learn something · Do something',
    community_type: 'circle',
  },
};
