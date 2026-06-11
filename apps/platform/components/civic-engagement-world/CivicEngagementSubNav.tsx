'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/civic-engagement', label: 'World', exact: true },
  { href: '/civic-engagement/missions', label: 'Missions' },
  { href: '/civic-engagement/academy', label: 'Academy' },
  { href: '/civic-engagement/playground', label: 'Playground' },
  { href: '/civic-engagement/portfolio', label: 'Portfolio' },
  { href: '/civic-engagement/parents', label: 'For Parents' },
  { href: '/civic-engagement/glossary', label: 'Glossary' },
  { href: '/civic-engagement/learn', label: 'Guides' },
  { href: '/civic-engagement/careers', label: 'Careers' },
  { href: '/community/civic-engagement', label: 'Community' },
] as const;

export function CivicEngagementSubNav() {
  const pathname = usePathname() ?? '';
  return (
    <nav style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginTop: 12, paddingBottom: 12, borderBottom: '1px solid #1A1A1E' }} aria-label="Civic Engagement world">
      {LINKS.map(({ href, label, ...rest }) => {
        const exact = 'exact' in rest && rest.exact;
        const active = exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link key={href} href={href} style={{ padding: '6px 12px', fontSize: 12, borderRadius: 6, textDecoration: 'none', color: active ? '#E8E8EC' : '#6B6B70', background: active ? '#2A4A2A' : 'transparent', border: `1px solid ${active ? '#2A4A2A' : 'transparent'}` }}>
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
