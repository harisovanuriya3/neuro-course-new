const assert=require("node:assert/strict");
const fs=require("node:fs");
const path=require("node:path");
const root=path.resolve(__dirname,"..");
const read=relative=>fs.readFileSync(path.join(root,relative),"utf8");

const patients=read("content/virtual-patients.ts");
for(const generic of ["Новый факт:","New finding:","Жаңа дерек:","соблюдает ли граница вертикальный меридиан","respects the vertical meridian"]){
 assert(!patients.includes(generic),`generic or unexplained virtual-patient wording remains: ${generic}`);
}
for(const localized of ["Наблюдение на этом этапе:","Observation at this stage:","Осы кезеңдегі бақылау:"]){
 assert(patients.includes(localized),`localized observation-first wording is missing: ${localized}`);
}

const route=read("app/modules/[id]/[section]/page.tsx");
const specialized={2:"EEGLab",3:"NerveFiberLab",4:"MembraneElectrophysiologyLab",5:"SynapseExperimentLab",6:"IntegrationExperimentLab",7:"ReflexLab",8:"PathwayLab",9:"SpinalRegulationLab",10:"BrainstemLab",11:"MotorControlLab",12:"BasalGangliaLab",13:"CerebellumLab",14:"ThalamusLab",15:"HypothalamusLab",16:"LimbicLab",17:"AmygdalaLab",18:"CortexLab",19:"SomatosensoryLab",20:"VisionLab",21:"SensorySystemsLab",22:"AutonomicLab",23:"LearningMemoryLab",24:"SleepRhythmLab",25:"PlasticityLab"};
for(const [moduleId,component] of Object.entries(specialized)){
 assert(route.includes(`<${component}`),`Module ${moduleId} is missing its specialized interactive ${component}`);
}
const moduleOneInteractive=read("content/modules/1/interactive.ts");
assert(moduleOneInteractive.includes("organization:")&&moduleOneInteractive.includes("pathway:"),"Module 1 interactive entry is missing");
assert(read("components/FoundationVirtualPatient.tsx").includes("moduleId===20&&<VisualPathwayLocalizer"),"Module 20 visual pathway localizer is not connected to the patient scenario");
console.log("Activity-clarity validation passed: observation-first virtual-patient prompts are localized, Module 20 explains visual-field localization, and all 25 modules retain a topic-specific interactive entry.");
