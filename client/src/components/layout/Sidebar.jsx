'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Leaf, User, LogOut, X } from 'lucide-react';

export default function Sidebar({ onClose }) {
  const { profile, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.push('/login');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/dashboard/log', label: 'Log Waste' },
    { path: '/dashboard/guide', label: 'AI Guide' },
    { path: '/dashboard/community', label: 'Community' },
    { path: '/dashboard/manage-waste', label: 'Manage' },
    { path: '/dashboard/manage-centers', label: 'Centers' },
  ];

  const handleLinkClick = () => {
    if (onClose) onClose(); // Close sidebar on mobile after navigation
  };

  return (
    <aside className="flex h-full w-full flex-col justify-between overflow-y-auto border-r border-gray-200 bg-[#F9F9F9] font-medium shadow-sm lg:w-[180px]">
      {/* Header with close button for mobile */}
      <div className="lg:hidden p-4 border-b border-gray-100 flex items-center justify-between">
        <span className="font-semibold text-gray-900">Menu</span>
        <button
          onClick={onClose}
          className="p-2 rounded-md text-gray-700 hover:bg-gray-100"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Logo */}
      <div className="p-4 flex items-center justify-center border-b border-gray-100 lg:p-4">
        <img
          src="/images/regen-logo.png"
          alt="ReGen Logo"
          className="w-20 h-auto object-contain lg:w-28"
        />
      </div>

      {/* Nav Links */}
      <nav className="mt-6 flex-1 space-y-2 px-3 pb-4">
        {navItems.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            onClick={handleLinkClick}
            className={`block px-4 py-2 rounded-md font-medium text-lg lg:text-[20px] ${
              pathname === item.path
                ? 'bg-gray-100 text-gray-900 font-semibold'
                : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="border-t border-gray-100 p-4 space-y-2">
        <Link
          href="/profile"
          onClick={handleLinkClick}
          className={`flex items-center space-x-2 px-3 py-2 rounded-md text-lg lg:text-[20px] font-medium ${
            pathname === '/profile'
              ? 'bg-gray-100 text-gray-900 font-semibold'
              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <User className="w-5 h-5 lg:w-6 lg:h-6" />
          <span>{profile?.name || 'Profile'}</span>
        </Link>
        <button
          onClick={() => {
            handleSignOut();
            if (onClose) onClose();
          }}
          className="flex items-center font-medium space-x-2 w-full px-3 py-2 rounded-md text-lg lg:text-[20px] text-gray-700 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="w-5 h-5 lg:w-6 lg:h-6" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}


