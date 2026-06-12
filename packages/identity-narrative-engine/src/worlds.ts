import type { InternalPhase, LiveNarrativeWorld } from './types';

export type WorldNarrativeConfig = {
  world_slug: LiveNarrativeWorld;
  world_name: string;
  mentor_name: string;
  topic_phrases: Record<string, string>;
  topic_keywords: Record<string, string[]>;
  origins: Record<InternalPhase, string[]>;
  mentor_notices: Record<InternalPhase, string[]>;
  recognitions: Record<'shaping' | 'guiding', string[]>;
  default_next: { label: string; href: string; reason: string };
  topic_next: Record<string, { label: string; href: string; reason: string }>;
};

export const WORLD_NARRATIVE_CONFIGS: Record<LiveNarrativeWorld, WorldNarrativeConfig> = {
  bourbon: {
    world_slug: 'bourbon',
    world_name: 'Bourbon',
    mentor_name: 'Clay · Bourbon Steward',
    topic_keywords: {
      allocation: ['weller', 'allocation', 'ghost', 'scarcity'],
      bib: ['bib', 'bottled-in-bond', 'bond'],
      wheated: ['wheated', 'makers', 'weller'],
      detective: ['detective', 'case', 'mystery'],
      heritage: ['prohibition', 'history', 'origins', 'kentucky'],
      producers: ['buffalo', 'heaven', 'distillery', 'producer'],
    },
    topic_phrases: {
      allocation: 'allocation economics and the stories behind scarce bottles',
      bib: 'bottled-in-bond history and label transparency',
      wheated: 'wheated mash bills and soft-spice profiles',
      detective: 'investigating label claims instead of trusting hype',
      heritage: 'Kentucky heritage and how prohibition shaped modern shelves',
      producers: 'producer houses and who actually makes the juice',
    },
    origins: {
      curious: ['You began by exploring bourbon casually — curious what the fuss was about.'],
      practicing: ['You started with pours and vocabulary, learning to name what you taste.'],
      shaping: ['You moved from random bottles to intentional choices — your shelf tells a story.'],
      guiding: ['You have been building taste and context long enough that friends notice.'],
    },
    mentor_notices: {
      curious: ['Your mentor notices curiosity more than confidence — that is the right place to start.'],
      practicing: ['Your mentor believes you are developing palate vocabulary, not just collecting labels.'],
      shaping: ['Your mentor believes you are developing the instincts of a collector rather than a casual enthusiast.'],
      guiding: ['Your mentor sees someone others could learn from — not because you know everything, but because you notice what beginners miss.'],
    },
    recognitions: {
      shaping: ['People are beginning to trust your recommendations when bottles come up.'],
      guiding: ['You have become the person your friends ask before buying bourbon.'],
    },
    default_next: {
      label: 'Open today in Bourbon',
      href: '/bourbon/today',
      reason: 'See what is happening in the world this week.',
    },
    topic_next: {
      allocation: {
        label: 'Investigate the Stitzel-Weller mystery',
        href: '/bourbon/detective/weller-ghost',
        reason: 'You keep circling allocation — this case connects the dots.',
      },
      bib: {
        label: 'Take the BiB detective case',
        href: '/bourbon/detective/bib-guarantee',
        reason: 'Your interest in bonded whiskey deserves evidence, not lore alone.',
      },
      wheated: {
        label: 'Explore wheated on the Atlas',
        href: '/bourbon/atlas/wheated-bourbon',
        reason: 'Name the softness before the next pour.',
      },
      detective: {
        label: 'Close another detective case',
        href: '/bourbon/detective',
        reason: 'Your investigative instinct is active — follow it.',
      },
    },
  },
  'ai-builder': {
    world_slug: 'ai-builder',
    world_name: 'AI Builder',
    mentor_name: 'Builder Coach',
    topic_keywords: {
      automation: ['automat', 'workflow', 'script', 'homework'],
      product: ['product', 'ship', 'deploy', 'project'],
      prompts: ['prompt', 'lab', 'token'],
    },
    topic_phrases: {
      automation: 'automations that save real time on boring tasks',
      product: 'shipping small products instead of endless demos',
      prompts: 'prompt craft as an instrument, not a magic spell',
    },
    origins: {
      curious: ['You started wondering whether AI could actually help — not just impress in a demo.'],
      practicing: ['You began building small things and noticing what works versus what feels like a toy.'],
      shaping: ['You are connecting tools into workflows that produce artifacts someone could use.'],
      guiding: ['You have shipped enough that others ask how you built it.'],
    },
    mentor_notices: {
      curious: ['Your mentor sees someone testing seriously — not chasing every new model headline.'],
      practicing: ['Your mentor believes you are learning builder judgment, not prompt memorization.'],
      shaping: ['Your mentor believes you are becoming someone who ships — not someone who collects tutorials.'],
      guiding: ['Your mentor sees a builder others could pair with on real problems.'],
    },
    recognitions: {
      shaping: ['Teammates and friends are starting to ask you which tools are worth the setup time.'],
      guiding: ['You have become the person people message before starting an automation project.'],
    },
    default_next: { label: 'Today in AI Builder', href: '/ai-builder/today', reason: 'Weekly challenge and spotlight.' },
    topic_next: {
      automation: {
        label: 'Accept the automation challenge',
        href: '/ai-builder/today',
        reason: 'Automate one boring task this week.',
      },
    },
  },
  'financial-independence': {
    world_slug: 'financial-independence',
    world_name: 'Financial Independence',
    mentor_name: 'Money Coach',
    topic_keywords: {
      budget: ['budget', 'track', 'dollar', 'spend'],
      invest: ['invest', 'index', 'stock', 'fund'],
      emergency: ['emergency', 'save', '1000'],
    },
    topic_phrases: {
      budget: 'tracking where money actually goes',
      invest: 'long-term investing discipline over hot tips',
      emergency: 'building a floor before chasing returns',
    },
    origins: {
      curious: ['You began by wanting clarity — not another finance lecture.'],
      practicing: ['You started logging decisions and naming tradeoffs out loud.'],
      shaping: ['You are building systems, not willpower — money behavior is becoming visible.'],
      guiding: ['You have enough evidence that others ask how you think about money.'],
    },
    mentor_notices: {
      curious: ['Your mentor sees honesty about money — that matters more than perfect spreadsheets.'],
      practicing: ['Your mentor believes you are building awareness before optimization.'],
      shaping: ['Your mentor believes you are developing investor temperament, not ticker obsession.'],
      guiding: ['Your mentor sees someone who could walk a friend through their first budget without shame.'],
    },
    recognitions: {
      shaping: ['People are beginning to trust your take on spending versus investing tradeoffs.'],
      guiding: ['You have become the person friends ask before a big financial decision.'],
    },
    default_next: { label: 'Today in FI', href: '/financial-independence/today', reason: 'Weekly debate and challenge.' },
    topic_next: {
      budget: { label: 'Track every dollar for 7 days', href: '/financial-independence/today', reason: 'Evidence beats intention.' },
    },
  },
  'public-speaking': {
    world_slug: 'public-speaking',
    world_name: 'Public Speaking',
    mentor_name: 'Speech Coach',
    topic_keywords: {
      nerves: ['nerv', 'record', 'talk', 'speak'],
      story: ['story', 'arc', 'audience'],
    },
    topic_phrases: {
      nerves: 'working through nerves with reps, not avoidance',
      story: 'stories that land instead of slides that hide',
    },
    origins: {
      curious: ['You began by wanting words to work when the room is watching.'],
      practicing: ['You started recording, revising, and naming what felt false.'],
      shaping: ['You are developing a voice — not a performance, a point of view.'],
      guiding: ['You have stood up enough times that others notice your clarity.'],
    },
    mentor_notices: {
      curious: ['Your mentor sees courage in showing up — that is the hard part.'],
      practicing: ['Your mentor believes you are learning clarity, not memorization.'],
      shaping: ['Your mentor believes you are becoming someone who moves rooms, not just fills time.'],
      guiding: ['Your mentor sees a speaker others would want on their stage.'],
    },
    recognitions: {
      shaping: ['People are beginning to ask you to explain things they find confusing.'],
      guiding: ['You have become the person your group asks to introduce the topic.'],
    },
    default_next: { label: 'Today in Public Speaking', href: '/public-speaking/today', reason: 'Weekly rivalry and challenge.' },
    topic_next: {
      nerves: { label: 'Record one short talk', href: '/public-speaking/today', reason: 'Reps beat theory.' },
    },
  },
  'civic-engagement': {
    world_slug: 'civic-engagement',
    world_name: 'Civic Engagement',
    mentor_name: 'Civic Guide',
    topic_keywords: {
      meetings: ['meeting', 'board', 'public', 'comment'],
      local: ['local', 'state', 'school'],
    },
    topic_phrases: {
      meetings: 'public meetings and where decisions actually get made',
      local: 'local versus state power — who does what',
    },
    origins: {
      curious: ['You began by asking where power lives — not who to blame on social media.'],
      practicing: ['You started attending, reading agendas, and naming processes.'],
      shaping: ['You are connecting institutions to outcomes you care about.'],
      guiding: ['You have participated enough that others ask how to get involved.'],
    },
    mentor_notices: {
      curious: ['Your mentor sees civic curiosity — the antidote to cynicism.'],
      practicing: ['Your mentor believes you are learning systems, not slogans.'],
      shaping: ['Your mentor believes you are becoming an informed participant, not a spectator.'],
      guiding: ['Your mentor sees someone who could bring a friend to their first meeting.'],
    },
    recognitions: {
      shaping: ['People are beginning to trust your read on what meetings matter.'],
      guiding: ['You have become the person your circle asks about local decisions.'],
    },
    default_next: { label: 'Today in Civic', href: '/civic-engagement/today', reason: 'Weekly challenge and debate.' },
    topic_next: {
      meetings: { label: 'Watch one public meeting', href: '/civic-engagement/today', reason: 'Presence beats opinion.' },
    },
  },
  bbq: {
    world_slug: 'bbq',
    world_name: 'BBQ',
    mentor_name: 'Pitmaster Coach',
    topic_keywords: {
      brisket: ['brisket', 'stall', 'smoke'],
      log: ['cook', 'log', 'butt', 'pork'],
    },
    topic_phrases: {
      brisket: 'brisket patience and smoke ring myths',
      log: 'logging cooks so mistakes become data',
    },
    origins: {
      curious: ['You began with fire and curiosity — wanting smoke that earns its time.'],
      practicing: ['You started logging cooks and naming what changed between attempts.'],
      shaping: ['You are building a cookbook in your head — temperature, wood, timing.'],
      guiding: ['You have fed enough people that they ask for your rub notes.'],
    },
    mentor_notices: {
      curious: ['Your mentor sees respect for the stall — that separates tourists from cooks.'],
      practicing: ['Your mentor believes you are learning fire management, not recipe chasing.'],
      shaping: ['Your mentor believes you are becoming a pitmaster-in-spirit, not a weekend dabbler.'],
      guiding: ['Your mentor sees someone who could run the cook without panic.'],
    },
    recognitions: {
      shaping: ['People are beginning to trust your call on when to wrap.'],
      guiding: ['You have become the person your group asks to run the pit.'],
    },
    default_next: { label: 'Today in BBQ', href: '/bbq/today', reason: 'Weekly challenge and rivalry.' },
    topic_next: {
      log: { label: 'Log one cook this week', href: '/bbq/today', reason: 'Memory starts with a written cook.' },
    },
  },
  poker: {
    world_slug: 'poker',
    world_name: 'Poker',
    mentor_name: 'Strategy Coach',
    topic_keywords: {
      hands: ['hand', 'review', 'fold', 'gto'],
      bankroll: ['bankroll', 'session', 'tournament'],
    },
    topic_phrases: {
      hands: 'hand review discipline over hero calls',
      bankroll: 'bankroll reality over ego games',
    },
    origins: {
      curious: ['You began wanting to understand why good players fold winning hands.'],
      practicing: ['You started reviewing sessions instead of replaying bad beats.'],
      shaping: ['You are building strategy vocabulary — position, ranges, discipline.'],
      guiding: ['You have run enough hands that your table trusts your reads.'],
    },
    mentor_notices: {
      curious: ['Your mentor sees someone asking the right questions — not chasing heaters.'],
      practicing: ['Your mentor believes you are learning discipline, not trick plays.'],
      shaping: ['Your mentor believes you are becoming a strategist, not a gambler with vocabulary.'],
      guiding: ['Your mentor sees someone who could host a home game with structure.'],
    },
    recognitions: {
      shaping: ['People are beginning to trust your read on table dynamics.'],
      guiding: ['You have become the person your league asks to review tricky hands.'],
    },
    default_next: { label: 'Today in Poker', href: '/poker/today', reason: 'Weekly GTO vs exploitative debate.' },
    topic_next: {
      hands: { label: 'Review ten hands', href: '/poker/today', reason: 'Evidence beats intuition.' },
    },
  },
};

export function getWorldNarrativeConfig(slug: string): WorldNarrativeConfig | undefined {
  return WORLD_NARRATIVE_CONFIGS[slug as LiveNarrativeWorld];
}
