'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/public-speaking', label: 'World', exact: true },
  { href: '/public-speaking/missions', label: 'Missions' },
  { href: '/public-speaking/academy', label: 'Academy' },
  { href: '/public-speaking/playground', label: 'Playground' },
  { href: '/public-speaking/portfolio', label: 'Portfolio' },
  { href: '/public-speaking/parents', label: 'For Parents' },
  { href: '/public-speaking/glossary', label: 'Glossary' },
  { href: '/public-speaking/learn', label: 'Guides' },
  { href: '/community/public-speaking', label: 'Community' },
  { href: '/public-speaking/careers', label: 'Careers' },
] as const;

export function PsSubNav() {
  const pathname = usePathname() ?? '';
  return (
    <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12, paddingBottom: 12, borderBottom: '1px solid #1A1A1E' }} aria-label="Public Speaking world">
      {LINKS.map(({ href, label, ...rest }) => {
        const exact = 'exact' in rest && rest.exact;
        const active = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link key={href} href={href} style={{ padding: '6px 12px', fontSize: 12, borderRadius: 6, textDecoration: 'none', color: active ? '#E8E8EC' : '#6B6B70', background: active ? '#1A2438' : 'transparent', border: `1px solid ${active ? '#3A4A6A' : 'transparent'}` }}>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
