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
      if(section==="pretest") {
        const prompts = list.map(q => q.prompt.toLocaleLowerCase().replace(/\\s+/g," ").trim());
        assert.equal(new Set(prompts).size,prompts.length,"duplicate pretest prompts "+moduleId+"/"+language);
      }
      if(section==="tests") {
        validateTest(lesson);
        const prompts = Object.values(lesson.nodes).filter(node => node.type==="question").map(node => node.prompt.toLocaleLowerCase().replace(/\\s+/g," ").trim());
        const repeated = prompts.length - new Set(prompts).size;
        if (repeated) {
          const groups = new Map();
          for (const node of Object.values(lesson.nodes).filter(node => node.type==="question")) {
            const prompt = node.prompt.toLocaleLowerCase().replace(/\\s+/g," ").trim();
            if (!groups.has(prompt)) groups.set(prompt,[]);
            groups.get(prompt).push(node);
          }
          const withinLevel = [...groups.values()].some(nodes => new Set(nodes.map(node => node.level)).size !== nodes.length);
          assert(!withinLevel,"Duplicate questions at the same difficulty level: "+moduleId+"/"+language);
          console.warn("Adaptive review reuses "+repeated+" question prompts across levels: "+moduleId+"/"+language);
        }

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

const source = (name) => fs.readFileSync(path.join(__dirname,"..",name),"utf8");
const toolbar=source("components/StudyToolbar.tsx");
const calendar=source("components/StudyCalendar.tsx");
const layout=source("app/layout.tsx");
const modulePage=source("app/modules/[id]/page.tsx");
const exam=source("app/exam/page.tsx");
const resources=source("app/resources/page.tsx");
assert(toolbar.includes('setPanel("search")'),"Search button missing");
assert(toolbar.includes("/calendar?lang="),"Calendar toolbar link missing");
assert(layout.includes("<StudyToolbar"),"Study toolbar not mounted");
assert(fs.existsSync(path.join(__dirname,"../app/calendar/page.tsx")),"Calendar route missing");
assert(calendar.includes("localStorage")&&calendar.includes("exportEntries"),"Calendar persistence or backup missing");
for(let id=15;id<=18;id++)assert(fs.existsSync(path.join(__dirname,"../app/module-"+id+"-lab/page.tsx")),"Missing module lab "+id);
assert(modulePage.includes("moduleNumber >= 15 && moduleNumber <= 18"),"Lab links missing");
assert(exam.includes("/resources?lang=")&&resources.includes("/exam?lang="),"Exam/media crosslinks missing");
console.log("Navigation and tool integrity: search, calendar, laboratory routes, exam/media crosslinks present.");
