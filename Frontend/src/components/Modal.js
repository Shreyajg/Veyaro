export function openModal({ title, metaHtml='', bodyHtml='' }) {
  const root = document.getElementById('modal-root');
  root.innerHTML = `
    <div class="modal-backdrop" data-modal-close>
      <section class="modal" role="dialog" aria-modal="true" aria-label="${title}">
        <div class="modal-top">
          <div>
            <h2>${title}</h2>
            <div class="modal-meta">${metaHtml}</div>
          </div>
          <button class="modal-close" type="button" aria-label="Close" data-modal-close>×</button>
        </div>
        <div class="modal-body">${bodyHtml}</div>
      </section>
    </div>`;
  root.querySelectorAll('[data-modal-close]').forEach((el) => {
    el.addEventListener('click', (event) => {
      if (event.target === el || el.classList.contains('modal-close')) root.innerHTML = '';
    });
  });
}
