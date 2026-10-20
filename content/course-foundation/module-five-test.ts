import type { Language } from "../course";
import type { BranchingTest, QuestionNode, TestOption } from "../tests";

// Module 5: authored formative questions, not final-exam items.
// Physiological basis: Ganong 23e, chapter 6 (PDF pp. 127–130);
// Guyton & Hall 13e, chapter 46 (PDF pp. 556–558);
// Ghai 8e, experiment 4-9 (PDF pp. 353–354), an isolated preparation.
// Illustrative experiments cannot establish a diagnosis in an individual patient.
type Triple = [string,string,string]; // RU, EN, KZ
const t=(ru:string,en:string,kz:string):Triple=>[ru,en,kz];
type Skill="concept"|"mechanism"|"application"|"transfer"|"justification";
type Copy={
 prompts:[Triple,Triple,Triple];
 choices:[Triple,Triple,Triple,Triple]; // first choice is physiologically correct
 explanation:Triple;
 hints:[Triple,Triple];
};
const authored:Record<Skill,Copy>={
 concept:{
  prompts:[
   t("В двух соседних нейронах ток проходит через щелевые контакты без выделения медиатора. Какой тип передачи показан?","Current passes between two adjacent neurons through gap junctions without transmitter release. What type of transmission is this?","Көрші екі нейрон арасында ток медиатор бөлінбей, саңылаулы түйіспелер арқылы өтеді. Бұл қандай берілу түрі?"),
   t("Почему синхронная активность нейронов иногда поддерживается без пресинаптических везикул?","Why can synchronized neuronal activity sometimes be supported without presynaptic vesicles?","Неліктен кейде нейрондардың синхронды белсенділігі пресинапстық везикулаларсыз қамтамасыз етіледі?"),
   t("Студент назвал любую синаптическую передачу выделением медиатора. Какое наблюдение опровергает это обобщение?","A student claims all synaptic transmission requires transmitter release. Which observation disproves that generalization?","Студент барлық синапстық берілу үшін медиатор бөлінуі қажет деді. Қай бақылау мұны теріске шығарады?")
  ],
  choices:[
   t("Электрическая передача через щелевые контакты: ионы проходят между клетками, без обязательного экзоцитоза медиатора.","Electrical transmission via gap junctions: ions pass between cells without requiring transmitter exocytosis.","Электрлік берілу: иондар жасушалар арасында саңылаулы түйіспелермен өтеді, медиатор экзоцитозы міндетті емес."),
   t("Химическая передача: каждое изменение потенциала требует выделения везикул в синаптическую щель.","Chemical transmission: every voltage change requires vesicle release into a synaptic cleft.","Химиялық берілу: потенциалдың әр өзгерісі синапстық саңылауға везикула бөлінуін қажет етеді."),
   t("Миелиновое проведение: щелевые контакты являются перехватами Ранвье.","Myelinated conduction: gap junctions are nodes of Ranvier.","Миелинді өткізу: саңылаулы түйіспелер Ранвье түйіндері болып саналады."),
   t("Нервно-мышечная передача: ток проходит непосредственно через щелевые контакты мотонейрона и мышцы.","Neuromuscular transmission: current passes directly through gap junctions between motor neuron and muscle.","Жүйке-бұлшықет берілісі: ток мотонейрон мен бұлшықет арасында тікелей саңылаулы түйіспелермен өтеді.")
  ],
  explanation:t("Электрический синапс проводит ионный ток через щелевые контакты; часто передаёт в обе стороны, но может выпрямлять ток. Химический синапс использует медиатор.","Electrical synapses conduct ionic current through gap junctions; they are often bidirectional but can rectify. Chemical synapses use transmitter release.","Электрлік синапс саңылаулы түйіспелер арқылы иондық ток өткізеді; көбіне екі бағытты, бірақ түзеткіш қасиеті болуы мүмкін. Химиялық синапста медиатор бөлінеді."),
  hints:[
   t("Сравните непрерывность ионного пути между клетками с везикулярным выделением медиатора.","Compare direct ionic coupling between cells with vesicular transmitter release.","Жасушалар арасындағы тікелей иондық байланысты медиатордың везикуладан бөлінуімен салыстырыңыз."),
   t("Синапсы бывают химическими и электрическими; для второго типа важны щелевые контакты.","Synapses can be chemical or electrical; gap junctions characterize the latter.","Синапстар химиялық және электрлік болады; соңғысына саңылаулы түйіспелер тән.")
  ]
 },
 mechanism:{
  prompts:[
   t("Потенциал действия зарегистрирован в пресинаптическом окончании, но вход Ca²⁺ заблокирован. Что ожидается для вызванного выделения медиатора?","A spike is recorded at the presynaptic terminal, but Ca²⁺ entry is blocked. What happens to evoked transmitter release?","Пресинапстық ұшта әрекет потенциалы тіркелген, бірақ Ca²⁺ енуі бөгелген. Шақырылған медиатор бөлінуі қалай өзгереді?"),
   t("В химическом синапсе импульс достигает окончания, но потенциал-зависимые Ca²⁺-каналы не пропускают ток. Какое звено нарушено?","A spike reaches a chemical synapse terminal, but voltage-gated Ca²⁺ channels do not conduct. Which step is impaired?","Химиялық синапстың ұшына импульс жетеді, бірақ кернеуге тәуелді Ca²⁺ арналары ток өткізбейді. Қай кезең бұзылады?"),
   t("Почему сохранный аксонный импульс не гарантирует обычный постсинаптический ответ при блокаде пресинаптического Ca²⁺?","Why does an intact axonal spike not ensure a normal postsynaptic response when presynaptic Ca²⁺ entry is blocked?","Пресинапстық Ca²⁺ енуі бөгелсе, аксондағы импульс сақталуы неге қалыпты постсинапстық жауапқа кепіл емес?")
  ],
  choices:[
   t("Вероятность слияния везикул и вызванное выделение медиатора резко уменьшаются; спонтанное выделение может сохраняться.","Vesicle fusion probability and evoked transmitter release fall markedly; spontaneous release may persist.","Везикулалардың қосылу ықтималдығы мен шақырылған медиатор бөлінуі күрт азаяды; өздігінен бөліну сақталуы мүмкін."),
   t("Пресинаптические Ca²⁺-каналы непосредственно создают восходящую фазу каждого потенциала действия по всему аксону.","Presynaptic Ca²⁺ channels generate the upstroke of every action potential throughout the axon.","Пресинапстық Ca²⁺ арналары бүкіл аксон бойындағы әр әрекет потенциалының көтерілу фазасын түзеді."),
   t("Блок Ca²⁺ увеличивает вероятность экзоцитоза и усиливает вызванный ответ.","Ca²⁺ blockade increases exocytosis probability and amplifies the evoked response.","Ca²⁺ бөгелуі экзоцитоз ықтималдығын арттырып, шақырылған жауапты күшейтеді."),
   t("Постсинаптические рецепторы обязательно исчезают сразу после блока Ca²⁺-каналов.","Postsynaptic receptors necessarily disappear as soon as Ca²⁺ channels are blocked.","Ca²⁺ арналары бөгелген сәтте постсинапстық рецепторлар міндетті түрде жоғалады.")
  ],
  explanation:t("Вход Ca²⁺ в активной зоне запускает вероятностное слияние синаптических везикул. Блокада снижает вызванное выделение, не доказывая блока проведения по аксону.","Ca²⁺ entry at the active zone triggers probabilistic vesicle fusion. Blocking entry reduces evoked release without proving axonal conduction block.","Белсенді аймаққа Ca²⁺ енуі везикулалардың ықтималдық қосылуын іске қосады. Оны бөгеу шақырылған бөлінуді азайтады, бірақ аксондағы өткізудің бөгелгенін дәлелдемейді."),
  hints:[
   t("Отделите приход импульса в окончание от следующего этапа — Ca²⁺-зависимого экзоцитоза.","Distinguish spike arrival at the terminal from the next step: Ca²⁺-dependent exocytosis.","Импульстің ұшқа жетуін келесі кезеңнен — Ca²⁺-ке тәуелді экзоцитоздан ажыратыңыз."),
   t("Проверьте, какое событие связывает деполяризацию окончания и выделение везикул.","Identify the event linking terminal depolarization to vesicle release.","Ұштың деполяризациясын везикулалардың бөлінуімен қандай оқиға байланыстыратынын анықтаңыз.")
  ]
 },
 application:{
  prompts:[
   t("Ацетилхолин возбуждает скелетную мышцу через никотиновый рецептор, но замедляет ритм синусового узла через M₂-рецептор. Почему эффекты различаются?","Acetylcholine excites skeletal muscle via nicotinic receptors but slows sinoatrial pacing via M₂ receptors. Why do the effects differ?","Ацетилхолин қаңқа бұлшықетін никотиндік рецептор арқылы қоздырады, ал синустық түйін ырғағын M₂-рецептор арқылы баяулатады. Неліктен әсерлері әртүрлі?"),
   t("Один медиатор действует на ионотропный и метаботропный рецепторы разных клеток. Что определяет различие ответов?","One transmitter acts on ionotropic and metabotropic receptors in different cells. What explains their different responses?","Бір медиатор әртүрлі жасушалардың ионотроптық және метаботроптық рецепторларына әсер етеді. Жауаптар неге әртүрлі?"),
   t("Студент считает ацетилхолин всегда возбуждающим медиатором. Какой физиологический принцип опровергает это?","A student calls acetylcholine an invariably excitatory transmitter. Which physiological principle refutes this?","Студент ацетилхолин әрқашан қоздырады дейді. Қай физиологиялық қағида мұны теріске шығарады?")
  ],
  choices:[
   t("Эффект определяется рецептором и связанными с ним ионными или внутриклеточными механизмами, а не только названием медиатора.","The effect depends on receptor subtype and coupled ionic or intracellular mechanisms, not merely transmitter identity.","Әсер тек медиатор атауына емес, рецептор түрі мен оған жалғасқан иондық немесе жасушаішілік тетіктерге тәуелді."),
   t("Любой ацетилхолиновый рецептор открывает одинаковый катионный канал и вызывает один ответ.","Every acetylcholine receptor opens the same cation channel and produces an identical response.","Ацетилхолиннің барлық рецепторы бірдей катион арнасын ашып, бірдей жауап береді."),
   t("Направление эффекта определяется только количеством медиатора независимо от рецепторов.","Only transmitter quantity determines response direction, irrespective of receptors.","Жауап бағытын рецепторға қарамастан тек медиатор мөлшері анықтайды."),
   t("Все метаботропные рецепторы обязательно возбуждают, а все ионотропные обязательно тормозят.","All metabotropic receptors are necessarily excitatory and all ionotropic receptors inhibitory.","Барлық метаботроптық рецептор міндетті түрде қоздырады, ал ионотроптық рецепторлар тежейді.")
  ],
  explanation:t("Никотиновый рецептор нервно-мышечного соединения — лиганд-зависимый катионный канал. Сердечный M₂-рецептор действует через G-белок и снижает частоту водителя ритма; эффекты рецепторно- и тканеспецифичны.","The NMJ nicotinic receptor is a ligand-gated cation channel. Cardiac M₂ receptors signal through G proteins and reduce pacemaker rate; responses depend on receptor and tissue.","Жүйке-бұлшықет түйісіндегі никотиндік рецептор — лигандпен ашылатын катиондық арна. Жүректегі M₂-рецептор G-ақуыз арқылы әсер етіп, ырғақ жетекшісінің жиілігін төмендетеді; жауап рецептор мен тінге тәуелді."),
  hints:[
   t("Разделите ионотропный канал и метаботропный путь через G-белок.","Distinguish a ligand-gated ion channel from a G-protein-coupled pathway.","Лигандпен ашылатын иондық арнаны G-ақуыз арқылы жүретін жолдан ажыратыңыз."),
   t("Сравните рецепторы ацетилхолина в скелетной мышце и синусовом узле.","Compare acetylcholine receptors in skeletal muscle and the sinoatrial node.","Қаңқа бұлшықеті мен синустық түйіндегі ацетилхолин рецепторларын салыстырыңыз.")
  ]
 },
 transfer:{
  prompts:[
   t("В изолированном нервно-мышечном препарате после многократной стимуляции нерва сокращение исчезло, но прямая стимуляция мышцы ещё вызывает ответ. Какой вывод допустим?","In an isolated nerve–muscle preparation, repeated nerve stimulation abolishes contraction, but direct muscle stimulation still works. What is justified?","Оқшауланған жүйке-бұлшықет препаратында жүйкені қайта-қайта қоздырғанда жиырылу жоғалды, бірақ бұлшықетті тікелей қоздырғанда жауап сақталды. Қандай қорытынды негізді?"),
   t("В опыте Ghai мышца ещё сокращается при прямой стимуляции после утомления при стимуляции нерва. Что можно и чего нельзя заключить?","In Ghai's preparation, muscle still contracts on direct stimulation after fatigue with nerve stimulation. What can and cannot be inferred?","Ghai тәжірибесінде жүйкені қоздырудан кейін шаршаған бұлшықет тікелей қоздырғанда жиырылады. Нені тұжырымдауға болады, ал нені болмайды?"),
   t("Почему результат опыта на изолированном нервно-мышечном препарате нельзя без оговорок переносить на утомление человека?","Why should fatigue in an isolated nerve–muscle preparation not be equated with human fatigue?","Неліктен оқшауланған жүйке-бұлшықет препаратындағы шаршауды адамның шаршауымен бірдей деп санауға болмайды?")
  ],
  choices:[
   t("Мышца сохраняет способность сокращаться; нарушение передачи до её возбуждения вероятно, но опыт не объясняет всю физиологию утомления человека.","Muscle contractility persists; failure upstream of muscle excitation is plausible, but this does not explain all human fatigue.","Бұлшықет жиырылу қабілетін сақтайды; бұзылыс бұлшықет қозуынан бұрын болуы ықтимал, бірақ тәжірибе адам шаршауының барлық тетігін түсіндірмейді."),
   t("Прямая стимуляция доказывает, что в нервном окончании нет ацетилхолина, и исключает любые другие механизмы.","Direct stimulation proves that no acetylcholine remains in the nerve ending and excludes all other mechanisms.","Тікелей қоздыру жүйке ұшында ацетилхолин мүлде қалмағанын дәлелдеп, өзге тетіктерді жоққа шығарады."),
   t("Сохранённая прямая стимуляция доказывает полную утрату сократительной способности мышцы.","Preserved direct-stimulation response proves complete loss of muscle contractility.","Тікелей қоздыру жауабының сақталуы бұлшықеттің жиырылу қабілеті толық жоғалғанын дәлелдейді."),
   t("Утомление человека всегда локализуется исключительно в нервно-мышечном соединении.","Human fatigue is always located exclusively at the neuromuscular junction.","Адамдағы шаршау әрқашан тек жүйке-бұлшықет түйісінде орналасады.")
  ],
  explanation:t("В искусственном препарате сохранённый ответ на прямую стимуляцию указывает на сохранность сократительного аппарата. Различают проведение нерва, нервно-мышечную передачу и мышечную возбудимость; в организме важны также центральные и метаболические факторы.","In this artificial preparation, direct-stimulation contraction indicates preserved muscle contractile capacity. Nerve conduction, NMJ transmission and muscle excitability are distinct; central and metabolic factors also matter in people.","Жасанды препаратта тікелей қоздыру кезіндегі жиырылу бұлшықеттің жиырылу қабілеті сақталғанын көрсетеді. Жүйке өткізгіштігі, жүйке-бұлшықет берілісі және бұлшықет қозғыштығы бөлек; адамда орталық және метаболизмдік факторлар да маңызды."),
  hints:[
   t("Сравните стимуляцию через нерв и непосредственно мышцы; какая часть цепи обходится?","Compare nerve and direct muscle stimulation: which link is bypassed?","Жүйке арқылы және бұлшықетті тікелей қоздыруды салыстырыңыз: тізбектің қай буыны айналып өтіледі?"),
   t("Не переносите механизм изолированного препарата на все виды утомления у человека.","Do not generalize the isolated preparation to every kind of human fatigue.","Оқшауланған препарат нәтижесін адамдағы шаршаудың барлық түріне жалпыламаңыз.")
  ]
 },
 justification:{
  prompts:[
   t("После блока Ca²⁺ уменьшился постсинаптический ответ. Что нужно проверить, прежде чем объявить причиной блок проведения по аксону?","After Ca²⁺ blockade the postsynaptic response falls. What must be checked before claiming axonal conduction block?","Ca²⁺ бөгелгеннен кейін постсинапстық жауап азайды. Мұны аксондағы өткізу блогы деуден бұрын нені тексеру қажет?"),
   t("Слабый постсинаптический ответ получен при сохранном потенциале действия в окончании. Как обосновать границы вывода?","A weak postsynaptic response is observed despite a recorded terminal spike. How should the conclusion be limited?","Ұшта әрекет потенциалы тіркелсе де постсинапстық жауап әлсіз. Қорытынды шегін қалай анықтаймыз?"),
   t("В симуляции уменьшение Ca²⁺ уменьшает ответ. Почему одна анимация не доказывает конкретный диагноз или точное число выделившихся везикул?","A simulation shows a smaller response after reduced Ca²⁺ entry. Why does the animation not establish a diagnosis or exact vesicle count?","Симуляцияда Ca²⁺ енуі азайғанда жауап кішірейеді. Неліктен анимация нақты диагнозды не бөлінген везикулалардың дәл санын анықтамайды?")
  ],
  choices:[
   t("Нужно отдельно подтвердить импульс в окончании, оценить выделение медиатора и чувствительность постсинаптической клетки; модель не измеряет диагноз или число квантов.","Verify terminal spike arrival, transmitter release and postsynaptic responsiveness separately; the model measures neither diagnosis nor exact quantal count.","Импульстің ұшқа жетуін, медиатор бөлінуін және постсинапстық жауапты бөлек тексеру керек; модель диагнозды да, кванттардың дәл санын да өлшемейді."),
   t("По уменьшению постсинаптического ответа однозначно доказан блок проведения по всему аксону.","A smaller postsynaptic response alone proves conduction block along the entire axon.","Постсинапстық жауаптың азаюы бүкіл аксондағы өткізу блогын бірмәнді дәлелдейді."),
   t("Размер ответа всегда точно равен числу выделенных везикул, даже при нелинейной суммации.","Response amplitude always equals the exact number of vesicles, even with nonlinear summation.","Жауап амплитудасы сызықтық емес қосылу кезінде де везикулалардың дәл санына тең."),
   t("Анимация кальция заменяет регистрацию пресинаптического импульса и постсинаптических рецепторов.","A calcium animation substitutes for measuring terminal spikes and postsynaptic receptor function.","Кальций анимациясы ұштағы импульсті және постсинапстық рецептор қызметін тіркеудің орнына жүреді.")
  ],
  explanation:t("Слабый ответ имеет несколько возможных причин. Регистрация терминального импульса исключает лишь некоторые варианты; оценка высвобождения и рецепторного ответа требует независимых опытов. Квантовое выделение вероятностно, а суммация может быть нелинейной.","A weak response has multiple possible causes. Recording a terminal spike excludes only some explanations; release and receptor function require separate tests. Release is probabilistic and summation may be nonlinear.","Әлсіз жауаптың бірнеше себебі болуы мүмкін. Ұштағы импульсті тіркеу тек кейбір себептерді жоққа шығарады; бөліну мен рецептор жауабын бөлек тексеру қажет. Бөліну ықтималдық сипатта, қосылу сызықтық болмауы мүмкін."),
  hints:[
   t("Спросите, какие этапы действительно зарегистрированы, а какие только нарисованы.","Ask which steps were measured and which were merely illustrated.","Қай кезең нақты тіркелгенін, қайсысы тек суреттелгенін анықтаңыз."),
   t("Различайте аксонное проведение, экзоцитоз, рецепторы и нелинейное суммирование.","Distinguish axonal conduction, exocytosis, receptors and nonlinear summation.","Аксондағы өткізуді, экзоцитозды, рецепторларды және сызықтық емес қосылуды ажыратыңыз.")
  ]
 }
};
const langIndex:Record<Language,number>={RU:0,EN:1,KZ:2};
export function createModuleFiveTest(language:Language,base:BranchingTest):BranchingTest{
 const loc=(value:Triple)=>value[langIndex[language]];
 const nodes:BranchingTest["nodes"]={...base.nodes};
 const skills:Skill[]=["concept","mechanism","application","transfer","justification"];
 const levels:QuestionNode["level"][]=["main","corrective","basic"];
 for(const [i,skill] of skills.entries()){
  const data=authored[skill];
  for(const [j,level] of levels.entries()){
   const key=skill+":"+level;
   const old=nodes[key];
   if(!old||old.type!=="question")throw new Error("Missing module 5 question node "+key);
   const options:TestOption[]=data.choices.map((value,k)=>({id:"abcd"[k],text:loc(value)}));
   const shift=(i+j+1)%4;
   nodes[key]={...old,prompt:loc(data.prompts[j]),options:[...options.slice(shift),...options.slice(0,shift)],correctAnswer:"a",explanation:loc(data.explanation)};
  }
  for(const [j,depth] of [1,2].entries()){
   const key=skill+":review-"+depth;
   const old=nodes[key];
   if(!old||old.type!=="remediation")throw new Error("Missing module 5 review node "+key);
   nodes[key]={...old,text:loc(data.hints[j])};
  }
 }
 return {...base,nodes};
}
