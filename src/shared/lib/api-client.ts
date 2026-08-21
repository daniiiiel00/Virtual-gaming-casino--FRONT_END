import axios from 'axios';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercept HTML responses (usually Vite 404 fallbacks when MSW fails to intercept)
apiClient.interceptors.response.use((response) => {
  if (typeof response.data === 'string' && response.data.includes('<html')) {
    return Promise.reject(new Error('API returned HTML instead of JSON. Ensure the Mock Service Worker is enabled and active.'));
  }
  return response;
});

export type AppError = {
  success: false;
  message: string;
  errors?: Record<string, string[]>;
};

export function normalizeApiError(error: unknown): AppError {
  if (axios.isAxiosError(error) && error.response?.data) {
    return {
      success: false,
      message: error.response.data.message || 'An unexpected error occurred.',
      errors: error.response.data.errors
    };
  }
  return {
    success: false,
    message: error instanceof Error ? error.message : 'An unexpected error occurred.'
  };
}
