# PR #22: preservation and scientific review checklist

Status: review branch only. Do not merge or publish without professor approval.

## Non-destructive editing rules
- Keep all 25 modules and all RU/KZ/EN variants.
- Preserve theory, practice, assessment questions, answer explanations, media links, cross-references, interactive laboratories, and virtual patients.
- Prefer additive changes over replacement. Before removing a duplicated visual, verify the retained copy and every route to it.
- Do not interpret a successful build as evidence of scientific validity or visual quality.
- Inspect each visual in its rendered module, on mobile and desktop, before acceptance.
- For externally sourced figures, record original URL, author/attribution, license, and relevant anatomical structure.

## Mandatory module-by-module review
For each of modules 1–25 and each language, verify:
1. Theory is scientifically accurate, coherent, and appropriately referenced.
2. Practical tasks include instructions, observations, expected outcomes, and physiological interpretation.
3. Clinical cases contain sufficient data, correct answer and rationale.
4. Tests are unambiguous, with validated correct options and explanations.
5. Media depict the actual anatomical/physiological subject rather than a generic substitute.
6. Animations show meaningful physiological changes; static diagrams are not labelled as animations.
7. Virtual laboratories expose domain-relevant controls and outcomes, not merely arbitrary sliders.
8. Virtual patients provide meaningful scenarios and feedback, not empty navigation.
9. Resource-library links resolve and the same resources remain accessible from the module.
10. No overlapping text, duplicate images, broken references, or missing translations.

## Sechenov experiment: priority scientific review
- Preserve the historical central-inhibition experiment and its three-language educational controls.
- Replace the stylized frog drawing with a scientifically reviewed anatomical depiction only when a suitable rights-cleared asset is available; never substitute an unlicensed web image.
- Distinguish historical preparation, optic-thalamic region, spinal reflex arc, stimulus, and observed withdrawal.
- Explicitly label simulated latency as illustrative, not an experimentally calibrated quantitative prediction.
- Review the physiological accuracy of the descending-inhibition description and the prediction logic.
- Ensure conditions (baseline, NaCl, washout) can be compared at identical stimulus strengths.
- Do not present this historical experiment as a protocol for live animal use.

## Release gate
Before merging, run the full course audit, TypeScript validation, production build, resource-library check, route and asset checks, and manual RU/KZ/EN visual review. Record findings and obtain professor approval.
