import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

const api = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 30000, // 30s timeout (Render free tier can be slow on cold start)
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// --- Problem APIs ---
export const getProblems = (params = {}) => api.get('/problems', { params });
export const getProblem = (id) => api.get(`/problems/${id}`);

// --- Attempt APIs ---
export const createAttempt = (data) => api.post('/attempts', data);
export const getAttempts = (problemId) => api.get(`/attempts/${problemId}`);
export const updateAttempt = (attemptId, data) => api.put(`/attempts/${attemptId}`, data);

// --- Dashboard APIs ---
export const getDashboard = () => api.get('/dashboard');
export const getToday = () => api.get('/dashboard/today');
export const getRevisions = () => api.get('/dashboard/revision');

// --- Progress APIs ---
export const getProgress = () => api.get('/progress');
export const updateDailyTarget = (dailyTarget) =>
  api.put('/progress/daily-target', { daily_target: dailyTarget });

export default api;
