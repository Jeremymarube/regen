'use client';
import { useState, useEffect } from 'react';
import { Trophy, TrendingUp, Award } from 'lucide-react';

const mockLeaderboard = [
  { id: '1', name: 'John Doe', location: 'Nairobi', points: 1250, total_co2_saved: 45.8, total_waste_recycled: 28.3 }, 
  { id: '2', name: 'Jane Smith', location: 'Mombasa', points: 980, total_co2_saved: 38.2, total_waste_recycled: 22.1 },
  { id: '3', name: 'Mike Johnson', location: 'Kisumu', points: 750, total_co2_saved: 29.5, total_waste_recycled: 18.7 },
  { id: '4', name: 'Sarah Williams', location: 'Nakuru', points: 620, total_co2_saved: 25.1, total_waste_recycled: 15.9 },
  { id: '5', name: 'David Brown', location: 'Eldoret', points: 540, total_co2_saved: 21.8, total_waste_recycled: 13.4 },
];

export default function Community() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const fetchLeaderboard = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/community/leaderboard');
      const data = await response.json();
      setLeaderboard(data.leaderboard || []);
    } catch (error) {
      console.error('Failed to fetch leaderboard:', error);
      setLeaderboard([]);
    } finally {
      setLoading(false);
    }
  };

  fetchLeaderboard();
}, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
      <div className="flex-1 min-h-screen  bg-gray-50 py-8 px-4">
        <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-[55px] font-bold text-gray-900">Community Leaderboard</h1>
          <p className="text-gray-600 text-[24px] font-regular mt-2">See how you rank among sustainability champions</p>
        </div>

        <div className="grid md:grid-cols-3  gap-6 mb-8">
          <StatCard
            icon={<Trophy className="w-6 h-6 text-yellow-600" />}
            label="Total Members"
            value={leaderboard.length.toString()}
            bgColor="bg-yellow-50"
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6 text-green-600" />}
            label="Total CO₂ Saved"
            value={`${leaderboard.reduce((sum, p) => sum + p.total_co2_saved, 0).toFixed(0)} kg`}
            bgColor="bg-green-50"
          />
          <StatCard
            icon={<Award className="w-6 h-6 text-green-600" />}
            label="Total Points"
            value={leaderboard.reduce((sum, p) => sum + p.points, 0).toLocaleString()}
            bgColor="bg-green-50"
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-left text-[24px] font-semibold text-gray-900">Rank</th>
                  <th className="px-6 py-4 text-left text-[24px] font-semibold text-gray-900">Name</th>
                  <th className="px-6 py-4 text-left text-[24px] font-semibold text-gray-900">Points</th>
                  <th className="px-6 py-4 text-left text-[24px] font-semibold text-gray-900">CO₂ Saved</th>
                  <th className="px-6 py-4 text-left text-[24px] font-semibold text-gray-900">Waste Recycled</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {leaderboard.map((entry) => (
                  <LeaderboardRow key={entry.id} entry={entry} />
                ))}
              </tbody>
            </table>
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
      <div className="text-[55px] font-semibold text-gray-900 mb-1">{value}</div>
      <div className="text-gray-600 font-regular text-[24px]">{label}</div>
    </div>
  );
}

function LeaderboardRow({ entry }) {
  const getRankDisplay = (rank) => {
    return <span className="text-gray-600 text-[30px] font-semibold">#{rank}</span>;
  };

  return (
    <tr className="hover:bg-gray-50 transition">
      <td className="px-6 py-4">
        <div className="flex items-center">{getRankDisplay(entry.rank)}</div>
      </td>
      <td className="px-6 py-4">
        <div className="font-semibold text-[24px] text-gray-900">{entry.name}</div>
        <div className="text-[24px] font-regular text-gray-500">{entry.location || 'Location not set'}</div>
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center space-x-2">
          <Award className="w-4 h-4 text-green-600" />
          <span className="font-regular text-[24px] text-green-600">{entry.points.toLocaleString()}</span>
        </div>
      </td>
      <td className="px-6 py-4">
        <span className="text-gray-900 text-[24px] font-regular">{entry.total_co2_saved.toFixed(2)} kg</span>
      </td>
      <td className="px-6 py-4">
        <span className="text-gray-900 text-[24px] font-regular">{entry.total_waste_recycled.toFixed(2)} kg</span>
      </td>
    </tr>
  );
}