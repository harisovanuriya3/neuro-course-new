import type { Language } from '../course';
import type { MediaLesson } from '../media';

// Reviewed against Library: Guyton & Hall 13e ch. 57 (PDF 697–700),
// Ganong 23e ch. 16 (PDF 262–264), Ghai Practical Physiology 8e (PDF 307–309).
// Qualitative teaching diagram only: no neural recordings, timing, or patient diagnosis.
const copy: Record<Language, {
  introduction: string; preview: string; transcript: string[];
  prompt: string; explanation: string;
  options: [string,string,string,string];
  feedback: [string,string,string,string];
}> = {
  RU: {
    introduction: 'Три параллельно взаимодействующих контура базальных ганглиев: прямой, непрямой и гиперпрямой. Схема показывает знаки связей в канонической модели, а не реальные измерения активности нейронов.',
    preview: 'Выберите контур и проследите знак каждой связи до GPi/SNr и таламуса. Сравните прогноз при неизменных остальных входах; не приравнивайте растормаживание таламуса к сокращению мышцы.',
    transcript: [
      'Корковый глутаматергический вход возбуждает определённые популяции нейронов стриатума. Выбор действия зависит от нескольких одновременно активных петель, а не от одной линейной цепи.',
      'Прямой путь: стриатум через ГАМК тормозит GPi/SNr. При фиксированных остальных входах тоническое торможение соответствующих нейронов таламуса уменьшается, что облегчает таламокорковую активность.',
      'Непрямой путь: стриатум тормозит GPe; уменьшение торможения STN позволяет ему сильнее возбуждать GPi/SNr. Тормозный выход к таламусу может увеличиться.',
      'Гиперпрямой путь: часть корковых сигналов возбуждает STN без промежуточного переключения в стриатуме. STN возбуждает GPi/SNr, что может быстро усилить тормозное влияние на таламус. Схема не задаёт числовую латентность.',
      'SNc модулирует стриатум дофамином: в упрощённой модели D1 обычно облегчает активность прямого пути, а D2 снижает активность соответствующих нейронов непрямого пути. Действие зависит от рецептора и контекста.',
      'GPi/SNr не иннервируют скелетную мышцу напрямую. Таламокорковые, стволовые и нисходящие сети участвуют в управлении движением, а конечный нервный выход к мышце обеспечивают нижние мотонейроны.'
    ],
    prompt: 'В учебной модели избирательно активировали стриарные нейроны непрямого пути при неизменных остальных входах. Какой прогноз наиболее обоснован?',
    explanation: 'Торможение GPe уменьшает его тормозное влияние на STN; возбуждающий выход STN к GPi/SNr может возрасти, усиливая торможение соответствующих таламических нейронов. Это условный прогноз для конкретного контура, а не диагноз и не расчёт времени реакции.',
    options: [
      'GPe тормозится, STN растормаживается, GPi/SNr может усилить торможение таламуса.',
      'GPe возбуждается, STN полностью выключается, а GPi/SNr напрямую сокращает мышцу.',
      'Стриатум напрямую возбуждает таламус глутаматом, минуя GPi/SNr.',
      'По одному знаку связи можно вычислить точную латентность движения и установить диагноз.'
    ],
    feedback: [
      'Верно: знак каждого звена непрямого пути указан с учётом промежуточного STN.',
      'Стриарный выход к GPe преимущественно ГАМК-ергический; GPi/SNr не иннервирует мышцу напрямую.',
      'Стриарные проекционные нейроны преимущественно ГАМК-ергические; указанный обход не соответствует этому пути.',
      'Качественная схема не содержит измерений латентности и не является диагностическим тестом.'
    ]
  },
  EN: {
    introduction: 'Three interacting basal-ganglia circuits: direct, indirect and hyperdirect. This diagram depicts signs of connections in a canonical model, not recorded neuronal activity.',
    preview: 'Choose a circuit and trace each connection to GPi/SNr and thalamus. Predict the effect with other inputs held fixed; thalamic disinhibition is not itself muscle contraction.',
    transcript: [
      'Glutamatergic cortical input excites specified striatal neuronal populations. Action selection involves several parallel interacting loops, not one serial chain.',
      'Direct pathway: striatal GABAergic neurons inhibit GPi/SNr. With other inputs fixed, tonic inhibition of the corresponding thalamic neurons decreases, facilitating thalamocortical activity.',
      'Indirect pathway: striatum inhibits GPe; reduced GPe inhibition of STN can increase STN excitation of GPi/SNr, strengthening inhibitory output to thalamus.',
      'Hyperdirect pathway: some cortical signals excite STN without first passing through striatum. STN excites GPi/SNr and can rapidly strengthen thalamic inhibition. No numerical latency is supplied by the diagram.',
      'Dopamine from SNc modulates striatum: in a simplified model D1 generally facilitates direct-pathway neurons while D2 reduces activity of corresponding indirect-pathway neurons. Effects are receptor- and context-dependent.',
      'GPi/SNr do not directly innervate skeletal muscle. Thalamocortical, brainstem and descending networks participate in motor control; lower motor neurons provide the final neural output to muscle.'
    ],
    prompt: 'In a teaching model, indirect-pathway striatal neurons are selectively activated while other inputs are held fixed. Which prediction is best supported?',
    explanation: 'Inhibition of GPe reduces its inhibition of STN; excitatory STN output to GPi/SNr may rise and increase inhibition of the corresponding thalamic neurons. This is a conditional circuit prediction, not a diagnosis or reaction-time calculation.',
    options: [
      'GPe is inhibited, STN is disinhibited, and GPi/SNr may increase inhibition of thalamus.',
      'GPe is excited, STN switches off completely, and GPi/SNr directly contracts muscle.',
      'Striatum directly excites thalamus with glutamate, bypassing GPi/SNr.',
      'A connection sign alone gives an exact movement latency and clinical diagnosis.'
    ],
    feedback: [
      'Correct: the intermediate STN link is included when tracing the indirect pathway.',
      'Striatal output to GPe is mainly GABAergic; GPi/SNr do not directly innervate muscle.',
      'Striatal projection neurons are mainly GABAergic; the proposed bypass is not this pathway.',
      'A qualitative diagram has no measured latencies and is not a diagnostic test.'
    ]
  },
  KZ: {
    introduction: 'Базальды ганглийлердің өзара әсерлесетін үш контуры: тікелей, жанама және гипертікелей жол. Сызба канондық үлгідегі байланыстардың әсерін көрсетеді, нейрон белсенділігінің нақты жазбасы емес.',
    preview: 'Контурды таңдап, әр байланыстың GPi/SNr мен таламусқа дейінгі әсерін бақылаңыз. Басқа кірістер тұрақты болғандағы нәтижені болжаңыз; таламустың тежелуден босауын бұлшықеттің тікелей жиырылуымен шатастырмаңыз.',
    transcript: [
      'Қыртыстың глутаматергиялық кірісі стриатум нейрондарының белгілі топтарын қоздырады. Әрекетті таңдау бір тізбекті жолға емес, қатар жұмыс істейтін бірнеше контурға тәуелді.',
      'Тікелей жол: стриатумның ГАМҚ-ергиялық нейрондары GPi/SNr-ді тежейді. Басқа кірістер тұрақты болса, таламустың тиісті нейрондарына тұрақты тежеу азайып, таламус-қыртыс белсенділігі жеңілдейді.',
      'Жанама жол: стриатум GPe-ні тежейді; GPe-нің STN-ге тежеуі азайғанда STN GPi/SNr-ді күштірек қоздырып, таламусқа тежеуші шығысты арттыра алады.',
      'Гипертікелей жол: қыртыстың кейбір сигналдары стриатумды айналып өтіп, STN-ді қоздырады. STN GPi/SNr-ді қоздырып, таламустың тежелуін тез күшейте алады. Сызба нақты латенттілікті көрсетпейді.',
      'SNc-ден келетін дофамин стриатумды модуляциялайды: қарапайым үлгіде D1 тікелей жол нейрондарын көбіне белсендіреді, ал D2 жанама жолдың тиісті нейрондарының белсенділігін төмендетеді. Әсер рецептор мен жағдайға тәуелді.',
      'GPi/SNr қаңқа бұлшықетін тікелей жүйкелендірмейді. Таламус-қыртыс, ми бағаны және төмендеуші желілер қозғалысты басқаруға қатысады; бұлшықетке соңғы жүйкелік шығысты төменгі мотонейрондар береді.'
    ],
    prompt: 'Оқу үлгісінде басқа кірістер тұрақты кезде жанама жолдың стриатум нейрондары таңдамалы белсендірілді. Қай болжам негізді?',
    explanation: 'GPe тежелгенде оның STN-ге тежеуші әсері азаяды; STN-нің GPi/SNr-ге қоздырушы әсері күшейіп, таламустың тиісті нейрондарына тежеу артуы мүмкін. Бұл нақты контурға арналған шартты болжам, диагноз немесе реакция уақытын есептеу емес.',
    options: [
      'GPe тежеледі, STN тежелуден босайды, GPi/SNr таламустың тежелуін күшейтуі мүмкін.',
      'GPe қозады, STN толық сөнеді, ал GPi/SNr бұлшықетті тікелей жиырылтады.',
      'Стриатум GPi/SNr-ді айналып өтіп, таламусты глутаматпен тікелей қоздырады.',
      'Бір байланыс белгісі арқылы қозғалыстың нақты латенттілігін және диагнозды анықтауға болады.'
    ],
    feedback: [
      'Дұрыс: жанама жолдағы STN аралық буыны ескерілген.',
      'Стриатумның GPe-ге шығысы негізінен ГАМҚ-ергиялық; GPi/SNr бұлшықетті тікелей жүйкелендірмейді.',
      'Стриатумның проекциялық нейрондары негізінен ГАМҚ-ергиялық; бұл сипаттама жанама жолға сәйкес емес.',
      'Сапалық сызбада өлшенген латенттілік жоқ және ол диагностикалық тексеру емес.'
    ]
  }
};

export function createModuleTwelveMedia(language: Language, base: MediaLesson): MediaLesson {
  if (base.kind !== 'media' || base.blocks.length !== 1) {
    throw new Error('Module 12 media base structure changed');
  }
  const c = copy[language];
  const block = base.blocks[0];
  const ids = ['a','b','c','d'] as const;
  const choices = ids.map((id,i) => ({id,text:c.options[i],feedback:c.feedback[i]}));
  const offset = language === 'RU' ? 0 : language === 'EN' ? 1 : 2;
  return {
    ...base,
    introduction:c.introduction,
    blocks:[{
      ...block,
      id:'module-12-basal-ganglia-pathways',
      title: language === 'RU' ? 'Три пути и их влияние на таламус' : language === 'EN' ? 'Three pathways and their thalamic effects' : 'Үш жол және олардың таламусқа әсері',
      preview:c.preview,
      transcript:c.transcript,
      theoryAnchor:'direct-indirect-and-hyperdirect',
      animation:'foundation',
      question:{
        prompt:c.prompt,
        correctAnswer:'a',
        explanation:c.explanation,
        options:[...choices.slice(offset),...choices.slice(0,offset)]
      }
    }]
  };
}
