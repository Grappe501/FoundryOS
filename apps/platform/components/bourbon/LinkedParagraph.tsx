import type { TextSegment } from '../../lib/bourbon-graph/inline-links';
import { linkifyParagraph } from '../../lib/bourbon-graph/inline-links';
import { InlineAtlasLink } from './InlineAtlasLink';

type Props = {
  segments: TextSegment[];
  style?: React.CSSProperties;
  className?: string;
};

/** Paragraph with first-mention inline Atlas / bottle / producer links */
export function LinkedParagraph({ segments, style }: Props) {
  return (
    <p style={{ margin: 0, lineHeight: 1.85, ...style }}>
      {segments.map((seg, i) =>
        seg.type === 'text' ? (
          <span key={i}>{seg.value}</span>
        ) : (
          <InlineAtlasLink key={i} target={seg.target}>
            {seg.value}
          </InlineAtlasLink>
        ),
      )}
    </p>
  );
}
