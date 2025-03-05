import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080', // Default for dev
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject({
      message: error.response?.data?.message || 'An error occurred',
      status: error.response?.status || 500,
    });
  }
);

export default {
  register: (userData) => api.post('/user/register', userData),
  generateOtp: (email) => api.post('/user/generateOtp', { email }),
  login: (username, otp) => api.post('/user/login', null, { params: { username, otp } }), // Using query params as per backend
  logout: () => api.post('/user/logout'), // Stateless, just clears token on client
  getUserProfile: (username) => api.get(`/user/profile?username=${username}`),
  submitReview: (reviewData) => api.post('/user/review/submit', reviewData),
  getAllReviews: () => api.get('/user/review/all'),
  createModel: () => api.get('/model/create'),
  sendMail: (emailData) => api.post('/model/sendMail', emailData),
  test: () => api.get('/model/test'),
};