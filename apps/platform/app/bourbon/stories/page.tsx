import Link from 'next/link';
import { getBourbonPageDepth } from '../../../lib/bourbon-level-1/deep-copy';
import { BourbonDeepPageShell } from '../../../components/bourbon/BourbonDeepPageShell';
import { BOURBON_STORIES } from '../../../lib/bourbon-level-1/stories';

export const metadata = { title: 'Bourbon History Stories | Foundry' };

export default function BourbonStoriesPage() {
  const content = getBourbonPageDepth('stories')!;
  return (
    <BourbonDeepPageShell content={content} backHref="/bourbon/level-1" backLabel="← Level 1 HQ">
      <div style={{ display: 'grid', gap: 12 }}>
        {BOURBON_STORIES.map((s) => (
          <Link
            key={s.slug}
            href={`/bourbon/stories/${s.slug}`}
            style={{ display: 'block', padding: 20, background: 'var(--foundry-surface-raised)', borderRadius: 10, textDecoration: 'none', color: 'inherit', border: '1px solid var(--foundry-border-subtle)' }}
          >
            <p style={{ color: 'var(--foundry-text)', fontSize: 16, margin: 0 }}>{s.title}</p>
            <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 6 }}>{s.subtitle} · {s.readMinutes} min read</p>
          </Link>
        ))}
      </div>
    </BourbonDeepPageShell>
  );
}
