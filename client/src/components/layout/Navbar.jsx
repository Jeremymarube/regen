'use client';

import Link from 'next/link';
import { Leaf } from 'lucide-react';

export default function Navbar() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
    return (
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex justify-between items-center h-26">
      <button
        onClick={() => scrollToSection('hero')}
        className="flex items-center space-x-2 transition"
      >
        {/* <img
          src="/images/regen-logo.png" 
          alt="ReGen Logo"
          style={{ width: '84.66px', height: '65.85px', objectFit: 'contain' }}
        /> */}
        
      <img
  src="/images/regen-logo.png" 
  alt="ReGen Logo"
  style={{ 
    width: '84.66px', 
    height: '65.85px', 
    objectFit: 'contain',
    backgroundColor: 'transparent'
  }}
/>
      </button>
            <div className="flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-gray-700 hover:text-green-600 transition font-medium text-[20px]"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-green-600 transition font-medium text-[20px]">
             
                   Our Services
            </button>
            <button
              onClick={() => scrollToSection('impact')}
              className="text-gray-700 hover:text-green-600 transition font-medium text-[20px]"
            >
              Community Impact
            </button>
            <Link
              href="/login"
              className="text-white px-5 py-2 rounded-lg font-semibold transition-colors bg-[#008236] hover:bg-[#006b2d] text-[20px]"
             >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}