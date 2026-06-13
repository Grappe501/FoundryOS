'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ThemeToggle } from './theme/ThemeToggle';

const LINKS = [
  { href: '/future-proof', label: 'Future-Proof' },
  { href: '/trinity', label: 'Trinity' },
  { href: '/explore', label: 'Explore' },
  { href: '/my-journey', label: 'My Journey' },
  { href: '/my-future', label: 'My Future' },
  { href: '/parents', label: 'For Parents' },
] as const;

const ACTION_LINKS = [
  { href: '/beta', label: 'Join Beta', primary: true },
  { href: '/pricing', label: 'Pricing', primary: false },
  { href: '/sign-in', label: 'Sign In', primary: false },
] as const;

function isActive(pathname: string, href: string): boolean {
  if (href === '/explore') return pathname === '/explore' || pathname.startsWith('/explore/');
  if (href === '/trinity') return pathname === '/trinity';
  if (href === '/my-journey') return pathname === '/my-journey' || pathname === '/account';
  if (href === '/my-future') return pathname === '/my-future';
  if (href === '/parents') return pathname === '/parents';
  if (href === '/future-proof') return pathname === '/future-proof' || pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function ConsumerNav() {
  const pathname = usePathname() ?? '';

  return (
    <nav className="foundry-nav" aria-label="Foundry consumer journey">
      <Link
        href="/"
        className={`foundry-nav__brand${pathname === '/' ? ' foundry-nav__brand--active' : ''}`}
      >
        Foundry
      </Link>
      {LINKS.map(({ href, label }) => {
        const active = isActive(pathname, href);
        return (
          <Link
            key={href}
            href={href}
            className={`foundry-nav__link${active ? ' foundry-nav__link--active' : ''}`}
          >
            {label}
          </Link>
        );
      })}
      <span className="foundry-nav__spacer" />
      <ThemeToggle compact />
      {ACTION_LINKS.map(({ href, label, primary }) => (
        <Link
          key={href}
          href={href}
          className={`foundry-nav__action${primary ? ' foundry-nav__action--primary' : ' foundry-nav__action--secondary'}`}
        >
          {label}
        </Link>
      ))}
    </nav>
  );
}
