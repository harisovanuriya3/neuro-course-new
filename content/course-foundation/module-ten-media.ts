import type { Language } from "../types";
import type { MediaLesson } from "../media";

// Qualitative brainstem network walkthrough. No synthetic traces or measured arousal score.
// Guyton & Hall 13e, Library PDF 718–720; Ganong 23e, PDF 249–250;
// C. L. Ghai Practical Physiology 8e, PDF 256–257 (BAEP limitations).
const copy = {
 RU: {
  title:"Восходящие системы бодрствования и ранний слуховой ответ",
  introduction:"Сравните распределённую сеть поддержания бодрствования с ограниченным выводом из ранних слуховых стволовых вызванных потенциалов (КСВП). Это учебная схема, а не запись ЭЭГ/КСВП, не шкала сознания и не диагностический тест.",
  preview:"Пройдите две цепи по отдельности. Сначала предскажите, что показывает следующий этап; затем объясните, почему сохранный ранний слуховой ответ не доказывает сознание.",
  transcript:[
   "Восходящая активация не локализуется в одном «центре сознания»: участвуют сети верхнего ствола, таламуса, гипоталамуса, базального переднего мозга и коры.",
   "Понтомезенцефальные ретикулярные сети и нейромодуляторные системы влияют на таламокортикальную активность. Взаимодействия распределены и не сводятся к простой последовательности единственных синапсов.",
   "Состояние бодрствования и осознанное восприятие — не синонимы. Наличие отдельных стволовых рефлексов не позволяет заключить, что пациент осознаёт происходящее.",
   "КСВП получают при повторных звуковых стимулах с усреднением слабого электрического ответа. Ранние компоненты отражают проведение по части слуховых путей и зависят от слуха, температуры, препаратов и качества регистрации.",
   "Сохранный КСВП не является доказательством сохранного сознания; отсутствие или изменение компонента само по себе также не устанавливает причину. Необходимы клинический осмотр и дополнительные данные."
  ],
  prompt:"У пациента нет осмысленной реакции на речь, но ранние слуховые стволовые вызванные потенциалы воспроизводимо регистрируются. Какой вывод допустим?",
  options:[
   "Сознание достоверно сохранено, потому что зарегистрирован ответ ствола.",
   "Все корковые и таламические связи функционально сохранны.",
   "По меньшей мере часть ранних слуховых путей проводит сигнал; уровень сознания требует отдельной оценки.",
   "Отсутствие реакции на речь обязательно означает полное поражение слухового нерва."
  ],
  feedback:[
   "Ранний слуховой ответ не измеряет осознанность.",
   "Стволовой ответ не доказывает целостность распределённых таламокортикальных сетей.",
   "Верно: ответ подтверждает ограниченную сенсорную функцию, но не уровень сознания.",
   "Нереагирование на речь неспецифично; слуховые и несенсорные причины следует различать."
  ],
  explanation:"Ранние слуховые вызванные потенциалы исследуют проведение части слухового пути, а бодрствование и сознание зависят от распределённых сетей и клинического контекста. Эти выводы нельзя подменять друг другом."
 },
 EN: {
  title:"Ascending arousal networks versus early auditory responses",
  introduction:"Compare distributed arousal networks with the limited inference supported by early brainstem auditory evoked potentials (BAEPs). This is a teaching schematic, not an EEG/BAEP recording, consciousness scale or diagnostic test.",
  preview:"Trace the two pathways separately. Predict each next stage, then explain why a preserved early auditory response does not establish awareness.",
  transcript:[
   "Ascending arousal is not confined to one 'consciousness center': upper brainstem, thalamic, hypothalamic, basal forebrain and cortical networks all participate.",
   "Pontomesencephalic reticular and neuromodulatory systems influence thalamocortical activity. Their interactions are distributed, not a single obligatory chain of synapses.",
   "Wakefulness and conscious awareness are not synonyms. Individual preserved brainstem reflexes do not establish that a patient is aware.",
   "BAEPs are obtained by averaging weak electrical responses to repeated acoustic stimuli. Early components reflect conduction through parts of the auditory pathway and depend on hearing, temperature, medication and recording quality.",
   "A preserved BAEP cannot establish preserved consciousness; an absent or altered component alone cannot identify its cause. Clinical examination and additional evidence are necessary."
  ],
  prompt:"A patient does not respond meaningfully to speech, but reproducible early brainstem auditory evoked potentials are recorded. Which inference is justified?",
  options:[
   "Conscious awareness is proven because a brainstem response is present.",
   "All cortical and thalamic connections are functionally intact.",
   "At least some early auditory pathways conduct the signal; consciousness requires separate assessment.",
   "Failure to respond to speech necessarily means complete auditory nerve injury."
  ],
  feedback:[
   "An early auditory response does not measure awareness.",
   "A brainstem response does not prove that distributed thalamocortical networks are intact.",
   "Correct: the response supports a limited sensory function, not a level of consciousness.",
   "Nonresponse to speech is nonspecific; auditory and non-auditory causes must be distinguished."
  ],
  explanation:"Early auditory evoked potentials probe conduction through parts of the auditory pathway, whereas arousal and awareness require distributed networks and clinical context. One cannot substitute for the other."
 },
 KZ: {
  title:"Сергектіктің жоғарылаушы желілері және ерте есту жауабы",
  introduction:"Сергектікті қамтамасыз ететін таралған желілерді ерте есту ми бағаны шақырылған потенциалдарынан (ЕШП) шығатын шектеулі қорытындымен салыстырыңыз. Бұл — оқу сызбасы; ЭЭГ/ЕШП жазбасы, сана шкаласы немесе диагностикалық сынақ емес.",
  preview:"Екі жолды бөлек қараңыз. Әр келесі кезеңді болжаңыз, содан кейін ерте есту жауабының сақталуы неліктен сананың сақталғанын дәлелдемейтінін түсіндіріңіз.",
  transcript:[
   "Жоғарылаушы белсендіру бір ғана «сана орталығына» шоғырланбайды: жоғарғы ми бағаны, таламус, гипоталамус, алдыңғы мидың базалдық аймақтары және қыртыс желілері қатысады.",
   "Көпір мен ортаңғы мидың ретикулярлық және нейромодуляторлық жүйелері таламус-қыртыс белсенділігіне әсер етеді. Байланыстар таралған және бір ғана міндетті синапстық тізбекпен шектелмейді.",
   "Сергектік пен саналы қабылдау бір ұғым емес. Жекелеген ми бағаны рефлекстерінің сақталуы науқастың саналы екенін дәлелдемейді.",
   "Ерте есту шақырылған потенциалдары қайталанатын дыбыс әсеріне берілген әлсіз электрлік жауаптарды орташалау арқылы алынады. Ерте компоненттер есту жолдарының бір бөлігіндегі өткізуді көрсетеді және есту қабілетіне, температураға, дәрілерге әрі жазба сапасына тәуелді.",
   "Ерте есту жауабының сақталуы сананың сақталғанын дәлелдемейді; компоненттің болмауы немесе өзгеруі де себепті жеке өзі анықтамайды. Клиникалық тексеру мен қосымша деректер қажет."
  ],
  prompt:"Науқас сөйлеуге саналы жауап бермейді, бірақ ерте есту ми бағаны шақырылған потенциалдары тұрақты тіркеледі. Қандай қорытынды негізді?",
  options:[
   "Ми бағанының жауабы тіркелгендіктен, сана міндетті түрде сақталған.",
   "Қыртыс пен таламус арасындағы барлық байланыстар толық жұмыс істейді.",
   "Ерте есту жолдарының кемінде бір бөлігі сигнал өткізеді; сана деңгейін бөлек бағалау керек.",
   "Сөйлеуге жауап болмауы міндетті түрде есту жүйкесінің толық зақымын білдіреді."
  ],
  feedback:[
   "Ерте есту жауабы саналы қабылдауды өлшемейді.",
   "Ми бағанының жауабы таламус-қыртыс желілерінің толық сақталғанын дәлелдемейді.",
   "Дұрыс: жауап шектеулі сенсорлық қызметті көрсетеді, бірақ сана деңгейін анықтамайды.",
   "Сөйлеуге жауап бермеудің себептері әртүрлі; есту және басқа себептерді ажырату қажет."
  ],
  explanation:"Ерте есту шақырылған потенциалдары есту жолының бір бөлігіндегі өткізуді бағалайды, ал сергектік пен саналы қабылдау таралған желілерге және клиникалық жағдайға тәуелді. Бұл екі қорытындыны теңестіруге болмайды."
 }
} as const;

export function createModuleTenMedia(language:Language,base:MediaLesson):MediaLesson {
 const c=copy[language];
 const block=base.blocks[0];
 if(!block) throw new Error("Module 10 media base block missing");
 return {...base,introduction:c.introduction,blocks:[{
  ...block,id:"module-10-arousal-auditory-inference",title:c.title,
  preview:c.preview,transcript:[...c.transcript],
  theoryAnchor:"ascending-arousal-and-descending-posture",
  animation:"foundation",
  question:{
   prompt:c.prompt,correctAnswer:"c",explanation:c.explanation,
   options:c.options.map((text,i)=>({id:["a","b","c","d"][i],text,feedback:c.feedback[i]}))
  }
 }]};
}
