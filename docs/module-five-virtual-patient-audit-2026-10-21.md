# Module 5 virtual-patient: targeted review (2026-10-21)

Scope: `content/virtual-patients.ts`, `content/reviewed-virtual-patients.ts`, `content/course-foundation/module-five-virtual-patient-review.ts`, `components/UnifiedVirtualPatient.tsx`, `components/VirtualPatientVisual.tsx`, `scripts/check-module-five-virtual-patient.cjs`, `package.json` and `vercel.json`.

Read in the user's Library: Ganong 23e PDF pp. 127–130; Guyton & Hall 13e PDF pp. 556–558; C. L. Ghai 8e PDF pp. 353–354. These support distinctions among chemical and electrical transmission, Ca2+-dependent release, graded end-plate potentials and the limitations of an isolated nerve–muscle preparation.

Verified from source: six stages, three options per stage, authored explanations and choices in RU/EN/KZ; a separate review layer supplies module-specific observations and discloses that choices do not change predefined data. The interface hides a patient portrait for module 5 and scores mechanism choices rather than clinical competence. This is structural review, not a passed runtime test.

Confirmed pedagogical defect: `mentorPrompt:c.task[language]` in `module-five-virtual-patient-review.ts` duplicates the stage question as the mentor's pre-answer message. Replace with six distinct, non-spoiling, localized hints. Existing regression checks only ensure the mentor message differs from the final explanation, not from the task.

Outstanding: connect `scripts/check-module-five-virtual-patient.cjs` to `audit:science`; add a regression assertion `mentorPrompt !== task`; run Node, TypeScript, build and keyboard/mobile browser checks; native-language KZ review. None of those runs is claimed complete.

All findings concern the review branch only. No main merge, preview or production deployment.
