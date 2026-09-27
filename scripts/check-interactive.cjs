// Production server on :3000 and headless Chrome on :9223. No dependencies.
const assert = require('node:assert/strict');
const { load } = require('./check-tests.cjs');
const { createInteractiveLesson } = load('content/modules/1/interactive.ts');

async function main() {
  const target = await (await fetch('http://127.0.0.1:9223/json/new?about:blank', { method: 'PUT' })).json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
  let id = 0;
  const pending = new Map(), errors = [];
  ws.onmessage = ({ data }) => {
    const event = JSON.parse(data);
    if (event.id) {
      const task = pending.get(event.id); pending.delete(event.id);
      event.error ? task.reject(event.error) : task.resolve(event.result);
    } else if (event.method === 'Runtime.exceptionThrown') errors.push(event.params.exceptionDetails.text);
    else if (event.method === 'Runtime.consoleAPICalled' && event.params.type === 'error') errors.push(JSON.stringify(event.params.args));
  };
  const call = (method, params = {}) => new Promise((resolve, reject) => {
    pending.set(++id, { resolve, reject }); ws.send(JSON.stringify({ id, method, params }));
  });
  const evaluate = async expression => {
    const result = await call('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (result.exceptionDetails) throw Error(JSON.stringify(result.exceptionDetails));
    return result.result.value;
  };
  const waitFor = async expression => {
    for (let attempt = 0; attempt < 150; attempt++) {
      if (await evaluate(expression)) return;
      await new Promise(resolve => setTimeout(resolve, 50));
    }
    throw Error(`Timed out: ${expression}`);
  };
  const el = selector => `document.querySelector(${JSON.stringify(selector)})`;
  const settle = () => evaluate('new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)))');
  const checkVisuals = async () => {
    assert(await evaluate(`(() => {
      const state = id => document.querySelector('#' + id + ' figure')?.dataset.visualState;
      const selected = id => document.querySelector('#' + id + ' [data-node][aria-pressed=true]')?.dataset.node;
      const mode = document.querySelector('[data-mode][aria-pressed=true]')?.dataset.mode;
      const inputs = ['excitation','inhibition'].map(id => Number(document.querySelector('[data-input=' + id + ']').getAttribute('aria-pressed') === 'true')).join('');
      return state('organization') === selected('organization') &&
        (state('pathway') === selected('pathway') || (state('pathway') === 'feedback-center' && selected('pathway') === 'center')) &&
        state('synapse') === mode + '-' + selected('synapse') && state('integration') === inputs &&
        [...document.querySelectorAll('article svg[role=group]')].length === 4 &&
        [...document.querySelectorAll('article svg[role=group]')].every(svg => svg.getAttribute('aria-labelledby').split(' ').every(id => document.getElementById(id)?.textContent.trim()));
    })()`), 'SVG states and accessible descriptions match existing controls');
  };
  const click = async selector => {
    assert(await evaluate(`!!${el(selector)} && !${el(selector)}.disabled`), selector);
    await evaluate(`${el(selector)}.click()`); await settle();
    if (await evaluate('!!document.querySelector("#organization figure")')) await checkVisuals();
  };
  const key = async (key, code, windowsVirtualKeyCode) => {
    await call('Input.dispatchKeyEvent', { type: 'keyDown', key, code, windowsVirtualKeyCode, ...(key === 'Enter' ? { text: '\r' } : {}) });
    await call('Input.dispatchKeyEvent', { type: 'keyUp', key, code, windowsVirtualKeyCode }); await settle();
    await checkVisuals();
  };
  const pressed = async selector => assert.equal(await evaluate(`${el(selector)}.getAttribute('aria-pressed')`), 'true', selector);
  const mouse = async selector => {
    await evaluate(`${el(selector)}.scrollIntoView({block:'center'})`);
    const point = await evaluate(`(() => { const r = ${el(selector)}.getBoundingClientRect(); return {x:r.x+r.width/2,y:r.y+r.height/2}; })()`);
    await call('Input.dispatchMouseEvent', { type: 'mouseMoved', ...point });
    assert.equal(await evaluate(`getComputedStyle(${el(selector)}).cursor`), 'pointer');
    await call('Input.dispatchMouseEvent', { type: 'mousePressed', ...point, button: 'left', clickCount: 1 });
    await call('Input.dispatchMouseEvent', { type: 'mouseReleased', ...point, button: 'left', clickCount: 1 });
    await settle(); await checkVisuals();
  };
  async function svgChoices(section, nodes) {
    for (const [i, node] of nodes.entries()) {
      const badge = `#${section} svg [role=button][aria-label=${JSON.stringify((i+1)+': '+node.label)}]`;
      await mouse(badge);
      await pressed(`#${section} [data-node="${node.id}"]`);
      // Both keyboard keys select the same state after a DOM-button reset.
      for (const [keyName, code, keyCode] of [['Enter','Enter',13],[' ','Space',32]]) {
        await click(`#${section} [data-node="${nodes[(i+1)%nodes.length].id}"]`);
        await evaluate(`${el(badge)}.focus()`);
        await key(keyName, code, keyCode);
        await pressed(`#${section} [data-node="${node.id}"]`);
        assert.notEqual(await evaluate('getComputedStyle(document.activeElement).outlineStyle'), 'none');
      }
      // Anatomical/process shapes are also native keyboard targets.
      const shape = `#${section} svg [role=button][aria-label=${JSON.stringify(node.label)}]`;
      await evaluate(`${el(shape)}.focus()`); await key('Enter','Enter',13);
      await pressed(`#${section} [data-node="${node.id}"]`);
    }
  }
  const explanation = async (selector, text) => assert((await evaluate(`${el(selector)}.textContent`)).includes(text), selector);
  async function sequence(root, nodes) {
    assert(await evaluate(`${el(`${root} [data-action=previous]`)}.disabled`));
    for (let index = 0; index < nodes.length; index++) {
      if (index) await click(`${root} [data-action=next]`);
      await pressed(`${root} [data-node="${nodes[index].id}"]`);
      await explanation(`${root} [role=status]`, nodes[index].explanation);
    }
    assert(await evaluate(`${el(`${root} [data-action=next]`)}.disabled`));
    await click(`${root} [data-action=previous]`);
    await pressed(`${root} [data-node="${nodes.at(-2).id}"]`);
    await click(`${root} [data-action=reset]`);
    await pressed(`${root} [data-node="${nodes[0].id}"]`);
  }
  try {
    await call('Runtime.enable'); await call('Page.enable');
    for (const language of ['RU', 'EN', 'KZ']) {
      const lesson = createInteractiveLesson(language);
      const theory = load(`content/modules/1/theory/${language.toLowerCase()}.ts`).default;
      for (const diagram of [lesson.organization, lesson.pathway, lesson.synapse, lesson.integration]) {
        assert(theory.sections.some(section => section.id === diagram.anchor));
      }
      const url = `http://localhost:3000/modules/1/interactive?lang=${language}`;
      assert.equal((await fetch(url)).status, 200);
      for (const width of [320, 375, 1280]) {
        await call('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 500 });
        await call('Page.navigate', { url });
        await waitFor(`document.querySelector('h1')?.textContent === ${JSON.stringify(lesson.title)} && Object.keys(document.querySelector('#organization button') ?? {}).some(key => key.startsWith('__reactProps$'))`);
        assert.equal(await evaluate('document.querySelectorAll("h1").length'), 1);
        assert.equal(await evaluate('document.documentElement.lang'), language === 'KZ' ? 'kk' : language.toLowerCase());
        assert.equal(await evaluate('document.querySelectorAll("article > section").length'), 4);
        await svgChoices('organization', lesson.organization.groups.flatMap(group => group.nodes));
        await svgChoices('pathway', lesson.pathway.nodes);
        await click('#pathway [data-action=reset]');
        for (const mode of lesson.synapse.modes) {
          await click(`[data-mode="${mode.id}"]`);
          await svgChoices('synapse', mode.nodes);
        }
        await click('[data-mode=chemical]');
        for (const [input, label] of [['excitation',lesson.integration.excitation],['inhibition',lesson.integration.inhibition]]) {
          const control = `#integration svg [role=button][aria-label=${JSON.stringify(label)}]`;
          await mouse(control + ' circle'); await pressed(`[data-input=${input}]`);
          await evaluate(`${el(control)}.focus()`); await key(' ','Space',32);
          assert.equal(await evaluate(`${el(`[data-input=${input}]`)}.getAttribute('aria-pressed')`), 'false');
          await key('Enter','Enter',13); await pressed(`[data-input=${input}]`);
        }
        await click('#integration [data-action=reset]');
        for (const group of lesson.organization.groups) {
          for (const node of group.nodes) {
            await click(`#organization [data-node="${node.id}"]`);
            await explanation('#organization-explanation', node.explanation);
            await explanation('#organization-explanation', group.title);
            await pressed(`#organization [data-node="${node.id}"]`);
          }
        }
        assert.equal(await evaluate('document.querySelectorAll("#organization button[aria-pressed=true]").length'), 1);
        await sequence('[data-sequence=pathway]', lesson.pathway.nodes);
        assert(await evaluate('document.querySelector("[data-action=feedback]").disabled'));
        await click('#pathway [data-node=feedback]');
        await click('[data-action=feedback]');
        await pressed('#pathway [data-node=center]');
        await explanation('#pathway-explanation', lesson.pathway.loop);
        for (const mode of lesson.synapse.modes) {
          await click(`[data-mode="${mode.id}"]`);
          await sequence(`[data-sequence="synapse-${mode.id}"]`, mode.nodes);
        }
        await click('[data-mode=chemical]');
        await pressed('#synapse [data-node=arrival]');
        const result = '#integration-explanation';
        await explanation(result, lesson.integration.outcomes[0]);
        await click('[data-input=excitation]'); await explanation(result, lesson.integration.outcomes[1]);
        await click('[data-input=inhibition]'); await explanation(result, lesson.integration.outcomes[3]);
        await click('[data-input=excitation]'); await explanation(result, lesson.integration.outcomes[2]);
        await click('#integration [data-action=reset]'); await explanation(result, lesson.integration.outcomes[0]);
        // Native keyboard activation: Enter and Space, plus actual Tab navigation.
        await evaluate('document.querySelector("#organization [data-node=brain]").focus()');
        await key('Enter', 'Enter', 13); await pressed('#organization [data-node=brain]');
        assert.notEqual(await evaluate('getComputedStyle(document.activeElement).outlineStyle'), 'none');
        await key('Tab', 'Tab', 9);
        assert.equal(await evaluate('document.activeElement.dataset.node'), 'spinal');
        await key(' ', 'Space', 32); await pressed('#organization [data-node=spinal]');
        await evaluate('document.querySelector("[data-input=inhibition]").focus()');
        await key(' ', 'Space', 32); await explanation(result, lesson.integration.outcomes[2]);
        await evaluate('document.querySelector("#pathway [data-action=next]").focus()');
        await key('Enter', 'Enter', 13); await pressed('#pathway [data-node=efferent]');
        await evaluate('document.querySelector("[data-mode=electrical]").focus()');
        await key(' ', 'Space', 32); await pressed('[data-mode=electrical]');
        assert(await evaluate(`[...document.querySelectorAll('article button')].every(button => button.textContent.trim() && (!button.hasAttribute('aria-controls') || document.getElementById(button.getAttribute('aria-controls'))))`));
        for (const href of await evaluate('[...document.querySelectorAll("article a")].map(a => a.getAttribute("href"))')) assert(href.includes(`?lang=${language}#`));
        assert(await evaluate('document.documentElement.scrollWidth <= window.innerWidth'), `${language}: overflow at ${width}`);
        console.log(`${language} ${width}px: all nodes, steps, feedback loop, synapse modes, four input states, reset, keyboard, labels and layout PASS`);
      }
      // Switch through a real language link; state resets to the new lesson.
      const nextLanguage = language === 'RU' ? 'EN' : language === 'EN' ? 'KZ' : 'RU';
      await click(`a[href="/modules/1/interactive?lang=${nextLanguage}"]`);
      await waitFor(`document.documentElement.lang === '${nextLanguage === 'KZ' ? 'kk' : nextLanguage.toLowerCase()}' && document.querySelector('h1')?.textContent === ${JSON.stringify(createInteractiveLesson(nextLanguage).title)}`);
      await pressed('#organization [data-node=brain]');
      await pressed('[data-mode=chemical]');
      assert.equal(await evaluate('document.querySelector("[data-input=inhibition]").getAttribute("aria-pressed")'), 'false');
      await click('article a');
      await waitFor(`location.pathname === '/modules/1/theory' && location.search === '?lang=${nextLanguage}' && location.hash === '#cns-pns'`);
    }
    assert.deepEqual(errors, [], 'No browser errors');
    console.log('RU/EN/KZ language switching, theory navigation and runtime PASS');
  } finally {
    ws.close(); await fetch(`http://127.0.0.1:9223/json/close/${target.id}`);
  }
}
const timeout = setTimeout(() => { console.error('Interactive check timed out'); process.exit(1); }, 180000);
main().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => clearTimeout(timeout));
