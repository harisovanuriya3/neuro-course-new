const assert = require("node:assert/strict");
const { load } = require("./check-tests.cjs");

const { getLesson } = load("content/index.ts");
const { getSectionTitle } = load("content/sections.ts");
const languages = ["RU", "EN", "KZ"];
let navigationBlocks = 0;
let externalSourceBlocks = 0;

function internalHref(moduleId, language, target) {
  return `/modules/${moduleId}/${target.section}?lang=${language}${target.anchor ? `#${target.anchor}` : ""}`;
}

function validateUnique(entries, context) {
  const pairs = new Set();
  const hrefs = new Set();
  const labels = new Set();
  for (const { label, href } of entries) {
    const normalizedLabel = label.trim();
    assert(normalizedLabel, `${context}: empty link label for ${href}`);
    const pair = `${normalizedLabel}\u0000${href}`;
    assert(!pairs.has(pair), `${context}: duplicate label + href: ${normalizedLabel} -> ${href}`);
    assert(!hrefs.has(href), `${context}: duplicate href: ${href}`);
    assert(!labels.has(normalizedLabel), `${context}: repeated label: ${normalizedLabel}`);
    pairs.add(pair);
    hrefs.add(href);
    labels.add(normalizedLabel);
  }
}

function validateInternalBlock(links, moduleId, language, context) {
  navigationBlocks += 1;
  const entries = links.map(target => {
    assert.notEqual(target.section, "references", `${context}: self-referential References link`);
    const destination = getLesson(moduleId, target.section, language);
    assert(destination, `${context}: missing internal destination ${target.section}`);
    if (target.anchor) {
      const ids = value => Array.isArray(value) ? value.map(item => item.id) : [];
      const anchorIds = [
        ...ids(destination.sections),
        ...ids(destination.cards),
        ...ids(destination.questions),
        ...ids(destination.terms),
      ];
      assert(anchorIds.includes(target.anchor), `${context}: missing ${target.section} anchor #${target.anchor}`);
    }
    return {
      label: target.label ?? getSectionTitle(target.section, language),
      href: internalHref(moduleId, language, target),
    };
  });
  validateUnique(entries, context);
}

for (const language of languages) {
  for (let moduleId = 1; moduleId <= 25; moduleId += 1) {
    const lesson = getLesson(moduleId, "references", language);
    assert.equal(lesson?.kind, "references", `Module ${moduleId} ${language}: References lesson is missing`);
    for (const card of lesson.cards) {
      validateInternalBlock(card.links, moduleId, language, `Module ${moduleId} ${language} / ${card.title}`);
    }
    if (lesson.sources) {
      externalSourceBlocks += 1;
      validateUnique(lesson.sources.map(source => {
        assert(/^https?:\/\//.test(source.href), `Module ${moduleId} ${language}: external source is not an HTTP(S) URL: ${source.href}`);
        return { label: source.title, href: source.href };
      }), `Module ${moduleId} ${language} / external sources`);
      for (const source of lesson.sources) {
        validateInternalBlock(source.links, moduleId, language, `Module ${moduleId} ${language} / related material for ${source.title}`);
      }
    }
  }
}

console.log(`References validation passed: 25 modules × 3 languages; ${navigationBlocks} internal navigation/resource blocks and ${externalSourceBlocks} external-source blocks have unique labels and hrefs.`);
