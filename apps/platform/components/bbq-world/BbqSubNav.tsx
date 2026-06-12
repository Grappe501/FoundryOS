'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/bbq', label: 'World', exact: true },
  { href: '/bbq/missions', label: 'Missions' },
  { href: '/bbq/academy', label: 'Academy' },
  { href: '/bbq/playground', label: 'Playground' },
  { href: '/bbq/portfolio', label: 'Portfolio' },
  { href: '/bbq/parents', label: 'For Parents' },
  { href: '/bbq/glossary', label: 'Glossary' },
  { href: '/bbq/learn', label: 'Guides' },
  { href: '/bbq/careers', label: 'Careers' },
  { href: '/community/bbq', label: 'Community' },
] as const;

export function BbqSubNav() {
  const pathname = usePathname() ?? '';
  return (
    <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12, paddingBottom: 12, borderBottom: '1px solid var(--foundry-border-subtle)' }} aria-label="BBQ world">
      {LINKS.map(({ href, label, ...rest }) => {
        const exact = 'exact' in rest && rest.exact;
        const active = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link key={href} href={href} style={{ padding: '6px 12px', fontSize: 12, borderRadius: 6, textDecoration: 'none', color: active ? 'var(--foundry-text)' : 'var(--foundry-text-faint)', background: active ? '#4A3020' : 'transparent', border: `1px solid ${active ? '#4A3020' : 'transparent'}` }}>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
