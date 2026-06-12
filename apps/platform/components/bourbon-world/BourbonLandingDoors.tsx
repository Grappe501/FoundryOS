'use client';

import Link from 'next/link';
import type { BourbonPageDepth } from '../../lib/bourbon-level-1/deep-copy/types';

/** One sentence visible — full depth on hover (desktop) or tap expand (details) */
function firstSentence(text: string, max = 140): string {
  const match = text.match(/^[^.!?]+[.!?]/);
  const s = match ? match[0] : text;
  return s.length <= max ? s : `${s.slice(0, max).trim()}…`;
}

type DoorProps = {
  label: string;
  teaser: string;
  depth: string;
  href?: string;
  hrefLabel?: string;
};

function LandingDoor({ label, teaser, depth, href, hrefLabel }: DoorProps) {
  return (
    <article className="bourbon-door">
      <p className="bourbon-door__label">{label}</p>
      <p className="bourbon-door__teaser">{teaser}</p>

      <div className="bourbon-door__hover-panel" role="tooltip">
        <p className="bourbon-door__depth">{depth}</p>
        {href && (
          <Link href={href} className="bourbon-door__link">
            {hrefLabel ?? 'Go deeper'} →
          </Link>
        )}
      </div>

      <details className="bourbon-door__details">
        <summary className="bourbon-door__summary">Read more</summary>
        <p className="bourbon-door__depth">{depth}</p>
        {href && (
          <Link href={href} className="bourbon-door__link">
            {hrefLabel ?? 'Go deeper'} →
          </Link>
        )}
      </details>
    </article>
  );
}

type Props = {
  content: BourbonPageDepth;
};

export function BourbonLandingDoors({ content }: Props) {
  const doors: DoorProps[] = [
    {
      label: 'The door',
      teaser: 'Not a catalog. A place you can live inside — one question at a time.',
      depth: firstSentence(content.openingNarrative, 320),
      href: '/bourbon/level-1',
      hrefLabel: 'Level 1 Hobby HQ',
    },
    {
      label: 'Why it sticks',
      teaser: 'Attention compounds. Ordinary bottles get better when you know what to notice.',
      depth: firstSentence(content.whyItMatters, 320),
      href: '/bourbon/graph/bottled-in-bond',
      hrefLabel: 'Walk the BiB hallway',
    },
    {
      label: 'Start tonight',
      teaser: 'Pick one door. Ignore the rest until tomorrow — no syllabus required.',
      depth: content.howToUse.split('. ').slice(0, 2).join('. ') + '.',
      href: content.rabbitHoles[0]?.href ?? '/bourbon/today',
      hrefLabel: content.rabbitHoles[0]?.label ?? "What's alive today",
    },
  ];

  return (
    <section id="bourbon-world-entry" className="bourbon-landing-doors">
      <p className="foundry-eyebrow">Three doors — not a lecture</p>
      <p className="foundry-muted" style={{ fontSize: 14, marginTop: 8, maxWidth: 520 }}>
        Hover or tap to dig deeper. Everything else waits below when you are ready.
      </p>
      <div className="bourbon-landing-doors__grid">
        {doors.map((d) => (
          <LandingDoor key={d.label} {...d} />
        ))}
      </div>
      <nav className="bourbon-landing-doors__quick" aria-label="Quick paths">
        {content.rabbitHoles.map((h) => (
          <Link key={h.href} href={h.href} className="bourbon-landing-doors__chip">
            {h.label}
          </Link>
        ))}
      </nav>
    </section>
  );
}
