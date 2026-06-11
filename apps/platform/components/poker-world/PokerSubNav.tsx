'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/poker', label: 'World', exact: true },
  { href: '/poker/missions', label: 'Missions' },
  { href: '/poker/academy', label: 'Academy' },
  { href: '/poker/playground', label: 'Playground' },
  { href: '/poker/portfolio', label: 'Portfolio' },
  { href: '/poker/parents', label: 'For Parents' },
  { href: '/poker/glossary', label: 'Glossary' },
  { href: '/poker/learn', label: 'Guides' },
  { href: '/poker/careers', label: 'Careers' },
  { href: '/community/poker', label: 'Community' },
] as const;

export function PokerSubNav() {
  const pathname = usePathname() ?? '';
  return (
    <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12, paddingBottom: 12, borderBottom: '1px solid #1A1A1E' }} aria-label="Poker world">
      {LINKS.map(({ href, label, ...rest }) => {
        const exact = 'exact' in rest && rest.exact;
        const active = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link key={href} href={href} style={{ padding: '6px 12px', fontSize: 12, borderRadius: 6, textDecoration: 'none', color: active ? '#E8E8EC' : '#6B6B70', background: active ? '#3A4A6A' : 'transparent', border: `1px solid ${active ? '#3A4A6A' : 'transparent'}` }}>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
