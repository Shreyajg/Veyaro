const DEFAULT_STUDENT = {
  preferredName: 'Shankara',
  fullName: 'Shankara Pranav V',
  initials: 'SP',
  yearGroup: 'DP1',
  programme: 'IB Diploma Programme',
  studentId: '',
  school: 'Chaman Bharatiya School',
};

export const student = { ...DEFAULT_STUDENT };

export function setActiveStudent(nextStudent) {
  Object.assign(student, DEFAULT_STUDENT, nextStudent);
}

export function resetStudent() {
  Object.assign(student, DEFAULT_STUDENT);
}
