const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const page = fs.readFileSync(path.join(root, "app/resources/page.tsx"), "utf8");
const home = fs.readFileSync(path.join(root, "app/page.tsx"), "utf8");
const modulePage = fs.readFileSync(path.join(root, "app/modules/[id]/page.tsx"), "utf8");
const course = fs.readFileSync(path.join(root, "content/course.ts"), "utf8");

for (const component of [
  "OrganizationAnimation",
  "FoundationMediaAnimation",
  "AnatomyReference",
  "AdvancedAnatomyReference",
  "FoundationVisual",
]) {
  assert(page.includes(component), `Resource library must include ${component}`);
}

for (const section of ["media", "interactive", "virtual-patient"]) {
  assert(page.includes(`/modules/\${moduleId}/${section}?lang=\${lang}`), `Resource library must link to every module's ${section} section`);
}

assert(page.includes("modules[lang].map"), "Resource library must derive all cards from the localized 25-module registry");
assert(page.includes('id={\`module-\${moduleId}\`}'), "Each module must expose a stable resource-library anchor");
assert(home.includes("/resources?lang="), "Course home must link to resource library");
assert(modulePage.includes("/resources?lang=") && modulePage.includes("#module-"), "Every module must link back to its library entry");

const languageArrays = [...course.matchAll(/(?:RU|KZ|EN):\s*\[([\s\S]*?)\]/g)];
assert.equal(languageArrays.length, 3, "Course registry must retain RU/KZ/EN module arrays");
for (const [, body] of languageArrays) {
  assert.equal((body.match(/"/g) || []).length / 2, 25, "Each language must retain 25 module titles");
}

const interactiveVisuals = fs.readFileSync(path.join(root, "components/InteractiveVisuals.tsx"), "utf8");
const foundationVisual = fs.readFileSync(path.join(root, "components/FoundationVisual.tsx"), "utf8");
assert(!interactiveVisuals.includes('src="/images/anatomy/brain-spinal-cord.jpg"'), "Organization visual must not duplicate the specimen shown below");
assert(!foundationVisual.includes("brain-spinal-cord.jpg"), "Modules 10 and 18 must use their specific anatomy references instead of the generic specimen");

console.log("Resource library validation passed: 25 localized module entries with animation, anatomy, laboratory, and virtual-patient routes.");
