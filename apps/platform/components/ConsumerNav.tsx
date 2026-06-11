'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/future-proof', label: 'Future-Proof' },
  { href: '/trinity', label: 'Trinity' },
  { href: '/my-journey', label: 'My Journey' },
  { href: '/explore', label: 'Explore Paths' },
  { href: '/parents', label: 'For Parents' },
] as const;

function isActive(pathname: string, href: string): boolean {
  if (href === '/explore') return pathname === '/explore' || pathname.startsWith('/explore/');
  if (href === '/trinity') return pathname === '/trinity' || pathname.startsWith('/trinity/');
  if (href === '/my-journey') return pathname === '/my-journey';
  if (href === '/parents') return pathname === '/parents';
  if (href === '/future-proof') return pathname === '/future-proof' || pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function ConsumerNav() {
  const pathname = usePathname() ?? '';

  return (
    <nav
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 8,
        alignItems: 'center',
        padding: '12px 0',
        borderBottom: '1px solid #1A1A1E',
        marginBottom: 8,
      }}
      aria-label="Foundry consumer journey"
    >
      <Link
        href="/"
        style={{
          padding: '8px 14px',
          fontSize: 13,
          fontWeight: 300,
          borderRadius: 6,
          textDecoration: 'none',
          color: pathname === '/' ? '#E8E8EC' : '#6B6B70',
          marginRight: 4,
        }}
      >
        Foundry
      </Link>
      {LINKS.map(({ href, label }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            style={{
              padding: '8px 14px',
              fontSize: 13,
              borderRadius: 6,
              textDecoration: 'none',
              color: active ? '#E8E8EC' : '#8A8A8E',
              background: active ? '#1A2A1A' : 'transparent',
              border: `1px solid ${active ? '#2A4A2A' : 'transparent'}`,
            }}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
