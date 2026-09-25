import type { CasesLesson } from "../../../cases";

const lesson: CasesLesson = {
  kind: "cases",
  title: "Case studies. Introduction to neurophysiology",
  moduleTitle: "Module 1",
  introduction: "Analyse each situation, identify the connections between functional components of the nervous system, and explain the response mechanism. In multistage cases, additional information is revealed gradually. After developing your own solution, compare your reasoning with the explanation and mark the case as complete.",
  ui: {
    progress: "Case studies", completed: "completed", navigation: "Jump to a case", case: "Case",
    situation: "Situation", stage: "Stage", answer: "Your solution and reasoning", placeholder: "Explain how the events are connected and why this result occurs…",
    note: "Written responses are for comparison with the explanation and are not graded automatically. Responses and progress last until you reload the page or change the language.",
    next: "Show next stage", show: "Show explanation", hide: "Hide explanation", explanation: "Physiological explanation",
    complete: "Case completed", done: "Completed", check: "Check solution", reset: "Reset", undo: "Undo last step",
    available: "Select events in order", selected: "Your sequence", empty: "No events selected yet.",
    correct: "Correct. The sequence follows the transition from an electrical signal to chemical transmission and a postsynaptic response.",
    incorrect: "The order is not yet correct. Consider what triggers transmitter release and what must happen before postsynaptic receptors are activated. Try again or open the explanation.",
    incomplete: "Add every event before checking.", choose: "Select an explanation first.", gate: "First write your response to the questions in each revealed stage.",
    sequenceGate: "Complete and check your sequence to unlock the explanation.", choiceGate: "Write your reasoning, select an explanation, and check your solution to unlock the explanation.",
    diagram: "Functional pathway", sources: "Learning sources",
  },
  cases: [
    {
      id: "afferent", title: "The afferent component",
      situation: "During examination of a skin region, a stimulus acts on receptors, but information from them does not reach the central nervous system.",
      stages: [{ title: "Trace the information pathway", questions: ["Which functional component is impaired?", "In which direction does information normally travel?", "How does this situation differ from disruption of an efferent pathway?"] }],
      explanation: [
        "The afferent component should be examined first: it carries sensory information from receptors towards the central nervous system (CNS). Applying a stimulus to the skin does not by itself establish that information has successfully reached central structures.",
        "Normally, a receptor converts stimulation into an electrical response, and sensory fibres carry information towards the spinal cord or brain. The peripheral portion of this pathway belongs to the peripheral nervous system.",
        "An efferent pathway disruption concerns transmission of a command from the CNS to an effector; sensory input may remain intact. The situation identifies a functional component to investigate, but does not establish a lesion site or clinical diagnosis. Intact receptor function also needs to be confirmed.",
      ],
    },
    {
      id: "efferent", title: "The efferent component",
      situation: "Sensory information has reached the CNS and has been processed, but the effector organ has not received the appropriate neural command.",
      stages: [{ title: "From command to action", questions: ["Which component of the functional chain should be analysed?", "Where does a signal travel along an efferent pathway?", "How does an effector differ from an efferent pathway?"] }],
      explanation: [
        "Analyse the efferent component: transmission of a control signal from the CNS towards a peripheral effector organ. Sensory input and central processing alone do not guarantee delivery of the command.",
        "The efferent pathway conducts the signal; the effector produces the response. For example, a motor nerve fibre conducts impulses towards skeletal muscle, whose fibres develop force following neuromuscular transmission. In other systems, smooth muscle or glands can act as effectors.",
        "Failure of a command to reach an organ differs from an inability of the organ itself to respond. Here the stated problem concerns command transmission; there is insufficient information to determine its specific cause.",
      ],
    },
    {
      id: "withdrawal", title: "A protective reflex",
      situation: "A person accidentally touches a hot surface and rapidly withdraws their hand.",
      stages: [
        { title: "Sensory input", questions: ["Identify the stimulus, receptor, and afferent component. How does information enter the CNS?"] },
        { title: "Organising the movement", data: "The arm begins to flex and contact with the hot surface ends. The movement requires coordinated muscle activity.", questions: ["Identify the central component, efferent pathway, effector, and response.", "Why must the activity of muscles producing opposing movements be coordinated?"] },
        { title: "Reflex action and awareness", data: "The person then becomes aware of pain, evaluates the source of danger, and decides what to do next.", questions: ["Why can the protective response begin before a full conscious analysis of the stimulus?", "What roles do the brain and ascending information pathways still have?"] },
      ],
      explanation: [
        "The stimulus is potentially damaging heat. Cutaneous nociceptive endings sensitive to this stimulus detect it, and afferent fibres carry the signal into the spinal cord.",
        "Spinal interneuronal networks link sensory input to motor neurons. Efferent motor fibres and neuromuscular synapses activate muscles that move the hand away. Coordinated excitation and inhibition, including reduced antagonist activity, help organise the movement.",
        "Spinal circuits can initiate the protective response without waiting for complete conscious analysis. Information also ascends to higher centres for pain perception and evaluation of the event. Descending brain pathways influence spinal circuits as well: a reflex does not imply that the brain is uninvolved.",
      ],
    },
    {
      id: "feedback", title: "Feedback",
      situation: "A person tries to hold their arm in a particular position with their eyes closed. The limb position changes slightly over time, but the nervous system adjusts muscle activity.",
      stages: [{ title: "Regulation without visual monitoring", questions: ["Where does the nervous system obtain information about limb position?", "Why is feedback necessary?", "What happens to regulatory accuracy if this information is substantially reduced?"] }],
      explanation: [
        "Proprioceptive information comes primarily from muscle spindles, which signal muscle length and its changes, and tendon organs, which are sensitive to tension. Joint and cutaneous receptors also contribute to estimates of limb position and movement.",
        "Sensory feedback reports the actual outcome of an action. Central networks use it together with the intended motor task to adjust muscle activity: deviations in position lead to changes in motor commands.",
        "Substantial loss of this input makes correction less accurate and deviations harder to detect and compensate for. Closing the eyes limits visual compensation but does not remove all other sensory and central mechanisms. This is a functional explanation, not a diagnosis.",
      ],
    },
    {
      id: "excitation", title: "Excitation and inhibition",
      situation: "A precise movement requires activation of some neuronal groups while the activity of others is limited.",
      stages: [{ title: "Selectivity of neural control", questions: ["Why is activation alone insufficient for precise neural regulation?", "What functional role does inhibition play?", "Why is the balance of excitatory and inhibitory influences important for neural networks?"] }],
      explanation: [
        "Indiscriminate activation could recruit competing motor programmes and muscles. A precise movement requires selection of the appropriate neuronal groups, an appropriate response magnitude, and coordinated timing.",
        "Excitatory influences generally increase the probability of an action potential, whereas inhibitory influences limit it and regulate signal transmission through the network. Inhibition is an active physiological process, not simply the absence of excitation.",
        "Their coordination restrains excessive activity and helps select relevant signals. For example, inhibitory circuits can reduce antagonist activity during movement. This balance is dynamic and depends on the task and network state; it does not mean equal numbers of excitatory and inhibitory signals.",
      ],
    },
    {
      id: "synapse", title: "Synaptic transmission",
      situation: "An action potential has reached the presynaptic terminal of a chemical synapse. Reconstruct the causal sequence of signal transmission.",
      stages: [{ title: "From an electrical signal to chemical transmission", questions: ["Arrange the events in order: what must happen before each subsequent event?"] }],
      interaction: { type: "sequence", steps: ["Arrival of the action potential", "Opening of voltage-gated Ca²⁺ channels", "Ca²⁺ influx", "Neurotransmitter exocytosis", "Transmitter diffusion across the synaptic cleft", "Binding to postsynaptic receptors", "Change in postsynaptic conductance/potential"] },
      explanation: [
        "Depolarisation of the presynaptic terminal opens voltage-gated calcium channels. Calcium entry triggers fusion of release-ready synaptic vesicles with the membrane and neurotransmitter exocytosis.",
        "The transmitter crosses the cleft and binds to receptors on the postsynaptic cell. Receptor activation changes ionic conductance directly or through intracellular mechanisms. The effect depends on receptor properties and ionic gradients; it is not necessarily excitatory and does not necessarily generate another action potential.",
        "If calcium entry is substantially reduced, transmitter release decreases even when an action potential arrives. This illustrates why the electrical event must engage the secretion mechanism before a postsynaptic response can occur.",
      ],
    },
    {
      id: "integration", title: "Neural integration",
      situation: "Signals from several receptors arrive in the CNS simultaneously. Some influences favour a response, whereas others limit it.",
      stages: [{ title: "Explain the resulting response", questions: ["Why can the final response not be explained by a single input signal alone?", "What does neural integration mean?", "How do excitatory and inhibitory influences contribute to the final reaction?"] }],
      interaction: { type: "choice", prompt: "Select the most accurate explanation.", options: [
        { text: "The strongest input signal always determines the result.", correct: false, feedback: "A strong input may matter, but its effect depends on other inputs, inhibition, and network state. Signal strength alone cannot explain the result." },
        { text: "The CNS combines excitatory and inhibitory influences according to their timing, location, and the current state of neural networks.", correct: true, feedback: "Correct. Spatial and temporal interactions between inputs change neuronal activity, while connections between neurons organise a coordinated response. Integration is more than simply counting signals." },
        { text: "Inhibition switches off the entire CNS and therefore does not contribute to the response.", correct: false, feedback: "Inhibitory influences act selectively and help shape the response. Limiting activity in particular circuits can help other circuits perform the required function." },
        { text: "Each receptor independently specifies a complete motor command.", correct: false, feedback: "Receptors report stimuli. Transforming sensory input into coordinated commands requires central processing and interactions between neural networks." },
      ] },
      explanation: [
        "Neural integration combines and transforms incoming signals within a neuron and a network. Input intensity, arrival time, synaptic location, and the cell's current state all matter.",
        "Excitatory and inhibitory synaptic influences jointly change the probability and pattern of firing. Consequently, the same sensory input can produce different responses when combined with different additional inputs.",
        "At the network level, coordinated activity across many neurons selects and adjusts the response. Treating a single input as its universal cause overlooks this organisation.",
      ],
    },
    {
      id: "integrative", title: "An integrative case",
      situation: "A person walks over uneven ground, unexpectedly steps on a small object, adjusts their foot position, and maintains balance.",
      stages: [
        { title: "What information enters the nervous system?", questions: ["Which changes do cutaneous receptors and proprioceptors detect?", "What is the role of afferent pathways? Which other sensory systems help maintain balance?"] },
        { title: "What happens in the CNS?", data: "Pressure on the sole, muscle length, and muscle tension change together. Information about head position and the visual surroundings is also available to the nervous system.", questions: ["How does the CNS integrate these signals?", "Why are coordinated excitatory and inhibitory influences needed to select a response?"] },
        { title: "How is the motor response generated and adjusted?", data: "Foot, leg, and trunk muscles change their activity, redistributing the load. Movement continues.", questions: ["Trace the command along efferent pathways towards the muscles acting as effectors.", "How does sensory feedback help evaluate the result and make subsequent corrections?"] },
      ],
      explanation: [
        "Cutaneous receptors report contact and pressure; proprioceptors report muscle state and movement of body segments. Vestibular and visual signals supplement estimates of body position. Afferent pathways deliver this information to the CNS.",
        "Spinal and supraspinal networks, including brainstem and cerebellar mechanisms, combine sensory input with the ongoing motor task. Excitation and inhibition help coordinate muscle groups and scale the correction. Rapid responses work alongside subsequent conscious control.",
        "Efferent signals alter muscle-effector activity through motor fibres and neuromuscular transmission. Foot movement and changes in postural activity follow. New sensory input reports the result, allowing further correction. The diagram describes functional connections; many real processes occur in parallel and form closed control loops.",
      ],
      diagram: ["Stimuli / environmental changes", "Receptors", "Afferent pathways", "CNS and integration", "Efferent pathways", "Effectors", "Response", "Sensory feedback", "Subsequent correction"],
    },
  ],
  sources: [
    { title: "Neuroscience: Chemical Synapses", href: "https://www.ncbi.nlm.nih.gov/books/NBK11009/" },
    { title: "Physiology, Withdrawal Response", href: "https://www.ncbi.nlm.nih.gov/books/NBK544292/" },
  ],
};

export default lesson;
