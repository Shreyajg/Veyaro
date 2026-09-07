import { apiFetch } from '../utils/api.js';

export async function renderClassDetail(id, tab='Overview') {
  const response = await apiFetch('/classes');
  const classes = response.data;
  const c = classes.find(x => x.classId === id);
  if (!c) return `<div class="empty-state">Class not found.</div>`;
  return `<div class="fade-in">
    <a class="back-link" href="#/classes">← Classes</a>
    <div class="class-hero"><div class="welcome-eyebrow">DP1 · Class space</div><h1 class="page-title">${c.className}</h1><p>${c.teacherId?.fullName} · ${c.room || 'No room allocated'}</p></div>
    <div class="tabs">${['Overview','Assignments','Resources'].map(t => `<button class="tab ${tab===t?'is-active':''}" data-class-tab="${t}">${t}</button>`).join('')}</div>
    <div class="detail-grid">
      <section><div class="welcome-eyebrow">About</div><h2>${c.className}</h2><p style="margin-top:8px;color:var(--color-text-secondary);">${c.description || ''}</p></section>
      <section><div class="welcome-eyebrow">Teacher</div><h2>${c.teacherId?.fullName}</h2><p style="margin-top:8px;color:var(--color-text-secondary);">Room: ${c.room || 'No room allocated'}</p></section>
    </div>
  </div>`;
}
export function bindClassDetailEvents(id, navigate) {
  document.querySelectorAll('[data-class-tab]').forEach(el => el.addEventListener('click', () => navigate(id, el.dataset.classTab)));
}
