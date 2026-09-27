// Fresh production server on :3000, dedicated headless Chrome on :9223.
const assert = require('node:assert/strict');
const { load } = require('./check-tests.cjs');
const { sectionOrder } = load('content/sections.ts');
const { interfaceText } = load('lib/interface.ts');

async function main() {
  const target = await (await fetch('http://127.0.0.1:9223/json/new?about:blank', { method: 'PUT' })).json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
  let id = 0;
  const pending = new Map(), errors = [];
  ws.onmessage = ({ data }) => {
    const message = JSON.parse(data);
    if (message.id) {
      const task = pending.get(message.id); pending.delete(message.id);
      message.error ? task.reject(message.error) : task.resolve(message.result);
    } else if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text);
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
    for (let i = 0; i < 150; i++) {
      if (await evaluate(expression)) return;
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    throw Error(`Timed out: ${expression}`);
  };
  try {
    await call('Runtime.enable'); await call('Page.enable');
    for (const lang of ['RU', 'EN', 'KZ']) {
      const htmlLang = lang === 'KZ' ? 'kk' : lang.toLowerCase();
      for (const old of ['/modules/module-1', '/modules-dynamic/1']) {
        for (const query of ['', `?lang=${lang}`]) {
          const response = await fetch(`http://localhost:3000${old}${query}`, { redirect: 'manual' });
          assert.equal(response.status, 308);
          assert.equal(new URL(response.headers.get('location'), 'http://localhost:3000').pathname, '/modules/1');
          assert.equal(new URL(response.headers.get('location'), 'http://localhost:3000').search, query);
        }
      }
      for (const path of ['/', '/modules/1', ...sectionOrder.map(s => `/modules/1/${s}`)]) {
        const url = `http://localhost:3000${path}?lang=${lang}`;
        const response = await fetch(url);
        assert.equal(response.status, 200, url);
        const html = await response.text();
        assert(html.includes(`<html lang="${htmlLang}">`), `Server language: ${url}`);
        await call('Page.navigate', { url });
        await waitFor(`location.href === ${JSON.stringify(url)} && document.readyState === 'complete' && document.documentElement.lang === ${JSON.stringify(htmlLang)} && !!document.querySelector('h1')`);
        assert.equal(await evaluate('document.querySelectorAll("h1").length'), 1, url);
        assert(await evaluate(`!!document.querySelector('nav[aria-label=${JSON.stringify(interfaceText[lang].language)}]')`), `Language label: ${url}`);
        if (path === '/' || path === '/modules/1') assert((await evaluate('document.body.innerText')).includes(interfaceText[lang].authorName));
        for (const width of [320, 375, 1280]) {
          await call('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 500 });
          const actual = await evaluate('document.documentElement.scrollWidth');
          assert(actual <= width, `${url}: viewport ${width}, document ${actual}`);
          if (path.endsWith('/practice') && width < 500) {
            assert(await evaluate(`(() => { const table = document.querySelector('table'); const box = table.parentElement; box.scrollLeft = 100; return box.scrollWidth > box.clientWidth && box.scrollLeft > 0; })()`), 'Worksheet scrolls inside its container');
          }
        }
        await call('Emulation.clearDeviceMetricsOverride');
      }
      console.log(`${lang}: 19 pages, one h1, server/client language, author, redirects and 320/375/1280px OK`);
    }
    await call('Page.navigate', { url: 'http://localhost:3000/modules/1?lang=RU' });
    await waitFor(`document.documentElement.lang === 'ru' && Object.keys(document.querySelector('nav a') ?? {}).some(key => key.startsWith('__reactProps$'))`);
    // This marker disappears on a full reload: verify actual client navigation.
    await evaluate('window.__languageNavigationMarker = true');
    for (const lang of ['EN', 'KZ', 'RU']) {
      await evaluate(`document.querySelector('nav a[href="/modules/1?lang=${lang}"]').click()`);
      await waitFor(`document.documentElement.lang === '${lang === 'KZ' ? 'kk' : lang.toLowerCase()}' && location.search === '?lang=${lang}'`);
      assert(await evaluate('window.__languageNavigationMarker === true'));
    }
    assert.deepEqual(errors, []);
    console.log('Client-side RU/EN/KZ switching and browser runtime OK');
  } finally {
    ws.close();
    await fetch(`http://127.0.0.1:9223/json/close/${target.id}`);
  }
}
const timeout = setTimeout(() => { console.error('Module audit timed out'); process.exit(1); }, 180000);
main().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => clearTimeout(timeout));
