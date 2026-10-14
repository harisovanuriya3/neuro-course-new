import type { Language } from '../course';
import type { MediaLesson } from '../media';

// Module 3 media: physiological interpretation of a schematic, NOT an EEG/ENG recording.
// Sources consulted: Guyton & Hall 13e ch. 5 (PDF 78–79),
// Ganong 23e ch. 4 (PDF 92–94), Ghai 8e (PDF 250–251).
const reviewed: Record<Language, {
  intro: string; preview: string; transcript: string[];
  prompt: string; explanation: string;
  options: [string, string, string, string];
  feedback: [string, string, string, string];
}> = {
  RU: {
    intro: 'Схематическая анимация: нейрон, глия и распространение импульса. Это учебная модель, а не запись скорости проведения у пациента.',
    preview: 'Сравните проведение при сохранном миелине и его локальной утрате, удерживая постоянными диаметр аксона и температуру. Объясните роль перехватов Ранвье.',
    transcript: [
      'Дендриты и тело нейрона принимают и интегрируют сигналы; в типичном мотонейроне потенциал действия инициируется в начальном сегменте аксона.',
      'В миелинизированном аксоне локальный ток распространяется между перехватами Ранвье; потенциал действия регенерируется в узлах с высокой плотностью потенциал-зависимых Na⁺-каналов.',
      'Олигодендроциты образуют миелин в ЦНС, шванновские клетки — в ПНС. Астроциты помогают поддерживать внеклеточную концентрацию K⁺ и удалять глутамат.',
      'При локальной демиелинизации возрастает утечка тока через межузловую мембрану и её ёмкостная нагрузка; проведение может замедлиться или блокироваться даже без перерыва аксона.',
      'Показанная анимация качественная: она не вычисляет реальную скорость или диагноз. В исследовании нервной проводимости учитывают температуру и латентности М-ответов.'
    ],
    prompt: 'Участок аксона демиелинизирован, но сам аксон сохранён. Диаметр и температура неизменны. Какой прогноз наиболее физиологически обоснован?',
    explanation: 'Миелин уменьшает утечку и ёмкостную нагрузку межузловой мембраны. Его утрата ухудшает распространение местного тока к следующему узлу: проведение может замедлиться или блокироваться, даже если аксон не перерезан.',
    options: [
      'Проведение обязательно ускорится, потому что мембрана станет доступнее для ионов.',
      'Проведение может замедлиться или блокироваться из-за утечки тока и роста ёмкостной нагрузки.',
      'Проведение останется неизменным, поскольку узлы Ранвье продолжают существовать.',
      'Нарушится только синаптическая передача, а проведение по аксону не изменится.'
    ],
    feedback: [
      'Доступность мембраны для ионов не компенсирует потерю электрической изоляции.',
      'Верно: местный ток может не деполяризовать следующий узел до порога.',
      'Наличие узлов не гарантирует достаточного деполяризующего тока.',
      'Демиелинизация меняет электрические свойства самого аксона, а не только синапса.'
    ]
  },
  EN: {
    intro: 'Schematic animation: neuron, glia, and impulse propagation. This is a teaching model, not a patient nerve-conduction recording.',
    preview: 'Compare intact versus locally lost myelin at fixed axon diameter and temperature. Explain the role of nodes of Ranvier.',
    transcript: [
      'Dendrites and the cell body receive and integrate signals; in a typical motor neuron, the action potential starts at the axon initial segment.',
      'In a myelinated axon, local current spreads between nodes of Ranvier; action potentials regenerate at nodes enriched in voltage-gated Na⁺ channels.',
      'Oligodendrocytes form CNS myelin, whereas Schwann cells form PNS myelin. Astrocytes help regulate extracellular K⁺ and clear glutamate.',
      'Local demyelination increases internodal current leakage and capacitive load; conduction can slow or fail even without axonal transection.',
      'This animation is qualitative: it does not calculate a clinical conduction velocity or establish a diagnosis. Nerve-conduction studies account for temperature and CMAP onset latencies.'
    ],
    prompt: 'An axonal segment loses myelin, but the axon remains intact. Diameter and temperature are held constant. Which prediction is physiologically best supported?',
    explanation: 'Myelin reduces internodal current leak and capacitive load. Loss of myelin impairs local current spread toward the next node and can slow or block conduction without axonal transection.',
    options: [
      'Conduction must speed up because the axonal membrane is more exposed to ions.',
      'Conduction may slow or fail because current leakage and capacitive load increase.',
      'Conduction stays unchanged because the nodes of Ranvier are still present.',
      'Only synaptic transmission changes; axonal conduction remains unaffected.'
    ],
    feedback: [
      'Membrane exposure does not compensate for loss of electrical insulation.',
      'Correct: local current may fail to depolarize the next node to threshold.',
      'Nodes alone do not guarantee enough depolarizing current reaches them.',
      'Demyelination alters axonal electrical properties, not only synaptic function.'
    ]
  },
  KZ: {
    intro: 'Сызбалық анимация: нейрон, глия және импульстің таралуы. Бұл — оқу моделі, пациенттің жүйке өткізгіштігін тіркеу емес.',
    preview: 'Аксон диаметрі мен температураны тұрақты ұстап, миелині сақталған және жергілікті зақымданған талшықтарды салыстырыңыз. Ранвье түйіндерінің рөлін түсіндіріңіз.',
    transcript: [
      'Дендриттер мен нейрон денесі сигналдарды қабылдап, біріктіреді; әдеттегі мотонейронда әрекет потенциалы аксонның бастапқы сегментінде пайда болады.',
      'Миелинденген аксонда жергілікті ток Ранвье түйіндерінің арасында таралады; кернеуге тәуелді Na⁺ арналары тығыз орналасқан түйіндерде әрекет потенциалы қайта түзіледі.',
      'Олигодендроциттер ОЖЖ-де, шванн жасушалары ШЖЖ-де миелин түзеді. Астроциттер жасушадан тыс K⁺ деңгейін реттеуге және глутаматты сіңіруге көмектеседі.',
      'Жергілікті демиелиндену түйінаралық токтың ағып кетуін және мембрананың сыйымдылық жүктемесін арттырады; аксон үзілмесе де өткізу баяулауы немесе бөгелуі мүмкін.',
      'Бұл анимация сапалық сипатта: ол клиникалық өткізу жылдамдығын есептемейді және диагноз қоймайды. Жүйке өткізгіштігін зерттегенде температура мен М-жауаптың басталу латенттілігі ескеріледі.'
    ],
    prompt: 'Аксонның бір бөлігінде миелин жоғалды, бірақ аксон бүтін. Диаметр мен температура тұрақты. Қандай болжам физиологиялық тұрғыдан негізді?',
    explanation: 'Миелин түйінаралық токтың ағып кетуін және мембрананың сыйымдылық жүктемесін азайтады. Миелин жоғалғанда келесі түйінге жететін жергілікті ток әлсіреп, аксон үзілмесе де өткізу баяулауы не бөгелуі мүмкін.',
    options: [
      'Мембрана иондарға ашық болғандықтан өткізу міндетті түрде жылдамдайды.',
      'Токтың ағып кетуі мен сыйымдылық жүктемесінің артуынан өткізу баяулауы не бөгелуі мүмкін.',
      'Ранвье түйіндері сақталғандықтан өткізу жылдамдығы өзгермейді.',
      'Тек синапстық берілу бұзылады, ал аксон бойымен өткізу өзгермейді.'
    ],
    feedback: [
      'Иондарға қолжетімділік электрлік оқшаулаудың жоғалуын өтемейді.',
      'Дұрыс: жергілікті ток келесі түйінді табалдырыққа дейін деполяризациялай алмауы мүмкін.',
      'Түйіндердің болуы оларға жеткілікті деполяризациялаушы ток жететінін білдірмейді.',
      'Демиелиндену тек синапсқа емес, аксонның электрлік қасиеттеріне әсер етеді.'
    ]
  }
};

export function createModuleThreeMedia(language: Language, base: MediaLesson): MediaLesson {
  if (base.kind !== 'media' || base.blocks.length !== 1) {
    throw new Error('Module 3 foundation media structure changed');
  }
  const copy = reviewed[language];
  const original = base.blocks[0];
  return {
    ...base,
    introduction: copy.intro,
    blocks: [{
      ...original,
      preview: copy.preview,
      transcript: copy.transcript,
      question: {
        prompt: copy.prompt,
        correctAnswer: 'b',
        explanation: copy.explanation,
        options: (['a','b','c','d'] as const).map((id, i) => ({
          id, text: copy.options[i], feedback: copy.feedback[i]
        }))
      }
    }]
  };
}
