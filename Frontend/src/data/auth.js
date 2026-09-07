const TOKEN_KEY = 'ansha_token';
const SESSION_KEY = 'ansha_session';

// NOTE: token lives in localStorage, which is readable by any XSS on
// the page. If the backend can support it, an httpOnly cookie is the
// safer home for this — left as-is here since that's a backend change.

function safeGet(storage, key) {
  try {
    return storage.getItem(key);
  } catch {
    return null;
  }
}

function safeSet(storage, key, value) {
  try {
    storage.setItem(key, value);
    return true;
  } catch {
    return false;
  }
}

function safeRemove(storage, key) {
  try {
    storage.removeItem(key);
  } catch {
    // ignore
  }
}

export function setToken(token) {
  return safeSet(localStorage, TOKEN_KEY, token);
}

export function getToken() {
  return safeGet(localStorage, TOKEN_KEY);
}

export function getSession() {
  const raw = safeGet(sessionStorage, SESSION_KEY);

  if (!raw) return null;

  try {
    return JSON.parse(raw);
  } catch {
    safeRemove(sessionStorage, SESSION_KEY);
    return null;
  }
}

export function setSession(session) {
  return safeSet(sessionStorage, SESSION_KEY, JSON.stringify(session));
}

// Reads whatever's already in storage. Returns null if there's no
// token, or if there's a token but no session (e.g. fresh tab —
// sessionStorage doesn't survive across tabs/restarts the way
// localStorage does). Does NOT make a network call; see main.js's
// ensureSession() for the server-rehydration step.
export function hydrateSession() {
  const token = getToken();

  if (!token) {
    safeRemove(sessionStorage, SESSION_KEY);
    return null;
  }

  return getSession();
}

export function logout() {
  safeRemove(localStorage, TOKEN_KEY);
  safeRemove(sessionStorage, SESSION_KEY);
}

export function isLoggedIn() {
  return Boolean(getToken());
}

export function isAdmin() {
  return getSession()?.role === 'admin';
}

// Optional cross-tab sync. Call once at app startup.
export function onAuthChange(callback) {
  function handler(event) {
    if (event.key === TOKEN_KEY || event.key === SESSION_KEY) {
      callback();
    }
  }
  window.addEventListener('storage', handler);
  return () => window.removeEventListener('storage', handler);
}