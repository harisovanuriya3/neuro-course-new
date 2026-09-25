// Run with the dev server on :3000 and headless Chrome debugging on :9223.
// Uses Node 22+ built-ins; no browser-testing dependency is needed.
const fs = require("node:fs");
const vm = require("node:vm");
const assert = require("node:assert/strict");

async function main() {
  const targets = await (await fetch("http://127.0.0.1:9223/json/list")).json();
  const target = targets.find((entry) => entry.type === "page");
  assert(target, "A browser page must be available");
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
  let id = 0;
  const pending = new Map();
  const errors = [];
  ws.onmessage = ({ data }) => {
    const message = JSON.parse(data);
    if (message.id) {
      const handler = pending.get(message.id);
      pending.delete(message.id);
      message.error ? handler.reject(message.error) : handler.resolve(message.result);
    } else if (message.method === "Runtime.exceptionThrown") errors.push(message.params.exceptionDetails.text);
  };
  const call = (method, params = {}) => new Promise((resolve, reject) => {
    const next = ++id;
    pending.set(next, { resolve, reject });
    ws.send(JSON.stringify({ id: next, method, params }));
  });
  const evaluate = async (expression) => {
    const result = await call("Runtime.evaluate", { expression, awaitPromise: true, returnByValue: true });
    if (result.exceptionDetails) throw Error(JSON.stringify(result.exceptionDetails));
    return result.result.value;
  };
  const settle = () => new Promise((resolve) => setTimeout(resolve, 100));
  const selector = (caseId, suffix = "") => `#case-${caseId}${suffix}`;
  const element = (css) => `document.querySelector(${JSON.stringify(css)})`;
  const click = async (css) => {
    assert(await evaluate(`!!${element(css)} && !${element(css)}.disabled`), `Enabled element: ${css}`);
    await evaluate(`${element(css)}.click()`);
    await settle();
  };
  const button = async (caseId, text) => {
    await evaluate(`(() => {
      const button = [...${element(selector(caseId))}.querySelectorAll('button')].find(el => el.textContent.trim() === ${JSON.stringify(text)});
      if (!button || button.disabled) throw Error('Missing or disabled button: ' + ${JSON.stringify(text)});
      button.click();
    })()`);
    await settle();
  };
  const answer = async (css) => {
    await evaluate(`${element(css)}.focus()`);
    await call("Input.insertText", { text: "Independent physiological reasoning" });
    await settle();
  };
  const load = (lang) => {
    const source = fs.readFileSync(`content/modules/1/cases/${lang.toLowerCase()}.ts`, "utf8")
      .replace(/^import type .*;\r?\n/m, "")
      .replace("const lesson: CasesLesson =", "const lesson =")
      .replace("export default lesson;", "result = lesson;");
    const box = {};
    vm.runInNewContext(source, box, { timeout: 1000 });
    return box.result;
  };
  async function ready(lesson) {
    for (let attempt = 0; attempt < 150; attempt++) {
      // Server HTML can appear before React attaches input handlers.
      if (await evaluate(`document.querySelector('h1')?.textContent === ${JSON.stringify(lesson.title)} && document.querySelectorAll('article').length === 8 && Object.keys(document.querySelector('article textarea') ?? {}).some(key => key.startsWith('__reactProps$'))`)) {
        await settle();
        return;
      }
      await settle();
    }
    throw Error(`Page did not load: ${lesson.title}`);
  }
  async function keyboard(key, code, keyCode) {
    await call("Input.dispatchKeyEvent", { type: "keyDown", key, code, windowsVirtualKeyCode: keyCode, ...(key === "Enter" ? { text: "\r" } : {}) });
    await call("Input.dispatchKeyEvent", { type: "keyUp", key, code, windowsVirtualKeyCode: keyCode });
    await settle();
  }
  await call("Runtime.enable");
  await call("Page.enable");
  try {
    for (const lang of ["RU", "KZ", "EN"]) {
      const lesson = load(lang);
      const ui = lesson.ui;
      const url = `http://localhost:3000/modules/1/cases?lang=${lang}`;
      assert.equal((await fetch(url)).status, 200, `HTTP 200: ${lang}`);
      await call("Page.navigate", { url });
      await ready(lesson);
      assert.equal(await evaluate("document.querySelector('progress').value"), 0);
      assert.equal(await evaluate("document.querySelectorAll('article button[aria-expanded=false]:disabled').length"), 8);
      assert.equal(await evaluate("document.querySelectorAll('article input[type=checkbox]').length"), 0);
      assert.equal(await evaluate("document.querySelectorAll('article [id$=explanation] h3').length"), 0);
      for (const item of lesson.cases) {
        const root = selector(item.id);
        assert.equal(await evaluate(`${element(root)}.querySelectorAll('section[aria-labelledby]').length`), 1);
        if (item.interaction?.type === "sequence") {
          const steps = item.interaction.steps;
          const status = () => evaluate(`${element(root)}.querySelector('[role=status]').textContent`);
          await button(item.id, ui.check);
          assert.equal(await status(), ui.incomplete);
          for (const step of [...steps].reverse()) await button(item.id, step);
          await button(item.id, ui.check);
          assert.equal(await status(), ui.incorrect);
          assert.equal(await evaluate(`${element(root)}.querySelector('[aria-expanded]').disabled`), false);
          await button(item.id, ui.reset);
          assert.equal(await evaluate(`${element(root)}.querySelector('[aria-expanded]').disabled`), true);
          for (const step of steps) await button(item.id, step);
          await button(item.id, ui.check);
          assert.equal(await status(), ui.correct);
          await button(item.id, ui.undo);
          assert.equal(await status(), "");
          assert.equal(await evaluate(`${element(root)}.querySelector('[aria-expanded]').disabled`), true);
          await button(item.id, steps.at(-1));
          await button(item.id, ui.check);
          assert.equal(await status(), ui.correct);
        } else {
          for (let stage = 0; stage < item.stages.length; stage++) {
            await answer(`${root}-response-${stage}`);
            if (stage < item.stages.length - 1) {
              assert.equal(await evaluate(`!!${element(`${root}-stage-${stage + 1}`)}`), false);
              await button(item.id, ui.next);
              assert.equal(await evaluate("document.activeElement.id"), `${root.slice(1)}-stage-${stage + 1}`);
              assert.equal(await evaluate(`${element(root)}.querySelector('[aria-expanded]').disabled`), true);
            }
          }
          if (item.interaction?.type === "choice") {
            await button(item.id, ui.check);
            assert.equal(await evaluate(`${element(root)}.querySelector('[role=status]').textContent`), ui.choose);
            for (let index = 0; index < item.interaction.options.length; index++) {
              await click(`${root} fieldset label:nth-of-type(${index + 1}) input`);
              assert.equal(await evaluate(`${element(root)}.querySelector('[aria-expanded]').disabled`), true);
              await button(item.id, ui.check);
              assert.equal(await evaluate(`${element(root)}.querySelector('[role=status]').textContent`), item.interaction.options[index].feedback);
            }
          }
        }
        assert.equal(await evaluate(`${element(`${root} [aria-expanded]`)}.disabled`), false, `Explanation unlocked: ${lang}/${item.id}`);
        await evaluate(`${element(`${root} [aria-expanded]`)}.focus()`);
        await keyboard("Enter", "Enter", 13);
        assert.equal(await evaluate(`${element(`${root} [aria-expanded]`)}.getAttribute('aria-expanded')`), "true");
        assert.equal(await evaluate(`${element(`${root}-explanation`)}.hidden`), false);
        assert.equal(await evaluate("getComputedStyle(document.activeElement).outlineStyle"), "solid");
        if (item.diagram) assert.equal(await evaluate(`${element(`${root}-explanation`)}.querySelectorAll('ol li').length`), 9);
        await keyboard(" ", "Space", 32);
        assert.equal(await evaluate(`${element(`${root}-explanation`)}.hidden`), true);
        assert.equal(await evaluate(`${element(`${root} textarea`)}?.value ?? 'sequence'`), item.interaction?.type === "sequence" ? "sequence" : "Independent physiological reasoning");
        await click(`${root} input[type=checkbox]`);
      }
      assert.equal(await evaluate("document.querySelector('progress').value"), 8);
      await click("#case-afferent input[type=checkbox]");
      assert.equal(await evaluate("document.querySelector('progress').value"), 7);
      await click("#case-afferent input[type=checkbox]");
      assert.equal(await evaluate("document.querySelector('progress').value"), 8);
      await answer("#case-afferent-response-0");
      assert.equal(await evaluate("document.querySelector('progress').value"), 7, "Editing invalidates completion");
      assert(await evaluate("[...document.querySelectorAll('article textarea,article input')].every(el => el.labels.length > 0)"), "All fields labelled");
      await click('a[href="#case-integrative"]');
      assert.equal(await evaluate("location.hash"), "#case-integrative");
      await button("integrative", ui.show);
      for (const width of [320, 375, 1280]) {
        await call("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: width < 500 });
        assert(await evaluate("document.documentElement.scrollWidth <= window.innerWidth"), `No overflow: ${lang} ${width}px`);
      }
      const nextLang = lang === "RU" ? "KZ" : lang === "KZ" ? "EN" : "RU";
      await click(`a[href="/modules/1/cases?lang=${nextLang}"]`);
      await ready(load(nextLang));
      assert.equal(await evaluate("document.querySelector('progress').value"), 0, "Language switch resets progress");
      assert.equal(await evaluate("document.querySelectorAll('article button[aria-expanded=false]:disabled').length"), 8);
      assert.equal(await evaluate("document.querySelector('nav[aria-label=Language] [aria-current=page]').textContent"), nextLang);
      console.log(`PASS ${lang}: HTTP 200, 8 cases, progressive stages, sequence incorrect/correct/undo/reset, all choices, keyboard disclosures/focus, completion 0–8, language switch, 320/375/1280px`);
    }
    assert.deepEqual(errors, [], "No browser runtime exceptions");
    await call("Emulation.setDeviceMetricsOverride", { width: 375, height: 900, deviceScaleFactor: 1, mobile: true });
    await evaluate("window.scrollTo(0,0)");
    const screenshot = await call("Page.captureScreenshot", { format: "png" });
    const output = require("node:path").join(require("node:os").tmpdir(), "neuro-cases-mobile.png");
    fs.writeFileSync(output, Buffer.from(screenshot.data, "base64"));
    console.log(`Screenshot: ${output}`);
    for (const section of ["theory", "practice", "tests", "questions", "media"]) {
      assert.equal((await fetch(`http://localhost:3000/modules/1/${section}?lang=RU`)).status, 200);
    }
    const placeholder = await (await fetch("http://localhost:3000/modules/2/cases?lang=EN")).text();
    assert(placeholder.includes("Section materials are being prepared."), "Module 2 is still a placeholder");
    console.log("PASS adjacent routes and unfilled module 2");
  } finally { ws.close(); }
}

const timeout = setTimeout(() => { console.error("Browser check timed out"); process.exit(1); }, 180000);
main().catch((error) => { console.error(error); process.exitCode = 1; }).finally(() => clearTimeout(timeout));
