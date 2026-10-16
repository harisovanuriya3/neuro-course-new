# Module 4 partial review

Source and textbook review of theory, pretest, interactive is in progress. Full test suite and browser checks remain pending.

Sources read directly: Guyton & Hall 13e PDF pages 68–74 (Nernst, Goldman, resting potential and pump); Ganong 23e PDF pages 95–99 (Na/K conductances, refractory periods); C. L. Ghai 8e PDF pages 379–381 (action-potential phases and recording). Source files: content/course-foundation/topics.ts module 4, module-four-theory.ts, module-four-pretest.ts, components/MembraneElectrophysiologyLab.tsx, ExperimentReflection.tsx, ModuleProgress.tsx, content/index.ts, scripts/check-module-four-lab.cjs, package.json, package-lock.json and vercel.json.

Independent numerical check (37 C, default lab inputs): E(K)=-95.018 mV, E(Na)=+66.595 mV, two-ion Goldman Vm=-71.161 mV. All match the trilingual theory. AP shape is an explicitly illustrative trace, not a Hodgkin-Huxley computation or diagnosis.

Corrections: 91c5575b removes keyword-based grading from lab reflections; 84951ca5 relabels buttons in RU/EN/KZ. Legacy saved scores require a follow-up fix.

Progress fix: e1975758 and 8e7b998a exclude legacy self-check markers from competency rows.

Source checks: 12/12 initial and 8/8 after fixes passed. CI, build and browser tests remain pending.
