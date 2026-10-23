const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.resolve(__dirname, "..");
const component = fs.readFileSync(path.join(root, "components", "EvokedPotentialInfographic.tsx"), "utf8");
const media = fs.readFileSync(path.join(root, "components", "TheoryMedia.tsx"), "utf8");
const sources = fs.readFileSync(path.join(root, "public", "images", "module2", "SOURCES.md"), "utf8");
const imagePaths = [
  "/images/module2/evoked-averaging-ru.png",
  "/images/module2/evoked-averaging-en.png",
  "/images/module2/evoked-averaging-kz.png",
];

for (const imagePath of imagePaths) {
  const file = path.join(root, "public", imagePath.slice(1));
  assert(fs.existsSync(file), `Missing localized infographic: ${imagePath}`);
  const signature = fs.readFileSync(file).subarray(0, 8);
  assert.deepEqual(signature, Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), `${imagePath} is not a valid PNG`);
  assert(sources.includes(path.basename(file)), `Missing source record for ${imagePath}`);
}

assert.equal(new Set(imagePaths.map(image => path.basename(image))).size, 3, "Each language has a separate image");
assert(component.includes("1/√N"), "The localized caption explains the signal-to-noise relationship");
assert(component.includes("stimulus-locked artifact"), "The localized caption warns about synchronized artifacts");
assert(component.includes("#evoked-method"), "The figure links directly to the related theory");
assert(component.includes("#evoked-averaging-lab"), "The figure links directly to the relevant laboratory");
assert(media.includes('moduleId === 2 && <EvokedPotentialInfographic'), "The image is restricted to Module 2 theory media");
assert(sources.includes("user authorized inclusion"), "User authorization is recorded");

console.log("Evoked-potential infographics: three localized assets, attribution records, scientific caption, and module links OK.");
