import { ref, computed } from 'vue';

const API_BASE = 'https://reqres.in/api';

// Shared state so every import gets the same reactive values
const user = ref(null);
const token = ref(localStorage.getItem('token') || null);
const isAuthenticating = ref(false);
const authError = ref('');

const isAuthenticated = computed(() => !!token.value);

const setToken = (t) => {
  token.value = t;
  if (t) localStorage.setItem('token', t);
  else localStorage.removeItem('token');
};

const register = async (email, password) => {
  isAuthenticating.value = true;
  authError.value = '';
  try {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      authError.value = data.error || 'Registration failed.';
      return false;
    }
    setToken(data.token);
    user.value = { id: data.id, email };
    return true;
  } catch (err) {
    authError.value = err.message || 'Network error';
    return false;
  } finally {
    isAuthenticating.value = false;
  }
};

const login = async (email, password) => {
  isAuthenticating.value = true;
  authError.value = '';
  try {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (!res.ok) {
      authError.value = data.error || 'Login failed.';
      return false;
    }
    setToken(data.token);
    user.value = { email };
    return true;
  } catch (err) {
    authError.value = err.message || 'Network error';
    return false;
  } finally {
    isAuthenticating.value = false;
  }
};

const logout = () => {
  setToken(null);
  user.value = null;
  authError.value = '';
};

export function useAuth() {
  return {
    user,
    token,
    isAuthenticated,
    isAuthenticating,
    authError,
    register,
    login,
    logout,
  };
}
