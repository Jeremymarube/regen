import api from './api';

class AuthService {
  async register(email, password, name) {
    const response = await api.post('/auth/register', { email, password, name });
    const data = response.data;
    if (data.access_token) {
      this.setTokens(data.access_token, data.refresh_token);
    }
    return data;
  }

  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    const data = response.data;
    if (data.access_token) {
      this.setTokens(data.access_token, data.refresh_token);
    }
    return data;
  }

  async loginWithGoogle(token) {
    const response = await api.post('/auth/google', { token });
    const data = response.data;
    if (data.access_token) {
      this.setTokens(data.access_token, data.refresh_token);
    }
    return data;
  }

  async resetPassword(email, newPassword) {
    console.log('DEBUG - resetPassword called with:', { email, newPassword });
    const response = await api.post('/auth/reset-password', { 
      email, 
      new_password: newPassword 
    });
    console.log('DEBUG - resetPassword result:', response.data);
    return response.data;
  }

  async getCurrentUser() {
    const response = await api.get('/auth/me');
    return response.data;
  }

  async refreshToken() {
    const refresh_token = localStorage.getItem('refresh_token');
    if (!refresh_token) {
      throw new Error('No refresh token');
    }
    
    const response = await api.post('/auth/refresh', {}, {
      headers: { 'Authorization': `Bearer ${refresh_token}` }
    });
    const data = response.data;
    
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