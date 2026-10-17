# Module 4 interactive: trial validity audit (2026-10-17)

Scope: read MembraneElectrophysiologyLab.tsx, module-four-theory.ts, module-four-practice.ts, module-four-clinical.ts, module-four-questions.ts, topics.ts, page.tsx, check-module-four-lab.cjs, package.json, vercel.json. Compared with user Library: Guyton & Hall 13e PDF pp. 68-71, Ganong 23e PDF pp. 96-99, C. L. Ghai 8e PDF pp. 379-380.

Confirmed a scoring bug: after a completed trial, slider changes could change the expected answer before a passive effect cleared the previous prediction, so the prior prediction might be scored for new inputs without running that trial. Fixed in commit a82bc328 by snapshotting nine adjustable parameters on Run and gating trace, result and score on the exact matching snapshot. Two regression assertions added in commit c9e7357b.

Numerical cross-check at 37 C: with K(out) 4/8 mM and K(in) 140 mM, E(K) is -95.02/-76.49 mV; the two-ion Goldman estimate with Na(out/in) 145/12 mM, P(K)=1, P(Na)=0.04 is -71.16/-62.01 mV. Values agree with RU/EN/KZ theory and clinical texts. Ten static source assertions passed, but Node/TypeScript/build/browser were not run in this turn because the container could not resolve github.com. No workflow run was returned for the latest commit by the available commit-run query.

Outstanding: module 4 foundational task asks for labeling an AP trace, but the lab has no annotation UI; a requested three-language topics.ts edit was not accepted by the write tool. Test rapid slider changes, replay, saved scores and mobile UI in a browser. TypeScript is pinned to 6.0.3 in both manifests. Full 25 x 17 audit remains incomplete. Only the refactor/evidence-based-assessment-audit branch changed; main and production untouched, previews disabled in vercel.json.
