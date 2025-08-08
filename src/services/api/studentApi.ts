import api from './apiClient';

export const getStudents = async () => {
  const response = await api.get('/api/getAllStudents');
  return response.data;
};

export const createStudent = async (studentData: {
  name: string;
  email: string;
  phone?: string;
  startDate?: string;
  monthlyFee?: number;
  notes?: string;
  userId: string;
  classes?: any[];
  payments?: any[];
  progress?: any[];
}, token: string) => {
  const response = await api.post('/api/students/createStudent', studentData, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
};


export const deleteStudent = async (id: string) => {
  const response = await api.delete(`/students/${id}`);
  return response.data;
};
