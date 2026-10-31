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
      "id": "clinical-patellar",
      "title": "Reduced patellar reflex",
      "situation": "Following an injury, a patient has a reduced right knee-jerk reflex and weak knee extension; hip flexion is relatively preserved.",
      "stages": [
        {
          "title": "Clinical reasoning",
          "questions": [
            "Which components of the reflex arc require assessment?",
            "Why cannot one reflex distinguish femoral neuropathy from L2–L4 root dysfunction?",
            "What further findings would help localize the lesion?"
          ]
        }
      ],
      "explanation": [
        "The patellar reflex involves quadriceps muscle spindles, Ia afferents, mainly L2–L4 spinal segments, alpha motor neurons and femoral nerve efferents.",
        "Reduced response can reflect sensory, motor or muscular dysfunction as well as examination technique; one sign is not a diagnosis.",
        "Compare individual muscle power, sensory distribution, other reflexes, pain, history and when indicated electrodiagnostic findings."
      ],
      "diagram": [
        "Muscle spindle and Ia afferent",
        "Spinal segments L2–L4",
        "Alpha motor neuron and femoral nerve",
        "Quadriceps contraction"
      ]
    },
    {
      "id": "clinical-weakness",
      "title": "Foot dorsiflexion weakness",
      "situation": "A patient has difficulty lifting the front of the foot while walking and reduced sensation over its dorsum.",
      "stages": [
        {
          "title": "Clinical reasoning",
          "questions": [
            "Which two peripheral localizations should be considered?",
            "Why test inversion separately from eversion?",
            "What evidence is needed before diagnosis?"
          ]
        }
      ],
      "explanation": [
        "Common fibular neuropathy and L5 radiculopathy are competing hypotheses, not established diagnoses.",
        "Inversion may be relatively preserved in common fibular neuropathy because tibialis posterior is supplied through the tibial nerve; root dysfunction may affect a different combination.",
        "Assess power, sensation, back pain, reflexes and electrodiagnostic findings, accounting for symptom duration."
      ],
      "diagram": [
        "Motor command",
        "L5 root or peripheral nerve",
        "Leg muscles",
        "Foot movement"
      ]
    },
    {
      "id": "clinical-sensory",
      "title": "Sensory loss without weakness",
      "situation": "After a localized peripheral nerve injury, a patient poorly perceives touch over a limited skin region but can still move the limb.",
      "stages": [
        {
          "title": "Clinical reasoning",
          "questions": [
            "Which functional limb is likely affected?",
            "Why does preserved movement not prove intact sensory fibers?",
            "How can observation be separated from localization hypothesis?"
          ]
        }
      ],
      "explanation": [
        "Sensory receptors and afferent fibers are initial candidates, but the deficit distribution and mechanism require assessment.",
        "Sensory and motor axons serve distinct functions and may be affected differently; preserved movement does not rule out sensory neuropathy.",
        "Map sensory modalities, compare sides, assess strength and reflexes, and select investigations where indicated."
      ],
      "diagram": [
        "Skin receptor",
        "Sensory fiber",
        "Central processing",
        "Conscious perception"
      ]
    },
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
    {
      id: "sensory-reweighting-experiment", title: "Experiment: changing sensory feedback",
      situation: "A volunteer stands on a stable force platform with eyes open, then closes their eyes without changing foot position. Mean center-of-pressure sway speed rises from 7 to 12 mm/s. When the eyes reopen, sway decreases. The participant neither falls nor shows muscle weakness.",
      stages: [
        { title: "What was measured?", questions: ["Identify the manipulated condition and two directly observed findings.","Does this result alone establish dysfunction of vestibular receptors?"] },
        { title: "Explain the mechanism", questions: ["How can vision help limit postural sway?","Which sensory signals remain with eyes closed, and how does the CNS combine them with motor commands?"] },
        { title: "Test another explanation", questions: ["How would you control for changes in stance width, fatigue or instructions?","What would you predict if the experiment were repeated on a compliant foam surface, and why?"] },
      ],
      explanation: ["Closing the eyes removes one source of sensory information. Increased center-of-pressure sway demonstrates altered postural control but does not itself diagnose dysfunction of a specific nervous-system structure.","Visual, vestibular and somatosensory inputs contribute to estimating body position. Central circuits generate corrective muscle commands, and ongoing afferent feedback supports continuous adjustment.","Keep stance width, surface and instructions consistent, repeat trials and assess fatigue. Foam changes the reliability of somatosensory information and may increase reliance on other sensory inputs."],
      diagram: ["Vision and proprioception","Central integration","Muscle commands","Postural sway","Sensory feedback"],
    },
    {
      id: "myelin-conduction-clinical", title: "Clinical bridge: impaired myelinated-axon conduction",
      situation: "After an inflammatory illness, a patient develops weakness of ankle dorsiflexion and reduced motor nerve conduction velocity. Nerve conduction testing shows increased response latency and substantial temporal dispersion, with reduced muscle strength. These are educational data and do not by themselves establish a specific diagnosis.",
      stages: [
        { title: "From impulse to measurement", questions: ["What does a nerve conduction study actually measure?","Why is response latency not a direct measurement of muscle strength?"] },
        { title: "Build a physiological hypothesis", questions: ["How can myelin injury affect conduction velocity and temporal synchrony?","What other forms of injury might influence the amplitude of the muscle response?"] },
        { title: "Make a cautious inference", questions: ["Why can a single test not establish every cause and lesion site?","Which clinical and electrophysiological findings should be considered together?"] },
      ],
      explanation: ["Peripheral nerve conduction studies assess electrical responses following nerve stimulation, including latency, amplitude and compound muscle action potential shape; they do not directly measure muscle force.","Myelin damage may slow impulse conduction, increase temporal dispersion and cause conduction block. Reduced response amplitude can have different causes, including axonal loss, and should not be interpreted in isolation.","Interpretation requires stimulation-site details, limb temperature, artifact checks, weakness distribution, sensory examination, reflexes and potentially needle electromyography. Diagnosis depends on the full clinical context."],
    },
    {
      id: "neuromuscular-transmission-lab", title: "Laboratory case: locating a transmission deficit",
      situation: "During motor-nerve stimulation, an action potential is recorded in the distal axon, but the compound muscle response is smaller than the control response. With closely spaced repeated stimuli, it decreases further. Temperature, electrode placement and stimulus strength are controlled. These are simulated teaching data, not a patient diagnosis.",
      stages: [
        { title: "Describe the observations", questions: ["Which two signals are recorded by different electrodes?","What can be concluded about conduction up to the axonal recording site?"] },
        { title: "Explain the mechanism", questions: ["Which steps between arrival of the impulse and muscle contraction might be affected?","Why cannot the smaller muscle response be attributed solely to a myelin defect without further evidence?"] },
        { title: "Plan verification", questions: ["What further electrophysiological or clinical measurements could help locate the problem?","Why must temperature, electrode position and reproducible stimulation be controlled?"] },
      ],
      explanation: ["The recorded nerve action potential shows that an impulse reached the recording site; the compound muscle response represents the electrical activity of muscle fibers after additional transmission steps.","Neuromuscular transmission, muscle membrane excitability and other links may affect the response. Decrement during repeated stimulation can be informative, but interpretation depends on the exact protocol and exclusion of artifacts.","Repeated nerve conduction measurements, compound muscle action potential analysis and, when indicated, needle EMG help localization. A specific disorder cannot be diagnosed from these limited findings alone."],
    },
    {
      id: "receptor-adaptation", title: "Receptor adaptation",
      situation: "During sustained gentle skin pressure, firing of a rapidly adapting mechanoreceptor is initially high and then falls despite continued pressure.",
      stages: [
        { title: "Evidence", questions: ["How do the physical stimulus and neural signal differ?"] },
        { title: "Physiological mechanism", questions: ["Why does declining firing not prove that pressure has ended?"] },
        { title: "Controls and conclusion", questions: ["How would you compare rapidly and slowly adapting receptors?"] },
      ],
      explanation: ["Adaptation changes the encoding of a sustained stimulus; slowly adapting receptors preserve information about its continuation longer."],
    },
    {
      id: "stimulus-frequency", title: "Stimulus intensity and firing rate",
      situation: "With increasing skin pressure, action-potential firing rate rises in one afferent fiber but the amplitude of each recorded spike remains nearly constant.",
      stages: [
        { title: "Evidence", questions: ["Which parameter encodes increasing stimulation?"] },
        { title: "Physiological mechanism", questions: ["Why does spike amplitude not rise in proportion to pressure?"] },
        { title: "Controls and conclusion", questions: ["How might recruitment change as the stimulus grows?"] },
      ],
      explanation: ["Stimulus intensity can be encoded by firing frequency and recruitment of receptor units rather than by larger individual action potentials."],
    },
    {
      id: "spinal-withdrawal", title: "Protective spinal reflex",
      situation: "A person touches a very hot surface and withdraws the hand before consciously identifying the exact site of pain.",
      stages: [
        { title: "Evidence", questions: ["Which links organize the early withdrawal?"] },
        { title: "Physiological mechanism", questions: ["Why can conscious perception follow movement?"] },
        { title: "Controls and conclusion", questions: ["What happens if the efferent part of the reflex circuit is damaged?"] },
      ],
      explanation: ["Spinal circuits can generate rapid protective movement; ascending pathways support conscious perception, whereas efferent damage weakens the motor response."],
    },
    {
      id: "patellar-reflex", title: "Patellar reflex and inhibition",
      situation: "A tap on the quadriceps tendon produces knee extension while activity of some antagonist flexor motor neurons is suppressed.",
      stages: [
        { title: "Evidence", questions: ["Which receptor detects muscle stretch?"] },
        { title: "Physiological mechanism", questions: ["Why is extensor excitation accompanied by antagonist inhibition?"] },
        { title: "Controls and conclusion", questions: ["How could peripheral nerve damage alter the reflex independently of conscious movement planning?"] },
      ],
      explanation: ["Muscle spindles detect stretch; spinal connections excite extensor motor neurons and recruit inhibitory interneurons affecting antagonists."],
    },
    {
      id: "reaction-time", title: "Reaction time and response selection",
      situation: "A participant presses one button after a tone in 210 ms; when choosing among three buttons based on distinct tones, mean reaction time is 360 ms.",
      stages: [
        { title: "Evidence", questions: ["What changed between the experimental conditions?"] },
        { title: "Physiological mechanism", questions: ["Why does the longer time not establish slower axonal conduction?"] },
        { title: "Controls and conclusion", questions: ["How would you control for practice and anticipation?"] },
      ],
      explanation: ["Choice tasks add discrimination and decision processes; measured reaction time includes sensory, central and motor components."],
    },
    {
      id: "autonomic-standing", title: "Autonomic regulation on standing",
      situation: "After moving from supine to standing, a healthy volunteer experiences a brief blood-pressure fall followed by increased heart rate and partial pressure recovery.",
      stages: [
        { title: "Evidence", questions: ["Which mechanoreceptors help regulate the immediate response?"] },
        { title: "Physiological mechanism", questions: ["How do autonomic influences on the heart and vessels change?"] },
        { title: "Controls and conclusion", questions: ["Why is this not solely a voluntary skeletal-muscle reflex?"] },
      ],
      explanation: ["Arterial baroreceptors report changes in vessel-wall stretch to brainstem centers; reduced baroreceptor input generally increases sympathetic and decreases vagal influence."],
    },
    {
      id: "temperature-control", title: "Thermoregulation and feedback",
      situation: "Skin cooling causes cutaneous vasoconstriction; with greater cooling, shivering may develop.",
      stages: [
        { title: "Evidence", questions: ["Which sensory inputs initiate the response?"] },
        { title: "Physiological mechanism", questions: ["How do effector responses limit heat loss or increase heat production?"] },
        { title: "Controls and conclusion", questions: ["Why is skin cooling not identical to a fall in core temperature?"] },
      ],
      explanation: ["Thermoreceptor inputs are integrated by central networks including the hypothalamus; vasoconstriction reduces heat loss and shivering increases heat production."],
    },
    {
      id: "eeg-artifact", title: "EEG signal or artifact",
      situation: "During scalp EEG, a participant blinks. A large slow deflection appears in frontal channels while the occipital rhythm remains largely unchanged.",
      stages: [
        { title: "Evidence", questions: ["What observations suggest an ocular artifact?"] },
        { title: "Physiological mechanism", questions: ["Why must the waveform not automatically be labeled a pathological cortical discharge?"] },
        { title: "Controls and conclusion", questions: ["What control recordings could help verify its source?"] },
      ],
      explanation: ["Blinking and eye movements generate electrical artifacts prominent over anterior electrodes; time-locking and electrooculography can clarify their origin."],
    },
    {
      id: "emg-vs-force", title: "EMG versus muscle force",
      situation: "During a progressively loaded task, forearm surface EMG amplitude increases but its relation to measured force is nonlinear.",
      stages: [
        { title: "Evidence", questions: ["What physical signal is recorded by EMG?"] },
        { title: "Physiological mechanism", questions: ["Why is EMG amplitude not a direct readout of contraction force?"] },
        { title: "Controls and conclusion", questions: ["Which factors, including electrode position and fatigue, require control?"] },
      ],
      explanation: ["EMG reflects summated electrical activity of motor units; force also depends on muscle mechanics, length, contraction velocity and other conditions."],
    },
    {
      id: "crossed", title: "Sensory pathways and crossing",
      situation: "A person feels touch on the right hand. The signal must travel from a peripheral receptor to brain structures.",
      stages: [{ title: "Trace the sensory route", questions: ["Where is the receptor located?","How do peripheral and central parts of the pathway differ?","Can the exact level of pathway crossing be identified from this description?"] }],
      explanation: ["Cutaneous mechanoreceptors convert touch into a receptor signal that travels through afferent fibres to the CNS.","Further processing depends on the sensory modality and pathway. Some somatosensory pathways cross the midline, but at different levels.","Touch alone does not establish which tract or crossing level is involved. The specific sensory modality must be determined."],
      diagram: ["Cutaneous mechanoreceptor","Afferent fibre","Central sensory pathway","Processing of sensory input"],
    },
    {
      id: "autonomic", title: "Somatic and autonomic responses",
      situation: "After a sudden loud noise a person turns the head, and heart rate may briefly rise.",
      stages: [{ title: "Compare two responses", questions: ["Which organs carry out the motor and autonomic responses?","Which efferent systems are involved?","Why can these responses differ in duration?"] }],
      explanation: ["Head turning is produced by skeletal muscles controlled through somatic motor pathways.","Heart-rate changes are regulated by autonomic influences on the heart and depend on the circumstances.","The CNS can coordinate both responses, but the effectors and regulatory time courses differ. One observation cannot quantify sympathetic and parasympathetic contributions."],
      diagram: ["Auditory sensory input","Central processing","Somatic output → neck muscles","Autonomic output → heart"],
    },
    {
      id: "posture", title: "Vision and postural control",
      situation: "A student maintains standing balance. After closing the eyes, sway increases slightly but standing remains possible.",
      stages: [{ title: "Sensory support for balance", questions: ["What information does vision provide?","Which signals remain available with eyes closed?","Why does eye closure not eliminate balance control?"] }],
      explanation: ["Vision supplies information about body position relative to the environment.","Vestibular and somatosensory signals continue to reach central postural networks.","Balance depends on integrating and reweighting sensory information. Mild sway alone is not evidence of disease."],
      diagram: ["Visual, vestibular and somatosensory inputs","Central integration","Output to postural muscles","Updated sensory feedback"],
    },
    {
      id: "reaction", title: "Voluntary reaction and reflex",
      situation: "In a practical class, a student presses a button after a light appears and compares this with withdrawing the hand from a painful stimulus.",
      stages: [{ title: "Compare neural responses", questions: ["How do the sensory inputs differ?","Why are these not necessarily the same kind of reflex?","What can alter button-press reaction time?"] }],
      explanation: ["Responding to a light uses visual processing, task selection and a voluntary motor programme.","A protective withdrawal reflex can begin through spinal circuits without waiting for a conscious decision.","Attention, preparedness and task demands affect voluntary reaction time. Speed alone cannot identify a specific neural circuit."],
      diagram: ["Light signal → visual input","Voluntary action selection","Motor output → hand muscles","Button press"],
    },
  ],
  sources: [
    { title: "Neuroscience: Chemical Synapses", href: "https://www.ncbi.nlm.nih.gov/books/NBK11009/" },
    { title: "Physiology, Withdrawal Response", href: "https://www.ncbi.nlm.nih.gov/books/NBK544292/" },
  ],
};

export default lesson;
