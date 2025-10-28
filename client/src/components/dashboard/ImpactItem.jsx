'use client';

/**
 * ImpactItem Component
 * 
 * Displays a single environmental impact metric
 * Used in the Dashboard Environmental Impact section
 * 
 * @param {string} label - Impact metric label (e.g., "Trees Equivalent")
 * @param {string} value - Numeric value to display
 * @param {string} description - Unit or description text
 */
export default function ImpactItem({ label, value, description }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-gray-700 font-semibold text-[16px]">{label}</span>
        <span className="text-[27px] font-bold text-green-600">{value}</span>
      </div>
      <div className="text-regular text-[16px] text-gray-500">{description}</div>
    </div>
  );
}