'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/workspace', label: 'Workspace' },
  { href: '/preprocessing', label: 'Preprocessing' },
  { href: '/models', label: 'Models' },
  { href: '/evaluation', label: 'Evaluation' },
  { href: '/workflow', label: 'Workflow' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 border-b border-emerald-900/30 bg-[#070d0a]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-xs font-black text-white shadow-lg shadow-emerald-900/40 transition-transform group-hover:scale-105">
            SS
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-bold tracking-wide text-emerald-50">SkySweep AI</p>
            <p className="text-[10px] font-medium uppercase tracking-widest text-emerald-500/80">
              LISS-IV Cloud Removal
            </p>
          </div>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-lg px-3 py-2 text-xs font-semibold tracking-wide transition-all ${
                  active
                    ? 'bg-emerald-600/20 text-emerald-300 ring-1 ring-emerald-500/30'
                    : 'text-emerald-100/60 hover:bg-white/5 hover:text-emerald-100'
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/workspace"
            className="hidden rounded-full bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-900/30 transition-all hover:bg-emerald-500 sm:inline-block"
          >
            Launch Engine
          </Link>
          <button
            type="button"
            onClick={() => setMobileOpen(!mobileOpen)}
            className="rounded-lg p-2 text-emerald-100/70 hover:bg-white/5 md:hidden"
            aria-label="Toggle menu"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="border-t border-emerald-900/30 bg-[#0a110d]/95 px-4 py-3 md:hidden">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`block rounded-lg px-3 py-2.5 text-sm font-medium ${
                pathname === link.href ? 'bg-emerald-600/20 text-emerald-300' : 'text-emerald-100/70'
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/workspace"
            onClick={() => setMobileOpen(false)}
            className="mt-2 block rounded-lg bg-emerald-600 px-3 py-2.5 text-center text-sm font-bold text-white"
          >
            Launch Engine
          </Link>
        </div>
      )}
    </nav>
  );
}
