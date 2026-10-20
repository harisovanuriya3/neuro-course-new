const assert = require('node:assert/strict');
const { load } = require('./check-tests.cjs');
const { topics } = load('content/course-foundation/topics.ts');
const { createFoundationTest } = load('content/course-foundation/assessment.ts');
const { validateTest } = load('lib/tests/engine.ts');
for (const topic of topics) for (const language of ['RU', 'EN', 'KZ']) {
  const test = createFoundationTest(topic, language, String(topic.id));
  validateTest(test);
  const hints = Object.values(test.nodes).filter(n => n.type === 'remediation' && n.depth === 1);
  assert.equal(new Set(hints.map(n => n.text)).size, 5, 'Five skill-specific hints required');
  for (const node of Object.values(test.nodes)) {
    if (node.type === 'question') {
      assert([topic.mechanism[language], topic.interpretation[language]].includes(node.explanation),
        `${topic.id}/${language}/${node.id}: post-answer feedback must explain the topic`);
      assert(node.options.some(o => o.id === node.correctAnswer), 'Preserve answer keys');
    }
    if (node.type === 'remediation' && node.depth === 2)
      assert.equal(node.text, topic.mechanism[language], 'Second support must provide the mechanism');
  }
}
console.log('PASS: 24 foundation assessments × RU/EN/KZ: branching engine, keys, skill-specific hints and topic feedback.');
