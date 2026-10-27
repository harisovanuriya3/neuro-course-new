const assert = require("node:assert/strict");
const { load } = require("./check-tests.cjs");

const { getLesson } = load("content/index.ts");
const { getSectionTitle } = load("content/sections.ts");
const languages = ["RU", "EN", "KZ"];
// Interactive labs for modules 2–25 are real App Router component routes,
// not entries in content/index.ts. Validate the actual component and route
// instead of falsely requiring a duplicate/fictitious content lesson.
const fs = require("node:fs");
const routeSource = fs.readFileSync("app/modules/[id]/[section]/page.tsx", "utf8");
const interactiveComponents = {
  2:"EEGLab",3:"NerveFiberLab",4:"MembraneElectrophysiologyLab",
  5:"SynapseExperimentLab",6:"IntegrationExperimentLab",7:"ReflexLab",
  8:"PathwayLab",9:"SpinalRegulationLab",10:"BrainstemLab",
  11:"MotorControlLab",12:"BasalGangliaLab",13:"CerebellumLab",
  14:"ThalamusLab",15:"HypothalamusLab",16:"LimbicLab",
  17:"AmygdalaLab",18:"CortexLab",19:"SomatosensoryLab",
  20:"VisionLab",21:"SensorySystemsLab",22:"AutonomicLab",
  23:"LearningMemoryLab",24:"SleepRhythmLab",25:"PlasticityLab"
};
function hasActualInteractiveRoute(moduleId) {
  const component = interactiveComponents[moduleId];
  return Boolean(component &&
    routeSource.includes('moduleNumber === '+moduleId+' && section === "interactive"') &&
    routeSource.includes('import '+component+' from ') &&
    routeSource.includes('<'+component+' language={lang} />'));
}
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
    const routedInteractive = !destination && target.section === "interactive" &&
      hasActualInteractiveRoute(moduleId);
    assert(destination || routedInteractive,
      `${context}: missing internal destination ${target.section}`);
    if (routedInteractive) {
      assert(!target.anchor,
        `${context}: interactive route has no verified anchor #${target.anchor}`);
    }
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
