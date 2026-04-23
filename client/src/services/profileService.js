import api from './api';

class ProfileService {
  async updateProfile(data) {
    return await api.put('/auth/profile', data);
  }

  async getProfile() {
    return await api.get('/auth/me');
  }
}

const profileService = new ProfileService();
export default profileService;