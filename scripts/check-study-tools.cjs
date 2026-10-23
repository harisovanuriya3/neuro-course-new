const assert = require('node:assert/strict');
const { load } = require('./check-tests.cjs');
const { searchCourse, normalizeSearch } = load('lib/courseSearch.ts');
const { modules } = load('content/course.ts');
const { newTimer, restoreTimer, remainingTime } = load('lib/studyTimer.ts');
const { eegSignal } = load('lib/eegSignal.ts');
const { restoreUnifiedPatient, emptyUnifiedPatient } = load('lib/unifiedPatientState.ts');
const { getVirtualPatientScenario } = load('content/virtual-patients.ts');
for (let id = 1; id <= 25; id++) {
  const reference = getVirtualPatientScenario(id, 'RU');
  for (const language of ['RU', 'KZ', 'EN']) {
    const scenario = getVirtualPatientScenario(id, language);
    assert.equal(scenario.stages.length, 6);
    assert.equal(new Set(scenario.stages.map(stage => stage.id)).size, 6);
    scenario.stages.forEach((stage, index) => {
      assert.equal(stage.id, reference.stages[index].id);
      assert.equal(stage.correctOption, reference.stages[index].correctOption);
      assert.equal(stage.options.length, 3);
      assert.equal(new Set(stage.options.map(option => option.id)).size, 3);
      for (const key of ['situation','newData','task','mentorPrompt','mechanism']) assert(stage[key].trim());
      stage.options.forEach((option, choice) => {
        assert.equal(option.id, reference.stages[index].options[choice].id);
        assert(option.text.trim() && option.feedback.trim() && option.response.trim());
      });
    });
  }
}
assert.deepEqual(restoreUnifiedPatient('{'), emptyUnifiedPatient());
const damaged = restoreUnifiedPatient(JSON.stringify({ current: 2.5, unlocked: 99, selected: [99, -1, 0], notes: ['x', null] }));
assert.equal(damaged.current, 0); assert.equal(damaged.unlocked, 0); assert.equal(damaged.selected[0], null);
const attempt = { current: 1, unlocked: 1, selected: [2,null,null,null,null,null], notes: ['A valid explanation here','','','','',''] };
assert.deepEqual(restoreUnifiedPatient(JSON.stringify(attempt)), attempt);
for (const language of ['RU', 'KZ', 'EN']) {
  modules[language].forEach((title, index) => {
    const results = searchCourse(title.toUpperCase(), language);
    assert.equal(results[0].href, `/modules/${index + 1}?lang=${language}`);
    assert(results.every(result => result.href.endsWith(`lang=${language}`)));
    assert.equal(new Set(results.map(result => result.href)).size, results.length);
  });
}
assert(searchCourse('Na⁺', 'RU').some(result => result.href.includes('/4/theory')));
assert(searchCourse('гиппокамп', 'RU').some(result => result.href.includes('/23/')));
assert.deepEqual(searchCourse('  ', 'EN'), []);
assert.deepEqual(searchCourse('zzzznotacourseterm', 'EN'), []);
assert.deepEqual(searchCourse('<script>.*[', 'RU'), []);
assert.equal(normalizeSearch('  МОЗЖЁЧОК  '), 'мозжечок');
const base = newTimer(5);
assert.equal(base.remaining, 300000);
const running = { ...base, deadline: 1000000 };
assert.equal(remainingTime(running, 940000), 60000);
assert.equal(remainingTime(restoreTimer(JSON.stringify(running)), 1000001), 0);
assert.equal(remainingTime({ ...base, remaining: 72000 }, 99999999), 72000);
for (const raw of ['{', 'null', '{"version":1,"duration":-1}', '{"version":2}']) assert.deepEqual(restoreTimer(raw), newTimer());
for (const state of ['closed','open','arithmetic','n1','n2','n3','rem']) {
  const signal = eegSignal(state, 10, 45, false);
  assert.equal(signal.length, 1537);
  assert.equal(signal.at(-1).time, 6);
  assert(signal.every(point => Number.isFinite(point.voltage)));
  assert.notDeepEqual(signal, eegSignal(state, 10, 45, true));
  assert.notDeepEqual(signal, eegSignal(state, 12, 45, false));
  const doubled = eegSignal(state, 10, 90, false);
  signal.forEach((point, index) => assert(Math.abs(doubled[index].voltage - 2 * point.voltage) < 1e-9));
}
console.log('Study tools passed: 75 ranked module searches, body terms, Unicode, empty/hostile queries, timer restore/expiry/pause and 7 deterministic EEG states.');
