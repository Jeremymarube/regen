'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Leaf, User, LogOut } from 'lucide-react';

export default function Sidebar() {
  const { profile, signOut } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.push('/login');
  };

  const navItems = [
    { path: '/dashboard', label: 'Dashboard' },
    { path: '/log', label: 'Log Waste' },
    { path: '/guide', label: 'AI Guide' },
    { path: '/community', label: 'Community' },
    { path: '/manage-waste', label: 'Manage' },
    { path: '/manage-centers', label: 'Centers' },
  ];

  return (
    // <aside className="w-52 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col justify-between shadow-sm">
     <aside className="w-56 bg-white border-r border-gray-200 h-screen fixed left-0 top-0 flex flex-col justify-between shadow-sm font-medium">
    {/* Logo */}
    <div className="p-4 flex items-center justify-center border-b border-gray-100">
  <img
    src="/images/regen-logo.jpeg"
    alt="ReGen Logo"
    className="w-28 h-auto object-contain" 
  />
</div>




      {/* Nav Links */}
      <nav className="flex-1 mt-8 space-y-2 px-3">
  {navItems.map((item) => (
    <Link
      key={item.path}
      href={item.path}
     className={`block px-4 py-2 rounded-md font-medium text-base ${
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
          className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm ${
            pathname === '/profile'
              ? 'bg-gray-100 text-gray-900 font-semibold'
              : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
          }`}
        >
          <User className="w-4 h-4" />
          <span>{profile?.name || 'Profile'}</span>
        </Link>
        <button
          onClick={handleSignOut}
          className="flex items-center space-x-2 w-full px-3 py-2 rounded-md text-sm text-gray-700 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="w-4 h-4" />
          <span>Logout</span>
        </button>
      </div>
    </aside>
  );
}
