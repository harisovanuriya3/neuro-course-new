const assert = require("node:assert/strict");
const { load } = require("./check-tests.cjs");

const { getLesson } = load("content/index.ts");
const expectedSectionIds = [
  "learning-goals",
  "ionic-gradients",
  "graded-potentials",
  "action-potential",
  "propagation",
  "measurement",
  "regulation-clinic",
  "further-reading",
  "extracellular-potassium-experiment",
  "paired-pulse-refractoriness",
  "hyperkalemia-clinical-bridge",
  "membrane-cable-properties",
];
const requiredMechanisms = {
  RU: ["Na⁺/K⁺-АТФаза", "рефрактер", "миелин", "current clamp", "50–120 м/с"],
  EN: ["Na⁺/K⁺-ATPase", "refractory", "myelin", "current clamp", "50–120 m/s"],
  KZ: ["Na⁺/K⁺-АТФаза", "рефрактер", "миелин", "current clamp", "50–120 м/с"],
};

for (const language of ["RU", "EN", "KZ"]) {
  const lesson = getLesson(4, "theory", language);
  assert.equal(lesson?.kind, "theory", `Module 4 ${language}: localized theory is registered`);

  const ids = lesson.sections.map(section => section.id);
  assert(expectedSectionIds.every(id => ids.includes(id)), `Module 4 ${language}: all original 12 theory sections must be preserved`);
  for (const id of ["ion-gradient-thermodynamics","goldman-resting-potential","voltage-gated-channel-dynamics"]) assert(ids.includes(id), `Module 4 ${language}: expanded chapter ${id} missing`);
  assert.equal(new Set(ids).size, ids.length, `Module 4 ${language}: section anchors are unique`);
  assert(lesson.sections.every(section => section.blocks.length > 0), `Module 4 ${language}: every section contains learning blocks`);
  const sectionContent = lesson.sections.map(section => JSON.stringify(section.blocks));
  assert.equal(new Set(sectionContent).size, sectionContent.length, `Module 4 ${language}: section learning blocks are not duplicated`);
  assert(lesson.outcomes.items.length >= 7, `Module 4 ${language}: measurable learning outcomes are present`);
  assert(lesson.terms.items.length >= 10, `Module 4 ${language}: core terminology is present`);

  const text = lesson.sections.flatMap(section => [
    section.title,
    ...section.blocks.flatMap(block => block.type === "list" ? block.items : [block.text ?? block.title]),
  ]).join(" ");
  assert(text.length > 5000, `Module 4 ${language}: theory contains chapter-level detail`);
  for (const mechanism of requiredMechanisms[language]) {
    assert(text.toLowerCase().includes(mechanism.toLowerCase()), `Module 4 ${language}: missing ${mechanism}`);
  }
  assert(text.includes("Guyton") && text.includes("Kandel"), `Module 4 ${language}: further reading is included`);
  console.log(`Module 4 ${language}: ${ids.length} sections, unique learning blocks, outcomes, methods, clinical links, and references OK`);
}
