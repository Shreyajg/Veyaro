import {
  getToken,
  getSession,
  setSession,
  hydrateSession,
  logout
} from './data/auth.js';

import { apiFetch } from './utils/api.js';

import {
  renderLogin,
  bindLoginEvents
} from './pages/Login.js';

import { renderAdmin } from './pages/Admin.js';

import {
  renderSidebar,
  bindSidebarEvents
} from './components/Sidebar.js';

import {
  renderHome,
  bindHomeEvents
} from './pages/Home.js';

import {
  renderClasses
} from './pages/Classes.js';

import {
  renderClassDetail,
  bindClassDetailEvents
} from './pages/ClassDetail.js';

import {
  renderAssignments,
  bindAssignmentsEvents
} from './pages/Assignments.js';

import {
  renderCalendar,
  bindCalendarEvents
} from './pages/Calendar.js';

import {
  renderIBCore
} from './pages/IBCore.js';

import {
  renderSchool,
  bindSchoolEvents
} from './pages/School.js';

import {
  renderProfile
} from './pages/Profile.js';

const sidebarRoot = document.getElementById('sidebar-root');
const appContent = document.getElementById('app-content');

let assignmentsFilter = 'all';

// Resolves the current session, fetching it from the server if a
// token exists but sessionStorage is empty (fresh tab, restart, etc).
// CONFIRM: '/users/me' is a placeholder — swap for your real endpoint.
async function ensureSession() {
  const token = getToken();
  let session = getSession();

  if (token && !session) {
    try {
      const response = await apiFetch('/users/me');
      session = {
        username: response.data.username,
        role: response.data.role?.toLowerCase() || 'student',
      };
      setSession(session);
    } catch {
      // Token was invalid/expired — apiFetch already cleared it on 401.
      logout();
      session = null;
    }
  }

  return session;
}

function parseHash() {
  const hash = window.location.hash.replace(/^#\/?/, '');

  if (!hash) {
    return ['home'];
  }

  return hash
    .split('/')
    .filter(Boolean)
    .map(decodeURIComponent);
}

function renderAdminSidebar() {
  
  return `
    <nav class="sidebar" aria-label="Admin navigation">
      <div class="sidebar-brand">
        <div class="sidebar-brand-mark">A</div>
        <div>
          <div class="sidebar-brand-name">Ansha</div>
          <span class="sidebar-brand-school">
            Chaman Bharatiya School
          </span>
        </div>
      </div>

      <div class="sidebar-nav">
        <button
          class="sidebar-nav-item is-active"
          type="button"
          data-admin-nav="home"
        >
          <span class="nav-icon">⌂</span>
          <span>Admin home</span>
        </button>

        <button
          class="sidebar-nav-item"
          type="button"
          data-admin-nav="students"
        >
          <span class="nav-icon">♙</span>
          <span>Students</span>
        </button>

        <button
          class="sidebar-nav-item"
          type="button"
          data-admin-nav="teachers"
        >
          <span class="nav-icon">♧</span>
          <span>Teachers</span>
        </button>

        <button
          class="sidebar-nav-item"
          type="button"
          data-admin-nav="classes"
        >
          <span class="nav-icon">◇</span>
          <span>Classes</span>
        </button>

        <button
          class="sidebar-nav-item"
          type="button"
          data-admin-nav="announcements"
        >
          <span class="nav-icon">◈</span>
          <span>Announcements</span>
        </button>
      </div>

      <div class="sidebar-footer">
        <button
          class="sidebar-user"
          data-admin-logout
          type="button"
        >
          <div class="sidebar-user-avatar">A</div>

          <div>
            <div class="sidebar-user-name">
              Admin
            </div>

            <div class="sidebar-user-role">
              Administrator · Log out
            </div>
          </div>
        </button>
      </div>
    </nav>
  `;
}

function bindAdminSidebarEvents() {
  document
    .querySelector('[data-admin-logout]')
    ?.addEventListener('click', () => {
      logout();
      window.location.hash = '#/login';
    });

  document
    .querySelectorAll('[data-admin-nav]')
    .forEach((button) => {
      button.addEventListener('click', () => {
        const section = button.dataset.adminNav;

        window.location.hash = `#/${section}`;
      });
    });
}

function navigate(section) {
  window.location.hash = `#/${section}`;
}

async function renderRoute() {
  const session = await ensureSession();

  /*
   * NOT LOGGED IN
   */
  if (!session) {
    sidebarRoot.innerHTML = '';
    appContent.innerHTML = renderLogin();

    bindLoginEvents(() => {
      window.location.hash = '#/home';
    });

    return;
  }

  const [section, ...rest] = parseHash();

  document.getElementById('modal-root').innerHTML = '';

  /*
   * ADMIN
   */
  if (session.role === 'admin') {
    sidebarRoot.innerHTML = renderAdminSidebar();
    bindAdminSidebarEvents();

    if (section === 'logout') {
      logout();
      window.location.hash = '#/login';
      return;
    }

    appContent.innerHTML = renderAdmin();

    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });

    return;
  }

  /*
   * TEACHER
   */
  if (session.role === 'teacher') {
    sidebarRoot.innerHTML = renderTeacherSidebar();
    bindTeacherSidebarEvents();

    if (section === 'logout') {
      logout();
      window.location.hash = '#/login';
      return;
    }

    appContent.innerHTML = `
      <main style="padding: 40px;">
        <h1>Teacher Dashboard</h1>
        <p>Teacher dashboard coming soon.</p>
      </main>
    `;

    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });

    return;
  }

  /*
   * STUDENT
   */
  if (session.role === 'student') {
    sidebarRoot.innerHTML = renderSidebar(section);
    bindSidebarEvents(navigate);

    switch (section) {
      case 'home':
        appContent.innerHTML = await renderHome();
        bindHomeEvents();
        break;

      case 'classes':
        if (rest[0]) {
          const tab = rest[1]
            ? decodeURIComponent(rest[1])
            : 'Overview';

          appContent.innerHTML =
            await renderClassDetail(rest[0], tab);

          bindClassDetailEvents(
            rest[0],
            (id, newTab) => {
              window.location.hash =
                `#/classes/${id}/${encodeURIComponent(newTab)}`;
            }
          );
        } else {
          appContent.innerHTML = await renderClasses();
        }
        break;

      case 'assignments':
        appContent.innerHTML =
          await renderAssignments(assignmentsFilter);

        bindAssignmentsEvents(filter => {
          assignmentsFilter = filter;
          renderRoute();
        });
        break;

      case 'calendar':
        appContent.innerHTML =
          await renderCalendar(
            new Date().getFullYear(),
            new Date().getMonth()
          );

        bindCalendarEvents();
        break;

      case 'ib-core':
        appContent.innerHTML = renderIBCore();
        break;

      case 'cas':
        appContent.innerHTML = renderIBCore('CAS');
        break;

      case 'ee':
        appContent.innerHTML = renderIBCore('EE');
        break;

      case 'school':
        appContent.innerHTML = await renderSchool();
        bindSchoolEvents();
        break;

      case 'profile':
        appContent.innerHTML = await renderProfile();
        break;

      case 'logout':
        logout();
        window.location.hash = '#/login';
        return;

      case 'login':
        window.location.hash = '#/home';
        return;

      default:
        window.location.hash = '#/home';
        return;
    }

    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
  }
}


/*
 * TEACHER SIDEBAR
 */

function renderTeacherSidebar() {
  return `
    <nav class="sidebar" aria-label="Teacher navigation">

      <div class="sidebar-brand">
        <div class="sidebar-brand-mark">A</div>

        <div>
          <div class="sidebar-brand-name">Ansha</div>

          <span class="sidebar-brand-school">
            Chaman Bharatiya School
          </span>
        </div>
      </div>

      <div class="sidebar-nav">

        <button
          class="sidebar-nav-item is-active"
          type="button"
        >
          <span class="nav-icon">⌂</span>
          <span>Teacher home</span>
        </button>

        <button
          class="sidebar-nav-item"
          type="button"
        >
          <span class="nav-icon">◇</span>
          <span>Classes</span>
        </button>

        <button
          class="sidebar-nav-item"
          type="button"
        >
          <span class="nav-icon">✓</span>
          <span>Assignments</span>
        </button>

      </div>

      <div class="sidebar-footer">

        <button
          class="sidebar-user"
          data-teacher-logout
          type="button"
        >
          <div class="sidebar-user-avatar">T</div>

          <div>
            <div class="sidebar-user-name">
              Teacher
            </div>

            <div class="sidebar-user-role">
              Teacher · Log out
            </div>
          </div>
        </button>

      </div>

    </nav>
  `;
}


function bindTeacherSidebarEvents() {
  document
    .querySelector('[data-teacher-logout]')
    ?.addEventListener('click', () => {
      logout();
      window.location.hash = '#/login';
    });
}


/*
 * ROUTING
 */

window.addEventListener(
  'hashchange',
  renderRoute
);

window.addEventListener(
  'DOMContentLoaded',
  () => {
    if (!window.location.hash) {
      window.location.hash = '#/home';
    } else {
      renderRoute();
    }
  }
);