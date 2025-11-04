import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import PropTypes from 'prop-types';
import * as SecureStore from 'expo-secure-store';
import Constants from 'expo-constants';

const TOKEN_KEY = 'sbs.auth.token';
const PROFILE_KEY = 'sbs.auth.profile';

const extra = Constants?.expoConfig?.extra ?? Constants?.manifest?.extra ?? {};
const AUTH_API_URL = extra?.authApiUrl;

async function secureSetItem(key, value) {
  if (!value) {
    await SecureStore.deleteItemAsync(key);
    return;
  }
  await SecureStore.setItemAsync(key, value, {
    keychainAccessible: SecureStore.AFTER_FIRST_UNLOCK,
  });
}

async function secureGetItem(key) {
  try {
    const value = await SecureStore.getItemAsync(key);
    return value;
  } catch (error) {
    console.warn('SecureStore read failed', error);
    return null;
  }
}

async function safeFetch(path, { token, body, method = 'GET' } = {}) {
  if (!AUTH_API_URL) {
    throw new Error('AUTH_API_URL is not configured. Add it to app.json extra or .env.');
  }

  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${AUTH_API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    const message = payload?.message || 'Authentication request failed';
    throw new Error(message);
  }

  return response.json();
}

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function bootstrap() {
      try {
        const storedToken = await secureGetItem(TOKEN_KEY);
        const storedProfile = await secureGetItem(PROFILE_KEY);
        if (!mounted) return;
        setToken(storedToken);
        setProfile(storedProfile ? JSON.parse(storedProfile) : null);
      } catch (error) {
        console.warn('Failed to bootstrap auth state', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    bootstrap();
    return () => {
      mounted = false;
    };
  }, []);

  const persistSession = useCallback(async (nextToken, nextProfile) => {
    setToken(nextToken);
    setProfile(nextProfile);
    await secureSetItem(TOKEN_KEY, nextToken ?? '');
    await secureSetItem(PROFILE_KEY, nextProfile ? JSON.stringify(nextProfile) : '');
  }, []);

  const signIn = useCallback(
    async ({ email, password }) => {
      const payload = await safeFetch('/auth/sign-in', {
        method: 'POST',
        body: { email, password },
      });
      await persistSession(payload?.token, payload?.user);
      return payload?.user;
    },
    [persistSession],
  );

  const signUp = useCallback(
    async ({ name, email, password }) => {
      const payload = await safeFetch('/auth/sign-up', {
        method: 'POST',
        body: { name, email, password },
      });
      await persistSession(payload?.token, payload?.user);
      return payload?.user;
    },
    [persistSession],
  );

  const refreshProfile = useCallback(async () => {
    if (!token) {
      throw new Error('No active session');
    }
    const payload = await safeFetch('/me', { token });
    setProfile(payload);
    await secureSetItem(PROFILE_KEY, JSON.stringify(payload));
    return payload;
  }, [token]);

  const updateProfile = useCallback(
    async (updates) => {
      if (!token) {
        throw new Error('No active session');
      }
      const payload = await safeFetch('/me', {
        token,
        method: 'PATCH',
        body: updates,
      });
      setProfile(payload);
      await secureSetItem(PROFILE_KEY, JSON.stringify(payload));
      return payload;
    },
    [token],
  );

  const signOut = useCallback(async () => {
    await secureSetItem(TOKEN_KEY, '');
    await secureSetItem(PROFILE_KEY, '');
    setToken(null);
    setProfile(null);
  }, []);

  const value = useMemo(
    () => ({
      loading,
      token,
      profile,
      isAuthenticated: Boolean(token),
      signIn,
      signUp,
      signOut,
      refreshProfile,
      updateProfile,
    }),
    [loading, profile, refreshProfile, signIn, signOut, signUp, token, updateProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
}
