import Link from 'next/link';
import type { InlineLinkKind, InlineLinkTarget } from '../../lib/bourbon-graph/inline-links';

const KIND_LABEL: Partial<Record<InlineLinkKind, string>> = {
  atlas_term: 'Atlas',
  bottle: 'Bottle',
  producer: 'Producer',
  debate: 'Debate',
  collection: 'Collection',
};

type Props = {
  target: InlineLinkTarget;
  children?: React.ReactNode;
  /** Show entity kind on hover via title attribute */
  showKind?: boolean;
};

/** Single inline entity link — graph-first hrefs from inline-links registry */
export function InlineAtlasLink({ target, children, showKind = true }: Props) {
  const label = children ?? target.label;
  const title = showKind && KIND_LABEL[target.kind]
    ? `${KIND_LABEL[target.kind]} · ${target.confidence ?? 'link'}`
    : target.label;

  return (
    <Link
      href={target.href}
      title={title}
      style={{
        color: 'var(--foundry-primary)',
        textDecoration: 'underline',
        textDecorationStyle: 'solid',
        textUnderlineOffset: 3,
        fontWeight: 500,
      }}
    >
      {label}
    </Link>
  );
}
