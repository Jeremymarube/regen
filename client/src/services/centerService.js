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
    const endpoint = queryString ? `/recycling-centers/?${queryString}` : '/recycling-centers/';
    const response = await api.get(endpoint);
    // Return the data array from the response
    return response.data?.data || [];
  }

  /**
   * Get a single recycling center by ID
   * 
   * @param {string} centerId - Center ID
   * @returns {Promise<Object>} Recycling center data
   */
  async getCenter(centerId) {
    return await api.get(`/recycling-centers/${centerId}`);
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
    return await api.post('/recycling-centers/', data);
  }

  /**
   * Update an existing recycling center
   * 
   * @param {string} centerId - Center ID
   * @param {Object} data - Updated center data
   * @returns {Promise<Object>} Updated center data
   */
  async updateCenter(centerId, data) {
    return await api.put(`/recycling-centers/${centerId}`, data);
  }
   
  async getNearbyFacilities(region, wasteType) {
    const response = await this.getCenters({
        region: region,
        waste_type: wasteType,
        active_only: true
    });
    return response;
  }
  /**
   * Delete a recycling center
   * 
   * @param {string} centerId - Center ID
   * @returns {Promise<Object>} Deletion confirmation
   */
  async deleteCenter(centerId) {
    return await api.delete(`/recycling-centers/${centerId}`);
  }
}

export default new CenterService();