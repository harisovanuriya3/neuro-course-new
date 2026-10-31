const assert = require("node:assert/strict");
const { load } = require("./check-tests.cjs");

const { getLesson } = load("content/index.ts");
const expectedSectionIds = [
  "learning-goals",
  "chemical-transmission",
  "receptors",
  "integration-modulation",
  "signal-termination",
  "synapse-types",
  "methods-clinic",
  "synthesis-reading",
  "quantal-release-paired-pulse",
];
const requiredMechanisms = {
  RU: ["Ca²⁺", "SNARE", "ионотроп", "шунтирующ", "ботулинический токсин"],
  EN: ["Ca²⁺", "SNARE", "ionotropic", "shunting", "botulinum toxin"],
  KZ: ["Ca²⁺", "SNARE", "ионотроп", "шунттаушы", "Ботулин токсині"],
};

for (const language of ["RU", "EN", "KZ"]) {
  const lesson = getLesson(5, "theory", language);
  assert.equal(lesson?.kind, "theory", `Module 5 ${language}: localized theory is registered`);

  const ids = lesson.sections.map(section => section.id);
  assert(expectedSectionIds.every(id => ids.includes(id)), `Module 5 ${language}: all original nine sections are preserved`);
  assert(ids.includes("quantal-calcium-plasticity"), `Module 5 ${language}: expanded synaptic physiology missing`);
  assert.equal(new Set(ids).size, ids.length, `Module 5 ${language}: section anchors are unique`);
  assert(lesson.sections.every(section => section.blocks.length > 0), `Module 5 ${language}: every section contains learning blocks`);
  const sectionContent = lesson.sections.map(section => JSON.stringify(section.blocks));
  assert.equal(new Set(sectionContent).size, sectionContent.length, `Module 5 ${language}: section learning blocks are not duplicated`);
  assert(lesson.outcomes.items.length >= 7, `Module 5 ${language}: measurable learning outcomes are present`);
  assert(lesson.terms.items.length >= 10, `Module 5 ${language}: core terminology is present`);

  const text = lesson.sections.flatMap(section => [
    section.title,
    ...section.blocks.flatMap(block => block.type === "list" ? block.items : [block.text ?? block.title]),
  ]).join(" ");
  assert(text.length > 5000, `Module 5 ${language}: theory contains chapter-level detail`);
  for (const mechanism of requiredMechanisms[language]) {
    assert(text.toLowerCase().includes(mechanism.toLowerCase()), `Module 5 ${language}: missing ${mechanism}`);
  }
  assert(text.includes("Guyton") && text.includes("Kandel"), `Module 5 ${language}: further reading is included`);
  console.log(`Module 5 ${language}: 9 sections, unique learning blocks, outcomes, mechanisms, clinical links, and references OK`);
}
