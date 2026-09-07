export function renderAdmin() {
  return `
    <div class="fade-in admin-page">
      <header class="page-header">
        <div class="welcome-eyebrow">Administration</div>
        <h1 class="page-title">School control centre.</h1>
        <p class="page-subtitle">Manage students, staff, classes and school information from one place.</p>
      </header>

      <section class="admin-stat-grid">
        <article class="card admin-stat"><span>Students</span><strong>260</strong><small>Ready for import</small></article>
        <article class="card admin-stat"><span>Staff</span><strong>100</strong><small>Teachers & staff</small></article>
        <article class="card admin-stat"><span>Classes</span><strong>9</strong><small>Current DP1 subjects</small></article>
      </section>

      <section class="admin-actions">
        <button class="admin-action card" type="button"><span class="admin-action-icon">+</span><strong>Add student</strong><small>Create a student with minimal information.</small></button>
        <button class="admin-action card" type="button"><span class="admin-action-icon">↑</span><strong>Import students</strong><small>Upload a simple spreadsheet when you're ready.</small></button>
        <button class="admin-action card" type="button"><span class="admin-action-icon">+</span><strong>Add staff</strong><small>Create teacher and staff accounts.</small></button>
      </section>

      <section class="card admin-note">
        <div class="welcome-eyebrow">Next build</div>
        <h2>Fast student creation</h2>
        <p>The next admin feature will let you enter only a student's name and class. Ansha will generate the student ID and school identity automatically.</p>
      </section>
    </div>`;
}
