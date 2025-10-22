'use client';

import { Recycle } from 'lucide-react';

/**
 * WasteLogItem Component
 * 
 * Displays a single waste log entry in the dashboard recent activity section
 * Shows waste type, weight, CO2 saved, and date
 * 
 * @param {Object} log - Waste log data object
 * @param {string} log.id - Log ID
 * @param {string} log.waste_type - Type of waste (e.g., "Plastic", "Paper")
 * @param {number} log.weight - Weight in kg
 * @param {number} log.co2_saved - CO2 saved in kg
 * @param {string} log.date - ISO date string
 */
export default function WasteLogItem({ log }) {
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