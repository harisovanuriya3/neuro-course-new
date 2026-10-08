import { modules, type Language } from '../course';
import { getSectionTitle, type Section } from '../sections';
import type { LocalizedLesson, PracticeLesson, SectionLesson } from '../types';
import type { MediaLesson } from '../media';
import { topics, termDefinitions, type Topic } from './topics';
import { clinicalVignettes, createFoundationCase, createFoundationTest } from './assessment';

const experimentFocus: Partial<Record<number, Record<Language, string>>> = {
  9: { RU: 'сравните амплитуду и латентность рефлекторного ответа до и после изменения интенсивности афферентного стимула', EN: 'compare reflex-response amplitude and latency before and after changing afferent stimulus intensity', KZ: 'афференттік стимул қарқындылығын өзгерткенге дейін және кейін рефлекстік жауаптың амплитудасы мен латенттілігін салыстырыңыз' },
  10: { RU: 'измените уровень сенсорной активации и измерьте изменение показателя бодрствования или постуральной реакции', EN: 'change the level of sensory activation and measure a change in an arousal or postural-response variable', KZ: 'сенсорлық белсендіру деңгейін өзгертіп, сергектік немесе постуралдық жауап көрсеткішінің өзгерісін өлшеңіз' },
  12: { RU: 'измените условие выбора движения и измерьте время начала, частоту ошибочного выбора или масштаб ответа', EN: 'change a movement-selection condition and measure initiation time, erroneous-choice frequency, or response scaling', KZ: 'қозғалысты таңдау шартын өзгертіп, басталу уақытын, қате таңдау жиілігін немесе жауап ауқымын өлшеңіз' },
  13: { RU: 'измените доступность сенсорной обратной связи и измерьте ошибку траектории, время коррекции или точность движения', EN: 'change sensory-feedback availability and measure trajectory error, correction time, or movement accuracy', KZ: 'сенсорлық кері байланыстың қолжетімділігін өзгертіп, траектория қатесін, түзету уақытын немесе қозғалыс дәлдігін өлшеңіз' },
  14: { RU: 'измените сенсорный контекст и измерьте эффективность передачи выбранного сигнала или точность его обнаружения', EN: 'change sensory context and measure transmission effectiveness of a selected signal or its detection accuracy', KZ: 'сенсорлық контексті өзгертіп, таңдалған сигналдың берілу тиімділігін немесе оны анықтау дәлдігін өлшеңіз' },
  15: { RU: 'задайте контролируемое отклонение регулируемой величины и измерьте направление компенсаторного ответа во времени', EN: 'introduce a controlled deviation in a regulated variable and measure the direction of the compensatory response over time', KZ: 'реттелетін шаманы бақыланатын түрде ауытқытып, уақыт бойынша компенсациялық жауаптың бағытын өлшеңіз' },
  18: { RU: 'измените характеристику сенсорного или моторного задания и измерьте точность, латентность или пространственную специфичность ответа', EN: 'change a sensory or motor task feature and measure accuracy, latency, or spatial specificity of the response', KZ: 'сенсорлық немесе моторлық тапсырма сипаттамасын өзгертіп, жауаптың дәлдігін, латенттілігін немесе кеңістіктік ерекшелігін өлшеңіз' },
  20: { RU: 'измените параметр зрительного стимула и измерьте порог обнаружения, точность различения или время ответа', EN: 'change a visual-stimulus parameter and measure detection threshold, discrimination accuracy, or response time', KZ: 'көру стимулының параметрін өзгертіп, анықтау табалдырығын, ажырату дәлдігін немесе жауап уақытын өлшеңіз' },
  24: { RU: 'сравните условия с разным временем светового воздействия и измерьте сонливость, время засыпания или параметр суточного ритма', EN: 'compare conditions with different light timing and measure sleepiness, sleep-onset timing, or a circadian-rhythm variable', KZ: 'жарық әсерінің уақыты әртүрлі жағдайларды салыстырып, ұйқышылдықты, ұйықтау уақытын немесе тәуліктік ырғақ көрсеткішін өлшеңіз' },
};

// Shared foundation for modules 2–25.
// Topic-specific content is progressively deepened while keeping one reusable architecture.

export const foundationSections = [
  'objectives',
  'pretest',
  'theory',
  'one-minute',
  'clinical',
  'practice',
  'cases',
  'tests',
  'questions',
  'media',
  'glossary',
  'references',
] as const;

const sources: Record<string, { title: string; href: string }> = {
  guyton: {
    title: 'Guyton & Hall · Textbook of Medical Physiology, 15th ed.',
    href: 'https://shop.elsevier.com/books/guyton-and-hall-textbook-of-medical-physiology/hall/978-0-443-11101-3',
  },

  boron: {
    title: 'Boron & Boulpaep · Concise Medical Physiology',
    href: 'https://shop.elsevier.com/books/boron-and-boulpaep-concise-medical-physiology/boron/978-0-323-65530-9',
  },

  kzphysiology: {
    title: 'Қалыпты физиология · ҚазҰМУ ғылыми кітапханасы каталогы',
    href: 'https://lib.kaznmu.edu.kz/wp-content/uploads/2022/10/katalog-gjeotar-2021-2022-gg-5.pdf',
  },

  kznervous: {
    title: 'Жүйке жүйесі / Нервная система · интегрированный учебник · ҚазҰМУ кітапханасы',
    href: 'https://lib.kaznmu.edu.kz/en/novye-postupleniYa-za-sentYabr-mesYac-2018/',
  },
  cns: {
    title: 'OpenStax · The Central Nervous System',
    href: 'https://openstax.org/books/anatomy-and-physiology-2e/pages/13-2-the-central-nervous-system',
  },

  cells: {
    title: 'OpenStax · Nervous Tissue',
    href: 'https://openstax.org/books/anatomy-and-physiology-2e/pages/12-2-nervous-tissue',
  },

  potential: {
    title: 'OpenStax · The Action Potential',
    href: 'https://openstax.org/books/anatomy-and-physiology/pages/12-4-the-action-potential',
  },

  synapse: {
    title: 'OpenStax · Communication Between Neurons',
    href: 'https://openstax.org/books/anatomy-and-physiology-2e/pages/12-5-communication-between-neurons',
  },

  motor: {
    title: 'OpenStax · Motor Responses',
    href: 'https://openstax.org/books/anatomy-and-physiology-2e/pages/14-3-motor-responses',
  },

  sensory: {
    title: 'OpenStax · Sensory Perception',
    href: 'https://openstax.org/books/anatomy-and-physiology-2e/pages/14-1-sensory-perception',
  },

  taste: {
    title: 'NIDCD · Taste Disorders',
    href: 'https://www.nidcd.nih.gov/health/taste-disorders',
  },

  autonomic: {
    title: 'OpenStax · Divisions of the Autonomic Nervous System',
    href: 'https://openstax.org/books/anatomy-and-physiology-2e/pages/15-1-divisions-of-the-autonomic-nervous-system',
  },

  sleep: {
    title: 'NINDS · Understanding Sleep',
    href: 'https://www.ninds.nih.gov/sites/default/files/2025-05/understanding-sleep.pdf',
  },

  plasticity: {
    title: 'NINDS · Traumatic Brain Injury',
    href: 'https://www.ninds.nih.gov/health-information/disorders/traumatic-brain-injury-tbi',
  },

  methods: {
    title: 'NINDS · Neurological Diagnostic Tests and Procedures',
    href: 'https://www.ninds.nih.gov/health-information/disorders/neurological-diagnostic-tests-and-procedures',
  },

  learning: {
    title: 'OpenStax · Classical Conditioning',
    href: 'https://openstax.org/books/psychology-2e/pages/6-2-classical-conditioning',
  },
};

const extraGlossary: Partial<Record<number, { term: Record<Language,string>; definition: Record<Language,string> }[]>> = {
  3: [
    {term:{RU:'Гематоэнцефалический барьер',EN:'Blood–brain barrier',KZ:'Гематоэнцефалдық бөгет'},definition:{RU:'Избирательный барьер между кровью и нервной тканью, помогающий сохранять стабильную среду мозга.',EN:'A selective barrier between blood and neural tissue that helps maintain a stable brain environment.',KZ:'Қан мен жүйке тіні арасындағы мидың тұрақты ортасын сақтауға көмектесетін таңдамалы бөгет.'}},
    {term:{RU:'Ликвор',EN:'Cerebrospinal fluid',KZ:'Жұлын-ми сұйықтығы'},definition:{RU:'Жидкость желудочков и субарахноидального пространства, участвующая в защите и гомеостазе ЦНС.',EN:'Fluid in the ventricles and subarachnoid space that contributes to CNS protection and homeostasis.',KZ:'Қарыншалар мен субарахноидтық кеңістіктегі ОЖЖ қорғанысы мен гомеостазына қатысатын сұйықтық.'}},
    {term:{RU:'Астроцит',EN:'Astrocyte',KZ:'Астроцит'},definition:{RU:'Глиальная клетка, участвующая в поддержании ионной среды, обмене веществ и взаимодействии с сосудистой стенкой.',EN:'A glial cell involved in ionic homeostasis, metabolism, and interaction with the vascular wall.',KZ:'Иондық ортаны, зат алмасуды және тамыр қабырғасымен әрекеттесуді қолдайтын глия жасушасы.'}},
  ],
  5: [
    {term:{RU:'Концевая пластинка',EN:'Motor end plate',KZ:'Соңғы пластинка'},definition:{RU:'Специализированная область мембраны мышечного волокна под нервно-мышечным синапсом.',EN:'The specialized region of muscle membrane beneath the neuromuscular junction.',KZ:'Жүйке-бұлшықет синапсы астындағы бұлшықет мембранасының маманданған аймағы.'}},
    {term:{RU:'Никотиновый ацетилхолиновый рецептор',EN:'Nicotinic acetylcholine receptor',KZ:'Никотиндік ацетилхолин рецепторы'},definition:{RU:'Ионотропный рецептор концевой пластинки, активируемый ацетилхолином.',EN:'An ionotropic end-plate receptor activated by acetylcholine.',KZ:'Ацетилхолинмен белсенетін соңғы пластинканың ионотроптық рецепторы.'}},
    {term:{RU:'Ацетилхолинэстераза',EN:'Acetylcholinesterase',KZ:'Ацетилхолинэстераза'},definition:{RU:'Фермент, быстро расщепляющий ацетилхолин в синаптической щели.',EN:'The enzyme that rapidly breaks down acetylcholine in the synaptic cleft.',KZ:'Синапстық саңылауда ацетилхолинді жылдам ыдырататын фермент.'}},
  ],
  7: [
    {term:{RU:'Безусловный рефлекс',EN:'Unconditioned reflex',KZ:'Шартсыз рефлекс'},definition:{RU:'Врожденная реакция на значимый стимул, не требующая предварительного обучения.',EN:'An innate response to a meaningful stimulus that does not require prior learning.',KZ:'Алдын ала үйренуді қажет етпейтін маңызды стимулға туа біткен жауап.'}},
    {term:{RU:'Условный рефлекс',EN:'Conditioned reflex',KZ:'Шартты рефлекс'},definition:{RU:'Приобретённая реакция, формирующаяся при обучении и предсказательном значении сигнала.',EN:'An acquired response formed through learning when a cue gains predictive value.',KZ:'Сигнал болжаушы мәнге ие болғанда үйрену арқылы қалыптасатын жүре пайда болған жауап.'}},
    {term:{RU:'Угасание',EN:'Extinction',KZ:'Өшу'},definition:{RU:'Ослабление условной реакции при повторении сигнала без подкрепления.',EN:'Weakening of a conditioned response when the cue is repeatedly presented without reinforcement.',KZ:'Сигнал нығайтусыз қайталанғанда шартты реакцияның әлсіреуі.'}},
  ],
  10: [
    {term:{RU:'Черепной нерв',EN:'Cranial nerve',KZ:'Бассүйек нерві'},definition:{RU:'Один из двенадцати парных нервов, связанных преимущественно с головным мозгом и стволом.',EN:'One of twelve paired nerves connected mainly with the brain and brainstem.',KZ:'Негізінен ми және ми бағанымен байланысатын он екі жұп нервтің бірі.'}},
    {term:{RU:'Ядро черепного нерва',EN:'Cranial nerve nucleus',KZ:'Бассүйек нерві ядросы'},definition:{RU:'Группа нейронов ЦНС, связанная с определёнными чувствительными или двигательными компонентами черепного нерва.',EN:'A CNS neuronal group associated with specific sensory or motor components of a cranial nerve.',KZ:'Бассүйек нервінің белгілі сезімтал немесе қозғалтқыш компоненттерімен байланысты ОЖЖ нейрондар тобы.'}},
    {term:{RU:'Висцеральные волокна',EN:'Visceral fibers',KZ:'Висцералдық талшықтар'},definition:{RU:'Афферентные или эфферентные волокна, связанные с внутренними органами, гладкими мышцами, железами или специальными висцеральными чувствами.',EN:'Afferent or efferent fibers related to viscera, smooth muscle, glands, or special visceral senses.',KZ:'Ішкі мүшелер, тегіс бұлшықет, бездер немесе арнайы висцералдық сезімдермен байланысты афференттік не эфференттік талшықтар.'}},
  ],
  18: [
    {term:{RU:'Зона Брока',EN:'Broca area',KZ:'Брока аймағы'},definition:{RU:'Область доминантной лобной доли, особенно важная для моторной организации речи.',EN:'A dominant frontal-lobe region especially important for motor organization of speech.',KZ:'Сөйлеудің моторлық ұйымдасуына ерекше маңызды доминантты маңдай бөлігі аймағы.'}},
    {term:{RU:'Зона Вернике',EN:'Wernicke area',KZ:'Вернике аймағы'},definition:{RU:'Традиционное название задней височно-теменной языковой области, важной для понимания речи.',EN:'Traditional term for a posterior temporoparietal language region important for comprehension.',KZ:'Сөйлеуді түсінуге маңызды артқы самай-төбе тіл аймағының дәстүрлі атауы.'}},
    {term:{RU:'Функциональная сеть',EN:'Functional network',KZ:'Функциялық желі'},definition:{RU:'Несколько связанных областей мозга, совместно обеспечивающих функцию.',EN:'Multiple connected brain regions that work together to support a function.',KZ:'Белгілі қызметті бірге қамтамасыз ететін өзара байланысты бірнеше ми аймағы.'}},
  ],
  23: [
    {term:{RU:'Гиппокамп',EN:'Hippocampus',KZ:'Гиппокамп'},definition:{RU:'Структура медиальной височной доли, особенно важная для формирования новых декларативных воспоминаний и контекста.',EN:'A medial temporal structure especially important for forming new declarative memories and contextual memory.',KZ:'Жаңа декларативті естеліктер мен контекстік жадты қалыптастыруға маңызды медиалдық самай құрылымы.'}},
    {term:{RU:'Рабочая память',EN:'Working memory',KZ:'Жұмыс жады'},definition:{RU:'Кратковременное удержание и обработка информации, необходимой для текущей задачи.',EN:'Short-term maintenance and manipulation of information needed for the current task.',KZ:'Ағымдағы міндетке қажет ақпаратты қысқа уақыт сақтау және өңдеу.'}},
    {term:{RU:'Консолидация памяти',EN:'Memory consolidation',KZ:'Жад консолидациясы'},definition:{RU:'Процессы, благодаря которым новый след памяти становится более устойчивым во времени.',EN:'Processes through which a newly formed memory becomes more stable over time.',KZ:'Жаңа жад ізінің уақыт өте тұрақты болуына ықпал ететін үдерістер.'}},
  ],
  24: [
    {term:{RU:'Супрахиазматическое ядро',EN:'Suprachiasmatic nucleus',KZ:'Супрахиазмалық ядро'},definition:{RU:'Главный циркадный синхронизатор в гипоталамусе, получающий информацию о свете от сетчатки.',EN:'The main hypothalamic circadian pacemaker receiving light information from the retina.',KZ:'Торқабықтан жарық туралы ақпарат алатын гипоталамустың негізгі циркадтық синхронизаторы.'}},
    {term:{RU:'NREM-сон',EN:'NREM sleep',KZ:'NREM ұйқысы'},definition:{RU:'Стадии сна без быстрых движений глаз, различающиеся по глубине и ЭЭГ-картине.',EN:'Sleep stages without rapid eye movements, differing in depth and EEG pattern.',KZ:'Тереңдігі мен ЭЭГ көрінісі бойынша ерекшеленетін жылдам көз қозғалысынсыз ұйқы сатылары.'}},
    {term:{RU:'REM-сон',EN:'REM sleep',KZ:'REM ұйқысы'},definition:{RU:'Состояние сна с быстрыми движениями глаз, активированным ЭЭГ-паттерном и выраженным снижением мышечного тонуса.',EN:'A sleep state with rapid eye movements, activated EEG pattern, and marked reduction of muscle tone.',KZ:'Жылдам көз қозғалысы, белсенді ЭЭГ көрінісі және бұлшықет тонусының айқын төмендеуі бар ұйқы күйі.'}},
  ],
  25: [
    {term:{RU:'Ауторегуляция мозгового кровотока',EN:'Cerebral autoregulation',KZ:'Ми қанайналымының аутореттелуі'},definition:{RU:'Способность мозговых сосудов изменять сопротивление и поддерживать кровоток при изменениях перфузионных условий в определённых пределах.',EN:'The ability of cerebral vessels to adjust resistance and stabilize flow across a range of perfusion conditions.',KZ:'Ми тамырларының кедергіні өзгертіп, белгілі аралықта перфузия жағдайлары өзгергенде қан ағымын тұрақтандыру қабілеті.'}},
    {term:{RU:'Внутричерепное давление',EN:'Intracranial pressure',KZ:'Бассүйекішілік қысым'},definition:{RU:'Давление внутри жёсткой полости черепа, зависящее от объёмов мозговой ткани, крови и ликвора.',EN:'Pressure within the rigid cranial cavity, influenced by brain tissue, blood, and CSF volumes.',KZ:'Бассүйек қуысының ішіндегі, ми тіні, қан және ликвор көлемдеріне тәуелді қысым.'}},
    {term:{RU:'Компенсация',EN:'Compensation',KZ:'Компенсация'},definition:{RU:'Использование сохранных стратегий или сетей для поддержания функции без полного восстановления исходного механизма.',EN:'Use of preserved strategies or networks to maintain function without full restoration of the original mechanism.',KZ:'Бастапқы механизм толық қалпына келмей-ақ қызметті сақтау үшін сақталған стратегиялар немесе желілерді пайдалану.'}},
  ],
};

function firstSentence(value:string){
  const m=value.trim().match(/^.*?[.!?](?:\s|$)/u);
  return (m?.[0]??value).trim();
}

const copy = {
  RU: {
    mechanism: 'Как это работает',
    interpretation: 'Что означает результат',

    goals:
      'После изучения вы сможете простыми словами объяснить тему и ответить на вопрос:',

    outcomes: 'Проверьте, поняли ли вы главное',
    terms: 'Ключевые термины',
    summary: 'Главное по теме',

    task: 'Попробуйте самостоятельно',
    question: 'Объясните простыми словами',

    response: 'Ваш ответ',
    criteria: 'Проверьте себя',

    checklist: [
      'Я написал(а), что изменилось.',
      'Я объяснил(а), почему это произошло.',
      'Я указал(а), к какому результату это привело и чего по этим данным утверждать нельзя.',
    ],

    practiceIntro:
      'Сначала ответьте своими словами. Затем откройте объяснение и сравните: что совпало, а что стоит исправить.',

    questionsIntro:
      'Сначала ответьте сами, затем откройте объяснение. Не нужно повторять текст дословно — важно правильно передать смысл.',

    referenceIntro:
      'Рекомендуемые источники для уточнения физиологических механизмов и самостоятельного чтения.',

    materials: 'Учебные материалы',

    sourceDescription:
      'Дополнительное чтение по теме из учебников, университетских библиотек и открытых академических ресурсов.',
  },

  EN: {
    mechanism: 'How it works',
    interpretation: 'What the result means',

    goals:
      'After this module, explain the topic in simple words and answer:',

    outcomes: 'Check that you understood the key idea',
    terms: 'Key terms',
    summary: 'The key idea',

    task: 'Try it yourself',
    question: 'Explain it in simple words',

    response: 'Your answer',
    criteria: 'Check your answer',

    checklist: [
      'I stated what changed.',
      'I explained why it changed.',
      'I stated the result and what cannot be concluded from these data.',
    ],

    practiceIntro:
      'Answer in your own words first. Then open the explanation and compare what you got right and what needs correction.',

    questionsIntro:
      'Answer first, then open the explanation. You do not need the exact wording; the meaning is what matters.',

    referenceIntro:
      'Recommended sources for clarifying physiological mechanisms and further reading.',

    materials: 'Learning materials',

    sourceDescription:
      'Further reading from textbooks, university libraries, and open academic resources.',
  },

  KZ: {
    mechanism: 'Бұл қалай жұмыс істейді',
    interpretation: 'Нәтиже нені білдіреді',

    goals:
      'Тақырыптан кейін негізгі механизмді қарапайым сөзбен түсіндіріп, сұраққа жауап бере аласыз:',

    outcomes: 'Негізгі ойды түсіндіңіз бе — тексеріңіз',
    terms: 'Негізгі терминдер',
    summary: 'Тақырыптың ең маңыздысы',

    task: 'Өзіңіз орындап көріңіз',
    question: 'Қарапайым сөзбен түсіндіріңіз',

    response: 'Сіздің жауабыңыз',
    criteria: 'Өзіңізді тексеріңіз',

    checklist: [
      'Мен не өзгергенін жаздым.',
      'Мен оның неліктен өзгергенін түсіндірдім.',
      'Мен нәтижені және бұл деректерден нені айтуға болмайтынын көрсеттім.',
    ],

    practiceIntro:
      'Алдымен өз сөзіңізбен жауап беріңіз. Кейін түсіндірмені ашып, не дұрыс болғанын және нені түзету керегін салыстырыңыз.',

    questionsIntro:
      'Алдымен өзіңіз жауап беріңіз, кейін түсіндірмені ашыңыз. Сөзбе-сөз сәйкестік емес, мағына маңызды.',

    referenceIntro:
      'Физиологиялық тетіктерді нақтылауға және қосымша оқуға ұсынылатын дереккөздер.',

    materials: 'Оқу материалдары',

    sourceDescription:
      'Оқулықтардан, университет кітапханаларынан және ашық академиялық ресурстардан қосымша оқу.',
  },
};

function create(
  topic: Topic,
  section: typeof foundationSections[number],
  language: Language,
): SectionLesson {
  const c = copy[language];

  const title = getSectionTitle(section, language);

  const moduleTitle =
    `${topic.id}. ${modules[language][topic.id - 1]}`;

  const mechanism = topic.mechanism[language];

  const interpretation = topic.interpretation[language];

  const question = topic.question[language];

  const links = [
    { section: 'theory' as const },
    { section: 'practice' as const },
  ];

  if (section === 'theory') {
    return {
      kind: 'theory',
      title: moduleTitle,

      sections: [
        {
          id: 'quick-summary',
          title: language === 'RU' ? 'Коротко о главном' : language === 'EN' ? 'The key idea first' : 'Алдымен ең маңыздысы',
          blocks: [
            { type: 'list' as const, items: [firstSentence(mechanism), firstSentence(interpretation)] },
            { type: 'callout' as const,
              title: language === 'RU' ? 'Как читать дальше' : language === 'EN' ? 'How to continue' : 'Әрі қарай қалай оқу керек',
              text: language === 'RU'
                ? 'Теперь разберите полный механизм ниже. Не учите формулировку дословно — проследите, что меняется, почему и к чему это приводит.'
                : language === 'EN'
                  ? 'Now work through the full mechanism below. Do not memorize the wording; follow what changes, why it changes, and what result follows.'
                  : 'Енді төмендегі толық механизмді қараңыз. Сөйлемді жаттамаңыз: не өзгереді, неліктен өзгереді және қандай нәтижеге әкелетінін бақылаңыз.' },
          ],
        },
        {
          id: 'mechanism',
          title: c.mechanism,
          blocks: [
            {
              type: 'paragraph',
              text: mechanism,
            },
          ],
        },

        {
          id: 'interpretation',
          title: c.interpretation,
          blocks: [
            {
              type: 'paragraph',
              text: interpretation,
            },
          ],
        },
        ...(topic.id === 3 ? [{
          id: 'brain-microenvironment',
          title: language === 'RU' ? 'Микросреда мозга: ГЭБ и ликвор' : language === 'EN' ? 'Brain microenvironment: BBB and CSF' : 'Ми микроортасы: ГЭБ және ликвор',
          blocks: [{ type: 'paragraph' as const, text: language === 'RU'
            ? 'Гематоэнцефалический барьер помогает сохранять стабильную химическую среду нервной ткани, ограничивая переход многих веществ из крови. Ликвор образуется преимущественно сосудистыми сплетениями, циркулирует по желудочкам и субарахноидальному пространству и участвует в механической защите и поддержании среды мозга. Глия, сосуды, внеклеточная жидкость и нейроны работают как единая система.'
            : language === 'EN'
              ? 'The blood–brain barrier helps maintain a stable chemical environment for neural tissue by limiting entry of many substances from blood. Cerebrospinal fluid is produced mainly by the choroid plexuses, circulates through ventricles and the subarachnoid space, and contributes to mechanical protection and brain homeostasis. Glia, vessels, extracellular fluid, and neurons function as one system.'
              : 'Гематоэнцефалдық бөгет көптеген заттардың қаннан өтуін шектеп, жүйке тінінің химиялық ортасының тұрақтылығын сақтауға көмектеседі. Ликвор негізінен тамыр өрімдерінде түзіліп, қарыншалар мен субарахноидтық кеңістікте айналады және миды механикалық қорғауға әрі тұрақты ортаға қатысады. Глия, тамырлар, жасушааралық сұйықтық және нейрондар бір жүйе ретінде жұмыс істейді.' }],
        }] : []),
        ...(topic.id === 5 ? [{
          id: 'neuromuscular-junction',
          title: language === 'RU' ? 'Нервно-мышечная передача' : language === 'EN' ? 'Neuromuscular transmission' : 'Жүйке-бұлшықет берілуі',
          blocks: [{ type: 'paragraph' as const, text: language === 'RU'
            ? 'В нервно-мышечном синапсе потенциал действия мотонейрона открывает пресинаптические Ca²⁺-каналы, что запускает выделение ацетилхолина. Ацетилхолин активирует никотиновые рецепторы концевой пластинки, создаёт деполяризацию и при достаточной величине запускает потенциал действия мышечного волокна. Ацетилхолинэстераза завершает сигнал.'
            : language === 'EN'
              ? 'At the neuromuscular junction, a motor-neuron action potential opens presynaptic Ca²⁺ channels and triggers acetylcholine release. Acetylcholine activates nicotinic end-plate receptors, producing depolarization that can trigger a muscle action potential. Acetylcholinesterase terminates the signal.'
              : 'Жүйке-бұлшықет синапсында мотонейрон әрекет потенциалы пресинапстық Ca²⁺ арналарының ашылуын және ацетилхолин бөлінуін туғызады. Ацетилхолин соңғы пластинканың никотиндік рецепторларын белсендіріп, бұлшықет әрекет потенциалын іске қосатын деполяризация жасайды. Ацетилхолинэстераза сигналды аяқтайды.' }],
        }] : []),
        ...(topic.id === 7 ? [{
          id: 'conditioned-reflexes',
          title: language === 'RU' ? 'Безусловные и условные рефлексы' : language === 'EN' ? 'Unconditioned and conditioned reflexes' : 'Шартсыз және шартты рефлекстер',
          blocks: [{ type: 'paragraph' as const, text: language === 'RU'
            ? 'Безусловный рефлекс — врождённая реакция, для которой не требуется предварительное обучение. Условный рефлекс формируется, когда ранее нейтральный сигнал приобретает предсказательное значение после сочетаний с биологически значимым стимулом. Условная реакция может ослабевать при угасании, различаться при дифференцировке, временно подавляться новым сильным стимулом и смещаться по времени при запаздывательном торможении.'
            : language === 'EN'
              ? 'An unconditioned reflex is an innate response that does not require prior learning. A conditioned reflex develops when a previously neutral cue gains predictive value after pairing with a biologically meaningful stimulus. The conditioned response can weaken during extinction, become selective through discrimination, be temporarily suppressed by a novel strong stimulus, and shift in time with delay conditioning.'
              : 'Шартсыз рефлекс — алдын ала үйренуді қажет етпейтін туа біткен жауап. Шартты рефлекс бұрын бейтарап болған сигнал биологиялық маңызды стимулмен жұптасқаннан кейін болжаушы мәнге ие болғанда қалыптасады. Шартты реакция өшу кезінде әлсірейді, ажырату арқылы нақтыланады, жаңа күшті стимулмен уақытша тежелуі және кешігу жағдайында уақыт бойынша ығысуы мүмкін.' }],
        }] : []),
        ...(topic.id === 10 ? [{
          id: 'cranial-nerves',
          title: language === 'RU' ? 'Черепные нервы и ядра ствола' : language === 'EN' ? 'Cranial nerves and brainstem nuclei' : 'Бассүйек нервтері және ми бағаны ядролары',
          blocks: [{ type: 'paragraph' as const, text: language === 'RU'
            ? 'Черепные нервы несут разные функциональные компоненты: соматические и висцеральные, чувствительные и двигательные, а также специальные сенсорные волокна. Их ядра распределены по среднему мозгу, мосту и продолговатому мозгу. Поражение нерва, ядра или соседнего проводящего пути может давать разные сочетания симптомов, поэтому функцию нужно связывать с анатомией.'
            : language === 'EN'
              ? 'Cranial nerves carry different functional components: somatic and visceral, sensory and motor, as well as special sensory fibers. Their nuclei are distributed through the midbrain, pons, and medulla. Damage to a nerve, its nucleus, or a neighboring tract can produce different combinations of deficits, so function must be linked to anatomy.'
              : 'Бассүйек нервтері соматикалық және висцералдық, сезімтал және қозғалтқыш, сондай-ақ арнайы сезімтал талшықтарды өткізеді. Олардың ядролары ортаңғы ми, көпір және сопақша мида орналасқан. Нерв, оның ядросы немесе көрші өткізгіш жол зақымданса, әртүрлі белгілер қосарлануы мүмкін, сондықтан қызметті анатомиямен байланыстыру қажет.' }],
        }] : []),
        ...(topic.id === 18 ? [{
          id: 'language-centers',
          title: language === 'RU' ? 'Речь: Брока, Вернике и сеть языка' : language === 'EN' ? 'Language: Broca, Wernicke, and the language network' : 'Сөйлеу: Брока, Вернике және тіл желісі',
          blocks: [{ type: 'paragraph' as const, text: language === 'RU'
            ? 'Зона Брока в доминантной лобной доле особенно важна для моторного программирования речи, а задние височно-теменные языковые области, традиционно связываемые с зоной Вернике, — для понимания и смысловой обработки. Современная модель рассматривает речь как работу распределённой сети, а не двух изолированных центров.'
            : language === 'EN'
              ? 'Broca region in the dominant frontal lobe is especially important for motor programming of speech, while posterior temporoparietal language regions traditionally linked with Wernicke area contribute to comprehension and semantic processing. Modern models treat language as a distributed network rather than two isolated centers.'
              : 'Доминантты маңдай бөлігіндегі Брока аймағы сөйлеудің моторлық бағдарламасына маңызды, ал Вернике аймағымен дәстүрлі байланыстырылатын артқы самай-төбе тіл аймақтары түсіну мен мағыналық өңдеуге қатысады. Қазіргі модель тілді екі оқшауланған орталық емес, таралған желі жұмысы ретінде қарастырады.' }],
        }] : []),
        ...(topic.id === 23 ? [{
          id: 'memory-emotion-learning',
          title: language === 'RU' ? 'Память, эмоции и условное обучение' : language === 'EN' ? 'Memory, emotion, and conditioned learning' : 'Жад, эмоция және шартты үйрену',
          blocks: [{ type: 'paragraph' as const, text: language === 'RU'
            ? 'Гиппокамп особенно важен для формирования новых декларативных воспоминаний и контекстной памяти; миндалина участвует в эмоциональной значимости и эмоциональном обучении; префронтальная кора поддерживает рабочую память, планирование и контроль поведения. Эти системы взаимодействуют при обучении, а условные связи зависят от подкрепления, контекста и предыдущего опыта.'
            : language === 'EN'
              ? 'The hippocampus is especially important for forming new declarative memories and contextual memory; the amygdala contributes to emotional salience and emotional learning; the prefrontal cortex supports working memory, planning, and behavioral control. These systems interact during learning, while conditioned associations depend on reinforcement, context, and prior experience.'
              : 'Гиппокамп жаңа декларативті естеліктер мен контекстік жадты қалыптастыруға маңызды; амигдала эмоциялық маңыз бен эмоциялық үйренуге қатысады; префронталдық қыртыс жұмыс жады, жоспарлау және мінез-құлықты бақылауды қолдайды. Бұл жүйелер үйрену кезінде өзара әрекеттеседі, ал шартты байланыстар нығайтуға, контекстке және бұрынғы тәжірибеге тәуелді.' }],
        }] : []),
        ...(topic.id === 25 ? [{
          id: 'cerebral-homeostasis',
          title: language === 'RU' ? 'Мозговой кровоток, ликвор и метаболизм' : language === 'EN' ? 'Cerebral blood flow, CSF, and metabolism' : 'Ми қанайналымы, ликвор және метаболизм',
          blocks: [{ type: 'paragraph' as const, text: language === 'RU'
            ? 'Мозг требует непрерывного кровотока для доставки кислорода и глюкозы. Перфузия зависит от системного давления, внутричерепного давления, сосудистого сопротивления и ауторегуляции. Ликвор и гематоэнцефалический барьер участвуют в поддержании стабильной среды. Нарушение кровотока, барьерной функции или баланса объёма внутри черепа может нарушать работу нейронных сетей даже без первичной гибели нейронов.'
            : language === 'EN'
              ? 'The brain requires continuous blood flow to deliver oxygen and glucose. Perfusion depends on systemic pressure, intracranial pressure, vascular resistance, and autoregulation. CSF and the blood–brain barrier help maintain a stable environment. Disturbance of blood flow, barrier function, or intracranial volume balance can impair neural networks even without primary neuronal death.'
              : 'Миға оттегі мен глюкоза жеткізу үшін үздіксіз қанайналым қажет. Перфузия жүйелік қысымға, бассүйекішілік қысымға, тамыр кедергісіне және аутореттелуге тәуелді. Ликвор мен гематоэнцефалдық бөгет тұрақты ортаны сақтауға қатысады. Қанайналым, бөгет қызметі немесе бассүйек ішіндегі көлем теңгерімі бұзылса, нейрондардың бастапқы өлімінсіз де жүйке желілері бұзылуы мүмкін.' }],
        }] : []),
        ...(topic.id === 2 ? [{
          id: 'method-selection',
          title: language === 'RU' ? 'Как выбирать метод исследования' : language === 'EN' ? 'How to choose a research method' : 'Зерттеу әдісін қалай таңдау керек',
          blocks: [
            { type: 'paragraph' as const, text: language === 'RU'
              ? 'Начинайте не с названия прибора, а с физиологического вопроса. Если важна динамика электрической активности во времени, ЭЭГ даёт высокое временное разрешение, но ограниченную пространственную локализацию. Вызванные потенциалы позволяют связать компонент ответа с повторяемым сенсорным событием. Структурная визуализация отвечает прежде всего на анатомический вопрос и сама по себе не показывает электрическую активность нейронной сети.'
              : language === 'EN'
                ? 'Start with the physiological question, not the instrument name. EEG offers high temporal resolution for electrical dynamics but limited spatial localization. Evoked potentials relate response components to repeated sensory events. Structural imaging primarily answers anatomical questions and does not itself measure electrical activity of a neural network.'
                : 'Алдымен құрал атауынан емес, физиологиялық сұрақтан бастаңыз. ЭЭГ электрлік белсенділіктің уақыттық динамикасын жоғары уақыттық ажыратымдылықпен көрсетеді, бірақ кеңістіктік локализациясы шектеулі. Шақырылған потенциалдар жауап компонентін қайталанатын сенсорлық оқиғамен байланыстырады. Құрылымдық бейнелеу негізінен анатомиялық сұраққа жауап береді және нейрондық желінің электр белсенділігін тікелей өлшемейді.' },
          ],
        }, {
          id: 'eeg-interpretation',
          title: language === 'RU' ? 'ЭЭГ: сигнал, ритм и артефакт' : language === 'EN' ? 'EEG: signal, rhythm and artifact' : 'ЭЭГ: сигнал, ырғақ және артефакт',
          blocks: [
            { type: 'paragraph' as const, text: language === 'RU'
              ? 'Скальповая ЭЭГ отражает суммарные потенциалы больших популяций нейронов, особенно синхронную постсинаптическую активность корковых источников. Амплитуда и частотный состав зависят от состояния, регистрации и монтажа. Движения глаз, мышечная активность и плохой контакт электродов могут создавать сигналы, не происходящие из изучаемого мозгового процесса.'
              : language === 'EN'
                ? 'Scalp EEG reflects summed activity from large neuronal populations, especially synchronized postsynaptic activity of cortical sources. Amplitude and frequency content depend on state, recording conditions and montage. Eye movements, muscle activity and poor electrode contact can generate signals unrelated to the brain process under study.'
                : 'Бас терісінен тіркелетін ЭЭГ үлкен нейрон популяцияларының жиынтық белсенділігін, әсіресе қыртыстық көздердің синхронды постсинапстық белсенділігін көрсетеді. Амплитуда мен жиілік құрамы күйге, тіркеу жағдайына және монтажға тәуелді. Көз қозғалысы, бұлшықет белсенділігі және электродтың нашар жанасуы зерттелетін ми үдерісіне қатысы жоқ сигналдар тудыруы мүмкін.' },
          ],
        }, {
          id: 'limits-of-inference',
          title: language === 'RU' ? 'Границы физиологического вывода' : language === 'EN' ? 'Limits of physiological inference' : 'Физиологиялық қорытындының шектері',
          blocks: [
            { type: 'paragraph' as const, text: language === 'RU'
              ? 'Наблюдаемое изменение сигнала сначала описывают, затем интерпретируют. Корреляция между ритмом и состоянием не доказывает, что этот ритм является единственной причиной состояния. Сравнение методов требует различать, что измерено непосредственно, что вычислено и что только предполагается на основании модели.'
              : language === 'EN'
                ? 'Describe an observed signal change before interpreting it. A correlation between a rhythm and a state does not show that the rhythm is the sole cause of that state. Method comparison requires separating what is directly measured, what is derived, and what is inferred from a model.'
                : 'Алдымен байқалған сигнал өзгерісін сипаттап, содан кейін түсіндіру керек. Ырғақ пен күй арасындағы корреляция сол ырғақ күйдің жалғыз себебі екенін дәлелдемейді. Әдістерді салыстырғанда тікелей өлшенген, есептелген және модель негізінде болжанған шамаларды ажырату қажет.' },
          ],
        }] : []),
      ],

      outcomes: {
        title: c.outcomes,
        introduction: c.goals,
        items: [question],
      },

      terms: {
        title: c.terms,
        items: topic.terms.map((term) => term[language]),
      },
    };
  }

  if (section === 'objectives') {
    const action = language === 'RU'
      ? ['проследить причинную цепь', 'предсказать направление изменения', 'применить механизм к данным', 'отделить вывод от предположения']
      : language === 'EN'
        ? ['trace the causal chain', 'predict the direction of change', 'apply the mechanism to data', 'separate conclusion from assumption']
        : ['себептік тізбекті қадағалау', 'өзгеріс бағытын болжау', 'тетікті деректерге қолдану', 'қорытындыны болжамнан ажырату'];
    const prompts = language === 'RU'
      ? ['После теории восстановите механизм без подсказки.', 'Измените одно звено и заранее предскажите результат.', 'Используйте механизм при разборе практического или клинического наблюдения.', 'Укажите, какие данные подтверждают вывод и каких данных ещё не хватает.']
      : language === 'EN'
        ? ['After theory, reconstruct the mechanism without a prompt.', 'Change one link and predict the outcome before checking it.', 'Use the mechanism to interpret a practical or clinical observation.', 'State which data support the conclusion and which evidence is still missing.']
        : ['Теориядан кейін тетікті көмексіз қалпына келтіріңіз.', 'Бір буынды өзгертіп, нәтижені алдын ала болжаңыз.', 'Тетікті практикалық немесе клиникалық бақылауды талдауға қолданыңыз.', 'Қандай дерек қорытындыны қолдайтынын және қандай дәлел әлі жетіспейтінін көрсетіңіз.'];
    return {
      kind: 'objectives', title, introduction: c.goals,
      cards: action.map((item,index)=>({id:`module-${topic.id}-objective-${index+1}`,title:`${index+1}. ${item}`,paragraphs:[prompts[index]],links:index<2?[{section:'theory' as const}]:[{section:'practice' as const},{section:'cases' as const}]})),
    };
  }

  if (section === 'pretest') {
    return {
      kind: 'pretest',
      title,
      introduction: c.goals,

      questions: [
        {
          id: `module-${topic.id}-pretest`,
          topic: moduleTitle,
          prompt: question,
          options: [
            { id: 'a', text: mechanism },
            { id: 'b', text: interpretation },
            { id: 'c', text: language === 'RU' ? 'Наблюдаемое изменение всегда имеет только одну возможную физиологическую причину.' : language === 'EN' ? 'An observed change always has only one possible physiological cause.' : 'Бақыланатын өзгерістің әрқашан тек бір ғана физиологиялық себебі болады.' },
          ],
          correctAnswer: 'a',
          explanation: language === 'RU' ? 'Сопоставьте свой ответ с определением ключевого физиологического отношения: укажите переменную, направление её изменения и наблюдаемый результат.' : language === 'EN' ? 'Compare your answer with the key physiological relationship: identify the variable, direction of change, and observable result.' : 'Жауабыңызды негізгі физиологиялық байланыспен салыстырыңыз: айнымалыны, оның өзгеру бағытын және байқалатын нәтижені көрсетіңіз.',
          target: { section: 'theory' },
        },
        {
          id: `module-${topic.id}-pretest-transfer`,
          topic: moduleTitle,
          prompt: language === 'RU' ? `Какой следующий шаг лучше всего проверит понимание темы «${modules.RU[topic.id - 1]}»?` : language === 'EN' ? `Which next step best checks understanding of “${modules.EN[topic.id - 1]}”?` : `«${modules.KZ[topic.id - 1]}» тақырыбын түсінуді қай келесі қадам жақсы тексереді?`,
          options: [
            { id: 'a', text: language === 'RU' ? 'Предсказать результат изменения одного звена и обосновать его причинной цепью.' : language === 'EN' ? 'Predict the result of changing one link and justify it with a causal chain.' : 'Бір буын өзгергендегі нәтижені болжап, оны себептік тізбекпен негіздеу.' },
            { id: 'b', text: language === 'RU' ? 'Повторить название темы без объяснения механизма.' : language === 'EN' ? 'Repeat the topic title without explaining the mechanism.' : 'Тетікті түсіндірмей тақырып атауын қайталау.' },
            { id: 'c', text: language === 'RU' ? 'Сделать вывод только по одному термину.' : language === 'EN' ? 'Draw a conclusion from one term alone.' : 'Бір ғана терминге сүйеніп қорытынды жасау.' },
          ],
          correctAnswer: 'a',
          explanation: language === 'RU' ? 'Диагностический вопрос должен проверять способ рассуждения, а не заранее показывать формулировку практического задания.' : language === 'EN' ? 'A diagnostic question should test the reasoning process rather than reveal the wording of the later practice task.' : 'Диагностикалық сұрақ кейінгі практикалық тапсырманың мәтінін алдын ала көрсетпей, ойлау тәсілін тексеруі керек.',
          target: { section: 'practice' },
        },
      ],
    };
  }

  if (section === 'one-minute') {
    return {
      kind: 'one-minute',
      title,
      introduction: language === 'RU' ? 'Не перечитывайте готовый ответ. За одну минуту восстановите причинную цепь своими словами.' : language === 'EN' ? 'Do not reread a prepared answer. Reconstruct the causal chain in your own words in one minute.' : 'Дайын жауапты қайта оқымаңыз. Бір минутта себептік тізбекті өз сөзіңізбен қалпына келтіріңіз.',
      cards: [
        {
          id: `module-${topic.id}-one-minute-core`,
          title: language === 'RU' ? '1. Причина → механизм → результат' : language === 'EN' ? '1. Cause → mechanism → outcome' : '1. Себеп → тетік → нәтиже',
          paragraphs: [language === 'RU' ? 'Назовите исходное изменение, два промежуточных звена и наблюдаемый результат.' : language === 'EN' ? 'State the initial change, two intermediate links, and the observable outcome.' : 'Бастапқы өзгерісті, екі аралық буынды және байқалатын нәтижені атаңыз.'],
          links: [{ section: 'theory' as const }],
        },
        {
          id: `module-${topic.id}-one-minute-interpret`,
          title: language === 'RU' ? '2. Измените одно звено' : language === 'EN' ? '2. Change one link' : '2. Бір буынды өзгертіңіз',
          paragraphs: [language === 'RU' ? 'Выберите одно звено цепи и предскажите, как изменится конечный результат.' : language === 'EN' ? 'Change one link in the chain and predict how the final outcome changes.' : 'Тізбектің бір буынын өзгертіп, соңғы нәтиженің қалай өзгеретінін болжаңыз.'],
          links: [{ section: 'practice' as const }],
        },
        {
          id: `module-${topic.id}-one-minute-check`,
          title: language === 'RU' ? '3. Граница вывода' : language === 'EN' ? '3. Limit of inference' : '3. Қорытынды шегі',
          paragraphs: [language === 'RU' ? 'Назовите один вывод, который нельзя сделать только по этому наблюдению.' : language === 'EN' ? 'State one conclusion that cannot be made from this observation alone.' : 'Осы бақылаудың өзінен ғана жасауға болмайтын бір қорытындыны атаңыз.'],
          links: [{ section: 'questions' as const }],
        },
      ],
    };
  }

  if (section === 'clinical') {
    const sourceVignette = clinicalVignettes[topic.id]?.[language];
    const vignette = sourceVignette ?? (
      language === 'RU'
        ? `Клиническое наблюдение по теме «${modules.RU[topic.id - 1]}»: изменился один измеряемый физиологический показатель. Определите вероятный уровень нарушения и назовите дополнительное измерение, которое отличит его от альтернативного объяснения.`
        : language === 'EN'
          ? `Clinical observation for “${modules.EN[topic.id - 1]}”: one measurable physiological variable has changed. Localize the likely level of disturbance and name an additional measurement that would distinguish it from an alternative explanation.`
          : `«${modules.KZ[topic.id - 1]}» тақырыбы бойынша клиникалық бақылау: бір өлшенетін физиологиялық көрсеткіш өзгерді. Бұзылыстың ықтимал деңгейін анықтап, оны балама түсіндірмеден ажырататын қосымша өлшемді атаңыз.`
    );
    const labels = language === 'RU'
      ? { bridge: 'Клинический мост: примените физиологию к данным', caseTitle: 'Клиническая ситуация', localize: '1. Локализуйте нарушение', mechanismTitle: '2. Постройте причинную цепь', discriminate: '3. Проверьте альтернативу', safety: '4. Сформулируйте границу вывода' }
      : language === 'EN'
        ? { bridge: 'Clinical bridge: apply physiology to the data', caseTitle: 'Clinical situation', localize: '1. Localize the disturbance', mechanismTitle: '2. Build the causal chain', discriminate: '3. Test an alternative', safety: '4. State the limit of inference' }
        : { bridge: 'Клиникалық көпір: физиологияны деректерге қолданыңыз', caseTitle: 'Клиникалық жағдай', localize: '1. Бұзылысты локализациялаңыз', mechanismTitle: '2. Себептік тізбек құрыңыз', discriminate: '3. Балама түсіндірмені тексеріңіз', safety: '4. Қорытынды шегін көрсетіңіз' };
    return {
      kind: 'clinical',
      title,
      introduction: labels.bridge,
      cards: [
        {
          id: `module-${topic.id}-clinical-case`,
          title: labels.caseTitle,
          paragraphs: [vignette],
          links: [{ section: 'cases' as const }],
        },
        {
          id: `module-${topic.id}-clinical-localize`,
          title: labels.localize,
          paragraphs: [language === 'RU'
            ? 'По данным ситуации определите наиболее вероятное звено или уровень нарушения. Укажите признак, который поддерживает локализацию.'
            : language === 'EN'
              ? 'Use the case data to identify the most likely disturbed link or level. State the finding that supports your localization.'
              : 'Жағдай деректері бойынша бұзылған ең ықтимал буынды немесе деңгейді анықтаңыз. Локализацияны қолдайтын белгіні көрсетіңіз.'],
          links: [{ section: 'theory' as const }, { section: 'cases' as const }],
        },
        {
          id: `module-${topic.id}-clinical-causal`,
          title: labels.mechanismTitle,
          paragraphs: [language === 'RU'
            ? 'Свяжите изменение с наблюдаемым проявлением минимум через два физиологических звена. Не используйте название диагноза вместо механизма.'
            : language === 'EN'
              ? 'Connect the disturbance to the observed finding through at least two physiological links. Do not substitute a diagnosis name for the mechanism.'
              : 'Өзгерісті байқалған белгімен кемінде екі физиологиялық буын арқылы байланыстырыңыз. Тетіктің орнына диагноз атауын қолданбаңыз.'],
          links: [{ section: 'theory' as const }, { section: 'practice' as const }],
        },
        {
          id: `module-${topic.id}-clinical-discriminate`,
          title: labels.discriminate,
          paragraphs: [language === 'RU'
            ? 'Предложите одно альтернативное объяснение и одно дополнительное наблюдение или исследование, которое поможет различить две гипотезы.'
            : language === 'EN'
              ? 'Propose one alternative explanation and one additional observation or test that would distinguish the two hypotheses.'
              : 'Бір балама түсіндірме және екі болжамды ажырататын бір қосымша бақылау немесе зерттеу ұсыныңыз.'],
          links: [{ section: 'practice' as const }, { section: 'cases' as const }],
        },
        {
          id: `module-${topic.id}-clinical-limit`,
          title: labels.safety,
          paragraphs: [language === 'RU'
            ? 'Сформулируйте, что можно заключить из имеющихся данных и чего они пока не доказывают.'
            : language === 'EN'
              ? 'State what can be concluded from the available data and what they do not yet prove.'
              : 'Қолда бар деректерден қандай қорытынды жасауға болатынын және олардың нені әлі дәлелдемейтінін көрсетіңіз.'],
          links: [{ section: 'cases' as const }, { section: 'tests' as const }],
        },
      ],
    };
  }

  if (section === 'glossary') {
    return {
      kind: 'glossary',
      title,
      introduction: c.terms,

      terms: [
        ...topic.terms.map((term, index) => ({
          id: `module-${topic.id}-term-${index + 1}`,
          term: term[language],
          definition:
            termDefinitions[topic.id]?.[index]?.[language] ??
            (language === 'RU'
              ? `Ключевое понятие модуля «${modules.RU[topic.id - 1]}».`
              : language === 'EN'
                ? `A key concept in “${modules.EN[topic.id - 1]}”.`
                : `«${modules.KZ[topic.id - 1]}» модулінің негізгі ұғымы.`),
          target: { section: 'theory' as const },
        })),
        ...(extraGlossary[topic.id] ?? []).map((item, index) => ({
          id: `module-${topic.id}-extra-term-${index + 1}`,
          term: item.term[language],
          definition: item.definition[language],
          target: { section: 'theory' as const },
        })),
      ],
    };
  }

  if (section === 'cases') {
    return createFoundationCase(
      topic,
      language,
      moduleTitle,
    );
  }

  if (section === 'tests') {
    return createFoundationTest(
      topic,
      language,
      moduleTitle,
    );
  }

  if (section === 'practice') {
    const ui: PracticeLesson['ui'] = {
      showAnswer:
        language === 'RU'
          ? 'Показать объяснение'
          : language === 'EN'
            ? 'Show explanation'
            : 'Түсіндірмені көрсету',

      check: '',
      reset: '',
      undo: '',
      correct: '',
      incorrect: '',
      incomplete: '',
      available: '',
      selected: '',
      empty: '',

      input: c.response,

      theory: getSectionTitle(
        'theory',
        language,
      ),

      localNote:
        language === 'RU'
          ? 'Отметки о выполнении сохраняются в этом браузере. Текст ответа может сброситься после перезагрузки, поэтому важный разбор сохраните в заметке к странице.'
          : language === 'EN'
            ? 'Task completion is saved in this browser. Response text may reset after reload, so save important analysis in the page note.'
            : 'Тапсырманың орындалу белгілері осы браузерде сақталады. Жауап мәтіні бет жаңартылғанда өшуі мүмкін, сондықтан маңызды талдауды бет жазбасына сақтаңыз.',
    };

    return {
      kind: 'practice',
      title,
      moduleTitle,
      ui,

      sections: [
        {
          title: c.task,

          blocks: [
            {
              type: 'paragraph',
              text: c.practiceIntro,
            },
            {
              type: 'paragraph',
              text: topic.task[language],
            },
            {
              type: 'response',
              label: c.response,
            },
          ],
        },

        {
          title: language === 'RU' ? 'Самостоятельное объяснение механизма' : language === 'EN' ? 'Independent mechanism explanation' : 'Тетікті өздігінен түсіндіру',

          blocks: [
            {
              type: 'paragraph',
              text: question,
            },
            {
              type: 'response',
              label: c.response,
            },
            {
              type: 'answer',
              items: [
                language === 'RU'
                  ? 'Сверьте прежде всего направление причинной цепи: что изменилось первым, какое звено передало эффект и какой результат должен наблюдаться.'
                  : language === 'EN'
                    ? 'Check the direction of the causal chain first: what changed initially, which link transmitted the effect, and which result should be observed.'
                    : 'Алдымен себептік тізбектің бағытын тексеріңіз: бастапқыда не өзгерді, әсерді қай буын жеткізді және қандай нәтиже байқалуы тиіс.',
                language === 'RU'
                  ? 'Если ваш вывод опирается только на один признак, назовите альтернативное объяснение и дополнительное измерение для его проверки.'
                  : language === 'EN'
                    ? 'If your conclusion rests on one finding, name an alternative explanation and an additional measurement that could test it.'
                    : 'Егер қорытындыңыз бір ғана белгіге сүйенсе, балама түсіндірмені және оны тексеретін қосымша өлшеуді атаңыз.',
              ],
            },
          ],
        },

        {
          title: language === 'RU' ? 'Физиологический эксперимент' : language === 'EN' ? 'Physiological experiment' : 'Физиологиялық эксперимент',
          blocks: [
            {
              type: 'paragraph',
              text: experimentFocus[topic.id]?.[language]
                ?? (language === 'RU'
                  ? `Поставьте мысленный эксперимент по теме «${modules.RU[topic.id - 1]}». Используйте «${topic.terms[0].RU}» как объект анализа, но изменяйте не сам термин, а конкретную измеряемую переменную из его физиологического механизма. Остальные условия зафиксируйте и заранее укажите ожидаемое направление эффекта.`
                  : language === 'EN'
                    ? `Design a thought experiment for “${modules.EN[topic.id - 1]}”. Use “${topic.terms[0].EN}” as the object of analysis, but manipulate a concrete measurable variable in its physiological mechanism rather than the term itself. Hold other conditions constant and state the expected direction of effect in advance.`
                    : `«${modules.KZ[topic.id - 1]}» тақырыбы бойынша ойша эксперимент құрыңыз. «${topic.terms[0].KZ}» ұғымын талдау нысаны ретінде қолданыңыз, бірақ терминнің өзін емес, оның физиологиялық тетігіндегі нақты өлшенетін айнымалыны өзгертіңіз. Басқа жағдайларды тұрақты ұстап, әсердің күтілетін бағытын алдын ала көрсетіңіз.`),
            },
            { type: 'response', label: language === 'RU' ? 'Что является входным воздействием или изменяемой переменной?' : language === 'EN' ? 'What is the input or manipulated variable?' : 'Кіріс әсері немесе өзгертілетін айнымалы қандай?' },
            { type: 'response', label: language === 'RU' ? 'Какой физиологический показатель изменится и в каком направлении?' : language === 'EN' ? 'Which physiological variable will change, and in what direction?' : 'Қай физиологиялық көрсеткіш және қай бағытта өзгереді?' },
            { type: 'response', label: language === 'RU' ? 'Объясните причинную цепь от воздействия к результату.' : language === 'EN' ? 'Explain the causal chain from intervention to outcome.' : 'Әсерден нәтижеге дейінгі себептік тізбекті түсіндіріңіз.' },
          ],
        },
        {
          title: language === 'RU' ? 'Разбор данных и границы вывода' : language === 'EN' ? 'Data interpretation and limits' : 'Деректерді талдау және қорытынды шектері',
          blocks: [
            { type: 'paragraph', text: language === 'RU'
              ? `Получены два наблюдения по теме «${modules.RU[topic.id - 1]}». Одно согласуется с ожидаемым изменением «${topic.terms[1].RU}», второе может иметь несколько причин. Определите, какое наблюдение сильнее поддерживает механизм и какое требует дополнительной проверки.`
              : language === 'EN'
                ? `Two observations are available for “${modules.EN[topic.id - 1]}”. One matches the expected change in “${topic.terms[1].EN}”; the other has several possible causes. Decide which observation supports the mechanism more strongly and which needs an additional test.`
                : `«${modules.KZ[topic.id - 1]}» тақырыбы бойынша екі бақылау берілді. Біреуі «${topic.terms[1].KZ}» күтілетін өзгерісіне сәйкес, екіншісінің бірнеше себебі болуы мүмкін. Қай бақылау тетікті күштірек қолдайтынын және қайсысы қосымша тексеруді қажет ететінін анықтаңыз.` },
            { type: 'response', label: language === 'RU' ? 'Какие наблюдаемые данные поддерживают ваш вывод?' : language === 'EN' ? 'Which observations support your conclusion?' : 'Қандай бақылаулар қорытындыңызды қолдайды?' },
            { type: 'response', label: language === 'RU' ? 'Какое альтернативное объяснение нужно исключить?' : language === 'EN' ? 'Which alternative explanation should be excluded?' : 'Қандай балама түсіндірмені жоққа шығару керек?' },
            { type: 'response', label: language === 'RU' ? 'Какое дополнительное измерение лучше всего различит эти объяснения?' : language === 'EN' ? 'Which additional measurement would best distinguish these explanations?' : 'Бұл түсіндірмелерді ажырату үшін қандай қосымша өлшеу тиімді?' },
          ],
        },
        {
          title: c.criteria,

          blocks: [
            {
              type: 'checklist',
              items: c.checklist,
            },
          ],
        },
      ],
    };
  }

  if (section === 'questions') {
    return {
      kind: 'questions',
      title,
      introduction: c.questionsIntro,

      questions: [
        {
          id: `module-${topic.id}-review-concept`,
          prompt: question,
          explanation: language === 'RU'
            ? 'Сначала ответьте без подсказки. Затем проверьте, указали ли вы исходную переменную, направление её изменения и наблюдаемый результат; готовую формулировку ищите в теории только после собственного ответа.'
            : language === 'EN'
              ? 'Answer without a prompt first. Then check whether you identified the starting variable, direction of change, and observable outcome; consult the theory wording only after producing your own answer.'
              : 'Алдымен көмексіз жауап беріңіз. Содан кейін бастапқы айнымалыны, өзгеріс бағытын және байқалатын нәтижені атағаныңызды тексеріңіз; дайын тұжырымды өз жауабыңыздан кейін ғана теориядан қараңыз.',
          target: { section: 'theory' },
        },
        {
          id: `module-${topic.id}-review-mechanism`,
          prompt: language === 'RU' ? 'Объясните по шагам: что происходит сначала, что затем и к какому результату это приводит?' : language === 'EN' ? 'Describe the causal mechanism step by step. How would changing the first link affect the result?' : 'Себептік тетікті қадамдап сипаттаңыз. Бірінші буын өзгерсе, нәтиже қалай өзгереді?',
          explanation: language === 'RU' ? 'Проверьте, есть ли в объяснении минимум три связанные ступени: исходное изменение → промежуточный механизм → физиологический результат.' : language === 'EN' ? 'Check that your explanation contains at least three linked steps: initial change → intermediate mechanism → physiological result.' : 'Түсіндірмеде кемінде үш байланысқан қадам барын тексеріңіз: бастапқы өзгеріс → аралық тетік → физиологиялық нәтиже.',
          target: { section: 'theory' },
        },
        {
          id: `module-${topic.id}-review-interpretation`,
          prompt: language === 'RU' ? 'Какой результат вы ожидаете увидеть? Что этот результат ещё не позволяет утверждать?' : language === 'EN' ? 'Which observable result is consistent with this mechanism, and what does that result not prove by itself?' : 'Қандай байқалатын нәтиже осы тетікке сәйкес келеді және ол өздігінен нені дәлелдемейді?',
          explanation: language === 'RU' ? 'Хороший ответ одновременно называет ожидаемое наблюдение и ограничение вывода: один результат редко исключает все альтернативные механизмы.' : language === 'EN' ? 'A strong answer states both the expected observation and the limit of inference: one result rarely excludes every alternative mechanism.' : 'Жақсы жауап күтілетін бақылауды да, қорытынды шегін де көрсетеді: бір нәтиже барлық балама тетіктерді сирек жоққа шығарады.',
          target: { section: 'practice' },
        },
        {
          id: `module-${topic.id}-review-transfer`,
          prompt: language === 'RU' ? 'Представьте похожую новую ситуацию. Что изменится и почему?' : language === 'EN' ? 'Transfer the mechanism to a new situation: make a prediction, then justify it causally.' : 'Тетікті жаңа жағдайға қолданыңыз: алдымен болжам жасаңыз, кейін оны себептік байланыспен негіздеңіз.',
          explanation: language === 'RU' ? 'Перенос считается обоснованным, если вы сохраняете причинный принцип, но заново определяете вход, изменяемое звено и прогноз для новой ситуации.' : language === 'EN' ? 'Transfer is justified when the causal principle is preserved while the input, altered link, and prediction are re-derived for the new situation.' : 'Тасымалдау негізді болуы үшін себептік қағида сақталып, жаңа жағдайдағы кіріс, өзгерген буын және болжам қайта анықталуы тиіс.',
          target: { section: 'cases' },
        },
        {
          id: `module-${topic.id}-review-justification`,
          prompt: language === 'RU' ? 'Что ещё вы бы проверили, чтобы увереннее сделать вывод?' : language === 'EN' ? 'What additional observation or comparison would strengthen your conclusion, and why?' : 'Қандай қосымша бақылау немесе салыстыру қорытындыңызды күшейтер еді және неге?',
          explanation: language === 'RU' ? 'Сильный вывод требует наблюдения, которое различает конкурирующие физиологические объяснения.' : language === 'EN' ? 'A strong conclusion requires an observation that discriminates between competing physiological explanations.' : 'Нақты қорытынды бәсекелес физиологиялық түсіндірмелерді ажырататын бақылауды қажет етеді.',
          target: { section: 'tests' },
        },
      ],
    };
  }

  if (section === 'media') {
    const names: Record<number, Record<Language,string>> = {
      2:{RU:'Сигнал или артефакт?',EN:'Signal or artifact?',KZ:'Сигнал ма, әлде артефакт па?'},
      3:{RU:'Нейрон, глия и микроокружение',EN:'Neuron, glia, and microenvironment',KZ:'Нейрон, глия және микроорта'},
      4:{RU:'От порога к потенциалу действия',EN:'From threshold to action potential',KZ:'Табалдырықтан әрекет потенциалына дейін'},
      5:{RU:'Передача через химический синапс',EN:'Transmission across a chemical synapse',KZ:'Химиялық синапс арқылы берілу'},
      6:{RU:'Баланс возбуждения и торможения',EN:'Excitation-inhibition balance',KZ:'Қозу мен тежелу тепе-теңдігі'},
      7:{RU:'От стимула к рефлекторному ответу',EN:'From stimulus to reflex response',KZ:'Стимулдан рефлекстік жауапқа дейін'},
      8:{RU:'Путь сигнала: проведение и перекрёст',EN:'Signal pathway: conduction and decussation',KZ:'Сигнал жолы: өткізу және айқасу'},
      9:{RU:'Сегментарный рефлекс и нисходящий контроль',EN:'Segmental reflex and descending control',KZ:'Сегменттік рефлекс және төмендеуші бақылау'},
      10:{RU:'Ствол мозга и поддержание бодрствования',EN:'Brainstem and maintenance of arousal',KZ:'Ми сабауы және сергектікті сақтау'},
      11:{RU:'Планирование → команда → движение → коррекция',EN:'Plan → command → movement → correction',KZ:'Жоспар → команда → қозғалыс → түзету'},
      12:{RU:'Базальные ганглии: выбор и запуск движения',EN:'Basal ganglia: movement selection and initiation',KZ:'Базальды ганглийлер: қозғалысты таңдау және бастау'},
      13:{RU:'Мозжечок: ошибка и коррекция движения',EN:'Cerebellum: movement error and correction',KZ:'Мишық: қозғалыс қатесі және түзету'},
      14:{RU:'Таламус: переключение и модуляция сигнала',EN:'Thalamus: signal relay and modulation',KZ:'Таламус: сигналды ауыстыру және модуляция'},
      15:{RU:'Гипоталамус: отклонение → компенсация → гомеостаз',EN:'Hypothalamus: deviation → compensation → homeostasis',KZ:'Гипоталамус: ауытқу → компенсация → гомеостаз'},
      16:{RU:'Лимбическая система: контекст → эмоция → мотивация',EN:'Limbic system: context → emotion → motivation',KZ:'Лимбиялық жүйе: контекст → эмоция → мотивация'},
      17:{RU:'Миндалина: сигнал → эмоциональное обучение',EN:'Amygdala: cue → emotional learning',KZ:'Амигдала: сигнал → эмоциялық үйрену'},
      18:{RU:'Кора: распределённая обработка информации',EN:'Cortex: distributed information processing',KZ:'Қыртыс: ақпаратты үлестірілген өңдеу'},
      19:{RU:'Соматосенсорная система: рецептор → путь → восприятие',EN:'Somatosensory system: receptor → pathway → perception',KZ:'Соматосенсорлық жүйе: рецептор → жол → қабылдау'},
      20:{RU:'Зрительная система: сетчатка → путь → поле зрения',EN:'Visual system: retina → pathway → visual field',KZ:'Көру жүйесі: торқабық → жол → көру өрісі'},
      21:{RU:'Слух и равновесие: стимул → рецептор → центральная обработка',EN:'Hearing and balance: stimulus → receptor → central processing',KZ:'Есту және тепе-теңдік: стимул → рецептор → орталық өңдеу'},
      22:{RU:'ВНС: ортостаз → компенсация → восстановление',EN:'ANS: orthostasis → compensation → recovery',KZ:'ВЖЖ: ортостаз → компенсация → қалпына келу'},
      23:{RU:'Обучение и память: кодирование → хранение → воспроизведение',EN:'Learning and memory: encoding → storage → retrieval',KZ:'Үйрену және жад: кодтау → сақтау → қайта жаңғырту'},
      24:{RU:'Сон и циркадный ритм: свет → часы → состояние',EN:'Sleep and circadian rhythm: light → clock → state',KZ:'Ұйқы және циркадтық ырғақ: жарық → сағат → күй'},
      25:{RU:'Нейропластичность: тренировка → изменение сети → перенос',EN:'Neuroplasticity: training → network change → transfer',KZ:'Нейропластика: жаттығу → желі өзгерісі → тасымалдау'},
    };
    const mediaTitle=names[topic.id]?.[language] ?? moduleTitle;
    const ui:MediaLesson['ui']={
      preview:language==='RU'?'Что проследить':language==='EN'?'What to follow':'Нені бақылау',
      pending:'',unavailable:'',alternative:'',
      duration:language==='RU'?'Длительность':language==='EN'?'Duration':'Ұзақтығы',
      durationPending:'—',language:language==='RU'?'Язык':language==='EN'?'Language':'Тіл',
      languageName:language==='RU'?'Русский':language==='EN'?'English':'Қазақша',
      credit:language==='RU'?'Источник':language==='EN'?'Credit':'Дереккөз',
      transcript:language==='RU'?'Текстовое сопровождение':language==='EN'?'Transcript':'Мәтіндік сүйемелдеу',
      theory:language==='RU'?'Вернуться к теории':language==='EN'?'Return to theory':'Теорияға оралу',
      question:language==='RU'?'Самопроверка':language==='EN'?'Self-check':'Өзін-өзі тексеру',
      check:language==='RU'?'Проверить':language==='EN'?'Check':'Тексеру',
      retry:language==='RU'?'Повторить':language==='EN'?'Retry':'Қайталау',
      correct:language==='RU'?'Верно':language==='EN'?'Correct':'Дұрыс',
      incorrect:language==='RU'?'Пересмотрите причинную связь':language==='EN'?'Review the causal link':'Себептік байланысты қайта қараңыз',
      correctAnswer:language==='RU'?'Лучший ответ':language==='EN'?'Best answer':'Ең жақсы жауап',
    };
    const correct=language==='RU'?'Проследить последовательность изменений и проверить, соответствует ли наблюдаемый результат прогнозу.':language==='EN'?'Trace the sequence of changes and test whether the observed result matches the prediction.':'Өзгерістер ретін бақылап, байқалған нәтиженің болжамға сәйкестігін тексеру.';
    const wrong=language==='RU'?'Остановить разбор после первого заметного изменения и считать его достаточным доказательством.':language==='EN'?'Stop after the first visible change and treat it as sufficient evidence.':'Алғашқы байқалған өзгерістен кейін талдауды тоқтатып, оны жеткілікті дәлел деп санау.';
    const intro=(language==='RU'?'Динамический разбор: ':language==='EN'?'Dynamic walkthrough: ':'Динамикалық талдау: ')+mediaTitle;
    const transcript=language==='RU'
      ? ['Следите за направлением процесса: входное воздействие → изменение состояния системы → наблюдаемый выход.', 'Остановите анимацию в ключевой точке и самостоятельно предскажите следующий шаг до его появления.']
      : language==='EN'
        ? ['Follow the direction of the process: input → change in system state → observable output.', 'Pause at the key transition and predict the next step before it appears.']
        : ['Процесс бағытын бақылаңыз: кіріс әсері → жүйе күйінің өзгеруі → байқалатын шығыс.', 'Негізгі ауысуда анимацияны тоқтатып, келесі қадамды пайда болмай тұрып болжаңыз.'];
    return {kind:'media',title,language,introduction:intro,ui,blocks:[{
      id:'module-'+topic.id+'-dynamic-process',title:mediaTitle,preview:language==='RU' ? `Перед запуском сформулируйте прогноз: какое изменение должно появиться после ключевого перехода в теме «${modules.RU[topic.id-1]}» и по какому признаку вы это распознаете.` : language==='EN' ? `Before starting, predict which change should follow the key transition in “${modules.EN[topic.id-1]}” and which observation would identify it.` : `Іске қоспас бұрын «${modules.KZ[topic.id-1]}» тақырыбындағы негізгі ауысудан кейін қандай өзгеріс болуы тиіс және оны қай белгі арқылы танитыныңызды болжаңыз.`,
      transcript,theoryAnchor:'mechanism',animation:'foundation',
      question:{prompt:language==='RU'?'Как лучше использовать эту динамическую схему для проверки понимания механизма?':language==='EN'?'How should this dynamic sequence be used to test understanding of the mechanism?':'Бұл динамикалық тізбекті тетікті түсінуді тексеру үшін қалай қолданған дұрыс?',correctAnswer:'a',
      explanation:language==='RU'?'Прогноз до появления следующего шага проверяет причинное понимание, а не узнавание готового текста.':language==='EN'?'Predicting before the next step appears tests causal understanding rather than recognition of prepared text.':'Келесі қадам пайда болмай тұрып болжау дайын мәтінді тануды емес, себептік түсінуді тексереді.',options:[
        {id:'a',text:correct,feedback:language==='RU'?'Так студент проверяет собственную причинную модель.':language==='EN'?'This tests the learner’s own causal model.':'Бұл студенттің өз себептік моделін тексереді.'},
        {id:'b',text:wrong,feedback:language==='RU'?'Первое изменение ещё не показывает всю причинную цепь.':language==='EN'?'The first change does not establish the whole causal chain.':'Алғашқы өзгеріс бүкіл себептік тізбекті көрсетпейді.'},
      ]}
    }]};
  }

  if (section === 'references') {
    const keys = [
      'guyton',
      'boron',
      'kzphysiology',
      'kznervous',
      ...topic.sources,

      ...(topic.id === 2 || topic.id === 18
        ? ['methods']
        : []),

      ...(topic.id === 23
        ? ['learning']
        : []),
    ];

    return {
      kind: 'references',
      title,
      introduction: c.referenceIntro,

      cards: [],

      sources: [...new Set(keys)].map((key) => {
        if (!sources[key]) {
          throw new Error(
            `Missing reading source: ${key}`,
          );
        }

        return {
          ...sources[key],
          description: c.sourceDescription,
          links,
        };
      }),
    };
  }

  return {
    kind: section,
    title,

    introduction:
      section === 'objectives'
        ? c.goals
        : moduleTitle,

    cards:
      section === 'objectives'
        ? [
            {
              id: 'learning-goal',
              title: question,

              paragraphs: [
                c.mechanism,
                c.interpretation,
              ],

              links,
            },
          ]
        : [
            {
              id: 'summary',
              title: c.summary,

              paragraphs: [
                language === 'RU'
                  ? 'Восстановите ключевую причинную цепь этого модуля без просмотра теории: исходное изменение → промежуточное звено → наблюдаемый результат.'
                  : language === 'EN'
                    ? 'Reconstruct the module’s key causal chain without viewing the theory: initial change → intermediate link → observable outcome.'
                    : 'Теорияға қарамай модульдің негізгі себептік тізбегін қалпына келтіріңіз: бастапқы өзгеріс → аралық буын → байқалатын нәтиже.',
                language === 'RU'
                  ? 'Затем назовите одно альтернативное объяснение результата и данные, которые помогли бы его отличить. Используйте ссылки ниже только для последующей сверки.'
                  : language === 'EN'
                    ? 'Then state one alternative explanation for the outcome and the evidence that would distinguish it. Use the links below only for subsequent checking.'
                    : 'Содан кейін нәтижеге бір балама түсіндірме және оны ажыратуға көмектесетін деректерді атаңыз. Төмендегі сілтемелерді тек кейінгі тексеру үшін пайдаланыңыз.',
              ],

              links,
            },
          ],
  };
}

export const foundationLessons: Partial<
  Record<
    number,
    Partial<
      Record<
        Section,
        LocalizedLesson
      >
    >
  >
> = Object.fromEntries(
  topics.map((topic) => [
    topic.id,

    Object.fromEntries(
      foundationSections.map((section) => [
        section,

        {
          RU: create(
            topic,
            section,
            'RU',
          ),

          EN: create(
            topic,
            section,
            'EN',
          ),

          KZ: create(
            topic,
            section,
            'KZ',
          ),
        },
      ]),
    ),
  ]),
);