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
import { createModuleFourPretest } from "./course-foundation/module-four-pretest";
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

function moduleThreeReferences(language: Language) {
  const base = foundationLessons[3]?.references?.[language];
  if (!base || base.kind !== "references") throw new Error("Module 3 references missing");
  const guide: Record<Language, string> = {
    RU: "Строение нейрона и функции глии: Ganong, гл. 4, с. 80–82. Миелин, перехваты Ранвье и сальтаторное проведение: Guyton & Hall, гл. 5, с. 71–72. Расчёт скорости моторного проведения по двум точкам стимуляции: Ghai, раздел «Motor Nerve Conduction», с. 228–229 (рис. 2-30–2-31). Одна латентность М-ответа не определяет скорость проведения в исследуемом сегменте и сама по себе не устанавливает диагноз.",
    EN: "Neuron structure and glial functions: Ganong, ch. 4, pp. 80–82. Myelin, nodes of Ranvier and saltatory conduction: Guyton & Hall, ch. 5, pp. 71–72. Two-site motor nerve conduction velocity calculation: Ghai, Motor Nerve Conduction section, pp. 228–229 (Figs. 2-30–2-31). A single CMAP onset latency cannot determine segmental conduction velocity or establish a diagnosis by itself.",
    KZ: "Нейронның құрылысы мен глияның қызметтері: Ganong, 4-тарау, 80–82-б. Миелин, Ранвье түйіндері және секірмелі өткізу: Guyton & Hall, 5-тарау, 71–72-б. Екі нүктеден тітіркендіру арқылы қозғалтқыш жүйкенің өткізу жылдамдығын есептеу: Ghai, «Motor Nerve Conduction» бөлімі, 228–229-б. (2-30–2-31-суреттер). Бір ғана М-жауаптың басталу латенттілігі зерттелген сегменттегі өткізу жылдамдығын анықтауға да, өздігінен диагноз қоюға да жеткіліксіз."
  };

  // The linked textbook records are NOT links to licensed full text.
  // The practical-physiology record points to the exact eighth edition,
  // rather than a general library search for the word "physiology".
  const catalogHref = "https://opac.iitrpr.ac.in/cgi-bin/koha/opac-MARCdetail.pl?biblionumber=10003";
  const details: Record<Language, Record<string, string>> = {
    RU: {
      guyton: "Карточка издания 2016 года, не бесплатный полный текст. Для модуля: гл. 5, с. 71–72, миелин и сальтаторное проведение.",
      ganong: "Библиографическая запись 23-го издания, не полный текст. Для модуля: гл. 4, с. 80–82, нейроны, глия и миелин.",
      ghai: "Каталожная запись именно 8-го издания (2013), не полный текст. Для модуля: раздел 2-31, с. 226–229; рисунки 2-30 и 2-31 показывают стимуляцию и М-ответ.",
      cells: "Свободно доступная глава OpenStax о нервной ткани: нейроны, глия и организация миелина.",
      other: "Библиографический ресурс или библиотечный каталог. Ссылка не означает свободный доступ к полному тексту указанной книги.",
    },
    EN: {
      guyton: "Publisher record for the 2016 edition, not free full text. Relevant reading: ch. 5, pp. 71–72, myelin and saltatory conduction.",
      ganong: "Bibliographic record for the 23rd edition, not full text. Relevant reading: ch. 4, pp. 80–82, neurons, glia and myelin.",
      ghai: "Catalog record for the exact eighth edition (2013), not full text. Relevant reading: section 2-31, pp. 226–229; Figures 2-30 and 2-31 show stimulation and the CMAP.",
      cells: "Freely accessible OpenStax chapter on nervous tissue: neurons, glia and myelin organization.",
      other: "Bibliographic resource or library catalog. The link does not imply free access to the cited book's full text.",
    },
    KZ: {
      guyton: "2016 жылғы басылымның баспа карточкасы; толық мәтіні тегін емес. Осы модульге: 5-тарау, 71–72-б., миелин және секірмелі өткізу.",
      ganong: "23-басылымның библиографиялық жазбасы, толық мәтін емес. Осы модульге: 4-тарау, 80–82-б., нейрондар, глия және миелин.",
      ghai: "Нақты 8-басылымның (2013) каталог жазбасы, толық мәтін емес. Осы модульге: 2-31-бөлім, 226–229-б.; 2-30 және 2-31-суреттерде тітіркендіру мен М-жауап көрсетілген.",
      cells: "OpenStax-тың жүйке тіні туралы еркін қолжетімді тарауы: нейрондар, глия және миелиннің құрылысы.",
      other: "Библиографиялық ресурс немесе кітапхана каталогы. Сілтеме кітаптың толық мәтіні тегін қолжетімді дегенді білдірмейді.",
    },
  };
  const sourceKind = (title: string) =>
    title.startsWith("Guyton & Hall") ? "guyton" :
    title.startsWith("Ganong") ? "ganong" :
    title.startsWith("C. L. Ghai") ? "ghai" :
    title.startsWith("OpenStax · Nervous Tissue") ? "cells" : "other";
  return {
    ...base,
    introduction: guide[language],
    sources: base.sources?.map(source => {
      const kind = sourceKind(source.title);
      return {
        ...source,
        ...(kind === "ghai" ? { href: catalogHref } : {}),
        description: details[language][kind],
      };
    }),
  };
}

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
    references: { RU: moduleThreeReferences("RU"), EN: moduleThreeReferences("EN"), KZ: moduleThreeReferences("KZ") },
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
  4: {
    ...foundationLessons[4],
    pretest: {
      RU: createModuleFourPretest("RU", `4. ${modules.RU[3]}`, getSectionTitle("pretest", "RU")),
      EN: createModuleFourPretest("EN", `4. ${modules.EN[3]}`, getSectionTitle("pretest", "EN")),
      KZ: createModuleFourPretest("KZ", `4. ${modules.KZ[3]}`, getSectionTitle("pretest", "KZ")),
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
