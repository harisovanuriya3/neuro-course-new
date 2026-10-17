# Scientific review continuation — 17 October 2026

Branch: refactor/evidence-based-assessment-audit. No merge, no Vercel deployment.

## Module 4 — theory and membrane-laboratory calculations

Source files read: content/course-foundation/topics.ts (module 4 RU/EN/KZ), content/course-foundation/index.ts, content/course-foundation/module-four-theory.ts, content/index.ts, components/MembraneElectrophysiologyLab.tsx, module-four-pretest.ts, module-four-practice.ts, module-four-clinical.ts, scripts/check-module-four-lab.cjs, scripts/check-module-four-pretest.cjs, scripts/check-module-four-clinical.cjs, package.json, package-lock.json, and vercel.json.

Library textbooks read directly: Guyton & Hall 13th ed., PDF pages 68–70 (Nernst, Goldman, Na/K pump); Ganong 23rd ed., PDF pages 96–99 (resting potential, Na/K conductances, all-or-none, refractoriness); C. L. Ghai 8th ed., PDF pages 379–381 (action potential and local responses). Module 3 references were additionally compared to Ganong PDF 92–94, Guyton PDF 78–79, Ghai PDF 249–251. The public Ghai 8th-edition library catalog was accessible; this is not a full-text link.

Confirmed teaching issue: the foundational lesson previously implied that any stronger suprathreshold stimulus is mainly encoded as a higher spike frequency. This conflated a brief stimulus in a single axon with firing-rate coding under sustained input and recruitment of more fibers in a nerve trunk. Both the foundational interpretation and the expanded theory now distinguish these mechanisms in RU, EN, KZ. Content commits: 5d49d090, 18cb4951. Regression guard commits: 8e0c2961, 1fa807c7.

Source-level checks: 7/7 conditions passed (three languages in both sources, removal of the old overgeneralization, regression checks present, TypeScript manifest/lock both at 6.0.3, preview disabled). Independent two-ion calculations at 37 C: at external K=4 mM, E(K)=-95.02 mV, E(Na)=+66.59 mV, Vm=-71.16 mV; at K=8 mM, E(K)=-76.49 mV, Vm=-62.01 mV. Rounded teaching values match. The action-potential trace is explicitly illustrative, not a Hodgkin-Huxley numerical simulation.

Limitations: checkout via container failed because github.com DNS did not resolve. npm run audit:course, tsc, next build, browser, mobile, keyboard, speech and saved-progress tests were NOT run. No workflow run was found for SHA 1fa807c7. Only the stated aspects of module 4 theory and interactive were addressed; neither module 4 nor all 425 course sections have full verification. The original progress journal at docs/scientific-review-progress-2026-10-13.md remains unchanged because GitHub file replacement was rejected. This file is the dated continuation pending consolidation.
