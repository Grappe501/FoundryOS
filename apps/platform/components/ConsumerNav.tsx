'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LINKS = [
  { href: '/future-proof', label: 'Future-Proof' },
  { href: '/explore', label: 'Explore Paths' },
  { href: '/ai-builder', label: 'AI Builder' },
] as const;

function isActive(pathname: string, href: string): boolean {
  if (href === '/explore') return pathname === '/explore' || pathname.startsWith('/explore/');
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
