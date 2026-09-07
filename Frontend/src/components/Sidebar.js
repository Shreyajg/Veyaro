import { icons } from '../icons.js';
import { student } from '../data/student.js';

const NAV_ITEMS = [
  ['home','Home','home'],
  ['classes','Classes','classes'],
  ['assignments','Assignments','assignments'],
  ['calendar','Calendar','calendar'],
  ['ib-core','IB Core','core'],
  ['cas','CAS','cas'],
  ['ee','EE','ee'],
  ['school','School','school'],
  ['profile','Profile','profile'],
  ['logout','Log out','logout'],
];

export function renderSidebar(activeRoute) {
  return `
    <nav class="sidebar" aria-label="Main navigation">
      <div class="sidebar-brand">
        <div class="sidebar-brand-mark">A</div>
        <div>
          <div class="sidebar-brand-name">Ansha</div>
          <span class="sidebar-brand-school">Chaman Bharatiya School</span>
        </div>
      </div>
      <div class="sidebar-nav">
        ${NAV_ITEMS.map(([route,label,icon]) => `
          <button class="sidebar-nav-item ${activeRoute === route ? 'is-active' : ''}" data-route="${route}">
            <span class="nav-icon">${icons[icon] || icons.core}</span><span>${label}</span>
          </button>`).join('')}
      </div>
      <div class="sidebar-footer">
        <button class="sidebar-user" data-route="profile">
          <div class="sidebar-user-avatar">${student.initials}</div>
          <div>
            <div class="sidebar-user-name">${student.preferredName}</div>
            <div class="sidebar-user-role">${student.yearGroup} Student</div>
          </div>
        </button>
      </div>
    </nav>`;
}

export function bindSidebarEvents(onNavigate) {
  document.querySelectorAll('[data-route]').forEach((el) => {
    el.addEventListener('click', () => onNavigate(el.dataset.route));
  });
}
