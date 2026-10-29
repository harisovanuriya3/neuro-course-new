#!/usr/bin/env node
// Read-only inventory. This is not a substitute for clinical, visual, or browser review.
const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const read = p => fs.readFileSync(path.join(root,p),"utf8");
const gallery = read("components/TeacherVideoGallery.tsx");
const patient = read("components/VirtualPatientVisual.tsx");
const exam = read("components/ExamCenter.tsx");
const eeg = read("components/UnifiedVirtualPatient.tsx");
const clipEntries = [...gallery.matchAll(/^\s*(\d+):\s*\[([\s\S]*?)^\s*\],?/gm)];
const videosByModule = {};
for (const [,id,body] of clipEntries) {
  const files = [...body.matchAll(/file:\s*["']([^"']+\.mp4)["']/g)].map(m=>m[1]);
  videosByModule[id] = files.map(file=>({file, exists:fs.existsSync(path.join(root,"public/media/teacher",file))}));
}
const uniqueClipFiles = [...new Set(Object.values(videosByModule).flatMap(files => files.map(x => x.file)))];
const visualModules = [...patient.matchAll(/^\s*(\d+):\s*\{kind:/gm)].map(m=>Number(m[1]));
const modules = Array.from({length:25},(_,i)=>i+1);
const report = {
  note:"Static inventory only. Other media sources may exist. No conclusions about clinical accuracy, browser playback, or image realism.",
  teacherVideoGallery: {
    mappedModules:modules.filter(id=>videosByModule[id]),
    unmappedModules:modules.filter(id=>!videosByModule[id]),
    clipsByModule:videosByModule,
    uniqueReferencedClipFiles:uniqueClipFiles.length,
    duplicateClipReferences:Object.entries(videosByModule).flatMap(([moduleId,files])=>files.filter(x=>Object.values(videosByModule).flat().filter(y=>y.file===x.file).length>1).map(x=>({moduleId,file:x.file}))),
    missingReferencedFiles:Object.entries(videosByModule).flatMap(([moduleId,files])=>files.filter(x=>!x.exists).map(x=>({moduleId,...x})))
  },
  virtualPatientDiagram:{
    configuredModules:visualModules,
    missingModules:modules.filter(id=>!visualModules.includes(id)),
    note:"SVG diagram configuration is not evidence of realistic anatomical imagery."
  },
  examCenter:{componentPresent:exam.includes("export default"), questionTypes:["mcq","written","sequence"].filter(x=>exam.includes(x))},
  eeg:{virtualPatientComponentPresent:eeg.includes("VirtualPatientVisual"), note:"Preserve existing EEG demonstration and its assets during changes."}
};
console.log(JSON.stringify(report,null,2));
if(process.argv.includes("--strict") && report.teacherVideoGallery.missingReferencedFiles.length)process.exitCode=1;
