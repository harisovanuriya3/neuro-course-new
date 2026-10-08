const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const read = relative => fs.readFileSync(path.join(root, relative), "utf8");
const fail = message => {
  console.error(`FAIL: ${message}`);
  process.exitCode = 1;
};
const pass = message => console.log(`PASS: ${message}`);

const course = read("content/course.ts");
const sections = read("content/sections.ts");
const foundation = read("content/course-foundation/index.ts");
const assessment = read("content/course-foundation/assessment.ts");
const patients = read("content/virtual-patients.ts");
const exam = read("components/ExamCenter.tsx");
const examBank = read("content/exam-bank.ts");
const moduleOnePractice = ["ru", "en", "kz"].map(language => [
  language.toUpperCase(),
  read(`content/modules/1/practice/${language}.ts`),
]);

const englishModules = course.match(/EN:\s*\[([\s\S]*?)\n\s*\],/m)?.[1]
  .match(/^\s*".+",?$/gm) ?? [];
englishModules.length === 25
  ? pass("course keeps exactly 25 modules")
  : fail(`expected 25 modules, found ${englishModules.length}`);

const sectionSlugs = [...sections.matchAll(/slug:\s*"([^"]+)"/g)].map(match => match[1]);
new Set(sectionSlugs).size === sectionSlugs.length
  ? pass(`${sectionSlugs.length} section routes are unique`)
  : fail("duplicate section slugs found");

for (const language of ["RU", "EN", "KZ"]) {
  course.includes(`${language}: [`)
    ? pass(`${language} module titles are registered`)
    : fail(`${language} module titles are missing`);
}

const topicIds = [...read("content/course-foundation/topics.ts").matchAll(/\{\s*id:\s*(\d+)/g)]
  .map(match => Number(match[1]));
const expectedFoundationIds = Array.from({ length: 24 }, (_, index) => index + 2);
topicIds.length === expectedFoundationIds.length && expectedFoundationIds.every(id => topicIds.includes(id))
  ? pass("foundation topic map covers modules 2–25 exactly once")
  : fail(`foundation topic ids are ${topicIds.join(", ")}`);

const patientDecisionIds = [...patients.matchAll(/^\s{2}(\d+): decisions\(/gm)]
  .map(match => Number(match[1]));
patientDecisionIds.length === 25 && new Set(patientDecisionIds).size === 25
  ? pass("25 virtual patients have authored decision sets")
  : fail(`expected 25 virtual-patient decision sets, found ${patientDecisionIds.length}`);

patients.includes("authoredDecisions.length !== 6")
  ? pass("virtual patients enforce six stages")
  : fail("virtual patients do not enforce six stages");
patients.includes("decisions: [string, string, string]")
  ? pass("every virtual-patient stage requires three choices")
  : fail("virtual-patient choice cardinality is not enforced");

const examSignals = [
  ["shuffled(q.options)", "Exam Center shuffles answer positions"],
  ["Math.min(100", "Exam Center caps and reports a 0–100 result"],
  ["if(finished) return", "final submission switches to a locked result view"],
  ["analysis.map", "result analysis is rendered"],
];
for (const [signal, message] of examSignals) {
  exam.includes(signal) ? pass(message) : fail(message);
}

assessment.includes("const offset=(topic.id+optionSetIndex++)%options.length")
  ? pass("module tests vary the visual position of the correct answer deterministically")
  : fail("module tests still expose a fixed correct-answer position");

for (const [language, source] of moduleOnePractice) {
  const numberedActivities = [...source.matchAll(/title:\s*"(\d+)\./g)].map(match => Number(match[1]));
  const expected = Array.from({ length: 13 }, (_, index) => index + 1);
  JSON.stringify(numberedActivities) === JSON.stringify(expected)
    ? pass(`Module 1 Practice ${language} has the same 13-step progression`)
    : fail(`Module 1 Practice ${language} activity numbers are ${numberedActivities.join(", ")}`);
  source.includes('type: "visual-materials"')
    ? pass(`Module 1 Practice ${language} provides a drawing tool for synthesis`)
    : fail(`Module 1 Practice ${language} asks for synthesis without visual materials`);
}

const testFunction = assessment.slice(assessment.indexOf("export function createFoundationTest"));
!testFunction.includes("clinicalVignettes[topic.id]")
  ? pass("foundation Tests use a transfer perturbation rather than the Cases vignette")
  : fail("foundation Tests still repeat the Cases vignette");
foundation.includes("identify a condition under which that relationship would fail")
  ? pass("foundation Practice comparison differs from the Review Question recall prompt")
  : fail("foundation Practice still repeats the Review Question prompt");
const createExamBank = examBank.slice(examBank.indexOf("export function createExamBank"));
const examPromptBlock = createExamBank.slice(createExamBank.indexOf("const prompts=["), createExamBank.indexOf("const conciseMechanism"));
const copiedSectionPrompts = [
  "topic.question[lang]",
  "clinicalVignettes[topic.id]",
  "topic.task[lang]",
  "topic.interpretation[lang]\n  ];",
];
copiedSectionPrompts.every(signal => !examPromptBlock.includes(signal))
  ? pass("Exam Center does not reuse Theory, Practice, Cases, or Review prompts")
  : fail("Exam Center still reuses a section prompt");

// Exact long-copy repeats are useful regression candidates. Repeated interface
// labels and deliberate remediation instructions are reported, not failed.
const educationalSources = [
  ["foundation", foundation],
  ["assessment", assessment],
  ["virtual-patients", patients],
  ["exam-bank", read("content/exam-bank.ts")],
];
const occurrences = new Map();
for (const [name, source] of educationalSources) {
  for (const match of source.matchAll(/(["'`])([^\r\n]{40,}?)\1/g)) {
    const value = match[2].replace(/\\[nrt]/g, " ").replace(/\s+/g, " ").trim();
    if (!occurrences.has(value)) occurrences.set(value, []);
    occurrences.get(value).push(name);
  }
}
const duplicateGroups = [...occurrences.values()].filter(items => items.length > 1);
console.log(`INFO: ${duplicateGroups.length} exact long-copy duplicate groups (including deliberate feedback/remediation copy)`);

if (!process.exitCode) console.log("Course audit completed successfully.");
