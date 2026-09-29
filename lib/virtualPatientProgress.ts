export const patientProgressKey = "neuro-course:module-1:virtual-patient:v2";

export type PatientProgress = {
  asked: number[];
  answers: (number | null)[];
  firstTryCorrect: boolean[];
};

export const emptyPatientProgress = (): PatientProgress => ({
  asked: [], answers: [null, null, null], firstTryCorrect: [false, false, false],
});

export function readPatientProgress(): PatientProgress {
  try {
    const value = JSON.parse(localStorage.getItem(patientProgressKey) || "null");
    if (!value || !Array.isArray(value.answers) || !Array.isArray(value.firstTryCorrect)) return emptyPatientProgress();
    return {
      asked: Array.isArray(value.asked) ? [...new Set<number>(value.asked.filter((n: unknown) => Number.isInteger(n) && Number(n) >= 0 && Number(n) < 4))] : [],
      answers: [0, 1, 2].map(i => Number.isInteger(value.answers[i]) && value.answers[i] >= 0 && value.answers[i] <= 2 ? value.answers[i] : null),
      firstTryCorrect: [0, 1, 2].map(i => value.firstTryCorrect[i] === true),
    };
  } catch { return emptyPatientProgress(); }
}

export function savePatientProgress(value: PatientProgress) {
  try { localStorage.setItem(patientProgressKey, JSON.stringify(value)); } catch { /* Storage can be disabled; keep this attempt in memory. */ }
}
