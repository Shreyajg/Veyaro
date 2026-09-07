import { apiFetch } from '../utils/api.js';

export async function renderClasses() {
  const response = await apiFetch('/classes');
  const classes = response.data;

  return `<div class="fade-in">
    <div class="page-header"><h1 class="page-title">Classes</h1><p class="page-subtitle">Your DP1 subjects and learning spaces.</p></div>
    <div class="card" style="padding:8px 18px;">
      ${classes.map(c => `<a class="class-row" href="#/classes/${c.classId}">
        <span class="class-row-dot"></span><div><h2>${c.className}</h2><p>${c.teacherId?.fullName || 'Teacher'} · ${c.room || 'room not assigned'}</p></div>
        <span class="pill pill-accent">${c.color || ''}</span><b>→</b>
      </a>`).join('')}
    </div>
  </div>`;
}
