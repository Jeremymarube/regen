'use client';

/**
 * StatCard Component
 * Displays a statistics card with icon, value, and label
 * Used in the Dashboard to show key metrics
 */
export default function StatCard({ icon, label, value }) {
  return (
    <div className="relative bg-white rounded-lg border border-[#D9D9D9] p-4 lg:p-6 flex flex-col justify-end min-h-[120px] lg:min-h-[155px]">
      {/* Icon - positioned neatly at top-right */}
      <div className="absolute top-4 right-4">{icon}</div>

      {/* Value */}
      <div className="text-2xl lg:text-4xl xl:text-5xl font-semibold text-gray-900">{value}</div>

      {/* Label */}
      <div className="text-sm lg:text-lg xl:text-xl font-regular text-gray-600">{label}</div>
    </div>
  );
}
