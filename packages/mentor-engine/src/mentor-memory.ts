import type { IdentityContext, LivingJourneySnapshot } from './types';

const NERVOUS_RE = /\b(nervous|anxious|scared|confidence|confident)\b/i;
const FREEDOM_RE = /\b(freedom|free|independent|options|security)\b/i;
const PAY_RE = /\b(pay|paid|customer|revenue|sell|business)\b/i;

export type MentorMemoryLine = {
  world_slug?: string;
  text: string;
  source: 'ambition' | 'dream' | 'reflection' | 'stated_goal';
};

export function buildMentorMemory(snapshot: LivingJourneySnapshot, identity?: IdentityContext): MentorMemoryLine[] {
  const lines: MentorMemoryLine[] = [];

  if (identity) {
    for (const a of identity.ambitions) {
      lines.push({
        text: `You're becoming ${a.label.toLowerCase()} — ${a.tagline.toLowerCase()}.`,
        source: 'ambition',
      });
    }
    for (const d of identity.dreams) {
      lines.push({
        text: `You said you want to ${d.label.toLowerCase()}.`,
        source: 'dream',
      });
    }
    for (const g of identity.stated_goals ?? []) {
      lines.push({ text: g.text, source: 'stated_goal', world_slug: g.world_slug });
    }
  }

  const confCount = (snapshot.all_reflection_text.match(/\b(nervous|anxious|confidence)\b/gi) ?? []).length;
  if (confCount >= 3) {
    lines.push({
      world_slug: 'public-speaking',
      text: 'Your reflections mention confidence or nerves several times.',
      source: 'reflection',
    });
  }

  if (FREEDOM_RE.test(snapshot.all_reflection_text)) {
    lines.push({
      world_slug: 'financial-independence',
      text: "You've consistently talked about freedom and options with money.",
      source: 'reflection',
    });
  }

  if (PAY_RE.test(snapshot.all_reflection_text)) {
    lines.push({
      world_slug: 'ai-builder',
      text: 'Last time you reflected, you mentioned building something people would pay for.',
      source: 'reflection',
    });
  }

  if (NERVOUS_RE.test(snapshot.all_reflection_text)) {
    const ps = snapshot.worlds.find((w) => w.world_slug === 'public-speaking');
    if (ps && ps.completed_missions.length > 0) {
      lines.push({
        world_slug: 'public-speaking',
        text: 'Your speaking reflections still carry nervous energy — we can train that.',
        source: 'reflection',
      });
    }
  }

  return lines.slice(0, 6);
}

export function memoryPreface(lines: MentorMemoryLine[], worldSlug?: string): string {
  const relevant = lines.filter((l) => !l.world_slug || l.world_slug === worldSlug).slice(0, 2);
  if (relevant.length === 0) return '';
  return relevant.map((l) => l.text).join(' ') + ' ';
}
