// Only /modules/1/media. Local server :3000 and dedicated Chrome CDP :9223.
const assert = require('node:assert/strict');
const { load } = require('./check-tests.cjs');
const { createMediaLesson } = load('content/modules/1/media.ts');

async function main() {
  const target = await (await fetch('http://127.0.0.1:9223/json/new?about:blank', { method: 'PUT' })).json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
  let id = 0;
  const pending = new Map(), errors = [];
  ws.onmessage = ({ data }) => {
    const event = JSON.parse(data);
    if (event.id) { const p = pending.get(event.id); pending.delete(event.id); event.error ? p.reject(event.error) : p.resolve(event.result); }
    else if (event.method === 'Runtime.exceptionThrown') errors.push(event.params.exceptionDetails.text);
    else if (event.method === 'Runtime.consoleAPICalled' && event.params.type === 'error') errors.push(JSON.stringify(event.params.args));
  };
  const call = (method, params = {}) => new Promise((resolve, reject) => {
    pending.set(++id, { resolve, reject }); ws.send(JSON.stringify({ id, method, params }));
  });
  const evaluate = async expression => {
    const r = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw Error(JSON.stringify(r.exceptionDetails));
    return r.result.value;
  };
  const waitFor = async expression => {
    for (let i = 0; i < 200; i++) {
      if (await evaluate(expression)) return;
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    throw Error(`Timeout: ${expression}`);
  };
  const el = s => `document.querySelector(${JSON.stringify(s)})`;
  const settle = () => evaluate('new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))');
  const click = async s => { assert(await evaluate(`!!${el(s)} && !${el(s)}.disabled`)); await evaluate(`${el(s)}.click()`); await settle(); };
  const key = async (key, code, keyCode) => {
    await call('Input.dispatchKeyEvent', { type: 'keyDown', key, code, windowsVirtualKeyCode: keyCode, ...(key === 'Enter' ? { text: '\r' } : {}) });
    await call('Input.dispatchKeyEvent', { type: 'keyUp', key, code, windowsVirtualKeyCode: keyCode }); await settle();
  };
  try {
    await call('Runtime.enable'); await call('Page.enable');
    for (const lang of ['RU', 'EN', 'KZ']) {
      const lesson = createMediaLesson(lang);
      const theory = load(`content/modules/1/theory/${lang.toLowerCase()}.ts`).default;
      for (const block of lesson.blocks) {
        assert(theory.sections.some(section => section.id === block.theoryAnchor));
        assert.equal(block.question.options.filter(o => o.id === block.question.correctAnswer).length, 1);
        assert(block.transcript.length && block.question.options.every(o => o.feedback.trim()));
      }
      for (const width of [320, 375, 1280]) {
        const url = `http://localhost:3000/modules/1/media?lang=${lang}`;
        assert.equal((await fetch(url)).status, 200);
        await call('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 500 });
        await call('Page.navigate', { url });
        await waitFor(`document.querySelector('h1')?.textContent === ${JSON.stringify(lesson.title)} && Object.keys(document.querySelector('article input') ?? {}).some(key => key.startsWith('__reactProps$'))`);
        assert.equal(await evaluate('document.querySelectorAll("h1").length'), 1);
        assert.equal(await evaluate('document.documentElement.lang'), lang === 'KZ' ? 'kk' : lang.toLowerCase());
        assert.equal(await evaluate('document.querySelectorAll("[data-media]").length'), 4);
        assert.equal(await evaluate('document.querySelectorAll("[data-player=pending]").length'), 4);
        assert.equal(await evaluate('document.querySelectorAll("video,iframe").length'), 0, 'No broken or invented video');
        for (const block of lesson.blocks) {
          const root = `[data-media=${block.id}]`;
          const text = await evaluate(`${el(root)}.textContent`);
          assert(text.includes(lesson.ui.pending)); assert(text.includes(lesson.ui.durationPending));
          assert.equal(await evaluate(`${el(root + ' a')}.getAttribute('href')`), `/modules/1/theory?lang=${lang}#${block.theoryAnchor}`);
          assert(await evaluate(`${el(root + ' [data-action=check]')}.disabled`));
          await evaluate(`${el(root + ' summary')}.focus()`); await key('Enter', 'Enter', 13);
          assert(await evaluate(`${el(root + ' details')}.open`));
          for (const paragraph of block.transcript) assert((await evaluate(`${el(root + ' details')}.textContent`)).includes(paragraph));
          await key(' ', 'Space', 32); assert(!await evaluate(`${el(root + ' details')}.open`));
          for (const option of block.question.options) {
            // Native keyboard input, including keyboard focus on the selected option.
            await evaluate(`${el(root + ' input[value=' + option.id + ']')}.focus()`);
            await key(' ', 'Space', 32);
            assert.notEqual(await evaluate('getComputedStyle(document.activeElement).outlineStyle'), 'none');
            await click(root + ' [data-action=check]');
            const feedback = await evaluate(`${el(root + ' [role=status]')}.textContent`);
            assert(feedback.includes(option.feedback)); assert(feedback.includes(block.question.explanation));
            assert(feedback.includes(option.id === block.question.correctAnswer ? lesson.ui.correct : lesson.ui.incorrect));
            assert(await evaluate(`${el(root + ' fieldset')}.disabled`));
            await click(root + ' [data-action=retry]');
            assert.equal(await evaluate(`${el(root)}.querySelectorAll('input:checked').length`), 0);
            assert.equal(await evaluate('document.activeElement.type'), 'radio');
          }
          assert(await evaluate('document.documentElement.scrollWidth <= window.innerWidth'), `${lang} ${width}: overflow`);
        }
        assert(await evaluate('[...document.querySelectorAll("article input")].every(input => input.labels.length > 0)'));
        console.log(`${lang} ${width}px: four blocks, honest pending state, metadata, transcripts, all answer explanations, retry, keyboard and layout PASS`);
      }
      const next = lang === 'RU' ? 'EN' : lang === 'EN' ? 'KZ' : 'RU';
      await click('article input'); await click('article [data-action=check]');
      await click(`nav a[href="/modules/1/media?lang=${next}"]`);
      await waitFor(`document.querySelector('h1')?.textContent === ${JSON.stringify(createMediaLesson(next).title)} && document.documentElement.lang === '${next === 'KZ' ? 'kk' : next.toLowerCase()}'`);
      assert.equal(await evaluate('document.querySelectorAll("article input:checked").length'), 0);
      assert.equal(await evaluate('document.querySelectorAll("article [data-action=retry]").length'), 0);
    }
    assert.deepEqual(errors, []);
    console.log('Language switching, existing theory anchors and browser runtime PASS');
  } finally { ws.close(); await fetch(`http://127.0.0.1:9223/json/close/${target.id}`); }
}
const timeout = setTimeout(() => { console.error('Media check timed out'); process.exit(1); }, 180000);
main().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => clearTimeout(timeout));
