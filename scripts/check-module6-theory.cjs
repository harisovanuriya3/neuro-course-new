const assert = require("node:assert/strict");
const { load } = require("./check-tests.cjs");

const { getLesson } = load("content/index.ts");
const requiredMechanisms = {
  RU: ["ВПСП", "шунтирующ", "временная суммация", "Feedforward inhibition"],
  EN: ["EPSP", "shunting", "temporal summation", "Feedforward inhibition"],
  KZ: ["ҚПСП", "шунттаушы", "Уақыттық суммация", "Feedforward тежелу"],
};

for (const language of ["RU", "EN", "KZ"]) {
  const lesson = getLesson(6, "theory", language);
  assert.equal(lesson?.kind, "theory", `Module 6 ${language}: localized theory is registered`);
  assert.equal(lesson.sections.length, 8, `Module 6 ${language}: all eight theory sections are present`);
  const ids = lesson.sections.map(section => section.id);
  assert.equal(new Set(ids).size, ids.length, `Module 6 ${language}: section anchors are unique`);
  assert(lesson.outcomes.items.length >= 7, `Module 6 ${language}: measurable learning outcomes are present`);
  assert(lesson.terms.items.length >= 10, `Module 6 ${language}: core terminology is present`);

  const text = lesson.sections.flatMap(section => [
    section.title,
    ...section.blocks.flatMap(block => block.type === "list" ? block.items : [block.text ?? block.title]),
  ]).join(" ");
  assert(text.length > 5000, `Module 6 ${language}: theory contains chapter-level detail`);
  for (const mechanism of requiredMechanisms[language]) {
    assert(text.toLowerCase().includes(mechanism.toLowerCase()), `Module 6 ${language}: missing ${mechanism}`);
  }
  assert(text.includes("Guyton") && text.includes("Kandel"), `Module 6 ${language}: further reading is included`);
  console.log(`Module 6 ${language}: 8 sections, learning outcomes, network mechanisms, and references OK`);
}
