const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const {load} = require("./check-tests.cjs");
const {getLesson} = load("content/index.ts");
const {validateTest} = load("lib/tests/engine.ts");
const {initialState,transition} = load("lib/tests/engine.ts");
function simulateRoute(test, answerCorrectly) {
  let state=initialState(test);
  for(let step=0;step<500;step++){
    if(state.phase==="results") return state;
    if(state.phase==="remediation"||state.phase==="feedback"){state=transition(test,state,{type:"continue"});continue;}
    const node=test.nodes[state.current];
    assert(node&&node.type==="question","broken test route "+test.title);
    const selected=answerCorrectly?node.correctAnswer:node.options.find(o=>o.id!==node.correctAnswer)?.id;
    assert(selected,"no alternative answer "+node.id);
    state=transition(test,state,{type:"select",answer:selected});
    state=transition(test,state,{type:"check"});
  }
  throw Error("Test route failed to terminate: "+test.title);
}
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
        simulateRoute(lesson,true);
        simulateRoute(lesson,false);
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
          assert(node.prompt.trim().length>=12,"short question "+moduleId+"/"+language+"/"+node.id);
          assert(node.options.every(option=>option.text&&option.text.trim().length>=2),"empty distractor "+moduleId+"/"+language+"/"+node.id);
          const optionTexts=node.options.map(option=>option.text.toLocaleLowerCase().replace(/\\s+/g," ").trim());
          assert.equal(new Set(optionTexts).size,optionTexts.length,"duplicate answer options "+moduleId+"/"+language+"/"+node.id);
          assert(lesson.competencies[node.competency],"missing competency "+moduleId+"/"+language+"/"+node.id);
        }
      }
      if(section==="pretest") for(const q of list) {
        assert(q.options.some(option=>option.id===q.correctAnswer),"invalid pretest key "+moduleId+"/"+language+"/"+q.id);
        assert(q.explanation?.trim(),"missing pretest explanation "+moduleId+"/"+language+"/"+q.id);
        assert(q.options.length===4,"pretest requires exactly four choices "+moduleId+"/"+language+"/"+q.id);
        const texts=q.options.map(option=>option.text.toLocaleLowerCase().replace(/\\s+/g," ").trim());
        assert.equal(new Set(texts).size,texts.length,"duplicate pretest answer options "+moduleId+"/"+language+"/"+q.id);
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

const draw=source("app/draw/page.tsx");
assert(draw.includes("onPointerDown={begin}")&&draw.includes("onPointerMove={move}")&&draw.includes("onPointerUp={end}"),"Drawing pointer controls missing");
assert(draw.includes("localStorage.setItem(storageKey")&&draw.includes("toDataURL"),"Drawing persistence/export missing");
assert(draw.includes("moduleId")&&modulePage.includes("/draw?lang="),"Module drawing links missing");
assert(modulePage.includes('["objectives","theory","practice","tests"][index]'),"Learning stage tiles not linked");
console.log("Author-review UX checks: stage links, module drawing, persistence and PNG export source present.");

const fsReview = require("fs");
const sourceCourse = source("content/course-foundation/index.ts");
const preStart = sourceCourse.indexOf("if (section === 'pretest')");
const preEnd = sourceCourse.indexOf("if (section === 'one-minute')",preStart);
const questionStart = sourceCourse.indexOf("if (section === 'questions')");
const questionEnd = sourceCourse.indexOf("if (section === 'media')",questionStart);
assert(preStart>=0&&preEnd>preStart&&questionStart>=0&&questionEnd>questionStart,"Unable to locate assessment template");
const pretestTemplate=sourceCourse.slice(preStart,preEnd);
const questionTemplate=sourceCourse.slice(questionStart,questionEnd);
const pretestCount=2 + (pretestTemplate.includes("Array.from({ length: 18 }") ? 18 : 0);
const controlCount=5 + (questionTemplate.includes("Array.from({ length: 20 }") ? 20 : 0);
const gaps=[];
if(pretestCount<20) gaps.push("Pretest template has "+pretestCount+" of 20 required questions");
if(controlCount<25) gaps.push("Control question template has "+controlCount+" of 25 required questions");
if(gaps.length) console.warn("AUTHOR RELEASE BLOCKERS (not a build failure): "+gaps.join("; "));
console.log("Author release gate: "+(gaps.length?"NOT READY":"Template count checks passed")+". Do not publish until scientific and visual review also complete.");

const moduleSectionPage=source("app/modules/[id]/[section]/page.tsx");
for(const [name,component,moduleId] of [["EEG","EEGLab",2],["Withdrawal reflex","ReflexLab",7],["Gait","GaitDemonstration",11]]) {
  const componentSource=source("components/"+component+".tsx");
  assert(componentSource.includes("language"),name+" laboratory lacks language support");
  assert(moduleSectionPage.includes("<"+component+" language={lang} />"),name+" laboratory is not rendered in the module route");
  assert(modulePage.includes("moduleNumber === "+moduleId)||modulePage.includes("[2,7,11].includes(moduleNumber)"),name+" laboratory has no module overview entry");
}
const gait=source("components/GaitDemonstration.tsx");
assert(gait.includes("setPlaying")&&gait.includes("setPhase")&&gait.includes("setSpeed"),"Gait animation controls missing");
console.log("Preservation checks: EEG, withdrawal reflex and gait components wired into module routes.");

const eegComponent=source("components/EEGLab.tsx");
const eegModes=["closed","open","eyes","mental","n2","n3"];
for(const mode of eegModes){
  const imageFile=path.join(process.cwd(),"public","images","eeg-verified",mode+".jpg");
  assert(fs.existsSync(imageFile),"Missing EEG patient photograph: "+imageFile);
  assert(fs.statSync(imageFile).size>1024,"EEG photograph suspiciously small: "+imageFile);
}
assert(eegComponent.includes('/images/eeg-verified/${mode}.jpg'),"EEG patient image mode wiring missing");
console.log("EEG image preservation: six referenced patient photographs exist and are nonempty.");

const studyContent=source("components/StudyContent.tsx");
assert(studyContent.includes('href={source.href} target="_blank" rel="noopener noreferrer"'),"Bibliography external links must be clickable and safe");
const progressContent=source("components/ModuleProgress.tsx");
assert(progressContent.includes("m.nextSection")&&progressContent.includes("m.completion<100"),"Unfinished-module resume navigation missing");
assert(progressContent.includes("75–99%")&&progressContent.includes("50–74%"),"Progress color legend missing");
console.log("Author UX audit: bibliography links, resume navigation and progress legend present.");

const authorVisual=source("components/AuthorRestoredVisuals.tsx");
assert(moduleSectionPage.includes("<AuthorRestoredVisuals moduleId={moduleNumber} language={lang} />"),"Restored author visuals are not connected to theory");
for(const language of ["ru","en","kz"]){
  assert(fs.existsSync(path.join(process.cwd(),"public","images","neuro-atlas-"+language+".png")),"Missing restored neuro-atlas "+language);
}
for(let id=1;id<=10;id++){
  const file="module-"+String(id).padStart(2,"0")+".webp";
  const full=path.join(process.cwd(),"public","images","neuro-modules",file);
  assert(fs.existsSync(full),"Missing restored module visual "+file);
  assert(fs.statSync(full).size>1024,"Restored module visual is suspiciously small "+file);
}
console.log("Author visual preservation: trilingual atlas and restored module 1-10 imagery are present and wired to theory.");

const specializedLabs=[
[2,"EEGLab"],[3,"NerveFiberLab"],[4,"MembraneElectrophysiologyLab"],[5,"SynapseExperimentLab"],[6,"IntegrationExperimentLab"],[7,"ReflexLab"],[8,"PathwayLab"],[9,"SpinalRegulationLab"],[10,"BrainstemLab"],[11,"MotorControlLab"],[12,"BasalGangliaLab"],[13,"CerebellumLab"],[14,"ThalamusLab"],[15,"HypothalamusLab"],[16,"LimbicLab"],[17,"AmygdalaLab"],[18,"CortexLab"],[19,"SomatosensoryLab"],[20,"VisionLab"],[21,"SensorySystemsLab"],[22,"AutonomicLab"],[23,"LearningMemoryLab"],[24,"SleepRhythmLab"],[25,"PlasticityLab"]
];
for(const [moduleId,component] of specializedLabs){
  assert(moduleSectionPage.includes("<"+component+" language={lang}"),"Module "+moduleId+" specialized laboratory not connected: "+component);
  assert(fs.existsSync(path.join(process.cwd(),"components",component+".tsx")),"Missing specialized laboratory component "+component);
}
for(let id=15;id<=18;id++){
  assert(fs.existsSync(path.join(process.cwd(),"app","module-"+id+"-lab","page.tsx")),"Missing preserved standalone module "+id+" lab");
}
console.log("Laboratory preservation: specialized module labs 2-25 and preserved standalone labs 15-18 are present.");

assert(moduleSectionPage.includes("(section === 'theory' || section === 'practice' || section === 'media')"),"Curated visuals are not exposed across theory practice and media");
assert(moduleSectionPage.includes("<FoundationVisual moduleId={moduleNumber} language={lang} />"),"Foundation visual block missing");
assert(moduleSectionPage.includes("<AnatomyReference moduleId={moduleNumber} language={lang} />"),"Anatomy reference block missing");
assert(moduleSectionPage.includes("<AdvancedAnatomyReference moduleId={moduleNumber} language={lang} />"),"Advanced anatomy block missing");
const virtualPatient=source("components/UnifiedVirtualPatient.tsx");
assert(virtualPatient.includes("moduleId")&&virtualPatient.includes("visual"),"Unified virtual patient visual support missing");
console.log("Visual route preservation: theory, practice and media expose curated anatomy; virtual-patient visual support remains connected.");

for(const language of ["ru","en","kz"]){
  const m1=source("content/modules/1/theory/"+language+".ts");
  const examples=(m1.match(/Example:|Мысал:|Пример:/g)||[]).length;
  assert(examples>=8,"Module 1 nervous-system functions lack eight localized examples in "+language);
}
console.log("Module 1 theory audit: eight nervous-system functions have localized physiological examples in RU EN KZ.");
