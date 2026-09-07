const coreData = {
  TOK: { lead:'Souvik', desc:'Theory of Knowledge', status:'In progress' },
  EE: { lead:'Souvik Dutta', desc:'Extended Essay', status:'Not started' },
  CAS: { lead:'Paulomi Sengupta', desc:'Creativity, Activity, Service', status:'In progress' },
};

export function renderIBCore(focus = null) {
  const items = focus && coreData[focus] ? [[focus, coreData[focus]]] : Object.entries(coreData);
  const title = focus && coreData[focus] ? focus : 'IB Core';
  const subtitle = focus && coreData[focus] ? coreData[focus].desc : 'The three pieces that sit across your DP1 experience.';

  return `<div class="fade-in">
    <div class="page-header"><h1 class="page-title">${title}</h1><p class="page-subtitle">${subtitle}</p></div>
    <div class="core-list">
      ${items.map(([name, item]) => `<article class="core-item">
        <div><h2>${name}</h2><p>${item.desc}</p></div>
        <dl><div><dt>Lead</dt><dd>${item.lead}</dd></div><div><dt>Status</dt><dd>${item.status}</dd></div><div><dt>Space</dt><dd>Open</dd></div></dl>
      </article>`).join('')}
    </div>
  </div>`;
}
