import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL || 'http://localhost:5005',
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
