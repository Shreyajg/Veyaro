import { WEEKDAYS, PERIODS, DAY_START, HOMEROOM, LUNCH, weeklySchedule } from '../data/schedule.js';
import { openModal } from '../components/Modal.js';
import { apiFetch } from '../utils/api.js';

function greeting() {
  const h = new Date().getHours();
  return h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
}

function todayName() {
  return new Intl.DateTimeFormat('en-GB', { weekday:'long' }).format(new Date());
}
function isCoveredByPreviousBlock(day, periodNumber) {
  return schedule.some(
    item =>
      item.day === day &&
      item.startPeriod < periodNumber &&
      item.endPeriod >= periodNumber
  );
}

function renderClassCard(item, period) {
  if (!item) {
    return '<div class="timetable-empty" aria-hidden="true"></div>';
  }

  const info = item.classId;

  if (!info) {
    return '<div class="timetable-empty" aria-hidden="true"></div>';
  }

  const time = `${item.startTime}–${item.endTime}`;

  const teacher = info.teacherId?.fullName
    ? `<div class="timetable-teacher">${info.teacherId.fullName}</div>`
    : '';

  const room = info.room
    ? `<div class="timetable-room">${info.room}</div>`
    : '';

  const href = `#/classes/${info.classId}`;

  return `
    <a
      class="timetable-card"
      href="${href}"
      aria-label="Open ${info.className}"
    >
      <div class="timetable-time">${time}</div>

      <div class="timetable-subject">
        ${info.className}
      </div>

      ${teacher}
      ${room}
    </a>
  `;
}
function renderFixedRow(label, time, className='') {
  return `
    <div class="special-row-label ${className}">
      <span class="special-label">${label}</span>
      <span class="special-time">${time}</span>
    </div>
    ${WEEKDAYS.map(day => `
      <div class="special-row-cell ${className}">
        <div class="special-card ${className}">${label}</div>
      </div>`).join('')}`;
}

async function renderWeek() {
  const response = await apiFetch('/timetable');
  const timetable = response.data;
  const schedule = timetable.schedule || [];

  const today = todayName();

  const gridItems = [];

  const headerRow = 1;
  const breakfastRow = 2;
  const homeroomRow = 3;
  const firstPeriodRow = 4;
  const lunchRow = 9;
  const firstAfterLunchRow = 10;

  gridItems.push(
    `<div class="week-corner" style="grid-column:1;grid-row:${headerRow}"></div>`
  );

  WEEKDAYS.forEach((day, index) => {
    gridItems.push(`
      <div
        class="day-header ${day === today ? 'is-today' : ''}"
        style="grid-column:${index + 2};grid-row:${headerRow}"
      >
        <div class="day-name">${day}</div>
      </div>
    `);
  });

  // Breakfast
  gridItems.push(`
    <div
      class="period-label special-period"
      style="grid-column:1;grid-row:${breakfastRow}"
    >
      <span class="period-number">Morning</span>
      <span class="period-time">${DAY_START.time}</span>
    </div>
  `);

  WEEKDAYS.forEach((day, index) => {
    gridItems.push(`
      <div
        class="special-row-cell breakfast-row"
        style="grid-column:${index + 2};grid-row:${breakfastRow}"
      >
        <div class="special-card">Breakfast</div>
      </div>
    `);
  });

  // Homeroom
  gridItems.push(`
    <div
      class="period-label special-period"
      style="grid-column:1;grid-row:${homeroomRow}"
    >
      <span class="period-number">Homeroom</span>
      <span class="period-time">${HOMEROOM.time}</span>
    </div>
  `);

  WEEKDAYS.forEach((day, index) => {
    gridItems.push(`
      <div
        class="special-row-cell homeroom-row"
        style="grid-column:${index + 2};grid-row:${homeroomRow}"
      >
        <div class="special-card">Homeroom</div>
      </div>
    `);
  });

  // Build period information from backend schedule
  const periods = {};

  schedule.forEach(item => {
    if (!periods[item.startPeriod]) {
      periods[item.startPeriod] = {
        startTime: item.startTime,
        endTime: item.endTime
      };
    }

    if (!periods[item.endPeriod]) {
      periods[item.endPeriod] = {
        startTime: item.startTime,
        endTime: item.endTime
      };
    }
  });

  // First 5 periods
  for (let periodNumber = 1; periodNumber <= 5; periodNumber++) {

    const row = firstPeriodRow + periodNumber - 1;

    const period = periods[periodNumber];

    gridItems.push(`
      <div
        class="period-label"
        style="grid-column:1;grid-row:${row}"
      >
        <span class="period-number">P${periodNumber}</span>
        <span class="period-time">
          ${period?.startTime || ''}
          ${period ? `–${period.endTime}` : ''}
        </span>
      </div>
    `);

    WEEKDAYS.forEach((day, index) => {

      const item = schedule.find(
        block =>
          block.day === day &&
          block.startPeriod === periodNumber
      );

      if (item) {
        const span =
          item.endPeriod - item.startPeriod + 1;

        gridItems.push(`
          <div
            class="timetable-cell block-host"
            style="
              grid-column:${index + 2};
              grid-row:${row} / span ${span}
            "
          >
            ${renderClassCard(item, period)}
          </div>
        `);
      } else {
        gridItems.push(`
          <div
            class="timetable-cell"
            style="
              grid-column:${index + 2};
              grid-row:${row}
            "
          >
            <div class="timetable-empty" aria-hidden="true"></div>
          </div>
        `);
      }
    });
  }

  // Lunch
  gridItems.push(`
    <div
      class="period-label lunch-label"
      style="grid-column:1;grid-row:${lunchRow}"
    >
      <span class="period-number">Break</span>
      <span class="period-time">${LUNCH.time}</span>
    </div>
  `);

  WEEKDAYS.forEach((day, index) => {
    gridItems.push(`
      <div
        class="special-row-cell lunch-row"
        style="grid-column:${index + 2};grid-row:${lunchRow}"
      >
        <div class="special-card">Lunch</div>
      </div>
    `);
  });

  // Periods 6–8
  for (let periodNumber = 6; periodNumber <= 8; periodNumber++) {

    const row =
      firstAfterLunchRow + (periodNumber - 6);

    const period = periods[periodNumber];

    gridItems.push(`
      <div
        class="period-label"
        style="grid-column:1;grid-row:${row}"
      >
        <span class="period-number">P${periodNumber}</span>
        <span class="period-time">
          ${period?.startTime || ''}
          ${period ? `–${period.endTime}` : ''}
        </span>
      </div>
    `);

    WEEKDAYS.forEach((day, index) => {

      const item = schedule.find(
        block =>
          block.day === day &&
          block.startPeriod === periodNumber
      );

      if (item) {
        const span =
          item.endPeriod - item.startPeriod + 1;

        gridItems.push(`
          <div
            class="timetable-cell block-host"
            style="
              grid-column:${index + 2};
              grid-row:${row} / span ${span}
            "
          >
            ${renderClassCard(item, period)}
          </div>
        `);
      } else {
        gridItems.push(`
          <div
            class="timetable-cell"
            style="
              grid-column:${index + 2};
              grid-row:${row}
            "
          >
            <div class="timetable-empty" aria-hidden="true"></div>
          </div>
        `);
      }
    });
  }

  return `
    <div class="week-wrap">
      <div class="week-grid">
        ${gridItems.join('')}
      </div>
    </div>
  `;
}

async function renderDue() {
  const response = await apiFetch('/assignments');
  const assignments=response.data;
  const items = assignments.filter(a => a.status === 'pending').slice(0,3);
  if (!items.length) {
    return '<div class="empty-inline"><strong>Nothing urgent.</strong><span>You are clear for now.</span></div>';
  }
  return items.map(a => `
    <a class="due-item" href="#/assignments">
      <div><div class="due-item-subject">${a.assignmentId?.classId?.className}</div><div class="due-item-title">${a.assignmentId?.title}</div></div>
      <span class="pill pill-warning">${new Date(
                a.assignmentId?.dueDate
              ).toLocaleDateString()}</span>
    </a>`).join('');
}

async function renderAnnouncements() {
  const response = await apiFetch('/announcements');
  const announcements= response.data;
  return announcements.slice(0,3).map(a => `
    <button class="announcement-item" data-announcement-id="${a.announcementId}">
      <span class="announcement-dot"></span>
      <span><div class="announcement-title">${a.title}</div><div class="announcement-desc">${a.summary}</div></span>
    </button>`).join('');
}

export async function renderHome() {
  const response = await apiFetch('/students/profile');
  const student = response.data;
  return `
    <div class="fade-in home-page">
      <header class="welcome-header">
        <div class="welcome-eyebrow">${student.programmeId?.programmeName} · ${student.yearGroupId?.yearGroupName}</div>
        <h1 class="welcome-title">${greeting()}, <span>${student.preferredName}</span>.</h1>
        <p class="welcome-subtitle">Your week, laid out clearly.</p>
      </header>

      <section class="section timetable-section">
        <div class="week-toolbar">
          <div>
            <div class="week-label">Your week</div>
            <div class="week-meta">DP1 timetable · Monday to Friday</div>
          </div>
          <div class="week-switcher">
            <button type="button" aria-label="Previous week">‹</button>
            <button type="button" aria-label="Next week">›</button>
          </div>
        </div>
        ${await renderWeek()}
      </section>

      <div class="home-lower">
        <section class="card home-panel">
          <div class="panel-heading"><h2>Quick access</h2><a href="#/classes">All classes →</a></div>
          <div class="quick-grid">
            <a class="quick-link" href="#/classes"><div class="quick-icon">⌁</div><strong>Classes</strong><span>Subjects & resources</span></a>
            <a class="quick-link" href="#/assignments"><div class="quick-icon">✓</div><strong>Assignments</strong><span>What's due next</span></a>
            <a class="quick-link" href="#/calendar"><div class="quick-icon">◷</div><strong>Calendar</strong><span>Upcoming dates</span></a>
            <a class="quick-link" href="#/ib-core"><div class="quick-icon">+</div><strong>IB Core</strong><span>TOK · EE · CAS</span></a>
          </div>
        </section>

        <section class="card home-panel">
          <div class="panel-heading"><h2>Due soon</h2><a href="#/assignments">View all →</a></div>
          <div class="next-list">${await renderDue()}</div>
        </section>
      </div>

      <section class="section" style="margin-top:28px;">
        <div class="section-header"><h2 class="section-title">School updates</h2><a class="section-link" href="#/school">View all</a></div>
        <div class="card announcement-list" style="padding:8px;">${await renderAnnouncements()}</div>
      </section>
    </div>`;
}

export function bindHomeEvents() {
  document.querySelectorAll('[data-announcement-id]').forEach(el => {
    el.addEventListener('click', () => {
      const item = announcements.find(a => a.id === el.dataset.announcementId);
      if (item) openModal({
        title:item.title,
        metaHtml:`<span class="pill pill-neutral">${item.date}</span>`,
        bodyHtml:`<p>${item.body}</p>`
      });
    });
  });
}
