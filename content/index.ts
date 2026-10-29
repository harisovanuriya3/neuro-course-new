import { createModuleFifteenClinical } from "./course-foundation/module-fifteen-clinical";
import { createModuleFourteenPractice } from "./course-foundation/module-fourteen-practice";
import { createModuleFourteenClinical } from "./course-foundation/module-fourteen-clinical";
import { createModuleFourteenReferences } from "./course-foundation/module-fourteen-references";
import { createModuleThirteenReferences } from "./course-foundation/module-thirteen-references";
import { createModuleTwelveReferences } from "./course-foundation/module-twelve-references";
import { createModuleTwelveMedia } from "./course-foundation/module-twelve-media";
import { createModuleTwelveClinical } from "./course-foundation/module-twelve-clinical";
import { createModuleTwelvePractice } from "./course-foundation/module-twelve-practice";
import { createModuleElevenMedia } from "./course-foundation/module-eleven-media";
import { createModuleElevenClinical } from "./course-foundation/module-eleven-clinical";
import { createModuleElevenObjectives } from "./course-foundation/module-eleven-objectives";
import { createModuleTwelveObjectives } from "./course-foundation/module-twelve-objectives";
import { createModuleThirteenObjectives } from "./course-foundation/module-thirteen-objectives";
import { createModuleFourteenObjectives } from "./course-foundation/module-fourteen-objectives";
import { createModuleFifteenObjectives } from "./course-foundation/module-fifteen-objectives";
import { createModuleFifteenPretest } from "./course-foundation/module-fifteen-pretest";
import { createModuleFifteenTheory } from "./course-foundation/module-fifteen-theory";
import { createModuleFifteenSummary } from "./course-foundation/module-fifteen-summary";
import { createModuleFourteenPretest } from "./course-foundation/module-fourteen-pretest";
import { createModuleFourteenTheory } from "./course-foundation/module-fourteen-theory";
import { createModuleFourteenSummary } from "./course-foundation/module-fourteen-summary";
import { createModuleThirteenTheory } from "./course-foundation/module-thirteen-theory";
import { createModuleThirteenSummary } from "./course-foundation/module-thirteen-summary";
import { createModuleThirteenClinical } from "./course-foundation/module-thirteen-clinical";
import { createModuleThirteenPractice } from "./course-foundation/module-thirteen-practice";
import { createModuleThirteenMedia } from "./course-foundation/module-thirteen-media";
import { createModuleFourteenMedia } from "./course-foundation/module-fourteen-media";
import { createModuleThirteenGlossary } from "./course-foundation/module-thirteen-glossary";
import { createModuleFourteenGlossary } from "./course-foundation/module-fourteen-glossary";
import { createModuleThirteenPretest } from "./course-foundation/module-thirteen-pretest";
import { createModuleTwelvePretest } from "./course-foundation/module-twelve-pretest";
import { createModuleTwelveTheory } from "./course-foundation/module-twelve-theory";
import { createModuleTwelveSummary } from "./course-foundation/module-twelve-summary";
import { createModuleElevenPretest } from "./course-foundation/module-eleven-pretest";
import { createModuleElevenTheory } from "./course-foundation/module-eleven-theory";
import { createModuleElevenSummary } from "./course-foundation/module-eleven-summary";
import { createModuleEightReferences } from "./course-foundation/module-eight-references";
import { createModuleNineReferences } from "./course-foundation/module-nine-references";
import { createModuleEightGlossary } from "./course-foundation/module-eight-glossary";
import { createModuleEightQuestions } from "./course-foundation/module-eight-questions";
import { createModuleNineQuestions } from "./course-foundation/module-nine-questions";
import { createModuleTenQuestions } from "./course-foundation/module-ten-questions";
import { createModuleElevenQuestions } from "./course-foundation/module-eleven-questions";
import { createModuleNineGlossary } from "./course-foundation/module-nine-glossary";
import { createModuleEightMedia } from "./course-foundation/module-eight-media";
import { createModuleNineMedia } from "./course-foundation/module-nine-media";
import { createModuleTenMedia } from "./course-foundation/module-ten-media";
import { createModuleTenGlossary } from "./course-foundation/module-ten-glossary";
import { createModuleElevenGlossary } from "./course-foundation/module-eleven-glossary";
import { createModuleTwelveGlossary } from "./course-foundation/module-twelve-glossary";
import { createModuleTenReferences } from "./course-foundation/module-ten-references";
import { createModuleElevenReferences } from "./course-foundation/module-eleven-references";
import { createModuleSevenReferences } from "./course-foundation/module-seven-references";
import type { Language, LocalizedLesson, Section, Lesson, PracticeLesson } from "./types";
import type { CasesLesson } from "./cases";
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
import { createModuleFourTest } from "./course-foundation/module-four-test";
import { createModuleFourTheory } from "./course-foundation/module-four-theory";
import { createModuleFourPractice } from "./course-foundation/module-four-practice";
import { createModuleFourObjectives, createModuleFourSummary } from "./course-foundation/module-four-summary";
import { createModuleFourClinical } from "./course-foundation/module-four-clinical";
import { createModuleFourCases } from "./course-foundation/module-four-cases";
import { createModuleFourQuestions } from "./course-foundation/module-four-questions";
import { createModuleFourMedia } from "./course-foundation/module-four-media";
import { createModuleFourGlossary } from "./course-foundation/module-four-glossary";
import { createModuleFourReferences } from "./course-foundation/module-four-references";
import { createModuleFiveTheory } from "./course-foundation/module-five-theory";
import { createModuleFiveObjectives } from "./course-foundation/module-five-learning";
import { createModuleFiveClinical } from "./course-foundation/module-five-clinical";
import { createModuleFivePractice } from "./course-foundation/module-five-practice";
import { createModuleFiveCases } from "./course-foundation/module-five-cases";
import { createModuleFivePretest } from "./course-foundation/module-five-pretest";
import { createModuleSixPretest } from "./course-foundation/module-six-pretest";
import { createModuleSixTheory } from "./course-foundation/module-six-theory";
import { createModuleSixSummary } from "./course-foundation/module-six-summary";
import { createModuleSixObjectives } from "./course-foundation/module-six-objectives";
import { createModuleSevenObjectives } from "./course-foundation/module-seven-objectives";
import { createModuleEightObjectives } from "./course-foundation/module-eight-objectives";
import { createModuleNineObjectives } from "./course-foundation/module-nine-objectives";
import { createModuleTenObjectives } from "./course-foundation/module-ten-objectives";
import { createModuleTenPretest } from "./course-foundation/module-ten-pretest";
import { createModuleTenTheory } from "./course-foundation/module-ten-theory";
import { createModuleTenSummary } from "./course-foundation/module-ten-summary";
import { createModuleTenClinical } from "./course-foundation/module-ten-clinical";
import { createModuleTenPractice } from "./course-foundation/module-ten-practice";
import { createModuleElevenPractice } from "./course-foundation/module-eleven-practice";
import { createModuleNinePretest } from "./course-foundation/module-nine-pretest";
import { createModuleNineTheory } from "./course-foundation/module-nine-theory";
import { createModuleNineSummary } from "./course-foundation/module-nine-summary";
import { createModuleNineClinical } from "./course-foundation/module-nine-clinical";
import { createModuleNinePractice } from "./course-foundation/module-nine-practice";
import { createModuleEightPretest } from "./course-foundation/module-eight-pretest";
import { createModuleEightTheory } from "./course-foundation/module-eight-theory";
import { createModuleEightSummary } from "./course-foundation/module-eight-summary";
import { createModuleEightClinical } from "./course-foundation/module-eight-clinical";
import { createModuleEightPractice } from "./course-foundation/module-eight-practice";
import { createModuleSevenTheory } from "./course-foundation/module-seven-theory";
import { createModuleSevenSummary } from "./course-foundation/module-seven-summary";
import { createModuleSevenClinical } from "./course-foundation/module-seven-clinical";
import { createModuleSevenPractice } from "./course-foundation/module-seven-practice";
import { createModuleSevenCases } from "./course-foundation/module-seven-cases";
import { createModuleSevenTests } from "./course-foundation/module-seven-tests";
import { createModuleSevenPretest } from "./course-foundation/module-seven-pretest";
import { createModuleSevenQuestions } from "./course-foundation/module-seven-questions";
import { createModuleSevenMedia } from "./course-foundation/module-seven-media";
import { createModuleSevenGlossary } from "./course-foundation/module-seven-glossary";
import { createModuleSixClinical } from "./course-foundation/module-six-clinical";
import { createModuleSixPractice } from "./course-foundation/module-six-practice";
import { createModuleSixCases } from "./course-foundation/module-six-cases";
import { createModuleSixQuestions } from "./course-foundation/module-six-questions";
import { createModuleSixGlossary } from "./course-foundation/module-six-glossary";
import { createModuleSixTests } from "./course-foundation/module-six-tests";
import { createModuleSixMedia } from "./course-foundation/module-six-media";
import { createModuleSixReferences } from "./course-foundation/module-six-references";
import { createModuleFiveQuestions } from "./course-foundation/module-five-questions";
import { createModuleFiveSummary } from "./course-foundation/module-five-summary";
import { createModuleFiveGlossary } from "./course-foundation/module-five-glossary";
import { createModuleFiveTest } from "./course-foundation/module-five-test";
import { createModuleFiveMedia } from "./course-foundation/module-five-media";
import { createModuleFiveReferences } from "./course-foundation/module-five-references";
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
      ghai: "Каталожная запись именно 8-го издания (2013), не полный текст. Для модуля: раздел «Motor Nerve Conduction», с. 226–229; рисунки 2-30 и 2-31 показывают стимуляцию и М-ответ.",
      cells: "Свободно доступная глава OpenStax о нервной ткани: нейроны, глия и организация миелина.",
      other: "Библиографический ресурс или библиотечный каталог. Ссылка не означает свободный доступ к полному тексту указанной книги.",
    },
    EN: {
      guyton: "Publisher record for the 2016 edition, not free full text. Relevant reading: ch. 5, pp. 71–72, myelin and saltatory conduction.",
      ganong: "Bibliographic record for the 23rd edition, not full text. Relevant reading: ch. 4, pp. 80–82, neurons, glia and myelin.",
      ghai: "Catalog record for the exact eighth edition (2013), not full text. Relevant reading: the Motor Nerve Conduction section, pp. 226–229; Figures 2-30 and 2-31 show stimulation and the CMAP.",
      cells: "Freely accessible OpenStax chapter on nervous tissue: neurons, glia and myelin organization.",
      other: "Bibliographic resource or library catalog. The link does not imply free access to the cited book's full text.",
    },
    KZ: {
      guyton: "2016 жылғы басылымның баспа карточкасы; толық мәтіні тегін емес. Осы модульге: 5-тарау, 71–72-б., миелин және секірмелі өткізу.",
      ganong: "23-басылымның библиографиялық жазбасы, толық мәтін емес. Осы модульге: 4-тарау, 80–82-б., нейрондар, глия және миелин.",
      ghai: "Нақты 8-басылымның (2013) каталог жазбасы, толық мәтін емес. Осы модульге: «Motor Nerve Conduction» бөлімі, 226–229-б.; 2-30 және 2-31-суреттерде тітіркендіру мен М-жауап көрсетілген.",
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

function moduleFiveBaseReferences(language: Language) {
  const lesson = foundationLessons[5]?.references?.[language];
  if (!lesson || lesson.kind !== "references") {
    throw new Error("Module 5 base references are missing for " + language);
  }
  return lesson;
}

function moduleFiveBaseMedia(language: Language) {
  const lesson = foundationLessons[5]?.media?.[language];
  if (!lesson || lesson.kind !== "media") {
    throw new Error("Module 5 base media is missing for " + language);
  }
  return lesson;
}

function moduleFiveBaseTest(language: Language) {
  const lesson = foundationLessons[5]?.tests?.[language];
  if (!lesson || lesson.kind !== "tests") {
    throw new Error("Module 5 base test is missing for " + language);
  }
  return lesson;
}

function moduleSixBaseReferences(language: Language) {
  const lesson = foundationLessons[6]?.references?.[language];
  if (!lesson || lesson.kind !== "references") throw new Error("Module 6 base references missing for " + language);
  return lesson;
}

function moduleSixBaseMedia(language: Language) {
  const lesson = foundationLessons[6]?.media?.[language];
  if (!lesson || lesson.kind !== "media") {
    throw new Error("Module 6 base media is missing for " + language);
  }
  return lesson;
}

function moduleSixBaseTest(language: Language) {
  const lesson = foundationLessons[6]?.tests?.[language];
  if (!lesson || lesson.kind !== "tests") throw new Error("Module 6 base test missing for " + language);
  return lesson;
}
function moduleSixBaseGlossary(language: Language) {
  const lesson = foundationLessons[6]?.glossary?.[language];
  if (!lesson || lesson.kind !== "glossary") throw new Error("Module 6 base glossary missing for " + language);
  return lesson;
}
function moduleSixBaseCases(language: Language) {
  const lesson = foundationLessons[6]?.cases?.[language];
  if (!lesson || lesson.kind !== "cases") throw new Error("Module 6 base cases missing for " + language);
  return lesson;
}
function moduleSixBasePractice(language: Language) {
  const lesson = foundationLessons[6]?.practice?.[language];
  if (!lesson || lesson.kind !== "practice") throw new Error("Module 6 base practice missing for " + language);
  return lesson;
}
function moduleSixBaseTheory(language: Language) {
  const lesson = foundationLessons[6]?.theory?.[language];
  if (!lesson || lesson.kind !== "theory") throw new Error("Module 6 base theory missing for " + language);
  return lesson;
}
function moduleFiveBaseTheory(language: Language) {
  const lesson = foundationLessons[5]?.theory?.[language];
  if (!lesson || lesson.kind !== "theory") throw new Error("Module 5 base theory missing for " + language);
  return lesson;
}
function moduleFiveBasePractice(language: Language) {
  const lesson = foundationLessons[5]?.practice?.[language];
  if (!lesson || lesson.kind !== "practice") throw new Error("Module 5 base practice missing for " + language);
  return lesson;
}
function moduleFiveBaseCases(language: Language) {
  const lesson = foundationLessons[5]?.cases?.[language];
  if (!lesson || lesson.kind !== "cases") throw new Error("Module 5 base cases missing for " + language);
  return lesson;
}

function moduleFourBaseReferences(language: Language) { const lesson = foundationLessons[4]?.references?.[language]; if (!lesson || lesson.kind !== "references") throw new Error("Module 4 base references missing"); return lesson; }
function moduleFourBaseGlossary(language: Language) {
  const lesson = foundationLessons[4]?.glossary?.[language];
  if (!lesson || lesson.kind !== "glossary") throw new Error("Module 4 base glossary missing for " + language);
  return lesson;
}

function moduleFourBaseMedia(language: Language) {
  const lesson = foundationLessons[4]?.media?.[language];
  if (!lesson || lesson.kind !== "media") throw new Error("Module 4 base media missing");
  return lesson;
}
function moduleFourBaseTest(language: Language) {
  const lesson = foundationLessons[4]?.tests?.[language];
  if (!lesson || lesson.kind !== "tests") throw new Error("Module 4 base test missing");
  return lesson;
}

function moduleFourBaseCases(language: Language) {
  const lesson = foundationLessons[4]?.cases?.[language];
  if (!lesson || lesson.kind !== "cases") throw new Error("Module 4 base cases missing");
  return lesson;
}

function moduleFourBaseTheory(language: Language) {
  const lesson = foundationLessons[4]?.theory?.[language];
  if (!lesson || lesson.kind !== "theory") throw new Error("Module 4 base theory missing");
  return lesson;
}
function moduleFourBasePractice(language: Language) {
  const lesson = foundationLessons[4]?.practice?.[language];
  if (!lesson || lesson.kind !== "practice") throw new Error("Module 4 base practice missing");
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
  15: {
    ...foundationLessons[15],
    clinical: {
      RU: createModuleFifteenClinical("RU"),
      EN: createModuleFifteenClinical("EN"),
      KZ: createModuleFifteenClinical("KZ"),
    },
    "one-minute": {
      RU: createModuleFifteenSummary("RU"),
      EN: createModuleFifteenSummary("EN"),
      KZ: createModuleFifteenSummary("KZ"),
    },
    theory: {
      RU: createModuleFifteenTheory("RU", foundationLessons[15].theory.RU as Lesson & { kind: "theory" }),
      EN: createModuleFifteenTheory("EN", foundationLessons[15].theory.EN as Lesson & { kind: "theory" }),
      KZ: createModuleFifteenTheory("KZ", foundationLessons[15].theory.KZ as Lesson & { kind: "theory" }),
    },
    pretest: {
      RU: createModuleFifteenPretest("RU", modules.RU[14], getSectionTitle("pretest", "RU")),
      EN: createModuleFifteenPretest("EN", modules.EN[14], getSectionTitle("pretest", "EN")),
      KZ: createModuleFifteenPretest("KZ", modules.KZ[14], getSectionTitle("pretest", "KZ")),
    },
    objectives: {
      RU: createModuleFifteenObjectives("RU"),
      EN: createModuleFifteenObjectives("EN"),
      KZ: createModuleFifteenObjectives("KZ"),
    },
  },
  14: {
    ...foundationLessons[14],
    references: {
      RU: createModuleFourteenReferences("RU", foundationLessons[14].references.RU as import("./study").ReadingLesson),
      EN: createModuleFourteenReferences("EN", foundationLessons[14].references.EN as import("./study").ReadingLesson),
      KZ: createModuleFourteenReferences("KZ", foundationLessons[14].references.KZ as import("./study").ReadingLesson),
    },
    glossary: {
      RU: createModuleFourteenGlossary("RU", foundationLessons[14].glossary.RU as import("./study").GlossaryLesson),
      EN: createModuleFourteenGlossary("EN", foundationLessons[14].glossary.EN as import("./study").GlossaryLesson),
      KZ: createModuleFourteenGlossary("KZ", foundationLessons[14].glossary.KZ as import("./study").GlossaryLesson),
    },
    media: {
      RU: createModuleFourteenMedia("RU", foundationLessons[14].media.RU as import("./media").MediaLesson),
      EN: createModuleFourteenMedia("EN", foundationLessons[14].media.EN as import("./media").MediaLesson),
      KZ: createModuleFourteenMedia("KZ", foundationLessons[14].media.KZ as import("./media").MediaLesson),
    },
    practice: {
      RU: createModuleFourteenPractice("RU", foundationLessons[14].practice.RU as PracticeLesson),
      EN: createModuleFourteenPractice("EN", foundationLessons[14].practice.EN as PracticeLesson),
      KZ: createModuleFourteenPractice("KZ", foundationLessons[14].practice.KZ as PracticeLesson),
    },
    clinical: {
      RU: createModuleFourteenClinical("RU"),
      EN: createModuleFourteenClinical("EN"),
      KZ: createModuleFourteenClinical("KZ"),
    },
    "one-minute": {
      RU: createModuleFourteenSummary("RU"),
      EN: createModuleFourteenSummary("EN"),
      KZ: createModuleFourteenSummary("KZ"),
    },
    theory: {
      RU: createModuleFourteenTheory("RU", foundationLessons[14].theory.RU as Lesson & { kind: "theory" }),
      EN: createModuleFourteenTheory("EN", foundationLessons[14].theory.EN as Lesson & { kind: "theory" }),
      KZ: createModuleFourteenTheory("KZ", foundationLessons[14].theory.KZ as Lesson & { kind: "theory" }),
    },
    pretest: {
      RU: createModuleFourteenPretest("RU", modules.RU[13], getSectionTitle("pretest", "RU")),
      EN: createModuleFourteenPretest("EN", modules.EN[13], getSectionTitle("pretest", "EN")),
      KZ: createModuleFourteenPretest("KZ", modules.KZ[13], getSectionTitle("pretest", "KZ")),
    },
    objectives: {
      RU: createModuleFourteenObjectives("RU"),
      EN: createModuleFourteenObjectives("EN"),
      KZ: createModuleFourteenObjectives("KZ"),
    },
  },
  13: {
    ...foundationLessons[13],
    references: {
      RU: createModuleThirteenReferences("RU", foundationLessons[13].references.RU as import("./study").ReadingLesson),
      EN: createModuleThirteenReferences("EN", foundationLessons[13].references.EN as import("./study").ReadingLesson),
      KZ: createModuleThirteenReferences("KZ", foundationLessons[13].references.KZ as import("./study").ReadingLesson),
    },
    glossary: {
      RU: createModuleThirteenGlossary("RU", foundationLessons[13].glossary.RU as import("./study").GlossaryLesson),
      EN: createModuleThirteenGlossary("EN", foundationLessons[13].glossary.EN as import("./study").GlossaryLesson),
      KZ: createModuleThirteenGlossary("KZ", foundationLessons[13].glossary.KZ as import("./study").GlossaryLesson),
    },
    media: {
      RU: createModuleThirteenMedia("RU", foundationLessons[13].media.RU as import("./media").MediaLesson),
      EN: createModuleThirteenMedia("EN", foundationLessons[13].media.EN as import("./media").MediaLesson),
      KZ: createModuleThirteenMedia("KZ", foundationLessons[13].media.KZ as import("./media").MediaLesson),
    },
    objectives: {
      RU: createModuleThirteenObjectives("RU"),
      EN: createModuleThirteenObjectives("EN"),
      KZ: createModuleThirteenObjectives("KZ"),
    },
    pretest: {
      RU: createModuleThirteenPretest("RU", modules.RU[12], getSectionTitle("pretest", "RU")),
      EN: createModuleThirteenPretest("EN", modules.EN[12], getSectionTitle("pretest", "EN")),
      KZ: createModuleThirteenPretest("KZ", modules.KZ[12], getSectionTitle("pretest", "KZ")),
    },
    theory: {
      RU: createModuleThirteenTheory("RU", foundationLessons[13].theory.RU as Lesson & { kind: "theory" }),
      EN: createModuleThirteenTheory("EN", foundationLessons[13].theory.EN as Lesson & { kind: "theory" }),
      KZ: createModuleThirteenTheory("KZ", foundationLessons[13].theory.KZ as Lesson & { kind: "theory" }),
    },
    "one-minute": {
      RU: createModuleThirteenSummary("RU"),
      EN: createModuleThirteenSummary("EN"),
      KZ: createModuleThirteenSummary("KZ"),
    },
    clinical: {
      RU: createModuleThirteenClinical("RU"),
      EN: createModuleThirteenClinical("EN"),
      KZ: createModuleThirteenClinical("KZ"),
    },
    practice: {
      RU: createModuleThirteenPractice("RU", foundationLessons[13].practice.RU as PracticeLesson),
      EN: createModuleThirteenPractice("EN", foundationLessons[13].practice.EN as PracticeLesson),
      KZ: createModuleThirteenPractice("KZ", foundationLessons[13].practice.KZ as PracticeLesson),
    },
  },
  12: {
    ...foundationLessons[12],
    references: {
      RU: createModuleTwelveReferences("RU", foundationLessons[12].references.RU as import("./study").ReadingLesson),
      EN: createModuleTwelveReferences("EN", foundationLessons[12].references.EN as import("./study").ReadingLesson),
      KZ: createModuleTwelveReferences("KZ", foundationLessons[12].references.KZ as import("./study").ReadingLesson),
    },
    glossary: {
      RU: createModuleTwelveGlossary("RU", foundationLessons[12].glossary.RU as import("./study").GlossaryLesson),
      EN: createModuleTwelveGlossary("EN", foundationLessons[12].glossary.EN as import("./study").GlossaryLesson),
      KZ: createModuleTwelveGlossary("KZ", foundationLessons[12].glossary.KZ as import("./study").GlossaryLesson),
    },
    media: {
      RU: createModuleTwelveMedia("RU", foundationLessons[12].media.RU as import("./media").MediaLesson),
      EN: createModuleTwelveMedia("EN", foundationLessons[12].media.EN as import("./media").MediaLesson),
      KZ: createModuleTwelveMedia("KZ", foundationLessons[12].media.KZ as import("./media").MediaLesson),
    },
    practice: {
      RU: createModuleTwelvePractice("RU", foundationLessons[12].practice.RU as PracticeLesson),
      EN: createModuleTwelvePractice("EN", foundationLessons[12].practice.EN as PracticeLesson),
      KZ: createModuleTwelvePractice("KZ", foundationLessons[12].practice.KZ as PracticeLesson),
    },
    clinical: {
      RU: createModuleTwelveClinical("RU"),
      EN: createModuleTwelveClinical("EN"),
      KZ: createModuleTwelveClinical("KZ"),
    },
    objectives: {
      RU: createModuleTwelveObjectives("RU"),
      EN: createModuleTwelveObjectives("EN"),
      KZ: createModuleTwelveObjectives("KZ"),
    },
    pretest: {
      RU: createModuleTwelvePretest("RU", modules.RU[11], getSectionTitle("pretest", "RU")),
      EN: createModuleTwelvePretest("EN", modules.EN[11], getSectionTitle("pretest", "EN")),
      KZ: createModuleTwelvePretest("KZ", modules.KZ[11], getSectionTitle("pretest", "KZ")),
    },
    "one-minute": {
      RU: createModuleTwelveSummary("RU"),
      EN: createModuleTwelveSummary("EN"),
      KZ: createModuleTwelveSummary("KZ"),
    },
    theory: {
      RU: createModuleTwelveTheory("RU", foundationLessons[12].theory.RU as Lesson & { kind: "theory" }),
      EN: createModuleTwelveTheory("EN", foundationLessons[12].theory.EN as Lesson & { kind: "theory" }),
      KZ: createModuleTwelveTheory("KZ", foundationLessons[12].theory.KZ as Lesson & { kind: "theory" }),
    },
  },
  11: {
    ...foundationLessons[11],
    references: {
      RU: createModuleElevenReferences("RU", foundationLessons[11].references.RU as import("./study").ReadingLesson),
      EN: createModuleElevenReferences("EN", foundationLessons[11].references.EN as import("./study").ReadingLesson),
      KZ: createModuleElevenReferences("KZ", foundationLessons[11].references.KZ as import("./study").ReadingLesson),
    },
    glossary: { RU: createModuleElevenGlossary("RU", foundationLessons[11].glossary.RU as import("./study").GlossaryLesson), EN: createModuleElevenGlossary("EN", foundationLessons[11].glossary.EN as import("./study").GlossaryLesson), KZ: createModuleElevenGlossary("KZ", foundationLessons[11].glossary.KZ as import("./study").GlossaryLesson) },
    media: { RU: createModuleElevenMedia("RU", foundationLessons[11].media.RU as import("./media").MediaLesson), EN: createModuleElevenMedia("EN", foundationLessons[11].media.EN as import("./media").MediaLesson), KZ: createModuleElevenMedia("KZ", foundationLessons[11].media.KZ as import("./media").MediaLesson) },
    questions: { RU: createModuleElevenQuestions("RU"), EN: createModuleElevenQuestions("EN"), KZ: createModuleElevenQuestions("KZ") },
    practice: {
      RU: createModuleElevenPractice("RU", foundationLessons[11].practice.RU as PracticeLesson),
      EN: createModuleElevenPractice("EN", foundationLessons[11].practice.EN as PracticeLesson),
      KZ: createModuleElevenPractice("KZ", foundationLessons[11].practice.KZ as PracticeLesson),
    },
    clinical: { RU: createModuleElevenClinical("RU"), EN: createModuleElevenClinical("EN"), KZ: createModuleElevenClinical("KZ") },
    objectives: {
      RU: createModuleElevenObjectives("RU"),
      EN: createModuleElevenObjectives("EN"),
      KZ: createModuleElevenObjectives("KZ"),
    },
    theory: {
      RU: createModuleElevenTheory("RU", foundationLessons[11].theory.RU as Lesson & { kind: "theory" }),
      EN: createModuleElevenTheory("EN", foundationLessons[11].theory.EN as Lesson & { kind: "theory" }),
      KZ: createModuleElevenTheory("KZ", foundationLessons[11].theory.KZ as Lesson & { kind: "theory" }),
    },
    "one-minute": {
      RU: createModuleElevenSummary("RU"),
      EN: createModuleElevenSummary("EN"),
      KZ: createModuleElevenSummary("KZ"),
    },
    pretest: {
      RU: createModuleElevenPretest("RU", modules.RU[10], getSectionTitle("pretest", "RU")),
      EN: createModuleElevenPretest("EN", modules.EN[10], getSectionTitle("pretest", "EN")),
      KZ: createModuleElevenPretest("KZ", modules.KZ[10], getSectionTitle("pretest", "KZ")),
    },
  },
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
    references: { RU: createModuleFourReferences("RU", moduleFourBaseReferences("RU")), EN: createModuleFourReferences("EN", moduleFourBaseReferences("EN")), KZ: createModuleFourReferences("KZ", moduleFourBaseReferences("KZ")) },
    glossary: {
      RU: createModuleFourGlossary("RU", moduleFourBaseGlossary("RU")),
      EN: createModuleFourGlossary("EN", moduleFourBaseGlossary("EN")),
      KZ: createModuleFourGlossary("KZ", moduleFourBaseGlossary("KZ")),
    },
    media: { RU: createModuleFourMedia("RU", moduleFourBaseMedia("RU")), EN: createModuleFourMedia("EN", moduleFourBaseMedia("EN")), KZ: createModuleFourMedia("KZ", moduleFourBaseMedia("KZ")) },
    tests: {
      RU: createModuleFourTest("RU", moduleFourBaseTest("RU")),
      EN: createModuleFourTest("EN", moduleFourBaseTest("EN")),
      KZ: createModuleFourTest("KZ", moduleFourBaseTest("KZ")),
    },
    objectives: {
      RU: createModuleFourObjectives("RU"),
      EN: createModuleFourObjectives("EN"),
      KZ: createModuleFourObjectives("KZ"),
    },
    clinical: { RU: createModuleFourClinical("RU"), EN: createModuleFourClinical("EN"), KZ: createModuleFourClinical("KZ") },
    questions: { RU: createModuleFourQuestions("RU"), EN: createModuleFourQuestions("EN"), KZ: createModuleFourQuestions("KZ") },
    cases: { RU: createModuleFourCases("RU", moduleFourBaseCases("RU")), EN: createModuleFourCases("EN", moduleFourBaseCases("EN")), KZ: createModuleFourCases("KZ", moduleFourBaseCases("KZ")) },
    "one-minute": {
      RU: createModuleFourSummary("RU"),
      EN: createModuleFourSummary("EN"),
      KZ: createModuleFourSummary("KZ"),
    },
    practice: {
      RU: createModuleFourPractice("RU", moduleFourBasePractice("RU")),
      EN: createModuleFourPractice("EN", moduleFourBasePractice("EN")),
      KZ: createModuleFourPractice("KZ", moduleFourBasePractice("KZ")),
    },
    theory: {
      RU: createModuleFourTheory("RU", moduleFourBaseTheory("RU")),
      EN: createModuleFourTheory("EN", moduleFourBaseTheory("EN")),
      KZ: createModuleFourTheory("KZ", moduleFourBaseTheory("KZ")),
    },
    pretest: {
      RU: createModuleFourPretest("RU", `4. ${modules.RU[3]}`, getSectionTitle("pretest", "RU")),
      EN: createModuleFourPretest("EN", `4. ${modules.EN[3]}`, getSectionTitle("pretest", "EN")),
      KZ: createModuleFourPretest("KZ", `4. ${modules.KZ[3]}`, getSectionTitle("pretest", "KZ")),
    },
  },
  5: {
    ...foundationLessons[5],
    references: {
      RU: createModuleFiveReferences("RU", moduleFiveBaseReferences("RU")),
      EN: createModuleFiveReferences("EN", moduleFiveBaseReferences("EN")),
      KZ: createModuleFiveReferences("KZ", moduleFiveBaseReferences("KZ")),
    },
    media: { RU: createModuleFiveMedia("RU", moduleFiveBaseMedia("RU")), EN: createModuleFiveMedia("EN", moduleFiveBaseMedia("EN")), KZ: createModuleFiveMedia("KZ", moduleFiveBaseMedia("KZ")) },
    glossary: { RU: createModuleFiveGlossary("RU"), EN: createModuleFiveGlossary("EN"), KZ: createModuleFiveGlossary("KZ") },
    tests: { RU: createModuleFiveTest("RU", moduleFiveBaseTest("RU")), EN: createModuleFiveTest("EN", moduleFiveBaseTest("EN")), KZ: createModuleFiveTest("KZ", moduleFiveBaseTest("KZ")) },
    objectives: { RU: createModuleFiveObjectives("RU"), EN: createModuleFiveObjectives("EN"), KZ: createModuleFiveObjectives("KZ") },
    clinical: { RU: createModuleFiveClinical("RU"), EN: createModuleFiveClinical("EN"), KZ: createModuleFiveClinical("KZ") },
    practice: {
      RU: createModuleFivePractice("RU", moduleFiveBasePractice("RU")),
      EN: createModuleFivePractice("EN", moduleFiveBasePractice("EN")),
      KZ: createModuleFivePractice("KZ", moduleFiveBasePractice("KZ")),
    },
    cases: {
      RU: createModuleFiveCases("RU", moduleFiveBaseCases("RU")),
      EN: createModuleFiveCases("EN", moduleFiveBaseCases("EN")),
      KZ: createModuleFiveCases("KZ", moduleFiveBaseCases("KZ")),
    },
    "one-minute": {
      RU: createModuleFiveSummary("RU"),
      EN: createModuleFiveSummary("EN"),
      KZ: createModuleFiveSummary("KZ"),
    },
    theory: {
      RU: createModuleFiveTheory("RU", moduleFiveBaseTheory("RU")),
      EN: createModuleFiveTheory("EN", moduleFiveBaseTheory("EN")),
      KZ: createModuleFiveTheory("KZ", moduleFiveBaseTheory("KZ")),
    },
    questions: { RU: createModuleFiveQuestions("RU"), EN: createModuleFiveQuestions("EN"), KZ: createModuleFiveQuestions("KZ") },
    pretest: {
      RU: createModuleFivePretest("RU", `5. ${modules.RU[4]}`, getSectionTitle("pretest", "RU")),
      EN: createModuleFivePretest("EN", `5. ${modules.EN[4]}`, getSectionTitle("pretest", "EN")),
      KZ: createModuleFivePretest("KZ", `5. ${modules.KZ[4]}`, getSectionTitle("pretest", "KZ")),
    },
  },
  10: {
    ...foundationLessons[10],
    references: {
      RU: createModuleTenReferences("RU", foundationLessons[10].references.RU as import("./study").ReadingLesson),
      EN: createModuleTenReferences("EN", foundationLessons[10].references.EN as import("./study").ReadingLesson),
      KZ: createModuleTenReferences("KZ", foundationLessons[10].references.KZ as import("./study").ReadingLesson),
    },
    glossary: { RU: createModuleTenGlossary("RU", foundationLessons[10].glossary.RU as import("./study").GlossaryLesson), EN: createModuleTenGlossary("EN", foundationLessons[10].glossary.EN as import("./study").GlossaryLesson), KZ: createModuleTenGlossary("KZ", foundationLessons[10].glossary.KZ as import("./study").GlossaryLesson) },
    media: { RU: createModuleTenMedia("RU", foundationLessons[10].media.RU as import("./media").MediaLesson), EN: createModuleTenMedia("EN", foundationLessons[10].media.EN as import("./media").MediaLesson), KZ: createModuleTenMedia("KZ", foundationLessons[10].media.KZ as import("./media").MediaLesson) },
    questions: { RU: createModuleTenQuestions("RU"), EN: createModuleTenQuestions("EN"), KZ: createModuleTenQuestions("KZ") },
    practice: {
      RU: createModuleTenPractice("RU", foundationLessons[10].practice.RU as PracticeLesson),
      EN: createModuleTenPractice("EN", foundationLessons[10].practice.EN as PracticeLesson),
      KZ: createModuleTenPractice("KZ", foundationLessons[10].practice.KZ as PracticeLesson),
    },
    clinical: { RU: createModuleTenClinical("RU"), EN: createModuleTenClinical("EN"), KZ: createModuleTenClinical("KZ") },
    "one-minute": {
      RU: createModuleTenSummary("RU"),
      EN: createModuleTenSummary("EN"),
      KZ: createModuleTenSummary("KZ"),
    },
    theory: {
      RU: createModuleTenTheory("RU", foundationLessons[10].theory.RU as Lesson & { kind: "theory" }),
      EN: createModuleTenTheory("EN", foundationLessons[10].theory.EN as Lesson & { kind: "theory" }),
      KZ: createModuleTenTheory("KZ", foundationLessons[10].theory.KZ as Lesson & { kind: "theory" }),
    },
    objectives: {
      RU: createModuleTenObjectives("RU"),
      EN: createModuleTenObjectives("EN"),
      KZ: createModuleTenObjectives("KZ"),
    },
    pretest: {
      RU: createModuleTenPretest("RU", modules.RU[9], getSectionTitle("pretest", "RU")),
      EN: createModuleTenPretest("EN", modules.EN[9], getSectionTitle("pretest", "EN")),
      KZ: createModuleTenPretest("KZ", modules.KZ[9], getSectionTitle("pretest", "KZ")),
    },
  },
  9: {
    ...foundationLessons[9],
    references: {
      RU: createModuleNineReferences("RU", foundationLessons[9].references.RU as import("./study").ReadingLesson),
      EN: createModuleNineReferences("EN", foundationLessons[9].references.EN as import("./study").ReadingLesson),
      KZ: createModuleNineReferences("KZ", foundationLessons[9].references.KZ as import("./study").ReadingLesson),
    },
    glossary: {
      RU: createModuleNineGlossary("RU", foundationLessons[9].glossary.RU as import("./study").GlossaryLesson),
      EN: createModuleNineGlossary("EN", foundationLessons[9].glossary.EN as import("./study").GlossaryLesson),
      KZ: createModuleNineGlossary("KZ", foundationLessons[9].glossary.KZ as import("./study").GlossaryLesson),
    },
    media: { RU: createModuleNineMedia("RU", foundationLessons[9].media.RU as import("./media").MediaLesson), EN: createModuleNineMedia("EN", foundationLessons[9].media.EN as import("./media").MediaLesson), KZ: createModuleNineMedia("KZ", foundationLessons[9].media.KZ as import("./media").MediaLesson) },
    questions: { RU: createModuleNineQuestions("RU"), EN: createModuleNineQuestions("EN"), KZ: createModuleNineQuestions("KZ") },
    practice: {
      RU: createModuleNinePractice("RU", foundationLessons[9].practice.RU as PracticeLesson),
      EN: createModuleNinePractice("EN", foundationLessons[9].practice.EN as PracticeLesson),
      KZ: createModuleNinePractice("KZ", foundationLessons[9].practice.KZ as PracticeLesson),
    },
    clinical: {
      RU: createModuleNineClinical("RU"),
      EN: createModuleNineClinical("EN"),
      KZ: createModuleNineClinical("KZ"),
    },
    "one-minute": {
      RU: createModuleNineSummary("RU"),
      EN: createModuleNineSummary("EN"),
      KZ: createModuleNineSummary("KZ"),
    },
    theory: {
      RU: createModuleNineTheory("RU", foundationLessons[9].theory.RU as Lesson & { kind: "theory" }),
      EN: createModuleNineTheory("EN", foundationLessons[9].theory.EN as Lesson & { kind: "theory" }),
      KZ: createModuleNineTheory("KZ", foundationLessons[9].theory.KZ as Lesson & { kind: "theory" }),
    },
    objectives: {
      RU: createModuleNineObjectives("RU"),
      EN: createModuleNineObjectives("EN"),
      KZ: createModuleNineObjectives("KZ"),
    },
    pretest: {
      RU: createModuleNinePretest("RU", `9. ${modules.RU[8]}`, getSectionTitle("pretest", "RU")),
      EN: createModuleNinePretest("EN", `9. ${modules.EN[8]}`, getSectionTitle("pretest", "EN")),
      KZ: createModuleNinePretest("KZ", `9. ${modules.KZ[8]}`, getSectionTitle("pretest", "KZ")),
    },
  },
  8: {
    ...foundationLessons[8],
    references: {
      RU: createModuleEightReferences("RU", foundationLessons[8].references.RU as import("./study").ReadingLesson),
      EN: createModuleEightReferences("EN", foundationLessons[8].references.EN as import("./study").ReadingLesson),
      KZ: createModuleEightReferences("KZ", foundationLessons[8].references.KZ as import("./study").ReadingLesson),
    },
    glossary: {
      RU: createModuleEightGlossary("RU", foundationLessons[8].glossary.RU as import("./study").GlossaryLesson),
      EN: createModuleEightGlossary("EN", foundationLessons[8].glossary.EN as import("./study").GlossaryLesson),
      KZ: createModuleEightGlossary("KZ", foundationLessons[8].glossary.KZ as import("./study").GlossaryLesson),
    },
    media: {
      RU: createModuleEightMedia("RU", foundationLessons[8].media.RU as import("./media").MediaLesson),
      EN: createModuleEightMedia("EN", foundationLessons[8].media.EN as import("./media").MediaLesson),
      KZ: createModuleEightMedia("KZ", foundationLessons[8].media.KZ as import("./media").MediaLesson),
    },
    questions: {
      RU: createModuleEightQuestions("RU"),
      EN: createModuleEightQuestions("EN"),
      KZ: createModuleEightQuestions("KZ"),
    },
    practice: {
      RU: createModuleEightPractice("RU", foundationLessons[8].practice.RU as PracticeLesson),
      EN: createModuleEightPractice("EN", foundationLessons[8].practice.EN as PracticeLesson),
      KZ: createModuleEightPractice("KZ", foundationLessons[8].practice.KZ as PracticeLesson),
    },
    clinical: {
      RU: createModuleEightClinical("RU"),
      EN: createModuleEightClinical("EN"),
      KZ: createModuleEightClinical("KZ"),
    },
    "one-minute": {
      RU: createModuleEightSummary("RU"),
      EN: createModuleEightSummary("EN"),
      KZ: createModuleEightSummary("KZ"),
    },
    theory: {
      RU: createModuleEightTheory("RU", foundationLessons[8].theory.RU as Lesson & { kind: "theory" }),
      EN: createModuleEightTheory("EN", foundationLessons[8].theory.EN as Lesson & { kind: "theory" }),
      KZ: createModuleEightTheory("KZ", foundationLessons[8].theory.KZ as Lesson & { kind: "theory" }),
    },
    objectives: {
      RU: createModuleEightObjectives("RU"),
      EN: createModuleEightObjectives("EN"),
      KZ: createModuleEightObjectives("KZ"),
    },
    pretest: {
      RU: createModuleEightPretest("RU", `8. ${modules.RU[7]}`, getSectionTitle("pretest", "RU")),
      EN: createModuleEightPretest("EN", `8. ${modules.EN[7]}`, getSectionTitle("pretest", "EN")),
      KZ: createModuleEightPretest("KZ", `8. ${modules.KZ[7]}`, getSectionTitle("pretest", "KZ")),
    },
  },
  7: {
    ...foundationLessons[7],
    references: {
      RU: createModuleSevenReferences("RU", foundationLessons[7].references.RU as import("./study").ReadingLesson),
      EN: createModuleSevenReferences("EN", foundationLessons[7].references.EN as import("./study").ReadingLesson),
      KZ: createModuleSevenReferences("KZ", foundationLessons[7].references.KZ as import("./study").ReadingLesson),
    },
    glossary: {
      RU: createModuleSevenGlossary("RU", foundationLessons[7].glossary.RU as import("./study").GlossaryLesson),
      EN: createModuleSevenGlossary("EN", foundationLessons[7].glossary.EN as import("./study").GlossaryLesson),
      KZ: createModuleSevenGlossary("KZ", foundationLessons[7].glossary.KZ as import("./study").GlossaryLesson),
    },
    media: {
      RU: createModuleSevenMedia("RU", foundationLessons[7].media.RU as import("./media").MediaLesson),
      EN: createModuleSevenMedia("EN", foundationLessons[7].media.EN as import("./media").MediaLesson),
      KZ: createModuleSevenMedia("KZ", foundationLessons[7].media.KZ as import("./media").MediaLesson),
    },
    questions: { RU: createModuleSevenQuestions("RU"), EN: createModuleSevenQuestions("EN"), KZ: createModuleSevenQuestions("KZ") },
    tests: {
      RU: createModuleSevenTests("RU", modules.RU[6], foundationLessons[7].tests.RU as import("./tests").BranchingTest),
      EN: createModuleSevenTests("EN", modules.EN[6], foundationLessons[7].tests.EN as import("./tests").BranchingTest),
      KZ: createModuleSevenTests("KZ", modules.KZ[6], foundationLessons[7].tests.KZ as import("./tests").BranchingTest),
    },
    cases: {
      RU: createModuleSevenCases("RU", foundationLessons[7].cases.RU as CasesLesson),
      EN: createModuleSevenCases("EN", foundationLessons[7].cases.EN as CasesLesson),
      KZ: createModuleSevenCases("KZ", foundationLessons[7].cases.KZ as CasesLesson),
    },
    practice: {
      RU: createModuleSevenPractice("RU", foundationLessons[7].practice.RU as PracticeLesson),
      EN: createModuleSevenPractice("EN", foundationLessons[7].practice.EN as PracticeLesson),
      KZ: createModuleSevenPractice("KZ", foundationLessons[7].practice.KZ as PracticeLesson),
    },
    clinical: {
      RU: createModuleSevenClinical("RU"),
      EN: createModuleSevenClinical("EN"),
      KZ: createModuleSevenClinical("KZ"),
    },
    "one-minute": {
      RU: createModuleSevenSummary("RU"),
      EN: createModuleSevenSummary("EN"),
      KZ: createModuleSevenSummary("KZ"),
    },
    theory: {
      RU: createModuleSevenTheory("RU", foundationLessons[7].theory.RU as Lesson & { kind: "theory" }),
      EN: createModuleSevenTheory("EN", foundationLessons[7].theory.EN as Lesson & { kind: "theory" }),
      KZ: createModuleSevenTheory("KZ", foundationLessons[7].theory.KZ as Lesson & { kind: "theory" }),
    },
    pretest: {
      RU: createModuleSevenPretest("RU", `7. ${modules.RU[6]}`, getSectionTitle("pretest", "RU")),
      EN: createModuleSevenPretest("EN", `7. ${modules.EN[6]}`, getSectionTitle("pretest", "EN")),
      KZ: createModuleSevenPretest("KZ", `7. ${modules.KZ[6]}`, getSectionTitle("pretest", "KZ")),
    },
    objectives: {
      RU: createModuleSevenObjectives("RU"),
      EN: createModuleSevenObjectives("EN"),
      KZ: createModuleSevenObjectives("KZ"),
    },
  },
  6: {
    ...foundationLessons[6],
    references: {
      RU: createModuleSixReferences("RU", moduleSixBaseReferences("RU")),
      EN: createModuleSixReferences("EN", moduleSixBaseReferences("EN")),
      KZ: createModuleSixReferences("KZ", moduleSixBaseReferences("KZ")),
    },
    media: { RU: createModuleSixMedia("RU", moduleSixBaseMedia("RU")), EN: createModuleSixMedia("EN", moduleSixBaseMedia("EN")), KZ: createModuleSixMedia("KZ", moduleSixBaseMedia("KZ")) },
    tests: { RU: createModuleSixTests("RU", modules.RU[5], moduleSixBaseTest("RU")), EN: createModuleSixTests("EN", modules.EN[5], moduleSixBaseTest("EN")), KZ: createModuleSixTests("KZ", modules.KZ[5], moduleSixBaseTest("KZ")) },
    glossary: { RU: createModuleSixGlossary("RU", moduleSixBaseGlossary("RU")), EN: createModuleSixGlossary("EN", moduleSixBaseGlossary("EN")), KZ: createModuleSixGlossary("KZ", moduleSixBaseGlossary("KZ")) },
    objectives: { RU: createModuleSixObjectives("RU"), EN: createModuleSixObjectives("EN"), KZ: createModuleSixObjectives("KZ") },
    "one-minute": { RU: createModuleSixSummary("RU"), EN: createModuleSixSummary("EN"), KZ: createModuleSixSummary("KZ") },
    clinical: { RU: createModuleSixClinical("RU"), EN: createModuleSixClinical("EN"), KZ: createModuleSixClinical("KZ") },
    questions: { RU: createModuleSixQuestions("RU"), EN: createModuleSixQuestions("EN"), KZ: createModuleSixQuestions("KZ") },
    cases: {
      RU: createModuleSixCases("RU", moduleSixBaseCases("RU")),
      EN: createModuleSixCases("EN", moduleSixBaseCases("EN")),
      KZ: createModuleSixCases("KZ", moduleSixBaseCases("KZ")),
    },
    practice: {
      RU: createModuleSixPractice("RU", moduleSixBasePractice("RU")),
      EN: createModuleSixPractice("EN", moduleSixBasePractice("EN")),
      KZ: createModuleSixPractice("KZ", moduleSixBasePractice("KZ")),
    },
    theory: {
      RU: createModuleSixTheory("RU", moduleSixBaseTheory("RU")),
      EN: createModuleSixTheory("EN", moduleSixBaseTheory("EN")),
      KZ: createModuleSixTheory("KZ", moduleSixBaseTheory("KZ")),
    },
    pretest: {
      RU: createModuleSixPretest("RU", `6. ${modules.RU[5]}`, getSectionTitle("pretest", "RU")),
      EN: createModuleSixPretest("EN", `6. ${modules.EN[5]}`, getSectionTitle("pretest", "EN")),
      KZ: createModuleSixPretest("KZ", `6. ${modules.KZ[5]}`, getSectionTitle("pretest", "KZ")),
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
