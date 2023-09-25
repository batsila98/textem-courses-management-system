import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const refreshTokenFn = async () => {
  const refreshToken = window.localStorage.getItem('refreshToken');

  try {
    const response = await axios.post(
      'http://localhost:3000/auth/tokenRefresh',
      { refreshToken }
    );

    const { accessToken } = response.data;
    if (!accessToken) {
      window.localStorage.removeItem('accessToken');
      window.localStorage.removeItem('refreshToken');
      window.localStorage.removeItem('currentUser');
    }

    window.localStorage.setItem('accessToken', accessToken);

    return accessToken;
  } catch (error) {
    window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');
    window.localStorage.removeItem('currentUser');

    return false;
  }
};

// interceptors
api.interceptors.request.use(
  async (config) => {
    const accessToken = window.localStorage.getItem('accessToken');

    if (accessToken) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${accessToken}`,
      };
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const { config } = error;

    if (error?.response?.status === 401 && !config.sent) {
      config.sent = true;

      const accessToken = await refreshTokenFn();
      if (accessToken) {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${accessToken}`,
        };
      }

      return api(config);
    }

    return Promise.reject(error);
  }
);

export default api;
