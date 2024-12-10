import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const API_URL = 'http://localhost:8000';

export interface AuthTokens {
  access_token: string;
  token_type: string;
}

export const storeAuthTokens = async (tokens: AuthTokens) => {
  await AsyncStorage.setItem('auth_tokens', JSON.stringify(tokens));
};

export const getAuthTokens = async (): Promise<AuthTokens | null> => {
  const tokens = await AsyncStorage.getItem('auth_tokens');
  return tokens ? JSON.parse(tokens) : null;
};

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/token`, {
      username: email,
      password: password,
    });
    await storeAuthTokens(response.data);
    return response.data;
  } catch (error) {
    throw new Error('Login failed');
  }
};