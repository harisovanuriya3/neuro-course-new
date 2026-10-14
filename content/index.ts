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
import { createModuleThreePretest } from "./course-foundation/module-three-pretest";
import { createModuleThreeObjectives, createModuleThreeSummary } from "./course-foundation/module-three-learning";
import { createModuleThreeClinical } from "./course-foundation/module-three-clinical";
import { createModuleThreePractice } from "./course-foundation/module-three-practice";
import { createModuleThreeTest } from "./course-foundation/module-three-test";
import { createModuleThreeCases } from "./course-foundation/module-three-cases";
import { createModuleThreeQuestions } from "./course-foundation/module-three-questions";
import { createModuleThreeGlossary } from "./course-foundation/module-three-glossary";
import { createModuleThreeMedia } from "./course-foundation/module-three-media";
import { modules } from "./course";
import { getSectionTitle } from "./sections";

function moduleThreeBaseMedia(language: Language) {
  const lesson = foundationLessons[3]?.media?.[language];
  if (!lesson || lesson.kind !== "media") {
    throw new Error("Module 3 base media is missing for " + language);
  }
  return lesson;
}

function moduleThreeBaseGlossary(language: Language) {
  const lesson = foundationLessons[3]?.glossary?.[language];
  if (!lesson || lesson.kind !== "glossary") {
    throw new Error("Module 3 base glossary is missing for " + language);
  }
  return lesson;
}

function moduleThreeBaseTest(language: Language) {
  const lesson = foundationLessons[3]?.tests?.[language];
  if (!lesson || lesson.kind !== "tests") {
    throw new Error("Module 3 base test is missing for " + language);
  }
  return lesson;
}

function moduleThreeBaseCases(language: Language) {
  const lesson = foundationLessons[3]?.cases?.[language];
  if (!lesson || lesson.kind !== "cases") throw new Error("Module 3 base cases missing for " + language);
  return lesson;
}

function moduleThreeBasePractice(language: Language) {
  const lesson = foundationLessons[3]?.practice?.[language];
  if (!lesson || lesson.kind !== "practice") {
    throw new Error("Module 3 base practice is missing for " + language);
  }
  return lesson;
}

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
  3: {
    ...foundationLessons[3],
    media: {
      RU: createModuleThreeMedia("RU", moduleThreeBaseMedia("RU")),
      EN: createModuleThreeMedia("EN", moduleThreeBaseMedia("EN")),
      KZ: createModuleThreeMedia("KZ", moduleThreeBaseMedia("KZ")),
    },
    glossary: {
      RU: createModuleThreeGlossary("RU", moduleThreeBaseGlossary("RU")),
      EN: createModuleThreeGlossary("EN", moduleThreeBaseGlossary("EN")),
      KZ: createModuleThreeGlossary("KZ", moduleThreeBaseGlossary("KZ")),
    },
    clinical: { RU: createModuleThreeClinical("RU"), EN: createModuleThreeClinical("EN"), KZ: createModuleThreeClinical("KZ") },
    questions: {
      RU: createModuleThreeQuestions("RU"),
      EN: createModuleThreeQuestions("EN"),
      KZ: createModuleThreeQuestions("KZ"),
    },
    cases: {
      RU: createModuleThreeCases("RU", moduleThreeBaseCases("RU")),
      EN: createModuleThreeCases("EN", moduleThreeBaseCases("EN")),
      KZ: createModuleThreeCases("KZ", moduleThreeBaseCases("KZ")),
    },
    practice: {
      RU: createModuleThreePractice("RU", moduleThreeBasePractice("RU")),
      EN: createModuleThreePractice("EN", moduleThreeBasePractice("EN")),
      KZ: createModuleThreePractice("KZ", moduleThreeBasePractice("KZ")),
    },
    tests: {
      RU: createModuleThreeTest("RU", moduleThreeBaseTest("RU")),
      EN: createModuleThreeTest("EN", moduleThreeBaseTest("EN")),
      KZ: createModuleThreeTest("KZ", moduleThreeBaseTest("KZ")),
    },
    objectives: {
      RU: createModuleThreeObjectives("RU"),
      EN: createModuleThreeObjectives("EN"),
      KZ: createModuleThreeObjectives("KZ"),
    },
    "one-minute": {
      RU: createModuleThreeSummary("RU"),
      EN: createModuleThreeSummary("EN"),
      KZ: createModuleThreeSummary("KZ"),
    },
    pretest: {
      RU: createModuleThreePretest("RU", `3. ${modules.RU[2]}`, getSectionTitle("pretest", "RU")),
      EN: createModuleThreePretest("EN", `3. ${modules.EN[2]}`, getSectionTitle("pretest", "EN")),
      KZ: createModuleThreePretest("KZ", `3. ${modules.KZ[2]}`, getSectionTitle("pretest", "KZ")),
    },
  },
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
