const assert = require('node:assert/strict');
const { load } = require('./check-tests.cjs');
const { topics } = load('content/course-foundation/topics.ts');
const { createFoundationTest } = load('content/course-foundation/assessment.ts');
const { validateTest } = load('lib/tests/engine.ts');
const fs = require('node:fs');
const adapterSource = fs.readFileSync('content/course-foundation/assessment.ts', 'utf8');
for (const id of [8,9,10,11,12,13,14]) {
  assert.match(adapterSource, new RegExp('topic\\.id===' + id + ' \\? adaptModule'), `Module ${id}: missing authored test adapter route`);
}
for (const topic of topics) for (const language of ['RU', 'EN', 'KZ']) {
  const test = createFoundationTest(topic, language, String(topic.id));
  validateTest(test);
  const hints = Object.values(test.nodes).filter(n => n.type === 'remediation' && n.depth === 1);
  assert.equal(new Set(hints.map(n => n.text)).size, 5, 'Five skill-specific hints required');
  for (const node of Object.values(test.nodes)) {
    if (node.type === 'question') {
      // Modules 8–14 have separately audited, topic-specific test adapters.
      // Their explanations intentionally replace the generic foundation copy.
      if ([8,9,10,11,12,13,14].includes(topic.id)) {
        assert(node.explanation.trim().length >= 50,
          `${topic.id}/${language}/${node.id}: authored explanation is missing`);
        assert(!/^(correct|верно|дұрыс)[.! ]*$/i.test(node.explanation.trim()),
          `${topic.id}/${language}/${node.id}: feedback must explain the mechanism`);
      } else {
        assert([topic.mechanism[language], topic.interpretation[language]].includes(node.explanation),
          `${topic.id}/${language}/${node.id}: post-answer feedback must explain the topic`);
      }
      assert(node.options.some(o => o.id === node.correctAnswer), 'Preserve answer keys');
    }
    if (node.type === 'remediation' && node.depth === 2) {
      if ([8,9,10,11,12,13,14].includes(topic.id))
        assert(node.text.trim().length >= 50,
          `${topic.id}/${language}/${node.id}: second support must explain the mechanism`);
      else
        assert.equal(node.text, topic.mechanism[language], 'Second support must provide the mechanism');
    }
  }
}
console.log('PASS: 24 assessments × RU/EN/KZ: branching engine, keys, foundation feedback and subject-specific adapter feedback.');
