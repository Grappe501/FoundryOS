import Link from 'next/link';
import type { Level1Tool } from '../../lib/bourbon-level-1/hub';
import { getToolDepth } from '../../lib/bourbon-level-1/deep-copy';

const ACCENT = 'var(--foundry-primary)';

export function BourbonDeepToolCard({ tool }: { tool: Level1Tool }) {
  const depth = getToolDepth(tool.slug);
  return (
    <Link
      href={tool.href}
      style={{
        display: 'block',
        padding: 20,
        background: '#111114',
        borderRadius: 10,
        border: '1px solid #1A1A1E',
        textDecoration: 'none',
        color: 'inherit',
      }}
    >
      <span style={{ fontSize: 22 }}>{tool.icon}</span>
      <p style={{ color: '#E8E8EC', fontSize: 16, margin: '12px 0 0', fontWeight: 500 }}>{tool.title}</p>
      {depth ? (
        <>
          <p style={{ color: ACCENT, fontSize: 13, marginTop: 8, lineHeight: 1.5 }}>{depth.hook}</p>
          <p style={{ color: '#A8A8AC', fontSize: 14, marginTop: 10, lineHeight: 1.75 }}>{depth.explanation}</p>
          <p style={{ color: '#6B6B70', fontSize: 12, marginTop: 12, fontStyle: 'italic' }}>{depth.practicalReason}</p>
        </>
      ) : (
        <p style={{ color: '#8A8A8E', fontSize: 13, marginTop: 8, lineHeight: 1.5 }}>{tool.hook}</p>
      )}
    </Link>
  );
}
