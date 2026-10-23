import type { Lesson } from "../../../types";

const lesson: Lesson = {
  title: "Module 1. Introduction to Neurophysiology",
  sections: [
    {
      id: "nervous-system",
      title: "1. General Organization of the Nervous System",
      blocks: [
        { type: "paragraph", text: "The nervous system is a complex functional system that receives, transmits, processes, and integrates information from the body's external and internal environments." },
        { type: "paragraph", text: "It coordinates organs and functional systems, enables the body to adapt to changing environmental conditions, and contributes to the organization of behavior." },
        { type: "paragraph", text: "The neuron is the fundamental structural and functional unit of the nervous system: a specialized cell that receives, processes, and transmits signals. Glial cells support neuronal function, help maintain the local cellular environment, and participate in the formation of myelin sheaths." },
      ],
    },
    {
      id: "functions",
      title: "2. Major Functions of the Nervous System",
      blocks: [
        { type: "list", items: ["Detection of information.", "Conduction of neural signals.", "Analysis and integration of information.", "Generation of motor responses.", "Regulation of autonomic functions.", "Coordination of internal organ activity.", "Maintenance of homeostasis.", "Support of higher nervous functions."] },
        { type: "paragraph", text: "The nervous system does more than relay signals: it evaluates information in relation to the body's current state and previous experience to produce an appropriate response. For example, touching a hot object triggers rapid withdrawal of the hand, while processing in the brain supports conscious perception of pain and subsequent changes in behavior." },
        { type: "paragraph", text: "Homeostasis is the maintenance of a relatively stable internal environment. Together with endocrine and local mechanisms, the nervous system helps regulate circulation, breathing, and body temperature." },
      ],
    },
    {
      id: "cns-pns",
      title: "3. Central and Peripheral Nervous Systems",
      blocks: [
        { type: "subheading", text: "Central nervous system (CNS)" },
        { type: "list", items: ["Brain.", "Spinal cord."] },
        { type: "paragraph", text: "The CNS processes and integrates incoming signals, organizes reflex responses, and participates in the regulation of movement, internal organ activity, and higher nervous functions. The spinal cord is not merely a conduction pathway: it also contains neural circuits that mediate a range of reflexes." },
        { type: "subheading", text: "Peripheral nervous system (PNS)" },
        { type: "list", items: ["Nerves: bundles of nerve fibers connecting different structures of the body.", "Ganglia: clusters of neuronal cell bodies outside the CNS.", "Nerve endings, including sensory and motor endings.", "Other peripheral neural structures that connect the CNS with organs and tissues."] },
        { type: "paragraph", text: "Afferent (sensory) pathways carry information from receptors to the CNS. Efferent pathways carry commands to effectors, such as muscles and glands. Feedback about the outcome of an action allows the response to be adjusted. The CNS and PNS therefore function as interconnected parts of a unified system." },
      ],
    },
    {
      id: "principles",
      title: "4. Fundamental Principles of Nervous System Function",
      blocks: [
        { type: "subheading", text: "Excitability and conduction" },
        { type: "paragraph", text: "Excitability is the ability of a cell to respond to a stimulus by changing the electrical state of its membrane. An action potential may be generated when threshold is reached. Conduction is the propagation of an electrical signal along the membrane of a nerve fiber. In myelinated axons, action potentials are regenerated at successive nodes of Ranvier, increasing the speed of signal transmission." },
        { type: "subheading", text: "Excitation and inhibition" },
        { type: "paragraph", text: "Excitation is an active process associated with an electrical response in a cell; in synaptic communication, an excitatory influence increases the probability of action potential generation. Inhibition reduces the probability or frequency of neuronal firing. It is an active regulatory mechanism, rather than simply the absence of excitation. The combined action of excitatory and inhibitory influences makes neural responses selective and coordinated." },
        { type: "subheading", text: "Synaptic transmission" },
        { type: "paragraph", text: "A synapse is a specialized junction through which a neuron signals to another cell. At a chemical synapse, arrival of an action potential at the presynaptic terminal triggers calcium entry and neurotransmitter release. The transmitter binds to receptors on the postsynaptic membrane and changes the activity of the receiving cell. The effect depends on the receptors and their associated mechanisms. At electrical synapses, current passes between cells through gap junctions." },
        { type: "subheading", text: "Neural information integration" },
        { type: "paragraph", text: "A neuron receives multiple signals that interact across time and space. Their combined effect determines the cell's response. Within neural networks, information is evaluated in relation to current physiological needs and previous experience, enabling coordinated responses." },
        { type: "callout", title: "Key Idea", text: "The nervous system does more than conduct impulses. It selects, compares, and integrates information before generating an appropriate response by the body." },
      ],
    },
    {
      title: "5. Importance of Neurophysiology",
      blocks: [
        { type: "paragraph", text: "Neurophysiology investigates the mechanisms and principles of nervous system function at several interconnected levels:" },
        { type: "list", items: ["Membrane level: ion channels, membrane potential, and electrical signals.", "Cellular level: the excitability and activity of individual neurons and their interactions with glia.", "Synaptic level: signaling between cells and changes in the effectiveness of transmission.", "Neural network level: interactions among groups of neurons and information processing.", "Systems level: the organization of sensory, motor, and autonomic functions.", "Integrative level: coordination of bodily functions, behavior, and adaptation."] },
        { type: "paragraph", text: "This knowledge explains how sensory systems detect stimuli and how motor control and autonomic regulation operate. It also provides a foundation for studying behavior, memory, and learning, which involve changes in neural network activity and synaptic plasticity." },
        { type: "paragraph", text: "Understanding normal mechanisms is essential for studying nervous system pathophysiology: it helps explain how disturbances of excitability, conduction, or synaptic transmission can lead to functional impairment." },
      ],
    },
    {
      id: "sensorimotor-feedback",
      title: "Functional organization: from receptors to response and feedback",
      blocks: [
        { type: "paragraph", text: "Nervous-system function begins when a physical or chemical stimulus is transduced into a receptor potential. If the resulting input reaches threshold, action potentials travel along afferent fibers toward central structures. Discharge frequency and recruitment patterns encode relevant stimulus features; the amplitude of an individual all-or-none action potential does not grow with stimulus intensity." },
        { type: "paragraph", text: "Sensory information enters neural circuits receiving both excitatory and inhibitory synaptic influences. Neurons integrate postsynaptic potentials across time and space; circuit output depends on membrane excitability, connectivity and physiological state. Not every response requires the cerebral cortex: spinal cord and brainstem networks can organize rapid protective responses, while descending pathways can modulate them." },
        { type: "paragraph", text: "Motor commands travel along efferent pathways to effectors such as skeletal muscle. Movement changes muscle length, joint configuration and cutaneous stimulation. The resulting new afferent information returns to neural circuits and helps reduce errors relative to the intended action. A reflex is therefore usefully understood as part of a dynamic feedback system, not only a one-way chain of five structures." },
        { type: "paragraph", text: "Negative feedback counteracts a deviation from an operating range, but it does not imply that every physiological variable is held perfectly constant. For example, standing alters venous return and recruits cardiovascular reflexes; the nervous system integrates pressure-receptor signals and generates autonomic responses. Such mechanisms illustrate the interaction of neural, cardiovascular and endocrine regulation." },
        { type: "paragraph", text: "Sound physiological reasoning separates the intervention, the measurement and the interpretation. Electromyography records electrical activity in muscle, not force directly; scalp EEG reflects population-level electrical fields, not individual thoughts or single-neuron action potentials. An experimental conclusion must specify conditions, controls, potential artifacts and credible alternative explanations." },
      ],
    },
  ],
  outcomes: {
    title: "6. Learning Outcomes",
    introduction: "After completing this section, the student should be able to:",
    items: ["Describe the major functions of the nervous system.", "Distinguish the central and peripheral nervous systems.", "Explain neural information integration.", "Explain the roles of excitation and inhibition.", "Describe the basic principles of synaptic transmission.", "Define the subject and objectives of neurophysiology."],
  },
  terms: { title: "7. Key Terms", items: ["Nervous system", "CNS", "PNS", "Neuron", "Excitation", "Inhibition", "Synapse", "Integration", "Homeostasis", "Neurophysiology"] },
};

export default lesson;
