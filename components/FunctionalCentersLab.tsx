"use client";

import {useState} from "react";
import type {Language} from "../content/course";

type CenterKey="broca"|"wernicke"|"motor"|"somato"|"visual"|"auditory"|"hippocampus"|"amygdala"|"prefrontal"|"hypothalamus"|"brainstem"|"cerebellum"|"basal";

const copy={
 RU:{
  title:"Функциональные центры: норма и нарушения",
  intro:"Выберите центр. Сначала посмотрите его нормальную роль, затем — какие признаки могут появиться при повреждении или дисфункции.",
  normal:"В норме",pathology:"При нарушении",location:"Где находится",note:"Важно: большинство функций выполняется не одной точкой, а сетью областей. Здесь показаны основные учебные связи.",
  centers:{
   broca:["Центр Брока","Нижняя лобная извилина доминантного полушария","Программирование моторной речи: построение и произнесение фраз.","Экспрессивная афазия: речь замедлена и трудна, понимание относительно лучше сохранено."],
   wernicke:["Зона Вернике","Задние отделы верхней височной извилины и прилежащая теменно-височная сеть доминантного полушария","Понимание речевого смысла и связывание слов с содержанием.","Рецептивная афазия: речь беглая, но смысл нарушен; понимание обращённой речи страдает."],
   motor:["Первичная моторная кора","Прецентральная извилина","Запуск произвольных движений противоположной стороны тела.","Контралатеральная слабость/парез, нарушение точных произвольных движений."],
   somato:["Первичная соматосенсорная кора","Постцентральная извилина","Осознанное восприятие и локализация соматической чувствительности.","Снижение корковой чувствительности, ухудшение локализации и дискриминации стимулов на противоположной стороне."],
   visual:["Зрительная кора","Затылочная доля вокруг шпорной борозды","Первичная обработка зрительной информации.","Дефекты поля зрения; при двустороннем тяжёлом поражении возможна корковая слепота."],
   auditory:["Слуховая кора","Верхняя височная извилина, извилины Гешля","Первичная обработка звуковой информации.","Нарушается анализ звука; одностороннее поражение обычно не вызывает полной глухоты из-за двусторонних слуховых путей."],
   hippocampus:["Гиппокамп","Медиальная височная доля","Консолидация новой декларативной памяти и контекстная память.","Антероградная амнезия: трудно формировать новые декларативные воспоминания."],
   amygdala:["Миндалина","Медиальная височная доля","Эмоциональная значимость стимулов, страх, обучение значимости и участие в автономных реакциях.","Нарушается оценка эмоциональной значимости и эмоциональное обучение; реакция зависит от объёма и стороны поражения."],
   prefrontal:["Префронтальная кора","Передние отделы лобной доли","Планирование, рабочая память, контроль поведения, принятие решений.","Импульсивность, снижение планирования, рабочей памяти и самоконтроля."],
   hypothalamus:["Гипоталамус","Промежуточный мозг","Гомеостаз: температура, жажда, питание, эндокринная и вегетативная регуляция.","Нарушения температуры, водного баланса, аппетита, сна и нейроэндокринной регуляции."],
   brainstem:["Жизненно важные центры ствола","Продолговатый мозг и мост","Регуляция дыхания, сердечно-сосудистых реакций, бодрствования и защитных рефлексов.","Тяжёлые нарушения дыхания, гемодинамики, сознания и стволовых рефлексов — в зависимости от уровня поражения."],
   cerebellum:["Мозжечок","Задняя черепная ямка","Координация, точность, время движения, моторное обучение и равновесие.","Атаксия, дисметрия, интенционный тремор, нарушение равновесия и координации."],
   basal:["Базальные ганглии","Подкорковые ядра","Выбор и запуск двигательных программ, масштабирование движения, участие в привычках.","Брадикинезия, ригидность, гиперкинезы или трудности запуска/подавления движений — в зависимости от контура."]
  }
 },
 EN:{
  title:"Functional centers: normal function and dysfunction",
  intro:"Choose a center. First see its normal role, then the typical effect of damage or dysfunction.",
  normal:"Normal function",pathology:"If impaired",location:"Location",note:"Most functions are produced by networks rather than a single point. These are the main teaching associations.",
  centers:{
   broca:["Broca area","Inferior frontal gyrus of the dominant hemisphere","Motor programming of speech and phrase production.","Expressive aphasia: speech is effortful and nonfluent, while comprehension is relatively better preserved."],
   wernicke:["Wernicke area","Posterior superior temporal region and adjacent temporoparietal language network of the dominant hemisphere","Language comprehension and linking words with meaning.","Receptive aphasia: speech may remain fluent but loses meaning; comprehension is impaired."],
   motor:["Primary motor cortex","Precentral gyrus","Initiates voluntary movement of the opposite side of the body.","Contralateral weakness or paresis and loss of fine voluntary control."],
   somato:["Primary somatosensory cortex","Postcentral gyrus","Conscious perception and localization of body sensation.","Reduced cortical sensation, localization, and discrimination on the opposite side."],
   visual:["Visual cortex","Occipital lobe around the calcarine sulcus","Primary processing of visual information.","Visual-field defects; severe bilateral injury can cause cortical blindness."],
   auditory:["Auditory cortex","Superior temporal gyrus, including Heschl gyri","Primary processing of sound.","Sound analysis is impaired; unilateral lesions usually do not cause complete deafness because auditory pathways are bilateral."],
   hippocampus:["Hippocampus","Medial temporal lobe","Consolidation of new declarative memories and contextual memory.","Anterograde amnesia: difficulty forming new declarative memories."],
   amygdala:["Amygdala","Medial temporal lobe","Assigns emotional significance, fear learning, salience, and contributes to autonomic responses.","Emotional salience and emotional learning may be impaired; effects depend on lesion extent and side."],
   prefrontal:["Prefrontal cortex","Anterior frontal lobe","Planning, working memory, behavioral control, and decision-making.","Impulsivity and reduced planning, working memory, and self-control."],
   hypothalamus:["Hypothalamus","Diencephalon","Homeostasis: temperature, thirst, feeding, endocrine and autonomic regulation.","Disturbances of temperature, fluid balance, appetite, sleep, and neuroendocrine regulation."],
   brainstem:["Vital brainstem centers","Medulla and pons","Breathing, cardiovascular regulation, arousal, and protective reflexes.","Potentially severe abnormalities of breathing, circulation, consciousness, and brainstem reflexes depending on lesion level."],
   cerebellum:["Cerebellum","Posterior cranial fossa","Coordination, timing, motor learning, precision, and balance.","Ataxia, dysmetria, intention tremor, and impaired balance/coordination."],
   basal:["Basal ganglia","Subcortical nuclei","Selection and initiation of motor programs, scaling of movement, and habit-related control.","Bradykinesia, rigidity, hyperkinesia, or impaired movement initiation/suppression depending on the circuit."]
  }
 },
 KZ:{
  title:"Функциялық орталықтар: норма және бұзылыс",
  intro:"Орталықты таңдаңыз. Алдымен қалыпты қызметін, кейін зақымдану немесе дисфункция кезінде не болатынын көріңіз.",
  normal:"Қалыптыда",pathology:"Бұзылғанда",location:"Орналасуы",note:"Көптеген қызметтер бір нүктемен емес, жүйелермен орындалады. Мұнда негізгі оқу байланыстары көрсетілген.",
  centers:{
   broca:["Брока аймағы","Доминантты жартышардың төменгі маңдай иірімі","Сөйлеудің моторлық бағдарламасын құру және фразаны айту.","Экспрессивті афазия: сөйлеу баяу және қиын, түсіну салыстырмалы жақсы сақталады."],
   wernicke:["Вернике аймағы","Доминантты жартышардың артқы жоғарғы самай аймағы және оған жақын темпоро-париеталдық тіл желісі","Сөйлеу мағынасын түсіну және сөзді мазмұнмен байланыстыру.","Рецептивті афазия: сөйлеу еркін болуы мүмкін, бірақ мағынасы бұзылады және түсіну нашарлайды."],
   motor:["Біріншілік моторлық қыртыс","Прецентралдық иірім","Дененің қарама-қарсы жағындағы ерікті қозғалысты бастау.","Қарама-қарсы жақ әлсіздігі/парез және нәзік ерікті қозғалыстың бұзылысы."],
   somato:["Біріншілік соматосенсорлық қыртыс","Постцентралдық иірім","Соматикалық сезімді саналы қабылдау және локализациялау.","Қарама-қарсы жақта қыртыстық сезімталдық, локализация және ажырату төмендейді."],
   visual:["Көру қыртысы","Шүйде бөлігі, шпорлық жүлге айналасы","Көру ақпаратын бастапқы өңдеу.","Көру өрісі ақаулары; екіжақты ауыр зақымда қыртыстық соқырлық болуы мүмкін."],
   auditory:["Есту қыртысы","Жоғарғы самай иірімі, Гешль иірімдері","Дыбыс ақпаратын бастапқы өңдеу.","Дыбысты талдау бұзылады; есту жолдары екіжақты болғандықтан біржақты зақым толық кереңдікке әдетте әкелмейді."],
   hippocampus:["Гиппокамп","Медиалдық самай бөлігі","Жаңа декларативті жадты бекіту және контекстік жад.","Антероградты амнезия: жаңа декларативті естеліктерді қалыптастыру қиындайды."],
   amygdala:["Амигдала","Медиалдық самай бөлігі","Эмоциялық маңыз, қорқыныш, эмоциялық үйрену және вегетативтік реакцияларға қатысу.","Эмоциялық мағынаны бағалау және эмоциялық үйрену бұзылады; әсері зақым көлемі мен жағына байланысты."],
   prefrontal:["Префронталдық қыртыс","Маңдай бөлігінің алдыңғы аймақтары","Жоспарлау, жұмыс жады, мінез-құлықты бақылау және шешім қабылдау.","Импульсивтілік, жоспарлау, жұмыс жады және өзін-өзі бақылаудың төмендеуі."],
   hypothalamus:["Гипоталамус","Аралық ми","Гомеостаз: температура, шөлдеу, тамақтану, эндокриндік және вегетативтік реттелу.","Температура, су теңгерімі, тәбет, ұйқы және нейроэндокриндік реттелу бұзылады."],
   brainstem:["Ми сабауының өмірлік маңызды орталықтары","Сопақша ми және көпір","Тыныс, жүрек-қантамыр реттелуі, сергектік және қорғаныш рефлекстері.","Зақым деңгейіне байланысты тыныс, гемодинамика, сана және ми сабауы рефлекстерінің ауыр бұзылыстары болуы мүмкін."],
   cerebellum:["Мишық","Артқы бассүйек шұңқыры","Үйлестіру, дәлдік, қозғалыс уақыты, моторлық үйрену және тепе-теңдік.","Атаксия, дисметрия, интенциялық тремор және тепе-теңдік/үйлестіру бұзылысы."],
   basal:["Базальды ганглийлер","Қыртысасты ядролар","Қозғалыс бағдарламаларын таңдау және бастау, қозғалыс көлемін реттеу, әдеттерге қатысу.","Брадикинезия, ригидтілік, гиперкинез немесе қозғалысты бастау/тоқтатудың қиындауы — контурға байланысты."]
  }
} as const;

export default function FunctionalCentersLab({language}:{language:Language}){
 const t=copy[language];
 const keys=Object.keys(t.centers) as CenterKey[];
 const [selected,setSelected]=useState<CenterKey>("broca");
 const c=t.centers[selected];
 return <section style={{margin:"24px 0",padding:18,border:"1px solid #cfe0ea",borderRadius:16,background:"#fff"}}>
  <h2>{t.title}</h2><p>{t.intro}</p>
  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
   {keys.map(k=><button key={k} type="button" aria-pressed={selected===k} onClick={()=>setSelected(k)}>{t.centers[k][0]}</button>)}
  </div>
  <div style={{marginTop:14,display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))",gap:12}}>
   <article style={{padding:14,borderRadius:12,background:"#f8fcff"}}>
    <h3>{c[0]}</h3><p><strong>{t.location}:</strong> {c[1]}</p><p><strong>{t.normal}:</strong> {c[2]}</p>
   </article>
   <article style={{padding:14,borderRadius:12,background:"#fff8f5",border:"1px solid #f0d6c8"}}>
    <h3>{t.pathology}</h3><p>{c[3]}</p>
   </article>
  </div>
  <p style={{fontSize:14}}>{t.note}</p>
 </section>;
}
