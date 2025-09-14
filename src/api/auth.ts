import api from './axios';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  name: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: number;
    email: string;
    name: string;
    role: string;
    isEmailVerified: boolean;
  };
}

export interface EmailVerificationResponse {
  success: boolean;
  message: string;
}

export interface EmailVerificationRequest {
  token: string;
}

export interface ResendVerificationRequest {
  email: string;
}

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    const response = await api.post('/auth/login', credentials);
    return response.data;
  },

  register: async (userData: RegisterRequest): Promise<EmailVerificationResponse> => {
    const response = await api.post('/auth/register', userData);
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  getProfile: async () => {
    const response = await api.get('/auth/profile');
    return response.data;
  },

  verifyEmail: async (token: string): Promise<EmailVerificationResponse> => {
    const response = await api.post('/auth/verify-email', { token });
    return response.data;
  },

  resendVerification: async (email: string): Promise<EmailVerificationResponse> => {
    const response = await api.post('/auth/resend-verification', { email });
    return response.data;
  },
};
