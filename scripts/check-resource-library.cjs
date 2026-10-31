const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const page = fs.readFileSync(path.join(root, "app/resources/page.tsx"), "utf8");
const home = fs.readFileSync(path.join(root, "app/page.tsx"), "utf8");
const modulePage = fs.readFileSync(path.join(root, "app/modules/[id]/page.tsx"), "utf8");
const sectionPage = fs.readFileSync(path.join(root, "app/modules/[id]/[section]/page.tsx"), "utf8");
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

for (const section of ["theory", "practice", "media", "interactive", "virtual-patient"]) {
  assert(page.includes(`/modules/\${moduleId}/${section}?lang=\${lang}`), `Resource library must link to every module's ${section} section`);
}

const walkthroughs = fs.readFileSync(path.join(root, "content/media-walkthroughs.ts"), "utf8");
const mediaComponent = fs.readFileSync(path.join(root, "components/FoundationMediaAnimation.tsx"), "utf8");
for (let moduleId = 2; moduleId <= 25; moduleId += 1) {
  assert(new RegExp("^\\s*" + moduleId + ":t\\(", "m").test(walkthroughs), `Module ${moduleId} must have its own authored physiological walkthrough`);
}
assert(mediaComponent.includes("mediaWalkthroughs[moduleId]?.[language]"), "Walkthrough must use module-specific localized content");
assert(page.includes("t.walkthrough"), "Resource library must distinguish walkthroughs from actual animations");

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

const anatomyReference = fs.readFileSync(path.join(root, "components/AnatomyReference.tsx"), "utf8");
const advancedAnatomyReference = fs.readFileSync(path.join(root, "components/AdvancedAnatomyReference.tsx"), "utf8");
const anatomyIds = new Set(
  [...anatomyReference.matchAll(/^\s*(\d+):\s*[\[{]/gm), ...advancedAnatomyReference.matchAll(/^\s*(\d+):\s*[\[{]/gm)]
    .map((match) => Number(match[1])),
);
for (let moduleId = 1; moduleId <= 25; moduleId += 1) {
  assert(anatomyIds.has(moduleId), `Module ${moduleId} must retain a module-specific anatomy reference`);
}
const visualFiles = [
  ...anatomyReference.matchAll(/file:\s*"([^"]+)"/g),
  ...advancedAnatomyReference.matchAll(/file:\s*"([^"]+)"/g),
].map((match) => match[1]);
assert.equal(visualFiles.length, new Set(visualFiles).size, "Anatomy registries must not repeat the same image file");
assert(visualFiles.length >= 50, "The 25 modules must retain a rich set of at least 50 unique curated visuals");
assert(sectionPage.includes("section === 'theory' || section === 'practice'"), "Curated visuals must appear in both theory and practice");
for (const file of ["Peripheral_nerve,_cross_section.jpg", "Spatial_summation.svg", "Spinal_cord_tracts_-_English.svg"]) {
  assert(anatomyReference.includes(file), `Anatomy registry must retain ${file}`);
}

console.log(`Resource library validation passed: 25 localized modules, ${visualFiles.length} unique curated visuals, theory/practice placement, laboratory and virtual-patient routes.`);
