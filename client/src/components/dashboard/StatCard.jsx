'use client';

/**
 * StatCard Component
 * Displays a statistics card with icon, value, and label
 * Used in the Dashboard to show key metrics
 */
export default function StatCard({ icon, label, value }) {
  return (
    <div className="relative bg-white rounded-lg border border-[#D9D9D9] w-[258px] h-[155px] p-6 flex flex-col justify-end">
      {/* Icon - positioned neatly at top-right */}
      <div className="absolute top-4 right-4">{icon}</div>

      {/* Value */}
      <div className="text-[45px] font-semibold text-gray-900 ">{value}</div>

      {/* Label */}
      <div className="text-[20px] font-regular text-gray-600">{label}</div>
    </div>
  );
}
