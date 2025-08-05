import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // Ex: http://localhost:3333
  // withCredentials: true, // caso use cookies
});

export default api;
