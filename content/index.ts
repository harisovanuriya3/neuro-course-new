import type { Language, LocalizedLesson, Section } from "./types";
import RU from "./modules/1/theory/ru";
import KZ from "./modules/1/theory/kz";
import EN from "./modules/1/theory/en";
import practiceRU from "./modules/1/practice/ru";
import practiceKZ from "./modules/1/practice/kz";
import practiceEN from "./modules/1/practice/en";
import casesRU from "./modules/1/cases/ru";
import casesKZ from "./modules/1/cases/kz";
import casesEN from "./modules/1/cases/en";
import testsRU from "./modules/1/tests/ru";
import testsKZ from "./modules/1/tests/kz";
import testsEN from "./modules/1/tests/en";
import { validateTest } from "../lib/tests/engine";
import { createStudyLessons } from "./modules/1/study";
import { createInteractiveLesson } from "./modules/1/interactive";
import { createMediaLesson } from "./modules/1/media";
import { foundationLessons } from "./course-foundation";

const studyRU = createStudyLessons("RU");
const studyKZ = createStudyLessons("KZ");
const studyEN = createStudyLessons("EN");
const studyLessons = Object.fromEntries(
  (Object.keys(studyRU) as (keyof typeof studyRU)[]).map(section => [section, {
    RU: studyRU[section], KZ: studyKZ[section], EN: studyEN[section],
  }])
);

[testsRU, testsKZ, testsEN].forEach(validateTest);

// Register each new module/section here; routes and rendering stay unchanged.
const lessons: Partial<Record<number, Partial<Record<Section, LocalizedLesson>>>> = {
  ...foundationLessons,
  1: {
    ...studyLessons,
    media: { RU: createMediaLesson("RU"), EN: createMediaLesson("EN"), KZ: createMediaLesson("KZ") },
    interactive: { RU: createInteractiveLesson("RU"), EN: createInteractiveLesson("EN"), KZ: createInteractiveLesson("KZ") },
    theory: {
      RU: { ...RU, kind: "theory" },
      KZ: { ...KZ, kind: "theory" },
      EN: { ...EN, kind: "theory" },
    },
    practice: { RU: practiceRU, KZ: practiceKZ, EN: practiceEN },
    cases: { RU: casesRU, KZ: casesKZ, EN: casesEN },
    tests: { RU: testsRU, KZ: testsKZ, EN: testsEN },
  },
};

export function getLesson(moduleId: number, section: Section, language: Language) {
  return lessons[moduleId]?.[section]?.[language];
}
