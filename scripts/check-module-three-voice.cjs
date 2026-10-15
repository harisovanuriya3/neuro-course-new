// Module 3 voice self-assessment source-level contract (not a speech/browser test).
// Run: node scripts/check-module-three-voice.cjs
const fs = require("node:fs");
const assert = require("node:assert/strict");
const src = fs.readFileSync("components/VoiceContent.tsx","utf8");
const route = fs.readFileSync("app/modules/[id]/[section]/page.tsx","utf8");
assert(src.includes("moduleId===3 ? {...copy[language],...moduleThreeCopy[language]}"),
  "Module 3 voice must select subject-specific copy");
assert(route.includes("<VoiceContent language={lang} moduleId={moduleNumber} />"),
  "Voice page must render VoiceContent with module ID and language");
for (const label of ["RU: {","EN: {","KZ: {"]) {
  assert(src.includes(label),"Missing language block "+label);
}
for (const phrase of [
  "утрата миелина","demyelination","демиелиндену",
  "перехватами Ранвье","nodes of Ranvier","Ранвье түйіндері",
  "инактивировать Na⁺-каналы","inactivate Na⁺ channels","Na⁺ арналарын инактивациялауы",
  "модель не ставит диагноз","model cannot diagnose a patient","модель диагноз қоймайтынын",
]) assert(src.includes(phrase),"Missing physiology/scope marker: "+phrase);
assert(src.includes("This is a structure self-check, not an automatic knowledge grade."),
  "Voice self-check must not claim to grade scientific correctness");
assert(src.includes("disabled={answer.trim().length<12}"),
  "Empty/very short explanation must not be submitted");
console.log("PASS: module 3 voice physiology and self-check scope, RU/EN/KZ source markers.");
console.log("NOTE: source checks cannot validate actual speech recognition or browser storage.");
