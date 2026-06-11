import Link from 'next/link';
import { notFound } from 'next/navigation';
import { InterestListJoin } from '../../../components/InterestListJoin';
import { ValidationPageTracker } from '../../../components/ValidationPageTracker';
import {
  EXPLORE_STATUS_COLORS,
  EXPLORE_STATUS_LABELS,
  getExplorePath,
} from '../../../lib/explore-catalog';

export const dynamic = 'force-dynamic';

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return [
    { slug: 'financial-independence' },
    { slug: 'public-speaking' },
    { slug: 'civic-engagement' },
    { slug: 'bbq' },
    { slug: 'master-gardener' },
    { slug: 'poker' },
    { slug: 'soccer' },
    { slug: 'books' },
    { slug: 'movies' },
  ];
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const path = getExplorePath(slug);
  if (!path) return { title: 'Path not found | Foundry' };
  return {
    title: `${path.name} | Explore Foundry`,
    description: path.become,
  };
}

export default async function ExplorePathPage({ params }: Props) {
  const { slug } = await params;
  const path = getExplorePath(slug);
  if (!path) notFound();

  if (path.live_href && (path.status === 'live' || path.status === 'validating' || path.status === 'in_build')) {
    const { redirect } = await import('next/navigation');
    redirect(path.live_href);
  }

  const colors = EXPLORE_STATUS_COLORS[path.status];
  const openingCopy =
    path.status === 'in_build'
      ? 'In development'
      : path.status === 'planned'
        ? 'Opening soon'
        : path.status === 'paused'
          ? 'Not scheduled yet'
          : EXPLORE_STATUS_LABELS[path.status];

  return (
    <main
      style={{
        minHeight: '100vh',
        backgroundColor: '#08080A',
        color: '#E8E8EC',
        padding: '2rem',
        maxWidth: 720,
        margin: '0 auto',
      }}
    >
      <ValidationPageTracker page={`/explore/${slug}`} />
      <Link href="/explore" style={{ color: '#6B6B70', fontSize: 13 }}>
        ← Explore all paths
      </Link>

      <section style={{ marginTop: 28, padding: 28, background: '#0F0F12', borderRadius: 8, border: `1px solid ${colors.border}` }}>
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 11,
            color: colors.text,
            padding: '4px 10px',
            background: colors.bg,
            border: `1px solid ${colors.border}`,
            borderRadius: 999,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: colors.dot }} />
          {openingCopy}
        </span>
        <h1 style={{ fontWeight: 300, fontSize: '2rem', marginTop: 16 }}>{path.name}</h1>
        <p style={{ color: '#8A8A8E', fontSize: 15, marginTop: 12 }}>{path.outcome}</p>
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 8 }}>
          {path.tier}
          {path.launch_rank != null ? ` · Launch priority #${path.launch_rank}` : ''}
        </p>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#111114', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>What this path helps you become</h2>
        <p style={{ color: '#E8E8EC', fontSize: 15, marginTop: 16, lineHeight: 1.7 }}>{path.become}</p>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#0F0F12', borderRadius: 8 }}>
        <h2 style={{ fontSize: 14, color: '#6B9B6B', margin: 0 }}>Projects you&apos;ll complete</h2>
        <ul style={{ margin: '16px 0 0', paddingLeft: 20, color: '#8A8A8E', fontSize: 14, lineHeight: 1.9 }}>
          {path.planned_projects.map((project) => (
            <li key={project}>{project}</li>
          ))}
        </ul>
        <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 16 }}>
          Every project produces evidence — visible progress, not just content consumed.
        </p>
      </section>

      <section style={{ marginTop: 24, padding: 24, background: '#111114', borderRadius: 8, border: '1px solid #2A2520' }}>
        <h2 style={{ fontSize: 14, color: '#C8A96E', margin: 0 }}>Join the interest list</h2>
        <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 12 }}>
          Be first to know when {path.name} opens. No spam — just a note when the path is live.
        </p>
        <InterestListJoin pathSlug={path.slug} pathName={path.name} />
      </section>

      <p style={{ marginTop: 32, fontSize: 12, color: '#4A4A4E' }}>
        Start now:{' '}
        <Link href="/future-proof" style={{ color: '#6B9B6B' }}>
          Future-Proof Assessment
        </Link>
        {' · '}
        <Link href="/ai-builder" style={{ color: '#6B6B70' }}>
          AI Builder
        </Link>
        {' · '}
        <Link href="/explore" style={{ color: '#6B6B70' }}>
          Explore all paths
        </Link>
      </p>
    </main>
  );
}
