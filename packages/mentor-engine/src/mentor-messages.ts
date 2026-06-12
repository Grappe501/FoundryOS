import type { LivingJourneySnapshot, MentorInsight, WorldJourneySlice } from './types';
import { memoryPreface, buildMentorMemory } from './mentor-memory';

const NERVOUS_RE = /\b(nervous|anxious|scared|afraid|shaky|terrified|panic)\b/i;
const HOST_RE = /\b(host|tasting|guest|party|dinner|friends|teach)\b/i;
const BUILD_RE = /\b(built|automati|assistant|workflow|shipped|created|app)\b/i;
const BUDGET_RE = /\b(budget|save|saving|spent|expense)\b/i;
const INVEST_RE = /\b(invest|stock|portfolio|compound|index fund|401k)\b/i;

export function generateMentorInsights(snapshot: LivingJourneySnapshot): MentorInsight[] {
  const insights: MentorInsight[] = [];

  for (const world of snapshot.worlds) {
    const insight = insightForWorld(world, snapshot);
    if (insight) insights.push(insight);
  }

  if (insights.length === 0) {
    insights.push({
      world_slug: 'ai-builder',
      mentor_name: 'Builder Coach',
      headline: 'Your mentor is ready when you are.',
      body: 'Start Mission 1 in any world — I will notice patterns in your reflections and portfolio, not just your clicks.',
      tone: 'encouraging',
      actions: [
        { label: 'Start AI Builder Mission 1', href: '/ai-builder/missions/homework-assistant' },
        { label: 'Explore paths', href: '/explore' },
      ],
    });
  }

  return insights;
}

function insightForWorld(world: WorldJourneySlice, snapshot: LivingJourneySnapshot): MentorInsight | null {
  const done = world.completed_missions.length;
  const reflections = world.completed_missions.map((m) => m.reflection).join(' ');
  const mentor = world.mentor_name;
  const memory = memoryPreface(buildMentorMemory(snapshot, snapshot.identity), world.world_slug);
  const becoming = snapshot.identity?.ambitions[0]?.label;
  const becomingPrefix = becoming ? `You're becoming ${becoming.toLowerCase()}. ` : '';

  if (world.world_slug === 'ai-builder') {
    if (done >= 3 && !snapshot.worlds.some((w) => w.world_slug === 'entrepreneur')) {
      const hasBuildLanguage = BUILD_RE.test(reflections) || BUILD_RE.test(snapshot.all_reflection_text);
      if (hasBuildLanguage) {
        return {
          world_slug: world.world_slug,
          mentor_name: mentor,
          headline: becoming ? "You're building toward something real." : 'You build — now make it valuable.',
          becoming: becoming ? `Software creator → entrepreneur` : undefined,
          body: `${memory}${becomingPrefix}I noticed you've completed ${done} automation missions. Want to build something somebody would actually pay for?`,
          tone: 'direct',
          actions: [
            { label: 'See Entrepreneur (coming)', href: '/explore' },
            { label: 'Open AI portfolio', href: '/ai-builder/portfolio' },
            { label: 'Next AI mission', href: '/ai-builder/missions' },
          ],
        };
      }
    }
    if (done === 0) {
      return {
        world_slug: world.world_slug,
        mentor_name: mentor,
        headline: 'Ship something tonight.',
        body: 'Mission 1 takes about an hour. One assistant, one reflection, one portfolio entry — that is how Foundry remembers you.',
        tone: 'encouraging',
        actions: [{ label: 'Homework Assistant mission', href: '/ai-builder/missions/homework-assistant' }],
      };
    }
    return {
      world_slug: world.world_slug,
      mentor_name: mentor,
      headline: `${done} mission${done === 1 ? '' : 's'} in your portfolio.`,
      body: 'Keep stacking evidence. Your next leverage move might be demoing what you built — Speech Coach can help.',
      tone: 'encouraging',
      actions: [
        { label: 'Continue missions', href: '/ai-builder/missions' },
        { label: 'My AI Portfolio', href: '/ai-builder/portfolio' },
      ],
    };
  }

  if (world.world_slug === 'financial-independence') {
    const hasBudget = world.completed_missions.some((m) => /budget|first-budget/i.test(m.missionSlug));
    const mentionsInvest = INVEST_RE.test(reflections);
    if (hasBudget && !mentionsInvest && done >= 1) {
        return {
          world_slug: world.world_slug,
          mentor_name: mentor,
          headline: 'Budget mastered — curiosity about investing is next.',
          becoming: becoming ?? 'Wealth builder',
          body: `${memory}${becomingPrefix}Based on your progress, you understand budgeting but haven't explored investing yet. Here are three directions learners usually take next.`,
        tone: 'direct',
        actions: [
          { label: 'FI glossary — compound interest', href: '/financial-independence/glossary' },
          { label: 'Next FI mission', href: '/financial-independence/missions' },
          { label: 'Wealth portfolio', href: '/financial-independence/portfolio' },
        ],
      };
    }
    if (done === 0) {
      return {
        world_slug: world.world_slug,
        mentor_name: mentor,
        headline: 'Money clarity starts with one honest budget.',
        body: 'Not financial advice — just structure. Mission 1 builds a budget you can show a parent or mentor.',
        tone: 'encouraging',
        actions: [{ label: 'First Budget mission', href: '/financial-independence/missions/first-budget' }],
      };
    }
  }

  if (world.world_slug === 'public-speaking') {
    if (NERVOUS_RE.test(reflections)) {
        return {
          world_slug: world.world_slug,
          mentor_name: mentor,
          headline: 'Nervousness keeps showing up — let us train it.',
          becoming: becoming ?? 'Confident speaker',
          body: `${memory}Your reflections mention nerves. That is normal. Let's build a challenge specifically around confidence: shorter reps, recorded review, one friendly audience.`,
        tone: 'challenge',
        actions: [
          { label: 'First Talk mission', href: '/public-speaking/missions/first-talk' },
          { label: 'Speaking portfolio', href: '/public-speaking/portfolio' },
        ],
      };
    }
    if (done >= 1) {
      return {
        world_slug: world.world_slug,
        mentor_name: mentor,
        headline: 'You spoke — now refine.',
        body: 'Record and rewatch one delivery this week. Stewards improve by watching themselves, not by wishing nerves away.',
        tone: 'direct',
        actions: [{ label: 'Next speaking mission', href: '/public-speaking/missions' }],
      };
    }
  }

  if (world.world_slug === 'bourbon') {
    if (HOST_RE.test(reflections) || done >= 1) {
      return {
        world_slug: world.world_slug,
        mentor_name: mentor,
        headline: 'You host — narrative matters.',
        body: 'Tasting hosts who teach out loud become better stewards. Public Speaking world pairs naturally: structure the story of each pour.',
        tone: 'direct',
        actions: [
          { label: 'Producer Atlas', href: '/bourbon/producers' },
          { label: 'Legendary journal', href: '/bourbon/portfolio' },
          { label: 'Public Speaking', href: '/public-speaking' },
        ],
      };
    }
    if ((world.journal_items ?? 0) > 0) {
      return {
        world_slug: world.world_slug,
        mentor_name: mentor,
        headline: 'Your journal is growing.',
        body: 'Log one more tasting with nose, palate, finish — then compare two houses from the Producer Atlas.',
        tone: 'encouraging',
        actions: [
          { label: 'Add tasting note', href: '/bourbon/portfolio' },
          { label: 'Academy Level 1', href: '/bourbon/academy' },
        ],
      };
    }
  }

  if (done > 0) {
    return {
      world_slug: world.world_slug,
      mentor_name: mentor,
      headline: `Momentum in ${world.world_name}.`,
      body: `${done} mission${done === 1 ? '' : 's'} logged as ${world.identity_title}. Keep the loop: mission → evidence → reflection.`,
      tone: 'celebrate',
      actions: [
        { label: 'Continue missions', href: `${world.href}/missions` },
        { label: world.identity_title, href: `${world.href}/portfolio` },
      ],
    };
  }

  return null;
}

export function pickPrimaryMentorInsight(snapshot: LivingJourneySnapshot): MentorInsight {
  const all = generateMentorInsights(snapshot);
  const active = snapshot.active_world_slugs;
  const prioritized = all.sort((a, b) => {
    const aActive = active.includes(a.world_slug) ? 1 : 0;
    const bActive = active.includes(b.world_slug) ? 1 : 0;
    if (aActive !== bActive) return bActive - aActive;
    const toneScore = { challenge: 3, direct: 2, celebrate: 1, encouraging: 0 };
    return toneScore[b.tone] - toneScore[a.tone];
  });
  return prioritized[0] ?? all[0];
}
