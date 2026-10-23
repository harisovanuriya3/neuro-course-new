# Module 6 cases: focused audit, 23 October 2026

Scope: source-read of content/course-foundation/module-six-cases.ts (3 cases × RU/EN/KZ, 3 stages and 2 explanations per case); content/index.ts registration; content/cases.ts contract; module-six-practice.ts, check-module-five-cases.cjs, package.json and vercel.json.

Library originals directly read: Ganong 23e PDF pages 132–134 (summation, spike-initiation segment, presynaptic inhibition); Guyton & Hall 13e PDF pages 561–565 (synaptic currents and transmitters); C. L. Ghai 8e PDF pages 353–354 (isolated peripheral nerve–muscle preparation, not central synaptic recording). No textbook content copied into GitHub.

Correction committed: 2b077ef17d7ef321456e56a10c617aea07eee701. Case 2 in all three languages now specifies repeated trials on one neuron and the observed fraction of trials with spikes. A single paired recording cannot establish firing probability.

**Unresolved defect:** createModuleSixCases is not imported or registered in content/index.ts for module 6, so the authored cases are not displayed. GitHub writes to content/index.ts and to the existing large progress journal were blocked by the tool safety checks. Neither write succeeded. The next step is to register the cases for RU/EN/KZ, add a regression check, and run audit:course, tsc and build.

Coverage: module 6 cases reviewed at source level only, not UI; earlier focused checks covered objectives, pretest, theory, one-minute, clinical, practice, so 7/17 sections have focused reviews of varying depth. Ten module 6 sections and the full 425-section end-to-end review remain open. No Node/TS/build/browser execution was performed for this commit. Main and production untouched; Vercel previews remain disabled for the audit branch.
