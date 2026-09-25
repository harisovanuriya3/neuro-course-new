import type { PracticeLesson } from "../../../types";

const lesson: PracticeLesson = {
  kind: "practice",
  title: "Practical Lesson. Introduction to Neurophysiology",
  moduleTitle: "Module 1. Introduction",
  ui: {
    showAnswer: "Show answers and explanations", check: "Check sequence", reset: "Start again", undo: "Remove last step",
    correct: "Correct: the steps are in the right order.", incorrect: "The order is not yet correct. Review the direction of information flow and try again.",
    incomplete: "Arrange all steps first.", available: "Choose the next step", selected: "Your sequence", empty: "No steps selected yet.",
    input: "Your answer", theory: "Open Module 1 theory", localNote: "Answers and check marks are for independent study. They are not saved after reloading the page or changing language.",
  },
  sections: [
    { title: "1. Aim of the Lesson", blocks: [
      { type: "paragraph", text: "To develop an understanding of the structural and functional organization of the nervous system and the fundamental principles of neural regulation." },
    ] },
    { title: "2. Learning Objectives", blocks: [
      { type: "paragraph", text: "After completing the practical work, the student should be able to:" },
      { type: "list", items: ["Distinguish the central and peripheral nervous systems.", "Identify the main structural components of the nervous system.", "Explain the functional roles of afferent and efferent components.", "Explain the principle of neural regulation.", "Analyze a simple functional diagram of the nervous system.", "Use basic neurophysiology terminology."] },
    ] },
    { title: "3. Required Materials", blocks: [
      { type: "list", items: ["A diagram of the nervous system.", "A diagram of a neuron.", "A diagram of a reflex arc.", "Study tables.", "Materials from the Theory section of Module 1."] },
      { type: "paragraph", text: "Prepare diagrams from an educational atlas or the instructor's materials. Identify the cell body, dendrites, and axon on the neuron diagram, and central and peripheral structures on the nervous system diagram. Complete the tasks independently before comparing your explanations with the model answers." },
    ] },
    { title: "4. Brief Theoretical Rationale", blocks: [
      { type: "paragraph", text: "A receptor converts the effect of a stimulus into a signal. Information travels along an afferent pathway to the CNS, where it is processed and integrated. A command then travels along an efferent pathway to an effector, such as a muscle or gland, whose activity produces a response." },
      { type: "callout", title: "Principle of Neural Regulation", text: "Receptor → afferent pathway → CNS → information processing and integration → efferent pathway → effector → response. Processing and integration occur within the CNS, rather than in a separate anatomical component beyond it." },
      { type: "paragraph", text: "Feedback is information about the outcome of a response and the current state of the body. It allows the actual outcome to be compared with the required outcome and effector activity to be adjusted. For example, signals from muscle and joint receptors help refine limb position during movement. Excitation and inhibition coordinate the activity of neural networks." },
    ] },
    { title: "5. Practical Task 1. Structural Organization of the Nervous System", blocks: [
      { type: "paragraph", text: "Assign the structures to two groups: CNS and PNS. Briefly state the common feature that justifies each grouping." },
      { type: "list", items: ["Ganglia.", "Brain.", "Cranial nerves.", "Nerve endings.", "Spinal cord.", "Spinal nerves."] },
      { type: "response", label: "List the CNS and PNS structures and explain your classification." },
      { type: "answer", items: ["CNS: the brain and spinal cord. These structures contain central networks for information processing and integration.", "PNS: cranial nerves, spinal nerves, ganglia, and nerve endings. In this introductory scheme, these are grouped as peripheral structures connecting organs and tissues with central structures.", "Anatomical qualification: despite its name, the optic nerve (cranial nerve II) belongs to the CNS in its structure and development. The general statement about cranial nerves in this task is an educational simplification."] },
    ] },
    { title: "6. Practical Task 2. Afferent and Efferent Components", blocks: [
      { type: "paragraph", text: "A person accidentally touches a hot object and rapidly withdraws their hand. Analyze this protective reflex: identify the stimulus, receptor, afferent pathway, central component, efferent pathway, effector, and response." },
      { type: "response", label: "Write down the seven components and explain the direction of signal transmission." },
      { type: "answer", items: ["Stimulus: a high temperature capable of damaging tissue.", "Receptor: sensory free nerve endings in the skin, specifically heat-sensitive nociceptors.", "Afferent pathway: sensory fibers in a peripheral nerve; the corresponding neuronal cell bodies lie in a dorsal root ganglion, and their central processes enter the spinal cord through the dorsal root.", "Central component: spinal interneuron networks that activate the appropriate motor neurons and coordinate inhibition of antagonist muscles. Information also ascends to the brain for perception and further evaluation.", "Efferent pathway: axons of spinal motor neurons passing through the ventral root and peripheral nerves to the muscles.", "Effector: skeletal muscles that withdraw the hand, primarily the appropriate flexors.", "Response: rapid withdrawal of the hand from the hot object. Initiation of the spinal reflex does not require a prior conscious decision."] },
    ] },
    { title: "7. Practical Task 3. Construct a Functional Sequence", blocks: [
      { type: "paragraph", text: "Select the steps one at a time in the order of information flow, from the initial stimulus to the response. If you make a mistake, remove the last step or start again. Then select “Check sequence”." },
      { type: "sequence", steps: ["Stimulus", "Receptor", "Afferent pathway", "CNS", "Efferent pathway", "Effector", "Response"] },
    ] },
    { title: "8. Table for Independent Completion", blocks: [
      { type: "paragraph", text: "Identify the system or functional component to which each structure belongs and state its main function. Categories are not restricted to the CNS and PNS: an effector may be a muscle or gland. For the receptor, consider a peripheral sensory ending in this exercise." },
      { type: "table", headers: ["Structure", "Belongs to", "Main function"], rows: [
        ["Brain", "CNS", "Processing and integration of information; organization of behavior, movement, and regulation of bodily functions."],
        ["Spinal cord", "CNS", "Conduction of signals and organization of spinal reflexes."],
        ["Peripheral nerve", "PNS", "Conduction of afferent and/or efferent signals, depending on its fiber composition."],
        ["Ganglion", "PNS", "A cluster of neuronal cell bodies: sensory ganglia contain afferent neuron cell bodies, while autonomic ganglia participate in signal relay and processing."],
        ["Receptor", "Peripheral sensory component; PNS in this example", "Detection of a stimulus and its conversion into a signal. In other sensory systems, a receptor may be a specialized cell."],
        ["Effector", "An executing organ: muscle or gland", "Production of a response, such as contraction or secretion; the effector itself is not classified as CNS or PNS."],
      ] },
    ] },
    { title: "9. Analysis of Results", blocks: [
      { type: "list", items: ["Why does damage to an afferent pathway disrupt the delivery of sensory information?", "What happens if an efferent pathway is damaged?", "Why is the CNS considered an integrative component?", "What role does feedback play?", "Why does a normal response require coordinated activity across several components?"] },
      { type: "response", label: "Provide cause-and-effect explanations for the five questions." },
      { type: "answer", items: ["Disruption of an afferent pathway reduces or prevents signal transmission from receptors to the relevant central structures.", "If an efferent pathway is disrupted, the command may not reach the effector, weakening or abolishing the response even when sensory information arrives.", "The CNS compares multiple inputs, combines them with information about the body's current state, and organizes coordinated output.", "Feedback reports the outcome of an action and allows subsequent responses to be adjusted.", "Reception, conduction, integration, and execution perform different tasks; disruption of any component can alter the overall result."] },
    ] },
    { title: "10. Review Questions", blocks: [
      { type: "list", items: ["1. What are the major functions of the nervous system?", "2. Which structures belong to the CNS and PNS?", "3. How does an afferent pathway differ from an efferent pathway?", "4. How does a receptor differ from an effector?", "5. What is neural information integration?", "6. How do excitation and inhibition interact?", "7. What are the main stages of chemical synaptic transmission?", "8. How does feedback contribute to homeostasis?"] },
      { type: "response", label: "Write your answers to the eight review questions." },
      { type: "answer", items: ["1. Detection, conduction, and integration of information; organization of motor and autonomic responses; maintenance of homeostasis and higher nervous functions.", "2. CNS: brain and spinal cord. PNS: peripheral nerves, ganglia, and nerve endings. The anatomical qualification concerning the optic nerve is given in Task 1.", "3. Afferent pathways lead from receptors to the CNS; efferent pathways lead from the CNS to effectors.", "4. A receptor detects an influence and converts it into a signal; an effector executes the response.", "5. Integration combines and processes signals to produce a coordinated response.", "6. Excitatory influences increase the probability of neuronal firing, whereas inhibitory influences reduce it; their interaction makes responses selective.", "7. An action potential reaches the terminal, calcium channels open, and transmitter is released; it binds to postsynaptic receptors and changes the receiving cell's activity.", "8. Information about the current value of a regulated variable enables adjustment of the response; negative feedback reduces deviation from the required level."] },
    ] },
    { title: "11. Practical Mini-Case", blocks: [
      { type: "paragraph", text: "During a neurological examination, a patient feels touch on the skin of the hand but cannot voluntarily move the fingers. Which functional component may be impaired? Justify your answer by distinguishing the arrival of sensory information from execution of a motor command." },
      { type: "response", label: "Identify a potentially impaired functional component and explain the limits of this conclusion." },
      { type: "answer", items: ["Within the teaching model, consider impairment of motor output: the efferent component or the mechanisms that execute a motor command. Preserved touch perception indicates preservation of the sensory channel tested, not of every sensory modality.", "This description alone cannot establish the site of a lesion or a medical diagnosis: voluntary movement depends on central motor systems, peripheral motor fibers, neuromuscular transmission, and the muscle itself. The case illustrates the distinction between afferent and efferent functions."] },
    ] },
    { title: "12. Conclusion", blocks: [
      { type: "paragraph", text: "The nervous system follows a structural and functional organization: central and peripheral structures jointly support reception, conduction, and integration of information and control of effectors. Afferent and efferent components transmit signals in different directions but operate in coordination. Feedback refines the outcome and supports adaptive neural regulation." },
    ] },
    { title: "13. Self-Assessment", blocks: [
      { type: "paragraph", text: "After this lesson, I can:" },
      { type: "checklist", items: ["Distinguish the CNS and PNS.", "Explain the afferent pathway.", "Explain the efferent pathway.", "Construct a functional sequence of neural regulation.", "Explain the roles of integration and feedback."] },
    ] },
  ],
};

export default lesson;
