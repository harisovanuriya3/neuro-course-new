const assert = require("node:assert/strict");
const { load } = require("./check-tests.cjs");

const { createInteractiveLesson } = load("content/modules/1/interactive.ts");
const expected = {
  organization: ["brain", "spinal", "nerves", "ganglia", "endings"],
  pathway: ["receptor", "afferent", "center", "efferent", "effector", "feedback"],
  chemical: ["arrival", "calcium", "transmitter", "binding", "response"],
  electrical: ["cell", "junction", "coupled"],
};

function ids(nodes) { return nodes.map(node => node.id); }
function validateNodes(nodes, required, context) {
  const actual = ids(nodes);
  assert.deepEqual(actual, required, `${context}: node/control ids do not match the visual model`);
  assert.equal(new Set(actual).size, actual.length, `${context}: duplicate node id`);
  assert(nodes[0], `${context}: default selected node is missing`);
  for (const node of nodes) {
    assert(node.label.trim(), `${context}/${node.id}: empty label`);
    assert(node.explanation.trim(), `${context}/${node.id}: empty explanation`);
  }
  for (const controlId of required) assert(nodes.some(node => node.id === controlId), `${context}: control ${controlId} has no node`);
}

for (const language of ["RU", "EN", "KZ"]) {
  const lesson = createInteractiveLesson(language);
  validateNodes(lesson.organization.groups.flatMap(group => group.nodes), expected.organization, `${language}/organization`);
  validateNodes(lesson.pathway.nodes, expected.pathway, `${language}/pathway`);
  assert.deepEqual(lesson.synapse.modes.map(mode => mode.id), ["chemical", "electrical"], `${language}: synapse modes`);
  for (const mode of lesson.synapse.modes) validateNodes(mode.nodes, expected[mode.id], `${language}/synapse/${mode.id}`);
}

console.log("Interactive validation passed: organization, pathway, chemical and electrical modes in RU/EN/KZ.");
