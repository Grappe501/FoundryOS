'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/ai-builder', label: 'World', exact: true },
  { href: '/ai-builder/missions', label: 'Missions' },
  { href: '/ai-builder/academy', label: 'Academy' },
  { href: '/ai-builder/playground', label: 'Playground' },
  { href: '/ai-builder/portfolio', label: 'Portfolio' },
  { href: '/ai-builder/parents', label: 'For Parents' },
  { href: '/ai-builder/glossary', label: 'Glossary' },
  { href: '/ai-builder/learn', label: 'Guides' },
  { href: '/community/ai-builder', label: 'Community' },
] as const;

export function AiBuilderSubNav() {
  const pathname = usePathname() ?? '';

  return (
    <nav
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 6,
        marginTop: 12,
        paddingBottom: 12,
        borderBottom: '1px solid var(--foundry-border-subtle)',
      }}
      aria-label="AI Builder world"
    >
      {LINKS.map(({ href, label, ...rest }) => {
        const exact = 'exact' in rest && rest.exact;
        const active = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            style={{
              padding: '6px 12px',
              fontSize: 12,
              borderRadius: 6,
              textDecoration: 'none',
              color: active ? 'var(--foundry-text)' : 'var(--foundry-text-faint)',
              background: active ? 'var(--foundry-success-bg-subtle)' : 'transparent',
              border: `1px solid ${active ? 'var(--foundry-success-bg)' : 'transparent'}`,
            }}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
