// API Configuration
export const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    REGISTER: `${API_URL}/auth/register`,
    LOGIN: `${API_URL}/auth/login`,
    LOGOUT: `${API_URL}/auth/logout`,
  },
  DASHBOARD: `${API_URL}/dashboard`,
  COMMUNITY: {
    LEADERBOARD: `${API_URL}/community/leaderboard`,
  },
  WASTE_LOGS: `${API_URL}/waste-logs`,
  RECYCLING_CENTERS: `${API_URL}/recycling-centers`,
  AI_GUIDE: `${API_URL}/ai-guide`,
};
