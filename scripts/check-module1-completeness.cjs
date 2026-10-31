// Module 1 completeness gate: compares authored RU/EN/KZ content without replacing it.
const assert = require("node:assert/strict");
const {load} = require("./check-tests.cjs");
const langs = ["RU","EN","KZ"];
const suffix = {RU:"ru",EN:"en",KZ:"kz"};
const snapshots = {};
for (const lang of langs) {
  const code = suffix[lang];
  const theory = load(`content/modules/1/theory/${code}.ts`).default;
  const practice = load(`content/modules/1/practice/${code}.ts`).default;
  const cases = load(`content/modules/1/cases/${code}.ts`).default;
  const tests = load(`content/modules/1/tests/${code}.ts`).default;
  assert(Array.isArray(theory.sections) && theory.sections.length >= 8,`${lang}: insufficient theory sections`);
  assert(Array.isArray(practice.sections) && practice.sections.length >= 14,`${lang}: insufficient practical stations`);
  assert(Array.isArray(cases.cases) && cases.cases.length >= 25,`${lang}: fewer than 25 clinical/situational cases`);
  const ids = cases.cases.map(item => item.id);
  assert.equal(new Set(ids).size,ids.length,`${lang}: duplicate case identifiers`);
  for (const item of cases.cases) {
    assert(item.title?.trim() && item.situation?.trim(),`${lang}: incomplete case ${item.id}`);
    assert(Array.isArray(item.stages) && item.stages.length > 0,`${lang}: no stages for ${item.id}`);
    assert(Array.isArray(item.explanation) && item.explanation.length >= 2,`${lang}: insufficient explanation for ${item.id}`);
  }
  const caseSituations = cases.cases.map(item => item.situation.trim().toLocaleLowerCase());
  assert.equal(new Set(caseSituations).size,caseSituations.length,`${lang}: duplicate clinical case situations`);
  for (const item of cases.cases) {
    assert(item.stages.every(stage => Array.isArray(stage.questions) && stage.questions.length >= 2 && stage.questions.every(q => typeof q === "string" && q.trim().length >= 12)),`${lang}: case ${item.id} lacks substantive clinical questions`);
    assert(item.explanation.every(explanation => typeof explanation === "string" && explanation.trim().length >= 35),`${lang}: case ${item.id} has overly short explanation`);
  }
  const sectionIds = theory.sections.map(item => item.id);
  assert.equal(new Set(sectionIds).size,sectionIds.length,`${lang}: duplicate theory section IDs`);
  for (const section of theory.sections) {
    assert(section.title?.trim(),`${lang}: theory section missing title`);
    assert(Array.isArray(section.blocks) && section.blocks.length > 0,`${lang}: theory section ${section.id} empty`);
  }
  assert(tests,`${lang}: tests missing`);
  snapshots[lang] = {theory:sectionIds,cases:ids,practiceCount:practice.sections.length};
}
for (const lang of ["EN","KZ"]) {
  assert.deepEqual(snapshots[lang].theory,snapshots.RU.theory,`${lang}: theory sections differ from RU`);
  assert.deepEqual(snapshots[lang].cases,snapshots.RU.cases,`${lang}: case identifiers differ from RU`);
  assert.equal(snapshots[lang].practiceCount,snapshots.RU.practiceCount,`${lang}: practical station count differs from RU`);
}
console.log("Module 1 structural review passed: trilingual theory, practice, cases and test modules present.");
