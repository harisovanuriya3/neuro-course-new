// Source-only regression check for the module 4 teaching simulation.
const fs=require('node:fs');
const assert=require('node:assert/strict');
const src=fs.readFileSync('components/MembraneElectrophysiologyLab.tsx','utf8');
for(const phrase of ['two-ion Goldman approximation','двухионное приближение Goldman','екі ионды Goldman жуықтауы','setPrediction(null)','c.resume','running?c.pause:c.resume']){
 assert(src.includes(phrase),'Missing: '+phrase);
}
assert(!src.includes('M20 72H570'),'Do not imply a calibrated voltage threshold');
const route=fs.readFileSync('app/modules/[id]/[section]/page.tsx','utf8');
assert(route.includes('<MembraneElectrophysiologyLab language={lang} />'),'Module 4 route missing');
console.log('PASS: module 4 lab disclosures, reset, resume, and route');
