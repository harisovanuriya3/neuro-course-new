// Node 24+: load TypeScript data in memory without emitting files.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const { stripTypeScriptTypes } = require('node:module');
const assert = require('node:assert/strict');
const cache = new Map();
function load(file) {
  file = path.resolve(__dirname, '..', file);
  if (cache.has(file)) return cache.get(file);
  const module = { exports: {} };
  const names = [];
  let source = stripTypeScriptTypes(fs.readFileSync(file, 'utf8'));
  source = source.replace(/import \{([^}]+)\} from "([^"]+)";/g, (_, imports, from) => `const {${imports.replace(/\bas\b/g, ':')}} = require('${from}');`)
    .replace(/import (\w+) from "([^"]+)";/g, (_, name, from) => `const ${name} = require('${from}').default;`)
    .replace(/export (const|function) (\w+)/g, (_, kind, name) => { names.push(name); return `${kind} ${name}`; })
    .replace(/export default /g, 'module.exports.default = ');
  source += '\n' + names.map(name => `module.exports.${name} = ${name};`).join('\n');
  vm.runInThisContext(`(function(require,module,exports){${source}\n})`, { filename: file })(from => load(path.resolve(path.dirname(file), from) + '.ts'), module, module.exports);
  cache.set(file, module.exports);
  return module.exports;
}

function check() {
  const engine = load('lib/tests/engine.ts');
  for (const language of ['ru', 'kz', 'en']) {
    const test = load(`content/modules/1/tests/${language}.ts`).default;
    const theory = load(`content/modules/1/theory/${language}.ts`).default;
    engine.validateTest(test);
    const anchors = theory.sections.map(section => section.id).filter(Boolean);
    assert.equal(new Set(anchors).size, anchors.length);
    for (const topic of Object.values(test.competencies)) assert(anchors.includes(topic.theoryTarget.anchor));
    const visited = new Set();
    for (const correctLevel of ['main', 'corrective', 'basic', 'never']) {
      let state = engine.initialState(test);
      assert.deepEqual(engine.transition(test, state, { type: 'check' }), state);
      let steps = 0;
      while (state.phase !== 'results') {
        assert(++steps < 200);
        const node = test.nodes[state.current];
        visited.add(node.id);
        if (state.phase === 'question') {
          const answer = node.level === correctLevel ? node.correctAnswer : node.options.find(option => option.id !== node.correctAnswer).id;
          state = engine.transition(test, state, { type: 'select', answer });
          state = engine.transition(test, state, { type: 'check' });
          assert.equal(state.phase, 'feedback');
          assert.equal(state.current, node.id);
          assert.deepEqual(engine.transition(test, state, { type: 'check' }), state);
        } else state = engine.transition(test, state, { type: 'continue' });
      }
      const result = engine.summarize(test, state);
      assert.equal(result.firstCorrect, correctLevel === 'main' ? 10 : 0);
      assert.equal(result.mastered, correctLevel === 'never' ? 0 : 10);
      if (correctLevel !== 'main') {
        state = engine.transition(test, state, { type: 'retry' });
        assert(state.retryIds.length > 0);
        while (state.phase !== 'results') {
          const node = test.nodes[state.current];
          state = engine.transition(test, state, { type: 'select', answer: node.correctAnswer });
          state = engine.transition(test, state, { type: 'check' });
          state = engine.transition(test, state, { type: 'continue' });
        }
        assert(state.retryAttempts.every(attempt => attempt.correct));
        assert.deepEqual(engine.summarize(test, state), result);
        assert.deepEqual(engine.transition(test, state, { type: 'retry' }), state);
      }
      assert.deepEqual(engine.transition(test, state, { type: 'restart' }), engine.initialState(test));
    }
    assert.equal(visited.size, Object.keys(test.nodes).length);
    const broken = structuredClone(test);
    broken.nodes[broken.start].onCorrect = broken.start;
    assert.throws(() => engine.validateTest(broken), /Cycle/);
    console.log(`${language}: graph, all branches, feedback, retry, results and theory anchors OK (${visited.size} nodes)`);
  }
}
module.exports = { load };
if (require.main === module) check();
