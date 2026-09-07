const svg = (path) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
export const icons = {
  home: svg('<path d="m3 10 9-7 9 7"/><path d="M5 9.5V21h14V9.5"/><path d="M9 21v-6h6v6"/>'),
  classes: svg('<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M8 8h8M8 12h8M8 16h5"/>'),
  assignments: svg('<path d="M7 3h8l3 3v15H7z"/><path d="M15 3v4h4M9 12h6M9 16h5"/>'),
  calendar: svg('<rect x="3" y="5" width="18" height="16" rx="3"/><path d="M7 3v4M17 3v4M3 10h18"/>'),
  core: svg('<circle cx="12" cy="12" r="8"/><path d="M12 8v8M8 12h8"/>'),
  cas: svg('<path d="M12 3v18M3 12h18"/><circle cx="12" cy="12" r="8"/>'),
  ee: svg('<path d="M5 4h14v16H5z"/><path d="M8 8h8M8 12h6M8 16h7"/>'),
  school: svg('<path d="m3 10 9-6 9 6"/><path d="M5 10v9h14v-9M9 19v-5h6v5"/>'),
  profile: svg('<circle cx="12" cy="8" r="3.5"/><path d="M5 21c.8-4 3.1-6 7-6s6.2 2 7 6"/>'),
  search: svg('<circle cx="10.8" cy="10.8" r="6.5"/><path d="m16 16 5 5"/>'),
  arrow: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'),
};
