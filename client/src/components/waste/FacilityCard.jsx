'use client';

import { Building2, MapPin, Clock, Phone, CheckCircle } from 'lucide-react';

/**
 * FacilityCard Component
 * 
 * Displays individual recycling facility information
 * Used in the sidebar of the waste log page
 * 
 * @param {Object} facility - Facility data object
 * @param {string} facility.id - Facility ID
 * @param {string} facility.name - Facility name
 * @param {string} facility.facility_type - Type (biogas/dumpsite/recycling)
 * @param {string} facility.location - Facility location/address
 * @param {string} facility.operating_hours - Operating hours
 * @param {string} facility.contact - Contact information
 * @param {Array} facility.accepted_types - Array of accepted waste types
 * @param {boolean} isSelected - Whether this facility is currently selected
 * @param {Function} onSelect - Callback function when facility is selected
 */
export default function FacilityCard({ facility, isSelected, onSelect }) {
  const getFacilityTypeStyle = (type) => {
    const styles = {
      biogas: 'bg-green-100 text-green-700 border-green-200',
      dumpsite: 'bg-orange-100 text-orange-700 border-orange-200',
      recycling: 'bg-blue-100 text-blue-700 border-blue-200',
    };
    return styles[type] || 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const handleClick = () => {
    if (onSelect) {
      onSelect(facility.id);
    }
  };

  return (
    <div
      onClick={handleClick}
      className={`
        border rounded-lg p-4 transition-all cursor-pointer
        ${isSelected 
          ? 'border-green-500 bg-green-50 shadow-md' 
          : 'border-gray-200 hover:border-green-400 hover:shadow-sm'
        }
      `}
    >
      {/* Header: Name and Type Badge */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-start space-x-2">
            <Building2 className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isSelected ? 'text-green-600' : 'text-gray-400'}`} />
            <h4 className="font-semibold text-sm text-gray-900 leading-tight">
              {facility.name}
            </h4>
          </div>
        </div>
        
        <span
          className={`
            text-xs px-2 py-1 rounded-full font-medium border ml-2 flex-shrink-0
            ${getFacilityTypeStyle(facility.facility_type)}
          `}
        >
          {facility.facility_type.toUpperCase()}
        </span>
      </div>

      {/* Location */}
      <div className="flex items-start space-x-2 mb-2">
        <MapPin className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-gray-600 leading-relaxed">{facility.location}</p>
      </div>

      {/* Operating Hours */}
      {facility.operating_hours && (
        <div className="flex items-start space-x-2 mb-2">
          <Clock className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-gray-600">{facility.operating_hours}</p>
        </div>
      )}

      {/* Contact */}
      {facility.contact && (
        <div className="flex items-start space-x-2 mb-3">
          <Phone className="w-3.5 h-3.5 text-gray-400 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-gray-600">{facility.contact}</p>
        </div>
      )}

      {/* Accepted Waste Types */}
      {facility.accepted_types && facility.accepted_types.length > 0 && (
        <div className="pt-3 border-t border-gray-100">
          <p className="text-xs font-medium text-gray-700 mb-2">Accepts:</p>
          <div className="flex flex-wrap gap-1">
            {facility.accepted_types.map((type, index) => (
              <span
                key={index}
                className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded"
              >
                {type}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Selection Indicator */}
      {isSelected && (
        <div className="mt-3 pt-3 border-t border-green-200">
          <div className="flex items-center space-x-2 text-green-700">
            <CheckCircle className="w-4 h-4" />
            <span className="text-xs font-medium">Selected for collection</span>
          </div>
        </div>
      )}
    </div>
  );
}