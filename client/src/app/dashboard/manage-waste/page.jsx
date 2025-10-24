'use client';
import { useState, useEffect } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import { Trash2, Eye, X, Check } from 'lucide-react';
import wasteService from '@/services/wasteService';

export default function ManageWaste() {
  const [wasteLogs, setWasteLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewingLog, setViewingLog] = useState(null);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  useEffect(() => {
    fetchWasteLogs();
  }, []);

  const fetchWasteLogs = async () => {
    try {
      const response = await wasteService.getAllWasteLogs();
      setWasteLogs(response.data || []);
    } catch (error) {
      console.error('Error fetching waste logs:', error);
      setWasteLogs([]);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (logId) => {
    try {
      await wasteService.deleteWasteLog(logId);
      setWasteLogs(prev => prev.filter(log => log.id !== logId));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting log:', error);
      alert('Failed to delete waste log');
    }
  };

  const handleUpdateStatus = async (logId, newStatus) => {
    try {
      await wasteService.updateStatus(logId, newStatus);
      setWasteLogs(prev => prev.map(log => 
        log.id === logId ? { ...log, collection_status: newStatus } : log
      ));
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-green-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="flex">
      <Sidebar />
      <div className="ml-2 flex-1 min-h-screen bg-gray-50 py-8 px-4">
        <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Manage Waste Logs</h1>
          <p className="text-gray-600 mt-2">View, edit, and delete your waste entries</p>
        </div>

        {wasteLogs.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm p-12 text-center">
            <p className="text-gray-500">No waste logs found</p>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Date</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Type</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Weight</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">CO₂ Saved</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {wasteLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50 transition">
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {new Date(log.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 capitalize">{log.waste_type}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{log.weight} kg</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{log.collection_location || 'N/A'}</td>
                      <td className="px-6 py-4">
                        <select
                          value={log.collection_status}
                          onChange={(e) => handleUpdateStatus(log.id, e.target.value)}
                          className={`text-xs px-2 py-1 rounded border-none outline-none ${
                            log.collection_status === 'collected' ? 'bg-green-100 text-green-700' :
                            log.collection_status === 'scheduled' ? 'bg-blue-100 text-blue-700' :
                            'bg-orange-100 text-orange-700'
                          }`}
                        >
                          <option value="pending">Pending</option>
                          <option value="scheduled">Scheduled</option>
                          <option value="collected">Collected</option>
                        </select>
                      </td>
                      <td className="px-6 py-4 text-sm font-medium text-green-600">
                        {log.co2_saved?.toFixed(2)} kg
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => setViewingLog(log)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded transition"
                            title="View details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          {deleteConfirm === log.id ? (
                            <>
                              <button
                                onClick={() => handleDelete(log.id)}
                                className="p-2 text-green-600 hover:bg-green-50 rounded transition"
                                title="Confirm delete"
                              >
                                <Check className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setDeleteConfirm(null)}
                                className="p-2 text-gray-600 hover:bg-gray-50 rounded transition"
                                title="Cancel"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </>
                          ) : (
                            <button
                              onClick={() => setDeleteConfirm(log.id)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded transition"
                              title="Delete"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {viewingLog && (
          <ViewLogModal log={viewingLog} onClose={() => setViewingLog(null)} />
        )}
      </div>
    </div>
    </div>
  );
}

function ViewLogModal({ log, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full p-6">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Waste Log Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-4">
          <DetailRow label="Waste Type" value={log.waste_type} />
          <DetailRow label="Weight" value={`${log.weight} kg`} />
          <DetailRow label="CO₂ Saved" value={`${log.co2_saved?.toFixed(2) || '0'} kg`} />
          <DetailRow label="Collection Location" value={log.collection_location || 'Not specified'} />
          <DetailRow label="Collection Status" value={log.collection_status || 'pending'} />
          <DetailRow
            label="Collection Date"
            value={log.collection_date ? new Date(log.collection_date).toLocaleDateString() : 'Not set'}
          />
          <DetailRow label="Date Logged" value={new Date(log.date).toLocaleString()} />
          <DetailRow label="Disposal Method" value={log.disposal_method || 'Not specified'} />
          {log.image_url && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">Image</p>
              <img src={log.image_url} alt="Waste" className="rounded-lg max-h-64 object-cover" />
            </div>
          )}
        </div>

        <div className="flex space-x-4 mt-6">
          <button
            onClick={onClose}
            className="flex-1 bg-gray-600 text-white py-2.5 rounded-lg hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="flex-1 bg-green-600 text-white py-2.5 rounded-lg hover:bg-green-700 transition"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function DetailRow({ label, value }) {
  return (
    <div className="border-b border-gray-100 pb-3">
      <p className="text-sm font-medium text-gray-700 mb-1">{label}</p>
      <p className="text-gray-900 capitalize">{value || 'N/A'}</p>
    </div>
  );
}