import type { WorldLoreBundle } from '../types';

export const PUBLIC_SPEAKING_LORE: WorldLoreBundle = {
  world_slug: 'public-speaking',
  world_name: 'Public Speaking',
  tagline: 'What great communicators overcame — not TED worship.',
  heroes: [
    {
      id: 'teacher',
      name: 'The classroom teacher',
      tagline: 'Twenty years of explaining hard things simply.',
      obsession: 'Clarity over charisma — if the confused student nods, the room is won.',
      failure: 'First years: talking too fast, reading slides, fear of silence.',
      breakthrough: 'Learned to pause — silence became authority, not awkwardness.',
      whyMatters: 'Most great speakers are teachers who never left the classroom mindset.',
    },
    {
      id: 'advocate',
      name: 'The civic advocate',
      tagline: 'Two minutes at the mic that changed a vote.',
      obsession: 'One clear ask — not three paragraphs of context.',
      failure: 'Lost the room by leading with data instead of story.',
      breakthrough: 'Opened with a neighbor\'s name. Closed with the vote. Won.',
      whyMatters: 'Speaking is not performance — it is transfer of belief.',
    },
  ],
  rivalries: [
    {
      id: 'extemp-vs-prepared',
      title: 'Extemporaneous vs Prepared',
      sideA: { label: 'Extemporaneous', argument: 'Authentic, responsive, alive — risk and reward.' },
      sideB: { label: 'Prepared', argument: 'Structure, polish, respect for audience time.' },
      foundryTake: 'Prepare deeply; deliver as if extemporaneous. Rehearsal enables spontaneity.',
      href: '/public-speaking/missions',
    },
  ],
  mysteries: [
    {
      id: 'confidence-source',
      question: 'Where does confidence actually come from?',
      tease: 'Not personality — repetition.',
      answer: 'Reps. Recorded review. Small audiences before large ones. Confidence follows evidence.',
    },
  ],
  pilgrimages: [
    { id: 'first-talk', title: 'First 3-minute talk', description: 'One message, one audience, recorded.', href: '/public-speaking/missions/first-talk', legendaryObjectId: 'first-recorded-talk' },
    { id: 'fifty', title: 'First audience of 50', description: 'The room gets real when you cannot see every face.', href: '/public-speaking/missions' },
    { id: 'keynote', title: 'First keynote length (20+ min)', description: 'Structure, stories, and stamina.', href: '/public-speaking/portfolio' },
  ],
  controversies: [
    { id: 'slides', debate: 'Slides or no slides?', campA: 'Slides anchor structure.', campB: 'Slides become crutches — speak to humans.', whyItEndures: 'Every format has a context. Context is the answer.' },
  ],
  secrets: [
    { id: 'repetition', headline: 'Confidence follows repetition — not the other way around.', body: 'You do not feel ready, then speak. You speak, review, repeat — then feel ready.', whyFeelsSecret: 'Audiences assume confidence is innate. It is inventory.' },
    { id: 'pause', headline: 'Silence is a tool.', body: 'A two-second pause after a point feels like ten — and lands like a hammer.', whyFeelsSecret: 'Nervous speakers fill silence; masters use it.' },
  ],
  timeline: [
    { year: 'Ancient', title: 'Rhetoric born', body: 'Greece — persuasion as teachable craft.' },
    { year: '1900s', title: 'Toastmasters & clubs', body: 'Repetition culture democratized.' },
    { year: '2000s', title: 'TED era', body: 'Ideas worth spreading — and 18-minute discipline.' },
  ],
  whyMatters: [
    { topic: 'Nerves', notThis: 'Calm down.', insteadThis: 'Nerves are energy — structure converts them into presence.', body: 'Every steward was once terrified. Reps are the only medicine.' },
  ],
  experienceBeyond: [
    { id: 'room', factor: 'Room acoustics & mic', why: 'Bad sound defeats good content.', tip: 'Arrive early. Test mic. Speak to the back row once.' },
    { id: 'body', factor: 'Breath & posture', why: 'Shallow breath fuels shaky voice.', tip: 'Exhale before first word. Feet planted. Shoulders down.' },
  ],
};
