# Author review — 26 requested changes (hold for author approval)

**Release gate:** Do NOT merge into main or deploy to Vercel until the author reviews the completed preview and explicitly approves publication. Preserve all existing content and routes. RU/EN/KZ parity mandatory.

## Navigation and tools
1. Make four learning-stage tiles clickable in all 25 modules (included from PR #42; verify destinations).
2. Translate anatomical labels on images into RU/EN/KZ, use verified anatomical terminology.
3. Replace confusing module 1 lab with an instructed, measurable physiology experiment; extend thematic labs.
4. Make anatomical hotspots link to matching theory and support touch, keyboard and back navigation.
17. Color-coded progress with clear legend; separate completion from answer accuracy.
23. Beautiful progress dashboard, clickable resume links to unfinished lessons and questions.
24. Larger colorful bookmark/note workspace, drawing canvas, save/export, mobile support.
26. Consistent visible timer, clock, calendar, search, navigation and drawing tools; prevent overlap on phones.

## Module 1 and cross-course theory
5. Expand eight nervous-system functions with mechanism, examples, illustrations.
6. Expand CNS/PNS anatomy, physiology, clinical localization; illustrations beside text.
7. Expand membrane potentials, conduction, synapses, excitation/inhibition and integration, with examples and visualizations.
8. Expand relevance to clinical neurology, diagnostics, rehabilitation, pharmacology and research with appropriate visuals.
9. Expand receptor→afferent→central integration→efferent→effector→feedback with examples; apply theory/visual quality standard across all 25 modules.
13. Replace simplistic interactive schemes with scientific animations and model-driven parameter controls.
14. Expand practical work with goals, methods, observations, graphs, interpretation and visuals.

## Assessment
10. Pretest: exactly 20 unique questions per module, exactly four options per question, key and explanation (25 × 3 languages).
11. One-minute essentials: reveal model answer only after student submits own answer; preserve response.
12. Clinical link: 20 distinct clinical cases per module, realistic lawful imagery/animations, physiologic explanations.
15. Situation analysis: 25 cases per module, model answer revealed after submission.
16. Explained test: 25 questions per module, four options, numbered navigation, saved partial attempts and scores, resume unfinished.
18. Control questions: 25 per module, model answers after submission, staged difficulty.
19. Virtual patients: 10 distinct interactive cases per module.
22. Explain in your own words: 20 prompts per module, student response then model answer and rubric.

## Resources
20. Consolidate all licensed media/video/animations/labs with direct theory cross-links; no duplicate asset storage.
21. Glossary: 50 module-relevant terms per module, with visual and cross-links.
25. Clickable, verified, properly attributed RU/KZ/EN bibliography and source links, distinguish restricted access.

## Quality and publication
- No fake scientific data or decorative-only sliders; annotate simulation assumptions.
- No hallucinated source citations or rights-unclear images; retain original attribution.
- Every new question must be clinically/scientifically reviewed, answer options checked for ambiguity, 4 options required.
- Distinguish completion percentage from score. Resume progress must persist across sessions; cross-device sync requires authenticated backend and must be tested, not assumed.
- Test navigation, focus, touch, mobile widths, timer overlays, language switching and direct links in a real browser.
- Compare before/after inventory for all 25 modules, check zero lost content and route regressions.
- CI + full content checks + actual screenshot/interaction QA before author preview.
- Author preview first; publication only after explicit author approval.

Status: Work initiated in separate staging branch; requirements are NOT all implemented or verified.
