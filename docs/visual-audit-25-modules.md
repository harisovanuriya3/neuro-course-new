# Visual audit of the 25 neurophysiology modules

Audit basis: the visual must explain the module's physiological mechanism, expose a changing state or pathway, and remain understandable without animation alone. A build passing is not treated as evidence of visual quality.

| Module | Key physiological mechanism | Current explanatory visual | Missing visual found | Action |
|---:|---|---|---|---|
| 1 | Nervous-system organization and signal direction | Selectable organization, pathway, synapse and integration diagrams | No | Retain |
| 2 | Recorded neural activity and evoked response | EEG traces with stimulus and adjustable recording conditions | No | Retain |
| 3 | Axonal conduction, diameter, myelin and temperature | Animated nerve fiber with velocity and delay readouts | No | Retain specialized lab; generic station removed |
| 4 | Resting potential and action-potential phases | Dynamic membrane-potential trace and ionic parameters | No | Retain |
| 5 | Chemical versus electrical transmission | Synapse sequence, vesicle/Ca²⁺ model and response experiment | No | Retain corrected node mapping |
| 6 | Excitation, inhibition and summation | Dynamic integration trace with adjustable inputs | No | Retain |
| 7 | Reflex arc and reciprocal control | Animated reflex pathway with adjustable stimulus | No | Retain |
| 8 | Ascending pathway and decussation | Selectable pathway stages and crossing level | No | Retain |
| 9 | Segmental spinal regulation | Spinal circuit with adjustable descending influence | No | Retain |
| 10 | Brainstem networks and output | Dynamic brainstem pathway plus pupillary pathway builder | No | Retain |
| 11 | Motor recruitment and EMG output | Adjustable recruitment with EMG and force response | No | Retain specialized lab; generic station removed |
| 12 | Direct/indirect basal-ganglia balance | Dynamic pathway balance with adjustable inputs | No | Retain |
| 13 | Cerebellar error correction | Command–movement–error–feedback loop | No | Retain |
| 14 | Thalamic relay and gating | Adjustable relay/gating diagram | No | Retain |
| 15 | Hypothalamic homeostatic feedback | Osmolality/input–integration–output feedback model | No | Retain |
| 16 | Limbic context and behavioral output | Adjustable limbic-circuit response | No | Retain |
| 17 | Amygdala salience and regulation | Adjustable threat/regulatory response | No | Retain |
| 18 | Distributed cortical processing | Selectable cortical-function network | No | Retain |
| 19 | Receptive field and somatosensory coding | Stimulus/receptive-field experiment with measured response | No | Retain specialized lab; generic station removed |
| 20 | Retinal adaptation; partial crossing; field-loss localization | Luminance/contrast experiment plus selectable retina-to-cortex lesion map and paired visual fields | Yes: lesion localization was previously a generic sensory curve | Added `VisualPathwayLocalizer`; retained adaptation as a separate experiment |
| 21 | Sensory transduction and vestibulo-ocular/auditory processing | Topic-specific sensory experiment and vestibular pathway builder | No | Retain specialized lab; generic station removed |
| 22 | Baroreflex compensation after standing | Timed BP/HR traces and animated feedback stages | No | Retain current orthostatic lab |
| 23 | Encoding, consolidation and retrieval | Adjustable memory-process model | No | Retain |
| 24 | Homeostatic and circadian sleep drives | Dynamic two-process curves and EEG context | No | Retain |
| 25 | Practice-dependent plasticity, retention and transfer | Learning/retention trajectory with adjustable training | No | Retain |

The audit does not claim that browser rendering is flawless. Manual review is still required at narrow mobile widths, with 200% zoom, high contrast, reduced motion, and real keyboard/screen-reader use.
