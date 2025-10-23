import api from './api';

/**
 * CenterService Class
 * 
 * Handles all API calls related to recycling centers
 * Provides methods for CRUD operations on recycling centers
 */
class CenterService {
  /**
   * Get all recycling centers with optional filters
   * 
   * @param {Object} filters - Filter options
   * @param {string} filters.facility_type - Comma-separated facility types (e.g., "biogas,recycling")
   * @param {string} filters.region - Region to filter by
   * @param {string} filters.waste_type - Waste type accepted
   * @param {boolean} filters.active_only - Show only active centers
   * @returns {Promise<Array>} Array of recycling centers
   */
  async getCenters(filters = {}) {
    const params = new URLSearchParams();