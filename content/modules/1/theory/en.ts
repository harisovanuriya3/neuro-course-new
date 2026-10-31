import type { Lesson } from "../../../types";

const lesson: Lesson = {
  title: "Module 1. Introduction to Neurophysiology",
  sections: [
    {
      "id": "functional-neuroanatomy-clinical-foundations",
      "title": "Functional neuroanatomy: foundations for clinical reasoning",
      "blocks": [
        {
          "type": "subheading",
          "text": "Gray and white matter: organization and exceptions"
        },
        {
          "type": "paragraph",
          "text": "Gray matter contains neuronal cell bodies, dendrites, synapses and glial cells; white matter consists mainly of myelinated and unmyelinated axons with supporting glia. Cerebral cortex is superficial, whereas spinal gray matter is predominantly central. This difference does not mean white matter is a passive cable: conduction depends on axons, myelin and the extracellular environment. In the peripheral nervous system, most primary sensory pseudounipolar neuron cell bodies lie in dorsal root ganglia, while somatic motor neuron cell bodies lie in the spinal anterior horns. In lesion localization distinguish a CNS nucleus, peripheral ganglion, nerve root and peripheral nerve."
        },
        {
          "type": "subheading",
          "text": "Blood supply, barriers and vulnerability of neural tissue"
        },
        {
          "type": "paragraph",
          "text": "Neural tissue requires continuous oxygen and metabolic support to maintain ion gradients. Impaired oxygen and glucose delivery reduces ATP-dependent pump function, alters membrane potentials and, in severe ischemia, contributes to excitotoxic and inflammatory injury. The blood–brain barrier depends on brain capillary endothelial properties, basement membrane, pericytes and interactions with astrocyte endfeet. It is not an absolutely impermeable wall: transport is regulated and varies between brain regions. Cerebrospinal fluid contributes to mechanical protection and exchange. Clinical interpretation of a focal deficit must consider vascular territory, symptom onset and imaging, not just gross nervous-system anatomy."
        },
        {
          "type": "subheading",
          "text": "How to interpret an anatomical image scientifically"
        },
        {
          "type": "paragraph",
          "text": "Before interpreting an image identify the section plane, patient side, scale, staining or imaging modality and anatomical labels. A gross specimen displays large structures but does not directly reveal synaptic currents. A histological micrograph reveals tissue organization yet does not establish function without additional methods. When comparing images distinguish normal variation, preparation artifacts and pathology. Report observed features, anatomical identification and physiological inference separately. Task: identify CNS and peripheral structures, pose two physiological questions the photograph cannot answer and choose a suitable experimental technique."
        }
      ]
    },
    {
      "id": "reflex-circuits-and-clinical-reasoning",
      "title": "Neural circuits, reflex regulation and clinical reasoning",
      "blocks": [
        {
          "type": "subheading",
          "text": "From receptor to effector"
        },
        {
          "type": "paragraph",
          "text": "A functional reflex circuit includes sensory receptors, afferent neurons, central synaptic connections, efferent neurons and effectors. The number of synapses and degree of central processing vary. In the stretch reflex, Ia muscle-spindle afferents excite alpha motor neurons of the same muscle through a relatively short pathway, while reciprocal inhibition of antagonists requires additional interneurons. Protective withdrawal involves polysynaptic networks and depends on stimulus properties and descending modulation. A reflex is not necessarily independent of cortical and brainstem influences."
        },
        {
          "type": "subheading",
          "text": "Feedback and control stability"
        },
        {
          "type": "paragraph",
          "text": "Neural control often uses negative feedback: deviation of a regulated variable activates sensors and generates an output opposing the disturbance. Postural control integrates muscle spindle and tendon-organ information with central motor commands. Not all control is purely feedback-based: anticipatory adjustments use internal predictions. Identify the regulated variable, receptor, central processing, effector, response delay and limitations. A stable outcome does not imply that every underlying neural signal remains constant."
        },
        {
          "type": "subheading",
          "text": "Excitation, inhibition and response threshold"
        },
        {
          "type": "paragraph",
          "text": "Excitatory postsynaptic currents can increase spike probability, while inhibition can reduce it by hyperpolarizing or shunting the membrane. Effects depend on ionic reversal potentials, synapse location and timing. Action potentials are commonly initiated near the axon initial segment when threshold conditions are reached, but threshold is not a fixed universal voltage: prior activity and channel state matter. The rule 'one excitatory synapse equals one action potential' is false. Distinguish graded postsynaptic potentials from regenerative action potentials."
        },
        {
          "type": "subheading",
          "text": "Clinical case: tendon reflex and localization"
        },
        {
          "type": "paragraph",
          "text": "After an injury, a patient has a reduced knee-jerk reflex and weakness of knee extension. Examine quadriceps power, relevant dermatomal sensation, other tendon reflexes, pain and signs of femoral nerve or L2–L4 root dysfunction. A depressed reflex alone cannot distinguish damage to afferent, central or efferent components. Task: trace the reflex arc, propose three competing lesion sites and identify findings that could discriminate between them. Explain why a single bedside sign does not establish a diagnosis."
        },
        {
          "type": "subheading",
          "text": "Experimental design and measurement quality"
        },
        {
          "type": "paragraph",
          "text": "Simple reflex latency and voluntary reaction time are not equivalent. A visual choice reaction includes sensory encoding, central processing, decision making and motor execution; it is not a direct measure of conduction velocity in one nerve. Standardize stimulus distance, illumination, instructions and trial number; exclude anticipatory responses and inspect result distributions. Report a robust summary such as the median where appropriate. Without randomized condition order, practice and fatigue can confound comparisons."
        }
      ]
    },
    {
      "id": "neurophysiology-evidence-and-localization",
      "title": "Experimental neurophysiology: from structure to clinical localization",
      "blocks": [
        {
          "type": "subheading",
          "text": "Multilevel explanation"
        },
        {
          "type": "paragraph",
          "text": "Neural phenomena must be considered at molecular, cellular, circuit, systems and behavioral levels. An action potential depends on ion-channel dynamics; axonal propagation depends on geometry and myelination; a reflex response depends on synaptic transmission and inhibition; and purposeful movement also requires descending control and sensory feedback. An observation at one level does not automatically predict a clinical symptom without examining the others. Distinguish an established mechanism from a hypothesis."
        },
        {
          "type": "subheading",
          "text": "How evidence is obtained"
        },
        {
          "type": "paragraph",
          "text": "In an electrophysiology experiment specify the intervention, measured variable, control condition, reproducibility and possible artifacts. Intracellular recording measures membrane voltage; patch clamp examines ionic currents; extracellular electrodes sample neuronal population activity; scalp EEG mainly reflects summed synchronized activity in large neural populations. None of these methods captures the entire nervous system. Interpretation requires attention to temperature, electrical noise, electrode position, physiological state and statistical uncertainty."
        },
        {
          "type": "subheading",
          "text": "Clinical localization as a physiological problem"
        },
        {
          "type": "paragraph",
          "text": "When a patient reports weakness, determine whether dysfunction involves the central motor command, descending pathways, motor neurons, peripheral nerves, neuromuscular junctions or muscle fibers. Upper motor neuron lesions may alter tone and tendon reflexes, whereas peripheral lesions often produce atrophy, reduced reflexes and a characteristic distribution of weakness. No single sign is absolute. Interpret history, power, reflexes, sensation, cranial nerve findings and investigations together."
        },
        {
          "type": "subheading",
          "text": "Worked teaching case"
        },
        {
          "type": "paragraph",
          "text": "A patient has impaired ankle dorsiflexion and reduced sensation over the dorsum of the foot. Common fibular nerve injury and L5 radiculopathy are competing hypotheses. Examine ankle inversion, eversion, sensory distribution, reflexes, back pain and electrodiagnostic findings. Preserved inversion with impaired eversion may favor a peripheral localization but cannot establish the diagnosis alone. Student task: trace the motor pathway from cortex to muscle, propose at least two lesion sites and identify findings that distinguish them."
        }
      ]
    },
    {
      id: "nervous-system",
      title: "1. General Organization of the Nervous System",
      blocks: [
        {"type":"subheading","text":"Neurons and glia: distinct physiological roles"},
        {"type":"paragraph","text":"Neurons have dendrites, a cell body and an axon. Dendrites and the soma receive multiple synaptic inputs, while the axon initial segment is commonly a site of action-potential initiation because of its high density of voltage-gated sodium channels. Neurons vary widely in structure and include sensory neurons, interneurons and motor neurons."},
        {"type":"paragraph","text":"Astrocytes contribute to extracellular K⁺ regulation, metabolic support and neurovascular interactions. Oligodendrocytes form myelin in the CNS, whereas Schwann cells produce myelin in the PNS. Microglia provide immune surveillance and phagocytic functions. Normal neural signaling therefore depends on interactions between neurons and glial cells."},
        {"type":"subheading","text":"Somatic and autonomic functions"},
        {"type":"paragraph","text":"Somatic motor pathways regulate skeletal muscle contraction. Autonomic pathways influence smooth muscle, myocardium and glands. Sympathetic and parasympathetic influences often act together, with organ-specific patterns; some organs are predominantly supplied by one division. This functional distinction does not eliminate integration of somatic and autonomic activity within the CNS."},
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
        { type: "paragraph", text: "The resting membrane potential depends on ion concentration gradients and selective membrane permeability; the Na⁺/K⁺-ATPase maintains the gradients. At threshold, voltage-gated sodium channels open, followed by increased potassium conductance that helps repolarize the membrane. Absolute and relative refractory periods limit firing frequency and shape impulse propagation." },
        { type: "paragraph", text: "Myelin electrically insulates internodal axon segments and reduces current leakage. During saltatory conduction, action potentials are regenerated mainly at nodes of Ranvier. Demyelination may therefore slow conduction, increase temporal dispersion and, in severe cases, cause conduction block." },
        { type: "paragraph", text: "At a chemical synapse, an arriving impulse opens presynaptic calcium channels, and Ca²⁺ entry triggers transmitter release. The transmitter binds postsynaptic receptors and changes membrane conductance or intracellular signaling. Synaptic effects can be excitatory or inhibitory depending on receptor mechanisms and ionic gradients." },
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
