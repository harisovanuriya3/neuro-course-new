import type { Language } from '../course';
import type { MediaLesson } from '../media';

// Reviewed with Library: Guyton & Hall 13e, ch. 57, PDF 690–692;
// Ganong 23e, ch. 16, PDF 268–270; Ghai Practical Physiology 8e,
// PDF 309–313. Original teaching text, not a recording or diagnostic test.
type Copy = {
  title: string; introduction: string; preview: string; transcript: string[];
  prompt: string; explanation: string;
  options: [string,string,string,string]; feedback: [string,string,string,string];
};
const copy: Record<Language, Copy> = {
  RU: {
    title: 'Мозжечковая микросхема: возбуждение и торможение',
    introduction: 'Проследите два параллельных влияния на глубокие ядра мозжечка: возбуждающие коллатерали входящих волокон и тормозный выход клеток Пуркинье. Это качественная учебная схема, а не запись активности нейронов.',
    preview: 'Переключайте три части схемы и объясните, почему возбуждение входящего волокна не означает неизменного увеличения выхода глубокого ядра. Не выводите точное время или величину ответа.',
    transcript: [
      'Мшистые волокна передают различные входы в гранулярный слой; гранулярные клетки возбуждают клетки Пуркинье через параллельные волокна. Лазающие волокна исходят из нижней оливы и мощно возбуждают клетки Пуркинье.',
      'Коллатерали мшистых и лазающих волокон могут непосредственно возбуждать нейроны глубоких ядер. Это один путь влияния входящего сигнала на выход мозжечка.',
      'Клетки Пуркинье — тормозные ГАМК-ергические выходные нейроны коры мозжечка; они воздействуют на глубокие ядра и, в соответствующих контурах, на вестибулярные ядра.',
      'Глубокие ядра интегрируют возбуждающие и тормозные влияния и передают выход к таламическим и стволовым структурам. Итог зависит от распределения и динамики активности сети; схема не вычисляет разряды.',
      'Дисметрия и интенционный тремор могут указывать на нарушение мозжечковой координации. Для интерпретации нужны отдельная оценка силы, чувствительности, походки и других признаков; одна схема не устанавливает диагноз.'
    ],
    prompt: 'Какой вывод о глубоких ядрах мозжечка лучше всего согласуется с микросхемой?',
    explanation: 'Коллатерали афферентов возбуждают глубокие ядра, а ГАМК-ергические клетки Пуркинье тормозят их. Суммарный выход зависит от взаимодействия этих входов; точную частоту разрядов и диагноз схема не определяет.',
    options: [
      'Глубокие ядра получают возбуждающие коллатерали входящих волокон и тормозный выход клеток Пуркинье.',
      'Клетки Пуркинье возбуждают глубокие ядра глутаматом и непосредственно сокращают скелетные мышцы.',
      'Мшистые и лазающие волокна действуют только на кору мозжечка и не имеют коллатералей к глубоким ядрам.',
      'По одному знаку связи можно рассчитать точную частоту разрядов глубокого ядра и поставить диагноз.'
    ],
    feedback: [
      'Верно: учтены параллельное возбуждение и торможение глубоких ядер.',
      'Клетки Пуркинье преимущественно ГАМК-ергические и тормозные; прямой иннервации мышц здесь нет.',
      'Возбуждающие коллатерали афферентов к глубоким ядрам являются важной частью микросхемы.',
      'Качественная схема не содержит измерений и не заменяет клиническую оценку.'
    ]
  },
  EN: {
    title: 'Cerebellar microcircuit: excitation and inhibition',
    introduction: 'Trace two concurrent influences on deep cerebellar nuclei: excitatory afferent collaterals and inhibitory Purkinje-cell output. This is a qualitative teaching diagram, not a recording of neuronal activity.',
    preview: 'Switch among three parts of the circuit and explain why an excitatory afferent does not guarantee a fixed increase in deep-nuclear output. Do not infer exact timing or response magnitude.',
    transcript: [
      'Mossy fibres carry diverse inputs to the granule-cell layer; granule cells excite Purkinje cells via parallel fibres. Climbing fibres arise from the inferior olive and strongly excite Purkinje cells.',
      'Collaterals of mossy and climbing fibres can directly excite deep nuclear neurons. This is one route by which incoming signals influence cerebellar output.',
      'Purkinje cells are inhibitory GABAergic output neurons of the cerebellar cortex; they project to deep nuclei and, in relevant circuits, vestibular nuclei.',
      'Deep nuclei integrate excitatory and inhibitory influences and send output to thalamic and brainstem targets. The result depends on distributed, time-varying network activity; this diagram does not compute spikes.',
      'Dysmetria and intention tremor can suggest impaired cerebellar coordination. Strength, sensation, gait and other signs require separate assessment; a circuit diagram cannot establish a diagnosis.'
    ],
    prompt: 'Which conclusion about deep cerebellar nuclei is best supported by the microcircuit?',
    explanation: 'Afferent collaterals excite deep nuclei, whereas GABAergic Purkinje cells inhibit them. Net output depends on both influences; the diagram supplies neither an exact firing rate nor a diagnosis.',
    options: [
      'Deep nuclei receive excitatory afferent collaterals and inhibitory output from Purkinje cells.',
      'Purkinje cells excite deep nuclei with glutamate and directly contract skeletal muscles.',
      'Mossy and climbing fibres act only in cerebellar cortex and have no deep-nuclear collaterals.',
      'A single connection sign determines exact deep-nuclear firing rate and a clinical diagnosis.'
    ],
    feedback: [
      'Correct: both parallel excitation and Purkinje-cell inhibition are included.',
      'Purkinje cells are predominantly GABAergic and inhibitory; they do not directly innervate muscles.',
      'Excitatory afferent collaterals to deep nuclei are an essential part of the circuit.',
      'A qualitative circuit has no measured firing rates and cannot replace clinical assessment.'
    ]
  },
  KZ: {
    title: 'Мишықтың микротізбегі: қозу және тежелу',
    introduction: 'Мишықтың терең ядроларына қатар әсер ететін екі ықпалды бақылаңыз: кіріс талшықтарының қоздырушы коллатералдары және Пуркинье жасушаларының тежеуші шығысы. Бұл нейрон белсенділігінің нақты жазбасы емес, сапалық оқу сызбасы.',
    preview: 'Тізбектің үш бөлігін кезекпен қарап, қоздырушы кіріс неге терең ядро шығысының міндетті түрде тұрақты артуын білдірмейтінін түсіндіріңіз. Нақты уақытты немесе жауап шамасын есептемеңіз.',
    transcript: [
      'Мүкті талшықтар әртүрлі кірістерді түйіршікті қабатқа жеткізеді; түйіршікті жасушалар параллель талшықтар арқылы Пуркинье жасушаларын қоздырады. Өрмелеуші талшықтар төменгі оливадан шығып, Пуркинье жасушаларын күшті қоздырады.',
      'Мүкті және өрмелеуші талшықтардың коллатералдары терең ядролардың нейрондарын тікелей қоздыра алады. Бұл кіріс сигналдарының мишық шығысына әсер ететін жолдарының бірі.',
      'Пуркинье жасушалары — мишық қыртысының ГАМҚ-ергиялық тежеуші шығыс нейрондары; олар терең ядроларға және тиісті контурларда вестибулярлық ядроларға әсер етеді.',
      'Терең ядролар қоздырушы және тежеуші ықпалдарды біріктіріп, таламус пен ми бағанының құрылымдарына шығыс жібереді. Нәтиже желі белсенділігінің таралуы мен өзгерісіне тәуелді; сызба импульстерді есептемейді.',
      'Дисметрия мен интенциялық тремор мишық үйлесімінің бұзылуын көрсетуі мүмкін. Күшті, сезімталдықты, жүрісті және басқа белгілерді бөлек бағалау керек; бір сызба диагноз қоймайды.'
    ],
    prompt: 'Мишықтың терең ядролары туралы қай қорытынды микротізбекке сәйкес келеді?',
    explanation: 'Афференттік коллатералдар терең ядроларды қоздырады, ал ГАМҚ-ергиялық Пуркинье жасушалары тежейді. Жалпы шығыс осы екі ықпалға тәуелді; сызба нақты импульс жиілігін де, диагнозды да анықтамайды.',
    options: [
      'Терең ядролар кіріс талшықтарының қоздырушы коллатералдарын және Пуркинье жасушаларының тежеуші шығысын қабылдайды.',
      'Пуркинье жасушалары терең ядроларды глутаматпен қоздырып, қаңқа бұлшықеттерін тікелей жиырылтады.',
      'Мүкті және өрмелеуші талшықтар тек мишық қыртысына әсер етеді, терең ядроларға коллатерал бермейді.',
      'Бір байланыс белгісі терең ядроның нақты импульс жиілігін есептеуге және диагноз қоюға жеткілікті.'
    ],
    feedback: [
      'Дұрыс: терең ядроларға қатар келетін қозу мен Пуркинье жасушаларының тежеуі ескерілген.',
      'Пуркинье жасушалары негізінен ГАМҚ-ергиялық және тежеуші; олар бұлшықеттерді тікелей жүйкелендірмейді.',
      'Терең ядроларға келетін қоздырушы афференттік коллатералдар микротізбектің маңызды бөлігі.',
      'Сапалық сызбада өлшенген жиілік жоқ және ол клиникалық тексеруді алмастырмайды.'
    ]
  }
};

export function createModuleThirteenMedia(language: Language, base: MediaLesson): MediaLesson {
  if (base.kind !== 'media' || base.blocks.length !== 1) {
    throw new Error('Module 13 media base structure changed');
  }
  const c = copy[language];
  const block = base.blocks[0];
  const options = (['a','b','c','d'] as const).map((id,i) => ({
    id, text:c.options[i], feedback:c.feedback[i]
  }));
  const offset = language === 'RU' ? 0 : language === 'EN' ? 1 : 2;
  return {
    ...base,
    introduction:c.introduction,
    blocks:[{
      ...block,
      id:'module-13-cerebellar-microcircuit',
      title:c.title,
      preview:c.preview,
      transcript:c.transcript,
      theoryAnchor:'purkinje-deep-nuclei-microcircuit',
      animation:'foundation',
      question:{
        prompt:c.prompt,
        correctAnswer:'a',
        explanation:c.explanation,
        options:[...options.slice(offset),...options.slice(0,offset)]
      }
    }]
  };
}
