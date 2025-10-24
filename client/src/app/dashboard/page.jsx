'use client';

import { useEffect, useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/layout/Sidebar';
import wasteService from '@/services/wasteService';
import api from '@/services/api';
import { TrendingUp, Recycle, Award, Leaf } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import ImpactItem from '@/components/dashboard/ImpactItem';
import WasteLogItem from '@/components/dashboard/WasteLogItem';

function DashboardContent() {
  const { profile } = useAuth();
  const [wasteLogs, setWasteLogs] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [statsResponse, wasteResponse] = await Promise.all([
        api.get('/api/dashboard/'),
        wasteService.getWasteLogs(10)
      ]);
      
      setStats(statsResponse.data || {});
      // wasteResponse.data contains { message, data }, so we need wasteResponse.data.data
      setWasteLogs(wasteResponse.data?.data || []);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setWasteLogs([]); // Ensure wasteLogs is always an array
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
      <div className="ml-2 flex-1 min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">

          {/* Welcome Message */}
          <div className="mb-8">
            <h1 className="text-[55px] font-bold text-gray-900">
              Welcome back, {profile?.name}!
            </h1>
            <p className="text-gray-600 mt-2 font-regular text-[24px]">
              Track your environmental impact and sustainability progress
            </p>
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-[10px] mb-8">
            <StatCard
              icon={<Leaf className="w-6 h-6 text-green-600" />}
              label="CO₂ Saved"
              value={`${(stats.total_co2_saved || 0).toFixed(2)} kg`}
            />
            <StatCard
              icon={<Recycle className="w-6 h-6 text-green-600" />}
              label="Waste Recycled"
              value={`${(stats.total_waste_recycled || 0).toFixed(2)} kg`}
            />
            <StatCard
              icon={<Award className="w-6 h-6 text-green-600" />}
              label="Points Earned"
              value={`${(stats.points || 0).toString()}`}
            />
            <StatCard
              icon={<TrendingUp className="w-6 h-6 text-green-600" />}
              label="Total Entries"
              value={`${(stats.total_entries || 0).toString()}`}
            />
          </div>

          {/* Activity + Impact Section */}
          <div className="grid lg:grid-cols-2 gap-[127px]">
            {/* Recent Activity */}
            <div className="bg-white rounded-lg border border-[#D9D9D9] w-[500px] h-[494px] p-6">
              <h2 className="text-[30px] font-bold text-gray-900 mb-4">
                Recent Activity
              </h2>
              {wasteLogs.length === 0 ? (
                <div className="text-center py-12">
                  <Recycle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No waste logs yet</p>
                  <p className="text-gray-400 text-sm mt-2">
                    Start logging your waste to see your impact
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {wasteLogs.slice(0, 5).map((log) => (
                    <WasteLogItem key={log.id} log={log} />
                  ))}
                </div>
              )}
            </div>

            {/* Environmental Impact */}
            <div className="bg-white rounded-lg border border-[#D9D9D9] w-[500px] h-[494px] p-6">
              <h2 className="text-[30px] font-bold text-gray-900 mb-4">
                Environmental Impact
              </h2>
              <div className="space-y-6">
                <ImpactItem
                  label="Trees Equivalent"
                  value={((stats.total_co2_saved || 0) / 20).toFixed(1)}
                  description="trees planted"
                />
                <ImpactItem
                  label="Energy Saved"
                  value={((stats.total_waste_recycled || 0) * 0.5).toFixed(1)}
                  description="kWh equivalent"
                />
                <ImpactItem
                  label="Water Conserved"
                  value={((stats.total_waste_recycled || 0) * 10).toFixed(0)}
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

export default function Dashboard() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}