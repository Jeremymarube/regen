'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import wasteService from '@/services/wasteService';
//import centerService from '@/services/centerService';
import WasteForm from '@/components/waste/WasteForm';
import FacilityCard from '@/components/waste/FacilityCard';
import { Building2 } from 'lucide-react';


function WasteLogContent() {
  const { user, profile } = useAuth();
  const router = useRouter();
  const [nearbyFacilities, setNearbyFacilities] = useState([]);
  const [selectedFacility, setSelectedFacility] = useState(null);
  const [region, setRegion] = useState('');
  const [wasteType, setWasteType] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (region && wasteType) {
      fetchNearbyFacilities();
    } else {
      setNearbyFacilities([]);
    }
  }, [region, wasteType]);

  const fetchNearbyFacilities = async () => {
    try {
      setLoading(true);
      const facilities = await centerService.getNearbyFacilities(region, wasteType);
      setNearbyFacilities(facilities);
    } catch (error) {
      console.error('Error fetching facilities:', error);
      setNearbyFacilities([]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormDataChange = (data) => {
    setRegion(data.region);
    setWasteType(data.wasteType);
  };

  const handleFacilitySelect = (facilityId) => {
    setSelectedFacility(facilityId);
  };

  const handleSuccess = () => {
    router.push('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 ">
      <div className="max-w-7xl mx-auto ">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Log Your Waste</h1>
          <p className="text-gray-600 text-regular text-[20px] mt-2">
            Track your recycling efforts and schedule waste collection
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 stroke-[#D9D9D9]">
          {/* Main Form - 2/3 width */}
          <div className="lg:col-span-2 stroke-[#D9D9D9]">
            <WasteForm
              onSuccess={handleSuccess}
              onDataChange={handleFormDataChange}
              selectedFacility={selectedFacility}
              onFacilityChange={setSelectedFacility}
            />
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="lg:col-span-1 ">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24 text-[25px]">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center">
                <Building2 className="w-5 h-5 mr-2 text-green-600" />
                Nearby Facilities
              </h3>

              {!region || !wasteType ? (
                <p className="text-regular text-[17px] text-[#757575]">
                  Select a region and waste type to see nearby facilities
                </p>
              ) : loading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-4 border-green-600 border-t-transparent"></div>
                </div>
              ) : nearbyFacilities.length === 0 ? (
                <p className="text-regular text-[17px] text-[#757575]">
                  No facilities found in {region}. Try selecting a different region.
                </p>
              ) : (
                <div className="space-y-3 max-h-96 overflow-y-auto ">
                  {nearbyFacilities.map((facility) => (
                    <FacilityCard
                      key={facility.id}
                      facility={facility}
                      isSelected={selectedFacility === facility.id}
                      onSelect={handleFacilitySelect}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function WasteLogPage() {
  return (
    <ProtectedRoute>
      <WasteLogContent />
    </ProtectedRoute>
  );
}