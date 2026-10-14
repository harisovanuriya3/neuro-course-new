// Module 3 glossary and media wiring check. Run from repository root:
// node scripts/check-module-three-glossary-media.cjs
// A failure means the content is not ready for release.
const fs = require("node:fs");
const assert = require("node:assert/strict");
const read = path => fs.readFileSync(path, "utf8");

const glossary = read("content/course-foundation/module-three-glossary.ts");
const registry = read("content/index.ts");
const media = read("content/course-foundation/index.ts");
const animation = read("components/FoundationMediaAnimation.tsx");

const keys = [...glossary.matchAll(/\{key:'([^']+)'/g)].map(match => match[1]);
assert.equal(keys.length, 9, "Module 3 requires nine supplementary terms");
assert.equal(new Set(keys).size, 9, "Duplicate glossary entry IDs");
for (const language of ["RU", "EN", "KZ"]) {
  const count = [...glossary.matchAll(new RegExp("\\b" + language + ":\\[", "g"))].length;
  assert.equal(count, 9, "Incomplete " + language + " glossary translations");
}
assert(registry.includes('import { createModuleThreeGlossary }'),
  "Module 3 glossary factory is not imported into the lesson registry");
assert(registry.includes('createModuleThreeGlossary("RU"') &&
       registry.includes('createModuleThreeGlossary("EN"') &&
       registry.includes('createModuleThreeGlossary("KZ"'),
  "Module 3 glossary is not registered for RU, EN and KZ");
assert(media.includes("animation:'foundation'"), "Media animation route changed");
assert(animation.includes("moduleId===3&&"),
  "Module 3 media must label its SVG values as illustrative, not measurements");
console.log("PASS: module 3 glossary and media source-level contracts");
