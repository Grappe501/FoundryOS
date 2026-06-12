'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/bourbon', label: 'World', exact: true },
  { href: '/bourbon/level-1', label: 'Level 1 HQ' },
  { href: '/bourbon/investigate', label: 'Investigate' },
  { href: '/bourbon/detective', label: 'Detective' },
  { href: '/bourbon/beyond-the-bottle', label: 'Beyond' },
  { href: '/bourbon/lore', label: 'Lore' },
  { href: '/bourbon/what-should-i-buy', label: 'Buy' },
  { href: '/bourbon/games', label: 'Games' },
  { href: '/bourbon/lab', label: 'Lab' },
  { href: '/bourbon/producers', label: 'Producers' },
  { href: '/bourbon/portfolio', label: 'My Shelf' },
  { href: '/bourbon/daily', label: 'Daily' },
  { href: '/bourbon/glossary', label: 'Glossary' },
  { href: '/community/bourbon', label: 'Community' },
] as const;

export function BourbonSubNav() {
  const pathname = usePathname() ?? '';
  return (
    <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12, paddingBottom: 12, borderBottom: '1px solid #1A1A1E' }} aria-label="Bourbon world">
      {LINKS.map(({ href, label, ...rest }) => {
        const exact = 'exact' in rest && rest.exact;
        const active = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link key={href} href={href} style={{ padding: '6px 12px', fontSize: 12, borderRadius: 6, textDecoration: 'none', color: active ? '#E8E8EC' : '#6B6B70', background: active ? '#4A4020' : 'transparent', border: `1px solid ${active ? '#4A4020' : 'transparent'}` }}>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
