import { apiFetch } from "../utils/api.js";

export async function renderAssignments(filter = 'All') {
  const response = await apiFetch('/assignments');
  const assignments = response.data;

  const visible =
    filter === 'All'
      ? assignments
      : assignments.filter(a => a.status === filter);

  return `
    <div class="fade-in">

      <div class="page-header">
        <h1 class="page-title">Assignments</h1>
        <p class="page-subtitle">
          Keep the next thing visible.
        </p>
      </div>

      <div class="filter-bar">
        ${['All', 'pending', 'complete']
          .map(f => `
            <button
              class="filter-chip ${filter === f ? 'is-active' : ''}"
              data-filter="${f}"
            >
              ${f === 'pending'
                ? 'Pending'
                : f === 'complete'
                  ? 'Complete'
                  : 'All'}
            </button>
          `)
          .join('')}
      </div>

      <div class="due-list">

        ${visible.map(a => `
          <div class="due-item">

            <div>
              <div class="due-item-subject">
                ${a.assignmentId?.classId?.className || 'Class'}
              </div>

              <div class="due-item-title">
                ${a.assignmentId?.title || 'Assignment'}
              </div>
            </div>

            <span class="pill ${
              a.status === 'pending'
                ? 'pill-warning'
                : 'pill-success'
            }">
              ${new Date(
                a.assignmentId?.dueDate
              ).toLocaleDateString()}
            </span>

          </div>
        `).join('')}

      </div>

    </div>
  `;
}

export function bindAssignmentsEvents(onFilter) {
  document
    .querySelectorAll('[data-filter]')
    .forEach(el => {
      el.addEventListener('click', () => {
        onFilter(el.dataset.filter);
      });
    });
}