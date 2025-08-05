import api from './apiClient';

export const login = async (data: {
    email: string, 
    password: string
}) => {
  const response = await api.post('/api/login', data);
  return response.data;
};