import type { CasesLesson } from "../../../cases";

const lesson: CasesLesson = {
  kind: "cases",
  title: "Case studies. Introduction to neurophysiology",
  moduleTitle: "Module 1",
  introduction: "Analyse each situation, identify the connections between functional components of the nervous system, and explain the response mechanism. In multistage cases, additional information is revealed gradually. After developing your own solution, compare your reasoning with the explanation and mark the case as complete.",
  ui: {
    progress: "Case studies", completed: "completed", navigation: "Jump to a case", case: "Case",
    situation: "Situation", stage: "Stage", answer: "Your solution and reasoning", placeholder: "Write what changed, why it changed, and what happened next…",
    note: "Written responses are for comparison with the explanation and are not graded automatically. Responses and progress last until you reload the page or change the language.",
    next: "Show next stage", show: "Show explanation", hide: "Hide explanation", explanation: "Why this happens",
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
      id: "excitation", title: "Selectivity of the neural response",
      situation: "During a precise movement, the nervous system must select the required response and limit competing actions.",
      stages: [{ title: "Selection and coordination", questions: ["Why is simply increasing all activity insufficient?", "What does the need to choose between competing actions demonstrate?", "Which observations would help assess response coordination?"] }],
      explanation: ["A precise response requires selection of an appropriate action rather than maximal overall activity.", "Limiting competing actions shows that neural regulation is selective.", "Cellular mechanisms of excitation and inhibition are not analysed here; they are covered in the dedicated module."],
    },
    {
      id: "synapse", title: "Linking stages of transmission",
      situation: "In the teaching model, a signal has reached the end of a nerve fibre. Identify the next functional stage without analysing the molecular synaptic mechanism.",
      stages: [{ title: "Sequence of functional stages", questions: ["Arrange the events in order: what must happen before each subsequent event?"] }],
      interaction: { type: "sequence", steps: ["Signal propagates along the nerve fibre", "Signal reaches the contact between cells", "Influence is transmitted to the next cell", "The receiving cell response changes"] },
      explanation: [
        "The key here is to distinguish functional stages: signal propagation along a fibre and transmission of influence to the next cell.",
        "A change in the next cell's response shows that intercellular transmission is a separate stage rather than a continuation of the same process.",
        "The molecular mechanisms of this transition are deliberately deferred to later dedicated modules.",
      ],
    },
    {
      id: "integration", title: "Combined information processing",
      situation: "Information from several sources reaches the CNS at the same time. The final response can vary with the combination of inputs and the state of the system.",
      stages: [{ title: "Explain the final response", questions: ["Why does one input not always determine the whole response?", "What does combined information processing mean at the systems level?", "What additional information is needed to explain a changed response?"] }],
      interaction: { type: "choice", prompt: "Select the most accurate explanation.", options: [
        { text: "Each input always specifies one fixed complete response.", correct: false, feedback: "This ignores combined central processing of information." },
        { text: "The CNS relates multiple information sources to the system's current state, so the outcome can differ.", correct: true, feedback: "Correct. At the introductory level, the key is that responses depend on context and the combination of inputs." },
        { text: "Knowing only the strongest input is enough to explain the response.", correct: false, feedback: "One measure is insufficient to infer the behaviour of the whole system." },
        { text: "Central processing does not contribute to response formation.", correct: false, feedback: "Central processing links incoming information to organisation of the response." },
      ] },
      explanation: ["Several information sources can contribute to one response.", "The same individual input does not guarantee the same reaction under different conditions.", "Cellular mechanisms of integration, excitation and inhibition are covered in later dedicated modules."],

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
