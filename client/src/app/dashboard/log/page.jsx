'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import WasteForm from '@/components/waste/WasteForm';


function WasteLogContent() {
  const { user, profile } = useAuth();
  const router = useRouter();

  const handleSuccess = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 ">
      <div className="max-w-7xl mx-auto ">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Log Your Waste</h1>
          <p className="text-gray-600 text-regular text-[20px] mt-2">
            Track your recycling efforts and schedule waste collection
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <WasteForm
            onSuccess={handleSuccess}
          />
        </div>
      </div>
    </div>
  );
}

export default function WasteLogPage() {
  return (
    <ProtectedRoute>
      <WasteLogContent />
    </ProtectedRoute>
  );
}