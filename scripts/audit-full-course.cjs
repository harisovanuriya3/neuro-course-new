// Comprehensive read-only course audit. It reports actual authored coverage and never creates filler.
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {load} = require("./check-tests.cjs");
const {getLesson} = load("content/index.ts");
const {sectionOrder} = load("content/sections.ts");

const root = path.resolve(__dirname, "..");
const langs = ["RU","EN","KZ"];
const auxiliarySections = new Set(["virtual-patient","voice","progress","notes"]);
const lessonSections = sectionOrder.filter(section => !auxiliarySections.has(section));
const isSpecializedRoute = (moduleId, section) => moduleId >= 2 && section === "interactive";
const rows = [];
const text = value => String(value || "").trim();
const norm = value => text(value).toLowerCase().replace(/\s+/g," ");
const arrayAt = (object, keys) => {
  for (const key of keys) if (Array.isArray(object && object[key])) return object[key];
  return [];
};

for (const language of langs) {
  for (let moduleId = 1; moduleId <= 25; moduleId += 1) {
    const lessons = {};
    const missingSections = [];
    for (const section of lessonSections) {
      let lesson;
      try { lesson = getLesson(moduleId, section, language); }
      catch (error) { if (!isSpecializedRoute(moduleId, section)) missingSections.push(section); continue; }
      lessons[section] = lesson;
      if ((!lesson || !text(lesson.title)) && !isSpecializedRoute(moduleId, section)) missingSections.push(section);
    }
    const theory = lessons.theory || {};
    const practice = lessons.practice || {};
    const casesLesson = lessons.cases || {};
    const tests = lessons.tests || {};
    // Virtual-patient routes are auxiliary, but still require explicit coverage inspection.
    // Do not silently report zero merely because the route is excluded from lessonSections.
    let patient = {};
    let patientSource = "lesson";
    try { patient = getLesson(moduleId, "virtual-patient", language) || {}; }
    catch (error) { patientSource = "separate-route-or-unavailable"; }
    const cases = arrayAt(casesLesson, ["cases","items","scenarios"]);
    const practiceItems = arrayAt(practice, ["activities","items","stations","steps","tasks"]);
    const theoryBlocks = arrayAt(theory, ["sections","blocks","items","topics"]);
    const mainIds = Array.isArray(tests.mainIds) ? tests.mainIds : [];
    const nodes = tests.nodes || {};
    const mainPrompts = mainIds.map(id => norm(nodes[id] && nodes[id].prompt)).filter(Boolean);
    const optionProblems = mainIds.filter(id => !nodes[id] || !Array.isArray(nodes[id].options) || nodes[id].options.length !== 4);
    const caseSituations = cases.map(item => norm(item && (item.situation || item.prompt || item.text))).filter(Boolean);
    const patientStages = arrayAt(patient, ["decisions","stages","steps","items"]);
    rows.push({
      moduleId, language,
      sections: lessonSections.length - missingSections.length,
      missingSections,
      theoryBlocks: theoryBlocks.length,
      practiceItems: practiceItems.length,
      cases: cases.length,
      distinctCases: new Set(caseSituations).size,
      mainTests: mainIds.length,
      distinctMainTests: new Set(mainPrompts).size,
      optionProblems: optionProblems.length,
      patientStages: patientStages.length,
      patientSource: patientStages.length > 0 ? "lesson-stages" : patientSource === "lesson" ? "no-lesson-stages" : patientSource,
    });
  }
}

assert.equal(rows.length, 75, "Audit must cover 25 modules × 3 languages");
for (const row of rows) {
  assert.equal(row.missingSections.length, 0, `Module ${row.moduleId} ${row.language} has missing sections: ${row.missingSections.join(", ")}`);
  assert.equal(row.optionProblems, 0, `Module ${row.moduleId} ${row.language} has malformed main test options`);
  assert(row.cases > 0, `Module ${row.moduleId} ${row.language} has no situational cases`);
  assert(row.mainTests > 0, `Module ${row.moduleId} ${row.language} has no main tests`);
}

const anatomy = fs.readFileSync(path.join(root,"components/AnatomyReference.tsx"),"utf8");
const advanced = fs.readFileSync(path.join(root,"components/AdvancedAnatomyReference.tsx"),"utf8");
const visualFiles = [...anatomy.matchAll(/file:\s*"([^"]+)"/g),...advanced.matchAll(/file:\s*"([^"]+)"/g)].map(match=>match[1]);
assert.equal(visualFiles.length,new Set(visualFiles).size,"Visual registries contain duplicate files");
const visualIds = new Set([...anatomy.matchAll(/^\s*(\d+):/gm),...advanced.matchAll(/^\s*(\d+):/gm)].map(match=>Number(match[1])));
for(let id=1;id<=25;id+=1) assert(visualIds.has(id),`Module ${id} has no curated visual`);

const belowCaseTarget = rows.filter(row=>row.distinctCases<20);
const belowTestTarget = rows.filter(row=>row.distinctMainTests<20);
const languageParity = [];
for(let id=1;id<=25;id+=1){
  const group=rows.filter(row=>row.moduleId===id);
  const signature=row=>[row.sections,row.theoryBlocks,row.practiceItems,row.cases,row.mainTests,row.patientStages].join("/");
  if(new Set(group.map(signature)).size>1) languageParity.push({moduleId:id,values:group.map(row=>[row.language,signature(row)])});
}

const summary={
  auditedModuleLanguages:rows.length,
  completeSectionRoutes:rows.filter(row=>row.missingSections.length===0).length,
  uniqueCuratedVisuals:visualFiles.length,
  modulesWithLanguageCountMismatch:languageParity.length,
  moduleLanguagesBelow20DistinctCases:belowCaseTarget.length,
  moduleLanguagesBelow20DistinctMainTests:belowTestTarget.length,
  patientRoutesRequiringManualReview:rows.filter(row=>row.patientStages===0).length,
};
console.log("FULL COURSE AUDIT",JSON.stringify(summary,null,2));
for(const row of rows) console.log(`${row.moduleId}|${row.language}|sections ${row.sections}/${lessonSections.length}|theory ${row.theoryBlocks}|practice ${row.practiceItems}|cases ${row.distinctCases}/${row.cases}|tests ${row.distinctMainTests}/${row.mainTests}|patient stages ${row.patientStages} (${row.patientSource})`);
if(summary.patientRoutesRequiringManualReview) console.warn(`VIRTUAL PATIENT REVIEW REQUIRED: ${summary.patientRoutesRequiringManualReview} module-language entries have no lesson-level stages; inspect separately rendered patient components before declaring them empty.`);
if(languageParity.length) console.warn("LANGUAGE COUNT MISMATCH",JSON.stringify(languageParity));
if(belowCaseTarget.length||belowTestTarget.length) console.warn("EDITORIAL TARGET OPEN: 20 distinct authored cases and tests are not yet verified for every module-language pair.");
console.log("Full course structural/content audit completed.");
