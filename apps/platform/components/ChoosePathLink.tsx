'use client';

import Link from 'next/link';
import { trackPathClicked } from '../lib/validation-tracker';

export function ChoosePathLink() {
  return (
    <Link
      href="/future-proof?choose=ai-builder"
      onClick={() => trackPathClicked('ai-builder', '/ai-builder', '/future-proof?choose=ai-builder')}
      style={{
        padding: '12px 20px',
        border: '1px solid #2A4A2A',
        borderRadius: 6,
        fontSize: 14,
        color: '#6B9B6B',
        textDecoration: 'none',
      }}
    >
      Choose this path →
    </Link>
  );
}
