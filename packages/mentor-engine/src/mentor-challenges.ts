import type { IdentityContext, LivingJourneySnapshot, MentorChallenge } from './types';
import { memoryPreface, buildMentorMemory } from './mentor-memory';

const NERVOUS_RE = /\b(nervous|anxious|scared)\b/i;

export function generateMentorChallenges(
  snapshot: LivingJourneySnapshot,
  identity?: IdentityContext,
): MentorChallenge[] {
  const memory = buildMentorMemory(snapshot, identity);
  const challenges: MentorChallenge[] = [];

  const ps = snapshot.worlds.find((w) => w.world_slug === 'public-speaking');
  if (ps) {
    const done = ps.completed_missions.length;
    if (NERVOUS_RE.test(snapshot.all_reflection_text) || done >= 1) {
      challenges.push({
        id: 'ps-three-conversations',
        world_slug: 'public-speaking',
        mentor_name: 'Speech Coach',
        title: 'Talk to three people this week',
        body: `${memoryPreface(memory, 'public-speaking')}You seem comfortable speaking to one person. This week: three short conversations where you practice one clear point.`,
        href: '/public-speaking/missions',
        expires_hint: 'This week',
      });
    }
  }

  const fi = snapshot.worlds.find((w) => w.world_slug === 'financial-independence');
  if (fi && fi.completed_missions.length >= 1) {
    challenges.push({
      id: 'fi-forecast',
      world_slug: 'financial-independence',
      mentor_name: 'Money Coach',
      title: 'Forecast next month',
      body: `${memoryPreface(memory, 'financial-independence')}You've tracked expenses. Try forecasting next month — one category you will cut, one you will protect.`,
      href: '/financial-independence/portfolio',
      expires_hint: '7 days',
    });
  }

  const ai = snapshot.worlds.find((w) => w.world_slug === 'ai-builder');
  if (ai && ai.completed_missions.length >= 2) {
    challenges.push({
      id: 'ai-demo-one-person',
      world_slug: 'ai-builder',
      mentor_name: 'Builder Coach',
      title: 'Demo to one person who is not you',
      body: `${memoryPreface(memory, 'ai-builder')}Shipped tools deserve an audience. Show one person what you built — watch where they get confused.`,
      href: '/ai-builder/portfolio',
      expires_hint: 'This week',
    });
  }

  const bourbon = snapshot.worlds.find((w) => w.world_slug === 'bourbon');
  if (bourbon && (bourbon.journal_items ?? 0) >= 1) {
    challenges.push({
      id: 'bourbon-blind-one-friend',
      world_slug: 'bourbon',
      mentor_name: 'Bourbon Steward',
      title: 'Blind taste with one friend',
      body: 'Hide the labels. Score nose and palate. The journal entry afterward is your trophy.',
      href: '/bourbon/games',
      expires_hint: 'Weekend',
    });
  }

  if (identity?.dreams.some((d) => d.slug === 'start-business' || d.slug === 'make-money')) {
    challenges.push({
      id: 'dream-validation',
      world_slug: 'ai-builder',
      mentor_name: 'Builder Coach',
      title: 'Ask three people what they would pay for',
      body: "You said you want to build a business. Don't code yet — ask three people what problem they'd pay to solve.",
      href: '/my-future',
      expires_hint: '5 days',
    });
  }

  return challenges.slice(0, 3);
}
