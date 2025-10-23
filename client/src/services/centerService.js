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
      if (filters.facility_type) {
      params.append('facility_type', filters.facility_type);
    }
    if (filters.region) {
      params.append('region', filters.region);
    }
    if (filters.waste_type) {
      params.append('waste_type', filters.waste_type);
    }
    if (filters.active_only !== undefined) {
      params.append('active_only', filters.active_only);
    }
    
    const queryString = params.toString();
    const endpoint = queryString ? /api/recycling-centers?${queryString} : '/api/recycling-centers';

      return await api.get(endpoint);
  }

  /**
   * Get a single recycling center by ID
   * 
   * @param {string} centerId - Center ID
   * @returns {Promise<Object>} Recycling center data
   */
  async getCenter(centerId) {
    return await api.get(/api/recycling-centers/${centerId});
  }
    /**
   * Create a new recycling center
   * 
   * @param {Object} data - Center data
   * @param {string} data.name - Center name
   * @param {string} data.location - Center location
   * @param {number} data.latitude - Latitude coordinate
   * @param {number} data.longitude - Longitude coordinate
   * @param {Array<string>} data.accepted_types - Accepted waste types
   * @param {string} data.contact - Contact information
   * @param {string} data.facility_type - Facility type (recycling/dumpsite/biogas)
   * @param {boolean} data.is_active - Active status
   * @param {string} data.operating_hours - Operating hours
   * @returns {Promise<Object>} Created center data
   */
  async createCenter(data) {
    return await api.post('/api/recycling-centers', data);
  }
