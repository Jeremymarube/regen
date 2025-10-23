import api from './api';

/**
 * WasteService Class
 * 
 * Handles all API calls related to waste logs
 * Provides methods for CRUD operations on waste logs
 */
class WasteService {
  // Create a new waste log entry
  async createWasteLog(data) {
    return await api.post('/api/waste-logs/', data);
  }

  // Get waste logs for current user
  async getWasteLogs(limit) {
    const endpoint = limit ? `/api/waste-logs/?limit=${limit}` : '/api/waste-logs/';
    return await api.get(endpoint);
  }

  // Get all waste logs (for management page)
  async getAllWasteLogs() {
    return await api.get('/api/waste-logs/all');
  }

  // Get a single waste log by ID
  async getWasteLog(logId) {
    return await api.get(`/api/waste-logs/${logId}`);
  }

  // Update waste log collection status
  async updateStatus(logId, status) {
    return await api.put(`/api/waste-logs/${logId}/status`, { collection_status: status });
  }

  // Delete a waste log
  async deleteWasteLog(logId) {
    return await api.delete(`/api/waste-logs/${logId}`);
  }
}

const wasteService = new WasteService(); //  instance created safely
export default wasteService; //  ensures stable import recognition