import { isSection, type Section } from "../content/sections";
import { MODULE_COUNT } from "../content/course";

const key = "neuro-course:course-progress:v1";
export type CourseProgressData = {
  visitedModules: number[];
  visitedSections: Record<string, Section[]>;
  outcomes: Record<string, { correct: number; total: number }>;
};
const empty = (): CourseProgressData => ({ visitedModules: [], visitedSections: {}, outcomes: {} });

export function readCourseProgress(): CourseProgressData {
  try {
    const raw = JSON.parse(localStorage.getItem(key) || "null");
    if (!raw || typeof raw !== "object") return empty();
    const visitedModules = Array.isArray(raw.visitedModules) ? [...new Set<number>(raw.visitedModules.filter((value: unknown) => Number.isInteger(value) && Number(value) >= 1 && Number(value) <= MODULE_COUNT))] : [];
    const visitedSections: CourseProgressData["visitedSections"] = {};
    if (raw.visitedSections && typeof raw.visitedSections === "object") for (const [moduleId, sections] of Object.entries(raw.visitedSections)) {
      if (Number.isInteger(Number(moduleId)) && Number(moduleId) >= 1 && Number(moduleId) <= MODULE_COUNT && Array.isArray(sections)) visitedSections[moduleId] = [...new Set<Section>(sections.filter((value: unknown): value is Section => typeof value === "string" && isSection(value)))];
    }
    const outcomes: CourseProgressData["outcomes"] = {};
    if (raw.outcomes && typeof raw.outcomes === "object") for (const [name, result] of Object.entries(raw.outcomes)) {
      if (result && typeof result === "object" && "correct" in result && "total" in result && Number.isInteger(result.correct) && Number.isInteger(result.total) && Number(result.total) > 0 && Number(result.correct) >= 0 && Number(result.correct) <= Number(result.total)) outcomes[name] = { correct: Number(result.correct), total: Number(result.total) };
    }
    return { visitedModules, visitedSections, outcomes };
  } catch { return empty(); }
}
function write(value: CourseProgressData) { try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* Optional local storage */ } }
export function recordVisit(moduleId: number, section?: Section) {
  const value = readCourseProgress();
  if (!value.visitedModules.includes(moduleId)) value.visitedModules.push(moduleId);
  if (section) value.visitedSections[moduleId] = [...new Set([...(value.visitedSections[moduleId] ?? []), section])];
  write(value);
}
export function recordOutcome(moduleId: number, kind: string, correct: number, total: number) {
  const value = readCourseProgress();
  value.outcomes[`${moduleId}:${kind}`] = { correct, total };
  write(value);
}
