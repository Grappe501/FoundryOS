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
        border: '1px solid var(--foundry-success-bg)',
        borderRadius: 6,
        fontSize: 14,
        color: 'var(--foundry-success)',
        textDecoration: 'none',
      }}
    >
      Choose this path →
    </Link>
  );
}
