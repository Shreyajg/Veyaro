export const DAY_START = { id:'breakfast', label:'Breakfast', time:'8:15–8:30' };
export const HOMEROOM = { id:'homeroom', label:'Homeroom', time:'8:30–8:40' };
export const LUNCH = { id:'lunch', label:'Lunch', time:'12:25–12:55' };

export const PERIODS = [
  { id:'p1', number:1, time:'8:40–9:25' },
  { id:'p2', number:2, time:'9:25–10:10' },
  { id:'p3', number:3, time:'10:10–10:55' },
  { id:'p4', number:4, time:'10:55–11:40' },
  { id:'p5', number:5, time:'11:40–12:25' },
  { id:'p6', number:6, time:'12:55–1:40' },
  { id:'p7', number:7, time:'1:40–2:25' },
  { id:'p8', number:8, time:'2:25–3:10' },
];

export const WEEKDAYS = ['Monday','Tuesday','Wednesday','Thursday','Friday'];

const block = (id, classId, start, end, tone='lilac') => ({
  id,
  classId,
  start,
  end,
  span: end - start + 1,
  tone,
});

export const weeklySchedule = {
  Monday: [
    block('mon-p1','tok',1,1,'lilac'),
    block('mon-p2','math-aa-hl',2,3,'sky'),
    block('mon-p4','physics-hl',4,5,'coral'),
    block('mon-p6','english-hl',6,6,'sage'),
    block('mon-p7','phe',7,8,'sky'),
  ],
  Tuesday: [
    block('tue-p1','english-hl',1,2,'sage'),
    block('tue-p3','chemistry',3,4,'coral'),
    block('tue-p5','language',5,5,'sky'),
    block('tue-p6','career-counselling',6,6,'sage'),
    block('tue-p7','clubs',7,8,'lilac'),
  ],
  Wednesday: [
    block('wed-p1','english-hl',1,1,'sage'),
    block('wed-p2','math-aa-hl',2,3,'sky'),
    block('wed-p4','business-management',4,5,'coral'),
    block('wed-p6','chemistry',6,7,'coral'),
    block('wed-p8','ee',8,8,'lilac'),
  ],
  Thursday: [
    block('thu-p1','english-hl',1,1,'sage'),
    block('thu-p2','math-aa-hl',2,2,'sky'),
    block('thu-p3','business-management',3,4,'coral'),
    block('thu-p5','physics-hl',5,5,'coral'),
    block('thu-p6','cas',6,6,'lilac'),
    block('thu-p7','spanish',7,8,'sky'),
  ],
  Friday: [
    block('fri-p2','physics-hl',2,3,'coral'),
    block('fri-p4','tok',4,4,'lilac'),
    block('fri-p5','spanish',5,5,'sky'),
    block('fri-p6','math-aa-hl',6,6,'sky'),
    block('fri-p7','chemistry',7,7,'coral'),
    block('fri-p8','business-management',8,8,'sage'),
  ],
};

export const todaySchedule = [];
export const currentPeriodId = null;
