# Scientific audit addendum — 2026-10-19

This file supplements docs/scientific-review-progress-2026-10-13.md, which is too large for the current file-write interface.

## Module 5 / theory — source-level audit

Read the actual registry (content/index.ts), the shared foundation theory (content/course-foundation/index.ts), the detailed theory (content/course-foundation/module-five-theory.ts), types, the module-five test and Vercel configuration.

Read these Library PDF pages directly: Ganong 23rd ed., PDF pp. 127–130 (chemical and electrical synapses, calcium-triggered release); Guyton & Hall 13th ed., PDF pp. 556–557 (chemical versus gap-junction transmission); C. L. Ghai Practical Physiology 8th ed., PDF pp. 353–354 (isolated nerve-muscle preparation and direct versus indirect stimulation). Ghai is not a source for CNS electrical synapses.

Confirmed defect: the detailed theory source was present but not imported or registered in the live lesson registry. Students therefore received the generic foundation instead of the authored chemical/electrical synapse comparison, neuromuscular transmission and virtual-model limitations. The proposed fix registers createModuleFiveTheory for RU, EN and KZ, preserving the base lesson and other modules.

The authored theory correctly distinguishes probabilistic quantal transmitter release, local end-plate potentials versus propagated muscle action potentials, and the limits of the deterministic simulator. A separate scientific translation review by a Kazakh-language physiology specialist is still needed.

The existing module-five-interactive regression script was extended to verify that the actual lesson registry imports and invokes the reviewed theory for each locale and that the TypeScript source parses.

Node, npm audit:course, tsc, next build, browser, audio, mobile and keyboard tests remain UNRUN. The container cannot resolve github.com to check out the repository. These source-level checks do not establish a successful build. Only the module 5 theory section was reviewed here; the full 25 x 17 section audit is NOT complete. Do not merge into main or enable Vercel preview deployment.
