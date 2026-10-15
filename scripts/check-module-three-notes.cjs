// Notes and bookmarks: functional storage contract + localized UI/source checks.
// Run after npm ci: node scripts/check-module-three-notes.cjs
const fs = require("node:fs");
const vm = require("node:vm");
const assert = require("node:assert/strict");
const ts = require("typescript");
const read = p => fs.readFileSync(p, "utf8");
const notesSource = read("lib/moduleNotes.ts");
const sectionSource = read("content/sections.ts");
const slugs = [...sectionSource.matchAll(/slug: "([^"]+)"/g)].map(m => m[1]);
assert.equal(slugs.length, 17, "Expected 17 note destinations");
const valid = new Set(slugs);
const transpiled = ts.transpileModule(notesSource, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
}).outputText;
const values = new Map();
let failWrites = false;
const storage = {
  getItem: key => values.get(key) ?? null,
  setItem: (key, value) => { if (failWrites) throw Error("quota"); values.set(key, value); }
};
const module = { exports: {} };
vm.runInNewContext(transpiled, {
  module, exports: module.exports,
  require: name => {
    assert.equal(name, "../content/sections", "Unexpected import in notes storage");
    return { isSection: name => valid.has(name) };
  },
  localStorage: storage,
});
const { emptyModuleNotes, readModuleNotes, saveModuleNotes } = module.exports;
assert.deepEqual(Array.from(readModuleNotes(3).bookmarks), []);
assert.deepEqual(Object.keys(emptyModuleNotes().notes), []);
assert.equal(saveModuleNotes(3, { bookmarks: ["theory"], notes: { theory: "Axon initial segment" } }), true);
assert.equal(readModuleNotes(3).notes.theory, "Axon initial segment");
assert.deepEqual(Array.from(readModuleNotes(3).bookmarks), ["theory"]);
assert.deepEqual(Array.from(readModuleNotes(4).bookmarks), [], "Modules must be isolated");
values.set("neuro-course:module-3:notes:v1", JSON.stringify({
  bookmarks: ["theory", "theory", "fake"],
  notes: { theory: "x".repeat(6000), fake: "bad" }
}));
const cleaned = readModuleNotes(3);
assert.deepEqual(Array.from(cleaned.bookmarks), ["theory"]);
assert.equal(cleaned.notes.theory.length, 5000);
assert.equal(cleaned.notes.fake, undefined);
failWrites = true;
assert.equal(saveModuleNotes(3, { bookmarks: [], notes: {} }), false, "Quota failure must be reported");
failWrites = false;
values.set("neuro-course:module-3:notes:v1", "{corrupt");
assert.deepEqual(Array.from(readModuleNotes(3).bookmarks), [], "Corrupt storage must not crash page");

const notesUI = read("components/NotesContent.tsx");
const bookmarkUI = read("components/BookmarkCurrent.tsx");
assert(notesUI.includes('useState<"idle" | "saved" | "failed">("idle")'), "No success notice before an edit");
assert(notesUI.includes('setSaveStatus(saveModuleNotes(moduleId,next) ? "saved" : "failed")'), "Write result must control status");
assert(bookmarkUI.includes("if (saved) setBookmarked(next);"), "Failed bookmark writes must not appear saved");
assert(bookmarkUI.includes('window.addEventListener("storage", onStorage)'), "Other tabs must refresh bookmark state");
for (const value of ["Не записывайте персональные данные пациентов", "Do not enter identifiable patient information", "Пациенттердің жеке деректерін енгізбеңіз"])
  assert(notesUI.includes(value), "Missing privacy guidance: " + value);
for (const value of ["Закладка не сохранена", "Bookmark not saved", "Бетбелгі сақталмады"])
  assert(bookmarkUI.includes(value), "Missing failed-save translation: " + value);

const references = read("content/index.ts");
assert(!references.includes("Ghai experiment 2-31"), "Figure 2-31 must not be called experiment 2-31");
assert(!references.includes("Ghai 2-31-тәжірибе"), "Kazakh figure/experiment confusion");
for (const value of ["рис. 2-30–2-31", "Figs. 2-30–2-31", "2-30–2-31-суреттер"])
  assert(references.includes(value), "Missing verified Ghai figure citation: " + value);
console.log("PASS: 17 note destinations, module isolation, storage failure/corruption, three-language feedback, and Ghai figures.");
console.log("NOTE: React interaction, speech recognition, TypeScript project build and browser storage permissions still require runtime testing.");
