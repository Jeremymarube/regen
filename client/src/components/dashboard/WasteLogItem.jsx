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
    <div className="border-b border-gray-100 py-3 last:border-0">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
            <Recycle className="h-5 w-5 text-green-600" />
          </div>
          <div className="min-w-0">
            <div className="truncate font-medium text-gray-900 capitalize">{log.waste_type}</div>
            <div className="text-sm text-gray-500">{log.weight} kg</div>
          </div>
        </div>
        <div className="pl-[3.25rem] text-left sm:pl-0 sm:text-right">
          <div className="text-sm font-medium text-green-600">
            {(log.co2_saved || 0).toFixed(2)} kg CO2
          </div>
          <div className="text-xs text-gray-500">{new Date(log.date).toLocaleDateString()}</div>
        </div>
      </div>
    </div>
  );
}
