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
        <div className="flex justify-between items-center h-20">
          <button 
            onClick={() => scrollToSection('hero')} 
            className="flex items-center space-x-2 hover:opacity-80 transition"
          >
            <div className="flex items-center space-x-2 hover:opacity-80 transition">
            <img
             src="/images/regen-logo.jpeg"
             alt="ReGen Logo"
             className="h-20 w-auto rounded-lg object-contain"
         />
        </div>

          </button>
            <div className="flex items-center space-x-8">
            <button
              onClick={() => scrollToSection('hero')}
              className="text-gray-700 hover:text-green-600 transition font-medium"
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection('services')}
              className="text-gray-700 hover:text-green-600 transition font-medium">
             
                   Our Services
            </button>
            <button
              onClick={() => scrollToSection('impact')}
              className="text-gray-700 hover:text-green-600 transition font-medium"
            >
              Community Impact
            </button>
            <Link
              href="/login"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition font-medium"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}