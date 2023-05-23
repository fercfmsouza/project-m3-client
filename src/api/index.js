import axios from 'axios';

const isDevelopment = process.env.NODE_ENV === 'development';

const api = axios.create({
  baseURL: isDevelopment
    ? 'http://localhost:5005'
    : 'https://teal-gleaming-parrot.cyclic.app',
});

api.interceptors.request.use((config) => {
  const storedToken = localStorage.getItem('authToken');

  if (storedToken) {
    config.headers = { Authorization: `Bearer ${storedToken}` };
  }

  return config;
});

export { api }; // ==> named export => NEEEEED to import with the same name
// export default api; // default export => I can import with whatever name I want
