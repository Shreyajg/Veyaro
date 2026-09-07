import { getToken, logout } from '../data/auth.js';

const API_BASE_URL = 'http://localhost:8000/api';

export async function apiFetch(endpoint, options = {}) {
  const token = getToken();

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    // Token was rejected outright — clear local state so the UI
    // doesn't keep thinking the user is logged in.
    if (response.status === 401) {
      logout();
    }

    throw new Error(data.message || 'Something went wrong');
  }

  return data;
}