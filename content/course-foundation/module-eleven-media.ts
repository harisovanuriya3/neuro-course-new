import type { Language } from "../types";
import type { MediaLesson } from "../media";

// Qualitative teaching schematic, not a patient recording or a measured motor latency.
// Cross-checked: Guyton & Hall 13e ch.56, Library PDF 677–679;
// Ganong 23e ch.16, PDF 253–256; C. L. Ghai Practical Physiology 8e,
// PDF 317–319 (muscle-spindle basis and limits of tendon reflex examination).
const copy = {
 RU: {
  title:"От двигательного замысла к коррекции движения",
  introduction:"Проследите два взаимодействующих процесса: нисходящую двигательную команду и сенсорную коррекцию. Схема качественная: не изображает отдельный анатомический тракт целиком, измеренные задержки, активность нейронов или диагностическую запись.",
  preview:"Сначала проследите подготовку и исполнение движения, затем переключитесь на обратную связь. Перед каждым следующим этапом предскажите вклад коры, ствола, спинальных сетей и рецепторов.",
  transcript:[
   "Ассоциативные и премоторные области коры взаимодействуют с базальными ганглиями, мозжечком и таламусом при выборе и подготовке действия. Это взаимосвязанные петли, а не одна последовательная цепь.",
   "Кортикоспинальные волокна проходят через внутреннюю капсулу и пирамиды продолговатого мозга. Большинство перекрещивается каудально в продолговатом мозге; часть волокон действует иначе, в том числе через двусторонние связи.",
   "Латеральный кортикоспинальный путь особенно важен для дифференцированных движений пальцев. Ретикулоспинальные и вестибулоспинальные влияния помогают управлять позой; эти системы взаимодействуют, а не заменяют друг друга.",
   "Спинальные интернейроны и α-мотонейроны интегрируют нисходящие и периферические входы. Конечный общий путь к скелетной мышце проходит через нижний мотонейрон.",
   "Зрение, кожная и мышечно-суставная афферентация сообщают о выполнении движения. Мозжечковые и корковые сети используют обратную связь для коррекции; коррекция не всегда мгновенна и не исключает предварительного управления.",
   "Удар по сухожилию растягивает мышцу и активирует прежде всего мышечные веретёна, а не сухожильные органы Гольджи. Один рефлекс не определяет точную локализацию поражения или сохранность произвольного движения."
  ],
  prompt:"После очага в левой задней ножке внутренней капсулы у пациента ослабли точные движения правой кисти. Какое объяснение наиболее обоснованно?",
  options:[
   "Все кортикоспинальные волокна перекрещиваются только на уровне спинного мозга.",
   "Поражение нисходящих волокон выше основного пирамидного перекрёста может нарушить движения противоположной кисти; точную локализацию уточняют другими данными.",
   "Сохранный коленный рефлекс доказывает нормальное произвольное управление кистью.",
   "Двигательная команда передаётся из базальных ганглиев непосредственно к мышечным волокнам, минуя мотонейроны."
  ],
  feedback:[
   "Большинство кортикоспинальных волокон перекрещивается в каудальном продолговатом мозге, а не только в спинном.",
   "Верно: учитываются основной перекрёст и ограниченность локализации по одному симптому.",
   "Сухожильный рефлекс оценивает отдельные сегментарные механизмы и не доказывает сохранность тонкого произвольного движения.",
   "Базальные ганглии влияют на двигательные сети через распределённые петли; скелетная мышца получает нервный выход от нижних мотонейронов."
  ],
  explanation:"Сторона слабости определяется уровнем поражения относительно перекрёста и вовлечёнными путями. Для вывода необходимы другие неврологические признаки и клинический контекст."
 },
 EN: {
  title:"From motor intention to movement correction",
  introduction:"Follow two interacting processes: descending motor command and sensory correction. This is a qualitative teaching schematic, not a complete single anatomical tract, measured latency, neuronal recording or diagnostic study.",
  preview:"First trace movement preparation and execution, then switch to feedback. Before each step, predict the contributions of cortex, brainstem, spinal circuits and receptors.",
  transcript:[
   "Association and premotor cortices interact with basal ganglia, cerebellum and thalamus during action selection and preparation. These are interconnected loops, not one serial chain.",
   "Corticospinal fibers pass through the internal capsule and medullary pyramids. Most cross in the caudal medulla; some fibers take other courses, including bilateral influences.",
   "The lateral corticospinal tract is especially important for fractionated finger movements. Reticulospinal and vestibulospinal influences support posture; these systems interact rather than replace one another.",
   "Spinal interneurons and alpha motor neurons integrate descending and peripheral inputs. The final common neural output to skeletal muscle passes through lower motor neurons.",
   "Visual, cutaneous and muscle-joint afferents provide information about ongoing movement. Cerebellar and cortical networks use feedback to correct action; correction is not necessarily instantaneous and does not exclude anticipatory control.",
   "A tendon tap stretches muscle and primarily activates muscle spindles, not Golgi tendon organs. A single reflex does not establish exact lesion localization or intact voluntary movement."
  ],
  prompt:"Following a lesion in the left posterior limb of the internal capsule, skilled movements of the right hand are weak. Which explanation is most justified?",
  options:[
   "All corticospinal fibers cross only at the spinal cord level.",
   "Injury to descending fibers above the main pyramidal decussation may impair the opposite hand; further findings are needed for precise localization.",
   "A preserved knee jerk proves that skilled voluntary hand control is intact.",
   "Basal ganglia send motor commands directly to muscle fibers, bypassing motor neurons."
  ],
  feedback:[
   "Most corticospinal fibers cross in the caudal medulla, not exclusively in the spinal cord.",
   "Correct: this accounts for the major decussation without over-localizing from one sign.",
   "A tendon reflex tests some segmental mechanisms; it does not establish intact skilled voluntary hand control.",
   "Basal ganglia influence distributed motor networks; lower motor neurons provide the neural output to skeletal muscle."
  ],
  explanation:"The side of weakness depends on lesion level relative to decussation and the pathways involved. Additional neurological findings and context are required."
 },
 KZ: {
  title:"Қозғалыс ниетінен қозғалысты түзетуге дейін",
  introduction:"Өзара әсерлесетін екі үдерісті бақылаңыз: төмендеуші қозғалтқыш команда және сенсорлық түзету. Бұл — сапалық оқу сызбасы; толық жеке анатомиялық жолды, өлшенген кідірісті, нейрон жазбасын немесе диагностикалық зерттеуді көрсетпейді.",
  preview:"Алдымен қозғалысты дайындау мен орындауды, кейін кері байланысты қараңыз. Әр қадам алдында қыртыстың, ми бағанының, жұлын желілерінің және рецепторлардың үлесін болжаңыз.",
  transcript:[
   "Ассоциативтік және премоторлық қыртыс аймақтары әрекетті таңдау мен дайындау кезінде базальды ганглийлермен, мишықпен және таламуспен өзара әрекеттеседі. Бұлар бір тізбекті жол емес, өзара байланысқан ілмектер.",
   "Кортикоспиналдық талшықтар ішкі капсула мен сопақша ми пирамидалары арқылы өтеді. Көбі сопақша мидың каудалдық бөлігінде айқасады; кейбір талшықтардың жүруі өзгеше, соның ішінде екіжақты әсерлер бар.",
   "Латералдық кортикоспиналдық жол саусақтардың жіктелген дәл қозғалыстары үшін ерекше маңызды. Ретикулоспиналдық және вестибулоспиналдық әсерлер дене қалпын сақтауға қатысады; бұл жүйелер бірін-бірі алмастырмай, өзара әрекеттеседі.",
   "Жұлын интернейрондары мен α-мотонейрондар төмендеуші және шеткі кірістерді біріктіреді. Қаңқа бұлшықетіне соңғы ортақ жүйкелік шығыс төменгі мотонейрон арқылы өтеді.",
   "Көру, тері және бұлшықет-буын афферентациясы орындалып жатқан қозғалыс туралы ақпарат береді. Мишық пен қыртыс желілері кері байланысты түзетуге қолданады; түзету міндетті түрде лезде болмайды және алдын ала басқаруды жоққа шығармайды.",
   "Сіңірді соғу бұлшықетті созып, ең алдымен Гольджи сіңір мүшелерін емес, бұлшықет ұршықтарын белсендіреді. Бір рефлекс зақымның нақты орнын немесе ерікті қозғалыстың сақталғанын анықтамайды."
  ],
  prompt:"Ішкі капсуланың сол жақ артқы аяқшасы зақымданғаннан кейін оң қол саусақтарының дәл қозғалыстары әлсіреді. Қай түсіндірме неғұрлым негізді?",
  options:[
   "Барлық кортикоспиналдық талшықтар тек жұлын деңгейінде айқасады.",
   "Негізгі пирамидалық айқасудан жоғары төмендеуші талшықтардың зақымдануы қарама-қарсы қолдың қозғалысын бұзуы мүмкін; нақты локализация үшін қосымша деректер керек.",
   "Тізе рефлексінің сақталуы қолдың дәл ерікті қозғалысының қалыпты екенін дәлелдейді.",
   "Базальды ганглийлер команданы мотонейрондарды айналып өтіп, тікелей бұлшықет талшықтарына жеткізеді."
  ],
  feedback:[
   "Кортикоспиналдық талшықтардың көбі жұлында ғана емес, сопақша мидың каудалдық бөлігінде айқасады.",
   "Дұрыс: негізгі айқасу ескеріледі, бірақ бір белгі бойынша зақым орны асыра нақтыланбайды.",
   "Сіңір рефлексі сегменттік тетіктердің бір бөлігін бағалайды; қолдың дәл ерікті қозғалысының сақталғанын дәлелдемейді.",
   "Базальды ганглийлер таралған қозғалтқыш желілерге әсер етеді; қаңқа бұлшықетіне соңғы жүйкелік шығыс төменгі мотонейрондар арқылы беріледі."
  ],
  explanation:"Әлсіздіктің жағы зақымның айқасуға қатысты деңгейіне және қамтылған жолдарға тәуелді. Қосымша неврологиялық белгілер мен клиникалық жағдайды ескеру қажет."
 }
} as const;

export function createModuleElevenMedia(language: Language, base: MediaLesson): MediaLesson {
 const c=copy[language];
 const block=base.blocks[0];
 if(!block) throw new Error("Module 11 media base block missing");
 return {...base,introduction:c.introduction,blocks:[{
  ...block,id:"module-11-command-feedback",title:c.title,preview:c.preview,
  transcript:[...c.transcript],theoryAnchor:"motor-command-and-final-common-path",
  animation:"foundation",
  question:{
   prompt:c.prompt,correctAnswer:"b",explanation:c.explanation,
   options:c.options.map((text,i)=>({id:["a","b","c","d"][i],text,feedback:c.feedback[i]}))
  }
 }]};
}
