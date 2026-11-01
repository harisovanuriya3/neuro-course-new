const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {load} = require("./check-tests.cjs");
const {getLesson} = load("content/index.ts");
const {validateTest} = load("lib/tests/engine.ts");
const langs = ["RU","EN","KZ"];
const sections = ["theory","practice","cases","pretest","tests"];
const sizes = {};
for (let moduleId=1;moduleId<=25;moduleId++) {
  sizes[moduleId] = {};
  for(const language of langs) {
    sizes[moduleId][language] = {};
    for(const section of sections) {
      const lesson = getLesson(moduleId,section,language);
      assert(lesson, moduleId+"/"+language+"/"+section+" missing");
      const list = section==="theory"||section==="practice" ? lesson.sections
        : section==="cases" ? lesson.cases
        : section==="pretest" ? lesson.questions
        : lesson.mainIds;
      assert(Array.isArray(list)&&list.length>0,moduleId+"/"+language+"/"+section+" empty");
      sizes[moduleId][language][section]=list.length;
      if(section==="tests") {
        validateTest(lesson);
        assert.equal(new Set(lesson.mainIds).size,lesson.mainIds.length,"duplicate main IDs "+moduleId+"/"+language);
        for(const node of Object.values(lesson.nodes)) {
          if(node.type!=="question") continue;
          assert(node.options.some(option=>option.id===node.correctAnswer),"missing correct option "+moduleId+"/"+language+"/"+node.id);
          assert(node.explanation.trim(),"missing explanation "+moduleId+"/"+language+"/"+node.id);
        }
      }
      if(section==="pretest") for(const q of list) {
        assert(q.options.some(option=>option.id===q.correctAnswer),"invalid pretest key "+moduleId+"/"+language+"/"+q.id);
        assert(q.explanation?.trim(),"missing pretest explanation "+moduleId+"/"+language+"/"+q.id);
      }
    }
  }
  for(const section of sections) {
    const counts=langs.map(lang=>sizes[moduleId][lang][section]);
    assert(counts.every(n=>n===counts[0]),"language count mismatch "+moduleId+"/"+section+": "+counts.join("/"));
  }
}
const words=["sixteen","seventeen","eighteen","nineteen","twenty-one","twenty-two","twenty-three","twenty-four","twenty-five"];
for(const word of words.concat("twenty-visual")) {
 const filename=word==="twenty-visual"?"module-twenty-visual-assessment.ts":"module-"+word+"-final-test.ts";
 const src=fs.readFileSync(path.join(__dirname,"../content/course-foundation",filename),"utf8");
 assert(!/previous\.onCorrect\s*=|previous\.onIncorrect\s*=/.test(src),"base test mutation "+filename);
}
console.log("Comprehensive content structure: 25 modules x 3 languages x 5 sections; test keys, explanations, language parity, branching tests passed.");
