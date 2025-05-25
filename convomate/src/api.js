const BASE_URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:8080";

const apiCall = async (
  endpoint,
  method = "GET",
  data = null,
  params = null,
) => {
  const token = localStorage.getItem("token");
  const headers = {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };

  // For GET requests, we should use params, not body
  let url = `${BASE_URL}${endpoint}`;
  if (params || (method === "GET" && data)) {
    const queryParams = new URLSearchParams(params || data).toString();
    url += `?${queryParams}`;
  }

  const options = {
    method,
    headers,
    ...(method !== "GET" && data && { body: JSON.stringify(data) }),
  };
  try {
    const response = await fetch(url, options);

    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }
      const errorText = await response.text();
      throw new Error(
        errorText || `Request failed with status ${response.status}`,
      );
    }

    return response.json();
  } catch (error) {
    console.error(`API Call Error: ${endpoint}`, error);
    throw error;
  }
};

export default {
  register: (userData) => apiCall("/user/register", "POST", userData),
  generateOtp: (email) => apiCall("/user/generateOtp", "POST", { email }),
  login: (email, otp) => apiCall("/user/login", "POST", { email, otp }),
  logout: () => apiCall("/user/logout", "POST"),
  getUserProfile: (username) => apiCall(`/user/profile`, "GET", null, { username }),
  submitReview: (reviewData) => apiCall("/user/review/submit", "POST", reviewData),
  getAllReviews: () => apiCall("/user/review/all", "GET"),
  createModel: () => apiCall("/model/create", "GET"),
  sendMail: (emailData) => apiCall("/model/sendMail", "POST", emailData),
  test: () => apiCall("/model/test", "GET"),
  translate: (data) => apiCall("/model/translate", "POST", data),
  grammarCheck: (data) => apiCall("/model/correct_text", "POST", data),
  summarizeText: (data) => apiCall("/model/summarize", "POST", data),
  startChat: (params) => apiCall("/model/start", "GET", null, params),
  chatWithBot: (data) => apiCall("/model/chat", "POST", data),
};
