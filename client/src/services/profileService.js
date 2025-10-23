import api from './api';

class ProfileService {
  async updateProfile(data) {
    return await api.put('/api/auth/profile', data);
  }

  async getProfile() {
    return await api.get('/api/auth/me');
  }
}

const profileService = new ProfileService();
export default profileService;