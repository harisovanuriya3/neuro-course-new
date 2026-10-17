# Module 4 theory — evidence and remaining checks (17 October 2026)

Status: partial source-level review only; not end-to-end certification.

Read the real module 4 theory, source topic, pretest, summary, clinical bridge, practice, cases, interactive lab, registration, regression script, package files and Vercel config. Directly read the uploaded Library textbook PDFs: Guyton & Hall 13e PDF pages 69–71 (Nernst, Goldman, ionic gradients); Ganong 23e pages 96–99 (resting voltage, action potential, refractoriness); Ghai 8e pages 379–381 (recording, AP phases and compound response).

**Confirmed correction:** Kazakh module 4 theory previously said extracellular potassium rose “8 мМ-ге”, ambiguously meaning *by* 8 mM. It now explicitly says it rose **from 4 to 8 mM**, with all other parameters unchanged. Commit `702631003050b1434bbd293df1995757dd9e9980`. RU/EN descriptions and the mechanisms agree with the three textbooks; no confirmed RU/EN factual error found in this targeted pass.

**Independent JS numerical check (37 °C):** E(K) for 4 mM = −95.0176 mV; for 8 mM = −76.4931 mV; E(Na) = +66.5947 mV; two-ion Goldman Vm = −71.1609 mV and −62.0132 mV. All match the rounded figures in the lesson. Source checks also confirmed the KZ registration and Vercel preview disabled for this branch. Current package.json AND package-lock.json use TypeScript **6.0.3** (the journal's earlier 7.0.2 note is outdated). Successful CI/build for the current commit remains unverified.

**Unresolved, verified UI issue:** the `MembraneElectrophysiologyLab.tsx` waveform renders its full 101-point result immediately on Run; only the cursor moves with `progress`. This prematurely reveals the outcome before the animation ends. A progressive-trace fix and an accompanying regression assertion were prepared but both updates were blocked by the available GitHub write tool; neither fix is committed. Requires source correction and browser verification of Run/Pause/Replay, keyboard and mobile behavior.

**Test limitations:** local git checkout failed DNS resolution of github.com. No npm audit, TypeScript compilation, Next build or browser testing in this pass. The long central progress journal could not be updated because the GitHub write tool rejected the replacement payload; this supplementary record preserves the evidence pending consolidation. All 25 × 17 sections remain without full end-to-end certification. No main merge, preview or production deploy.
