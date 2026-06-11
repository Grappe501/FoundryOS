/** PASS-025 — Public Speaking world depth bundle */

import { buildAcademyLessons } from '../build-academy';
import { buildGlossary } from '../build-glossary';
import type { WorldDepthBundle } from '../types';
import {
  PS_ACADEMY_LEVELS,
  PS_COMMUNITY,
  PS_PARENT_VIEW,
  PS_PORTFOLIO_SECTIONS,
} from '../../public-speaking-world';

export const PS_DEPTH: WorldDepthBundle = {
  slug: 'public-speaking',
  displayName: 'Public Speaking',
  accentColor: '#6B9B6B',
  portfolioLabel: 'My Speaking Portfolio',

  academyLessons: buildAcademyLessons(
    PS_ACADEMY_LEVELS.map((l) => ({
      level: l.level,
      title: l.title,
      tagline: l.tagline,
      missionSlug:
        l.level === 1
          ? 'first-talk'
          : l.level === 2
            ? 'record-review'
            : l.level === 3
              ? 'story-that-lands'
              : l.level === 4
                ? 'persuasive-presentation'
                : l.level === 5
                  ? 'lead-discussion'
                  : undefined,
    })),
    'Public Speaking',
  ),

  glossary: buildGlossary([
    ['Hook', 'Opening lines that grab attention in the first 15 seconds', 'Audiences decide fast — strong hooks buy you listening time', 'I failed my first speech so badly I hid in the bathroom — then I learned this.', ['Opening', 'Rhetoric']],
    ['Call to Action', 'Clear ask — what you want the audience to think, feel, or do after you speak', 'Persuasion without a CTA is entertainment only', 'Sign up for tutoring by Friday — here is the link and why it matters.', ['Persuasion', 'Closing']],
    ['Filler Words', 'Verbal habits like um, uh, like, you know — weaken clarity and authority', 'Recording missions exist to make these visible', 'Count ums in a 2-minute clip — aim to cut half next take', ['Pace', 'Rehearsal']],
    ['Pace', 'Speed of delivery — vary it to emphasize points and maintain attention', 'Monotone fast talk loses rooms; strategic pauses land ideas', 'Slow down for the lesson; speed up through familiar setup', ['Pause', 'Vocal Variety']],
    ['Facilitation', 'Guiding group discussion without dominating — questions, summaries, inclusion', 'Leadership is not always presenting — Mission 4 trains this', 'You talk 30% of the time; others carry the insight', ['Audience', 'Discussion']],
    ['Rhetoric', 'Art of persuasive communication — structure, ethos, pathos, logos', 'Framework behind every great talk and debate', 'Open with story (pathos), show data (logos), share credential (ethos)', ['Persuasion', 'Ethos']],
    ['Narrative Arc', 'Story shape: setup, tension, turn, resolution, lesson', 'Stories beat bullet lists for memory and emotion', 'Setup: lost the election. Tension: nobody listened. Turn: one coach. Lesson: ask better questions.', ['Storytelling', 'Hook']],
    ['Stage Presence', 'How you occupy space — posture, gestures, eye contact, energy', 'Confidence is visible before words land', 'Stand tall, feet planted, eyes on listeners not floor', ['Body Language', 'Eye Contact']],
    ['Opening', 'First 30 seconds — sets tone, topic, and reason to listen', 'Rewrite openings more than any other section', 'Three numbers that changed how I think about climate — and one you can fix today.', ['Hook', 'Thesis']],
    ['Closing', 'Final 30 seconds — reinforce takeaway and deliver call to action', 'Last words echo — weak closes waste strong middles', 'Remember one name, one story, one action — start with your neighbor.', ['Call to Action', 'Thesis']],
    ['Thesis', 'One-sentence main point the audience should remember', 'If you cannot state it, the talk is not ready', 'After my talk you will know why sleep beats cramming for tests.', ['Message', 'Outline']],
    ['Outline', 'Bullet structure — not a word-for-word script', 'Mission 1 format: hook, two points, close', 'Hook · Point A with example · Point B with example · Takeaway + CTA', ['Rehearsal', 'Extemporaneous']],
    ['Rehearsal', 'Practicing delivery out loud — alone, recorded, or with witness', 'Talks are performed, not written', 'Three out-loud runs before any recorded mission', ['Recording', 'Feedback']],
    ['Recording', 'Video or audio capture for self-review — fastest improvement tool', 'Mission 2 — see what audiences see', 'Phone at eye level, one take, watch without deleting', ['Feedback', 'Filler Words']],
    ['Feedback', 'Specific notes from self or others on what worked and what to fix', 'One tip from a listener beats ten vague compliments', 'Your opening was strong; pause after the statistic; hands out of pockets', ['Peer Coaching', 'Rehearsal']],
    ['Body Language', 'Nonverbal signals — stance, gestures, movement', 'Often louder than words for trust and energy', 'Open palms when inviting questions; stillness when landing key line', ['Stage Presence', 'Eye Contact']],
    ['Eye Contact', 'Looking at audience members or camera lens — builds connection', 'Scan the room or pick three anchor points on camera', 'Hold contact through the hook; avoid reading slides', ['Stage Presence', 'Authenticity']],
    ['Vocal Variety', 'Changes in pitch, volume, and tone to emphasize meaning', 'Voice Lab drills this deliberately', 'Whisper the setup; project the call to action', ['Pace', 'Projection']],
    ['Pause', 'Intentional silence — lets ideas land and kills filler', 'Feels long to you, perfect to audience', 'Stop talking after the question. Count two. Then answer.', ['Pace', 'Filler Words']],
    ['Projection', 'Speaking loudly enough to be heard clearly without shouting', 'Back-row test in classrooms and auditoriums', 'Imagine your voice reaching the last row — diaphragm not throat', ['Vocal Variety', 'Microphone']],
    ['Persuasion', 'Moving people to adopt a belief or take action', 'Mission 5 capstone — problem, stakes, solution, evidence, ask', 'Problem: litter on campus. Ask: adopt one bin per hall by Monday.', ['Call to Action', 'Rhetoric']],
    ['Storytelling', 'Using narrative to convey ideas — personal beats impressive', 'Mission 3 — real moments with tension and lesson', 'Tell the time you froze on stage — not a generic hero story', ['Narrative Arc', 'Anecdote']],
    ['Anecdote', 'Short personal story illustrating a point', 'Makes abstract ideas concrete', 'My grandmother taught me compound interest with a jar of coins', ['Storytelling', 'Hook']],
    ['Audience Analysis', 'Understanding who listens — age, interests, knowledge, needs', 'Same topic, different hooks for peers vs parents', 'Club members care about time; parents care about safety', ['Message', 'Demographics']],
    ['Message', 'Core idea stripped to one memorable sentence', 'Everything in the talk serves the message', 'Sleep is the cheapest performance enhancer you ignore', ['Thesis', 'Call to Action']],
    ['Transition', 'Bridge between sections — keeps talk flowing', 'Bad transitions confuse; good ones feel invisible', 'Now that you see the problem, here is what we can do this week.', ['Outline', 'Signpost']],
    ['Signpost', 'Verbal marker telling audience where you are in structure', 'Helps listeners follow without slides', 'First, the problem. Second, the proof. Third, your role.', ['Transition', 'Outline']],
    ['Impromptu Speaking', 'Delivering without script — brief prep or none', 'Useful for Q&A, meetings, and surprises', 'Point · Reason · Example · Wrap — 60 seconds on any prompt', ['Extemporaneous', 'Confidence']],
    ['Extemporaneous', 'Prepared outline, conversational delivery — not memorized word-for-word', 'Foundry default for missions — natural and adaptable', 'Know your bullets; speak fresh each time', ['Outline', 'Manuscript Speech']],
    ['Manuscript Speech', 'Read from full written text — precise but often flat', 'Know when required; usually not best for Foundry missions', 'Graduation speech read verbatim — safe but low energy', ['Extemporaneous', 'Outline']],
    ['Memorized Speech', 'Fully learned script — high risk, high reward for short pieces', 'Poetry slams and some competitions use this', 'Two-minute poem every word memorized — one blank ruins flow', ['Rehearsal', 'Extemporaneous']],
    ['Elevator Pitch', '30–60 second summary of an idea, project, or yourself', 'Connects speaking to AI Builder and entrepreneurship', 'We built an AI homework bot — saves tutors 5 hours a week — want a demo?', ['Persuasion', 'Hook']],
    ['Pitch', 'Presentation seeking buy-in — investors, customers, voters', 'Mission 5 prepares this structure', 'Problem, market, solution, traction, ask — five slides max', ['Call to Action', 'Persuasion']],
    ['Q&A', 'Question and answer session after prepared remarks', 'Tests real mastery — not just rehearsed blocks', 'Repeat question, answer briefly, bridge back to message', ['Facilitation', 'Confidence']],
    ['Nerves', 'Physical anxiety before speaking — normal and manageable', 'Channel energy; preparation reduces fear', 'Breath before walk-on; first line memorized cold', ['Confidence', 'Rehearsal']],
    ['Confidence', 'Trust in your preparation — not absence of fear', 'Built through reps in Speakers Circle', 'Mission 1 proves you survived; Mission 2 proves you improve', ['Nerves', 'Authenticity']],
    ['Authenticity', 'Sounding like yourself — real beats polished fake', 'Stories mission rewards honest moments', 'Admit you were scared — audience connects immediately', ['Storytelling', 'Vulnerability']],
    ['Vulnerability', 'Sharing honest struggle — builds trust when purposeful', 'Not oversharing — one controlled reveal', 'I almost quit debate until one teacher changed my outline habit', ['Authenticity', 'Storytelling']],
    ['Ethos', 'Credibility appeal — why you are worth listening to', 'One line of relevant experience beats fake expertise', 'I spent 200 hours building AI tutors — here is what failed.', ['Pathos', 'Logos']],
    ['Pathos', 'Emotional appeal — stories, imagery, shared values', 'Moves people to care before you ask', 'Photo of the creek before and after cleanup day', ['Ethos', 'Logos']],
    ['Logos', 'Logical appeal — evidence, data, clear reasoning', 'Balances emotion in persuasive talks', 'Three studies link sleep to GPA gains — here are the numbers.', ['Ethos', 'Pathos']],
    ['Demographics', 'Audience traits — age, role, background — shape examples', 'Jargon that works for builders fails for parents', 'Explain API as phone line for apps when speaking to FI parents night', ['Audience Analysis', 'Message']],
    ['Peer Coaching', 'Structured feedback exchange between speakers', 'Speakers Circle rule — give two reviews to get one', 'Strength: clear ask. Improve: slower hook. Question: what if they say no?', ['Feedback', 'Mentor']],
    ['Workshop', 'Short teaching session you lead — Trainer level skill', 'Speaking shifts from perform to develop others', 'Ten-minute lesson: how to write a hook — with practice pairs', ['Facilitation', 'Trainer']],
    ['Microphone', 'Amplification tool — adjust distance and pace when using one', 'Stage Lab covers basic technique', 'Handheld: fist-width from chin; do not drop volume when turning', ['Projection', 'Stage Presence']],
    ['Podium', 'Stand for notes — use sparingly; do not hide behind it', 'Anchor notes, not a shield', 'Glance down for bullets; speak to room between glances', ['Outline', 'Stage Presence']],
    ['Triad', 'Rule of three — three points, examples, or beats — memorable rhythm', 'Classic rhetorical pattern', 'Three reasons, three stories, three actions — clean and sticky', ['Rhetoric', 'Signpost']],
    ['Metaphor', 'Figure of speech comparing ideas — clarifies complex topics', 'One strong metaphor beats ten definitions', 'Budget is a map — not the territory, but you get lost without it', ['Storytelling', 'Rhetoric']],
    ['Discussion', 'Two-way exchange — Mission 4 focus', 'Speaking includes listening and drawing others out', 'What did I miss? — invite the quietest person first', ['Facilitation', 'Q&A']],
    ['Improvement', 'Deliberate revision after feedback — Refine phase every mission', 'One specific fix beats vague try harder', 'Re-record only the opening with pauses after the hook', ['Feedback', 'Rehearsal']],
  ]),

  community: {
    name: PS_COMMUNITY.name,
    memberRoles: [
      { role: 'Explorer', description: 'Delivering first 3-minute talks — supportive audience only' },
      { role: 'Confident Speaker', description: 'Posts recordings and self-review notes — gives kind specific feedback' },
      { role: 'Storyteller', description: 'Shares narrative missions with clear lessons — mentors on structure' },
      { role: 'Facilitator', description: 'Leads small discussions — models asking over telling' },
      { role: 'Mentor Speaker', description: 'Level 7 — runs peer coaching pairs and weekly prompt threads' },
    ],
    weeklyChallenge: 'Two-minute talk on the weekly prompt — record or deliver live. Post outline + one thing you will fix next time.',
    showcaseFormat: 'Talk card: title, thesis sentence, outline bullets, optional private video link, reflection, and level tag.',
    peerFeedbackLoop: 'Review two talk cards before requesting feedback. Template: Strongest moment · One concrete fix · One encouragement.',
    mentorRole: 'Mentor Speakers host office hours, pair nervous first-timers with confident peers, and model constructive critique in every showcase thread.',
  },

  parent: {
    headline: PS_PARENT_VIEW.headline,
    oneLiner: PS_PARENT_VIEW.oneLiner,
    whyItMatters:
      'AI can write words; humans still present, persuade, and lead. Schools rarely assign deliberate speaking practice with recording and reflection. Foundry treats communication as a build skill with evidence in My Speaking Portfolio.',
    whatTheyBuild:
      'Five missions: 3-minute talk, recorded self-review, story that lands, group facilitation, persuasive presentation — plus Voice Lab, Hook Lab, and workshop design.',
    skillsDemonstrated: [
      'Structured short talks',
      'Self-review from recording',
      'Storytelling with narrative arc',
      'Group facilitation',
      'Persuasive presentations with clear ask',
      'Peer coaching',
      'Confidence under pressure',
    ],
    howProgressMeasured:
      'Talk outlines · Recordings (optional share) · Written reflections · Peer feedback in Speakers Circle — not grades or class participation points.',
    successAfter30Days:
      'After 30 days, a committed student has delivered at least one live talk, recorded themselves once, written three specific improvements, and can present a 3-minute topic to you without reading a script.',
    sections: PS_PARENT_VIEW.sections,
  },

  seoGuides: [
    {
      slug: 'what-is',
      title: 'What Is Public Speaking World?',
      summary: 'Mission-based communication training — talks, stories, facilitation, and persuasion with evidence in My Speaking Portfolio.',
      sections: [
        { heading: 'Communicate value', body: 'Public Speaking is the third leg of Future-Proof: create value (AI Builder), keep value (FI), communicate value (here). Ideas only matter if you can explain them.' },
        { heading: 'Loop', body: 'Mission → Build → Show → Debrief → Refine → Teach. Every mission ends with delivery and debrief — not reading about rhetoric.' },
        { heading: 'Who it is for', body: 'Students who freeze in class, future leaders, entrepreneurs who need to pitch, and anyone completing the Trinity.' },
      ],
    },
    {
      slug: 'beginner-guide',
      title: 'Public Speaking Beginner Guide',
      summary: 'Start at Speaker Explorer. Mission 1: one topic, three minutes, one listener or phone recording.',
      sections: [
        { heading: 'Pick a topic you know', body: 'Hobby, book, game, lesson learned. Write: After my talk, my audience will understand ___.' },
        { heading: 'Outline, do not script', body: 'Hook (15 sec) · two points · close with takeaway. Practice twice out loud.' },
        { heading: 'Deliver', body: 'One person or phone camera. Timer to three minutes. Stop on time.' },
        { heading: 'Reflect', body: 'What worked? Where did you rush? One improvement for tomorrow.' },
      ],
    },
    {
      slug: 'road-to-role',
      title: 'Road to Mentor Speaker — Seven Levels',
      summary: 'Seven levels from Speaker Explorer to Mentor Speaker in Speakers Circle.',
      sections: [
        { heading: 'Levels 1–2', body: 'Explorer and Confident Speaker — Missions 1–2: first talk and record-review. Voice Lab unlocks.' },
        { heading: 'Level 3', body: 'Story Builder — Mission 3: story that lands.' },
        { heading: 'Levels 4–5', body: 'Persuasive Communicator and Group Leader — Missions 5 and 4.' },
        { heading: 'Levels 6–7', body: 'Trainer and Mentor Speaker — Workshop Lab and circle mentorship.' },
      ],
    },
    {
      slug: 'common-mistakes',
      title: 'Common Public Speaking Mistakes',
      summary: 'Reading slides, skipping recording review, no clear ask, and avoiding live delivery.',
      sections: [
        { heading: 'Writing a script word-for-word', body: 'Sounds robotic. Use bullets and speak naturally.' },
        { heading: 'Never watching yourself', body: 'Mission 2 exists — filler words and pace issues hide until you record.' },
        { heading: 'Weak openings', body: 'Spend disproportionate time on the hook. Hook Lab helps.' },
        { heading: 'No call to action', body: 'Persuasive talks need an explicit ask — what should they do Monday?' },
        { heading: 'Only presenting, never facilitating', body: 'Leadership includes drawing others out — Mission 4 trains this.' },
      ],
    },
    {
      slug: 'first-5-projects',
      title: 'First 5 Public Speaking Projects',
      summary: 'Five missions from first talk to persuasive presentation.',
      sections: [
        { heading: '1. First 3-Minute Talk', body: '45–60 min. One topic, outline, live or recorded. Evidence: outline + reflection.' },
        { heading: '2. Record and Review', body: '45–60 min. Watch yourself; list three improvements. Re-record opening.' },
        { heading: '3. Story That Lands', body: '60–90 min. Setup, tension, turn, lesson. Deliver and sharpen closing line.' },
        { heading: '4. Lead Discussion', body: '60 min prep + 20 min live. Three questions; talk less than 30% of time.' },
        { heading: '5. Persuasive Presentation', body: '90–120 min. Five minutes, clear CTA, Trinity reflection.' },
      ],
    },
    {
      slug: 'glossary-index',
      title: 'Public Speaking Glossary — 50 Terms',
      summary: 'Hook, rhetoric, narrative arc, facilitation, ethos, pathos, logos, and the vocabulary of confident communication.',
      sections: [
        { heading: 'Structure', body: 'Hook, thesis, outline, opening, closing, transition, signpost, call to action, triad.' },
        { heading: 'Delivery', body: 'Pace, pause, projection, vocal variety, filler words, body language, eye contact, stage presence.' },
        { heading: 'Persuasion and story', body: 'Rhetoric, ethos, pathos, logos, storytelling, narrative arc, anecdote, metaphor, persuasion.' },
        { heading: 'Practice and growth', body: 'Rehearsal, recording, feedback, peer coaching, nerves, confidence, authenticity, improvement.' },
      ],
    },
    {
      slug: 'parent-guide',
      title: 'Public Speaking — Parent Guide',
      summary: 'Why speaking practice matters, how Foundry measures progress, and how to encourage without pressuring.',
      sections: [
        { heading: 'Why speaking matters', body: PS_PARENT_VIEW.sections[0].body },
        { heading: 'Employable skills', body: PS_PARENT_VIEW.sections[1].body },
        { heading: 'Portfolio', body: 'Talks in ' + PS_PORTFOLIO_SECTIONS[0].title + ', stories in ' + PS_PORTFOLIO_SECTIONS[1].title + ', reviews in ' + PS_PORTFOLIO_SECTIONS[2].title + '.' },
        { heading: 'How to help', body: 'Be the willing listener for Mission 1. Give one specific tip, not a lecture. Celebrate finishing, not perfection.' },
        { heading: 'Trinity and 30 days', body: PS_PARENT_VIEW.sections[4].body + ' After 30 days: one live talk delivered, one recording reviewed, visible confidence shift in how they explain ideas.' },
      ],
    },
  ],
};
