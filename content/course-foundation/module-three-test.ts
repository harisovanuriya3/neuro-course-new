import type { Language } from '../course';
import type { BranchingTest, QuestionNode, TestOption } from '../tests';
// Module 3: specific physiology questions replace generic glossary-derived items.
// Sources: Ganong 23e ch. 4; Guyton & Hall 13e ch. 5; Ghai 8e pp. 228–229.
type Skill='concept'|'mechanism'|'application'|'transfer'|'justification';
type Item=[string,string,string,string,string,string];
const authored:Record<Language,Record<Skill,Item>>={
 RU:{
  concept:['Какая глиальная клетка ЦНС буферирует внеклеточный K⁺?','Астроцит.','Микроглия.','Олигодендроцит.','Шванновская клетка.','Астроциты поддерживают ионную микросреду; олигодендроциты образуют миелин ЦНС, шванновские клетки — ПНС, микроглия участвует в иммунном надзоре.'],
  mechanism:['Почему при демиелинизации анатомически целого аксона проведение может замедлиться или блокироваться?','Утечка тока и ёмкостная нагрузка интернода возрастают, снижая возбуждение следующего узла.','Миелин сам генерирует потенциалы действия.','Утрата миелина всегда ускоряет проведение.','Нервно-мышечная передача исчезает при любой демиелинизации.','Миелин повышает сопротивление и уменьшает ёмкость интернода; при повреждении уменьшается надёжность возбуждения следующего перехвата Ранвье.'],
  application:['Латентности М-ответа: 3,2 мс дистально, 7,2 мс проксимально; между точками 20 см. Какова скорость?','50 м/с.','62,5 м/с.','27,8 м/с.','5 м/с.','Разность латентностей 4,0 мс; 0,20 м / 0,004 с = 50 м/с.'],
  transfer:['В холодной конечности скорость проведения снижена, после согревания нормализовалась. Что обоснованно?','Температура повлияла на результат; исходное снижение не доказывает демиелинизацию.','Нормализация после согревания полностью исключает нейропатию и необходимость других исследований.','Первоначально низкая скорость доказывает демиелинизацию независимо от температуры конечности.','Разница отражает только изменение нервно-мышечной передачи, а не проведения по нерву.','Температуру необходимо контролировать; изолированное измерение не устанавливает причину замедления.'],
  justification:['Почему для скорости моторного проведения вычитают дистальную латентность из проксимальной?','Чтобы исключить общие дистальные задержки, включая нервно-мышечную передачу.','Потому что дистальная латентность равна нулю.','Чтобы исключить только время регистрации электрода.','Потому что проксимальная стимуляция не вызывает мышечный ответ.','Разность латентностей приближённо отражает время проведения между точками стимуляции.']
 },
 EN:{
  concept:['Which CNS glial cell buffers extracellular K⁺?','Astrocyte.','Microglia.','Oligodendrocyte.','Schwann cell.','Astrocytes support ionic homeostasis; oligodendrocytes myelinate CNS axons, Schwann cells myelinate PNS axons and microglia provide immune surveillance.'],
  mechanism:['Why may conduction slow or fail in an anatomically intact but demyelinated axon?','Internodal current leakage and capacitive load increase, impairing excitation of the next node.','Myelin itself generates action potentials.','Myelin loss always speeds conduction.','All demyelination abolishes neuromuscular transmission.','Myelin increases internodal resistance and reduces capacitance; its loss lowers the safety factor for exciting the next node of Ranvier.'],
  application:['Distal CMAP onset latency is 3.2 ms, proximal 7.2 ms, distance 20 cm. What is conduction velocity?','50 m/s.','62.5 m/s.','27.8 m/s.','5 m/s.','Latency difference = 4.0 ms; 0.20 m / 0.004 s = 50 m/s.'],
  transfer:['Conduction is slow in a cold limb and normalizes after warming. What is justified?','Temperature affected the measurement; initial slowing alone does not establish demyelination.','Normalization after warming excludes neuropathy entirely, so no other findings need consideration.','The initial slow velocity proves demyelination regardless of the limb temperature during testing.','Only neuromuscular transmission changed; conduction along the nerve itself was unaffected.','Temperature must be controlled; an isolated measurement does not identify the cause of slowing.'],
  justification:['Why subtract distal from proximal CMAP onset latency to calculate motor conduction velocity?','To remove shared distal delays, including neuromuscular transmission.','Because distal latency is zero.','To remove only electrode recording time.','Because proximal stimulation produces no muscle response.','The latency difference approximates conduction time between stimulation sites.']
 },
 KZ:{
  concept:['ОЖЖ-де жасушадан тыс K⁺-ті буферлейтін глия жасушасы қайсы?','Астроцит.','Микроглия.','Олигодендроцит.','Шванн жасушасы.','Астроциттер иондық гомеостазға қатысады; олигодендроциттер ОЖЖ, шванн жасушалары ШЖЖ миелинін түзеді, микроглия иммундық қадағалайды.'],
  mechanism:['Миелині жоғалған, бірақ бүтін аксонда өткізу неге баяулауы немесе бөгелуі мүмкін?','Интернодта ток ағып кетуі мен сыйымдылық жүктемесі артып, келесі түйіннің қозуын қиындатады.','Миелиннің өзі әрекет потенциалын тудырады.','Миелин жоғалуы өткізуді әрқашан жылдамдатады.','Кез келген демиелиндену жүйке-бұлшықет берілісін тоқтатады.','Миелин интернод кедергісін арттырып, сыйымдылығын азайтады; оның жоғалуы келесі Ранвье түйінінің қозу сенімділігін төмендетеді.'],
  application:['Дисталдық М-жауап латенттілігі 3,2 мс, проксималдық 7,2 мс, арасы 20 см. Жылдамдық қандай?','50 м/с.','62,5 м/с.','27,8 м/с.','5 м/с.','Латенттіліктер айырмасы 4,0 мс; 0,20 м / 0,004 с = 50 м/с.'],
  transfer:['Суық аяқ-қолда өткізу баяу, жылытқаннан кейін қалпына келді. Нені тұжырымдауға болады?','Температура өлшеуге әсер етті; бастапқы баяулау демиелинденуді дәлелдемейді.','Жылытудан кейінгі қалыпты нәтиже нейропатияны толық жоққа шығарады, сондықтан басқа дерек қажет емес.','Бастапқы төмен жылдамдық аяқ-қол температурасына қарамастан демиелинденуді дәлелдейді.','Айырмашылық тек жүйке-бұлшықет берілісінен туындаған, ал жүйке бойымен өткізу өзгермеген.','Температураны бақылау қажет; бір өлшем баяулау себебін анықтамайды.'],
  justification:['Моторлық өткізуді есептегенде неге проксималдық М-жауап латенттілігінен дисталдықты азайтады?','Жүйке-бұлшықет берілісін қоса алғанда ортақ дисталдық кідірістерді жою үшін.','Өйткені дисталдық латенттілік нөлге тең.','Тек электрод тіркеу уақытын жою үшін.','Өйткені проксималдық стимуляция бұлшықет жауабын тудырмайды.','Латенттіліктер айырмасы екі стимуляция нүктесі арасындағы өткізу уақытын жуықтайды.']
 }
};
const followups:Record<Language,Record<Skill,[string,string]>>={
 RU:{
  concept:['После серии импульсов K⁺ вокруг нейронов ЦНС накапливается. Какая глия участвует в его удалении?','В коре нарушено глиальное буферирование K⁺. Какой тип клетки прежде всего рассматривают?'],
  mechanism:['Почему при сохранённых перехватах Ранвье повреждение интернода может вызвать блок проведения?','Как утрата изоляции интернода влияет на возбуждение следующего перехвата Ранвье?'],
  application:['Латентности М-ответа 4,0 мс и 9,0 мс; расстояние 25 см. Вычислите сегментарную скорость.','Дистальная латентность 3,0 мс, проксимальная 5,0 мс, расстояние 12 см. Какова скорость?'],
  transfer:['Сначала у пациента в холодной кисти проведение было замедлено, а при повторе после согревания стало обычным. Как интерпретировать разницу?','При исследовании нерва выявлено замедление, но конечность была холодной. После контроля температуры результат нормализовался. Какой вывод допустим?'],
  justification:['Почему нельзя оценить скорость сегмента между локтем и запястьем по одной проксимальной латентности М-ответа?','Как устранить общие дистальные задержки при расчёте скорости между двумя точками стимуляции?']
 },
 EN:{
  concept:['K⁺ accumulates around CNS neurons after repeated firing. Which glial cell contributes to its clearance?','Glial K⁺ buffering is impaired in cerebral cortex. Which cell type is most relevant?'],
  mechanism:['Why can internodal damage cause conduction block even if the nodes of Ranvier remain intact?','How does loss of internodal insulation affect excitation of the next node of Ranvier?'],
  application:['CMAP onset latencies are 4.0 and 9.0 ms; the distance is 25 cm. Calculate segmental velocity.','Distal onset latency is 3.0 ms, proximal 5.0 ms, distance 12 cm. What is velocity?'],
  transfer:['Conduction is slow in a cold hand, but normal when repeated after warming. How should the difference be interpreted?','Nerve conduction initially appears slow in a cold limb and becomes normal at controlled temperature. What conclusion is justified?'],
  justification:['Why can a single proximal CMAP onset latency not give velocity for the elbow-to-wrist segment?','How are shared distal delays removed when computing velocity between two stimulation sites?']
 },
 KZ:{
  concept:['Бірнеше импульстен кейін ОЖЖ нейрондары маңында K⁺ жиналды. Оны әкетуге қай глия қатысады?','Ми қыртысында K⁺-ті глиялық буферлеу бұзылған. Қай жасуша маңызды?'],
  mechanism:['Ранвье түйіндері бүтін болса да, интернод зақымы неге өткізу блогын тудыруы мүмкін?','Интернод оқшаулауы жоғалса, келесі Ранвье түйінінің қозуы қалай өзгереді?'],
  application:['М-жауап латенттіліктері 4,0 және 9,0 мс, арақашықтық 25 см. Сегменттік жылдамдықты есептеңіз.','Дисталдық латенттілік 3,0 мс, проксималдық 5,0 мс, арақашықтық 12 см. Жылдамдық қандай?'],
  transfer:['Суық қолда өткізу баяу болды, жылытқаннан кейін қалыпты болды. Айырмашылықты қалай түсіндіреміз?','Суық аяқ-қолда бастапқы өткізу баяу, температураны бақылағаннан кейін қалыпты. Қандай қорытынды негізді?'],
  justification:['Неліктен шынтақ пен білезік арасындағы жылдамдықты тек проксималдық М-жауап латенттілігімен есептеуге болмайды?','Екі стимуляция нүктесі арасындағы жылдамдықты есептегенде ортақ дисталдық кідірістер қалай жойылады?']
 }
};
// Remediation must address the actual physiology of the failed competency,
// not the glossary-derived "neuron → myelin" template.
const remediation:Record<Language,Record<Skill,[string,string]>>={
 RU:{
  concept:['Вспомните, какая клетка ЦНС удаляет избыток внеклеточного K⁺. Отделите эту функцию от миелинизации и иммунного надзора.','Сопоставьте четыре типа глии: астроцит — ионная микросреда, олигодендроцит — миелин ЦНС, шванновская клетка — миелин ПНС, микроглия — иммунный ответ.'],
  mechanism:['Представьте интернод без полноценного миелина: ток сильнее утекает через мембрану, поэтому следующий перехват может не достичь порога.','Миелин повышает сопротивление и снижает ёмкость интернода. Проверьте оба изменения при его утрате и объясните, почему возможны замедление и блок проведения.'],
  application:['Вычтите дистальную латентность из проксимальной. Затем переведите сантиметры в метры, миллисекунды в секунды и разделите расстояние на разность времени.','Проверьте единицы и три расчёта: (7,2−3,2) мс и 20 см дают 50 м/с; (9,0−4,0) мс и 25 см дают 50 м/с; (5,0−3,0) мс и 12 см дают 60 м/с.'],
  transfer:['Сравните измерения до и после согревания при прочих одинаковых условиях. Почему одно замедление в холодной конечности ещё не доказывает утрату миелина?','Температура изменяет скорость проведения. После её контроля оцените другие сегменты, амплитуду и форму М-ответа и клинические признаки, прежде чем говорить о механизме поражения.'],
  justification:['Разделите латентность М-ответа на время прохождения исследуемого сегмента и общие дистальные задержки, включая нервно-мышечную передачу.','При вычитании двух латентностей общая дистальная задержка сокращается; разность приближённо отражает время между точками стимуляции. Проверьте, что измерено расстояние именно вдоль нерва.']
 },
 EN:{
  concept:['Recall which CNS glial cell buffers excess extracellular K⁺. Distinguish this function from myelin formation and immune surveillance.','Match the four glial cell types: astrocyte—ionic homeostasis; oligodendrocyte—CNS myelin; Schwann cell—PNS myelin; microglia—immune response.'],
  mechanism:['Imagine an internode without adequate myelin: more current leaks across its membrane, so the next node may fail to reach threshold.','Myelin increases internodal resistance and decreases capacitance. Trace both changes after myelin loss to explain slowing or conduction block.'],
  application:['Subtract distal from proximal onset latency. Convert centimeters to meters and milliseconds to seconds, then divide distance by the time difference.','Check units for three examples: 20 cm/(7.2−3.2) ms = 50 m/s; 25 cm/(9.0−4.0) ms = 50 m/s; 12 cm/(5.0−3.0) ms = 60 m/s.'],
  transfer:['Compare measurements before and after warming while keeping other conditions similar. Why does slowing in a cold limb alone not prove myelin loss?','Temperature affects conduction velocity. Once controlled, assess other segments, CMAP amplitude and waveform, and clinical findings before inferring a lesion mechanism.'],
  justification:['Separate CMAP onset latency into conduction through the studied segment and shared distal delays, including neuromuscular transmission.','Subtracting the two onset latencies cancels shared distal delay; the difference approximates conduction time between sites. Confirm distance was measured along the nerve.']
 },
 KZ:{
  concept:['Жасушадан тыс артық K⁺-ті ОЖЖ-де қай глия буферлейтінін еске түсіріңіз. Бұл қызметті миелин түзу мен иммундық қадағалаудан ажыратыңыз.','Төрт глия түрін сәйкестендіріңіз: астроцит — иондық орта; олигодендроцит — ОЖЖ миелині; Шванн жасушасы — ШЖЖ миелині; микроглия — иммундық жауап.'],
  mechanism:['Миелині зақымданған интернодта мембрана арқылы ток көбірек ағып кетеді. Соның салдарынан келесі Ранвье түйіні табалдырыққа жетпеуі мүмкін.','Миелин интернод кедергісін арттырып, сыйымдылығын азайтады. Миелин жоғалғанда осы екі шаманың өзгеруі өткізуді неге баяулататынын немесе бөгейтінін түсіндіріңіз.'],
  application:['Проксималдық латенттіліктен дисталдықты азайтыңыз. Сантиметрді метрге, миллисекундты секундқа айналдырып, арақашықтықты уақыт айырмасына бөліңіз.','Өлшем бірліктерін тексеріңіз: 20 см/(7,2−3,2) мс = 50 м/с; 25 см/(9,0−4,0) мс = 50 м/с; 12 см/(5,0−3,0) мс = 60 м/с.'],
  transfer:['Басқа жағдайларды бірдей сақтап, жылытуға дейінгі және кейінгі нәтижелерді салыстырыңыз. Суық аяқ-қолдағы бір баяу өлшем неліктен миелин жоғалуын дәлелдемейді?','Температура өткізу жылдамдығына әсер етеді. Оны бақылаған соң басқа сегменттерді, М-жауап амплитудасы мен пішінін және клиникалық белгілерді бағалаңыз.'],
  justification:['М-жауап латенттілігін зерттелетін сегменттегі өткізу уақытына және жүйке-бұлшықет берілісін қамтитын ортақ дисталдық кідірістерге ажыратыңыз.','Екі латенттілікті азайтқанда ортақ дисталдық кідіріс қысқарады; айырмасы стимуляция нүктелері арасындағы уақытты жуықтайды. Арақашықтық жүйке бойымен өлшенгенін тексеріңіз.']
 }
};

const applicationFeedback:Record<Language,[string,string]>={
 RU:['Разность латентностей 5,0 мс; 0,25 м / 0,005 с = 50 м/с.','Разность латентностей 2,0 мс; 0,12 м / 0,002 с = 60 м/с.'],
 EN:['Latency difference = 5.0 ms; 0.25 m / 0.005 s = 50 m/s.','Latency difference = 2.0 ms; 0.12 m / 0.002 s = 60 m/s.'],
 KZ:['Латенттіліктер айырмасы 5,0 мс; 0,25 м / 0,005 с = 50 м/с.','Латенттіліктер айырмасы 2,0 мс; 0,12 м / 0,002 с = 60 м/с.']
};
export function createModuleThreeTest(language:Language,base:BranchingTest):BranchingTest{
 const nodes:BranchingTest['nodes']={...base.nodes};
 const skills:Skill[]=['concept','mechanism','application','transfer','justification'];
 const levels:QuestionNode['level'][]=['main','corrective','basic'];
 for(const [i,skill] of skills.entries()){
  const [prompt,correct,w1,w2,w3,explanation]=authored[language][skill];
  for(const [j,level] of levels.entries()){
   const key=skill+':'+level;
   const old=nodes[key];
   if(!old||old.type!=='question')throw new Error('Missing module 3 test node '+key);
   // Basic application now uses 0.12 m / 0.002 s = 60 m/s.
   const answer=skill==='application'&&j===2?(language==='EN'?'60 m/s.':'60 м/с.'):correct;
   const firstDistractor=skill==='application'&&j===2?correct:w1;
   const options:TestOption[]=[{id:'a',text:answer},{id:'b',text:firstDistractor},{id:'c',text:w2},{id:'d',text:w3}];
   const shift=(i+j+3)%4;
   nodes[key]={...old,prompt:j===0?prompt:followups[language][skill][j-1],options:[...options.slice(shift),...options.slice(0,shift)],correctAnswer:'a',explanation:skill==='application'&&j>0?applicationFeedback[language][j-1]:explanation};
  }
  // Preserve the base graph's links and targets, but replace generic hints.
  for(const [index,depth] of [1,2].entries()){
   const key=skill+':review-'+depth;
   const old=nodes[key];
   if(!old||old.type!=='remediation')throw new Error('Missing module 3 remediation node '+key);
   nodes[key]={...old,text:remediation[language][skill][index]};
  }
 }
 return {...base,nodes};
}
