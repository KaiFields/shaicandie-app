import Constants from 'expo-constants';

const extra = Constants?.expoConfig?.extra ?? Constants?.manifest?.extra ?? {};

function getBaseUrl(key, fallbackName) {
  const url = extra?.[key];
  if (!url) {
    throw new Error(`${fallbackName} is not configured. Check app.json extra or .env.`);
  }
  return url;
}

async function request(baseUrl, path, { method = 'GET', token, body } = {}) {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${baseUrl}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => ({}));
    const message = payload?.message || 'Request failed';
    throw new Error(message);
  }

  return response.json();
}

export async function submitMentorPrompt({ prompt, context, token }) {
  const baseUrl = getBaseUrl('mentorApiUrl', 'MENTOR_API_URL');
  return request(baseUrl, '/sessions', {
    method: 'POST',
    token,
    body: { prompt, context },
  });
}

export async function fetchCourses({ token }) {
  const baseUrl = getBaseUrl('commerceUrl', 'COMMERCE_URL');
  return request(baseUrl, '/courses', { token });
}

export async function fetchProducts({ token }) {
  const baseUrl = getBaseUrl('commerceUrl', 'COMMERCE_URL');
  return request(baseUrl, '/products', { token });
}

export function getVideoRoomUrl({ roomId, token }) {
  const host = getBaseUrl('videoHostUrl', 'VIDEO_PROVIDER_URL');
  const query = token ? `?token=${encodeURIComponent(token)}` : '';
  return `${host}/rooms/${roomId}${query}`;
}
