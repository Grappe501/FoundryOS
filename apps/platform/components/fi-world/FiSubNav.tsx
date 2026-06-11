'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/financial-independence', label: 'World', exact: true },
  { href: '/financial-independence/missions', label: 'Missions' },
  { href: '/financial-independence/academy', label: 'Academy' },
  { href: '/financial-independence/playground', label: 'Playground' },
  { href: '/financial-independence/portfolio', label: 'Portfolio' },
  { href: '/financial-independence/parents', label: 'For Parents' },
  { href: '/financial-independence/glossary', label: 'Glossary' },
  { href: '/financial-independence/learn', label: 'Guides' },
  { href: '/community/financial-independence', label: 'Community' },
  { href: '/financial-independence/careers', label: 'Careers' },
] as const;

export function FiSubNav() {
  const pathname = usePathname() ?? '';
  return (
    <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12, paddingBottom: 12, borderBottom: '1px solid #1A1A1E' }} aria-label="Financial Independence world">
      {LINKS.map(({ href, label, ...rest }) => {
        const exact = 'exact' in rest && rest.exact;
        const active = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link key={href} href={href} style={{ padding: '6px 12px', fontSize: 12, borderRadius: 6, textDecoration: 'none', color: active ? '#E8E8EC' : '#6B6B70', background: active ? '#2A2520' : 'transparent', border: `1px solid ${active ? '#4A4020' : 'transparent'}` }}>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
