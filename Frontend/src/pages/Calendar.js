import { apiFetch } from "../utils/api.js";

export async function renderCalendar(year, month) {
  const response = await apiFetch('/assignments');
  const assignments = response.data;

  const first = new Date(year, month, 1).getDay();
  const days = new Date(year, month + 1, 0).getDate();

  const cells = [];

  // Monday-start calendar
  const leadingDays = first === 0 ? 6 : first - 1;

  for (let i = 0; i < leadingDays; i++) {
    cells.push('<div class="calendar-cell"></div>');
  }

  for (let d = 1; d <= days; d++) {

    const events = assignments.filter(a => {
      const dueDate = new Date(a.assignmentId?.dueDate);

      return (
        dueDate.getFullYear() === year &&
        dueDate.getMonth() === month &&
        dueDate.getDate() === d
      );
    });

    const today = new Date();

    const isToday =
      d === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear();

    cells.push(`
      <div class="calendar-cell">

        <div class="calendar-day ${isToday ? 'is-today' : ''}">
          ${d}
        </div>

        ${events.map(a => `
          <div class="calendar-event">
            ${a.assignmentId?.classId?.className || 'Assignment'}
            ·
            ${a.assignmentId?.title || ''}
          </div>
        `).join('')}

      </div>
    `);
  }

  return `
    <div class="fade-in">

      <div class="page-header">
        <h1 class="page-title">Calendar</h1>

        <p class="page-subtitle">
          ${new Date(year, month).toLocaleString('en-GB', {
            month: 'long',
            year: 'numeric'
          })}
        </p>
      </div>

      <div class="calendar-grid">
        ${cells.join('')}
      </div>

    </div>
  `;
}

export function bindCalendarEvents() {}