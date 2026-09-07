import { apiFetch } from '../utils/api.js';

export async function renderProfile() {
  const response = await apiFetch('/students/profile');
  const student = response.data;

  return `
    <div class="fade-in">
      <div class="profile-identity">
        <div class="profile-avatar">${student.initials}</div>

        <div>
          <div class="welcome-eyebrow">
            ${student.yearGroupId?.yearGroupName || 'Student'} Student
          </div>

          <h1 class="page-title">${student.fullName}</h1>

          <p class="page-subtitle">
            ${student.programmeId?.programmeName || ''}
          </p>
        </div>
      </div>

      <div class="profile-columns">
        <section>
          <div class="welcome-eyebrow">School</div>
          <strong>${student.schoolId?.schoolName || ''}</strong>
        </section>

        <section>
          <div class="welcome-eyebrow">Programme</div>
          <strong>${student.programmeId?.programmeName || ''}</strong>
        </section>

        <section>
          <div class="welcome-eyebrow">Student ID</div>
          <strong>${student.studentId || 'Not assigned'}</strong>
        </section>
      </div>
    </div>
  `;
}