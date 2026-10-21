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
 options:[string,string,string,string]; feedback:[string,string,string,string];
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
   "4. Медиатор диффундирует через синаптическую щель и связывается с рецепторами. Быстрый ионотропный ответ может быть деполяризующим, гиперполяризующим или шунтирующим (проводимость растёт без выраженного изменения Vm). Метаботропные эффекты могут развиваться медленнее; новый импульс не гарантирован."
  ],
  prompt:"Потенциал действия зарегистрирован в пресинаптическом окончании, но вход Ca²⁺ заблокирован. Как изменится вызванная химическая передача?",
  explanation:"Приход импульса в окончание и Ca²⁺-зависимый экзоцитоз — разные этапы. Блокада входа Ca²⁺ резко снижает вероятность слияния везикул и вызванное выделение медиатора; отдельные спонтанные миниатюрные события могут сохраняться. Пять жёлтых точек на схеме — условные обозначения, а не измеренное число квантов.",
  options:[
   "Вызванное выделение останется прежним: сам потенциал действия гарантирует слияние везикул без входа Ca²⁺.",
   "Вызванное выделение резко уменьшится, хотя импульс достигает окончания; спонтанные события могут сохраняться.",
   "Вызванное выделение усилится, поскольку блокада Ca²⁺ снимает ограничение на слияние везикул.",
   "Вызванное выделение снизится только при одновременном исчезновении постсинаптических рецепторов."
  ],
  feedback:[
   "Нет: для обычного быстрого вызванного экзоцитоза необходим локальный вход Ca²⁺; приход импульса сам по себе недостаточен.",
   "Верно: Ca²⁺ связывает деполяризацию окончания с вероятностью экзоцитоза; спонтанные миниатюрные события не обязательно исчезают.",
   "Нет: Ca²⁺ запускает, а не подавляет обычное быстрое вызванное слияние везикул.",
   "Нет: пресинаптическая блокада Ca²⁺ снижает выделение медиатора даже при сохранных постсинаптических рецепторах."
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
   "4. Transmitter diffuses across the cleft and binds to receptors. A fast ionotropic response may depolarize, hyperpolarize, or shunt current (increased conductance with little Vm change). Metabotropic effects may develop more slowly; another spike is not guaranteed."
  ],
  prompt:"An action potential is recorded at the presynaptic terminal, but Ca²⁺ entry is blocked. What happens to evoked chemical transmission?",
  explanation:"Spike arrival and Ca²⁺-dependent exocytosis are distinct steps. Blocking Ca²⁺ entry sharply reduces vesicle fusion probability and evoked transmitter release; some spontaneous miniature events may persist. The five yellow dots are illustrative markers, not a measured quantal count.",
  options:[
   "Evoked release stays normal because a terminal action potential guarantees vesicle fusion without Ca²⁺ entry.",
   "Evoked release falls markedly despite terminal spike arrival; spontaneous miniature events may persist.",
   "Evoked release increases because Ca²⁺ blockade removes a restraint on synaptic vesicle fusion.",
   "Evoked release falls only if postsynaptic receptors are also removed from the membrane."
  ],
  feedback:[
   "Not quite: local Ca²⁺ entry is required for typical fast evoked exocytosis; a terminal spike alone is insufficient.",
   "Correct: Ca²⁺ couples terminal depolarization to exocytosis probability; miniature events need not disappear.",
   "Not quite: Ca²⁺ triggers rather than inhibits typical fast evoked vesicle fusion.",
   "Not quite: presynaptic Ca²⁺ blockade reduces release even when postsynaptic receptors remain functional."
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
   "4. Медиатор синапстық саңылаудан өтіп, рецепторлармен байланысады. Жылдам ионотроптық жауап деполяризация, гиперполяризация немесе Vm айқын өзгермей өткізгіштік артатын шунттаушы тежелу тудыруы мүмкін. Метаботроптық әсерлер баяуырақ дамуы мүмкін; жаңа импульс міндетті емес."
  ],
  prompt:"Пресинапстық ұшта әрекет потенциалы тіркелді, бірақ Ca²⁺ енуі бөгелді. Шақырылған химиялық берілу қалай өзгереді?",
  explanation:"Импульстің ұшқа жетуі мен Ca²⁺-ке тәуелді экзоцитоз — бөлек кезеңдер. Ca²⁺ енуін бөгеу көпіршіктердің қосылу ықтималдығын және шақырылған медиатор бөлінуін күрт азайтады; кейбір өздігінен пайда болатын миниатюралық оқиғалар сақталуы мүмкін. Бес сары нүкте — шартты белгілер, кванттардың өлшенген саны емес.",
  options:[
   "Шақырылған бөліну өзгермейді: ұштағы әрекет потенциалы Ca²⁺ енбей-ақ көпіршіктердің қосылуын қамтамасыз етеді.",
   "Импульс ұшқа жетсе де шақырылған бөліну күрт азаяды; өздігінен болатын миниатюралық оқиғалар сақталуы мүмкін.",
   "Шақырылған бөліну күшейеді, өйткені Ca²⁺ бөгелуі көпіршіктердің қосылуын шектейтін әсерді жояды.",
   "Шақырылған бөліну тек постсинапстық рецепторлар да мембранадан жоғалған жағдайда азаяды."
  ],
  feedback:[
   "Дұрыс емес: әдеттегі жылдам шақырылған экзоцитоз үшін Ca²⁺ жергілікті енуі қажет; ұшқа импульстің жетуі жеткіліксіз.",
   "Дұрыс: Ca²⁺ ұштың деполяризациясын экзоцитоз ықтималдығымен байланыстырады; миниатюралық оқиғалар міндетті түрде жойылмайды.",
   "Дұрыс емес: Ca²⁺ әдеттегі жылдам шақырылған көпіршік қосылуын тежемейді, оны іске қосады.",
   "Дұрыс емес: постсинапстық рецепторлар сақталса да, пресинапстық Ca²⁺ бөгелуі медиатор бөлінуін азайтады."
  ]
 }
};

export function createModuleFiveMedia(language:Language,base:MediaLesson):MediaLesson {
 const c=authored[language];
 // Rotate display order without changing answer IDs or introducing SSR randomness.
 // This avoids the correct choice appearing in the same position in all locales.
 const options=c.options.map((text,index)=>({
  id:["a","b","c","d"][index],text,feedback:c.feedback[index],
 }));
 const shift=language==="RU"?0:language==="EN"?1:2;
 return {
  ...base,introduction:c.introduction,
  blocks:[{
   id:"module-5-chemical-synapse-stages",
   title:c.title,preview:c.preview,transcript:c.transcript,
   // Link to the detailed synapse mechanism, not the generic foundation paragraph.
   theoryAnchor:"chemical-electrical-comparison",animation:"foundation",
   question:{
    prompt:c.prompt,correctAnswer:"b",explanation:c.explanation,
    options:[...options.slice(shift),...options.slice(0,shift)],
   },
  }],
 };
}
