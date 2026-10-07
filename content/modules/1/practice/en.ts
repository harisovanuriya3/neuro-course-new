import type { PracticeLesson } from "../../../types";

const lesson: PracticeLesson = {
  kind: "practice",
  title: "Practice. Introduction to Neurophysiology",
  moduleTitle: "Module 1. Introduction",
  ui: {
    showAnswer: "Show answers and explanations", check: "Check sequence", reset: "Start again", undo: "Remove last step",
    correct: "Correct: the steps are in the right order.", incorrect: "The order is not yet correct. Review the direction of information flow and try again.",
    incomplete: "Arrange all steps first.", available: "Choose the next step", selected: "Your sequence", empty: "No steps selected yet.",
    input: "Your answer", theory: "Open Module 1 theory", localNote: "Task completion is saved in this browser. Written responses may reset after reloading or changing language, so save important wording in a note.",
  },
  sections: [
    { title: "1. What You Will Learn", blocks: [
      { type: "paragraph", text: "To develop an understanding of the structural and functional organization of the nervous system and the fundamental principles of neural regulation." },
    ] },
    { title: "2. What You Should Be Able to Do", blocks: [
      { type: "paragraph", text: "After completing the practical work, the student should be able to:" },
      { type: "list", items: ["Distinguish the central and peripheral nervous systems.", "Identify the main structural components of the nervous system.", "Explain the functional roles of afferent and efferent components.", "Explain the principle of neural regulation.", "Analyze a simple functional diagram of the nervous system.", "Use basic neurophysiology terminology."] },
    ] },
    { title: "3. Required Materials", blocks: [
      { type: "list", items: ["A diagram of the nervous system.", "A diagram of a neuron.", "A diagram of a reflex arc.", "Study tables.", "Materials from the Theory section of Module 1."] },
      { type: "paragraph", text: "Prepare diagrams from an educational atlas or the instructor's materials. Identify the cell body, dendrites, and axon on the neuron diagram, and central and peripheral structures on the nervous system diagram. Complete the tasks independently before comparing your explanations with the model answers." },
    ] },
    { title: "4. The Key Idea", blocks: [
      { type: "paragraph", text: "A receptor converts the effect of a stimulus into a signal. Information travels along an afferent pathway to the CNS, where it is processed and integrated. A command then travels along an efferent pathway to an effector, such as a muscle or gland, whose activity produces a response." },
      { type: "callout", title: "Principle of Neural Regulation", text: "Receptor → afferent pathway → CNS → information processing and integration → efferent pathway → effector → response. Processing and integration occur within the CNS, rather than in a separate anatomical component beyond it." },
      { type: "paragraph", text: "Feedback is information about the outcome of a response and the current state of the body. It allows the actual outcome to be compared with the required outcome and effector activity to be adjusted. For example, signals from muscle and joint receptors help refine limb position during movement. Excitation and inhibition coordinate the activity of neural networks." },
    ] },
    { title: "5. Task 1. What Belongs to the CNS and PNS?", blocks: [
      { type: "paragraph", text: "Assign the structures to two groups: CNS and PNS. Briefly state the common feature that justifies each grouping." },
      { type: "classification", groups: ["CNS", "PNS"], items: [
        { label: "Ganglia", group: 1 }, { label: "Brain", group: 0 }, { label: "Cranial nerves", group: 1 },
        { label: "Nerve endings", group: 1 }, { label: "Spinal cord", group: 0 }, { label: "Spinal nerves", group: 1 }
      ], reasonLabels: ["Common feature of the CNS", "Common feature of the PNS"], answer: ["CNS: brain and spinal cord. These contain central neuronal networks for information processing and integration.", "PNS: cranial and spinal nerves, ganglia, and nerve endings — peripheral structures linking the CNS with receptors, organs, and tissues.", "Note: the optic nerve (CN II), despite its name, is developmentally and structurally part of the CNS; grouping cranial nerves with the PNS here is an introductory teaching simplification."] },
    ] },
    { title: "6. Task 2. Which Way Does the Signal Travel?", blocks: [
      { type: "paragraph", text: "A person accidentally touches a hot object and rapidly withdraws their hand. Analyze this protective reflex: identify the stimulus, receptor, afferent pathway, central component, efferent pathway, effector, and response." },
      { type: "response", label: "Write the seven-step chain and explain in simple words which way the signal travels." },
      { type: "answer", items: ["Stimulus: a high temperature capable of damaging tissue.", "Receptor: sensory free nerve endings in the skin, specifically heat-sensitive nociceptors.", "Afferent pathway: sensory fibers in a peripheral nerve; the corresponding neuronal cell bodies lie in a dorsal root ganglion, and their central processes enter the spinal cord through the dorsal root.", "Central component: spinal interneuron networks that activate the appropriate motor neurons and coordinate inhibition of antagonist muscles. Information also ascends to the brain for perception and further evaluation.", "Efferent pathway: axons of spinal motor neurons passing through the ventral root and peripheral nerves to the muscles.", "Effector: skeletal muscles that withdraw the hand, primarily the appropriate flexors.", "Response: rapid withdrawal of the hand from the hot object. Initiation of the spinal reflex does not require a prior conscious decision."] },
    ] },
    { title: "7. Task 3. Build the Sequence", blocks: [
      { type: "paragraph", text: "Select the steps one at a time in the order of information flow, from the initial stimulus to the response. If you make a mistake, remove the last step or start again. Then select “Check sequence”." },
      { type: "sequence", steps: ["Stimulus", "Receptor", "Afferent pathway", "CNS", "Efferent pathway", "Effector", "Response"] },
    ] },
    { title: "8. Complete the Table", blocks: [
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
    { title: "9. Explain the Results", blocks: [
      { type: "list", items: ["Why does damage to an afferent pathway disrupt the delivery of sensory information?", "What happens if an efferent pathway is damaged?", "Why is the CNS considered an integrative component?", "What role does feedback play?", "Why does a normal response require coordinated activity across several components?"] },
      { type: "response", label: "Answer the five questions in simple words: what changed, why, and what followed?" },
      { type: "answer", items: ["Disruption of an afferent pathway reduces or prevents signal transmission from receptors to the relevant central structures.", "If an efferent pathway is disrupted, the command may not reach the effector, weakening or abolishing the response even when sensory information arrives.", "The CNS compares multiple inputs, combines them with information about the body's current state, and organizes coordinated output.", "Feedback reports the outcome of an action and allows subsequent responses to be adjusted.", "Reception, conduction, integration, and execution perform different tasks; disruption of any component can alter the overall result."] },
    ] },
    { title: "10. Check Yourself", blocks: [
      { type: "list", items: ["1. What are the major functions of the nervous system?", "2. Which structures belong to the CNS and PNS?", "3. How does an afferent pathway differ from an efferent pathway?", "4. How does a receptor differ from an effector?", "5. What is neural information integration?", "6. How do excitation and inhibition interact?", "7. What are the main stages of chemical synaptic transmission?", "8. How does feedback contribute to homeostasis?"] },
      { type: "response", label: "Write your answers to the eight review questions." },
      { type: "answer", items: ["1. Detection, conduction, and integration of information; organization of motor and autonomic responses; maintenance of homeostasis and higher nervous functions.", "2. CNS: brain and spinal cord. PNS: peripheral nerves, ganglia, and nerve endings. The anatomical qualification concerning the optic nerve is given in Task 1.", "3. Afferent pathways lead from receptors to the CNS; efferent pathways lead from the CNS to effectors.", "4. A receptor detects an influence and converts it into a signal; an effector executes the response.", "5. Integration combines and processes signals to produce a coordinated response.", "6. Excitatory influences increase the probability of neuronal firing, whereas inhibitory influences reduce it; their interaction makes responses selective.", "7. An action potential reaches the terminal, calcium channels open, and transmitter is released; it binds to postsynaptic receptors and changes the receiving cell's activity.", "8. Information about the current value of a regulated variable enables adjustment of the response; negative feedback reduces deviation from the required level."] },
    ] },
    { title: "11. Mini-Case", blocks: [
      { type: "paragraph", text: "During a neurological examination, a patient feels touch on the skin of the hand but cannot voluntarily move the fingers. Which functional component may be impaired? Justify your answer by distinguishing the arrival of sensory information from execution of a motor command." },
      { type: "response", label: "Name the component that may be impaired and say what can and cannot be concluded from the data." },
      { type: "answer", items: ["Within the teaching model, consider impairment of motor output: the efferent component or the mechanisms that execute a motor command. Preserved touch perception indicates preservation of the sensory channel tested, not of every sensory modality.", "This description alone cannot establish the site of a lesion or a medical diagnosis: voluntary movement depends on central motor systems, peripheral motor fibers, neuromuscular transmission, and the muscle itself. The case illustrates the distinction between afferent and efferent functions."] },
    ] },
    { title: "12. Check an AI Answer", blocks: [
      { type: "ai-audit", instructions: "This is a teaching answer written to look like an AI response. First note what you trust. Then find the errors, explain them in simple words, and compare your reasoning with the feedback.",
        cases: [
          { theoryAnchor: "principles", source: { label: "OpenStax: reflex response", href: "https://openstax.org/books/anatomy-and-physiology-2e/pages/14-introduction" }, claims: [
            { text: "On touching a hot object, sensory fibers carry a signal from the skin to the spinal cord.", isError: false, explanation: "Correct: sensory input travels toward the CNS." },
            { text: "Before the hand can withdraw, the cerebral cortex must first consciously perceive pain.", isError: true, explanation: "Incorrect: spinal circuits can organize withdrawal before conscious perception; information also reaches the brain." },
            { text: "The spinal cord can help organize the protective response.", isError: false, explanation: "Correct: spinal cord circuits form the central component of this reflex." },
            { text: "After processing, the command to the muscle travels along an afferent pathway.", isError: true, explanation: "Incorrect: the command travels along an efferent motor pathway; afferent pathways bring input toward the CNS." },
          ] },
          { theoryAnchor: "cns-pns", source: { label: "OpenStax: nervous system organization", href: "https://openstax.org/books/introduction-behavioral-neuroscience/pages/1-2-organization-of-the-nervous-system" }, claims: [
            { text: "The brain and spinal cord make up the central nervous system.", isError: false, explanation: "Correct: both structures belong to the CNS." },
            { text: "Ganglia belong to the CNS because they contain neuron cell bodies.", isError: true, explanation: "Incorrect: ganglia lie outside the brain and spinal cord and belong to the PNS." },
            { text: "Spinal nerves can contain both sensory and motor fibers.", isError: false, explanation: "Correct for mixed spinal nerves." },
            { text: "If touch sensation is intact, an inability to move the fingers proves that only a peripheral motor nerve is damaged.", isError: true, explanation: "Incorrect: preservation of one sensory channel does not localize a motor deficit; central and other peripheral causes remain possible." },
          ] },
        ],
        labels: { aiAnswer: "Sample AI answer", prediction: "Your prediction: where might the answer fail?", trust: "How much do you trust this answer? (1–5)", trustHint: "1 — very little; 5 — almost completely. Record your impression before checking.", lock: "Lock prediction", identify: "Mark incorrect statements. You may consult the theory and source before checking.", rationale: "Explain why your selected statements are wrong and how to correct them.", check: "Check my selection", missing: "Error.", result: "Answer review", found: "Errors found", missed: "Missed", markedCorrect: "Correct.", correct: "You identified every incorrect statement without flagging a correct one. Compare your explanation with the review below.", retry: "You missed an error or flagged a correct statement. Review the theory and source, then try a similar task.", theory: "Module 1 theory", modelAnswer: "Explanation of each statement:", nextCase: "Similar task", source: "Sources to check:" },
      },
    ] },
    { title: "13. Key Takeaway", blocks: [
      { type: "paragraph", text: "The nervous system follows a structural and functional organization: central and peripheral structures jointly support reception, conduction, and integration of information and control of effectors. Afferent and efferent components transmit signals in different directions but operate in coordination. Feedback refines the outcome and supports adaptive neural regulation." },
    ] },
    { title: "14. Self-Check", blocks: [
      { type: "paragraph", text: "After this lesson, I can:" },
      { type: "checklist", items: ["Distinguish the CNS and PNS.", "Explain the afferent pathway.", "Explain the efferent pathway.", "Construct a functional sequence of neural regulation.", "Explain the roles of integration and feedback."] },
    ] },
  ],
};

export default lesson;
