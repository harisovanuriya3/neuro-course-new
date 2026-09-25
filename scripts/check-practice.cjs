// Run with the dev server on port 3000 and a dedicated headless Chrome on
// --remote-debugging-port=9223. Uses only Node's built-in modules (Node 22+).
const fs = require("node:fs");
const vm = require("node:vm");
const assert = require("node:assert/strict");

async function main() {
  const targets = await (await fetch("http://127.0.0.1:9223/json/list")).json();
  const target = targets.find((item) => item.type === "page");
  assert(target, "A browser page must be available");
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((resolve, reject) => { ws.onopen = resolve; ws.onerror = reject; });
  let id = 0;
  const pending = new Map();
  const errors = [];
  ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.id) {
      const handler = pending.get(message.id);
      pending.delete(message.id);
      message.error ? handler.reject(message.error) : handler.resolve(message.result);
    } else if (message.method === "Runtime.exceptionThrown") {
      errors.push(message.params.exceptionDetails.text);
    }
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
  const settle = () => evaluate("new Promise(resolve => setTimeout(resolve, 80))");
  const click = async (text) => {
    await evaluate(`(() => {
      const button = [...document.querySelectorAll('article button')].find(el => el.textContent.trim() === ${JSON.stringify(text)});
      if (!button) throw Error('Missing button');
      button.click();
    })()`);
    await settle();
  };
  await call("Runtime.enable");
  await call("Page.enable");
  try {
    for (const lang of ["RU", "KZ", "EN"]) {
      // These content files contain only a type import and a literal object.
      const source = fs.readFileSync(`content/modules/1/practice/${lang.toLowerCase()}.ts`, "utf8")
        .replace(/^import type .*;\r?\n/m, "")
        .replace("const lesson: PracticeLesson =", "const lesson =")
        .replace("export default lesson;", "result = lesson;");
      const box = {};
      vm.runInNewContext(source, box, { timeout: 1000 });
      const lesson = box.result;
      const ui = lesson.ui;
      const steps = lesson.sections.flatMap((section) => section.blocks).find((block) => block.type === "sequence").steps;
      await call("Page.navigate", { url: `http://localhost:3000/modules/1/practice?lang=${lang}` });
      let ready = false;
      for (let attempt = 0; attempt < 100; attempt++) {
        if (await evaluate(`document.querySelectorAll('article h2').length === 13 && document.querySelector('h1')?.textContent === ${JSON.stringify(lesson.title)}`)) {
          ready = true;
          break;
        }
        await new Promise((resolve) => setTimeout(resolve, 100));
      }
      assert(ready, `Page loaded: ${lang}`);
      for (let attempt = 0; attempt < 50; attempt++) {
        await click(ui.check);
        if (await evaluate(`document.querySelector('[role="status"]').textContent === ${JSON.stringify(ui.incomplete)}`)) break;
      }
      const status = () => evaluate(`document.querySelector('[role="status"]').textContent`);
      assert.equal(await status(), ui.incomplete);
      assert.equal(await evaluate("document.querySelectorAll('article button[aria-expanded=true]').length"), 0);
      assert.equal(await evaluate("document.querySelectorAll('input[type=checkbox]:checked').length"), 0);
      for (const step of [...steps].reverse()) await click(step);
      await click(ui.check);
      assert.equal(await status(), ui.incorrect);
      await click(ui.reset);
      for (const step of steps) await click(step);
      await click(ui.check);
      assert.equal(await status(), ui.correct);
      await click(ui.undo);
      assert.equal(await status(), "");
      await click(steps[steps.length - 1]);
      await click(ui.check);
      assert.equal(await status(), ui.correct);
      await evaluate(`(() => {
        const field = document.querySelector('table textarea');
        field.value = 'Independent answer';
        field.dispatchEvent(new Event('input', { bubbles: true }));
        document.querySelector('input[type="checkbox"]').click();
      })()`);
      assert.equal(await evaluate("document.querySelector('input[type=checkbox]').checked"), true);
      for (let index = 0; index < 7; index++) {
        await evaluate(`document.querySelectorAll('article button[aria-expanded]')[${index}].focus()`);
        await call("Input.dispatchKeyEvent", { type: "keyDown", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13, text: "\r" });
        await call("Input.dispatchKeyEvent", { type: "keyUp", key: "Enter", code: "Enter", windowsVirtualKeyCode: 13 });
        await settle();
        assert.equal(await evaluate(`document.querySelectorAll('article button[aria-expanded]')[${index}].getAttribute('aria-expanded')`), "true");
        assert.equal(await evaluate(`document.getElementById(document.querySelectorAll('article button[aria-expanded]')[${index}].getAttribute('aria-controls')).hidden`), false);
        const hideLabels = { RU: "Скрыть ответы и объяснения", KZ: "Жауаптар мен түсіндірмелерді жасыру", EN: "Hide answers and explanations" };
        assert.equal(await evaluate(`document.activeElement.textContent`), hideLabels[lang]);
        assert.equal(await evaluate(`getComputedStyle(document.activeElement).outlineStyle`), "solid");
        await call("Input.dispatchKeyEvent", { type: "keyDown", key: " ", code: "Space", windowsVirtualKeyCode: 32 });
        await call("Input.dispatchKeyEvent", { type: "keyUp", key: " ", code: "Space", windowsVirtualKeyCode: 32 });
        await settle();
        assert.equal(await evaluate(`document.querySelectorAll('article button[aria-expanded]')[${index}].getAttribute('aria-expanded')`), "false");
        assert.equal(await evaluate(`document.activeElement.textContent`), ui.showAnswer);
      }
      assert(await evaluate("[...document.querySelectorAll('article textarea, article input')].every(el => el.labels.length > 0)"), "All fields have labels");
      await call("Input.dispatchKeyEvent", { type: "keyDown", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
      await call("Input.dispatchKeyEvent", { type: "keyUp", key: "Tab", code: "Tab", windowsVirtualKeyCode: 9 });
      assert.equal(await evaluate("document.activeElement.type"), "checkbox");
      assert.equal(await evaluate("document.querySelector('table textarea').value"), "Independent answer");
      for (const width of [320, 375, 1280]) {
        await call("Emulation.setDeviceMetricsOverride", { width, height: 900, deviceScaleFactor: 1, mobile: width < 500 });
        assert(await evaluate("document.documentElement.scrollWidth <= window.innerWidth"), `No page overflow: ${lang}, ${width}px`);
      }
      console.log(`PASS ${lang}: disclosures, sequence validation, undo/reset, inputs, checklist, 320/375/1280px`);
    }
    assert.deepEqual(errors, [], "No browser runtime exceptions");
    await call("Emulation.setDeviceMetricsOverride", { width: 375, height: 900, deviceScaleFactor: 1, mobile: true });
    const screenshot = await call("Page.captureScreenshot", { format: "png" });
    const path = require("node:path").join(require("node:os").tmpdir(), "neuro-practice-mobile.png");
    fs.writeFileSync(path, Buffer.from(screenshot.data, "base64"));
    console.log(`Screenshot: ${path}`);
  } finally {
    ws.close();
  }
}

const timeout = setTimeout(() => { console.error("Browser check timed out"); process.exit(1); }, 90000);
main().catch((error) => { console.error(error); process.exitCode = 1; }).finally(() => clearTimeout(timeout));
