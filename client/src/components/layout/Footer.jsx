'use client';

import Link from 'next/link';

export default function Footer() {
  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-[#1a5c3a] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* About Section */}
          <div>
            <h3 className="text-xl font-semibold mb-4">ReGen</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              AI-Powered Waste & Sustainability Assistant helping build a cleaner, greener future.
            </p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <button
                  onClick={() => scrollToSection('hero')}
                  className="text-sm opacity-90 hover:opacity-100 transition"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="text-sm opacity-90 hover:opacity-100 transition"
                >
                  Our Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('impact')}
                  className="text-sm opacity-90 hover:opacity-100 transition"
                >
                  Community Impact
                </button>
              </li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <p className="text-sm opacity-90 leading-relaxed">
              Email: info@regen.com<br />
              Phone: +254 710 857 497<br />
              Location: Kenya
            </p>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-6 border-t border-white/20 text-center">
          <p className="text-sm opacity-80">
            &copy; 2025 ReGen. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}