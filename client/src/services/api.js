// Base URL for your Flask backend
const BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://regen-0n58.onrender.com/api';

// Helper function to get auth headers
const getAuthHeaders = (additionalHeaders = {}) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` }),
    ...additionalHeaders,
  };
};

// Create a fetch-based API wrapper (compatible with Next.js, no dependencies needed)
const api = {
  get: async (url, config = {}) => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'GET',
      headers: getAuthHeaders(config.headers),
      credentials: 'include',
    });
    const data = await response.json();
    if (!response.ok) {
      const errorMessage = data.message || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }
    return { data };
  },

  post: async (url, data, config = {}) => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      headers: getAuthHeaders(config.headers),
      credentials: 'include',
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (!response.ok) {
      const errorMessage = responseData.message || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }
    return { data: responseData };
  },

  put: async (url, data, config = {}) => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'PUT',
      headers: getAuthHeaders(config.headers),
      credentials: 'include',
      body: JSON.stringify(data),
    });
    const responseData = await response.json();
    if (!response.ok) {
      const errorMessage = responseData.message || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }
    return { data: responseData };
  },

  delete: async (url, config = {}) => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'DELETE',
      headers: getAuthHeaders(config.headers),
      credentials: 'include',
    });
    const responseData = await response.json();
    if (!response.ok) {
      const errorMessage = responseData.message || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }
    return { data: responseData };
  },
};

export default api;
