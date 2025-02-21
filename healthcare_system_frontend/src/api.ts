import axios from "axios";

const API_BASE_URL = "http://localhost:8000/api"; // Update with your backend URL

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to get authentication token from localStorage
const getAuthToken = () => localStorage.getItem("authToken");

// Interceptor to add Authorization header if token exists
api.interceptors.request.use(
  (config) => {
    const token = getAuthToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// User Authentication APIs
export const login = async (username: string, password: string) => {
  const response = await api.post("/auth/login/", { username, password });
  const { access, refresh } = response.data;
  
  localStorage.setItem("authToken", access);
  localStorage.setItem("refreshToken", refresh);

  return response.data;
};

export const register = async (
  username: string,
  email: string,
  password: string,
  isDoctor: boolean,
  isPatient: boolean
) => {
  try {
    const response = await api.post("/auth/register/", {
      username,
      email,
      password,
      is_doctor: isDoctor,
      is_patient: isPatient,
    });

    return response.data;
  } catch (error) {
    console.error("Registration error:", error);
    throw new Error(error.response?.data?.detail || "Registration failed");
  }
};

export const logout = () => {
  try {
    localStorage.removeItem("authToken");
  } catch (error) {
    console.error("Logout error:", error);
  }
};

// Fetch User Profile
export const getUserProfile = async () => {
  const response = await api.get("/auth/profile/");
  return response.data;
};

// Example API Request to Fetch Data
export const fetchPatients = async () => {
  const response = await api.get("/patients/");
  return response.data;
};

export const createPatient = async (patientData: any) => {
  const response = await api.post("/patients/", patientData);
  return response.data;
};

export const updatePatient = async (id: number, patientData: any) => {
  const response = await api.put(`/patients/${id}/`, patientData);
  return response.data;
};

export const deletePatient = async (id: number) => {
  const response = await api.delete(`/patients/${id}/`);
  return response.data;
};
