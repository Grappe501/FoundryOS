'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  getWorldLore,
  LORE_SECTION_LABELS,
  LORE_VOICE,
  type LoreSection,
  type WorldLoreBundle,
} from '@foundry/lore-engine';

type Props = {
  worldSlug: string;
  accent?: string;
  backHref?: string;
  backLabel?: string;
};

const SECTION_ORDER: LoreSection[] = [
  'legends',
  'debates',
  'legendary-objects',
  'heroes',
  'rivalries',
  'mysteries',
  'pilgrimages',
  'controversies',
  'secrets',
  'timeline',
  'why-matters',
  'experience',
];

export function WorldLoreHub({ worldSlug, accent = '#C8A96E', backHref, backLabel }: Props) {
  const lore = getWorldLore(worldSlug);
  if (!lore) {
    return (
      <p style={{ color: '#8A8A8E' }}>
        Lore for this world is coming soon.
      </p>
    );
  }

  const sections = SECTION_ORDER.filter((s) => sectionHasContent(lore, s));

  return (
    <div>
      <header>
        <p style={{ color: accent, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
          Most people never learn this
        </p>
        <h1 style={{ fontWeight: 300, fontSize: '2.25rem', marginTop: 12, lineHeight: 1.25 }}>
          {lore.world_name} mythology
        </h1>
        <p style={{ color: '#8A8A8E', fontSize: 15, marginTop: 12, lineHeight: 1.7, maxWidth: 640 }}>
          {lore.tagline}
        </p>
        {backHref && (
          <Link href={backHref} style={{ display: 'inline-block', marginTop: 16, color: '#6B6B70', fontSize: 13 }}>
            ← {backLabel ?? 'Back'}
          </Link>
        )}
        <Link href={`/${worldSlug}/today`} style={{ display: 'inline-block', marginTop: 16, marginLeft: backHref ? 16 : 0, color: accent, fontSize: 13 }}>
          What&apos;s alive today →
        </Link>
      </header>

      <nav
        style={{
          marginTop: 28,
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          paddingBottom: 16,
          borderBottom: '1px solid #1A1A1E',
        }}
        aria-label="Lore sections"
      >
        {sections.map((s) => (
          <a
            key={s}
            href={`#lore-${s}`}
            style={{
              padding: '6px 12px',
              fontSize: 12,
              borderRadius: 999,
              textDecoration: 'none',
              color: '#8A8A8E',
              border: '1px solid #2A2A2E',
            }}
          >
            {LORE_VOICE[s]?.label ?? LORE_SECTION_LABELS[s]}
          </a>
        ))}
      </nav>

      {sections.map((s) => (
        <LoreSectionBlock key={s} section={s} lore={lore} accent={accent} worldSlug={worldSlug} />
      ))}
    </div>
  );
}

function sectionHasContent(lore: WorldLoreBundle, section: LoreSection): boolean {
  switch (section) {
    case 'heroes': return lore.heroes.length > 0;
    case 'legends': return (lore.legends?.length ?? 0) > 0;
    case 'debates': return (lore.debates?.length ?? 0) > 0;
    case 'legendary-objects': return (lore.legendaryObjects?.length ?? 0) > 0;
    case 'rivalries': return lore.rivalries.length > 0;
    case 'mysteries': return lore.mysteries.length > 0;
    case 'pilgrimages': return lore.pilgrimages.length > 0;
    case 'controversies': return lore.controversies.length > 0;
    case 'secrets': return lore.secrets.length > 0;
    case 'timeline': return lore.timeline.length > 0;
    case 'why-matters': return lore.whyMatters.length > 0;
    case 'experience': return (lore.experienceBeyond?.length ?? 0) > 0;
    default: return false;
  }
}

function LoreSectionBlock({
  section,
  lore,
  accent,
  worldSlug,
}: {
  section: LoreSection;
  lore: WorldLoreBundle;
  accent: string;
  worldSlug: string;
}) {
  return (
    <section id={`lore-${section}`} style={{ marginTop: 48, scrollMarginTop: 24 }}>
      <h2 style={{ fontSize: 14, color: accent, fontWeight: 400, textTransform: 'uppercase', letterSpacing: '0.06em', margin: 0 }}>
        {LORE_VOICE[section]?.label ?? LORE_SECTION_LABELS[section]}
      </h2>

      <p style={{ fontSize: 12, color: '#6B6B70', marginTop: 6, marginBottom: 0 }}>
        {LORE_VOICE[section]?.kicker}
      </p>

      {section === 'legends' && lore.legends && (
        <div style={{ marginTop: 20, display: 'grid', gap: 12 }}>
          {lore.legends.map((leg) => (
            <Link key={leg.id} href={`/${worldSlug}/legends/${leg.id}`} style={{ display: 'block', padding: 20, background: '#111114', borderRadius: 10, textDecoration: 'none', border: '1px solid #1A1A1E' }}>
              <p style={{ color: '#E8E8EC', fontSize: 16, margin: 0 }}>{leg.title}</p>
              <p style={{ color: accent, fontSize: 13, marginTop: 8 }}>{leg.hook}</p>
            </Link>
          ))}
        </div>
      )}

      {section === 'debates' && lore.debates && (
        <div style={{ marginTop: 20, display: 'grid', gap: 16 }}>
          {lore.debates.map((d) => (
            <article key={d.id} style={{ padding: 22, background: '#0F0F12', borderRadius: 12, border: '1px solid #1A1A1E' }}>
              <p style={{ color: '#E8E8EC', fontSize: 17, margin: 0 }}>{d.title}</p>
              <div style={{ marginTop: 16, display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                <div style={{ padding: 14, background: '#111114', borderRadius: 8 }}>
                  <p style={{ color: accent, fontSize: 11, margin: 0 }}>{d.campA.label}</p>
                  <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>{d.campA.argument}</p>
                </div>
                <div style={{ padding: 14, background: '#111114', borderRadius: 8 }}>
                  <p style={{ color: accent, fontSize: 11, margin: 0 }}>{d.campB.label}</p>
                  <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>{d.campB.argument}</p>
                </div>
              </div>
              <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 14, fontStyle: 'italic' }}>{d.whyPeopleReturn}</p>
            </article>
          ))}
        </div>
      )}

      {section === 'legendary-objects' && lore.legendaryObjects && (
        <div style={{ marginTop: 20, display: 'grid', gap: 10, gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
          {lore.legendaryObjects.map((o) => (
            <Link key={o.id} href={`/${worldSlug}/objects/${o.id}`} style={{ display: 'block', padding: 18, background: '#111114', borderRadius: 10, textDecoration: 'none', border: `1px solid ${accent}22` }}>
              <p style={{ color: '#E8E8EC', fontSize: 15, margin: 0 }}>{o.name}</p>
              <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8 }}>{o.tagline}</p>
            </Link>
          ))}
        </div>
      )}

      {section === 'heroes' && (
        <div style={{ marginTop: 20, display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
          {lore.heroes.map((h) => (
            <article key={h.id} style={{ padding: 22, background: '#111114', borderRadius: 12, border: '1px solid #1A1A1E' }}>
              <p style={{ color: '#E8E8EC', fontSize: 18, margin: 0, fontWeight: 400 }}>{h.name}</p>
              <p style={{ color: accent, fontSize: 13, marginTop: 8, lineHeight: 1.5 }}>{h.tagline}</p>
              <dl style={{ marginTop: 16, fontSize: 13, lineHeight: 1.65 }}>
                <LoreField label="Obsession" value={h.obsession} />
                <LoreField label="Failure" value={h.failure} />
                <LoreField label="Breakthrough" value={h.breakthrough} />
                <LoreField label="Why it matters" value={h.whyMatters} accent={accent} />
              </dl>
            </article>
          ))}
        </div>
      )}

      {section === 'rivalries' && (
        <div style={{ marginTop: 20, display: 'grid', gap: 16 }}>
          {lore.rivalries.map((r) => (
            <article key={r.id} style={{ padding: 22, background: '#0F0F12', borderRadius: 12, border: '1px solid #1A1A1E' }}>
              <p style={{ color: '#E8E8EC', fontSize: 17, margin: 0 }}>{r.title}</p>
              <div style={{ marginTop: 16, display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                <div style={{ padding: 14, background: '#111114', borderRadius: 8 }}>
                  <p style={{ color: accent, fontSize: 11, margin: 0 }}>{r.sideA.label}</p>
                  <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>{r.sideA.argument}</p>
                </div>
                <div style={{ padding: 14, background: '#111114', borderRadius: 8 }}>
                  <p style={{ color: accent, fontSize: 11, margin: 0 }}>{r.sideB.label}</p>
                  <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>{r.sideB.argument}</p>
                </div>
              </div>
              <p style={{ color: '#E8E8EC', fontSize: 14, marginTop: 16, lineHeight: 1.6 }}>
                <span style={{ color: '#6B6B70' }}>Foundry take: </span>
                {r.foundryTake}
              </p>
              {r.href && (
                <Link href={r.href} style={{ display: 'inline-block', marginTop: 12, color: accent, fontSize: 13 }}>
                  Explore this rivalry →
                </Link>
              )}
            </article>
          ))}
        </div>
      )}

      {section === 'mysteries' && (
        <div style={{ marginTop: 20, display: 'grid', gap: 12 }}>
          {lore.mysteries.map((m) => (
            <MysteryCard key={m.id} mystery={m} accent={accent} />
          ))}
        </div>
      )}

      {section === 'pilgrimages' && (
        <div style={{ marginTop: 20, display: 'grid', gap: 10, gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))' }}>
          {lore.pilgrimages.map((p) => (
            <article key={p.id} style={{ padding: 18, background: '#111114', borderRadius: 10, border: `1px solid ${accent}22` }}>
              <p style={{ color: '#E8E8EC', fontSize: 15, margin: 0 }}>{p.title}</p>
              <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8, lineHeight: 1.6 }}>{p.description}</p>
              {p.href && (
                <Link href={p.href} style={{ display: 'inline-block', marginTop: 12, color: accent, fontSize: 13 }}>
                  Start pilgrimage →
                </Link>
              )}
            </article>
          ))}
        </div>
      )}

      {section === 'controversies' && (
        <div style={{ marginTop: 20, display: 'grid', gap: 16 }}>
          {lore.controversies.map((c) => (
            <article key={c.id} style={{ padding: 22, background: '#111114', borderRadius: 12, border: '1px solid #1A1A1E' }}>
              <p style={{ color: '#E8E8EC', fontSize: 16, margin: 0 }}>{c.debate}</p>
              <div style={{ marginTop: 14, display: 'grid', gap: 10, gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
                <p style={{ color: '#8A8A8E', fontSize: 13, margin: 0, lineHeight: 1.6 }}><strong style={{ color: '#6B6B70', fontWeight: 400 }}>Camp A: </strong>{c.campA}</p>
                <p style={{ color: '#8A8A8E', fontSize: 13, margin: 0, lineHeight: 1.6 }}><strong style={{ color: '#6B6B70', fontWeight: 400 }}>Camp B: </strong>{c.campB}</p>
              </div>
              <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 14, fontStyle: 'italic' }}>{c.whyItEndures}</p>
            </article>
          ))}
        </div>
      )}

      {section === 'secrets' && (
        <div style={{ marginTop: 20, display: 'grid', gap: 12 }}>
          {lore.secrets.map((s) => (
            <article key={s.id} style={{ padding: 20, background: 'linear-gradient(135deg, #0F0F12 0%, #141418 100%)', borderRadius: 10, border: `1px solid ${accent}33` }}>
              <p style={{ color: accent, fontSize: 11, margin: 0, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{LORE_VOICE.secrets.label}</p>
              <p style={{ color: '#E8E8EC', fontSize: 16, marginTop: 10, lineHeight: 1.5 }}>{s.headline}</p>
              <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 10, lineHeight: 1.65 }}>{s.body}</p>
              <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 12 }}>{s.whyFeelsSecret}</p>
            </article>
          ))}
        </div>
      )}

      {section === 'timeline' && (
        <div style={{ marginTop: 24, borderLeft: `2px solid ${accent}44`, paddingLeft: 24 }}>
          {lore.timeline.map((e, i) => (
            <article key={`${e.year}-${i}`} style={{ marginBottom: 28, position: 'relative' }}>
              <span style={{ position: 'absolute', left: -31, top: 4, width: 10, height: 10, borderRadius: '50%', background: accent }} />
              <p style={{ color: accent, fontSize: 13, margin: 0 }}>{e.year}</p>
              <p style={{ color: '#E8E8EC', fontSize: 16, marginTop: 4 }}>{e.title}</p>
              <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 8, lineHeight: 1.65 }}>{e.body}</p>
            </article>
          ))}
        </div>
      )}

      {section === 'why-matters' && (
        <div style={{ marginTop: 20, display: 'grid', gap: 16 }}>
          {lore.whyMatters.map((w) => (
            <article key={w.topic} style={{ padding: 22, background: '#111114', borderRadius: 12, border: '1px solid #1A1A1E' }}>
              <p style={{ color: accent, fontSize: 11, margin: 0, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{w.topic}</p>
              <p style={{ color: '#6B6B70', fontSize: 14, marginTop: 12, textDecoration: 'line-through', lineHeight: 1.5 }}>{w.notThis}</p>
              <p style={{ color: '#E8E8EC', fontSize: 17, marginTop: 12, lineHeight: 1.5, fontWeight: 400 }}>{w.insteadThis}</p>
              <p style={{ color: '#8A8A8E', fontSize: 14, marginTop: 12, lineHeight: 1.65 }}>{w.body}</p>
            </article>
          ))}
        </div>
      )}

      {section === 'experience' && lore.experienceBeyond && (
        <div style={{ marginTop: 20 }}>
          <p style={{ color: '#8A8A8E', fontSize: 15, lineHeight: 1.7, maxWidth: 640 }}>
            Why does glassware matter? Do you let it breathe? What impacts the experience other than the liquid?
          </p>
          <div style={{ marginTop: 20, display: 'grid', gap: 12, gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))' }}>
            {lore.experienceBeyond.map((f) => (
              <article key={f.id} style={{ padding: 18, background: '#0F0F12', borderRadius: 10, border: '1px solid #1A1A1E' }}>
                <p style={{ color: '#E8E8EC', fontSize: 15, margin: 0 }}>{f.factor}</p>
                <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 10, lineHeight: 1.6 }}>{f.why}</p>
                <p style={{ color: accent, fontSize: 12, marginTop: 12, lineHeight: 1.5 }}>{f.tip}</p>
              </article>
            ))}
          </div>
          {worldSlug === 'bourbon' && (
            <Link href="/bourbon/pour-guide" style={{ display: 'inline-block', marginTop: 20, color: accent, fontSize: 14 }}>
              Pour Impact Guide — serve method × bottle style →
            </Link>
          )}
        </div>
      )}
    </section>
  );
}

function LoreField({ label, value, accent }: { label: string; value: string; accent?: string }) {
  return (
    <>
      <dt style={{ color: '#6B6B70', fontSize: 11, marginTop: 10, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{label}</dt>
      <dd style={{ color: accent ? accent : '#8A8A8E', margin: '4px 0 0', fontSize: 13, lineHeight: 1.6 }}>{value}</dd>
    </>
  );
}

function MysteryCard({ mystery, accent }: { mystery: { id: string; question: string; tease: string; answer: string; rabbitHoleHref?: string }; accent: string }) {
  const [open, setOpen] = useState(false);
  return (
    <article style={{ padding: 20, background: '#111114', borderRadius: 10, border: '1px solid #1A1A1E' }}>
      <p style={{ color: '#E8E8EC', fontSize: 16, margin: 0 }}>{mystery.question}</p>
      <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8 }}>{mystery.tease}</p>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        style={{
          marginTop: 12,
          padding: '8px 14px',
          fontSize: 12,
          borderRadius: 6,
          border: `1px solid ${accent}`,
          background: open ? '#2A2520' : 'transparent',
          color: accent,
          cursor: 'pointer',
        }}
      >
        {open ? 'Hide the rabbit hole' : 'Peek inside'}
      </button>
      {open && (
        <div style={{ marginTop: 14 }}>
          <p style={{ color: '#E8E8EC', fontSize: 14, lineHeight: 1.65 }}>{mystery.answer}</p>
          {mystery.rabbitHoleHref && (
            <Link href={mystery.rabbitHoleHref} style={{ display: 'inline-block', marginTop: 12, color: accent, fontSize: 13 }}>
              Go deeper →
            </Link>
          )}
        </div>
      )}
    </article>
  );
}
