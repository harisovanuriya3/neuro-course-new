import type { Language } from "../course";
import type { PretestLesson } from "../study";

// Diagnostic pretest, not a scored examination or a clinical diagnosis.
// Cross-checked against Ganong 23e, ch. 6 (PDF pp. 127–130),
// Guyton & Hall 13e, ch. 46 (PDF pp. 556–558), and
// C. L. Ghai Practical Physiology 8e (PDF pp. 353–354).
// Ghai's nerve–muscle preparation illustrates an experimental limitation;
// it is not evidence for direct measurement of central synaptic release.
type DiagnosticItem = {
  prompt: string;
  options: [string, string, string, string];
  correctAnswer: "a" | "b" | "c" | "d";
  explanation: string;
};
type Locale = {
  introduction: string;
  questions: [DiagnosticItem, DiagnosticItem];
};
const localized: Record<Language, Locale> = {
  RU: {
    introduction: "Два диагностических вопроса о передаче сигнала в химическом синапсе. Баллы не выставляются: после ответа прочитайте объяснение и проверьте причинную цепь.",
    questions: [
      {
        prompt: "Потенциал действия достигает пресинаптического окончания, но вход Ca²⁺ через потенциал-зависимые каналы блокирован. Какое изменение наиболее вероятно в обычном химическом синапсе?",
        options: [
          "Медиатор выделяется как прежде, но постсинаптические рецепторы перестают его распознавать.",
          "Возникает усиленный вызванный ответ из-за увеличения слияния синаптических везикул.",
          "Вызванное везикулярное выделение медиатора резко уменьшается, хотя импульс дошёл до окончания.",
          "Потенциал действия перестаёт распространяться по всему аксону из-за блокады пресинаптических Ca²⁺-каналов.",
        ],
        correctAnswer: "c",
        explanation: "Приход потенциала действия и выделение медиатора — разные этапы. В обычном химическом синапсе вход Ca²⁺ в активную зону запускает слияние везикул. Его блокада резко уменьшает вызванное выделение, но сама по себе не означает блок проведения потенциала действия по аксону. Это упрощённая модель: спонтанное выделение и остаточная передача не обязательно исчезают полностью.",
      },
      {
        prompt: "Один и тот же медиатор действует на два типа постсинаптических рецепторов, и ответы клеток различаются. Какое объяснение физиологически наиболее обосновано?",
        options: [
          "Различия ответов объясняются только количеством выделенного медиатора; свойства постсинаптических рецепторов роли не играют.",
          "Разные рецепторы активируют разные ионные проводимости или внутриклеточные пути; эффект также зависит от ионных градиентов.",
          "Направление ответа определяется только формой пресинаптического импульса, даже если постсинаптические рецепторы различаются.",
          "Все ионотропные рецепторы вызывают возбуждение, а все метаботропные — торможение независимо от ионных градиентов.",
        ],
        correctAnswer: "b",
        explanation: "Постсинаптический эффект определяется типом рецептора и связанными с ним ионными каналами либо внутриклеточными сигнальными путями. Направление тока зависит от электрохимических градиентов, а влияние на разряд — от состояния и расположения синапса. Поэтому один медиатор не следует считать всегда возбуждающим или всегда тормозным.",
      },
    ],
  },
  EN: {
    introduction: "Two ungraded diagnostic questions on chemical synaptic transmission. After answering, read the feedback and check the causal sequence.",
    questions: [
      {
        prompt: "An action potential reaches a presynaptic terminal, but Ca²⁺ entry through voltage-gated channels is blocked. What is the most likely change at a typical chemical synapse?",
        options: [
          "Transmitter release continues normally, but postsynaptic receptors can no longer recognize it.",
          "The evoked postsynaptic response increases because more synaptic vesicles fuse.",
          "Evoked vesicular transmitter release falls markedly even though the spike reaches the terminal.",
          "The action potential stops propagating along the entire axon because terminal Ca²⁺ channels are blocked.",
        ],
        correctAnswer: "c",
        explanation: "Arrival of an action potential and transmitter release are distinct steps. At a typical chemical synapse, Ca²⁺ entry near the active zone triggers vesicle fusion. Blocking this entry greatly reduces evoked release but does not itself block spike propagation along the axon. This is a simplified model: spontaneous release and residual transmission need not disappear completely.",
      },
      {
        prompt: "The same neurotransmitter acts on two types of postsynaptic receptors and produces different cellular responses. Which explanation is physiologically best supported?",
        options: [
          "The difference is explained solely by how much transmitter is released; postsynaptic receptor properties have no role.",
          "Different receptors engage different ion conductances or intracellular pathways; ionic gradients also influence the effect.",
          "The presynaptic spike waveform alone determines the response direction even when postsynaptic receptors differ.",
          "All ionotropic receptors are excitatory and all metabotropic receptors inhibitory, regardless of ionic gradients.",
        ],
        correctAnswer: "b",
        explanation: "Postsynaptic effects depend on receptor type and the associated ion channels or intracellular signaling pathways. Current direction depends on electrochemical gradients, while the effect on firing also depends on cellular state and synaptic location. The same transmitter therefore need not be exclusively excitatory or inhibitory.",
      },
    ],
  },
  KZ: {
    introduction: "Химиялық синапстағы берілу туралы бағаланбайтын екі диагностикалық сұрақ. Жауаптан кейін түсіндірмені оқып, себеп-салдар тізбегін тексеріңіз.",
    questions: [
      {
        prompt: "Әрекет потенциалы пресинапстық ұшқа жетеді, бірақ кернеуге тәуелді арналар арқылы Ca²⁺ енуі бөгелген. Әдеттегі химиялық синапста қандай өзгеріс болуы ықтимал?",
        options: [
          "Медиатор бұрынғыдай бөлінеді, бірақ постсинапстық рецепторлар оны танымай қалады.",
          "Синапстық көпіршіктердің қосылуы күшейіп, шақырылған постсинапстық жауап артады.",
          "Импульс ұшқа жеткенімен, медиатордың тітіркендіргішке жауап ретінде көпіршіктерден бөлінуі күрт азаяды.",
          "Пресинапстық Ca²⁺ арналары бөгелгендіктен, әрекет потенциалы бүкіл аксон бойымен таралмай қалады.",
        ],
        correctAnswer: "c",
        explanation: "Әрекет потенциалының ұшқа жетуі мен медиатордың бөлінуі — екі бөлек кезең. Әдеттегі химиялық синапста белсенді аймаққа Ca²⁺ енуі көпіршіктердің мембранамен қосылуын іске қосады. Бұл кірісті бөгеу шақырылған бөлінуді айтарлықтай азайтады, бірақ өздігінен аксон бойындағы импульс өткізуді тоқтатпайды. Бұл — жеңілдетілген модель: медиатордың өздігінен бөлінуі мен қалдық берілу толық жойылмауы мүмкін.",
      },
      {
        prompt: "Бір медиатор постсинапстық рецепторлардың екі түріне әсер етіп, жасушаларда әртүрлі жауап туғызады. Қай түсіндірме физиологиялық тұрғыдан дұрыс?",
        options: [
          "Жауаптардың айырмашылығы тек бөлінген медиатор мөлшерімен түсіндіріледі; постсинапстық рецептор қасиеттері маңызды емес.",
          "Әртүрлі рецепторлар әртүрлі иондық өткізгіштікті немесе жасушаішілік сигналдық жолдарды іске қосады; әсерге иондық градиенттер де ықпал етеді.",
          "Постсинапстық рецепторлар әртүрлі болса да, жауап бағытын тек пресинапстық импульстің пішіні анықтайды.",
          "Барлық ионотроптық рецепторлар қоздырады, ал барлық метаботроптық рецепторлар иондық градиентке қарамастан тежейді.",
        ],
        correctAnswer: "b",
        explanation: "Постсинапстық әсер рецептор түріне және онымен байланысқан ион арналарына не жасушаішілік сигналдық жолдарға тәуелді. Токтың бағыты электрохимиялық градиенттерге, ал нейронның разрядына ықпалы жасушаның күйі мен синапстың орналасуына да байланысты. Сондықтан бір медиаторды барлық жағдайда тек қоздырғыш немесе тек тежеуші деп қарастыруға болмайды.",
      },
    ],
  },
};

export function createModuleFivePretest(
  language: Language,
  moduleTitle: string,
  title: string,
): PretestLesson {
  const copy = localized[language];
  return {
    kind: "pretest",
    title,
    introduction: copy.introduction,
    questions: copy.questions.map((question, index) => ({
      id: index === 0 ? "module-5-pretest-calcium" : "module-5-pretest-receptors",
      topic: moduleTitle,
      prompt: question.prompt,
      options: question.options.map((option, optionIndex) => ({
        id: ["a", "b", "c", "d"][optionIndex],
        text: option,
      })),
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      target: { section: "theory" as const },
    })),
  };
}
