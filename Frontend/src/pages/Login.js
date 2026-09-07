import { apiFetch } from '../utils/api.js';
import { setToken ,setSession } from '../data/auth.js';

export function renderLogin() {
  return `
    <main class="login-page">
      <div class="login-orb login-orb-one"></div>
      <div class="login-orb login-orb-two"></div>
      <section class="login-card" aria-labelledby="login-title">
        <div class="login-brand">
          <div class="login-mark">A</div>
          <div>
            <div class="login-brand-name">Ansha</div>
            <div class="login-brand-school">Chaman Bharatiya School</div>
          </div>
        </div>

        <div class="login-heading">
          <div class="welcome-eyebrow">Welcome back</div>
          <h1 id="login-title">Sign in to Ansha.</h1>
          <p>Your school, organised in one place.</p>
        </div>

        <form id="login-form" class="login-form" novalidate>
          <label>
            <span>Username</span>
            <input id="login-username" name="username" type="text" autocomplete="username" placeholder="Enter your username" required />
          </label>
          <label>
            <span>Password</span>
            <input id="login-password" name="password" type="password" autocomplete="current-password" placeholder="Enter your password" required />
          </label>
          <div id="login-error" class="login-error" role="alert" aria-live="polite"></div>
          <button class="login-submit" type="submit">Sign in <span>→</span></button>
        </form>

        <p class="login-footer">Chaman Bharatiya School · Ansha</p>
      </section>
    </main>`;
}

export function bindLoginEvents(onSuccess) {
  const form = document.getElementById('login-form');
  const error = document.getElementById('login-error');
  const username = document.getElementById('login-username');
  const password = document.getElementById('login-password');

  username?.focus();

  form?.addEventListener('submit', async (event) => {
    event.preventDefault();
    error.textContent = '';

    if (!username.value.trim() || !password.value) {
      error.textContent = 'Username and password are required.';
      return;
    }
    try {
      const response = await apiFetch('/users/login', {
        method: 'POST',
        body: JSON.stringify({
          username: username.value.trim(),
          password: password.value,
        }),
      });

      setToken(response.data.token);

      setSession({
        username: username.value.trim(),
        role: response.data.role?.toLowerCase() || 'student',
      });

      onSuccess();

    } catch (err) {
      error.textContent = 'Incorrect username or password.';
      password.value = '';
      password.focus();
    }
});
}
