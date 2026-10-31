import { createModuleTwentyFourSleepTheory } from "./module-twenty-four-sleep-theory";
import { extendModuleTwentyFourCases, extendModuleTwentyFourPractice } from "./module-twenty-four-activities";
import { createModuleTwentyFourPretest } from "./module-twenty-four-pretest";
import { extendModuleTwentyFourFinalTest } from "./module-twenty-four-final-test";
import { createModuleTwentyFiveTheory } from "./module-twenty-five-theory";
import { extendModuleTwentyFiveCases, extendModuleTwentyFivePractice } from "./module-twenty-five-activities";
import { createModuleTwentyFivePretest } from "./module-twenty-five-pretest";
import { extendModuleTwentyFiveFinalTest } from "./module-twenty-five-final-test";
import { createModuleTwentyThreeTheory } from "./module-twenty-three-theory";
import { extendModuleTwentyThreeCases, extendModuleTwentyThreePractice } from "./module-twenty-three-activities";
import { createModuleTwentyThreePretest } from "./module-twenty-three-pretest";
import { extendModuleTwentyThreeFinalTest } from "./module-twenty-three-final-test";
import { createModuleTwentyTwoTheory } from "./module-twenty-two-theory";
import { extendModuleTwentyTwoCases, extendModuleTwentyTwoPractice } from "./module-twenty-two-activities";
import { createModuleTwentyTwoPretest } from "./module-twenty-two-pretest";
import { extendModuleTwentyTwoFinalTest } from "./module-twenty-two-final-test";
import { recommendedPath } from "../sections";
import {physiologicalRelations} from "../physiological-relations";
import {mediaWalkthroughs} from "../media-walkthroughs";
import { modules, type Language } from '../course';
import { getSectionTitle, type Section } from '../sections';
import type { LocalizedLesson, PracticeLesson, SectionLesson } from '../types';
import type { MediaLesson } from '../media';
import { topics, termDefinitions, type Topic } from './topics';
import { clinicalVignettes, createFoundationCase, createFoundationTest } from './assessment';
import { createModuleThirteenSummary } from "./module-thirteen-summary";
import { createModuleThirteenObjectives } from "./module-thirteen-objectives";
import { createModuleThirteenPretest } from "./module-thirteen-pretest";
import { createModuleThirteenTheory } from "./module-thirteen-theory";
import { moduleTwentyExpandedTheory } from "./module-twenty-expanded-theory";
import { moduleTwentyFourChapter } from "./module-twenty-four-chapter";
import { createModuleTwentyOneTheory } from "./module-twenty-one-theory";
import { createModuleTwentyVisualTheory } from "./module-twenty-visual-theory";
import { extendModuleTwentyCases, extendModuleTwentyPractice } from "./module-twenty-visual-activities";
import { extendModuleTwentyOneCases, extendModuleTwentyOnePractice } from "./module-twenty-one-activities";
import { createModuleTwentyOnePretest } from "./module-twenty-one-pretest";
import { extendModuleTwentyOneFinalTest } from "./module-twenty-one-final-test";

const experimentFocus: Partial<Record<number, Record<Language, string>>> = {
  2: { RU: 'сравните две записи ЭЭГ с одинаковым физиологическим состоянием, но разным уровнем артефакта; измерьте амплитуду, частоту и признак, позволяющий распознать артефакт', EN: 'compare two EEG recordings from the same physiological state but with different artifact levels; measure amplitude, frequency, and a feature that identifies the artifact', KZ: 'физиологиялық күйі бірдей, бірақ артефакт деңгейі әртүрлі екі ЭЭГ жазбасын салыстырып, амплитуданы, жиілікті және артефактты тануға көмектесетін белгіні өлшеңіз' },
  3: { RU: 'измените диаметр или степень миелинизации нервного волокна и измерьте скорость проведения при фиксированной температуре и длине пути', EN: 'change nerve-fibre diameter or degree of myelination and measure conduction velocity at fixed temperature and path length', KZ: 'жүйке талшығының диаметрін немесе миелиндену дәрежесін өзгертіп, температура мен жол ұзындығын тұрақты ұстап, өткізу жылдамдығын өлшеңіз' },
  4: { RU: 'измените внеклеточную концентрацию K⁺ или мембранную проводимость и предскажите направление изменения потенциала покоя; отдельно оцените достижение порога', EN: 'change extracellular K⁺ concentration or membrane conductance and predict the direction of resting-potential change; assess threshold attainment separately', KZ: 'жасушадан тыс K⁺ концентрациясын немесе мембраналық өткізгіштікті өзгертіп, тыныштық потенциалы өзгерісінің бағытын болжаңыз; табалдырыққа жетуді бөлек бағалаңыз' },
  5: { RU: 'измените вероятность высвобождения медиатора или чувствительность постсинаптических рецепторов и измерьте изменение постсинаптического ответа', EN: 'change transmitter-release probability or postsynaptic receptor sensitivity and measure the change in postsynaptic response', KZ: 'медиатор бөліну ықтималдығын немесе постсинапстық рецептор сезімталдығын өзгертіп, постсинапстық жауаптың өзгерісін өлшеңіз' },
  6: { RU: 'измените соотношение возбуждающих и тормозных входов и измерьте мембранный ответ относительно порога при неизменном исходном стимуле', EN: 'change the balance of excitatory and inhibitory inputs and measure the membrane response relative to threshold while keeping the initial stimulus constant', KZ: 'қоздырушы және тежеуші кірістер арақатынасын өзгертіп, бастапқы стимулды тұрақты ұстап, мембраналық жауапты табалдырыққа қатысты өлшеңіз' },
  7: { RU: 'измените интенсивность сенсорного стимула и измерьте латентность и величину рефлекторного ответа; затем проверьте влияние дополнительного входа в сеть', EN: 'change sensory-stimulus intensity and measure reflex latency and response magnitude; then test the effect of an additional network input', KZ: 'сенсорлық стимул қарқындылығын өзгертіп, рефлекс латенттілігі мен жауап шамасын өлшеңіз; кейін желіге қосымша кірістің әсерін тексеріңіз' },
  8: { RU: 'смоделируйте одностороннее нарушение выбранного восходящего или нисходящего пути и предскажите сторону и тип функционального дефицита с учётом перекрёста', EN: 'model a unilateral lesion of a selected ascending or descending pathway and predict the side and type of functional deficit while accounting for decussation', KZ: 'таңдалған жоғарылаушы немесе төмендеуші жолдың біржақты зақымын модельдеп, айқасуды ескеріп, функциялық тапшылықтың жағы мен түрін болжаңыз' },
  9: { RU: 'сравните амплитуду и латентность рефлекторного ответа до и после изменения интенсивности афферентного стимула', EN: 'compare reflex-response amplitude and latency before and after changing afferent stimulus intensity', KZ: 'афференттік стимул қарқындылығын өзгерткенге дейін және кейін рефлекстік жауаптың амплитудасы мен латенттілігін салыстырыңыз' },
  10: { RU: 'измените уровень сенсорной активации и измерьте изменение показателя бодрствования или постуральной реакции', EN: 'change the level of sensory activation and measure a change in an arousal or postural-response variable', KZ: 'сенсорлық белсендіру деңгейін өзгертіп, сергектік немесе постуралдық жауап көрсеткішінің өзгерісін өлшеңіз' },
  12: { RU: 'измените условие выбора движения и измерьте время начала, частоту ошибочного выбора или масштаб ответа', EN: 'change a movement-selection condition and measure initiation time, erroneous-choice frequency, or response scaling', KZ: 'қозғалысты таңдау шартын өзгертіп, басталу уақытын, қате таңдау жиілігін немесе жауап ауқымын өлшеңіз' },
  13: { RU: 'измените доступность сенсорной обратной связи и измерьте ошибку траектории, время коррекции или точность движения', EN: 'change sensory-feedback availability and measure trajectory error, correction time, or movement accuracy', KZ: 'сенсорлық кері байланыстың қолжетімділігін өзгертіп, траектория қатесін, түзету уақытын немесе қозғалыс дәлдігін өлшеңіз' },
  14: { RU: 'измените сенсорный контекст и измерьте эффективность передачи выбранного сигнала или точность его обнаружения', EN: 'change sensory context and measure transmission effectiveness of a selected signal or its detection accuracy', KZ: 'сенсорлық контексті өзгертіп, таңдалған сигналдың берілу тиімділігін немесе оны анықтау дәлдігін өлшеңіз' },
  15: { RU: 'задайте контролируемое отклонение регулируемой величины и измерьте направление компенсаторного ответа во времени', EN: 'introduce a controlled deviation in a regulated variable and measure the direction of the compensatory response over time', KZ: 'реттелетін шаманы бақыланатын түрде ауытқытып, уақыт бойынша компенсациялық жауаптың бағытын өлшеңіз' },
  18: { RU: 'измените характеристику сенсорного или моторного задания и измерьте точность, латентность или пространственную специфичность ответа', EN: 'change a sensory or motor task feature and measure accuracy, latency, or spatial specificity of the response', KZ: 'сенсорлық немесе моторлық тапсырма сипаттамасын өзгертіп, жауаптың дәлдігін, латенттілігін немесе кеңістіктік ерекшелігін өлшеңіз' },
  20: { RU: 'измените параметр зрительного стимула и измерьте порог обнаружения, точность различения или время ответа', EN: 'change a visual-stimulus parameter and measure detection threshold, discrimination accuracy, or response time', KZ: 'көру стимулының параметрін өзгертіп, анықтау табалдырығын, ажырату дәлдігін немесе жауап уақытын өлшеңіз' },
  11: { RU: 'измените доступность зрительной или проприоцептивной обратной связи во время движения и измерьте точность, латентность коррекции и конечную ошибку', EN: 'change visual or proprioceptive feedback availability during movement and measure accuracy, correction latency, and final error', KZ: 'қозғалыс кезінде көру немесе проприоцептивтік кері байланыстың қолжетімділігін өзгертіп, дәлдікті, түзету латенттілігін және соңғы қатені өлшеңіз' },
  16: { RU: 'измените эмоциональную значимость стимула при одинаковой сенсорной интенсивности и измерьте ориентировочную, вегетативную или поведенческую реакцию', EN: 'change the emotional salience of a stimulus while keeping sensory intensity constant and measure an orienting, autonomic, or behavioral response', KZ: 'сенсорлық қарқындылықты тұрақты ұстап, стимулдың эмоциялық маңызын өзгертіңіз және бағдарлау, вегетативтік немесе мінез-құлық жауабын өлшеңіз' },
  17: { RU: 'сравните реакцию на нейтральный и ранее связанный со значимым событием стимул; измерьте изменение вегетативного или поведенческого ответа', EN: 'compare responses to a neutral cue and a cue previously associated with a significant event; measure the change in autonomic or behavioral response', KZ: 'бейтарап сигнал мен бұрын маңызды оқиғамен байланысқан сигналға жауапты салыстырып, вегетативтік немесе мінез-құлық жауабының өзгерісін өлшеңіз' },
  19: { RU: 'измените локализацию или интенсивность соматосенсорного стимула и измерьте порог обнаружения, точность локализации или различения двух точек', EN: 'change the location or intensity of a somatosensory stimulus and measure detection threshold, localization accuracy, or two-point discrimination', KZ: 'соматосенсорлық стимулдың орнын немесе қарқындылығын өзгертіп, анықтау табалдырығын, локализация дәлдігін немесе екі нүктені ажыратуды өлшеңіз' },
  21: { RU: 'выберите один анализатор и измените физический параметр стимула; измерьте порог, точность различения или адаптацию, не смешивая разные сенсорные системы в одном опыте', EN: 'choose one sensory system and change a physical stimulus parameter; measure threshold, discrimination accuracy, or adaptation without mixing sensory systems in one experiment', KZ: 'бір анализаторды таңдап, стимулдың физикалық параметрін өзгертіңіз; бір тәжірибеде әртүрлі сенсорлық жүйелерді араластырмай, табалдырықты, ажырату дәлдігін немесе бейімделуді өлшеңіз' },
  22: { RU: 'измените один компонент вегетативного рефлекса и измерьте ответ конкретного органа-мишени, учитывая тип рецептора и исходное состояние', EN: 'change one component of an autonomic reflex and measure the response of a specific target organ while accounting for receptor type and baseline state', KZ: 'вегетативтік рефлекстің бір компонентін өзгертіп, рецептор түрі мен бастапқы күйді ескере отырып, нақты нысана мүшенің жауабын өлшеңіз' },
  23: { RU: 'сравните обучение при подкреплении и без него, сохраняя стимул сопоставимым; измерьте вероятность, латентность или устойчивость выученной реакции', EN: 'compare learning with and without reinforcement while keeping the cue comparable; measure probability, latency, or persistence of the learned response', KZ: 'стимулды салыстырмалы түрде бірдей ұстап, нығайтумен және нығайтусыз үйренуді салыстырыңыз; үйренген жауаптың ықтималдығын, латенттілігін немесе тұрақтылығын өлшеңіз' },
  24: { RU: 'сравните условия с разным временем светового воздействия и измерьте сонливость, время засыпания или параметр суточного ритма', EN: 'compare conditions with different light timing and measure sleepiness, sleep-onset timing, or a circadian-rhythm variable', KZ: 'жарық әсерінің уақыты әртүрлі жағдайларды салыстырып, ұйқышылдықты, ұйықтау уақытын немесе тәуліктік ырғақ көрсеткішін өлшеңіз' },
  25: { RU: 'сравните исходное выполнение навыка, обучение и перенос на новое задание; измерьте точность или время выполнения и отделите восстановление функции от компенсационной стратегии', EN: 'compare baseline skill performance, training, and transfer to a new task; measure accuracy or completion time and distinguish functional recovery from a compensatory strategy', KZ: 'дағдының бастапқы орындалуын, жаттығуды және жаңа тапсырмаға көшіруді салыстырып, дәлдікті немесе орындау уақытын өлшеңіз және функцияның қалпына келуін компенсациялық стратегиядан ажыратыңыз' },
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
        {
          id: 'key-concepts',
          title: language === 'RU' ? 'Ключевые физиологические понятия' : language === 'EN' ? 'Key physiological concepts' : 'Негізгі физиологиялық ұғымдар',
          blocks: [
            { type: 'list' as const, items: topic.terms.map((term, index) => {
              const definition = termDefinitions[topic.id]?.[index]?.[language];
              return definition ? `${term[language]} — ${definition}` : term[language];
            }) },
          ],
        },
        {
          id: 'mechanism-reasoning',
          title: language === 'RU' ? 'Вопрос для причинно-следственного анализа' : language === 'EN' ? 'Causal reasoning question' : 'Себеп-салдарлық талдау сұрағы',
          blocks: [
            { type: 'paragraph' as const, text: topic.question[language] },
            { type: 'callout' as const,
              title: language === 'RU' ? 'Проверка понимания' : language === 'EN' ? 'Check your understanding' : 'Түсінуді тексеру',
              text: language === 'RU'
                ? 'Объясните механизм своими словами, назовите изменяемую физиологическую величину и ожидаемое наблюдение. Затем сопоставьте ответ с разделами «Механизм» и «Интерпретация».'
                : language === 'EN'
                  ? 'Explain the mechanism in your own words, identify the physiological variable being changed and the expected observation. Compare your answer with the mechanism and interpretation sections.'
                  : 'Механизмді өз сөзіңізбен түсіндіріңіз, өзгеретін физиологиялық шаманы және күтілетін бақылауды атаңыз. Жауабыңызды механизм және түсіндіру бөлімдерімен салыстырыңыз.' },
          ],
        },
        ...(topic.id === 20 ? moduleTwentyExpandedTheory(language) : []),
        ...(topic.id === 22 ? [
          {
            id: 'autonomic-circuit-organization',
            title: language === 'RU' ? 'Организация автономных рефлекторных дуг' : language === 'EN' ? 'Organization of autonomic reflex circuits' : 'Вегетативтік рефлекс доғаларының ұйымдасуы',
            blocks: [{ type: 'paragraph' as const, text: language === 'RU'
              ? 'Вегетативная нервная система регулирует гладкие мышцы, миокард, железы и обменные функции через распределённые центральные и периферические сети. Симпатические преганглионарные нейроны преимущественно расположены в боковых рогах сегментов T1–L2 спинного мозга, а парасимпатические — в ядрах ствола мозга и крестцовых сегментах S2–S4. Преганглионарные волокна обеих систем выделяют ацетилхолин на никотиновые рецепторы ганглиев. Большинство постганглионарных симпатических нейронов выделяют норадреналин, а парасимпатических — ацетилхолин на мускариновые рецепторы. Важные исключения включают холинергическую симпатическую иннервацию большинства эккринных потовых желёз. Реакция органа зависит от типа рецептора, локальных механизмов и текущего состояния ткани, а не только от названия отдела.'
              : language === 'EN'
                ? 'The autonomic nervous system regulates smooth muscle, myocardium, glands and metabolic functions through distributed central and peripheral circuits. Sympathetic preganglionic neurons are concentrated in spinal segments T1–L2, whereas parasympathetic preganglionic neurons originate in brainstem nuclei and sacral segments S2–S4. Preganglionic fibers in both divisions release acetylcholine onto ganglionic nicotinic receptors. Most sympathetic postganglionic neurons release norepinephrine, while parasympathetic postganglionic neurons release acetylcholine onto muscarinic receptors. An important exception is sympathetic cholinergic innervation of most eccrine sweat glands. Organ responses depend on receptor subtype, local control and tissue state, not merely on the division label.'
                : 'Вегетативтік жүйке жүйесі таралған орталық және шеткі тізбектер арқылы бірыңғай салалы бұлшықеттерді, миокардты, бездерді және зат алмасуды реттейді. Симпатикалық преганглионарлық нейрондар негізінен жұлынның T1–L2 сегменттерінде, парасимпатикалық нейрондар ми бағаны ядролары мен S2–S4 сегменттерінде орналасады. Екі бөлімнің преганглионарлық талшықтары ганглийдің никотиндік рецепторларына ацетилхолин бөледі. Симпатикалық постганглионарлық нейрондардың көбі норадреналин, парасимпатикалықтары мускариндік рецепторларға ацетилхолин бөледі. Ерекшелік ретінде эккриндік тер бездерінің көпшілігі симпатикалық холинергиялық иннервация алады. Мүше жауабы рецептор түріне, жергілікті реттелуге және тін күйіне тәуелді.' }],
          },
          {
            id: 'autonomic-baroreflex',
            title: language === 'RU' ? 'Барорефлекс: последовательность причин и следствий' : language === 'EN' ? 'Baroreflex: causal sequence' : 'Барорефлекс: себеп-салдар тізбегі',
            blocks: [{ type: 'paragraph' as const, text: language === 'RU'
              ? 'При кратковременном повышении артериального давления увеличивается растяжение барорецепторов каротидного синуса и дуги аорты. Их афференты проходят преимущественно по IX и X черепным нервам к ядру одиночного пути продолговатого мозга. Через стволовые сети усиливается парасимпатическое влияние на синусовый узел и уменьшается симпатический выход к сердцу и сосудам: частота сердечных сокращений и сосудистое сопротивление обычно снижаются, противодействуя исходному изменению давления. При вставании венозный возврат может временно уменьшаться, что запускает противоположную компенсаторную реакцию. Барорефлекс обеспечивает быструю регуляцию, но не является единственным механизмом долговременного контроля давления; на результат влияют объём крови, лекарства и сосудистая реактивность.'
              : language === 'EN'
                ? 'A transient rise in arterial pressure stretches baroreceptors in the carotid sinus and aortic arch. Afferents travel mainly through cranial nerves IX and X to the medullary nucleus tractus solitarius. Brainstem circuits increase parasympathetic drive to the sinoatrial node and reduce sympathetic outflow to heart and vessels: heart rate and vascular resistance typically decrease, opposing the initial pressure change. Standing can transiently reduce venous return, eliciting the opposite compensatory response. The baroreflex provides rapid control but is not the sole long-term regulator of pressure; blood volume, medication and vascular responsiveness modify the result.'
                : 'Артериялық қысым қысқа уақыт жоғарылағанда каротид синусы мен қолқа доғасының барорецепторлары көбірек созылады. Афференттер негізінен IX және X бассүйек нервтері арқылы сопақша мидағы жалғыз жол ядросына өтеді. Ми бағаны тізбектері синустық түйінге парасимпатикалық әсерді күшейтіп, жүрек пен тамырларға симпатикалық шығуды азайтады: жүрек соғу жиілігі мен тамыр кедергісі әдетте төмендеп, бастапқы қысым өзгерісіне қарсы әсер етеді. Тұрған кезде веналық қайту уақытша азайып, қарама-қарсы компенсаторлық жауап іске қосылады. Барорефлекс жылдам реттеуді қамтамасыз етеді, бірақ қысымды ұзақ мерзімді реттеудің жалғыз механизмі емес.' }],
          },
          {
            id: 'autonomic-clinical',
            title: language === 'RU' ? 'Клинический разбор: ортостатическая гипотензия' : language === 'EN' ? 'Clinical reasoning: orthostatic hypotension' : 'Клиникалық талдау: ортостатикалық гипотензия',
            blocks: [{ type: 'paragraph' as const, text: language === 'RU'
              ? 'Пациент сообщает о головокружении вскоре после вставания. Для учебного разбора сначала сопоставляют давление и пульс лёжа и стоя, время появления симптомов, гидратацию и принимаемые препараты. Классическая ортостатическая гипотензия определяется устойчивым снижением систолического давления не менее чем на 20 мм рт. ст. или диастолического не менее чем на 10 мм рт. ст. в течение трёх минут после вставания или наклона. Недостаточная тахикардическая компенсация может указывать на нейрогенный механизм, но её интерпретация зависит от исходного ритма и лекарств. В дифференциальном анализе рассматривают обезвоживание, кровопотерю, лекарственные эффекты и автономную недостаточность. Один симптом головокружения не устанавливает диагноз; при обмороке или выраженных симптомах требуется клиническая оценка.'
              : language === 'EN'
                ? 'A patient reports dizziness shortly after standing. A teaching assessment compares supine and standing blood pressure and pulse, symptom timing, hydration and medications. Classical orthostatic hypotension is defined by a sustained systolic drop of at least 20 mmHg or diastolic drop of at least 10 mmHg within three minutes of standing or head-up tilt. An inadequate compensatory heart-rate rise may suggest a neurogenic mechanism, but baseline rhythm and medications affect interpretation. Differential causes include dehydration, blood loss, medication effects and autonomic failure. Dizziness alone does not establish a diagnosis; syncope or severe symptoms require clinical evaluation.'
                : 'Пациент тұрғаннан кейін бас айналатынын айтады. Оқу талдауында жатқан және тұрған кездегі қан қысымы мен пульсті, симптомның пайда болу уақытын, гидратацияны және дәрілерді салыстырады. Классикалық ортостатикалық гипотензия — тұрғаннан немесе еңкейтілген сынамадан кейін үш минут ішінде систолалық қысымның кемінде 20 мм сын. бағ. не диастолалық қысымның кемінде 10 мм сын. бағ. тұрақты төмендеуі. Жүрек жиілігінің жеткіліксіз компенсациясы нейрогендік механизмді көрсетуі мүмкін, бірақ бастапқы ырғақ пен дәрілерді ескеру қажет. Сусыздану, қан жоғалту, дәрілік әсер және автономдық жеткіліксіздік салыстырылады. Бас айналу өздігінен диагноз емес; естен тану немесе ауыр симптомдар клиникалық бағалауды талап етеді.' }],
          },
        ] : []),
        ...(topic.id === 14 ? [
          {
            id: 'thalamic-nuclei',
            title: language === 'RU' ? 'Ядра таламуса и функциональная организация' : language === 'EN' ? 'Thalamic nuclei and functional organization' : 'Таламус ядролары және функционалдық ұйымдасу',
            blocks: [{ type: 'paragraph' as const, text: language === 'RU'
              ? 'Таламус состоит из нескольких групп ядер с различными входами и корковыми проекциями. Латеральное коленчатое тело передаёт зрительную информацию в первичную зрительную кору, медиальное коленчатое тело участвует в слуховой передаче. Вентральное заднелатеральное ядро получает соматосенсорную информацию от тела, а вентральное заднемедиальное — преимущественно от лица и вкусовых путей. Вентральные передние и латеральные ядра включены в моторные петли базальных ганглиев и мозжечка. Медиодорсальное ядро связано с префронтальной корой, а передние ядра — с сетями памяти. Ретикулярное ядро таламуса образовано преимущественно ГАМКергическими нейронами и регулирует активность других таламических ядер. Поэтому таламус нельзя описывать только как пассивный переключатель сенсорных сигналов.'
              : language === 'EN'
                ? 'The thalamus contains multiple nuclear groups with distinct inputs and cortical projections. The lateral geniculate nucleus relays visual information to primary visual cortex, while the medial geniculate nucleus contributes to auditory transmission. The ventral posterolateral nucleus receives somatosensory information from the body, and the ventral posteromedial nucleus receives mainly facial somatosensory and gustatory inputs. Ventral anterior and lateral nuclei participate in basal ganglia and cerebellar motor loops. The mediodorsal nucleus connects with prefrontal cortex, while anterior nuclei contribute to memory circuits. The thalamic reticular nucleus consists largely of GABAergic neurons and modulates other thalamic nuclei. The thalamus is therefore not merely a passive sensory relay.'
                : 'Таламус әртүрлі кірістері мен қыртыстық проекциялары бар ядролар топтарынан тұрады. Латералдық тізелі дене көру ақпаратын біріншілік көру қыртысына, медиалдық тізелі дене есту ақпаратын өткізеді. Вентралдық артқы латералдық ядро денеден, ал вентралдық артқы медиалдық ядро негізінен беттен соматосенсорлық және дәмдік ақпарат алады. Вентралдық алдыңғы және латералдық ядролар базалдық ганглийлер мен мишықтың қозғалыс ілмектеріне қатысады. Медиодорсалдық ядро префронталдық қыртыспен, ал алдыңғы ядролар жад желілерімен байланысады. Таламустың ретикулярлық ядросы көбіне ГАМҚ-ергиялық нейрондардан тұрады және басқа ядролар белсенділігін реттейді.' }],
          },
          {
            id: 'thalamocortical-rhythms',
            title: language === 'RU' ? 'Таламокортикальные ритмы и состояние мембраны' : language === 'EN' ? 'Thalamocortical rhythms and membrane state' : 'Таламокортикалық ырғақтар және мембрана күйі',
            blocks: [{ type: 'paragraph' as const, text: language === 'RU'
              ? 'Таламокортикальные нейроны могут работать в тоническом и пачечном режимах разряда. При достаточной гиперполяризации часть низкопороговых T-типа кальциевых каналов выходит из инактивации, что способствует возникновению пачечных ответов при последующей деполяризации. Взаимодействие релейных клеток, тормозных нейронов ретикулярного ядра и корковых обратных проекций участвует в генерации сонных веретён и других колебаний. Ритмическая активность зависит от уровня бодрствования, нейромодуляторов и распределённой сети, а не от одного ядра. При интерпретации ЭЭГ нельзя приравнивать наличие ритма к конкретному диагнозу без клинического контекста.'
              : language === 'EN'
                ? 'Thalamocortical neurons can fire in tonic and burst modes. Sufficient hyperpolarization deinactivates some low-threshold T-type calcium channels, enabling burst responses during subsequent depolarization. Interactions among relay cells, inhibitory reticular nucleus neurons and cortical feedback contribute to sleep spindles and other oscillations. Rhythmic activity depends on arousal state, neuromodulators and distributed networks rather than a single nucleus. An EEG rhythm alone does not establish a diagnosis without clinical context.'
                : 'Таламокортикалық нейрондар тоникалық және топталған разряд режимдерінде жұмыс істей алады. Жеткілікті гиперполяризация кезінде төмен табалдырықты T-типті кальций арналарының бір бөлігі инактивациядан шығып, кейінгі деполяризацияда топталған жауапқа мүмкіндік береді. Релейлік жасушалар, ретикулярлық ядроның тежегіш нейрондары және қыртыстық кері байланыс ұйқы ұршықтары мен басқа тербелістерге қатысады. Ырғақтар сергектік күйіне, нейромодуляторларға және таралған желілерге тәуелді. ЭЭГ ырғақтарын клиникалық контекстсіз диагнозбен теңестіруге болмайды.' }],
          },
          {
            id: 'thalamic-clinical',
            title: language === 'RU' ? 'Клиническая локализация таламических поражений' : language === 'EN' ? 'Clinical localization of thalamic lesions' : 'Таламус зақымдарының клиникалық локализациясы',
            blocks: [{ type: 'paragraph' as const, text: language === 'RU'
              ? 'Поражение вентральных задних ядер может вызывать контралатеральные нарушения нескольких видов чувствительности. Некоторые пациенты после таламического инсульта испытывают центральную постинсультную боль, однако не каждое таламическое поражение приводит к болевому синдрому. В зависимости от локализации возможны нарушения внимания, памяти, двигательной регуляции и бодрствования. Для локализации необходимо сопоставлять распределение чувствительных нарушений, другие неврологические симптомы и нейровизуализацию. Внезапный очаговый неврологический дефицит требует неотложной оценки на инсульт; учебная модель не заменяет обследование.'
              : language === 'EN'
                ? 'Lesions of ventral posterior thalamic nuclei may cause contralateral deficits across several sensory modalities. Some patients develop central post-stroke pain after thalamic infarction, but not every thalamic lesion produces pain. Depending on location, attention, memory, motor control and arousal can also be affected. Localization requires sensory patterns, other neurological findings and imaging to be interpreted together. Sudden focal neurological deficits require urgent stroke assessment; a teaching model cannot replace evaluation.'
                : 'Таламустың вентралдық артқы ядролары зақымданғанда бірнеше сезімталдық түрінің қарама-қарсы жақтағы бұзылысы пайда болуы мүмкін. Кейбір науқастарда таламустық инсульттен кейін орталық ауырсыну дамиды, бірақ әр зақым ауырсынуға әкелмейді. Орналасуына қарай зейін, жад, қозғалысты реттеу және сергектік бұзылуы мүмкін. Локализация үшін сезімталдық өзгерістерін, басқа неврологиялық белгілерді және нейровизуализацияны бірге бағалау қажет. Кенеттен дамыған ошақты неврологиялық тапшылық шұғыл инсульттік бағалауды талап етеді.' }],
          },
        ] : []),
        ...(topic.id === 24 ? moduleTwentyFourChapter(language) : []),
        ...(topic.id === 24 ? [
          {
            id: 'sleep-circuitry',
            title: language === 'RU' ? 'Нейронные сети сна и бодрствования' : language === 'EN' ? 'Neural circuits of sleep and wakefulness' : 'Ұйқы мен сергектіктің нейрондық желілері',
            blocks: [{ type: 'paragraph' as const, text: language === 'RU'
              ? 'Сон формируется распределёнными нейронными сетями, а не одним «центром сна». Нейроны вентролатеральной преоптической области гипоталамуса выделяют ГАМК и галанин и подавляют часть систем бодрствования. Орексиновые нейроны латерального гипоталамуса стабилизируют переходы между состояниями; их утрата связана с нарколепсией первого типа. Норадренергические нейроны голубого пятна, серотонинергические ядра шва, гистаминергические нейроны туберомамиллярного ядра и холинергические системы участвуют в поддержании бодрствования и смене фаз. Во время REM-сна активируются определённые стволовые сети, тогда как торможение спинальных мотонейронов вызывает характерную мышечную атонию. Электроэнцефалографические стадии сна отражают динамику взаимодействия таламо-кортикальных сетей.'
              : language === 'EN'
                ? 'Sleep emerges from distributed neural circuits rather than a single sleep center. GABA- and galanin-releasing neurons in the ventrolateral preoptic hypothalamus inhibit several arousal systems. Orexin neurons in lateral hypothalamus stabilize transitions between vigilance states; their loss is associated with narcolepsy type 1. Noradrenergic locus coeruleus, serotonergic raphe, histaminergic tuberomammillary and cholinergic systems contribute to wakefulness and sleep-state transitions. During REM sleep, specific brainstem networks are active while inhibition of spinal motor neurons produces characteristic muscle atonia. EEG sleep stages reflect changing thalamocortical network dynamics.'
                : 'Ұйқы бір ғана «ұйқы орталығынан» емес, таралған нейрондық желілерден қалыптасады. Гипоталамустың вентролатералдық преоптикалық аймағындағы ГАМҚ және галанин бөлетін нейрондар сергектік жүйелерінің бір бөлігін тежейді. Латералдық гипоталамустың орексин нейрондары күйлер арасындағы ауысуды тұрақтандырады; олардың жоғалуы бірінші типті нарколепсиямен байланысты. Көк дақтың норадренергиялық, тігіс ядроларының серотонинергиялық, туберомамиллярлық ядроның гистаминергиялық және холинергиялық жүйелер сергектік пен ұйқы кезеңдеріне қатысады. REM-ұйқыда ми бағанының кейбір желілері белсенді болып, жұлын мотонейрондарының тежелуі бұлшықет атониясын туғызады.' }],
          },
          {
            id: 'circadian-clock',
            title: language === 'RU' ? 'Циркадные часы, мелатонин и гомеостатическое давление сна' : language === 'EN' ? 'Circadian timing, melatonin and homeostatic sleep pressure' : 'Циркадтық сағат, мелатонин және ұйқының гомеостатикалық қысымы',
            blocks: [{ type: 'paragraph' as const, text: language === 'RU'
              ? 'Супрахиазматическое ядро получает информацию об освещённости от внутренне фоточувствительных ганглиозных клеток сетчатки по ретиногипоталамическому пути. Молекулярные петли обратной связи генов CLOCK, BMAL1, PER и CRY поддерживают близкие к суточным колебания нейронной активности. Через многоступенчатые вегетативные связи биологические часы регулируют ночную секрецию мелатонина эпифизом; мелатонин является сигналом биологической ночи, но не единственным механизмом засыпания. Гомеостатическое давление сна увеличивается при длительном бодрствовании, а циркадная система определяет временные окна повышенной сонливости и бодрости. Поэтому одинаковая длительность сна не гарантирует одинаковую работоспособность при разных циркадных фазах.'
              : language === 'EN'
                ? 'The suprachiasmatic nucleus receives light information from intrinsically photosensitive retinal ganglion cells through the retinohypothalamic tract. Molecular feedback loops involving CLOCK, BMAL1, PER and CRY support near-24-hour rhythms in neural activity. Through multisynaptic autonomic pathways, the clock regulates nocturnal pineal melatonin secretion; melatonin signals biological night but is not the sole cause of sleep onset. Homeostatic sleep pressure increases during sustained wakefulness, while the circadian system shapes periods of sleep propensity and alertness. Equal sleep duration therefore does not guarantee equal performance at different circadian phases.'
                : 'Супрахиазматикалық ядро торқабықтың ішкі фотосезімтал ганглиоздық жасушаларынан ретиногипоталамустық жол арқылы жарық туралы ақпарат алады. CLOCK, BMAL1, PER және CRY гендерінің кері байланыс ілмектері тәулікке жуық ырғақтарды сақтайды. Көпсатылы вегетативтік жолдар арқылы биологиялық сағат эпифиздің түнгі мелатонин секрециясын реттейді; мелатонин биологиялық түннің сигналы, бірақ ұйықтаудың жалғыз механизмі емес. Ұзақ сергектік кезінде ұйқының гомеостатикалық қысымы артады, ал циркадтық жүйе ұйқышылдық пен сергектіктің уақытын анықтайды.' }],
          },
          {
            id: 'sleep-measurement',
            title: language === 'RU' ? 'Полисомнография и клиническая интерпретация' : language === 'EN' ? 'Polysomnography and clinical interpretation' : 'Полисомнография және клиникалық түсіндіру',
            blocks: [{ type: 'paragraph' as const, text: language === 'RU'
              ? 'Полисомнография объединяет ЭЭГ, электроокулограмму и подбородочную ЭМГ, а при исследовании дыхательных нарушений также регистрирует поток воздуха, дыхательные усилия и сатурацию кислорода. Стадия N3 характеризуется выраженной медленноволновой активностью, а REM — быстрыми движениями глаз и низким мышечным тонусом. Ночные пробуждения, лекарства, возраст и условия записи изменяют архитектуру сна. Жалоба на дневную сонливость не равнозначна диагнозу апноэ сна или нарколепсии: необходимо оценить продолжительность сна, график, симптомы, лекарства и при показаниях провести специальные исследования. Учебная симуляция стадий сна не заменяет клиническую полисомнографию.'
              : language === 'EN'
                ? 'Polysomnography combines EEG, electrooculography and chin EMG, and for breathing-related disorders also measures airflow, respiratory effort and oxygen saturation. N3 sleep is characterized by prominent slow-wave activity, while REM includes rapid eye movements and low muscle tone. Awakenings, medication, age and recording conditions alter sleep architecture. Daytime sleepiness alone does not establish sleep apnea or narcolepsy: sleep duration, schedule, symptoms, medications and indicated investigations must be considered. A teaching sleep-stage simulation does not replace clinical polysomnography.'
                : 'Полисомнография ЭЭГ, электроокулограмма және иек ЭМГ-сін біріктіреді, ал тыныс бұзылыстарында ауа ағынын, тыныс күшін және оттегі сатурациясын да тіркейді. N3 кезеңі айқын баяу толқынды белсенділікпен, REM жылдам көз қозғалыстарымен және бұлшықет тонусының төмендігімен сипатталады. Оянулар, дәрілер, жас және жазба жағдайлары ұйқы құрылымын өзгертеді. Күндізгі ұйқышылдық өздігінен апноэ не нарколепсия диагнозы емес: ұйқы ұзақтығын, кестесін, симптомдар мен дәрілерді ескеру керек. Оқу симуляциясы клиникалық полисомнографияны алмастырмайды.' }],
          },
        ] : []),
        ...(topic.id === 21 ? [
          {
            id: 'auditory-transduction',
            title: language === 'RU' ? 'Слух: улитка, волосковые клетки и тонотопия' : language === 'EN' ? 'Hearing: cochlea, hair cells and tonotopy' : 'Есту: ұлу, түкті жасушалар және тонотопия',
            blocks: [{ type: 'paragraph' as const, text: language === 'RU'
              ? 'Звуковые колебания через барабанную перепонку и слуховые косточки передаются к овальному окну. Движение жидкости улитки создаёт бегущую волну на базилярной мембране: её основание преимущественно отвечает на высокие частоты, верхушка — на низкие. Смещение стереоцилий волосковых клеток натягивает тип-линки и открывает механочувствительные каналы. Благодаря богатой калием эндолимфе вход K⁺ деполяризует клетку; затем Ca²⁺-зависимое высвобождение глутамата активирует афференты спирального ганглия. Внутренние волосковые клетки передают основную сенсорную информацию, а наружные усиливают и уточняют механические колебания за счёт электромотильности белка престина. Слуховая информация проходит через кохлеарные ядра, верхнюю оливу, латеральную петлю, нижние холмики, медиальное коленчатое тело к слуховой коре; двусторонние связи объясняют, почему одностороннее центральное поражение обычно не вызывает полной глухоты одного уха.'
              : language === 'EN'
                ? 'Sound travels through the tympanic membrane and ossicles to the oval window. Fluid motion in the cochlea produces a traveling wave along the basilar membrane: its base is tuned mainly to high frequencies and apex to low frequencies. Deflection of hair-cell stereocilia tensions tip links and opens mechanotransduction channels. Potassium-rich endolymph supports K⁺ entry and depolarization; Ca²⁺-dependent glutamate release then activates spiral-ganglion afferents. Inner hair cells provide most sensory transmission, while outer hair cells amplify and sharpen basilar-membrane motion through prestin-mediated electromotility. Auditory signals pass through cochlear nuclei, superior olivary circuits, lateral lemniscus, inferior colliculus and medial geniculate body to auditory cortex. Extensive bilateral pathways explain why a unilateral central lesion rarely causes complete deafness in one ear.'
                : 'Дыбыс дабыл жарғағы мен есту сүйекшелері арқылы сопақ терезеге беріледі. Ұлу сұйықтығының қозғалысы базилярлық мембранада жүретін толқын туғызады: негізі жоғары, ұшы төмен жиіліктерге сезімтал. Түкті жасушалардың стереоцилиялары ығысқанда тип-линктер керіліп, механосезімтал арналар ашылады. Калийге бай эндолимфадан K⁺ кіруі деполяризация туғызады, ал Ca²⁺-тәуелді глутамат бөлінуі спиралдық ганглий афференттерін белсендіреді. Ішкі түкті жасушалар негізгі сенсорлық ақпаратты өткізеді, сыртқылары престин арқылы тербелісті күшейтеді. Сигнал кохлеарлық ядролар, жоғарғы олива, латералдық ілмек, төменгі төмпешік және медиалдық тізелі дене арқылы есту қыртысына өтеді.' }],
          },
          {
            id: 'vestibular-physiology',
            title: language === 'RU' ? 'Вестибулярная система и вестибулоокулярный рефлекс' : language === 'EN' ? 'Vestibular system and vestibulo-ocular reflex' : 'Вестибулярлық жүйе және вестибулоокулярлық рефлекс',
            blocks: [{ type: 'paragraph' as const, text: language === 'RU'
              ? 'Полукружные каналы реагируют преимущественно на угловое ускорение головы: инерция эндолимфы отклоняет купулу и изменяет активность волосковых клеток ампулярных гребешков. Маточка и мешочек содержат отолитовую мембрану с кристаллами карбоната кальция; они кодируют линейное ускорение и положение относительно силы тяжести. Вестибулярные ядра связаны с глазодвигательными ядрами через медиальный продольный пучок. При повороте головы вправо вестибулоокулярный рефлекс смещает глаза влево, помогая стабилизировать изображение на сетчатке. Одностороннее нарушение вестибулярного входа может вызвать головокружение, нистагм и постуральную неустойчивость; однако центральные и периферические причины требуют различения по совокупности клинических признаков.'
              : language === 'EN'
                ? 'Semicircular canals respond mainly to angular head acceleration: endolymph inertia deflects the cupula and changes hair-cell firing in the ampullary cristae. The utricle and saccule contain otolithic membranes with calcium carbonate crystals, encoding linear acceleration and head orientation relative to gravity. Vestibular nuclei connect with ocular motor nuclei through the medial longitudinal fasciculus. During a rightward head turn, the vestibulo-ocular reflex moves the eyes leftward to stabilize the retinal image. Unilateral vestibular dysfunction may produce vertigo, nystagmus and postural imbalance, but central and peripheral causes require differentiation using the full clinical picture.'
                : 'Жартылай шеңберлі өзектер бастың бұрыштық үдеуіне жауап береді: эндолимфа инерциясы купуланы ығыстырып, ампулалық қырлардағы түкті жасушалар белсенділігін өзгертеді. Маточка мен қапшықтағы кальций карбонаты кристалдары бар отолит мембранасы сызықтық үдеуді және ауырлық күшіне қатысты қалпын кодтайды. Вестибулярлық ядролар медиалдық бойлық шоғыр арқылы көзқимылдатқыш ядролармен байланысады. Бас оңға бұрылғанда вестибулоокулярлық рефлекс көзді солға жылжытып, торқабықтағы кескінді тұрақтандырады. Бір жақты бұзылыс бас айналу, нистагм және тепе-теңдік бұзылуын туғызуы мүмкін; орталық және шеткі себептерді клиникалық белгілер жиынтығымен ажырату қажет.' }],
          },
          {
            id: 'chemosensory-systems',
            title: language === 'RU' ? 'Вкус и обоняние: рецепторы, пути и клинические различия' : language === 'EN' ? 'Taste and olfaction: receptors, pathways and clinical distinctions' : 'Дәм және иіс сезу: рецепторлар, жолдар және клиникалық айырмашылықтар',
            blocks: [{ type: 'paragraph' as const, text: language === 'RU'
              ? 'Вкусовые рецепторные клетки вкусовых почек распознают сладкое, горькое и умами преимущественно через G-белок-связанные рецепторы, а солёное и кислое — через ионные механизмы. Афферентная информация поступает по VII, IX и X черепным нервам в ростральную часть ядра одиночного пути, затем через таламические и корковые сети, включая островковую кору. Обонятельные рецепторные нейроны эпителия используют рецепторы, связанные с G-белком Golf; их аксоны проходят через решётчатую пластинку к клубочкам обонятельной луковицы. Первичные обонятельные проекции достигают обонятельной коры без обязательного первичного переключения в таламусе. При жалобах на потерю вкуса следует отдельно проверять истинную вкусовую чувствительность и ретроназальное обоняние: субъективная «потеря вкуса» нередко связана с нарушением обоняния.'
              : language === 'EN'
                ? 'Taste receptor cells in taste buds detect sweet, bitter and umami mainly through G-protein-coupled receptors, while salty and sour transduction uses ion-dependent mechanisms. Afferent signals travel in cranial nerves VII, IX and X to the rostral nucleus of the solitary tract and then through thalamic and cortical networks including the insula. Olfactory sensory neurons use Golf-coupled receptors; their axons cross the cribriform plate to glomeruli in the olfactory bulb. Primary olfactory projections reach olfactory cortex without an obligatory first thalamic relay. When a patient reports loss of taste, true gustatory function should be distinguished from retronasal smell, because perceived flavor loss often reflects olfactory dysfunction.'
                : 'Дәм бүршіктерінің рецепторлық жасушалары тәтті, ащы және умами дәмдерін негізінен G-ақуызбен байланысқан рецепторлармен, ал тұзды және қышқыл дәмдерді иондық механизмдермен қабылдайды. Афференттік сигнал VII, IX және X бассүйек нервтері арқылы жалғыз жол ядросының ростралдық бөлігіне, одан таламус пен аралшық қыртысын қамтитын желілерге өтеді. Иіс сезу нейрондарының Golf-пен байланысқан рецепторлары бар; олардың аксондары торлы пластинкадан өтіп, иіс сезу баданасының шумақтарына жетеді. Алғашқы иіс проекциялары міндетті бастапқы таламустық ауысусыз иіс қыртысына барады. Дәм жоғалуына шағымданғанда шынайы дәм сезуді ретроназалдық иіс сезуден ажырату қажет.' }],
          },
        ] : []),
        ...(topic.id === 20 ? [
          {
            id: 'visual-retinal-circuit',
            title: language === 'RU' ? 'Сетчатка: фототрансдукция и обработка сигнала' : language === 'EN' ? 'Retina: phototransduction and signal processing' : 'Торқабық: фототрансдукция және сигналды өңдеу',
            blocks: [{ type: 'paragraph' as const, text: language === 'RU'
              ? 'Свет активирует опсин в палочках и колбочках, запускает каскад трансдуцина и фосфодиэстеразы, снижает концентрацию цГМФ и закрывает цГМФ-зависимые катионные каналы наружного сегмента. Фоторецептор гиперполяризуется и уменьшает выделение глутамата. ON- и OFF-биполярные клетки реагируют на это изменение противоположным образом благодаря разным типам рецепторов. Горизонтальные и амакриновые клетки формируют пространственную и временную обработку, а ганглиозные клетки передают потенциалы действия по зрительному нерву.'
              : language === 'EN'
                ? 'Light activates opsin in rods and cones, triggering the transducin–phosphodiesterase cascade, reducing cGMP and closing cGMP-gated cation channels in the outer segment. Photoreceptors hyperpolarize and release less glutamate. ON and OFF bipolar cells respond oppositely because of different receptor mechanisms. Horizontal and amacrine cells shape spatial and temporal processing, while retinal ganglion cells send action potentials along the optic nerve.'
                : 'Жарық таяқшалар мен сауытшалардағы опсинді белсендіріп, трансдуцин–фосфодиэстераза каскадын іске қосады, цГМФ мөлшерін азайтады және сыртқы сегменттің цГМФ-тәуелді катиондық арналарын жабады. Фоторецептор гиперполяризацияланып, глутамат бөлінуін азайтады. ON және OFF биполярлық жасушалар әртүрлі рецепторлық механизмдерге байланысты қарама-қарсы жауап береді. Горизонталдық және амакриндік жасушалар кеңістіктік әрі уақыттық өңдеуге қатысады, ал ганглиоздық жасушалар әрекет потенциалдарын көру нервімен өткізеді.' }],
          },
          {
            id: 'visual-pathway-localization',
            title: language === 'RU' ? 'Зрительные пути и локализация дефектов поля зрения' : language === 'EN' ? 'Visual pathways and visual-field localization' : 'Көру жолдары және көру өрісі ақауын локализациялау',
            blocks: [{ type: 'paragraph' as const, text: language === 'RU'
              ? 'В хиазме перекрещиваются преимущественно аксоны ганглиозных клеток носовых половин сетчатки; волокна височных половин остаются на своей стороне. Поэтому зрительный тракт несёт информацию о противоположной половине зрительного поля обоих глаз. Поражение хиазмы часто вызывает битемпоральную гемианопсию, а ретрохиазмальное поражение — контралатеральный гомонимный дефект. Повреждение височной петли Мейера вызывает контралатеральную верхнеквадрантную гемианопсию, поскольку она несёт сигналы от нижних отделов сетчатки. Локализацию уточняют периметрией и нейровизуализацией.'
              : language === 'EN'
                ? 'At the optic chiasm, axons from nasal retinal hemifields predominantly cross, whereas temporal retinal axons remain ipsilateral. Each optic tract therefore carries information from the opposite visual hemifield of both eyes. Chiasmal lesions often produce bitemporal hemianopia, while retrochiasmal lesions produce contralateral homonymous field defects. Injury to the temporal Meyer loop causes contralateral superior quadrantanopia because it carries signals from the inferior retina. Perimetry and neuroimaging help refine localization.'
                : 'Көру хиазмасында торқабықтың мұрындық жартысынан шыққан аксондар негізінен айқасады, ал самайлық жартысының талшықтары өз жағында қалады. Сондықтан әр көру тракты екі көздің қарама-қарсы көру жарты өрісінен ақпарат өткізеді. Хиазма зақымы жиі битемпоралдық гемианопсияға, ал хиазмадан кейінгі зақым қарама-қарсы гомонимдік ақауға әкеледі. Самайдағы Мейер ілмегі зақымданса, торқабықтың төменгі бөлігінен сигнал өткізетіндіктен қарама-қарсы жоғарғы квадранттық гемианопсия туындайды. Локализация периметрия және нейровизуализация арқылы нақтыланады.' }],
          },
        ] : []),
        ...(topic.id === 19 ? [
          {
            id: 'somatosensory-pathways',
            title: language === 'RU' ? 'Соматосенсорные пути и перекрёст' : language === 'EN' ? 'Somatosensory pathways and decussation' : 'Соматосенсорлық жолдар және айқасу',
            blocks: [{ type: 'paragraph' as const, text: language === 'RU'
              ? 'Тонкое осязание, вибрация и сознательная проприоцепция от туловища и конечностей преимущественно передаются по задним столбам к ядрам тонкого и клиновидного пучков в продолговатом мозге. Аксоны нейронов второго порядка перекрещиваются и формируют медиальную петлю, направляющуюся к вентральному заднелатеральному ядру таламуса. Болевая и температурная чувствительность передаётся через нейроны заднего рога; большинство вторичных аксонов пересекают переднюю белую спайку вблизи уровня входа и поднимаются в переднебоковой системе. Поэтому сторона и уровень нарушения чувствительности зависят от локализации очага.'
              : language === 'EN'
                ? 'Discriminative touch, vibration and conscious proprioception from the trunk and limbs travel mainly in the dorsal columns to the gracile and cuneate nuclei of the medulla. Second-order axons cross and form the medial lemniscus, projecting to the ventral posterolateral thalamus. Pain and temperature signals synapse in the dorsal horn; most second-order axons cross through the anterior white commissure near the entry level and ascend in the anterolateral system. The side and level of sensory loss therefore depend on lesion location.'
                : 'Дене мен аяқ-қолдан келетін нәзік жанасу, діріл және саналы проприоцепция негізінен артқы бағандармен сопақша мидағы нәзік және сына тәрізді ядроларға өтеді. Екінші реттік нейрон аксондары айқасып, таламустың вентралды артқы латералды ядросына баратын медиалдық ілмекті құрайды. Ауырсыну мен температура сигналдары артқы мүйізде синапс түзеді; екінші реттік аксондардың көбі кірген деңгейге жақын алдыңғы ақ комиссура арқылы айқасып, алдыңғы-бүйір жүйемен жоғарылайды. Сондықтан сезімталдық бұзылысының жағы мен деңгейі зақым орнына тәуелді.' }],
          },
          {
            id: 'somatosensory-cortex',
            title: language === 'RU' ? 'Соматотопия и корковая обработка' : language === 'EN' ? 'Somatotopy and cortical processing' : 'Соматотопия және қыртыстық өңдеу',
            blocks: [{ type: 'paragraph' as const, text: language === 'RU'
              ? 'Первичная соматосенсорная кора располагается преимущественно в постцентральной извилине и включает поля Бродмана 3a, 3b, 1 и 2. В ней сохраняется упорядоченное представительство частей тела, но площадь коркового представительства отражает плотность рецепторов и функциональные требования, а не физический размер органа. Восприятие сложных признаков предмета зависит также от вторичной соматосенсорной и теменной ассоциативной коры. При осмотре необходимо раздельно проверять болевую, температурную, вибрационную и суставно-мышечную чувствительность; один отрицательный тест не исключает нарушения других модальностей.'
              : language === 'EN'
                ? 'Primary somatosensory cortex lies mainly in the postcentral gyrus and includes Brodmann areas 3a, 3b, 1 and 2. Body regions are represented somatotopically, but cortical representation size reflects receptor density and functional demand rather than physical body-part size. Complex tactile object recognition also involves secondary somatosensory and parietal association cortices. Examination should test pain, temperature, vibration and joint position separately; a normal result in one modality does not exclude deficits in another.'
                : 'Біріншілік соматосенсорлық қыртыс негізінен постцентралдық иірімде орналасып, Бродманның 3a, 3b, 1 және 2 аймақтарын қамтиды. Дене бөліктері соматотопиялық ретпен бейнеленеді, бірақ қыртыстық өкілдік көлемі мүшенің физикалық өлшеміне емес, рецепторлар тығыздығы мен функционалдық қажеттілікке тәуелді. Заттың күрделі тактильдік белгілерін тануға екіншілік соматосенсорлық және төбелік ассоциативтік қыртыстар да қатысады. Тексеруде ауырсыну, температура, діріл және буын қалпын сезуді бөлек бағалау керек; бір модальділіктің қалыпты болуы басқасының бұзылуын жоққа шығармайды.' }],
          },
        ] : []),
        ...(topic.id === 17 ? [
          {
            id: 'amygdala-nuclei',
            title: language === 'RU' ? 'Ядерные комплексы миндалины и связи' : language === 'EN' ? 'Amygdala nuclear groups and connections' : 'Амигдала ядролары және байланыстары',
            blocks: [{ type: 'paragraph' as const, text: language === 'RU'
              ? 'Миндалина — группа ядер медиальной височной области, а не единый центр страха. Базолатеральный комплекс получает обработанную сенсорную информацию из таламуса и коры и участвует в ассоциативном обучении и оценке значимости сигналов. Центральное ядро связано с гипоталамусом и стволовыми структурами, регулирующими вегетативные и поведенческие компоненты защитных реакций. Между ядрами существуют тормозные и возбуждающие связи, поэтому итоговый ответ зависит от контекста и состояния сети.'
              : language === 'EN'
                ? 'The amygdala is a group of nuclei in the medial temporal region, not a single fear center. The basolateral complex receives processed sensory information from thalamic and cortical pathways and contributes to associative learning and salience evaluation. The central nucleus connects with hypothalamic and brainstem circuits that organize autonomic and behavioral components of defensive responses. Excitatory and inhibitory interactions between nuclei make the final response context-dependent.'
                : 'Амигдала — медиалдық самай аймағындағы ядролар тобы, бір ғана қорқыныш орталығы емес. Базолатералдық кешен таламус пен қыртыстан өңделген сенсорлық ақпарат алып, ассоциативтік үйренуге және сигналдың маңызын бағалауға қатысады. Орталық ядро қорғаныс жауабының вегетативтік және мінез-құлықтық бөліктерін реттейтін гипоталамус және ми бағаны тізбектерімен байланысады. Ядролар арасындағы қоздырғыш және тежегіш байланыстар жауаптың контекстке тәуелді болуына әкеледі.' }],
          },
          {
            id: 'amygdala-learning',
            title: language === 'RU' ? 'Эмоциональное обучение и угасание' : language === 'EN' ? 'Emotional learning and extinction' : 'Эмоциялық үйрену және сөну',
            blocks: [{ type: 'paragraph' as const, text: language === 'RU'
              ? 'При обусловливании угрозы нейтральный сигнал после сочетания с неприятным событием начинает вызывать предвосхищающие реакции. Изменения синаптической эффективности в миндалине и связанных областях способствуют формированию этой ассоциации. Угасание после многократного предъявления сигнала без неприятного события — не простое стирание старой памяти: формируется новое тормозное обучение, в котором участвуют вентромедиальная префронтальная кора и гиппокамп. Возобновление реакции в другом контексте показывает зависимость воспоминания от условий.'
              : language === 'EN'
                ? 'During threat conditioning, a previously neutral cue acquires the capacity to evoke anticipatory responses after pairing with an aversive event. Synaptic plasticity in the amygdala and connected regions contributes to this association. Extinction after repeated cue presentations without the aversive event is not simply erasure of the original memory; new inhibitory learning involves ventromedial prefrontal and hippocampal circuits. Renewal in a different context illustrates context-dependent retrieval.'
                : 'Қауіпке шарттануда бұрын бейтарап сигнал жағымсыз оқиғамен байланыстырылғаннан кейін алдын ала жауап туғыза бастайды. Амигдала мен оған байланысты аймақтардағы синапстық пластикалылық осы ассоциацияның қалыптасуына қатысады. Жағымсыз оқиғасыз сигналды қайталап көрсеткенде жауаптың сөнуі бұрынғы жадтың жай өшірілуі емес: вентромедиалдық префронталдық қыртыс пен гиппокамп қатысатын жаңа тежегіш үйрену қалыптасады. Басқа контексте жауаптың қайта пайда болуы жадтың жағдайға тәуелділігін көрсетеді.' }],
          },
          {
            id: 'amygdala-clinical',
            title: language === 'RU' ? 'Клиническое значение и ограничения' : language === 'EN' ? 'Clinical relevance and limitations' : 'Клиникалық маңызы және шектеулері',
            blocks: [{ type: 'paragraph' as const, text: language === 'RU'
              ? 'Нарушения миндалевидных и префронтальных сетей могут влиять на распознавание эмоциональной значимости и обучение, связанное с угрозой. Однако выраженность тревоги или реакция на отдельный стимул не позволяют локализовать поражение исключительно в миндалине. Интерпретация требует учёта внимания, памяти, контекста, лекарств и сопутствующих состояний. Учебная схема эмоциональной реакции не является диагностическим тестом.'
              : language === 'EN'
                ? 'Disruption of amygdala–prefrontal networks can affect recognition of emotional significance and threat-related learning. However, anxiety severity or response to a single stimulus cannot localize a lesion exclusively to the amygdala. Interpretation must consider attention, memory, context, medications and comorbid conditions. A teaching diagram of emotional responses is not a diagnostic test.'
                : 'Амигдала мен префронталдық желілердің бұзылысы эмоциялық маңыздылықты тануға және қауіпке байланысты үйренуге әсер етуі мүмкін. Алайда үрей деңгейі немесе бір тітіркендіргішке жауап зақымды тек амигдалада деп анықтауға жеткіліксіз. Түсіндіруде зейін, жад, контекст, дәрілер және қатар жүретін жағдайлар ескерілуі керек. Эмоциялық жауаптың оқу сызбасы диагностикалық тест емес.' }],
          },
        ] : []),
        ...(topic.id === 16 ? [
          {
            id: 'limbic-circuitry',
            title: language === 'RU' ? 'Лимбические сети: анатомия и функции' : language === 'EN' ? 'Limbic networks: anatomy and function' : 'Лимбиялық желілер: анатомиясы және қызметі',
            blocks: [{ type: 'paragraph' as const, text: language === 'RU'
              ? 'Лимбическая система не является единым анатомически замкнутым «центром эмоций». Гиппокампальная формация участвует в формировании эпизодической и пространственной памяти; миндалина — в оценке биологической значимости стимулов и эмоциональном обучении; поясная кора, островок и медиальная префронтальная кора интегрируют интероцепцию, мотивацию и контроль поведения. Их функции реализуются во взаимодействующих сетях с таламусом, гипоталамусом и стволом мозга.'
              : language === 'EN'
                ? 'The limbic system is not a single anatomically closed “emotion center.” The hippocampal formation contributes to episodic and spatial memory; the amygdala to evaluating stimulus significance and emotional learning; and cingulate, insular and medial prefrontal cortices to integrating interoception, motivation and behavioral control. These functions emerge from interacting networks involving the thalamus, hypothalamus and brainstem.'
                : 'Лимбиялық жүйе анатомиялық тұрғыдан тұйық біртұтас «эмоция орталығы» емес. Гиппокамптық формация эпизодтық және кеңістіктік жадқа, амигдала тітіркендіргіштің биологиялық маңызын бағалауға және эмоциялық үйренуге қатысады. Белдеулік, аралшық және медиалдық префронталдық қыртыстар интероцепцияны, мотивацияны және мінез-құлықты бақылауды біріктіреді. Бұл қызметтер таламус, гипоталамус және ми бағанымен өзара байланысқан желілерде жүзеге асады.' }],
          },
          {
            id: 'limbic-memory',
            title: language === 'RU' ? 'Гиппокамп, память и консолидация' : language === 'EN' ? 'Hippocampus, memory and consolidation' : 'Гиппокамп, жад және консолидация',
            blocks: [{ type: 'paragraph' as const, text: language === 'RU'
              ? 'Энторинальная кора обеспечивает важный вход к гиппокампальной формации. В классическом трисинаптическом пути информация проходит через зубчатую извилину, CA3 и CA1, хотя реальная организация включает дополнительные прямые и обратные связи. Синаптическая пластичность, включая долговременную потенциацию, способствует изменению связей при обучении. Гиппокамп необходим для нормального формирования многих новых декларативных воспоминаний, но не является единственным местом долговременного хранения всей памяти.'
              : language === 'EN'
                ? 'The entorhinal cortex provides major input to the hippocampal formation. In the classic trisynaptic circuit, information passes through dentate gyrus, CA3 and CA1, although actual organization includes additional direct and recurrent pathways. Synaptic plasticity, including long-term potentiation, contributes to learning-related connectivity changes. The hippocampus is important for forming many new declarative memories, but is not the sole long-term storage site for all memory.'
                : 'Энториналдық қыртыс гиппокамптық формацияға маңызды кіріс береді. Классикалық үш синапстық тізбекте ақпарат тісті иірім, CA3 және CA1 арқылы өтеді, бірақ нақты жүйеде қосымша тікелей және кері байланыстар бар. Ұзақ мерзімді потенциацияны қоса алғанда, синапстық пластикалылық үйрену кезінде байланыстардың өзгеруіне ықпал етеді. Гиппокамп көптеген жаңа декларативтік естеліктердің қалыптасуы үшін маңызды, бірақ барлық жадтың жалғыз ұзақ мерзімді сақтау орны емес.' }],
          },
          {
            id: 'limbic-clinical',
            title: language === 'RU' ? 'Клинические примеры и ограничения локализации' : language === 'EN' ? 'Clinical examples and localization limits' : 'Клиникалық мысалдар және локализация шектеулері',
            blocks: [{ type: 'paragraph' as const, text: language === 'RU'
              ? 'Двустороннее повреждение медиальных височных структур может вызывать выраженную антероградную амнезию при относительно сохранных некоторых формах процедурного обучения. Однако нарушения памяти, тревоги и эмоций редко объясняются повреждением одного изолированного «лимбического центра». Для клинической локализации необходимо сопоставлять характер нарушений, неврологический осмотр, нейропсихологические данные и методы визуализации.'
              : language === 'EN'
                ? 'Bilateral injury to medial temporal structures can produce severe anterograde amnesia while leaving some procedural learning relatively preserved. Yet memory, anxiety and emotional disturbances are rarely explained by a single isolated “limbic center.” Clinical localization requires symptom patterns, neurological examination, neuropsychological assessment and imaging to be interpreted together.'
                : 'Медиалдық самай құрылымдарының екі жақты зақымдануы кейбір процедуралық үйрену түрлері салыстырмалы сақталған кезде айқын антероградтық амнезия туғызуы мүмкін. Дегенмен жад, үрей және эмоция бұзылыстарын бір ғана оқшау «лимбиялық орталықпен» түсіндіру сирек дұрыс болады. Клиникалық локализация үшін симптом сипатын, неврологиялық тексеруді, нейропсихологиялық деректерді және бейнелеу нәтижелерін бірге бағалау қажет.' }],
          },
        ] : []),
        ...(topic.id === 15 ? [
          {
            id: 'hypothalamic-organization',
            title: language === 'RU' ? 'Ядра гипоталамуса и функциональная организация' : language === 'EN' ? 'Hypothalamic nuclei and functional organization' : 'Гипоталамус ядролары және функционалдық ұйымдасу',
            blocks: [{ type: 'paragraph' as const, text: language === 'RU'
              ? 'Гипоталамус объединяет сигналы о температуре, осмоляльности, энергетическом состоянии и циркадном времени. Супраоптическое и паравентрикулярное ядра содержат магноцеллюлярные нейроны, аксоны которых оканчиваются в нейрогипофизе и выделяют вазопрессин или окситоцин. Парвоцеллюлярные нейроны, в том числе паравентрикулярного ядра, регулируют аденогипофиз через рилизинг-факторы портальной системы. Супрахиазматическое ядро синхронизирует суточные ритмы по световым сигналам сетчатки; латеральная и дугообразная области участвуют в регуляции пищевого поведения и энергетического обмена.'
              : language === 'EN'
                ? 'The hypothalamus integrates information about temperature, osmolality, energy state and circadian timing. Magnocellular neurons in the supraoptic and paraventricular nuclei project to the posterior pituitary and release vasopressin or oxytocin. Parvocellular neurons, including those in the paraventricular nucleus, regulate the anterior pituitary through releasing factors delivered via the portal circulation. The suprachiasmatic nucleus synchronizes circadian rhythms to retinal light signals; lateral and arcuate regions contribute to feeding and energy regulation.'
                : 'Гипоталамус температура, осмолялдық, энергетикалық күй және тәуліктік уақыт туралы ақпаратты біріктіреді. Супраоптикалық және паравентрикулярлық ядролардың магноцеллюлярлық нейрондары нейрогипофизге проекция жасап, вазопрессин не окситоцин бөледі. Паравентрикулярлық ядроны қоса алғанда, парвоцеллюлярлық нейрондар портальды қанайналым арқылы аденогипофизді рилизинг-факторлармен реттейді. Супрахиазматикалық ядро торқабықтан келген жарық сигналына сай тәуліктік ырғақты синхрондайды; латералды және доғалы аймақтар қоректену мен энергия алмасуына қатысады.' }],
          },
          {
            id: 'hypothalamic-osmoregulation',
            title: language === 'RU' ? 'Осморегуляция и отрицательная обратная связь' : language === 'EN' ? 'Osmoregulation and negative feedback' : 'Осмореттелу және теріс кері байланыс',
            blocks: [{ type: 'paragraph' as const, text: language === 'RU'
              ? 'При увеличении эффективной осмоляльности плазмы осмочувствительные нейроны и структуры передней стенки III желудочка усиливают жажду и секрецию вазопрессина. Вазопрессин через V2-рецепторы собирательных трубочек повышает вставку аквапорина-2 в апикальную мембрану и увеличивает реабсорбцию воды. При снижении осмоляльности секреция подавляется. Изменение эффективного объёма циркулирующей крови через барорецепторные пути также регулирует вазопрессин, поэтому его уровень нельзя объяснять только концентрацией натрия.'
              : language === 'EN'
                ? 'A rise in effective plasma osmolality activates osmosensitive neurons and structures around the anterior third ventricle, increasing thirst and vasopressin release. Through V2 receptors in collecting ducts, vasopressin promotes aquaporin-2 insertion into the apical membrane and increases water reabsorption. Falling osmolality suppresses secretion. Changes in effective circulating volume also regulate vasopressin through baroreceptor pathways, so sodium concentration alone does not determine its level.'
                : 'Плазманың тиімді осмолялдығы артқанда осмосезімтал нейрондар және III қарыншаның алдыңғы қабырғасына жақын құрылымдар шөлдеуді және вазопрессин бөлінуін күшейтеді. Вазопрессин жинағыш түтікшелердегі V2-рецепторлар арқылы аквапорин-2-нің апикалдық мембранаға енгізілуін арттырып, судың қайта сіңірілуін күшейтеді. Осмолялдық төмендесе, секреция тежеледі. Айналымдағы тиімді қан көлемі барорецепторлық жолдар арқылы вазопрессинді де реттейді, сондықтан оның деңгейін тек натрий концентрациясымен түсіндіруге болмайды.' }],
          },
          {
            id: 'hypothalamic-clinical',
            title: language === 'RU' ? 'Клинические связи и диагностические ограничения' : language === 'EN' ? 'Clinical links and diagnostic limitations' : 'Клиникалық байланыстар және диагностикалық шектеулер',
            blocks: [{ type: 'paragraph' as const, text: language === 'RU'
              ? 'Недостаточная секреция вазопрессина может приводить к центральному несахарному диабету с выделением больших объёмов разбавленной мочи; при нефрогенном несахарном диабете вазопрессин присутствует, но почечный ответ нарушен. Избыточное действие вазопрессина может способствовать гипонатриемии, однако её причины разнообразны. Клиническая интерпретация требует совместной оценки натрия плазмы, осмоляльности крови и мочи, водного баланса и лекарств; одна схема гипоталамуса не устанавливает диагноз.'
              : language === 'EN'
                ? 'Insufficient vasopressin secretion may cause central diabetes insipidus with large volumes of dilute urine; in nephrogenic diabetes insipidus, vasopressin is present but renal responsiveness is impaired. Excess vasopressin action can contribute to hyponatremia, which has multiple possible causes. Interpretation requires plasma sodium, serum and urine osmolality, fluid balance and medication history; an anatomical diagram alone cannot establish a diagnosis.'
                : 'Вазопрессиннің жеткіліксіз бөлінуі көп мөлшерде сұйық несеп бөлінетін орталық қантсыз диабетке әкелуі мүмкін; нефрогендік қантсыз диабетте вазопрессин бар, бірақ бүйректің жауабы бұзылған. Вазопрессин әсерінің артық болуы гипонатриемияға ықпал етуі мүмкін, алайда оның себептері әртүрлі. Клиникалық бағалау үшін плазма натрийін, қан мен несеп осмолялдығын, су балансын және дәрілерді бірге қарастыру қажет; анатомиялық сызба диагноз қоймайды.' }],
          },
        ] : []),
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
        ...(topic.id === 6 ? [
          {
            id: 'integration-electrotonic',
            title: language === 'RU' ? 'Электротоническое распространение и суммация' : language === 'EN' ? 'Electrotonic spread and summation' : 'Электротондық таралу және суммация',
            blocks: [{ type: 'paragraph' as const, text: language === 'RU'
              ? 'Постсинаптические потенциалы являются градуальными изменениями мембранного напряжения. При пассивном распространении по дендриту их амплитуда уменьшается с расстоянием и временем; выраженность затухания зависит от геометрии отростка, мембранного сопротивления и осевого сопротивления цитоплазмы. Временная суммация усиливается, если входы приходят до исчезновения предыдущего потенциала; пространственная зависит не только от числа синапсов, но и от их расположения и электрических свойств дендритов.'
              : language === 'EN'
                ? 'Postsynaptic potentials are graded changes in membrane voltage. As they spread passively along dendrites, their amplitude attenuates with distance and time; attenuation depends on dendritic geometry, membrane resistance and intracellular axial resistance. Temporal summation increases when inputs arrive before the preceding potential has decayed. Spatial summation depends on synapse location and dendritic electrical properties, not merely synapse count.'
                : 'Постсинапстық потенциалдар мембраналық кернеудің градуалды өзгерістері болып табылады. Дендрит бойымен пассивті таралғанда олардың амплитудасы қашықтық пен уақытқа байланысты әлсірейді; бұл дендрит геометриясына, мембрана және цитоплазманың бойлық кедергісіне тәуелді. Уақыттық суммация алдыңғы потенциал өшпей тұрып жаңа кіріс келгенде күшейеді. Кеңістіктік суммация тек синапстар санына емес, олардың орны мен дендриттің электрлік қасиеттеріне байланысты.' }],
          },
          {
            id: 'integration-inhibition',
            title: language === 'RU' ? 'Торможение и шунтирование' : language === 'EN' ? 'Inhibition and shunting' : 'Тежелу және шунттау',
            blocks: [{ type: 'paragraph' as const, text: language === 'RU'
              ? 'Тормозный эффект нельзя определять только по знаку изменения потенциала. Открытие каналов, проводящих Cl⁻ или K⁺, может сдвигать напряжение к соответствующему равновесному потенциалу и увеличивать суммарную мембранную проводимость. При шунтирующем торможении входное сопротивление снижается, поэтому одновременный возбуждающий ток вызывает меньшую деполяризацию даже без выраженной гиперполяризации. Эффект GABA зависит от рецепторов, хлоридного градиента, локализации синапса и состояния клетки.'
              : language === 'EN'
                ? 'Inhibition cannot be identified from voltage polarity alone. Opening Cl⁻- or K⁺-conducting channels can move voltage toward the relevant reversal potential while increasing membrane conductance. During shunting inhibition, lower input resistance reduces the depolarization caused by a simultaneous excitatory current, even without prominent hyperpolarization. GABA responses depend on receptor subtype, chloride gradient, synapse location and cellular state.'
                : 'Тежелуді тек мембраналық потенциал өзгерісінің таңбасымен анықтауға болмайды. Cl⁻ немесе K⁺ өткізетін арналардың ашылуы кернеуді тиісті тепе-теңдік потенциалына жақындатып, мембрананың жалпы өткізгіштігін арттырады. Шунттаушы тежелуде кіріс кедергісі төмендеп, айқын гиперполяризация болмаса да қатар келген қоздырғыш токтың деполяризациясы азаяды. GABA әсері рецепторға, хлорид градиентіне, синапс орнына және жасуша күйіне тәуелді.' }],
          },
          {
            id: 'integration-clinical',
            title: language === 'RU' ? 'Клиническая интерпретация и ограничения модели' : language === 'EN' ? 'Clinical interpretation and model limits' : 'Клиникалық түсіндіру және модель шектеулері',
            blocks: [{ type: 'paragraph' as const, text: language === 'RU'
              ? 'Нарушение баланса возбуждения и торможения может повышать вероятность патологической синхронизации нейронных сетей, однако один повышенный возбуждающий вход не равнозначен диагнозу эпилепсии. В учебной лаборатории сравнивайте силу и время входов, положение тормозного синапса и порог генерации потенциала действия. Упрощённая модель показывает причинные зависимости, но не заменяет многокомпартментную биофизическую модель нейрона или клиническую ЭЭГ.'
              : language === 'EN'
                ? 'Disturbed excitation–inhibition balance can increase the likelihood of abnormal network synchronization, but an increased excitatory input alone does not establish epilepsy. In the teaching laboratory compare input strength and timing, inhibitory synapse location, and action-potential threshold. A simplified model illustrates causal relationships but cannot replace a multicompartment neuronal model or clinical EEG interpretation.'
                : 'Қозу мен тежелу тепе-теңдігінің бұзылуы нейрондық желілердің патологиялық синхрондалу ықтималдығын арттыруы мүмкін, бірақ қоздырғыш кірістің күшеюі өздігінен эпилепсия диагнозын білдірмейді. Оқу зертханасында кіріс күші мен уақытын, тежегіш синапс орнын және әрекет потенциалы табалдырығын салыстырыңыз. Қарапайым модель себеп-салдар байланыстарын түсіндіреді, бірақ көпкомпартментті нейрон моделін немесе клиникалық ЭЭГ талдауын алмастырмайды.' }],
          },
        ] : []),
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
    const relation = physiologicalRelations[topic.id][language];
    const termA = topic.terms[0][language];
    const termB = topic.terms[1][language];
    const outcomeTitles = language === 'RU'
      ? [termA, termB, `Механизм: ${termA} и ${termB}`, 'Прогноз физиологического результата', 'Интерпретация данных и клинический перенос']
      : language === 'EN'
        ? [termA, termB, `Mechanism: ${termA} and ${termB}`, 'Prediction of physiological outcomes', 'Data interpretation and clinical transfer']
        : [termA, termB, `Тетік: ${termA} және ${termB}`, 'Физиологиялық нәтижені болжау', 'Деректерді түсіндіру және клиникалық тасымалдау'];
    const outcomeDescriptions = language === 'RU'
      ? [
          `Объяснять физиологический смысл понятия «${termA}» и его роль в теме «${modules.RU[topic.id - 1]}».`,
          `Различать проявления и функциональное значение «${termB}», связывая их с наблюдаемыми изменениями системы.`,
          `Объяснять причинные связи механизма: ${firstSentence(topic.mechanism.RU)}`,
          `Прогнозировать изменение «${relation.effect}» при изменении «${relation.cause}» и обосновывать промежуточные звенья.`,
          `Интерпретировать экспериментальные и клинические данные с учётом границ вывода: ${firstSentence(topic.interpretation.RU)}`,
        ]
      : language === 'EN'
        ? [
            `Explain the physiological meaning of “${termA}” and its role in “${modules.EN[topic.id - 1]}”.`,
            `Distinguish the manifestations and functional significance of “${termB}” and relate them to observable system changes.`,
            `Explain the causal relationships in the mechanism: ${firstSentence(topic.mechanism.EN)}`,
            `Predict changes in “${relation.effect}” after changing “${relation.cause}” and justify the intermediate links.`,
            `Interpret experimental and clinical evidence while respecting limits of inference: ${firstSentence(topic.interpretation.EN)}`,
          ]
        : [
            `«${termA}» ұғымының физиологиялық мағынасын және «${modules.KZ[topic.id - 1]}» тақырыбындағы рөлін түсіндіру.`,
            `«${termB}» көріністері мен функциялық маңызын ажыратып, оларды жүйедегі байқалатын өзгерістермен байланыстыру.`,
            `Тетіктегі себептік байланыстарды түсіндіру: ${firstSentence(topic.mechanism.KZ)}`,
            `«${relation.cause}» өзгергенде «${relation.effect}» өзгерісін болжап, аралық буындарды негіздеу.`,
            `Қорытынды шектерін ескеріп, эксперименттік және клиникалық деректерді түсіндіру: ${firstSentence(topic.interpretation.KZ)}`,
          ];
    return {
      kind: 'objectives',
      title,
      introduction: language === 'RU' ? 'После изучения модуля студент сможет:' : language === 'EN' ? 'After completing this module, the student will be able to:' : 'Модульді аяқтағаннан кейін студент:',
      outcomes: outcomeTitles.map((outcomeTitle,index)=>({id:`module-${topic.id}-objective-${index+1}`,title:outcomeTitle,description:outcomeDescriptions[index]})),
      navigation: {
        title: language === 'RU' ? 'Перейти к изучению модуля' : language === 'EN' ? 'Continue learning' : 'Модульді оқуға өту',
        pathwayLabel: language === 'RU' ? 'Краткий рекомендуемый маршрут' : language === 'EN' ? 'Suggested short pathway' : 'Ұсынылатын қысқа оқу бағыты',
        links: recommendedPath.map(section => ({ section })),
      },
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
              text: language === 'RU'
                ? `Сопоставьте «${topic.terms[0].RU}» и «${topic.terms[1].RU}»: дайте определения и пример каждого. Затем установите, связаны ли они напрямую, косвенно или описывают разные процессы; обоснуйте ответ.`
                : language === 'EN'
                  ? `Compare “${topic.terms[0].EN}” and “${topic.terms[1].EN}”: define each and give an example. Then decide whether they are directly related, indirectly related, or describe different processes; justify your answer.`
                  : `«${topic.terms[0].KZ}» және «${topic.terms[1].KZ}» ұғымдарын салыстырыңыз: әрқайсысына анықтама мен мысал беріңіз. Олардың тікелей, жанама байланысын немесе бөлек үдерістер екенін анықтап, негіздеңіз.`,
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
              ? `Для мысленного эксперимента выше составьте два возможных результата: один поддерживает ваш прогноз, другой допускает несколько объяснений. Укажите, что это придуманные учебные данные. Сравните силу выводов и предложите дополнительную проверку.`
              : language === 'EN'
                ? `For the thought experiment above, construct two possible results: one supports your prediction and the other admits several explanations. Label these as hypothetical teaching data. Compare the strength of the conclusions and propose an additional check.`
                : `Жоғарыдағы ойша эксперимент үшін екі ықтимал нәтиже құрыңыз: біреуі болжамды қолдайды, екіншісінің бірнеше түсіндірмесі бар. Бұлардың ойдан құрастырылған оқу деректері екенін көрсетіңіз. Қорытындылардың негізділігін салыстырып, қосымша тексеруді ұсыныңыз.` },
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
    const transcript=[...mediaWalkthroughs[topic.id][language]];
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


// Preserve the shared foundation while replacing only the reviewed Module 13 summary.
if (foundationLessons[13]) {
  foundationLessons[13].objectives = {
    RU: createModuleThirteenObjectives("RU"),
    EN: createModuleThirteenObjectives("EN"),
    KZ: createModuleThirteenObjectives("KZ"),
  };
  foundationLessons[13].pretest = {
    RU: createModuleThirteenPretest("RU", modules.RU[12], getSectionTitle("pretest", "RU")),
    EN: createModuleThirteenPretest("EN", modules.EN[12], getSectionTitle("pretest", "EN")),
    KZ: createModuleThirteenPretest("KZ", modules.KZ[12], getSectionTitle("pretest", "KZ")),
  };
  const baseTheoryRU = foundationLessons[13].theory?.RU;
  const baseTheoryEN = foundationLessons[13].theory?.EN;
  const baseTheoryKZ = foundationLessons[13].theory?.KZ;
  if (baseTheoryRU?.kind === "theory" && baseTheoryEN?.kind === "theory" && baseTheoryKZ?.kind === "theory") {
    foundationLessons[13].theory = {
      RU: createModuleThirteenTheory("RU", baseTheoryRU),
      EN: createModuleThirteenTheory("EN", baseTheoryEN),
      KZ: createModuleThirteenTheory("KZ", baseTheoryKZ),
    };
  }
  foundationLessons[13]["one-minute"] = {
    RU: createModuleThirteenSummary("RU"),
    EN: createModuleThirteenSummary("EN"),
    KZ: createModuleThirteenSummary("KZ"),
  };
}

if (foundationLessons[21]?.theory) {
  for (const language of ["RU", "EN", "KZ"] as const) {
    const existing = foundationLessons[21].theory?.[language];
    if (existing?.kind === "theory") {
      const expanded = createModuleTwentyOneTheory(language, existing);
      const seen = new Set<string>();
      const sections = expanded.sections.filter((section) => {
        if (!section.id) return true;
        if (seen.has(section.id)) return false;
        seen.add(section.id);
        return true;
      });
      foundationLessons[21].theory![language] = { ...expanded, sections };
    }
  }
}

if (foundationLessons[21]) {
  for (const language of ["RU", "EN", "KZ"] as const) {
    const cases = foundationLessons[21].cases?.[language];
    if (cases?.kind === "cases") {
      const expanded = extendModuleTwentyOneCases(language, cases);
      const seen = new Set<string>();
      foundationLessons[21].cases![language] = { ...expanded, cases: expanded.cases.filter(item => {
        if (seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
      }) };
    }
    const practice = foundationLessons[21].practice?.[language];
    if (practice?.kind === "practice") {
      foundationLessons[21].practice![language] = extendModuleTwentyOnePractice(language, practice);
    }
  }
}

if (foundationLessons[21]) {
  for (const language of ["RU", "EN", "KZ"] as const) {
    const pretest = foundationLessons[21].pretest?.[language];
    if (pretest?.kind === "pretest") {
      const added = createModuleTwentyOnePretest(language, pretest.title, modules[language][20]);
      const seen = new Set(pretest.questions.map(item => item.id));
      foundationLessons[21].pretest![language] = {
        ...pretest,
        questions: [...pretest.questions, ...added.questions.filter(item => {
          if (seen.has(item.id)) return false;
          seen.add(item.id);
          return true;
        })],
      };
    }
    const test = foundationLessons[21].tests?.[language];
    if (test?.kind === "tests") {
      foundationLessons[21].tests![language] = extendModuleTwentyOneFinalTest(language, test);
    }
  }
}

if (foundationLessons[20]?.theory) {
  for (const language of ["RU", "EN", "KZ"] as const) {
    const existing = foundationLessons[20].theory?.[language];
    if (existing?.kind === "theory") {
      const expanded = createModuleTwentyVisualTheory(language, existing);
      const seen = new Set<string>();
      foundationLessons[20].theory![language] = {
        ...expanded,
        sections: expanded.sections.filter(section => {
          if (!section.id) return true;
          if (seen.has(section.id)) return false;
          seen.add(section.id);
          return true;
        }),
      };
    }
  }
}

if (foundationLessons[20]) {
  for (const language of ["RU", "EN", "KZ"] as const) {
    const cases = foundationLessons[20].cases?.[language];
    if (cases?.kind === "cases") {
      const expanded = extendModuleTwentyCases(language, cases);
      const seen = new Set<string>();
      foundationLessons[20].cases![language] = {
        ...expanded,
        cases: expanded.cases.filter(item => {
          if (seen.has(item.id)) return false;
          seen.add(item.id);
          return true;
        }),
      };
    }
    const practice = foundationLessons[20].practice?.[language];
    if (practice?.kind === "practice") {
      foundationLessons[20].practice![language] = extendModuleTwentyPractice(language, practice);
    }
  }
}

if (foundationLessons[22]) {
  for (const language of ["RU", "EN", "KZ"] as const) {
    const module = foundationLessons[22];
    const theory = module.theory?.[language];
    if (theory?.kind === "theory") {
      const expanded = createModuleTwentyTwoTheory(language, theory);
      const seen = new Set<string>();
      module.theory![language] = { ...expanded, sections: expanded.sections.filter(section => {
        if (!section.id) return true;
        if (seen.has(section.id)) return false;
        seen.add(section.id);
        return true;
      }) };
    }
    const cases = module.cases?.[language];
    if (cases?.kind === "cases") {
      const expanded = extendModuleTwentyTwoCases(language, cases);
      const seen = new Set<string>();
      module.cases![language] = { ...expanded, cases: expanded.cases.filter(item => {
        if (seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
      }) };
    }
    const practice = module.practice?.[language];
    if (practice?.kind === "practice") module.practice![language] = extendModuleTwentyTwoPractice(language, practice);
    const pretest = module.pretest?.[language];
    if (pretest?.kind === "pretest") {
      const added = createModuleTwentyTwoPretest(language, pretest.title, modules[language][21]);
      const seen = new Set(pretest.questions.map(item => item.id));
      module.pretest![language] = { ...pretest, questions: [...pretest.questions, ...added.questions.filter(item => {
        if (seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
      })] };
    }
    const test = module.tests?.[language];
    if (test?.kind === "tests") module.tests![language] = extendModuleTwentyTwoFinalTest(language, test);
  }
}

if (foundationLessons[23]) {
  for (const language of ["RU", "EN", "KZ"] as const) {
    const module = foundationLessons[23];
    const theory = module.theory?.[language];
    if (theory?.kind === "theory") {
      const expanded = createModuleTwentyThreeTheory(language, theory);
      const seen = new Set<string>();
      module.theory![language] = { ...expanded, sections: expanded.sections.filter(item => {
        if (!item.id) return true;
        if (seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
      }) };
    }
    const cases = module.cases?.[language];
    if (cases?.kind === "cases") {
      const expanded = extendModuleTwentyThreeCases(language, cases);
      const seen = new Set<string>();
      module.cases![language] = { ...expanded, cases: expanded.cases.filter(item => {
        if (seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
      }) };
    }
    const practice = module.practice?.[language];
    if (practice?.kind === "practice") module.practice![language] = extendModuleTwentyThreePractice(language, practice);
    const pretest = module.pretest?.[language];
    if (pretest?.kind === "pretest") {
      const added = createModuleTwentyThreePretest(language, pretest.title, modules[language][22]);
      const seen = new Set(pretest.questions.map(item => item.id));
      module.pretest![language] = { ...pretest, questions: [...pretest.questions, ...added.questions.filter(item => {
        if (seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
      })] };
    }
    const test = module.tests?.[language];
    if (test?.kind === "tests") module.tests![language] = extendModuleTwentyThreeFinalTest(language, test);
  }
}

if (foundationLessons[24]) {
  for (const language of ["RU", "EN", "KZ"] as const) {
    const module = foundationLessons[24];
    const theory = module.theory?.[language];
    if (theory?.kind === "theory") {
      const expanded = createModuleTwentyFourSleepTheory(language, theory);
      const seen = new Set<string>();
      module.theory![language] = { ...expanded, sections: expanded.sections.filter(item => {
        if (!item.id) return true;
        if (seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
      }) };
    }
    const cases = module.cases?.[language];
    if (cases?.kind === "cases") {
      const expanded = extendModuleTwentyFourCases(language, cases);
      const seen = new Set<string>();
      module.cases![language] = { ...expanded, cases: expanded.cases.filter(item => {
        if (seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
      }) };
    }
    const practice = module.practice?.[language];
    if (practice?.kind === "practice") module.practice![language] = extendModuleTwentyFourPractice(language, practice);
    const pretest = module.pretest?.[language];
    if (pretest?.kind === "pretest") {
      const added = createModuleTwentyFourPretest(language, pretest.title, modules[language][23]);
      const seen = new Set(pretest.questions.map(item => item.id));
      module.pretest![language] = { ...pretest, questions: [...pretest.questions, ...added.questions.filter(item => {
        if (seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
      })] };
    }
    const test = module.tests?.[language];
    if (test?.kind === "tests") module.tests![language] = extendModuleTwentyFourFinalTest(language, test);
  }
}

if (foundationLessons[25]) {
  for (const language of ["RU", "EN", "KZ"] as const) {
    const module = foundationLessons[25];
    const theory = module.theory?.[language];
    if (theory?.kind === "theory") {
      const expanded = createModuleTwentyFiveTheory(language, theory);
      const seen = new Set<string>();
      module.theory![language] = { ...expanded, sections: expanded.sections.filter(item => {
        if (!item.id) return true;
        if (seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
      }) };
    }
    const cases = module.cases?.[language];
    if (cases?.kind === "cases") {
      const expanded = extendModuleTwentyFiveCases(language, cases);
      const seen = new Set<string>();
      module.cases![language] = { ...expanded, cases: expanded.cases.filter(item => {
        if (seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
      }) };
    }
    const practice = module.practice?.[language];
    if (practice?.kind === "practice") module.practice![language] = extendModuleTwentyFivePractice(language, practice);
    const pretest = module.pretest?.[language];
    if (pretest?.kind === "pretest") {
      const added = createModuleTwentyFivePretest(language, pretest.title, modules[language][24]);
      const seen = new Set(pretest.questions.map(item => item.id));
      module.pretest![language] = { ...pretest, questions: [...pretest.questions, ...added.questions.filter(item => {
        if (seen.has(item.id)) return false;
        seen.add(item.id);
        return true;
      })] };
    }
    const test = module.tests?.[language];
    if (test?.kind === "tests") module.tests![language] = extendModuleTwentyFiveFinalTest(language, test);
  }
}
