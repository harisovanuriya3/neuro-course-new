// Requires production server on :3000 and headless Chrome on :9223.
const assert = require('node:assert/strict');
const { load } = require('./check-tests.cjs');
async function main() {
  const targets = await (await fetch('http://127.0.0.1:9223/json/list')).json();
  const ws = new WebSocket(targets.find(target => target.type === 'page').webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
  const pending = new Map(), errors = [];
  let id = 0;
  ws.onmessage = ({ data }) => {
    const message = JSON.parse(data);
    if (message.id) { const p = pending.get(message.id); pending.delete(message.id); message.error ? p.reject(message.error) : p.resolve(message.result); }
    else if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text);
  };
  const call = (method, params = {}) => new Promise((resolve, reject) => { pending.set(++id, { resolve, reject }); ws.send(JSON.stringify({ id, method, params })); });
  const evaluate = async expression => {
    const result = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw Error(JSON.stringify(result.exceptionDetails));
    return result.result.value;
  };
  const pause = () => new Promise(resolve => setTimeout(resolve, 60));
  const click = async selector => { assert(await evaluate(`!!document.querySelector(${JSON.stringify(selector)}) && !document.querySelector(${JSON.stringify(selector)}).disabled`)); await evaluate(`document.querySelector(${JSON.stringify(selector)}).click()`); await pause(); };
  try {
    await call('Runtime.enable'); await call('Page.enable');
    for (const lang of ['RU', 'KZ', 'EN']) {
      const test = load(`content/modules/1/tests/${lang.toLowerCase()}.ts`).default;
      const response = await fetch(`http://localhost:3000/modules/1/tests?lang=${lang}`);
      assert.equal(response.status, 200); assert((await response.text()).includes(test.title));
      await call('Page.navigate', { url: `http://localhost:3000/modules/1/tests?lang=${lang}` });
      for (let i = 0; i < 100; i++) { if (await evaluate(`document.querySelector('article h1')?.textContent === ${JSON.stringify(test.title)}`)) break; await pause(); }
      assert.equal(await evaluate("document.querySelector('article h1')?.textContent"), test.title);
      assert(await evaluate("document.querySelector('[data-action=check]').disabled"));
      // Trigger every remediation and foundation branch, then retry all errors correctly.
      for (const retry of [false, true]) {
        if (retry) await click('[data-action=retry]');
        let steps = 0;
        while (!await evaluate("!!document.querySelector('[data-testid=results]')")) {
          assert(++steps < 150);
          const nodeId = await evaluate("document.querySelector('[data-node]')?.dataset.node");
          const node = test.nodes[nodeId];
          assert(node, nodeId);
          if (node.type === 'question') {
            const answer = retry ? node.correctAnswer : node.options.find(option => option.id !== node.correctAnswer).id;
            await click(`input[value="${answer}"]`);
            await click('[data-action=check]');
            const feedback = await evaluate("document.querySelector('[role=status]').textContent");
            assert(feedback.includes(node.explanation));
            assert(feedback.includes(retry ? test.ui.correct : test.ui.reviewNeeded));
          } else assert((await evaluate("document.querySelector('[data-node]').textContent")).includes(node.text));
          const link = await evaluate("document.querySelector('[data-node] a').getAttribute('href')");
          assert(link.includes(`?lang=${lang}#`));
          await click('[data-action=continue]');
        }
        const values = await evaluate("[...document.querySelectorAll('dd')].map(el=>el.textContent)");
        assert.deepEqual(values, ['0 / 10', '0 / 10', '0', '20', '20']);
        if (retry) assert((await evaluate("document.querySelector('[role=status]').textContent")).includes('30 / 30'));
      }
      assert(!await evaluate("!!document.querySelector('[data-action=retry]')"));
      await click('[data-action=restart]');
      assert.equal(await evaluate("document.querySelector('[data-node]').dataset.node"), test.start);
      await call('Emulation.setDeviceMetricsOverride', { width: 375, height: 812, deviceScaleFactor: 1, mobile: true });
      assert(await evaluate('document.documentElement.scrollWidth <= window.innerWidth'));
      await call('Emulation.clearDeviceMetricsOverride');
      const html = await (await fetch(`http://localhost:3000/modules/1/theory?lang=${lang}`)).text();
      for (const anchor of ['nervous-system', 'functions', 'cns-pns', 'principles']) assert(html.includes(`id="${anchor}"`));
      console.log(`${lang}: browser interactions, explanations, all error branches, retry, results, restart, mobile width and anchors OK`);
    }
    const other = await (await fetch('http://localhost:3000/modules/2/tests?lang=EN')).text();
    assert(other.includes('Section materials are being prepared.'));
    assert.deepEqual(errors, []);
  } finally { ws.close(); }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
