'use client';

import { useState } from 'react';
import Link from 'next/link';

const navigation = [
  { name: 'O nas', href: '#o-nas' },
  { name: 'Uslugi', href: '#uslugi' },
  { name: 'Oferty', href: '#oferty' },
  { name: 'Kontakt', href: '#kontakt' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold" style={{ color: 'var(--broi-navy)' }}>
                BROI
              </span>
              <span className="hidden sm:block text-sm" style={{ color: 'var(--broi-gray)' }}>
                Nieruchomosci
              </span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:gap-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-[var(--broi-gold)]"
                style={{ color: 'var(--broi-text)' }}
              >
                {item.name}
              </Link>
            ))}
            <Link
              href="#kontakt"
              className="rounded-lg px-4 py-2 text-sm font-semibold text-white transition-all hover:opacity-90"
              style={{ backgroundColor: 'var(--broi-gold)' }}
            >
              Bezplatna wycena
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Menu</span>
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col gap-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-base font-medium"
                  style={{ color: 'var(--broi-text)' }}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                href="#kontakt"
                className="rounded-lg px-4 py-2 text-center text-sm font-semibold text-white"
                style={{ backgroundColor: 'var(--broi-gold)' }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Bezplatna wycena
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
