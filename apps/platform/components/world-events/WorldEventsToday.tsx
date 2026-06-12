'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import {
  getActiveWorldEvents,
  getCrossWorldEventHighlights,
  EVENT_TYPE_LABELS,
  type WorldEvent,
  type WorldEventsSnapshot,
} from '@foundry/world-events-engine';
import {
  getEventInteraction,
  recordEventView,
  recordEventVote,
  recordEventSave,
  recordDebateChoice,
  recordEventComplete,
} from '../../lib/world-events/client-state';
import { getWorldCollections } from '../../lib/collector/client-state';
import { recordIntentNote } from '../../lib/world-continuity/client-state';

const TYPE_ACCENT: Record<string, string> = {
  daily_mystery: '#C8A96E',
  weekly_rivalry: '#D4847A',
  spotlight: '#6B9BC9',
  debate: '#9B8FD4',
  challenge: '#6B9B6B',
  rabbit_hole: '#7BA3C9',
  legendary_object: '#E8B86D',
  history: '#6B9B6B',
};

type Props = {
  worldSlug: string;
  accent?: string;
  compact?: boolean;
};

export function WorldEventsToday({ worldSlug, accent = '#6B9B6B', compact = false }: Props) {
  const [mounted, setMounted] = useState(false);
  const snapshot = useMemo(() => getActiveWorldEvents(worldSlug), [worldSlug]);
  const [refresh, setRefresh] = useState(0);

  useEffect(() => {
    setMounted(true);
    if (snapshot) {
      for (const e of snapshot.events) recordEventView(e.event_id);
    }
  }, [snapshot]);

  if (!snapshot) {
    return <p style={{ color: '#8A8A8E' }}>World events coming soon for this world.</p>;
  }

  if (!mounted) return null;

  const collections = getWorldCollections(worldSlug).filter((c) => c.unlocked_count > 0);

  return (
    <div>
      <header>
        <p style={{ color: accent, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
          {compact ? 'Live today' : 'Something is happening here today'}
        </p>
        {!compact && (
          <h1 style={{ fontWeight: 300, fontSize: '2.25rem', marginTop: 12, lineHeight: 1.25 }}>
            {snapshot.hero_title}
          </h1>
        )}
        <p style={{ color: '#8A8A8E', fontSize: compact ? 14 : 16, marginTop: compact ? 8 : 14, lineHeight: 1.65 }}>
          {snapshot.hero_hook}
        </p>
        <p style={{ color: '#4A4A4E', fontSize: 12, marginTop: 8 }}>
          {snapshot.date_key} · week of {snapshot.week_key}
        </p>
      </header>

      <div style={{ marginTop: compact ? 16 : 28, display: 'grid', gap: 12 }}>
        {snapshot.events.map((event) => (
          <EventCard
            key={event.event_id + refresh}
            event={event}
            accent={TYPE_ACCENT[event.event_type] ?? accent}
            onInteraction={() => setRefresh((r) => r + 1)}
          />
        ))}
      </div>

      <YourInteractions snapshot={snapshot} accent={accent} refresh={refresh} />

      {collections.length > 0 && (
        <section style={{ marginTop: 28, padding: 18, background: '#0F0F12', borderRadius: 8, border: '1px solid #1A1A1E' }}>
          <p style={{ color: accent, fontSize: 11, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0 }}>
            Related collections
          </p>
          <ul style={{ color: '#8A8A8E', fontSize: 13, marginTop: 10, paddingLeft: 18, lineHeight: 1.8 }}>
            {collections.slice(0, 4).map((c) => (
              <li key={c.definition.id}>{c.definition.title} — {c.progress_label}</li>
            ))}
          </ul>
          <Link href={`/${worldSlug}/portfolio`} style={{ display: 'inline-block', marginTop: 10, color: accent, fontSize: 13 }}>
            Open portfolio →
          </Link>
        </section>
      )}

      {snapshot.events.find((e) => e.related_community_prompt) && (
        <section style={{ marginTop: 20, padding: 18, background: '#111114', borderRadius: 8, border: `1px solid ${accent}33` }}>
          <p style={{ color: '#6B6B70', fontSize: 11, margin: 0 }}>Community prompt</p>
          <p style={{ color: '#E8E8EC', fontSize: 14, marginTop: 8 }}>
            {snapshot.events.find((e) => e.related_community_prompt)?.related_community_prompt}
          </p>
          <Link href={`/community/${worldSlug}`} style={{ display: 'inline-block', marginTop: 10, color: accent, fontSize: 13 }}>
            Join community →
          </Link>
        </section>
      )}
    </div>
  );
}

function EventCard({
  event,
  accent,
  onInteraction,
}: {
  event: WorldEvent;
  accent: string;
  onInteraction: () => void;
}) {
  const interaction = getEventInteraction(event.event_id);

  return (
    <article
      style={{
        padding: 18,
        background: '#111114',
        borderRadius: 10,
        border: `1px solid ${accent}33`,
      }}
    >
      <p style={{ color: accent, fontSize: 10, margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        {EVENT_TYPE_LABELS[event.event_type]}
      </p>
      <p style={{ color: '#E8E8EC', fontSize: 17, margin: '8px 0 0', fontWeight: 400 }}>{event.title}</p>
      <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 10, lineHeight: 1.55 }}>{event.short_hook}</p>
      {!interaction.viewed && (
        <p style={{ color: '#4A4A4E', fontSize: 12, marginTop: 8 }}>{event.why_it_matters.slice(0, 120)}…</p>
      )}

      {event.event_type === 'weekly_rivalry' && event.rivalry_options && (
        <RivalryVote event={event} interaction={interaction} onInteraction={onInteraction} accent={accent} />
      )}

      {event.event_type === 'debate' && event.debate_options && (
        <DebatePick event={event} interaction={interaction} onInteraction={onInteraction} accent={accent} />
      )}

      {event.event_type === 'challenge' && (
        <ChallengeComplete event={event} interaction={interaction} onInteraction={onInteraction} accent={accent} />
      )}

      {event.event_type === 'rabbit_hole' && (
        <button
          type="button"
          onClick={() => {
            recordEventSave(event.event_id);
            recordIntentNote(event.world_slug, `You bookmarked ${event.title} but have not finished it yet.`);
            onInteraction();
          }}
          style={{
            marginTop: 12,
            padding: '8px 14px',
            background: interaction.saved ? '#2A2520' : 'transparent',
            border: `1px solid ${accent}`,
            borderRadius: 6,
            color: accent,
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          {interaction.saved ? 'Saved for later ✓' : 'Save rabbit hole'}
        </button>
      )}

      <Link
        href={event.primary_action.href}
        style={{ display: 'inline-block', marginTop: 14, color: accent, fontSize: 13, textDecoration: 'none' }}
      >
        {event.primary_action.label} →
      </Link>
    </article>
  );
}

function RivalryVote({
  event,
  interaction,
  onInteraction,
  accent,
}: {
  event: WorldEvent;
  interaction: ReturnType<typeof getEventInteraction>;
  onInteraction: () => void;
  accent: string;
}) {
  const options = event.rivalry_options ?? [];
  const split = event.rivalry_split ?? {};
  return (
    <div style={{ marginTop: 14 }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
        {options.map((o) => (
          <button
            key={o.id}
            type="button"
            onClick={() => {
              recordEventVote(event.event_id, o.id, event.world_slug);
              onInteraction();
            }}
            style={{
              padding: '8px 14px',
              background: interaction.vote === o.id ? '#2A2520' : '#0F0F12',
              border: `1px solid ${interaction.vote === o.id ? accent : '#2A2A2E'}`,
              borderRadius: 6,
              color: '#E8E8EC',
              fontSize: 12,
              cursor: 'pointer',
            }}
          >
            {o.label}
          </button>
        ))}
      </div>
      {interaction.vote && split[interaction.vote] !== undefined && (
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 10 }}>
          This week&apos;s pulse: {options.map((o) => `${o.label} ${split[o.id] ?? 0}%`).join(' · ')}
          {' '}(your vote: {options.find((o) => o.id === interaction.vote)?.label})
        </p>
      )}
    </div>
  );
}

function DebatePick({
  event,
  interaction,
  onInteraction,
  accent,
}: {
  event: WorldEvent;
  interaction: ReturnType<typeof getEventInteraction>;
  onInteraction: () => void;
  accent: string;
}) {
  const options = event.debate_options ?? [];
  return (
    <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => {
            recordDebateChoice(event.event_id, o.id);
            onInteraction();
          }}
          style={{
            padding: '8px 14px',
            background: interaction.debate_choice === o.id ? '#2A2520' : '#0F0F12',
            border: `1px solid ${interaction.debate_choice === o.id ? accent : '#2A2A2E'}`,
            borderRadius: 6,
            color: '#E8E8EC',
            fontSize: 12,
            cursor: 'pointer',
          }}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

function ChallengeComplete({
  event,
  interaction,
  onInteraction,
  accent,
}: {
  event: WorldEvent;
  interaction: ReturnType<typeof getEventInteraction>;
  onInteraction: () => void;
  accent: string;
}) {
  return (
    <button
      type="button"
      onClick={() => {
        recordEventComplete(event);
        onInteraction();
      }}
      disabled={interaction.completed}
      style={{
        marginTop: 12,
        padding: '10px 16px',
        background: interaction.completed ? '#2A4A2A' : '#2A2520',
        border: 'none',
        borderRadius: 6,
        color: '#E8E8EC',
        fontSize: 13,
        cursor: interaction.completed ? 'default' : 'pointer',
      }}
    >
      {interaction.completed ? 'Challenge complete ✓' : 'Mark challenge complete'}
    </button>
  );
}

function YourInteractions({
  snapshot,
  accent,
  refresh,
}: {
  snapshot: WorldEventsSnapshot;
  accent: string;
  refresh: number;
}) {
  void refresh;
  const active = snapshot.events.filter((e) => {
    const i = getEventInteraction(e.event_id);
    return i.vote || i.completed || i.saved || i.debate_choice;
  });
  if (active.length === 0) return null;
  return (
    <section style={{ marginTop: 28, padding: 18, background: '#0F1210', borderRadius: 8, border: `1px solid ${accent}33` }}>
      <p style={{ color: accent, fontSize: 11, margin: 0, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        Your week
      </p>
      <ul style={{ color: '#8A8A8E', fontSize: 13, marginTop: 10, paddingLeft: 18, lineHeight: 1.8 }}>
        {active.map((e) => {
          const i = getEventInteraction(e.event_id);
          let note = e.title;
          if (i.vote && e.rivalry_options) note += ` — voted ${e.rivalry_options.find((o) => o.id === i.vote)?.label}`;
          if (i.debate_choice && e.debate_options) note += ` — ${e.debate_options.find((o) => o.id === i.debate_choice)?.label}`;
          if (i.completed) note += ' — completed';
          if (i.saved) note += ' — saved';
          return <li key={e.event_id}>{note}</li>;
        })}
      </ul>
    </section>
  );
}

/** Compact teaser for world hub */
export function WorldEventsTeaser({ worldSlug, accent = '#6B9B6B' }: Props) {
  const snapshot = useMemo(() => getActiveWorldEvents(worldSlug), [worldSlug]);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!snapshot || !mounted) return null;

  const rivalry = snapshot.events.find((e) => e.event_type === 'weekly_rivalry');
  const challenge = snapshot.events.find((e) => e.event_type === 'challenge');

  return (
    <section
      style={{
        marginTop: 24,
        padding: 22,
        background: 'linear-gradient(160deg, #0A0A0E 0%, #12121A 100%)',
        border: `1px solid ${accent}44`,
        borderRadius: 12,
      }}
    >
      <p style={{ color: accent, fontSize: 11, letterSpacing: '0.1em', textTransform: 'uppercase', margin: 0 }}>
        Live today
      </p>
      <p style={{ color: '#E8E8EC', fontSize: 18, marginTop: 10, lineHeight: 1.4 }}>{snapshot.hero_title}</p>
      <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 8 }}>{snapshot.hero_hook}</p>
      {rivalry && <p style={{ color: '#D4847A', fontSize: 12, marginTop: 10 }}>Rivalry: {rivalry.title}</p>}
      {challenge && <p style={{ color: '#6B9B6B', fontSize: 12, marginTop: 6 }}>Challenge: {challenge.title}</p>}
      <Link href={`/${worldSlug}/today`} style={{ display: 'inline-block', marginTop: 14, color: accent, fontSize: 14 }}>
        Open today page →
      </Link>
    </section>
  );
}

/** Cross-world panel for home + my-journey */
export function CrossWorldEventsPanel() {
  const [mounted, setMounted] = useState(false);
  const highlights = useMemo(() => getCrossWorldEventHighlights(), []);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <section style={{ marginTop: 28 }}>
      <h2 style={{ fontSize: 14, color: '#D4847A', fontWeight: 400 }}>What&apos;s alive today across your worlds</h2>
      <p style={{ color: '#6B6B70', fontSize: 13, marginTop: 6 }}>Events are state — not articles. Something is happening.</p>
      <div style={{ marginTop: 14, display: 'grid', gap: 10 }}>
        {highlights.map((h) => (
          <Link
            key={h.world_slug}
            href={h.href}
            style={{
              display: 'block',
              padding: 16,
              background: '#111114',
              borderRadius: 8,
              border: '1px solid #1A1A1E',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <p style={{ color: '#6B6B70', fontSize: 10, margin: 0, textTransform: 'uppercase' }}>{h.world_slug.replace(/-/g, ' ')}</p>
            <p style={{ color: '#E8E8EC', fontSize: 15, marginTop: 6 }}>{h.hero_title}</p>
            {h.challenge_title && (
              <p style={{ color: '#6B9B6B', fontSize: 12, marginTop: 6 }}>Challenge: {h.challenge_title}</p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}

export function CommunityEventsStrip({ worldSlug, accent = '#6B9B6B' }: Props) {
  const snapshot = useMemo(() => getActiveWorldEvents(worldSlug), [worldSlug]);
  if (!snapshot) return null;
  const challenge = snapshot.events.find((e) => e.event_type === 'challenge');
  const debate = snapshot.events.find((e) => e.event_type === 'debate');
  if (!challenge && !debate) return null;
  return (
    <section style={{ marginTop: 24, padding: 18, background: '#0F0F12', borderRadius: 8, border: `1px solid ${accent}33` }}>
      <p style={{ color: accent, fontSize: 11, letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
        This week in {worldSlug.replace(/-/g, ' ')}
      </p>
      {challenge && <p style={{ color: '#E8E8EC', fontSize: 14, marginTop: 10 }}>Challenge: {challenge.title}</p>}
      {debate && <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8 }}>Debate: {debate.title}</p>}
      <Link href={`/${worldSlug}/today`} style={{ display: 'inline-block', marginTop: 12, color: accent, fontSize: 13 }}>
        Join the event →
      </Link>
    </section>
  );
}
