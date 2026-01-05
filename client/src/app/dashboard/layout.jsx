'use client';

import { useState } from 'react';
import Sidebar from "@/components/layout/Sidebar";
import { Menu, X } from 'lucide-react';

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F9FAFB]">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-[280px] transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-30 bg-[#F9F9F9] border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
          >
            <Menu className="w-6 h-6" />
          </button>
          <img
            src="/images/regen-logo.png"
            alt="ReGen Logo"
            className="h-8 w-auto"
          />
          <div className="w-10" /> {/* Spacer for centering */}
        </div>
      </div>

      {/* Main content */}
      <main className="flex-1 lg:ml-0 px-4 lg:px-8 py-8 lg:py-8 pt-20 lg:pt-8">
        <div className="max-w-7xl mx-auto w-full">{children}</div>
      </main>
    </div>
  );
}


