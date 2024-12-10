import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthTokens } from '../types/auth';

const API_URL = 'https://api.example.com/v1';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (config) => {
  const tokens = await AsyncStorage.getItem('auth_tokens');
  if (tokens) {
    const { accessToken } = JSON.parse(tokens) as AuthTokens;
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const tokens = await AsyncStorage.getItem('auth_tokens');
        if (tokens) {
          const { refreshToken } = JSON.parse(tokens) as AuthTokens;
          const response = await api.post('/auth/refresh', { refreshToken });
          await AsyncStorage.setItem('auth_tokens', JSON.stringify(response.data));
          return api(originalRequest);
        }
      } catch (error) {
        await AsyncStorage.removeItem('auth_tokens');
      }
    }
    return Promise.reject(error);
  }
);