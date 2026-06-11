import type { IdentityDomain } from '../types';

export const PUBLIC_SPEAKING_DOMAIN: IdentityDomain = {
  slug: 'public-speaking',
  display_name: 'Public Speaking',
  tagline: 'From nervous to master communicator',
  category: 'skills',
  care_reason: 'Speaking transforms careers and communities — confidence compounds through practice, feedback, and mentorship.',
  paths: [
    'road-to-confident-speaker',
    'road-to-club-speaker',
    'road-to-keynote-speaker',
    'road-to-trainer',
    'road-to-master-communicator',
  ],
  projects: [
    'first-speech',
    'wedding-toast',
    'community-presentation',
    'conference-presentation',
    'ted-style-talk',
  ],
  community_types: ['Feedback circles', 'Practice clubs', 'Speaker mentorship'],
  legacy_signals: ['Talks delivered', 'Speakers coached', 'Curricula created'],
  status: 'exemplar',
};
