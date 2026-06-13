import Link from 'next/link';
import type { Level1Tool } from '../../lib/bourbon-level-1/hub';
import { getToolDepth } from '../../lib/bourbon-level-1/deep-copy';

type ToolCard = Pick<Level1Tool, 'slug' | 'href' | 'title' | 'hook' | 'icon'>;

const ACCENT = 'var(--foundry-primary)';

export function BourbonDeepToolCard({ tool }: { tool: ToolCard }) {
  const depth = getToolDepth(tool.slug);
  return (
    <Link
      href={tool.href}
      style={{
        display: 'block',
        padding: 20,
        background: 'var(--foundry-surface-raised)',
        borderRadius: 10,
        border: '1px solid var(--foundry-border-subtle)',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <span style={{ fontSize: 22 }}>{tool.icon}</span>
      <p style={{ color: 'var(--foundry-text)', fontSize: 16, margin: '12px 0 0', fontWeight: 500 }}>{tool.title}</p>
      {depth ? (
        <>
          <p style={{ color: ACCENT, fontSize: 13, marginTop: 8, lineHeight: 1.5 }}>{depth.hook}</p>
          <p style={{ color: '#A8A8AC', fontSize: 14, marginTop: 10, lineHeight: 1.75 }}>{depth.explanation}</p>
          <p style={{ color: 'var(--foundry-text-faint)', fontSize: 12, marginTop: 12, fontStyle: 'italic' }}>{depth.practicalReason}</p>
        </>
      ) : (
        <p style={{ color: 'var(--foundry-text-muted)', fontSize: 13, marginTop: 8, lineHeight: 1.5 }}>{tool.hook}</p>
      )}
    </Link>
  );
}
