import Link from 'next/link';
import type { BourbonPageDepth } from '../../lib/bourbon-level-1/deep-copy/types';
import { BourbonAtlasParagraph } from './BourbonAtlasParagraph';

const ACCENT = 'var(--foundry-primary)';

type Props = {
  content: BourbonPageDepth;
  backHref?: string;
  backLabel?: string;
  children?: React.ReactNode;
};

export function BourbonDeepPageShell({ content, backHref, backLabel, children }: Props) {
  return (
    <article style={{ marginTop: backHref ? 16 : 0 }}>
      {backHref && (
        <Link href={backHref} style={{ color: 'var(--foundry-text-faint)', fontSize: 13 }}>
          {backLabel ?? '← Back'}
        </Link>
      )}

      <header style={{ marginTop: backHref ? 12 : 0, maxWidth: 720 }}>
        <h1 style={{ fontWeight: 300, fontSize: '2.25rem', marginTop: 8, lineHeight: 1.25 }}>{content.title}</h1>
        <div style={{ marginTop: 20, color: '#C4C4C8', fontSize: 16, lineHeight: 1.85 }}>{paragraphs(content.openingNarrative)}</div>
      </header>

      <BourbonDepthSections content={content} />

      {children && <div style={{ marginTop: 32 }}>{children}</div>}

      <RabbitHoleSection links={content.rabbitHoles} />
    </article>
  );
}

export function BourbonDepthSections({ content }: { content: BourbonPageDepth }) {
  return (
    <>
      <DepthSection title="Why this matters" body={content.whyItMatters} />
      <DepthSection title="What beginners get wrong" body={content.beginnerMisunderstanding} />
      <DepthSection title="Real-world example" body={content.realWorldExample} accent />
      <DepthSection title="How to use this" body={content.howToUse} />
      <DepthSection title="What to notice next" body={content.whatToNoticeNext} />
    </>
  );
}

function paragraphs(text: string) {
  return text.split(/\n\n+/).map((p) => (
    <p key={p.slice(0, 24)} style={{ margin: '0 0 1em' }}>
      <BourbonAtlasParagraph text={p} />
    </p>
  ));
}

function DepthSection({ title, body, accent }: { title: string; body: string; accent?: boolean }) {
  return (
    <section style={{ marginTop: 28, maxWidth: 720 }}>
      <h2 style={{ fontSize: 13, color: accent ? ACCENT : 'var(--foundry-text-faint)', fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0 }}>
        {title}
      </h2>
      <p style={{ color: '#A8A8AC', fontSize: 15, marginTop: 12, lineHeight: 1.8 }}>
        <BourbonAtlasParagraph text={body} />
      </p>
    </section>
  );
}

function RabbitHoleSection({ links }: { links: BourbonPageDepth['rabbitHoles'] }) {
  if (links.length === 0) return null;
  return (
    <section style={{ marginTop: 36, padding: 20, background: 'var(--foundry-surface)', borderRadius: 10, border: '1px solid var(--foundry-border-subtle)', maxWidth: 720 }}>
      <h2 style={{ fontSize: 13, color: ACCENT, fontWeight: 400, letterSpacing: '0.06em', textTransform: 'uppercase', margin: 0 }}>
        Rabbit holes
      </h2>
      <ul style={{ listStyle: 'none', padding: 0, marginTop: 14 }}>
        {links.map((l) => (
          <li key={l.href} style={{ marginTop: 10 }}>
            <Link href={l.href} style={{ color: 'var(--foundry-text)', fontSize: 15, textDecoration: 'none' }}>
              {l.label} →
            </Link>
            {l.tease && <p style={{ color: 'var(--foundry-text-faint)', fontSize: 13, marginTop: 4 }}>{l.tease}</p>}
          </li>
        ))}
      </ul>
    </section>
  );
}

/** World home intro — sits above premium hub on /bourbon */
export function BourbonWorldDepthIntro({ content }: { content: BourbonPageDepth }) {
  return (
    <section style={{ marginBottom: 32, maxWidth: 720 }}>
      <p style={{ color: ACCENT, fontSize: 11, letterSpacing: '0.12em', textTransform: 'uppercase', margin: 0 }}>
        Worth reading before you click anything
      </p>
      <div style={{ marginTop: 16, color: '#B8B8BC', fontSize: 16, lineHeight: 1.85 }}>{paragraphs(content.openingNarrative)}</div>
      <p style={{ color: 'var(--foundry-text-muted)', fontSize: 15, marginTop: 16, lineHeight: 1.75 }}>{content.whyItMatters}</p>
    </section>
  );
}
