'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import wasteService from '@/services/wasteService';
import profileService from '@/services/profileService';
import { Upload, Recycle, MapPin, Calendar, Building2, Loader2 } from 'lucide-react';

const WASTE_TYPES = [
  'Plastic',
  'Paper',
  'Organic',
  'Glass',
  'Metal',
  'E-Waste',
  'Agricultural',
  'Textile',
  'Other'
];

const KENYA_REGIONS = [
  'Nairobi',
  'Mombasa',
  'Kisumu',
  'Nakuru',
  'Eldoret',
  'Thika',
  'Meru',
  'Kisii',
  'Kiambu',
  'Ruiru',
  'Other'
];

export default function WasteForm({ onSuccess, onDataChange, selectedFacility, onFacilityChange }) {
  const { user, profile, updateProfile } = useAuth();
  
  const [wasteType, setWasteType] = useState('');
  const [weight, setWeight] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [collectionLocation, setCollectionLocation] = useState('');
  const [region, setRegion] = useState('');
  const [collectionDate, setCollectionDate] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (onDataChange) {
      onDataChange({ region, wasteType });
    }
  }, [region, wasteType, onDataChange]);

  const calculateCO2Saved = (type, weight) => {
    const co2Factors = {
      'Plastic': 2.5,
      'Paper': 1.8,
      'Organic': 0.5,
      'Glass': 0.8,
      'Metal': 3.0,
      'E-Waste': 4.0,
      'Agricultural': 0.4,
      'Textile': 2.0,
      'Other': 1.0
    };
    return (co2Factors[type] || 1.0) * weight;
  };

  const getDisposalMethod = (type) => {
    const methods = {
      'Plastic': 'Clean and sort by type, then take to recycling center',
      'Paper': 'Flatten and bundle, recyclable with paper waste',
      'Organic': 'Compost at home or use for biogas generation',
      'Glass': 'Clean and separate by color, take to glass recycling',
      'Metal': 'Clean and sort, highly recyclable at scrap centers',
      'E-Waste': 'Take to certified e-waste collection center',
      'Agricultural': 'Convert to compost or biogas for cooking',
      'Textile': 'Donate, repurpose, or take to textile recycling',
      'Other': 'Check with local waste management for proper disposal'
    };
    return methods[type] || 'Consult local waste management guidelines';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!wasteType || !weight || !collectionLocation || !region) {
      setError('Please fill in all required fields');
      return;
    }

    const weightNum = parseFloat(weight);
    if (isNaN(weightNum) || weightNum <= 0) {
      setError('Please enter a valid weight greater than 0');
      return;
    }

    setLoading(true);

    try {
      const co2Saved = calculateCO2Saved(wasteType, weightNum);
      const disposalMethod = getDisposalMethod(wasteType);

      const wasteLogData = {
        waste_type: wasteType,
        weight: weightNum,
        image_url: imageUrl || null,
        co2_saved: co2Saved,
        disposal_method: disposalMethod,
        collection_location: `${collectionLocation}, ${region}`,
        collection_status: 'pending',
        collection_date: collectionDate || null,
        nearest_facility_id: selectedFacility || null,
      };

      await wasteService.createWasteLog(wasteLogData);

      const newTotalCO2 = (profile?.total_co2_saved || 0) + co2Saved;
      const newTotalWaste = (profile?.total_waste_recycled || 0) + weightNum;
      const newPoints = (profile?.points || 0) + Math.floor(weightNum * 10);

      const updatedProfileData = {
        total_co2_saved: newTotalCO2,
        total_waste_recycled: newTotalWaste,
        points: newPoints,
      };

      await profileService.updateProfile(updatedProfileData);
      
      if (updateProfile) {
        updateProfile({
          ...profile,
          ...updatedProfileData
        });
      }

      setSuccess('Waste log added successfully! Redirecting to dashboard...');

      setWasteType('');
      setWeight('');
      setImageUrl('');
      setCollectionLocation('');
      setRegion('');
      setCollectionDate('');
      if (onFacilityChange) {
        onFacilityChange(null);
      }

      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        }
      }, 1500);
    } catch (err) {
      console.error('Error creating waste log:', err);
      setError(err.message || 'Failed to add waste log. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-15 w-200 h-180 border border-[#D9D9D9]">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-start">
          <span className="text-sm ">{error}</span>
        </div>
      )}

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 text-green-700 rounded-lg flex items-start">
          <span className="text-sm">{success}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 ">
        <div className=" grid md:grid-cols-2 gap-6 ">
          <div>
            <label htmlFor="wasteType" className="block font-semibold text-[20px] text-gray-700 mb-2">
              Waste Type <span className="text-black-500">*</span>
            </label>
            <select
              id="wasteType"
              value={wasteType}
              onChange={(e) => setWasteType(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition text-[#000000]"
            >
              <option value="">Select waste type</option>
              {WASTE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="weight" className="block font-semibold text-[20px] text-gray-700 mb-2">
              Weight (kg) <span className="text-black-500">*</span>
            </label>
            <input
              id="weight"
              type="number"
              step="0.01"
              min="0.01"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition text-[#000000]"
              placeholder="0.00"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="region" className="block font-semibold text-[20px] text-gray-700 mb-2">
              Region <span className="text-black-500">*</span>
            </label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <select
                id="region"
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                required
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition text-[#000000]"
              >
                <option value="">Select region</option>
                {KENYA_REGIONS.map((r) => (
                  <option key={r} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="collectionLocation" className="block font-semibold text-[20px] text-gray-700 mb-2">
              Collection Address <span className="text-black-500">*</span>
            </label>
            <input
              id="collectionLocation"
              type="text"
              value={collectionLocation}
              onChange={(e) => setCollectionLocation(e.target.value)}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition text-[#000000]"
              placeholder="Street, Building, Estate"
            />
          </div>
        </div>

        <div>
          <label htmlFor="collectionDate" className="block font-semibold text-[20px] text-gray-700 mb-2">
            Preferred Collection Date (Optional)
          </label>
          <div className="relative">
            <Calendar className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              id="collectionDate"
              type="date"
              value={collectionDate}
              onChange={(e) => setCollectionDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition text-[#000000]"
            />
          </div>
        </div>

        {selectedFacility && (
          <div className="bg-blue-50 border border-[#D9D9D9] rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-blue-900">Facility Selected</p>
                <p className="text-xs text-blue-700">Collection will be scheduled at your selected facility</p>
              </div>
            </div>
          </div>
        )}

        <div>
          <label htmlFor="imageUrl" className="block font-semibold text-[20px] text-gray-700 mb-2">
            Image URL (Optional)
          </label>
          <div className="relative">
            <Upload className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
            <input
              id="imageUrl"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition text-[#000000]"
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        {wasteType && (
          <div className="bg-green-50 border border-[#D9D9D9] rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Recycle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-medium text-green-900 mb-1">Disposal Method</h3>
                <p className="text-sm text-green-700">{getDisposalMethod(wasteType)}</p>
              </div>
            </div>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-[20px]font-semibold text-white py-3 rounded-lg font-medium hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Saving...</span>
            </>
          ) : (
            <span>Log Waste Entry</span>
          )}
        </button>
      </form>
    </div>
  );
}
