import api from './apiClient';

export const login = async (data: {
    email: string, 
    password: string
}) => {
  const response = await api.post('/api/login', data);
  localStorage.setItem("userId", response.data.user.id )
  return response.data;
};