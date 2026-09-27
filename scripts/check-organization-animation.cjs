// Pilot only: /modules/1/media, first block. Local server :3000, Chrome CDP :9223.
const assert = require('node:assert/strict');
const { load } = require('./check-tests.cjs');
const { getOrganizationAnimation } = load('content/modules/1/organization-animation.ts');
const { createMediaLesson } = load('content/modules/1/media.ts');
async function main() {
  const target = await (await fetch('http://127.0.0.1:9223/json/new?about:blank', { method: 'PUT' })).json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
  let id = 0; const pending = new Map(), errors = [];
  ws.onmessage = ({ data }) => {
    const e = JSON.parse(data);
    if (e.id) { const p = pending.get(e.id); pending.delete(e.id); e.error ? p.reject(e.error) : p.resolve(e.result); }
    else if (e.method === 'Runtime.exceptionThrown') errors.push(e.params.exceptionDetails.text);
    else if (e.method === 'Runtime.consoleAPICalled' && e.params.type === 'error') errors.push(JSON.stringify(e.params.args));
  };
  const call = (method, params = {}) => new Promise((resolve, reject) => { pending.set(++id, { resolve, reject }); ws.send(JSON.stringify({ id, method, params })); });
  const evaluate = async expression => {
    const r = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw Error(JSON.stringify(r.exceptionDetails));
    return r.result.value;
  };
  const waitFor = async expression => {
    for (let i = 0; i < 180; i++) { if (await evaluate(expression)) return; await new Promise(r => setTimeout(r, 50)); }
    throw Error(`Timeout: ${expression}`);
  };
  const root = '#media-organization';
  const player = 'document.querySelector("[data-testid=organization-animation]")';
  const selector = action => `${root} [data-animation-action=${action}]`;
  const settle = () => evaluate('new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)))');
  const click = async action => {
    const s = selector(action);
    assert(await evaluate(`!document.querySelector(${JSON.stringify(s)}).disabled`));
    await evaluate(`document.querySelector(${JSON.stringify(s)}).scrollIntoView({block:'center'})`);
    const point = await evaluate(`(()=>{const r=document.querySelector(${JSON.stringify(s)}).getBoundingClientRect();return {x:r.x+r.width/2,y:r.y+r.height/2}})()`);
    await call('Input.dispatchMouseEvent', { type: 'mousePressed', button: 'left', clickCount: 1, ...point });
    await call('Input.dispatchMouseEvent', { type: 'mouseReleased', button: 'left', clickCount: 1, ...point }); await settle();
  };
  const keyboard = async (action, key, code, keyCode) => {
    await evaluate(`document.querySelector(${JSON.stringify(selector(action))}).focus()`);
    await call('Input.dispatchKeyEvent', { type: 'keyDown', key, code, windowsVirtualKeyCode: keyCode, ...(key === 'Enter' ? { text: '\r' } : {}) });
    await call('Input.dispatchKeyEvent', { type: 'keyUp', key, code, windowsVirtualKeyCode: keyCode }); await settle();
    assert.notEqual(await evaluate('getComputedStyle(document.activeElement).outlineStyle'), 'none');
  };
  const stage = async (copy, index) => {
    assert.equal(await evaluate(`${player}.dataset.stage`), copy.stages[index].id);
    assert((await evaluate(`${player}.querySelector('[role=status]').textContent`)).includes(copy.stages[index].text));
    assert.equal(await evaluate(`${player}.querySelector('progress').value`), index + 1);
    assert.equal(await evaluate(`${player}.querySelector('svg title').textContent`), copy.stages[index].title);
  };
  try {
    await call('Runtime.enable'); await call('Page.enable');
    for (const lang of ['RU', 'EN', 'KZ']) {
      const copy = getOrganizationAnimation(lang), lesson = createMediaLesson(lang), block = lesson.blocks[0];
      for (const width of [320, 375, 1280]) {
        await call('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 500 });
        await call('Page.navigate', { url: `http://localhost:3000/modules/1/media?lang=${lang}` });
        await waitFor(`${player}?.querySelector('h3')?.textContent === ${JSON.stringify(copy.title)} && Object.keys(document.querySelector(${JSON.stringify(selector('play'))}) ?? {}).some(k=>k.startsWith('__reactProps$'))`);
        await stage(copy, 0);
        assert.equal(await evaluate(`${player}.dataset.playing`), 'false');
        assert.equal(await evaluate(`document.querySelector('${root} video, ${root} [data-player=pending]')`), null);
        assert(!(await evaluate(`document.querySelector('${root}').textContent`)).includes(lesson.ui.durationPending));
        await keyboard('play', 'Enter', 'Enter', 13);
        assert.equal(await evaluate(`${player}.dataset.playing`), 'true');
        await keyboard('play', ' ', 'Space', 32);
        assert.equal(await evaluate(`${player}.dataset.playing`), 'false');
        if (lang === 'RU' && width === 320) { await new Promise(r => setTimeout(r, 6300)); await stage(copy, 0); }
        for (let i = 1; i < 6; i++) { await click('next'); await stage(copy, i); }
        assert(await evaluate(`document.querySelector(${JSON.stringify(selector('next'))}).disabled`));
        await keyboard('previous', ' ', 'Space', 32); await stage(copy, 4);
        await click('play'); await click('previous'); await stage(copy, 3);
        assert.equal(await evaluate(`${player}.dataset.playing`), 'false');
        await call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
        await click('play');
        assert.equal(await evaluate(`${player}.querySelector('[data-direction]').getAttribute('data-direction')`), 'afferent');
        assert.equal(await evaluate(`getComputedStyle(${player}.querySelector('[data-direction]')).animationName`), 'none');
        if (width === 1280) {
          // Actual timer, not a mocked clock, for all three languages with reduced motion.
          await waitFor(`${player}.dataset.stage === 'efferent'`); await stage(copy, 4);
        }
        await click('play');
        await call('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'no-preference' }] });
        await click('play');
        assert.notEqual(await evaluate(`getComputedStyle(${player}.querySelector('[data-direction]')).animationName`), 'none');
        await keyboard('restart', 'Enter', 'Enter', 13); await stage(copy, 0);
        assert.equal(await evaluate(`${player}.dataset.playing`), 'false');
        if (lang === 'RU' && width === 1280) {
          await click('play');
          for (let i = 1; i < 6; i++) { await waitFor(`${player}.dataset.stage === '${copy.stages[i].id}'`); await stage(copy, i); }
          await waitFor(`${player}.dataset.playing === 'false'`);
          await click('play'); await stage(copy, 0);
          await click('restart');
        }
        // Preserve the pilot's existing transcript, theory link and self-check.
        for (const paragraph of block.transcript) assert((await evaluate(`document.querySelector('${root} details').textContent`)).includes(paragraph));
        assert.equal(await evaluate(`document.querySelector('${root} a').getAttribute('href')`), `/modules/1/theory?lang=${lang}#${block.theoryAnchor}`);
        await evaluate(`document.querySelector('${root} input[value=${block.question.correctAnswer}]').click()`); await settle();
        await evaluate(`document.querySelector('${root} [data-action=check]').click()`); await settle();
        assert((await evaluate(`document.querySelector('${root} fieldset').parentElement.textContent`)).includes(block.question.explanation));
        assert(await evaluate('document.documentElement.scrollWidth <= window.innerWidth'));
        console.log(`${lang} ${width}px: pilot controls, six stages, SVG states, mouse, keyboard, reduced motion, transcript/question and layout PASS`);
      }
    }
    assert.deepEqual(errors, []);
    console.log('Real-time autoplay, final stop, replay, pause cancellation and reduced-motion playback PASS');
  } finally { ws.close(); await fetch(`http://127.0.0.1:9223/json/close/${target.id}`); }
}
const timeout = setTimeout(() => { console.error('Pilot check timed out'); process.exit(1); }, 180000);
main().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => clearTimeout(timeout));
