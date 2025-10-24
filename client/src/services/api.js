// Base URL for your Flask backend
const BASE_URL = 'http://127.0.0.1:5000';

// Create a fetch-based API wrapper (compatible with Next.js, no dependencies needed)
const api = {
  get: async (url, config = {}) => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
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
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
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
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
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
      headers: {
        'Content-Type': 'application/json',
        ...config.headers,
      },
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
