import api from './api';

class AuthService {
  async register(email, password, name) {
    const data = await api.post('/api/auth/register', { email, password, name });
    if (data.access_token) {
      this.setTokens(data.access_token, data.refresh_token);
    }
    return data;
  }

  async login(email, password) {
    const data = await api.post('/api/auth/login', { email, password });
    if (data.access_token) {
      this.setTokens(data.access_token, data.refresh_token);
    }
    return data;
  }

  async loginWithGoogle(token) {
    const data = await api.post('/api/auth/google', { token });
    if (data.access_token) {
      this.setTokens(data.access_token, data.refresh_token);
    }
    return data;
  }

  async resetPassword(email) {
    return await api.post('/api/auth/reset-password', { email });
  }

  async getCurrentUser() {
    return await api.get('/api/auth/me');
  }

  async refreshToken() {
    const refresh_token = localStorage.getItem('refresh_token');
    if (!refresh_token) {
      throw new Error('No refresh token');
    }
    
    const data = await api.post('/api/auth/refresh', {}, {
      headers: { 'Authorization': `Bearer ${refresh_token}` }
    });
    
    if (data.access_token) {
      localStorage.setItem('access_token', data.access_token);
    }
    return data;
  }

  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
  }

  setTokens(accessToken, refreshToken) {
    localStorage.setItem('access_token', accessToken);
    if (refreshToken) {
      localStorage.setItem('refresh_token', refreshToken);
    }
  }

  getAccessToken() {
    return localStorage.getItem('access_token');
  }

  isAuthenticated() {
    return !!this.getAccessToken();
  }
}

export default new AuthService();