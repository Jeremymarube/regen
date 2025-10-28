'use client';

import { useEffect, useState } from 'react';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import Sidebar from '@/components/layout/Sidebar';
import centerService from '@/services/centerService';
import { Plus, Edit2, Trash2, X, Check, Building2 } from 'lucide-react';

function ManageCentersContent() {
  const [centers, setCenters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingCenter, setEditingCenter] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchCenters();
  }, []);

  const fetchCenters = async () => {
    try {
      setLoading(true);
      const centers = await centerService.getCenters({ active_only: false });
      console.log('Fetched centers:', centers);
      setCenters(centers);
    } catch (error) {
      console.error('Error fetching centers:', error);
      setCenters([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (centerId) => {
    try {
      await centerService.deleteCenter(centerId);
      fetchCenters();
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting center:', error);
      alert('Failed to delete recycling center');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
      </div>
    );
  }

  console.log('Rendering with centers:', centers);
  
  return (
    
    
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-[55px] font-bold text-black-900">Manage Recycling Centers</h1>
              <p className="text-black-600 mt-2 font-regular text-[24px]">Add, edit, and remove waste facilities</p>
            </div>
            <button
              onClick={() => setShowAddForm(true)}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition flex items-center space-x-2 font-regular text-[24px]"
            >
              <Plus className="w-5 h-5" />
              <span>Add Center</span>
            </button>
          </div>

          {centers.length === 0 ? (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <Building2 className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900">No recycling centers found</h3>
              <p className="mt-2 text-gray-500">Get started by adding a new recycling center</p>
              <button
                onClick={() => setShowAddForm(true)}
                className="mt-6 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition inline-flex items-center space-x-2"
              >
                <Plus className="w-5 h-5" />
                <span>Add Your First Center</span>
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {centers.map((center) => (
                <CenterCard
                  key={center.id}
                  center={center}
                  onEdit={() => setEditingCenter(center)}
                  onDelete={() => setDeleteConfirm(center.id)}
                  onConfirmDelete={() => handleDelete(center.id)}
                  onCancelDelete={() => setDeleteConfirm(null)}
                  showDeleteConfirm={deleteConfirm === center.id}
                />
              ))}
            </div>
          )}

          {showAddForm && (
            <CenterFormModal
              onClose={() => setShowAddForm(false)}
              onSave={fetchCenters}
            />
          )}

          {editingCenter && (
            <CenterFormModal
              center={editingCenter}
              onClose={() => setEditingCenter(null)}
              onSave={fetchCenters}
            />
          )}
        </div>
  );
}

function CenterCard({ center, onEdit, onDelete, onConfirmDelete, onCancelDelete, showDeleteConfirm }) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-lg  flex items-center justify-center ${
            center.facility_type === 'biogas' ? 'bg-green-100' :
            center.facility_type === 'dumpsite' ? 'bg-orange-100' :
            'bg-blue-100'
          }`}>
            <Building2 className={`w-6 h-6 ${
              center.facility_type === 'biogas' ? 'text-green-600' :
              center.facility_type === 'dumpsite' ? 'text-orange-600' :
              'text-blue-600'
            }`} />
          </div>
          <div>
            <h3 className="font-bold text-[25px] text-gray-900">{center.name}</h3>
            <span className={`text-[20px] font-regular px-2 py-1 rounded-[10px] ${
              center.facility_type === 'biogas' ? 'bg-green-100 text-green-700' :
              center.facility_type === 'dumpsite' ? 'bg-orange-100 text-orange-700' :
              'bg-blue-100 text-blue-700'
            }`}>
              {center.facility_type.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-4 text-[24px] font-regular text-black-600">
        <p>{center.location}</p>
        <p>{center.operating_hours}</p>
        <p>{center.contact}</p>
        <div className="flex flex-wrap gap-1">
          {center.accepted_types.map((type) => (
            <span key={type} className="text-[20px] bg-[#E0E0E0]  text-black-700 px-2 py-1 rounded-[10px]">
              {type}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-2">
        {showDeleteConfirm ? (
          <>
            <button
              onClick={onConfirmDelete}
              className="flex-1 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition flex items-center justify-center space-x-1"
            >
              <Check className="w-4 h-4" />
              <span>Confirm</span>
            </button>
            <button
              onClick={onCancelDelete}
              className="flex-1 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition flex items-center justify-center space-x-1"
            >
              <X className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={onEdit}
              className="flex-1 bg-[#008236] text-white text-[24px] py-2 rounded-lg hover:opacity-90 transition flex items-center justify-center space-x-4"
            >
              <Edit2 className="w-6 h-6" />
              <span>Edit</span>
            </button>
            <button
              onClick={onDelete}
              className="flex-1 bg-red-600 text-white text-[24px] py-2 rounded-lg hover:bg-red-700 transition flex items-center justify-center space-x-4"
            >
              <Trash2 className="w-6 h-6" />
              <span>Delete</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

function CenterFormModal({ center, onClose, onSave }) {
  const [formData, setFormData] = useState({
    name: center?.name || '',
    location: center?.location || '',
    latitude: center?.latitude?.toString() || '',
    longitude: center?.longitude?.toString() || '',
    facility_type: center?.facility_type || 'recycling',
    contact: center?.contact || '',
    operating_hours: center?.operating_hours || 'Mon-Fri: 8AM-5PM',
    accepted_types: center?.accepted_types || [],
    is_active: center?.is_active ?? true,
  });

  const [selectedType, setSelectedType] = useState('');

  const availableTypes = ['Plastic', 'Paper', 'Organic', 'Glass', 'Metal', 'E-Waste', 'Agricultural', 'Textile'];

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = {
        name: formData.name,
        location: formData.location,
        latitude: parseFloat(formData.latitude) || 0,
        longitude: parseFloat(formData.longitude) || 0,
        facility_type: formData.facility_type || 'recycling',
        contact: formData.contact || '',
        operating_hours: formData.operating_hours || 'Mon-Fri: 8AM-5PM',
        accepted_types: Array.isArray(formData.accepted_types) ? formData.accepted_types : [],
        is_active: formData.is_active !== undefined ? formData.is_active : true,
      };
      
      console.log('Submitting center data:', data); // Debug log

      if (center) {
        await centerService.updateCenter(center.id, data);
      } else {
        await centerService.createCenter(data);
      }

      onSave();
      onClose();
    } catch (error) {
      console.error('Error saving center:', error);
      
      // Extract error message from response if available
      let errorMessage = 'Failed to save recycling center';
      
      if (error.response) {
        const { data } = error.response;
        console.error('Error response data:', data);
        
        if (data.details) {
          errorMessage = `${data.message}: ${data.details}`;
        } else if (data.message) {
          errorMessage = data.message;
        }
        
        // Handle specific error types
        if (data.error_type === 'duplicate_entry') {
          // Highlight the name field if it's a duplicate
          setFormData(prev => ({
            ...prev,
            _error: 'A center with this name already exists. Please choose a different name.'
          }));
        } else if (data.error_type === 'missing_required_fields') {
          setFormData(prev => ({
            ...prev,
            _error: 'Please fill in all required fields marked with *'
          }));
        }
      }
      
      // Show the error message
      alert(errorMessage);
    }
  };

  const addType = () => {
    if (selectedType && !formData.accepted_types.includes(selectedType)) {
      setFormData({ ...formData, accepted_types: [...formData.accepted_types, selectedType] });
      setSelectedType('');
    }
  };

  const removeType = (type) => {
    setFormData({
      ...formData,
      accepted_types: formData.accepted_types.filter(t => t !== type)
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {center ? 'Edit' : 'Add'} Recycling Center
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded transition">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-[16px] font-semibold text-black-700 mb-2">Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[16px] font-semibold text-black-700 mb-2">Facility Type *</label>
              <select
                required
                value={formData.facility_type}
                onChange={(e) => setFormData({ ...formData, facility_type: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              >
                <option value="recycling">Recycling Center</option>
                <option value="dumpsite">Dumpsite</option>
                <option value="biogas">Biogas Facility</option>
              </select>
            </div>

            <div>
              <label className="block text-[16px] font-semibold text-black-700 mb-2">Status</label>
              <select
                value={formData.is_active ? 'active' : 'inactive'}
                onChange={(e) => setFormData({ ...formData, is_active: e.target.value === 'active' })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[16px] font-semibold text-black-700 mb-2">Location *</label>
            <input
              type="text"
              required
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-[16px] font-semibold text-black-700 mb-2">Latitude</label>
              <input
                type="number"
                step="0.000001"
                value={formData.latitude}
                onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>

            <div>
              <label className="block text-[16px] font-semibold text-black-700 mb-2">Longitude</label>
              <input
                type="number"
                step="0.000001"
                value={formData.longitude}
                onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[16px] font-semibold text-black-700 mb-2">Contact</label>
            <input
              type="text"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-[16px] font-semibold text-black-700 mb-2">Operating Hours</label>
            <input
              type="text"
              value={formData.operating_hours}
              onChange={(e) => setFormData({ ...formData, operating_hours: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
            />
          </div>

          <div>
            <label className="block text-[16px] font-semibold text-black-700 mb-2">Accepted Waste Types</label>
            <div className="flex space-x-2 mb-3">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              >
                <option value="">Select type</option>
                {availableTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
              <button
                type="button"
                onClick={addType}
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.accepted_types.map((type) => (
                <span
                  key={type}
                  className="bg-green-100 text-green-700 px-3 py-1 rounded-lg flex items-center space-x-2"
                >
                  <span>{type}</span>
                  <button
                    type="button"
                    onClick={() => removeType(type)}
                    className="hover:text-green-900"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          <div className="flex space-x-4">
            <button
              type="submit"
              className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition font-medium"
            >
              {center ? 'Update' : 'Add'} Center
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-600 text-white py-3 rounded-lg hover:bg-gray-700 transition font-medium"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function ManageCenters() {
  return (
    <ProtectedRoute>
      <ManageCentersContent />
    </ProtectedRoute>
  );
}