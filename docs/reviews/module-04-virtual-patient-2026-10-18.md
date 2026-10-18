# Module 4: virtual-patient — 18 October 2026

## Source coverage
Read the actual files `content/virtual-patients.ts`, `content/reviewed-virtual-patients.ts`, `components/UnifiedVirtualPatient.tsx`, `components/VirtualPatientVisual.tsx`, `content/course-foundation/module-four-theory.ts`, `module-four-summary.ts`, `module-four-learning.ts`, `module-four-questions.ts`, `module-four-clinical.ts`, `package.json`, `vercel.json`. Consulted the Library PDF texts directly: Guyton & Hall 13th ed. PDF pages 69–72, Ganong 23rd ed. PDF pages 96–99, and C. L. Ghai 8th ed. PDF pages 379–381.

## Verified defects and corrections
The first five stages previously reused other stages' correct decisions as implausible distractors, and the interface showed a human portrait for a computer model. Replaced them with six explicit physiology questions, each with one correct and two plausible competing options, full explanations and RU/EN/KZ text. Topics: Nernst vs Goldman; extracellular K+; graded local responses vs all-or-none spikes; Na+/K+ channel phases; refractory periods; firing frequency vs compound nerve recruitment. The next observation is explicitly predefined, not caused by clicking a choice. The correct-option permutation is guarded. The computer-model UI hides the patient portrait for modules 3 and 4.

Commits: `2619f005` (new review), `38ed6158` (RU correction), `9854257c` (routing and model UI), `0c47520e` (AST regression script and audit:science registration).

## Checks and limitations
Nine source-level assertions passed. Independently calculated at 37 C: E(K) for 4/8 mM external K+ = -95.02/-76.50 mV, two-ion Vm = -71.16/-62.02 mV, agreeing with lesson rounding. Node/AST, npm ci, audit:course, tsc, Next build, browser, mobile, voice and actual state-persistence checks are NOT verified; container DNS cannot resolve github.com and no workflow run was found for the latest reviewed SHA. Kazakh medical-language copy still needs expert review. The unimported module-four-learning.ts and active module-four-summary.ts duplicate objectives and summaries and should be reconciled after checking imports. Module 4 and all 425 sections remain incompletely audited. No merge, production deployment or Vercel preview was made.
