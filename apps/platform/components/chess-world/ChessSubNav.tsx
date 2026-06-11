'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/chess', label: 'World', exact: true },
  { href: '/chess/missions', label: 'Missions' },
  { href: '/chess/academy', label: 'Academy' },
  { href: '/chess/portfolio', label: 'Portfolio' },
  { href: '/chess/community', label: 'Community' },
] as const;

export function ChessSubNav() {
  const pathname = usePathname() ?? '';
  return (
    <nav
      style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12, paddingBottom: 12, borderBottom: '1px solid #1A1A1E' }}
      aria-label="Chess world"
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
              color: active ? '#E8E8EC' : '#6B6B70',
              background: active ? '#3A4A3A' : 'transparent',
              border: `1px solid ${active ? '#3A4A3A' : 'transparent'}`,
            }}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
