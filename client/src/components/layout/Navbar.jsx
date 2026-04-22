'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSectionClick = (id) => {
    scrollToSection(id);
    setMobileMenuOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-[#F9F9F9]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between lg:h-26">
          <button
            onClick={() => handleSectionClick('hero')}
            className="flex items-center space-x-2 transition"
          >
            <img
              src="/images/regen-logo.png"
              alt="ReGen Logo"
              className="h-12 w-16 object-contain lg:h-16 lg:w-20"
              style={{ backgroundColor: 'transparent' }}
            />
          </button>

          <div className="hidden items-center space-x-6 md:flex lg:space-x-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-base font-medium text-gray-700 transition hover:text-green-600 lg:text-xl"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-base font-medium text-gray-700 transition hover:text-green-600 lg:text-xl"
            >
              Our Services
            </button>
            <button
              onClick={() => scrollToSection('impact')}
              className="text-base font-medium text-gray-700 transition hover:text-green-600 lg:text-xl"
            >
              Community Impact
            </button>
            <Link
              href="/auth/login"
              className="rounded-lg bg-[#008236] px-4 py-2 text-base font-semibold text-white transition-colors hover:bg-[#006b2d] lg:px-5 lg:text-xl"
            >
              Sign In
            </Link>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="inline-flex items-center justify-center rounded-lg border border-gray-200 p-2 text-gray-700 transition hover:bg-white md:hidden"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="border-t border-gray-200 py-4 md:hidden">
            <div className="flex flex-col gap-3">
              <button
                onClick={() => handleSectionClick('hero')}
                className="rounded-lg px-3 py-2 text-left text-base font-medium text-gray-700 transition hover:bg-white hover:text-green-600"
              >
                Home
              </button>
              <button
                onClick={() => handleSectionClick('services')}
                className="rounded-lg px-3 py-2 text-left text-base font-medium text-gray-700 transition hover:bg-white hover:text-green-600"
              >
                Our Services
              </button>
              <button
                onClick={() => handleSectionClick('impact')}
                className="rounded-lg px-3 py-2 text-left text-base font-medium text-gray-700 transition hover:bg-white hover:text-green-600"
              >
                Community Impact
              </button>
              <Link
                href="/auth/login"
                onClick={() => setMobileMenuOpen(false)}
                className="inline-flex w-full items-center justify-center rounded-lg bg-[#008236] px-4 py-3 text-base font-semibold text-white transition-colors hover:bg-[#006b2d]"
              >
                Sign In
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
