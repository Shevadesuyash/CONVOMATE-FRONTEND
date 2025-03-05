const BASE_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8080';

const apiCall = async (endpoint, method = 'GET', data = null, params = null) => {
  const token = localStorage.getItem('token');
  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  const url = params ? `${BASE_URL}${endpoint}?${new URLSearchParams(params)}` : `${BASE_URL}${endpoint}`;
  const options = {
    method,
    headers,
    ...(data && { body: JSON.stringify(data) }),
  };

  const response = await fetch(url, options);
  if (!response.ok) {
    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    const error = await response.json();
    throw { message: error.message || 'An error occurred', status: response.status };
  }
  return response.json();
};

export default {
  register: (userData) => apiCall('/user/register', 'POST', userData),
  generateOtp: (email) => apiCall('/user/generateOtp', 'POST', { email }),
  login: (username, otp) => apiCall('/user/login', 'POST', null, { username, otp }),
  logout: () => apiCall('/user/logout', 'POST'),
  getUserProfile: (username) => apiCall(`/user/profile`, 'GET', null, { username }),
  submitReview: (reviewData) => apiCall('/user/review/submit', 'POST', reviewData),
  getAllReviews: () => apiCall('/user/review/all', 'GET'),
  createModel: () => apiCall('/model/create', 'GET'),
  sendMail: (emailData) => apiCall('/model/sendMail', 'POST', emailData),
  test: () => apiCall('/model/test', 'GET'),
  translate: (data) => apiCall('/model/translate', 'POST', data),
};