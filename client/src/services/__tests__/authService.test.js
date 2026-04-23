import authService from '../authService';
import api from '../api';

// Mock the api module
jest.mock('../api');

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('AuthService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  describe('register', () => {
    it('should register user and store tokens', async () => {
      const mockResponse = {
        data: {
          access_token: 'test-access-token',
          refresh_token: 'test-refresh-token',
          user: { id: '123', email: 'test@example.com' },
        },
      };

      api.post.mockResolvedValue(mockResponse);

      const result = await authService.register('test@example.com', 'password123', 'Test User');

      expect(api.post).toHaveBeenCalledWith('/auth/register', {
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      });
      expect(localStorage.getItem('access_token')).toBe('test-access-token');
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('login', () => {
    it('should login user and store tokens', async () => {
      const mockResponse = {
        data: {
          access_token: 'test-access-token',
          refresh_token: 'test-refresh-token',
          user: { id: '123', email: 'test@example.com' },
        },
      };

      api.post.mockResolvedValue(mockResponse);

      const result = await authService.login('test@example.com', 'password123');

      expect(api.post).toHaveBeenCalledWith('/auth/login', {
        email: 'test@example.com',
        password: 'password123',
      });
      expect(localStorage.getItem('access_token')).toBe('test-access-token');
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('logout', () => {
    it('should remove tokens from localStorage', () => {
      localStorage.setItem('access_token', 'test-token');
      localStorage.setItem('refresh_token', 'test-refresh');

      authService.logout();

      expect(localStorage.getItem('access_token')).toBeNull();
      expect(localStorage.getItem('refresh_token')).toBeNull();
    });
  });

  describe('getCurrentUser', () => {
    it('should fetch current user data', async () => {
      const mockResponse = {
        data: {
          user: { id: '123', email: 'test@example.com', name: 'Test User' },
        },
      };

      api.get.mockResolvedValue(mockResponse);

      const result = await authService.getCurrentUser();

      expect(api.get).toHaveBeenCalledWith('/auth/me');
      expect(result).toEqual(mockResponse.data);
    });
  });

  describe('isAuthenticated', () => {
    it('should return true when access token exists', () => {
      localStorage.setItem('access_token', 'test-token');
      expect(authService.isAuthenticated()).toBe(true);
    });

    it('should return false when access token does not exist', () => {
      expect(authService.isAuthenticated()).toBe(false);
    });
  });

  describe('resetPassword', () => {
    it('should call reset password endpoint', async () => {
      const mockResponse = {
        data: { message: 'Password reset successful' },
      };

      api.post.mockResolvedValue(mockResponse);

      const result = await authService.resetPassword('test@example.com', 'newpassword123');

      expect(api.post).toHaveBeenCalledWith('/auth/reset-password', {
        email: 'test@example.com',
        new_password: 'newpassword123',
      });
      expect(result).toEqual(mockResponse.data);
    });
  });
});
