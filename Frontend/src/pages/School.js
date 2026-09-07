import { openModal } from '../components/Modal.js';
import { apiFetch } from '../utils/api.js';

let announcements = [];

export async function renderSchool() {
  const response = await apiFetch('/announcements');
  announcements = response.data;

  return `
    <div class="fade-in">
      <div class="page-header">
        <h1 class="page-title">School</h1>
        <p class="page-subtitle">
          Announcements and school information.
        </p>
      </div>

      <div class="card announcement-list" style="padding:10px;">
        ${announcements.map(a => `
          <button
            class="announcement-item"
            data-school-announcement="${a.announcementId}"
          >
            <span class="announcement-dot"></span>

            <span>
              <div class="announcement-title">
                ${a.title}
              </div>

              <div class="announcement-desc">
                ${a.summary}
              </div>
            </span>
          </button>
        `).join('')}
      </div>
    </div>
  `;
}

export function bindSchoolEvents() {
  document
    .querySelectorAll('[data-school-announcement]')
    .forEach(el => {
      el.addEventListener('click', () => {
        const announcement = announcements.find(
          a => a.announcementId === el.dataset.schoolAnnouncement
        );

        if (announcement) {
          openModal({
            title: announcement.title,
            metaHtml: `
              <span class="pill pill-neutral">
                ${new Date(announcement.createdAt).toLocaleDateString()}
              </span>
            `,
            bodyHtml: `<p>${announcement.body}</p>`
          });
        }
      });
    });
}