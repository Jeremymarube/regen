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
