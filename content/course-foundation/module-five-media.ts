import type { Language } from "../course";
import type { MediaLesson } from "../media";

// Module 5 only: an authored explanation accompanies a four-stage, user-stepped
// conceptual SVG. Checked against Ganong 23e, ch. 6 (PDF 127–130),
// Guyton & Hall 13e, ch. 46 (PDF 556–558), and Ghai 8e, experiment 4-9
// (PDF 353–354; isolated nerve–muscle work, not central synapse imaging).
type Copy = {
 title:string; introduction:string; preview:string;
 transcript:[string,string,string,string];
 prompt:string; explanation:string;
 options:[string,string,string]; feedback:[string,string,string];
};
const authored:Record<Language,Copy>={
 RU:{
  title:"Химический синапс: четыре последовательных этапа",
  introduction:"Пошаговая анатомо-физиологическая схема химического синапса. Она показывает причинную последовательность, а не измерение скорости, числа везикул или амплитуды постсинаптического потенциала.",
  preview:"Сначала предскажите, что происходит после прихода импульса в окончание. Затем последовательно откройте этапы и сравните с прогнозом. Желтые точки условны.",
  transcript:[
   "1. Потенциал действия достигает пресинаптического окончания. Проведение по аксону и выделение медиатора — разные процессы.",
   "2. Деполяризация открывает потенциал-зависимые Ca²⁺-каналы в пресинаптической мембране; локальный вход Ca²⁺ необходим для обычного быстрого вызванного выделения.",
   "3. Ca²⁺ повышает вероятность слияния везикул в активной зоне. Реальное высвобождение квантовое и вероятностное; нарисованные точки не обозначают фиксированное число квантов.",
   "4. Медиатор связывается с постсинаптическими рецепторами и вызывает градуальный ответ. Его знак и влияние на разряд зависят от рецепторов и ионных градиентов; новый потенциал действия не гарантирован."
  ],
  prompt:"Что означают пять жёлтых точек на учебной схеме?",
  explanation:"Точки служат условными маркерами медиатора. По этой схеме нельзя определить число выделенных везикул, вероятность выброса, величину тока или клинический диагноз. Для таких выводов необходимы экспериментальные данные.",
  options:[
   "При каждом импульсе в реальном синапсе всегда выделяется ровно пять квантов медиатора.",
   "Это условные маркеры медиатора, а не измеренное количество квантов или везикул.",
   "Они показывают пять зарегистрированных потенциалов действия постсинаптического нейрона."
  ],
  feedback:[
   "Квантовое выделение вероятностно, а количество точек выбрано только для наглядности.",
   "Верно: изображение помогает понять механизм, но не даёт количественного измерения.",
   "Схема не является записью потенциалов действия и не показывает число разрядов."
  ]
 },
 EN:{
  title:"Chemical synapse: four sequential stages",
  introduction:"A step-by-step anatomical and physiological schematic of chemical transmission. It shows a causal sequence, not measured timing, vesicle counts or postsynaptic potential amplitude.",
  preview:"Predict what happens after the spike arrives at the terminal, then advance through the stages and compare your prediction. Yellow dots are illustrative.",
  transcript:[
   "1. An action potential reaches the presynaptic terminal. Axonal conduction and transmitter release are distinct processes.",
   "2. Depolarization opens voltage-gated Ca²⁺ channels in the presynaptic membrane; local Ca²⁺ entry is required for typical fast evoked release.",
   "3. Ca²⁺ increases the probability of vesicle fusion at active zones. Real release is quantal and probabilistic; the drawn dots do not indicate a fixed number of quanta.",
   "4. Transmitter binds to postsynaptic receptors, producing a graded response. Its polarity and effect on firing depend on receptors and ionic gradients; another action potential is not guaranteed."
  ],
  prompt:"What do the five yellow dots in this teaching diagram represent?",
  explanation:"The dots are illustrative transmitter markers. The diagram cannot determine how many vesicles fused, release probability, current magnitude or a clinical diagnosis. Such conclusions require experimental evidence.",
  options:[
   "Exactly five transmitter quanta are always released per spike in a real synapse.",
   "They are illustrative transmitter markers, not a measured number of quanta or vesicles.",
   "They are five recorded action potentials in the postsynaptic neuron."
  ],
  feedback:[
   "Quantal release is probabilistic; the dot count is chosen only for illustration.",
   "Correct: the diagram explains a mechanism but does not provide quantitative measurements.",
   "The diagram is not an action-potential recording and cannot count spikes."
  ]
 },
 KZ:{
  title:"Химиялық синапс: төрт бірізді кезең",
  introduction:"Химиялық берілудің кезеңдік анатомиялық-физиологиялық сызбасы. Ол себеп-салдар ретін көрсетеді, бірақ уақытты, көпіршік санын немесе постсинапстық потенциал амплитудасын өлшемейді.",
  preview:"Алдымен импульс ұшқа жеткеннен кейін не болатынын болжаңыз. Содан соң кезеңдерді ашып, болжаммен салыстырыңыз. Сары нүктелер шартты түрде берілген.",
  transcript:[
   "1. Әрекет потенциалы пресинапстық ұшқа жетеді. Аксон бойымен өткізу мен медиатордың бөлінуі — бөлек үдерістер.",
   "2. Деполяризация пресинапстық мембранадағы кернеуге тәуелді Ca²⁺ арналарын ашады; Ca²⁺ жергілікті енуі әдеттегі жылдам шақырылған бөліну үшін қажет.",
   "3. Ca²⁺ белсенді аймақта көпіршіктердің мембранамен қосылу ықтималдығын арттырады. Нақты бөліну кванттық әрі ықтималдық сипатта; нүктелер кванттардың тұрақты санын білдірмейді.",
   "4. Медиатор постсинапстық рецепторлармен байланысып, градуалды жауап туғызады. Жауаптың бағыты мен импульске әсері рецепторларға және иондық градиенттерге тәуелді; жаңа әрекет потенциалы міндетті емес."
  ],
  prompt:"Оқу сызбасындағы бес сары нүкте нені білдіреді?",
  explanation:"Нүктелер — медиатордың шартты белгілері. Бұл сызбадан бөлінген көпіршіктер санын, бөліну ықтималдығын, ток шамасын немесе клиникалық диагнозды анықтау мүмкін емес. Мұндай қорытындыға эксперименттік деректер қажет.",
  options:[
   "Нақты синапста әр импульсте медиатордың дәл бес кванты міндетті түрде бөлінеді.",
   "Бұл медиатордың шартты белгілері, кванттардың немесе көпіршіктердің өлшенген саны емес.",
   "Олар постсинапстық нейронда тіркелген бес әрекет потенциалын көрсетеді."
  ],
  feedback:[
   "Кванттық бөліну ықтималдық сипатта; нүктелер саны тек көрнекілік үшін таңдалған.",
   "Дұрыс: сызба механизмді түсіндіреді, бірақ сандық өлшем бермейді.",
   "Бұл әрекет потенциалдарының жазбасы емес және импульстер санын көрсетпейді."
  ]
 }
};

export function createModuleFiveMedia(language:Language,base:MediaLesson):MediaLesson {
 const c=authored[language];
 return {
  ...base,introduction:c.introduction,
  blocks:[{
   id:"module-5-chemical-synapse-stages",
   title:c.title,preview:c.preview,transcript:c.transcript,
   theoryAnchor:"mechanism",animation:"foundation",
   question:{
    prompt:c.prompt,correctAnswer:"b",explanation:c.explanation,
    options:c.options.map((text,index)=>({
     id:["a","b","c"][index],text,feedback:c.feedback[index],
    })),
   },
  }],
 };
}
