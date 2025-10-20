// export default function Page() {
//   return (
//     <div>
//       <h1 className="text-3xl font-semibold mb-4">Welcome to ReGen</h1>
//       <p className="text-gray-600">
//         Your dashboard overview goes here.
//       </p>
//     </div>
//   );
// }



'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/layout/Sidebar';
import wasteService from '@/services/wasteService';
import { TrendingUp, Recycle, Award, Leaf } from 'lucide-react';

function DashboardContent() {
  const { profile } = useAuth();
  const [wasteLogs, setWasteLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWasteLogs();
  }, []);

  const fetchWasteLogs = async () => {
    try {
      const data = await wasteService.getWasteLogs(10);
      setWasteLogs(data);
    } catch (error) {
      console.error('Error fetching waste logs:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-64 flex-1 min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {profile?.name}!</h1>
            <p className="text-gray-600 mt-2">Track your environmental impact and sustainability progress</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              icon={<Leaf className="w-6 h-6 text-green-600" />}
              label="CO₂ Saved"
              value={`${profile?.total_co2_saved?.toFixed(2) || 0} kg`}
              bgColor="bg-green-50"
            />
            <StatCard
              icon={<Recycle className="w-6 h-6 text-green-600" />}
              label="Waste Recycled"
              value={`${profile?.total_waste_recycled?.toFixed(2) || 0} kg`}
              bgColor="bg-green-50"
            />
            <StatCard
              icon={<Award className="w-6 h-6 text-green-600" />}
              label="Points Earned"
              value={profile?.points?.toString() || '0'}
              bgColor="bg-green-50"
            />
            <StatCard
              icon={<TrendingUp className="w-6 h-6 text-green-600" />}
              label="Total Entries"
              value={wasteLogs.length.toString()}
              bgColor="bg-green-50"
            />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h2>
              {wasteLogs.length === 0 ? (
                <div className="text-center py-12">
                  <Recycle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No waste logs yet</p>
                  <p className="text-gray-400 text-sm mt-2">Start logging your waste to see your impact</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {wasteLogs.slice(0, 5).map((log) => (
                    <WasteLogItem key={log.id} log={log} />
                  ))}
                </div>
              )}
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Environmental Impact</h2>
              <div className="space-y-6">
                <ImpactItem
                  label="Trees Equivalent"
                  value={((profile?.total_co2_saved || 0) / 20).toFixed(1)}
                  description="trees planted"
                />
                <ImpactItem
                  label="Energy Saved"
                  value={((profile?.total_waste_recycled || 0) * 0.5).toFixed(1)}
                  description="kWh equivalent"
                />
                <ImpactItem
                  label="Water Conserved"
                  value={((profile?.total_waste_recycled || 0) * 10).toFixed(0)}
                  description="liters saved"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, bgColor }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className={`w-12 h-12 ${bgColor} rounded-lg flex items-center justify-center mb-4`}>
        {icon}
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
      <div className="text-gray-600 text-sm">{label}</div>
    </div>
  );
}

function WasteLogItem({ log }) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
          <Recycle className="w-5 h-5 text-green-600" />
        </div>
        <div>
          <div className="font-medium text-gray-900 capitalize">{log.waste_type}</div>
          <div className="text-sm text-gray-500">{log.weight} kg</div>
        </div>
      </div>
      <div className="text-right">
        <div className="text-sm font-medium text-green-600">{log.co2_saved.toFixed(2)} kg CO₂</div>
        <div className="text-xs text-gray-500">{new Date(log.date).toLocaleDateString()}</div>
      </div>
    </div>
  );
}

function ImpactItem({ label, value, description }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-700 font-medium">{label}</span>
        <span className="text-2xl font-bold text-green-600">{value}</span>
      </div>
      <div className="text-sm text-gray-500">{description}</div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}




