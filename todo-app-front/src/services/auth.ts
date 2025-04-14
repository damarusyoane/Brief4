import apiClient from '../api/client';

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData extends LoginData {
  name: string;
}

export const login = async (data: LoginData) => {
  const response = await apiClient.post('/login', data);
  localStorage.setItem('authToken', response.data.token);
  return response.data.user;
};

export const register = async (data: RegisterData) => {
  const response = await apiClient.post('/register', data);
  localStorage.setItem('authToken', response.data.token);
  return response.data.user;
};

export const logout = async () => {
  await apiClient.post('/logout');
  localStorage.removeItem('authToken');
};