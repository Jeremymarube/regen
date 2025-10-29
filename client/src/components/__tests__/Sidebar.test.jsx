import { render, screen, fireEvent } from '@testing-library/react';
import { usePathname, useRouter } from 'next/navigation';
import Sidebar from '../layout/Sidebar';
import { useAuth } from '@/context/AuthContext';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

// Mock AuthContext
jest.mock('@/context/AuthContext', () => ({
  useAuth: jest.fn(),
}));

describe('Sidebar Component', () => {
  const mockPush = jest.fn();
  const mockSignOut = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    useRouter.mockReturnValue({ push: mockPush });
    usePathname.mockReturnValue('/dashboard');
    useAuth.mockReturnValue({
      profile: { name: 'Test User', email: 'test@example.com' },
      signOut: mockSignOut,
    });
  });

  it('renders all navigation items', () => {
    render(<Sidebar />);

    expect(screen.getByText('Dashboard')).toBeInTheDocument();
    expect(screen.getByText('Log Waste')).toBeInTheDocument();
    expect(screen.getByText('AI Guide')).toBeInTheDocument();
    expect(screen.getByText('Community')).toBeInTheDocument();
    expect(screen.getByText('Manage')).toBeInTheDocument();
    expect(screen.getByText('Centers')).toBeInTheDocument();
  });

  it('highlights active navigation item', () => {
    usePathname.mockReturnValue('/dashboard/log');
    render(<Sidebar />);

    const logWasteLink = screen.getByText('Log Waste').closest('a');
    expect(logWasteLink).toHaveClass('bg-gray-100');
  });

  it('displays user profile information when available', () => {
    render(<Sidebar />);

    expect(screen.getByText('Test User')).toBeInTheDocument();
  });

  it('calls signOut and redirects on logout', () => {
    render(<Sidebar />);

    const logoutButton = screen.getByText('Logout').closest('button');
    fireEvent.click(logoutButton);

    expect(mockSignOut).toHaveBeenCalled();
    expect(mockPush).toHaveBeenCalledWith('/login');
  });

  it('renders logo image', () => {
    render(<Sidebar />);

    const logo = screen.getByAltText('ReGen Logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/images/regen-logo.png');
  });
});
