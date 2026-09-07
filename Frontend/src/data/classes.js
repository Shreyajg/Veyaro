const classData = [
  { id:'math-aa-hl', name:'Mathematics AA HL', teacher:'Sandhya K', room:'DP1 classroom', colour:'sky', priority:1, description:'Analysis and Approaches Higher Level mathematics.' },
  { id:'physics-hl', name:'Physics HL', teacher:'Balaji', room:'Physics Lab', colour:'coral', priority:2, description:'DP1 Physics with practical laboratory work.' },
  { id:'chemistry', name:'Chemistry', teacher:'Ramya', room:'Chemistry Lab', colour:'coral', priority:3, description:'DP1 Chemistry.' },
  { id:'business-management', name:'Business Management', teacher:'Sandhya J', room:'DP1 classroom', colour:'coral', priority:4, description:'DP1 Business Management.' },
  { id:'english-hl', name:'English HL', teacher:'Souvik', room:'DP1 classroom', colour:'sage', priority:5, description:'English language and literature at Higher Level.' },
  { id:'spanish', name:'Spanish', teacher:'Medha', room:'DP1 classroom', colour:'sky', priority:6, description:'Spanish language studies.' },
  { id:'language', name:'Language', teacher:'Bertin / Medha / Anita', room:'Language space', colour:'sky', priority:7, description:'Language studies in the DP1 programme.' },
  { id:'tok', name:'TOK', teacher:'Souvik', room:'DP1 classroom', colour:'lilac', priority:8, description:'Theory of Knowledge.' },
  { id:'phe', name:'Physical Education (PHE)', teacher:'—', room:'Sports / PHE space', colour:'sky', priority:9, description:'Physical Education.' },
];

export const classes = [...classData].sort((a, b) => a.priority - b.priority);
