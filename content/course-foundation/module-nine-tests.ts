import type { Language } from "../course";
import type { BranchingTest, QuestionCopy, TestNode } from "../tests";

// Module 9 spinal reflexes: authored main and corrective items, with a final
// basic scaffold. Based on Ganong 23e PDF pp.169–172; Guyton & Hall 13e
// pp.667–670; C. L. Ghai 8e pp.315–317. No painful human demonstrations.
type Q=[string,string,string,string,string,string];
type Pair=[Q,Q];
const q=(...args:Q):Q=>args;
const authored:Record<Language,Pair[]>={
 RU:[
  [
   q("При повреждении заднего корешка L3 при сохранном переднем корешке коленный рефлекс ослаб. Почему?",
     "Снижен вход Ia-афферентов мышечных веретён.","Альфа-мотонейроны проходят в заднем корешке.","Обязательно разрушена моторная кора.","Полностью исчезли все мышечные волокна.",
     "Афференты веретён входят через задние корешки, а моторные аксоны выходят через передние. Слабый рефлекс сам по себе не локализует поражение."),
   q("Какой рецептор запускает основную коротколатентную реакцию при ударе по связке надколенника?",
     "Мышечное веретено четырёхглавой мышцы.","Сухожильный орган Гольджи как единственный рецептор.","Ноцицептор кожи как обязательное первое звено.","Рецептор суставной капсулы без мышечных афферентов.",
     "Удар кратко растягивает мышцу и её веретёна; Ia-афференты обеспечивают основную коротколатентную ветвь. Органы Гольджи преимущественно сигнализируют о напряжении через Ib.")
  ],
  [
   q("Почему основную возбуждающую ветвь рефлекса растяжения называют моносинаптической?",
     "Ia-афферент прямо возбуждает альфа-мотонейрон растянутой мышцы.","Ia-афферент обязательно проходит через кору.","Антагонист всегда возбуждается без интернейрона.","Нервно-мышечный синапс заменяет центральную связь.",
     "Моносинаптическая характеристика относится к центральной связи Ia→альфа-мотонейрон; параллельные ветви сети могут быть полисинаптическими."),
   q("Как реализуется реципрокное торможение антагониста при растяжении мышцы?",
     "Через тормозный спинальный интернейрон, получающий вход от Ia-афферента.","Прямым превращением Ia-афферента в мотонейрон антагониста.","Полным выключением всех нисходящих путей.","Только через произвольное решение коры.",
     "Реципрокное торможение включает дополнительную интернейронную ветвь, а не отменяет прямое возбуждение мотонейронов растянутой мышцы.")
  ],
  [
   q("В первые часы после тяжёлой травмы спинного мозга ниже очага снижены сухожильные рефлексы. Как объяснить?",
     "Острая утрата нисходящих влияний может вызвать временное угнетение сегментарных рефлексов.","Все нейроны ниже очага обязательно разрушены.","Гиперрефлексия должна возникнуть сразу при любой травме.","Доказано изолированное повреждение сухожилия.",
     "Спинальный шок характеризуется изменяющимся во времени угнетением рефлексов; позднее часть ответов может восстановиться или усилиться."),
   q("Чем нейрогенный шок отличается от спинального шока?",
     "Нейрогенный шок — гемодинамическая дисфункция при утрате симпатического тонуса; спинальный — рефлекторное угнетение.","Оба термина означают только отсутствие коленного рефлекса.","Нейрогенный шок всегда означает разрыв чувствительного нерва.","Спинальный шок означает обязательную артериальную гипертензию.",
     "Состояния могут сосуществовать, но одно описывает нарушения кровообращения, другое — динамику сегментарных функций.")
  ],
  [
   q("В модели ноцицептивный стимул кожи стопы вызывает защитное отдёргивание ноги. Какой механизм основной?",
     "Полисинаптические сети возбуждают сгибатели и тормозят разгибатели.","Один синапс между кожным ноцицептором и мотонейроном разгибателя.","Только произвольная команда моторной коры.","Изолированное действие сухожильного органа Гольджи.",
     "Защитное отдёргивание обеспечивают спинальные интернейроны; оно не требует обязательной произвольной корковой команды."),
   q("Когда при отдёргивании одной ноги может появиться разгибание другой?",
     "При достаточном входе могут вовлекаться комиссуральные интернейроны перекрёстной разгибательной цепи.","Оно обязательно при любом слабом стимуле.","Это всегда моносинаптический рефлекс веретена второй ноги.","Это доказывает отсутствие связей между сторонами спинного мозга.",
     "Перекрёстное разгибание возможно, но не обязательно; нельзя предлагать болезненные эксперименты для его демонстрации.")
  ],
  [
   q("У пациента снижен коленный рефлекс. Какой вывод обоснован до дальнейшего обследования?",
     "Нужно сопоставить силу, чувствительность, другие рефлексы и методику; точная локализация пока неизвестна.","Доказано повреждение только корешка L3.","Обязательно разрушен передний рог.","Исключена периферическая нейропатия.",
     "Рефлекс зависит от рецептора, афферента, центральных связей, эфферента, мышцы и нисходящей модуляции."),
   q("При повторном исследовании рефлексы на ногах различаются. Что поможет интерпретировать асимметрию?",
     "Сопоставимая техника, оценка тонуса, силы, чувствительности и других неврологических признаков.","Один рефлекс позволяет точно назвать этиологию.","Положение конечности не влияет на ответ.","Любая асимметрия доказывает нейрогенный шок.",
     "Техника и состояние нервной системы меняют рефлекторную возбудимость; локализация требует согласованных данных.")
  ]
 ],
 EN:[
  [
   q("A teaching model damages the L3 dorsal root but preserves the ventral root. Why may the knee jerk weaken?",
     "Muscle-spindle Ia afferent input is reduced.","Alpha motor axons pass through the dorsal root.","The motor cortex must have been destroyed.","All muscle fibers must have disappeared.",
     "Spindle afferents enter via dorsal roots; motor axons leave via ventral roots. A weak reflex alone does not localize the lesion."),
   q("Which receptor initiates the main short-latency response to a patellar tendon tap?",
     "The quadriceps muscle spindle.","The Golgi tendon organ as the sole receptor.","A skin nociceptor as a mandatory first step.","A joint-capsule receptor without muscle afferents.",
     "The tap briefly stretches the quadriceps and its spindles; Ia afferents mediate the main short-latency limb. Golgi organs chiefly signal tension via Ib.")
  ],
  [
   q("Why is the main excitatory limb of the stretch reflex called monosynaptic?",
     "An Ia afferent directly excites an alpha motor neuron of the stretched muscle.","The Ia afferent must first reach the cortex.","The antagonist is always excited without an interneuron.","The neuromuscular junction replaces the central synapse.",
     "Monosynaptic describes the central Ia-to-alpha-motor-neuron connection; parallel branches may be polysynaptic."),
   q("How does reciprocal inhibition of an antagonist occur during muscle stretch?",
     "An inhibitory spinal interneuron receives Ia afferent input.","The Ia afferent turns into the antagonist motor neuron.","Every descending pathway is silenced.","Only a voluntary cortical decision can produce it.",
     "Reciprocal inhibition uses an additional interneuronal limb while direct excitation of the stretched muscle persists.")
  ],
  [
   q("Tendon reflexes are depressed below a severe spinal cord injury during the first hours. What is plausible?",
     "Acute loss of descending influence can transiently depress segmental reflexes.","Every neuron below the lesion must be destroyed.","Hyperreflexia must occur immediately after any injury.","An isolated tendon lesion is proven.",
     "Spinal shock involves time-dependent reflex depression; some segmental responses may later return or become exaggerated."),
   q("How does neurogenic shock differ from spinal shock?",
     "Neurogenic shock is hemodynamic dysfunction from loss of sympathetic tone; spinal shock concerns reflex depression.","Both terms mean only an absent knee jerk.","Neurogenic shock always means a severed sensory nerve.","Spinal shock necessarily produces hypertension.",
     "The two may coexist but describe different phenomena: circulation versus the time course of segmental function.")
  ],
  [
   q("A schematic noxious foot stimulus elicits protective withdrawal of that leg. What is the main circuit?",
     "Polysynaptic networks activate flexors and inhibit extensors.","One synapse from a skin nociceptor to an extensor motor neuron.","Only a voluntary motor-cortex command.","An isolated Golgi tendon organ response.",
     "Protective withdrawal uses spinal interneurons and need not depend on a voluntary cortical command."),
   q("When may withdrawal of one leg be accompanied by extension of the other?",
     "Sufficient input may recruit commissural interneurons in crossed extensor circuits.","It must happen with every weak stimulus.","It is always a monosynaptic spindle reflex in the other leg.","It proves that the two sides of the cord are disconnected.",
     "Crossed extension is possible, not obligatory; painful student demonstrations must not be suggested.")
  ],
  [
   q("A patient has a weak knee jerk. What can be concluded before further examination?",
     "Strength, sensation, other reflexes and technique must be compared; exact localization is uncertain.","An isolated L3 root lesion is proven.","The anterior horn must be destroyed.","Peripheral neuropathy is excluded.",
     "The response depends on receptors, afferents, central connections, efferents, muscle and descending modulation."),
   q("Repeat testing reveals asymmetric leg reflexes. What helps interpretation?",
     "Comparable technique plus assessment of tone, strength, sensation and other neurological signs.","One reflex proves a specific cause.","Limb position never affects the response.","Any asymmetry proves neurogenic shock.",
     "Technique and nervous-system state affect excitability; localization needs converging findings.")
  ]
 ],
 KZ:[
  [
   q("Оқу моделінде L3 артқы түбіршегі зақымдалып, алдыңғы түбіршек сақталды. Тізе рефлексі неге әлсіреуі мүмкін?",
     "Бұлшықет ұршығынан келетін Ia-афференттік кіріс азаяды.","Альфа-мотонейрон аксондары артқы түбіршекпен өтеді.","Қозғалтқыш қыртыс міндетті түрде жойылған.","Барлық бұлшықет талшықтары жоғалған.",
     "Ұршық афференттері артқы түбіршекпен кіреді, қозғалтқыш аксондары алдыңғы түбіршекпен шығады. Әлсіз рефлекс ошақты жеке өзі анықтамайды."),
   q("Тізе тобығының байламын соққанда негізгі қысқа латентті жауапты қай рецептор бастайды?",
     "Төртбасты бұлшықеттің бұлшықет ұршығы.","Жалғыз рецептор ретінде Гольджи сіңірлік органы.","Міндетті алғашқы буын ретіндегі тері ноцицепторы.","Бұлшықет афференттерінсіз буын қапшығының рецепторы.",
     "Соққы төртбасты бұлшықет пен оның ұршығын созады; негізгі қысқа латентті тармаққа Ia-афференттер қатысады. Гольджи органдары кернеуді Ib арқылы хабарлайды.")
  ],
  [
   q("Созылу рефлексінің негізгі қоздырғыш тармағы неге моносинапстық деп аталады?",
     "Ia-афферент созылған бұлшықеттің альфа-мотонейронын тікелей қоздырады.","Ia-афферент алдымен міндетті түрде қыртысқа жетеді.","Антагонист әрқашан интернейронсыз қозады.","Жүйке-бұлшықет түйіспесі орталық синапсты алмастырады.",
     "Моносинапстық атау орталық Ia→альфа-мотонейрон байланысына қатысты; қатар жүретін тармақтар полисинапстық болуы мүмкін."),
   q("Созылу кезінде антагонистің реципрокты тежелуі қалай жүзеге асады?",
     "Ia-афферент кірісін алатын тежеуші жұлын интернейроны арқылы.","Ia-афференттің антагонист мотонейронына айналуы арқылы.","Барлық төмендеуші жолдардың толық өшуімен.","Тек ерікті қыртыстық шешіммен.",
     "Реципрокты тежелуге қосымша интернейрондық тармақ қатысады; созылған бұлшықеттің тікелей қозуы сақталады.")
  ],
  [
   q("Жұлын ауыр жарақаттанғаннан кейін алғашқы сағаттарда ошақтан төмен сіңір рефлекстері төмендеді. Неге?",
     "Төмендеуші ықпалдың күрт жоғалуы сегменттік рефлекстерді уақытша бәсеңдетуі мүмкін.","Ошақтан төмен барлық нейрондар міндетті түрде жойылған.","Кез келген жарақаттан кейін гиперрефлексия бірден басталады.","Тек сіңірдің оқшау зақымы дәлелденді.",
     "Жұлындық шокта рефлекстер уақытша тежеледі; кейін кейбір сегменттік жауаптар қалпына келуі немесе күшеюі мүмкін."),
   q("Нейрогендік шоктың жұлындық шоктан айырмашылығы неде?",
     "Нейрогендік шок симпатикалық тонус жоғалуынан болатын гемодинамикалық бұзылыс; жұлындық шок — рефлекстік тежелу.","Екі термин тек тізе рефлексінің жоғалуын білдіреді.","Нейрогендік шок әрқашан сезімтал жүйкенің үзілуі.","Жұлындық шок міндетті түрде гипертензия туғызады.",
     "Екі жағдай қатар болуы мүмкін, бірақ бірі қанайналымды, екіншісі сегменттік функциялардың уақыт бойынша өзгерісін сипаттайды.")
  ],
  [
   q("Сызбалық модельде табанға ноцицептивтік стимул әсер етіп, аяқ қорғаныштық тартылады. Негізгі тетік қандай?",
     "Полисинапстық желілер бүггіштерді қоздырып, жазғыштарды тежейді.","Тері ноцицепторынан жазғыш мотонейронына бір синапс.","Тек ерікті қозғалтқыш қыртыс командасы.","Гольджи сіңірлік органының оқшау жауабы.",
     "Қорғаныштық тартылу жұлын интернейрондары арқылы іске асады және ерікті қыртыстық командаға міндетті емес."),
   q("Бір аяқ тартылғанда екінші аяқтың жазылуы қандай жағдайда қосылуы мүмкін?",
     "Жеткілікті кіріс комиссуралдық интернейрондар мен айқасқан жазғыш тізбектерді белсендіруі мүмкін.","Әр әлсіз стимулда міндетті түрде болады.","Бұл әрқашан екінші аяқ ұршығының моносинапстық рефлексі.","Бұл жұлынның екі жағы арасында байланыс жоқ екенін дәлелдейді.",
     "Айқасқан жазылу мүмкін, бірақ міндетті емес; студенттерге ауырсыну тудыратын тәжірибе ұсынуға болмайды.")
  ],
  [
   q("Пациенттің тізе рефлексі әлсіз. Қосымша тексерусіз қандай қорытынды орынды?",
     "Күшті, сезімталдықты, басқа рефлекстер мен әдісті салыстыру керек; нақты ошақ белгісіз.","Тек L3 түбіршегінің зақымы дәлелденді.","Алдыңғы мүйіз міндетті түрде жойылған.","Шеткі нейропатия жоққа шығарылды.",
     "Жауап рецепторға, афферентке, орталық байланысқа, эфферентке, бұлшықетке және төмендеуші модуляцияға тәуелді."),
   q("Қайталанған тексеруде аяқ рефлекстері асимметриялы. Нені бағалау пайдалы?",
     "Бірдей әдіспен тексеріп, тонусты, күшті, сезімталдықты және басқа неврологиялық белгілерді бағалау.","Бір рефлекс нақты себепті дәлелдейді.","Аяқтың қалпы жауапқа ешқашан әсер етпейді.","Кез келген асимметрия нейрогендік шокты дәлелдейді.",
     "Тексеру әдісі мен жүйке жүйесінің күйі рефлекстік қозғыштыққа әсер етеді; ошақты анықтау үшін бірнеше үйлесімді белгі қажет.")
  ]
 ]
};
const ids=["concept","mechanism","application","transfer","justification"] as const;
function localized(item:Q,shift:number):QuestionCopy{
 const options=[{id:"a",text:item[1]},{id:"b",text:item[2]},{id:"c",text:item[3]},{id:"d",text:item[4]}];
 const n=shift%4;
 return {prompt:item[0],options:[...options.slice(n),...options.slice(0,n)],correctAnswer:"a",explanation:item[5]};
}
export function adaptModuleNineTest(base:BranchingTest,lang:Language):BranchingTest{
 const nodes:Record<string,TestNode>={...base.nodes};
 const pairs=authored[lang];
 if(pairs.length!==5) throw new Error("Module 9 needs five test competencies");
 ids.forEach((competency,i)=>{
  const [main,corrective]=pairs[i];
  for(const [level,item,offset] of [["main",main,i+1],["corrective",corrective,i+2],["basic",corrective,i+3]] as const){
   const key=competency+":"+level;
   const old=nodes[key];
   if(!old || old.type!=="question") throw new Error("Missing module 9 node "+key);
   nodes[key]={...old,...localized(item,offset)};
  }
  const note=lang==="RU"?"Проследите путь от рецептора до мышцы и границы вывода. ":lang==="EN"?"Trace the path from receptor to muscle and the limits of inference. ":"Рецептордан бұлшықетке дейінгі жолды және қорытынды шегін көрсетіңіз. ";
  for(const suffix of ["review-1","review-2"]){
   const key=competency+":"+suffix;
   const old=nodes[key];
   if(!old || old.type!=="remediation") throw new Error("Missing module 9 remediation "+key);
   nodes[key]={...old,text:note+main[5],theoryTarget:{moduleId:9,anchor:i===4?"interpretation":"mechanism"}};
  }
 });
 return {...base,nodes};
}
