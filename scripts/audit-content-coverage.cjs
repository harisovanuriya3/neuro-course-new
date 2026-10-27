// Read-only audit of actual lessons: no filler questions are generated.
const fs = require("node:fs");
const path = require("node:path");
const {load} = require("./check-tests.cjs");
const {getLesson} = load("content/index.ts");
const {sectionOrder} = load("content/sections.ts");
const langs = ["RU","EN","KZ"];
const minCases = 20;
const minTests = 20;
const out = [];
let missing = 0;
const normalize = value => String(value || "").trim().toLowerCase().replace(/\s+/g," ");
for (const lang of langs) {
 for (let id = 1; id <= 25; id++) {
  let available = 0;
  const lessons = {};
  for (const section of sectionOrder) {
   try {
    const lesson = getLesson(id, section, lang);
    if (lesson && lesson.title) available++;
    lessons[section] = lesson;
   } catch (e) {
    console.warn("Failed reading:", id, lang, section, String(e));
    missing++;
   }
  }
  const cases = lessons.cases && Array.isArray(lessons.cases.cases) ? lessons.cases.cases : [];
  const assessed = lessons.tests || {};
  const mainIds = Array.isArray(assessed.mainIds) ? assessed.mainIds : [];
  const questionNodes = Object.values(assessed.nodes || {}).filter(n => n && Array.isArray(n.options) && n.options.length === 4);
  const distinctCaseSituations = new Set(cases.map(c => normalize(c.situation))).size;
  const distinctMainPrompts = new Set(mainIds.map(key => normalize(assessed.nodes && assessed.nodes[key] && assessed.nodes[key].prompt))).size;
  out.push({
   module:id, language:lang, sectionsWithTitles:available,
   sectionsExpected:sectionOrder.length,
   cases:cases.length, distinctCaseSituations,
   mainTestQuestions:mainIds.length, distinctMainPrompts,
   totalQuestionNodesIncludingRemediation:questionNodes.length,
   meetsRequestedCases:cases.length>=minCases && distinctCaseSituations>=minCases,
   meetsRequestedTests:mainIds.length>=minTests && distinctMainPrompts>=minTests
  });
 }
}
const all = out.length;
const inadequateCases = out.filter(x=>!x.meetsRequestedCases);
const inadequateTests = out.filter(x=>!x.meetsRequestedTests);
const imagePaths = [
 ...Array.from({length:10},(_,i)=>"public/images/neuro-modules/module-"+String(i+1).padStart(2,"0")+".webp"),
 ...langs.map(l=>"public/images/neuro-atlas-"+l.toLowerCase()+".png"),
 ...["closed","open","eyes","mental","n2","n3"].map(mode=>"public/images/eeg-verified/"+mode+".jpg")
];
const missingImages = imagePaths.filter(file=>!fs.existsSync(path.resolve(__dirname,"..",file)));
const summary = {
 generatedAt:"run time", auditedModuleLanguages:all, minimumRequestedCasesPerModule:minCases,
 minimumRequestedMainTestsPerModule:minTests,
 moduleLanguagesBelowCaseTarget:inadequateCases.length,
 moduleLanguagesBelowTestTarget:inadequateTests.length,
 missingContentReads:missing, missingRestoredMediaFiles:missingImages
};
console.log("COURSE CONTENT COVERAGE",JSON.stringify(summary,null,2));
for (const row of out) console.log([row.module,row.language,
  row.sectionsWithTitles+"/"+row.sectionsExpected+" sections",
  row.cases+" cases ("+row.distinctCaseSituations+" distinct)",
  row.mainTestQuestions+" main tests ("+row.distinctMainPrompts+" distinct)",
  row.totalQuestionNodesIncludingRemediation+" total test nodes"].join(" | "));
if (inadequateCases.length || inadequateTests.length) {
 console.warn("EDITORIAL GAP: section existence does NOT imply 20 unique assessed cases and 20 unique tests per module.");
}
console.log("A read-only audit, not a certificate of physiological/clinical accuracy.");
