import api from './api';

/**
 * WasteService Class
 * 
 * Handles all API calls related to waste logs
 * Provides methods for CRUD operations on waste logs
 */
class WasteService {
  /**
   * Create a new waste log entry
   * 
   * @param {Object} data - Waste log data
   * @param {string} data.waste_type - Type of waste (Plastic, Paper, Organic, etc.)
   * @param {number} data.weight - Weight in kg
   * @param {string} data.image_url - Optional image URL
   * @param {string} data.collection_location - Collection address
   * @param {string} data.collection_status - Status (pending/scheduled/collected)
   * @param {string} data.collection_date - Optional collection date
   * @param {string} data.nearest_facility_id - Optional facility ID
   * @returns {Promise<Object>} Created waste log data
   */
  async createWasteLog(data) {
    return await api.post('/api/waste-logs', data);
  }

  /**
   * Get waste logs for current user
   * 
   * @param {number} limit - Optional limit for number of logs to retrieve
   * @returns {Promise<Array>} Array of waste logs
   */
  async getWasteLogs(limit) {
    const endpoint = limit ? `/api/waste-logs?limit=${limit}` : '/api/waste-logs';
    return await api.get(endpoint);
  }

  /**
   * Get all waste logs (for management page)
   * 
   * @returns {Promise<Array>} Array of all waste logs
   */
  async getAllWasteLogs() {
    return await api.get('/api/waste-logs/all');
  }

  /**
   * Get a single waste log by ID
   * 
   * @param {string} logId - Waste log ID
   * @returns {Promise<Object>} Waste log data
   */
  async getWasteLog(logId) {
    return await api.get(`/api/waste-logs/${logId}`);
  }

  /**
   * Update waste log collection status
   * 
   * @param {string} logId - Waste log ID
   * @param {string} status - New status (pending/scheduled/collected)
   * @returns {Promise<Object>} Updated waste log data
   */
  async updateStatus(logId, status) {
    return await api.put(`/api/waste-logs/${logId}/status`, { collection_status: status });
  }

  /**
   * Delete a waste log
   * 
   * @param {string} logId - Waste log ID
   * @returns {Promise<Object>} Deletion confirmation
   */
  async deleteWasteLog(logId) {
    return await api.delete(`/api/waste-logs/${logId}`);
  }
}

export default new WasteService(); 
