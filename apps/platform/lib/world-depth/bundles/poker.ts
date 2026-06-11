/** PASS-025 — Poker world depth bundle */

import { buildAcademyLessons } from '../build-academy';
import { buildGlossary } from '../build-glossary';
import type { WorldDepthBundle } from '../types';
import { POKER_ACADEMY_LEVELS } from '../../poker-world';

const academyLevels = POKER_ACADEMY_LEVELS.map((l) => ({
  level: l.level,
  title: l.title,
  tagline: l.tagline,
  missionSlug:
    l.level === 1
      ? 'track-bankroll'
      : l.level === 3
        ? 'review-ten-hands'
        : l.level === 4
          ? 'first-tournament'
          : l.level === 5
            ? 'final-table'
            : l.level === 6
              ? 'teach-new-player'
              : undefined,
}));

export const POKER_DEPTH: WorldDepthBundle = {
  slug: 'poker',
  displayName: 'Poker World',
  accentColor: '#6B8BB8',
  portfolioLabel: 'My Poker Journal',

  academyLessons: buildAcademyLessons(academyLevels, 'Poker'),

  glossary: buildGlossary([
    ['Pot odds', 'Ratio of current pot size to the cost of a call.', 'Tells you if a call is mathematically justified versus your equity.', 'Pot is $100, call $25 — you need ~20% equity to break even.', ['Equity', 'Implied odds']],
    ['Position', 'Where you act relative to the button — later is stronger.', 'More information before you decide — core strategic advantage.', 'Button steals blinds; under the gun opens tight.', ['Button', 'Late position']],
    ['Hole cards', 'Your two private cards dealt face down.', 'Starting point for every hand decision.', 'Pocket aces preflop; seven-deuce offsuit usually folds.', ['Starting hand', 'Preflop']],
    ['Community cards', 'Shared board cards — flop, turn, river.', 'Everyone uses them to make best five-card hand.', 'Board paired on river changes bluff and value dynamics.', ['Flop', 'River']],
    ['Preflop', 'Betting round before any community cards.', 'Foundation of range construction and discipline.', 'Open-raise UTG tighter than button — position rules preflop too.', ['Postflop', 'Three-bet']],
    ['Flop', 'First three community cards — second betting round.', 'Texture drives continuation bets and check-raises.', 'Dry A-7-2 favors preflop raiser; wet 9-T-J favors callers.', ['Turn', 'Continuation bet']],
    ['Turn', 'Fourth community card — third postflop betting round.', 'Pot grows; one-card draws get priced in or fold.', 'Turn brick often kills flush draws; barrel decisions tighten.', ['River', 'Pot odds']],
    ['River', 'Fifth and final community card.', 'Last chance to bet — polarized ranges common.', 'River value bet thin when you block nuts; bluff with blockers.', ['Showdown', 'Value bet']],
    ['Check', 'Pass action without betting when no bet faces you.', 'Controls pot size and can trap or induce bluffs.', 'Check-call medium strength; check-raise strong or semi-bluff.', ['Bet', 'Slow play']],
    ['Bet', 'First chips into the pot on a street.', 'Builds pot for value or applies pressure as bluff.', 'Third-pot c-bet on dry flop is standard small-ball line.', ['Raise', 'Continuation bet']],
    ['Raise', 'Increase the current bet — more pressure, more info.', 'Defines strong ranges and punishes limpers.', '3-bet preflop with value hands and selected bluffs.', ['Three-bet', 'Fold']],
    ['Fold', 'Forfeit the hand — zero further investment.', 'Best move often; saves bankroll for better spots.', 'Fold marginal dominated hands preflop — discipline beats ego.', ['Bankroll', 'Range']],
    ['All-in', 'Betting all remaining chips.', 'Commits stack — tournament survival and cash game risk spike.', 'Short stack shove ranges widen near bubble pressure.', ['Stack size', 'ICM']],
    ['Blinds', 'Forced bets — small blind and big blind — drive action.', 'Without blinds, nobody would play hands.', 'Blind levels rise in tournaments — stack depth shrinks.', ['Ante', 'Steal']],
    ['Ante', 'Forced bet from every player — common in late tournament stages.', 'Increases pot size and steal incentive.', '200BB online may have no ante; live tourney level 6 often adds antes.', ['Blinds', 'ICM']],
    ['Button', 'Best seat — acts last postflop among remaining players.', 'Steals blinds and controls pot size.', 'Raise wider on button than cutoff when folds likely.', ['Cutoff', 'Position']],
    ['Under the gun (UTG)', 'First to act preflop — worst position.', 'Tightest opening range required.', 'UTG open might be 77+, AJo+, KQs — button much wider.', ['Early position', 'Range']],
    ['Cutoff', 'Seat before button — strong late position.', 'Second-best steal seat.', 'Open lighter cutoff than hijack; 3-bet button steals.', ['Button', 'Hijack']],
    ['Hijack', 'Two seats before button — middle-late position.', 'Starts widening ranges versus early seats.', 'Add suited connectors and weaker broadways hijack vs UTG fold.', ['Cutoff', 'Position']],
    ['Late position', 'Button, cutoff, hijack — act later postflop.', 'Where profit concentrates for strong players.', 'Most blind steals and float lines originate late.', ['Early position', 'Steal']],
    ['Early position', 'UTG and next seats — act first postflop.', 'Play stronger hands; avoid marginal dominated spots.', 'Fold ATo UTG in full-ring; open button same hand sometimes.', ['Under the gun', 'Range']],
    ['Three-bet', 'Re-raise over an open raise preflop.', 'Value with premiums; bluff with blockers and playability.', 'QQ+ and AK value 3-bet; A5s bluff 3-bet blocks AA.', ['Continuation bet', 'Preflop']],
    ['Continuation bet (c-bet)', 'Preflop raiser bets flop — maintains initiative.', 'Wins pots when opponents miss; must balance on wet boards.', 'C-bet 33% pot on dry flop; check back more on coordinated boards.', ['Flop', 'Barrel']],
    ['Range', 'Set of hands you take a given action with.', 'Thinking in ranges beats guessing one hand.', 'Opponent 3-bets — assign value range and bluff range, not only aces.', ['Equity', 'Hand reading']],
    ['Equity', 'Your share of the pot if all cards were dealt now.', 'Compare to pot odds for call decisions.', 'Flush draw on flop has ~35% equity with two cards to come.', ['Pot odds', 'Outs']],
    ['Expected value (+EV)', 'Profitability of a decision over many repetitions.', 'Good players maximize +EV — outcomes vary short term.', 'Bluff river +EV when fold equity plus showdown equity exceeds cost.', ['Pot odds', 'ICM']],
    ['Implied odds', 'Extra chips you expect to win when you hit your draw.', 'Justifies calls when direct pot odds are insufficient.', 'Set mine with pocket pairs when stacks are deep enough.', ['Pot odds', 'Reverse implied odds']],
    ['Reverse implied odds', 'Future losses when you make second-best hand.', 'Why dominated flush draws and weak top pair fold.', 'Calling with A♥ on monotone flop can lose huge when behind.', ['Implied odds', 'Equity']],
    ['Bluff', 'Bet or raise with weak hand to fold better hands.', 'Requires fold equity and credible story.', 'Triple barrel bluff needs blockers and fold-prone opponent.', ['Semi-bluff', 'Value bet']],
    ['Semi-bluff', 'Bet with draw that can improve to best hand.', 'Equity when called plus fold equity when not.', 'Flush draw check-raise flop — win now or hit later.', ['Bluff', 'Outs']],
    ['Value bet', 'Bet expecting worse hands to call.', 'How winners build pots — not only bluffing.', 'Thin value river bet when opponent calls second pair.', ['Bluff', 'River']],
    ['Slow play', 'Check strong hand to trap aggressive opponents.', 'Risky — gives free cards; use selectively.', 'Check-set on dry flop once; bet wet boards.', ['Check-raise', 'Value bet']],
    ['Tilt', 'Emotional play after bad beats or losses.', 'Destroys bankroll and decision quality.', 'Log stop-loss triggers; leave table when tilt hits.', ['Bankroll', 'Stop-loss']],
    ['Bankroll', 'Dedicated poker funds separate from life money.', 'Skill without bankroll discipline still busts.', 'Recreational bankroll might be 20 buy-ins for comfort zone.', ['Stop-loss', 'Mission 1']],
    ['Stop-loss', 'Predetermined loss limit per session.', 'Prevents chase behavior.', 'Leave when down two buy-ins or after 3 hours — write rule before playing.', ['Bankroll', 'Tilt']],
    ['ICM', 'Independent Chip Model — tournament equity from stack and payouts.', 'Chips ≠ dollars near bubble and final table.', 'Medium stack folds AK vs shove when pay jump huge.', ['Bubble', 'Final table']],
    ['Bubble', 'Phase where next elimination misses money.', 'Survival pressure changes optimal play.', 'Short stacks shove wider; big stacks attack medium stacks.', ['ICM', 'Pay jump']],
    ['Short stack', 'Stack too small for standard postflop play — often push/fold.', 'Forces preflop all-in math.', 'Under 15BB in tourney — open shove ranges replace min-raises.', ['All-in', 'Final table']],
    ['Chip leader', 'Largest stack at table — applies maximum pressure.', 'Can bully medium stacks who fear busting.', 'Leader opens button wide; covers others in shove spots.', ['ICM', 'Bubble']],
    ['Pay jump', 'Prize increase between finishing positions.', 'Money EV can differ from chip EV.', 'Moving 9th to 8th might be worth more than doubling chips.', ['ICM', 'Final table']],
    ['Final table', 'Last nine (or fewer) players in tournament.', 'Pay ladder and ICM dominate decisions.', 'Mission 4 logs stack dynamics and one ICM spot explained.', ['Heads-up', 'Pay jump']],
    ['Heads-up', 'Two players remaining — widest ranges, aggressive play.', 'Every hand posts blinds; aggression wins.', 'Open any pair, most aces, many suited hands on button.', ['Final table', 'Steal']],
    ['Hand reading', 'Narrowing opponent holdings from actions and sizing.', 'Core skill for value and bluff frequency.', 'Turn raise after call-call line often polarized — nuts or bluff.', ['Range', 'Tell']],
    ['Tell', 'Physical or timing clue about hand strength — use carefully.', 'Live hobby edge; online relies on stats and timing.', 'Instant call often weak; long tank then min-raise often strong.', ['Hand reading', 'Exploitative play']],
    ['GTO', 'Game theory optimal — balanced unexploitable baseline.', 'Study foundation; exploit deviations for profit.', 'Solver frequencies on river splits bets between value and bluffs.', ['Exploitative play', 'Range']],
    ['Exploitative play', 'Adjust strategy to opponent leaks.', 'Where most live profit comes from versus GTO bots.', 'Fold more vs nits; bluff more vs calling stations.', ['GTO', 'Hand reading']],
    ['Loose vs tight', 'How many hands a player enters — wide vs selective.', 'Tag opponents early for adjustment.', 'Loose-passive calls too much — value bet thinner.', ['Aggressive vs passive', 'Range']],
    ['Aggressive vs passive', 'Bet/raise frequency vs check/call tendency.', 'Aggression wins pots; passivity bleeds chips.', 'Passive player check-calls two streets — value bet river.', ['Continuation bet', 'Loose vs tight']],
    ['Outs', 'Cards that improve your hand to likely winner.', 'Count outs for draw equity math.', 'Nine flush outs on flop — rule of 4 ≈ 36% by river.', ['Equity', 'Semi-bluff']],
    ['Showdown', 'Reveal hands after final bet/call on river.', 'Where bluffs fail and value gets paid.', 'Muck losers fast; table talk after showdown is poor etiquette.', ['River', 'Value bet']],
  ]),

  community: {
    name: 'Poker Study Circle',
    memberRoles: [
      { role: 'Table Learner', description: 'Tracks bankroll, learns hand ranks, posts first session logs without results obsession.' },
      { role: 'Session Grinder', description: 'Plays structured sessions, enforces stop-loss, shares weekly hand for review.' },
      { role: 'Hand Analyst', description: 'Runs street-by-street reviews, identifies leaks, hosts study threads.' },
      { role: 'Poker Mentor', description: 'Leads Circle reviews, coaches new players, moderates final table debriefs with respect.' },
    ],
    weeklyChallenge: 'Post one hand history with your decision on each street — mark one spot where you would play differently after review.',
    showcaseFormat: 'Hand Review Card — position, stack depth, action line, your decision, alternative line, one-sentence lesson.',
    peerFeedbackLoop: 'Respond with decision-focused feedback — never "you would have won if" — ask what info they had at decision time.',
    mentorRole: 'Poker Mentors approve first bankroll rules, pair learners for home games, and run monthly leak-clinic threads on preflop and ICM.',
  },

  parent: {
    headline: 'What your teen builds in Poker World',
    oneLiner: 'Strategic thinking, bankroll discipline, and decision review — not gambling chaos.',
    whyItMatters: 'Poker World treats uncertainty like a classroom: log decisions, review evidence, manage risk. Those habits transfer to investing, negotiations, and any field where you decide with incomplete information.',
    whatTheyBuild: 'A poker journal with bankroll rules, ten reviewed hands, tournament debriefs, and a teaching outline for a new player — documented skill growth.',
    skillsDemonstrated: [
      'Probabilistic thinking (pot odds, equity)',
      'Emotional regulation and stop-loss discipline',
      'Structured post-session review',
      'Position-aware planning',
      'Teaching fundamentals without jargon overload',
      'ICM and resource management under pressure',
    ],
    howProgressMeasured: 'Academy levels, mission evidence (bankroll doc, hand reviews, tourney notes), Circle feedback quality, and mentor sign-off on teaching mission.',
    successAfter30Days: 'They maintain bankroll rules across three sessions, explain pot odds in plain language, review five hands with street notes, and describe one leak they are fixing.',
    sections: [
      {
        title: 'Legal and age context',
        body: 'Foundry assumes legal age and local laws for live or online play. Home chip games and study-only hand reviews work where real-money play is restricted. Parents should set household rules on stakes and time limits.',
      },
      {
        title: 'Bankroll is the guardrail',
        body: 'Mission 1 separates rent money from poker money and writes stop-loss rules before playing. Review those rules with your teen — accountability beats surprise losses.',
      },
      {
        title: 'Decisions, not results',
        body: 'A good fold that saves money when opponent had nuts is +EV even if it feels bad. Praise review quality, not whether they won a pot.',
      },
      {
        title: 'Teaching mission',
        body: 'Mission 5 requires explaining hand ranks, blinds, and position to a new player. Teaching proves mastery better than any win streak.',
      },
    ],
  },

  seoGuides: [
    {
      slug: 'what-is',
      title: 'What Is Poker World?',
      summary: 'Build strategic thinking, bankroll discipline, and confidence at the table — study beats volume.',
      sections: [
        { heading: 'Skill game framing', body: 'Poker World is not a casino promo. It is a transformation loop: missions, logged sessions, hand reviews, teaching, and community accountability. Outcomes vary; decision quality is the score.' },
        { heading: 'Seven academy levels', body: 'From Table Learner to Poker Mentor — bankroll first, reviews second, tournaments third, teaching last. Five missions structure the proof path.' },
        { heading: 'Who it fits', body: 'Home game regulars, tournament curious players, and anyone who wants decision-making practice under uncertainty — with written rules and mentors.' },
      ],
    },
    {
      slug: 'beginner-guide',
      title: 'Beginner Guide to Poker World',
      summary: 'Set bankroll rules, log three sessions, learn position — before raising stakes.',
      sections: [
        { heading: 'Start with Mission 1', body: 'Define recreational bankroll, write stop-loss and time limits, log three sessions with biggest mistake noted. No mission skip.' },
        { heading: 'Learn order', body: 'Hand ranks → blinds and button → position → starting hands by seat → pot odds basics. One concept per session.' },
        { heading: 'First 30 days', body: 'Week 1: bankroll doc. Week 2: five hand reviews (win or lose). Week 3: one tournament or structured home tourney. Week 4: post Hand Review Card in Study Circle.' },
      ],
    },
    {
      slug: 'road-to-role',
      title: 'Road to Poker Mentor',
      summary: 'From bankroll tracker to study coach leading the Circle.',
      sections: [
        { heading: 'Levels 1–3: Discipline and review', body: 'Bankroll rules live on paper. Ten hand reviews with alternative lines. Leak identified and drilled.' },
        { heading: 'Levels 4–5: Tournament pressure', body: 'First tournament logged. Final table appearance with ICM note — pay jumps explained in plain language.' },
        { heading: 'Level 6–7: Teach and mentor', body: 'Teach a new player fundamentals. Mentor role means decision-focused feedback and welcoming learners to the Circle.' },
      ],
    },
    {
      slug: 'common-mistakes',
      title: 'Common Poker Beginner Mistakes',
      summary: 'Playing too many hands, ignoring position, and reviewing results instead of decisions.',
      sections: [
        { heading: 'No bankroll separation', body: 'Mixed wallet = mixed emotions. Mission 1 exists because this mistake ends hobbies.' },
        { heading: 'Calling station habit', body: 'Calling without pot odds or plan bleeds chips. Fold more; bluff less until ranges make sense.' },
        { heading: 'Results-oriented review', body: '"I lost so it was bad" is wrong. Ask what you knew when you acted and what line is +EV.' },
        { heading: 'Playing tired or tilted', body: 'Stop-loss includes emotional state. Log when you leave — pattern beats denial.' },
      ],
    },
    {
      slug: 'first-5-projects',
      title: 'First 5 Poker Projects',
      summary: 'Five missions that prove strategic growth — each with evidence.',
      sections: [
        { heading: '1. Track First Bankroll', body: 'Rules, three sessions, honest reflection. Outcome: financial boundary for a skill hobby.' },
        { heading: '2. Play First Tournament', body: 'Finish position, two key hands, one strategic lesson. Outcome: resource management.' },
        { heading: '3. Review 10 Hands', body: 'Street-by-street with alternatives. Outcome: analyst mindset.' },
        { heading: '4. Final Table', body: 'ICM decision explained. Outcome: pressure navigation.' },
        { heading: '5. Teach New Player', body: 'Lesson outline and student feedback. Outcome: mentor readiness.' },
      ],
    },
    {
      slug: 'glossary-index',
      title: 'Poker Glossary — 50 Terms That Matter',
      summary: 'Pot odds, position, ICM — vocabulary for study sessions and teaching.',
      sections: [
        { heading: 'Decision math', body: 'Pot odds, equity, implied odds, outs, +EV, and ICM form the calculator layer — learn before fancy moves.' },
        { heading: 'Street play', body: 'Preflop through river, c-bet, barrel, check-raise, value bet, bluff, and semi-bluff describe action lines.' },
        { heading: 'Mindset and bankroll', body: 'Bankroll, stop-loss, tilt, and hand review discipline keep the hobby sustainable.' },
        { heading: 'Study method', body: 'One term per reviewed hand. Write the term when you use it in a decision — vocabulary becomes instinct.' },
      ],
    },
    {
      slug: 'parent-guide',
      title: 'Parent Guide to Poker World',
      summary: 'Bankroll boundaries, decision-focused learning, and when to step in.',
      sections: [
        { heading: 'Not a gambling push', body: 'Foundry emphasizes rules, logs, and teaching. Discuss legal age, household stakes caps, and time limits upfront.' },
        { heading: 'Read the bankroll doc', body: 'Stop-loss, session length, and separation from savings — if missing, pause play until Mission 1 is done.' },
        { heading: 'Ask about decisions', body: '"What did you know on the turn?" beats "Did you win?" — reinforces the skill frame.' },
        { heading: 'Warning signs', body: 'Chasing losses, hiding sessions, or skipping reviews — redirect to Circle accountability and mentors.' },
      ],
    },
  ],
};
