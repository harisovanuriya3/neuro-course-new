# Objectives and theory media audit — 14 October 2026

Base: `ba618f53ff574b72ce1adc7f9926437204ba4911` (`fix/course-expert-review`), which includes the prior expert-review corrections. `main` was still `a5258d3`. Historical commits `d96e783` and `b785eae` were fetched and inspected. This update follows the user's later authorization to fix, add theory media and publish.

## Code-confirmed results

- `StudyContent.tsx` renders each objective as a heading and description, followed by one shared navigation block. There is no per-objective mapping to individual theory paragraphs or tasks.
- `MaterialLink` builds `/modules/${moduleId}/${section}?lang=${language}` with an optional fragment. All 75 Objectives variants contain five links without fragments. The current route supplies the module ID; none of these links hardcodes another module.
- `content/sections.ts` supplies localized section names. No English service labels were found in the 375 RU/EN/KZ objective link instances or their localized navigation headings. This is scoped to Objectives navigation, not every string in the course or words within external images.
- The route validates module IDs and section slugs. Interactive laboratories and virtual patients have dedicated route branches; their absence from `getLesson` alone is not a broken link.
- A real inconsistency was found: Objectives placed Interactive after Cases, whereas full navigation and ContinueLearning place it before Practice. The five-item route now uses one shared `recommendedPath` in the same relative order: Theory → Interactive → Practice → Cases → Virtual Patient. Its heading explicitly says it is a short route; the full 17-section navigation remains intact.
- ContinueLearning is based on locally recorded visits, not demonstrated mastery. The short Objectives route is not an adaptive recommendation.

## Theory media changes

- Added a clearly visible media entry block to all 25 theory modules in RU/EN/KZ, with an expandable, existing localized step animation and links to the module media page and the anatomy/laboratory area.
- Module 1 now includes the existing locally stored anatomical specimen photograph, caption and attribution in theory. Other modules retain their existing images and laboratories; these were not replaced by generic pictures.
- Added verified creator-page video links for modules 1 and 3 (neuron function), 4 (action potential), and 5–6 (chemical synapse). Module 4 also embeds the Khan Academy video through YouTube's privacy-enhanced player with a persistent external fallback link. English audio is explicitly labelled in all three interface languages. No claim is made that all 25 modules now have new external videos.
- Sources: https://www.khanacademy.org/v/overview-of-neuron-function ; https://en.khanacademy.org/science/mcat/organ-systems/neuron-membrane-potentials/v/neuron-action-potential-mechanism ; https://www.khanacademy.org/science/biology/human-biology/neuron-nervous-system/v/neuronal-synapses-chemical ; https://www.youtube.com/watch?v=MZz4OUOyFvg . These are creator links/embeds, not copied video files.

## Validation

- Full `npm run audit:course`, `npx tsc --noEmit`, `npm run build`: passed.
- Data check: 75 Objectives variants, 375 link targets, valid sections, localized titles, consistent order.
- Local production HTTP check: all 450 combinations of 25 modules × 3 languages × Objectives/Theory/Interactive/Practice/Cases/Virtual Patient returned 200 without a Next.js not-found marker. All 75 Theory responses contain the new media block and anatomy anchor.

## What code and HTTP cannot establish

Actual production clicks, browser rendering at different zoom levels, external video playback/embedding permissions, image access from university networks, real screen-reader behavior, phone voices/microphone and persistence on a student's device must be checked separately. External images may contain English anatomical labels even when the surrounding interface is localized. A successful build or HTTP 200 does not prove playback or educational mastery.

- Local Chromium: 9 scenarios (modules 1, 4, 25 × RU/EN/KZ) passed at 390 px: Objectives → Theory click, animation expansion/step, anatomy anchor, local module-1 photograph, module-4 iframe presence. No page overflow or uncaught JS errors. External requests were deliberately blocked, so video playback was not tested.
