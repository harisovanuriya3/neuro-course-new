import type { Lesson } from "../../../types";

const lesson: Lesson = {
  title: "Module 4. Membrane Physiology: Resting Potential, Ion Channels, and the Action Potential",
  sections: [
    {
      id: "learning-goals",
      title: "1. Learning goals and functional anatomy",
      blocks: [
        { type: "paragraph", text: "By the end of this chapter, students should be able to explain the origin of the resting potential and the phases of the action potential; relate ion-channel states to excitability and refractoriness; predict how altered ionic gradients or myelination affect signaling; and distinguish measured electrical variables from their physiological interpretation." },
        { type: "paragraph", text: "Membrane physiology links neuronal structure to function. The plasma membrane is a lipid bilayer containing channels, transporters, and receptors. Cytoplasm and extracellular fluid form distinct ionic compartments. Membrane resistance, capacitance, and channel distribution determine how quickly voltage changes and local current spreads. The axon initial segment often has a high density of voltage-gated Na⁺ channels and initiates spikes; in myelinated fibers, channel density is especially high at the nodes of Ranvier." },
        { type: "callout", title: "Core principle", text: "Membrane potential reflects charge separation across the membrane. Its value depends not only on ionic concentrations but also on the membrane's relative permeability to each ion." },
      ],
    },
    {
      id: "ionic-gradients",
      title: "2. Ionic gradients and the resting potential",
      blocks: [
        { type: "paragraph", text: "In typical neurons, intracellular K⁺ concentration is much higher than extracellular K⁺, whereas intracellular Na⁺ is substantially lower. For illustration, at 37 °C, standard physiological solutions often use approximate values of 140 mmol/L intracellular K⁺ and 10–15 mmol/L intracellular Na⁺, versus 3.5–5 mmol/L extracellular K⁺ and 135–145 mmol/L extracellular Na⁺. These are not universal reference intervals: actual values depend on cell type, tissue, solution composition, and measurement method." },
        { type: "paragraph", text: "Ion gradients are established by transport and selective permeability. Using energy from one ATP molecule, the Na⁺/K⁺-ATPase moves three Na⁺ ions out of the cell and two K⁺ ions in. It maintains gradients over time and contributes a small direct electrogenic effect, but it does not produce the rapid repolarization of each individual spike. At rest, many neurons are more permeable to K⁺ than to Na⁺. K⁺ efflux along its electrochemical gradient leaves excess negative charge inside until electrical force balances the chemical driving force." },
        { type: "paragraph", text: "The Nernst equation gives the equilibrium potential for one ion: E = (RT/zF) ln([ion]outside/[ion]inside). The resting potential reflects the combined contributions of several ions and their relative permeabilities; the Goldman–Hodgkin–Katz equation is used to estimate it. Many CNS neurons rest at approximately −60 to −70 mV, but values vary with cell type and state. The potential is recorded intracellularly relative to an extracellular reference. A value cannot be treated as a universal norm without specifying the cell, temperature, ionic solution, and recording conditions." },
      ],
    },
    {
      id: "graded-potentials",
      title: "3. Local potentials and threshold",
      blocks: [
        { type: "paragraph", text: "Opening ligand-gated or mechanosensitive channels produces a graded local potential. Its amplitude depends on input strength and duration; as it spreads passively, it decays because of current leak and cable properties. Synaptic and receptor potentials can sum over time and across space. The response therefore depends on the combination, location, and timing of inputs as well as the cell's current state." },
        { type: "paragraph", text: "When depolarization at the axon initial segment reaches threshold, voltage-gated Na⁺ channels activate rapidly. Na⁺ influx depolarizes the membrane further and recruits additional channels, creating positive feedback and a regenerative upstroke. Threshold is not a fixed number: channel density and state, prior activity, temperature, and starting voltage all influence it. Approximately −55 mV is sometimes used as a teaching approximation for selected neurons, not as a universal physiological or diagnostic threshold." },
      ],
    },
    {
      id: "action-potential",
      title: "4. Action-potential phases and channel kinetics",
      blocks: [
        { type: "paragraph", text: "After threshold is reached, rapid Na⁺-channel activation produces the rising phase of the action potential. The membrane potential briefly becomes positive relative to the extracellular space; in many neurons, the peak is around +30 to +40 mV, although waveform and amplitude depend on cell type and recording location. Na⁺ channels then inactivate while voltage-gated K⁺ conductance rises with a delay. K⁺ efflux drives repolarization; if K⁺ conductance remains elevated, an after-hyperpolarization follows." },
        { type: "paragraph", text: "Channel states—closed, activated, and inactivated—are distinct. Na⁺-channel inactivation is not simply pore closure: recovery depends on repolarization and time. During the absolute refractory period, another action potential cannot be generated in that membrane segment because a substantial fraction of Na⁺ channels is inactivated. During the relative refractory period, some channels have recovered, but persistent K⁺ conductance and incomplete Na⁺-channel recovery mean that a stronger input is needed." },
        { type: "callout", title: "Encoding stimulus intensity", text: "An action potential at a membrane site is regenerative and approximately all-or-none. Suprathreshold stimulus intensity is usually encoded by firing frequency and the number of recruited fibers, not by a proportional increase in the amplitude of each spike." },
      ],
    },
    {
      id: "propagation",
      title: "5. Axonal conduction and the role of myelin",
      blocks: [
        { type: "paragraph", text: "Local current from an active membrane segment depolarizes adjacent membrane toward threshold, where the next action potential is regenerated. Refractoriness in the segment that has just fired limits backward propagation and supports the usual direction of travel from the initiation zone toward the terminals. Conduction speed and reliability depend on axon diameter, membrane and axial resistance, fiber geometry, temperature, and channel distribution." },
        { type: "paragraph", text: "Myelin increases resistance to current leak and reduces effective membrane capacitance along internodes. Current spreads beneath the myelin to the next node of Ranvier, where the action potential is regenerated; this is saltatory conduction. The impulse does not jump across empty space: current flows through a continuous electrical pathway, while active regeneration is concentrated at nodes. Conduction in large myelinated peripheral fibers can reach tens of metres per second and approximately 50–120 m/s; the range depends on the fiber and measurement conditions." },
        { type: "paragraph", text: "Demyelination increases current leak, alters capacitive properties, and reduces the safety factor for conduction. Conduction may slow, fail, or become dependent on firing frequency. Thus, an anatomically continuous axon does not necessarily retain normal function." },
      ],
    },
    {
      id: "measurement",
      title: "6. Experimental methods and physiological measurements",
      blocks: [
        { type: "paragraph", text: "Voltage is measured in millivolts (mV), current in amperes or submultiples, ionic concentration in mmol/L, and conduction velocity in m/s. In current clamp, the investigator injects current and records the voltage response; in voltage clamp, membrane voltage is held at a chosen level while ionic currents are measured. Patch clamp can measure currents from a whole cell or individual channels. Intracellular recording samples a single cell, whereas a compound nerve action potential sums activity from many fibers and depends on response synchrony." },
        { type: "paragraph", text: "Hodgkin and Huxley's classic experiments on the squid giant axon linked membrane-current changes to Na⁺ and K⁺ movement and quantitatively described regenerative excitation. This work laid the foundation for modern channel models, but giant-axon parameters should not be transferred to human neurons without validation. Record interpretation must account for temperature, extracellular solution, electrode position, filtering, stimulation artifact, and whether the measurement came from one cell or a population." },
        { type: "list", items: ["Resting potential is the voltage difference across a membrane, measured in mV; approximately −60 to −70 mV is a useful guide for many CNS neurons under stable physiological conditions.", "Threshold, peak, and action-potential duration depend on cell type; axonal spike duration is often measured in milliseconds, but there is no single range for all neurons.", "Conduction velocity is calculated from distance and the latency difference between recording sites; temperature and the tested segment should be reported.", "These values are interpretive guides, not stand-alone diagnostic criteria."] },
      ],
    },
    {
      id: "regulation-clinic",
      title: "7. Regulation, clinical relevance, and common errors",
      blocks: [
        { type: "paragraph", text: "Excitability is regulated by extracellular ionic composition, pumps and transporters, channel phosphorylation, neuromodulators, and prior activity. Increasing extracellular K⁺ usually makes the resting potential less negative. Moderate depolarization may bring a cell closer to threshold, whereas sustained, marked depolarization inactivates some Na⁺ channels and reduces spike-generating capacity. Excitability therefore cannot be inferred from the initial voltage shift alone." },
        { type: "paragraph", text: "Changes in K⁺ concentration can alter nerve and muscle excitability; clinical effects depend on the magnitude and rate of change, renal function, medications, and tissue state. Local-anesthetic blockade of voltage-gated Na⁺ channels impairs conduction of nociceptive impulses. Demyelinating disease disrupts current distribution and conduction reliability. These mechanisms connect cellular physiology to clinical findings but do not replace diagnostic criteria." },
        { type: "list", items: ["Do not attribute rapid repolarization of each action potential to the Na⁺/K⁺-ATPase; its main role is maintaining gradients.", "Do not equate the equilibrium potential of one ion with the resting potential of the whole membrane.", "Do not assume that threshold, amplitude, or conduction velocity is identical across cells and methods.", "Do not infer a diagnosis from a single value without clinical context and recording conditions."] },
        { type: "paragraph", text: "This chapter connects neuronal structure and glial support in Module 3 with synaptic transmission in Module 5, excitation–inhibition integration in Module 6, and reflex-signal conduction in Module 7. In the Module 4 interactive laboratory, students should first predict the effect of extracellular K⁺ and membrane changes, then compare that prediction with the modeled voltage and threshold." },
      ],
    },
    {
      id: "further-reading",
      title: "8. Synthesis and further reading",
      blocks: [
        { type: "paragraph", text: "The resting potential arises from ionic gradients combined with selective permeability. The action potential is generated by regenerative Na⁺-channel activation followed by K⁺-dependent repolarization; channel states explain refractoriness, while membrane properties and myelin shape conduction. Pumps maintain gradients; rapid spike phases are produced by ionic currents through channels." },
        { type: "list", items: ["Guyton and Hall, Textbook of Medical Physiology — sections on excitable tissues and neural physiology.", "Ganong’s Review of Medical Physiology — chapters on membrane potentials and cellular electrical activity.", "Kandel et al., Principles of Neural Science — chapters on action potentials, ion channels, and signal propagation.", "OpenStax Anatomy and Physiology, The Action Potential: https://openstax.org/books/anatomy-and-physiology/pages/12-4-the-action-potential."] },
      ],
    },
    {
      id: "extracellular-potassium-experiment",
      title: "Experimental reasoning: extracellular K⁺, excitability and conduction failure",
      blocks: [
        { type: "paragraph", text: "A moderate rise in extracellular K⁺ makes the potassium equilibrium potential less negative and often depolarizes the membrane. This may initially bring the membrane closer to threshold, but sustained marked depolarization causes a larger fraction of voltage-gated Na⁺ channels to remain inactivated. Action-potential upstroke and amplitude may then decrease, and propagation can become unreliable." },
        { type: "paragraph", text: "An experiment must distinguish resting potential, threshold, maximum depolarization rate and axonal conduction velocity. Different protocols measure different quantities. Current clamp measures membrane voltage responses to injected current; voltage clamp measures ionic currents while voltage is controlled. Temperature, exposure duration and solution composition can materially alter the results." },
        { type: "paragraph", text: "Teaching scenario: after a moderate increase in extracellular K⁺, a cell depolarizes from −70 to −60 mV. Predict early and sustained effects on excitability, consider Na⁺ channel inactivation and propose a recovery control after restoring baseline extracellular K⁺. One membrane voltage measurement does not diagnose a cause of conduction failure." },
      ],
    },
    {
      id: "paired-pulse-refractoriness",
      title: "Reasoning exercise: refractory periods during paired stimulation",
      blocks: [
        { type: "paragraph", text: "In a teaching experiment, two identical suprathreshold stimuli are delivered to an isolated axon. At a 1 ms interval the second action potential is absent; at 3 ms the second response may be reduced or require a stronger stimulus; by 10 ms the usual response returns. These intervals are illustrative and depend on fiber type, temperature and recording conditions." },
        { type: "paragraph", text: "Students should distinguish the absolute refractory period, when many Na⁺ channels remain inactivated and another propagating impulse cannot be elicited, from the relative period, when partial Na⁺ channel recovery and residual K⁺ conductance increase threshold. Two stimuli therefore need not produce two identical spikes." },
        { type: "paragraph", text: "Controls include keeping temperature stable and comparing identical stimuli over different intervals while measuring response threshold and waveform. If suppression persists at a long interval, examine axonal damage, solution changes and recording artifacts rather than automatically attributing the finding to normal refractoriness." },
      ],
    },
    {
      id: "hyperkalemia-clinical-bridge",
      title: "Clinical reasoning: hyperkalemia and electrical excitability",
      blocks: [
        { type: "paragraph", text: "Hyperkalemia increases extracellular K⁺ and makes the potassium equilibrium potential less negative, often depolarizing excitable cells. The response is nonlinear: modest depolarization may initially facilitate threshold crossing, while larger or sustained depolarization reduces available voltage-gated Na⁺ channels through inactivation. Excitation and impulse propagation may consequently become impaired." },
        { type: "paragraph", text: "A student must distinguish an isolated neuron's electrical properties from clinical findings. ECG manifestations of hyperkalemia reflect cardiac electrophysiology and are not direct recordings of neuronal resting potential. One extracellular K⁺ value alone cannot reliably predict conduction velocity in a particular nerve fiber; the rate of change, tissue state and other electrolyte disturbances matter." },
        { type: "paragraph", text: "Worked reasoning: (1) predict the direction of E_K shift; (2) explain early and sustained effects on threshold and Na⁺ channel availability; (3) propose controlled measurements of membrane potential and response amplitude; (4) state the limits of extrapolating such experiments to a patient. This connects membrane biophysics to clinical reasoning without treating a mechanism as a diagnosis." },
      ],
    },
  ],
  outcomes: {
    title: "Learning outcomes",
    introduction: "After studying this module, students will be able to:",
    items: [
      "Explain how ionic gradients, selective permeability, and the Na⁺/K⁺-ATPase contribute to the resting potential.",
      "Distinguish an ionic equilibrium potential, resting potential, and action-potential threshold.",
      "Describe Na⁺-channel activation and inactivation, K⁺-dependent repolarization, and refractory periods in sequence.",
      "Predict how extracellular K⁺, temperature, or myelination affects excitability and conduction.",
      "Match current clamp, voltage clamp, and patch clamp to the variables they measure.",
      "Interpret action-potential measurements in light of cell type, experimental conditions, and method limitations.",
      "Relate altered membrane excitability to clinical mechanisms without treating a mechanism as a diagnosis.",
    ],
  },
  terms: {
    title: "Key terms",
    items: ["Resting potential", "Equilibrium potential", "Nernst equation", "Goldman–Hodgkin–Katz equation", "Action potential", "Voltage-gated Na⁺ channel", "Voltage-gated K⁺ channel", "Absolute and relative refractory periods", "Saltatory conduction", "Patch clamp", "Na⁺/K⁺-ATPase"],
  },
};

export default lesson;
