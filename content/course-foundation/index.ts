import { modules, type Language } from '../course';
import { getSectionTitle, type Section } from '../sections';
import type { LocalizedLesson, PracticeLesson, SectionLesson } from '../types';
import type { MediaLesson } from '../media';
import { topics, termDefinitions, type Topic } from './topics';
import { createFoundationCase, createFoundationTest } from './assessment';

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

    noMaterials:
      'Дополнительные материалы по теме не указаны.',

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

    noMaterials:
      'No additional topic materials are listed.',

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

    noMaterials:
      'Тақырып бойынша қосымша материалдар көрсетілмеген.',

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
      ? ['объяснить, как это работает', 'понять, что означает результат', 'применить знание в новой ситуации', 'понять, чего данных пока недостаточно доказать']
      : language === 'EN'
        ? ['explain how it works', 'understand what the result means', 'use the knowledge in a new situation', 'recognize what the data are not enough to prove']
        : ['қалай жұмыс істейтінін түсіндіру', 'нәтиженің нені білдіретінін түсіну', 'білімді жаңа жағдайда қолдану', 'деректер нені әлі дәлелдеуге жеткіліксіз екенін түсіну'];
    return {
      kind: 'objectives',
      title,
      introduction: c.goals,
      cards: action.map((item, index) => ({
        id: `module-${topic.id}-objective-${index + 1}`,
        title: `${index + 1}. ${item}`,
        paragraphs: [index === 0 ? mechanism : index === 1 ? interpretation : index === 2 ? topic.task[language] : question],
        links: index < 2 ? [{ section: 'theory' as const }] : [{ section: 'practice' as const }, { section: 'cases' as const }],
      })),
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
            { id: 'c', text: c.noMaterials },
          ],
          correctAnswer: 'a',
          explanation: interpretation,
          target: { section: 'theory' },
        },
        {
          id: `module-${topic.id}-pretest-transfer`,
          topic: moduleTitle,
          prompt: language === 'RU' ? `Какой следующий шаг лучше всего проверит понимание темы «${modules.RU[topic.id - 1]}»?` : language === 'EN' ? `Which next step best checks understanding of “${modules.EN[topic.id - 1]}”?` : `«${modules.KZ[topic.id - 1]}» тақырыбын түсінуді қай келесі қадам жақсы тексереді?`,
          options: [
            { id: 'a', text: topic.task[language] },
            { id: 'b', text: language === 'RU' ? 'Повторить название темы без объяснения механизма.' : language === 'EN' ? 'Repeat the topic title without explaining the mechanism.' : 'Тетікті түсіндірмей тақырып атауын қайталау.' },
            { id: 'c', text: language === 'RU' ? 'Сделать вывод только по одному термину.' : language === 'EN' ? 'Draw a conclusion from one term alone.' : 'Бір ғана терминге сүйеніп қорытынды жасау.' },
          ],
          correctAnswer: 'a',
          explanation: language === 'RU' ? 'Перенос механизма в задание показывает понимание лучше простого воспроизведения термина.' : language === 'EN' ? 'Applying the mechanism in a task demonstrates understanding better than recalling a term alone.' : 'Тетікті тапсырмада қолдану бір терминді жай қайталаудан гөрі түсінуді жақсы көрсетеді.',
          target: { section: 'practice' },
        },
      ],
    };
  }

  if (section === 'one-minute') {
    return {
      kind: 'one-minute',
      title,
      introduction: language === 'RU' ? 'Сформулируйте механизм за одну минуту: от причины к наблюдаемому результату.' : language === 'EN' ? 'Explain the mechanism in one minute, moving from cause to observable result.' : 'Тетікті бір минутта түсіндіріңіз: себептен байқалатын нәтижеге дейін.',
      cards: [
        {
          id: `module-${topic.id}-one-minute-core`,
          title: language === 'RU' ? 'Механизм' : language === 'EN' ? 'Mechanism' : 'Тетік',
          paragraphs: [mechanism],
          links: [{ section: 'theory' as const }],
        },
        {
          id: `module-${topic.id}-one-minute-interpret`,
          title: language === 'RU' ? 'Что означает результат' : language === 'EN' ? 'What the result means' : 'Нәтиже нені білдіреді',
          paragraphs: [interpretation],
          links: [{ section: 'theory' as const }, { section: 'practice' as const }],
        },
        {
          id: `module-${topic.id}-one-minute-check`,
          title: language === 'RU' ? 'Проверьте себя' : language === 'EN' ? 'Check yourself' : 'Өзіңізді тексеріңіз',
          paragraphs: [question],
          links: [{ section: 'tests' as const }],
        },
      ],
    };
  }

  if (section === 'clinical') {
    const labels = language === 'RU'
      ? { bridge: 'От нормы к клинике', normal: 'Как работает в норме', change: 'Что изменилось', observe: 'Что мы ожидаем увидеть', explain: 'Почему это происходит', limit: 'Что нельзя заключить слишком быстро' }
      : language === 'EN'
        ? { bridge: 'From normal physiology to the clinic', normal: 'How it works normally', change: 'What changed', observe: 'What we expect to see', explain: 'Why this happens', limit: 'What we should not conclude too quickly' }
        : { bridge: 'Нормадан клиникаға', normal: 'Қалыптыда қалай жұмыс істейді', change: 'Не өзгерді', observe: 'Не байқауымыз мүмкін', explain: 'Неліктен бұлай болады', limit: 'Қандай қорытындыны асығыс жасауға болмайды' };
    return {
      kind: 'clinical',
      title,
      introduction: labels.bridge,
      cards: [
        {
          id: `module-${topic.id}-clinical-normal`,
          title: labels.normal,
          paragraphs: [mechanism],
          links: [{ section: 'theory' as const }],
        },
        {
          id: `module-${topic.id}-clinical-change`,
          title: labels.change,
          paragraphs: [topic.task[language]],
          links: [{ section: 'practice' as const }],
        },
        {
          id: `module-${topic.id}-clinical-observation`,
          title: labels.observe,
          paragraphs: [interpretation],
          links: [{ section: 'cases' as const }],
        },
        {
          id: `module-${topic.id}-clinical-explain`,
          title: labels.explain,
          paragraphs: [mechanism, interpretation],
          links: [{ section: 'theory' as const }, { section: 'cases' as const }],
        },
        {
          id: `module-${topic.id}-clinical-limit`,
          title: labels.limit,
          paragraphs: [question],
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
          title: c.question,

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
                mechanism,
                interpretation,
              ],
            },
          ],
        },

        {
          title: language === 'RU' ? 'Предположите → проверьте → объясните' : language === 'EN' ? 'Predict → check → explain' : 'Болжаңыз → тексеріңіз → түсіндіріңіз',
          blocks: [
            {
              type: 'paragraph',
              text: language === 'RU'
                ? 'Сначала напишите, что, по вашему мнению, произойдёт. После задания запишите, что получилось на самом деле, а затем объясните почему.'
                : language === 'EN'
                  ? 'First write what you think will happen. After the task, record what actually happened and then explain why.'
                  : 'Тапсырмаға дейін күтілетін нәтижені және себептік тетікті жазыңыз. Орындағаннан кейін бақылауды бөлек тіркеңіз; бақылауды түсіндірумен алмастырмаңыз.',
            },
            { type: 'response', label: language === 'RU' ? 'Мой прогноз' : language === 'EN' ? 'My prediction' : 'Менің болжамым' },
            { type: 'response', label: language === 'RU' ? 'Что я наблюдал(а)' : language === 'EN' ? 'What I observed' : 'Мен не байқадым' },
            { type: 'response', label: language === 'RU' ? 'Моё физиологическое объяснение' : language === 'EN' ? 'My physiological explanation' : 'Менің физиологиялық түсіндірмем' },
          ],
        },
        {
          title: language === 'RU' ? 'Попробуйте в новой ситуации' : language === 'EN' ? 'Try it in a new situation' : 'Жаңа жағдайда қолданып көріңіз',
          blocks: [
            { type: 'paragraph', text: question },
            { type: 'response', label: language === 'RU' ? 'Как изменится результат в новой ситуации и почему?' : language === 'EN' ? 'How would the result change in a new situation, and why?' : 'Жаңа жағдайда нәтиже қалай өзгереді және неге?' },
            { type: 'response', label: language === 'RU' ? 'Что по этим данным утверждать нельзя?' : language === 'EN' ? 'What cannot be concluded from these data?' : 'Бұл деректерден қандай қорытынды жасауға болмайды?' },
            { type: 'answer', items: [mechanism, interpretation] },
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
          explanation: `${mechanism} ${interpretation}`,
          target: { section: 'theory' },
        },
        {
          id: `module-${topic.id}-review-mechanism`,
          prompt: language === 'RU' ? 'Объясните по шагам: что происходит сначала, что затем и к какому результату это приводит?' : language === 'EN' ? 'Describe the causal mechanism step by step. How would changing the first link affect the result?' : 'Себептік тетікті қадамдап сипаттаңыз. Бірінші буын өзгерсе, нәтиже қалай өзгереді?',
          explanation: mechanism,
          target: { section: 'theory' },
        },
        {
          id: `module-${topic.id}-review-interpretation`,
          prompt: language === 'RU' ? 'Какой результат вы ожидаете увидеть? Что этот результат ещё не позволяет утверждать?' : language === 'EN' ? 'Which observable result is consistent with this mechanism, and what does that result not prove by itself?' : 'Қандай байқалатын нәтиже осы тетікке сәйкес келеді және ол өздігінен нені дәлелдемейді?',
          explanation: interpretation,
          target: { section: 'practice' },
        },
        {
          id: `module-${topic.id}-review-transfer`,
          prompt: language === 'RU' ? 'Представьте похожую новую ситуацию. Что изменится и почему?' : language === 'EN' ? 'Transfer the mechanism to a new situation: make a prediction, then justify it causally.' : 'Тетікті жаңа жағдайға қолданыңыз: алдымен болжам жасаңыз, кейін оны себептік байланыспен негіздеңіз.',
          explanation: topic.task[language],
          target: { section: 'cases' },
        },
        {
          id: `module-${topic.id}-review-justification`,
          prompt: language === 'RU' ? 'Что ещё вы бы проверили, чтобы увереннее сделать вывод?' : language === 'EN' ? 'What additional observation or comparison would strengthen your conclusion, and why?' : 'Қандай қосымша бақылау немесе салыстыру қорытындыңызды күшейтер еді және неге?',
          explanation: `${mechanism} ${interpretation}`,
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
    const correct=topic.mechanism[language];
    const wrong=language==='RU'?'Сделать вывод только по одному наблюдаемому изменению, не проверяя механизм и альтернативные объяснения.':language==='EN'?'Draw a conclusion from one observed change without testing the mechanism or alternative explanations.':'Тетікті және балама түсіндірмелерді тексермей, бір ғана байқалған өзгеріске сүйеніп қорытынды жасау.';
    const intro=(language==='RU'?'Динамический разбор: ':language==='EN'?'Dynamic walkthrough: ':'Динамикалық талдау: ')+mediaTitle;
    return {kind:'media',title,language,introduction:intro,ui,blocks:[{
      id:'module-'+topic.id+'-dynamic-process',title:mediaTitle,preview:topic.task[language],
      transcript:[topic.mechanism[language],topic.interpretation[language]],theoryAnchor:'mechanism',animation:'foundation',
      question:{prompt:topic.question[language],correctAnswer:'a',explanation:topic.mechanism[language]+' '+topic.interpretation[language],options:[
        {id:'a',text:correct,feedback:topic.mechanism[language]},
        {id:'b',text:wrong,feedback:language==='RU'?'Один результат не локализует механизм без дополнительной проверки.':language==='EN'?'A single result does not localize the mechanism without an additional test.':'Бір нәтиже қосымша тексерусіз тетікті локализацияламайды.'},
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
                mechanism,
                interpretation,
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