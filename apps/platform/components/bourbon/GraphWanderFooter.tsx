import Link from 'next/link';
import type { WanderBlock } from '../../lib/bourbon-graph/wander-blocks';
import { LinkedParagraph } from './LinkedParagraph';
import { linkifyParagraph } from '../../lib/bourbon-graph/inline-links';

type Props = {
  continueWandering: WanderBlock;
  relatedRabbitHoles: WanderBlock;
  peopleAlsoCompare: WanderBlock;
  whatThisUnlocks: WanderBlock;
};

function WanderSection({ block }: { block: WanderBlock }) {
  return (
    <section
      style={{
        marginTop: 24,
        padding: 20,
        background: '#0F0F12',
        borderRadius: 10,
        border: '1px solid #1A1A1E',
      }}
    >
      <h2 style={{ fontSize: 14, color: 'var(--foundry-primary)', fontWeight: 400, margin: 0 }}>{block.title}</h2>
      <LinkedParagraph
        segments={linkifyParagraph(block.intro, { preferGraph: true })}
        style={{ color: '#8A8A8E', fontSize: 14, marginTop: 10 }}
      />
      <div style={{ display: 'grid', gap: 10, marginTop: 16 }}>
        {block.items.map((item) => (
          <Link
            key={item.href + item.title}
            href={item.href}
            style={{
              display: 'block',
              padding: '12px 14px',
              background: '#0A0A0D',
              borderRadius: 8,
              border: '1px solid #222228',
              textDecoration: 'none',
            }}
          >
            <p style={{ color: '#E8E8EC', fontSize: 14, margin: 0, display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
              {item.title}
              {item.confidence && (
                <span style={{ fontSize: 10, color: '#6B6B70', textTransform: 'lowercase' }}>{item.confidence}</span>
              )}
            </p>
            <LinkedParagraph
              segments={linkifyParagraph(item.teaser, { preferGraph: true })}
              style={{ color: '#8A8A8E', fontSize: 12, marginTop: 8 }}
            />
          </Link>
        ))}
      </div>
    </section>
  );
}

/** PASS-040B3 — four wander blocks on every graph route */
export function GraphWanderFooter({ continueWandering, relatedRabbitHoles, peopleAlsoCompare, whatThisUnlocks }: Props) {
  return (
    <div style={{ marginTop: 36 }}>
      <p
        style={{
          color: '#6B6B70',
          fontSize: 11,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          marginBottom: 8,
        }}
      >
        Keep wandering · hard to leave on purpose
      </p>
      <WanderSection block={continueWandering} />
      <WanderSection block={relatedRabbitHoles} />
      <WanderSection block={peopleAlsoCompare} />
      <WanderSection block={whatThisUnlocks} />
    </div>
  );
}
