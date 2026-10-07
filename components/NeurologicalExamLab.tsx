"use client";

import {useState} from "react";
import type {Language} from "../content/course";

type Domain="mental"|"cranial"|"motor"|"sensory"|"coordination";
const T={
 RU:{title:"Виртуальная станция: короткий неврологический осмотр",intro:"Выберите часть осмотра. Посмотрите, что она проверяет и какую область нервной системы помогает оценить.",test:"Что проверяем",link:"Какая система связана",finding:"Пример отклонения",domains:{
 mental:["Психический статус","Ориентация, внимание, память, речь, поведение","Кора больших полушарий и распределённые когнитивные сети","Нарушение речи, памяти, внимания или поведения"],
 cranial:["Черепные нервы","Зрение, движения глаз, чувствительность лица, мимика, слух, глотание, язык","Передний мозг, ствол мозга и периферические черепные нервы","Диплопия, асимметрия лица, дисфагия, нарушение чувствительности или слуха"],
 motor:["Двигательная система","Сила, тонус, произвольные движения и рефлексы","Моторная кора, нисходящие пути, спинной мозг, периферический нерв, нервно-мышечное соединение и мышца","Слабость, изменение тонуса или рефлексов"],
 sensory:["Чувствительность","Осязание, боль, температура, вибрация, положение суставов","Рецепторы, периферические нервы, спинной мозг, ствол, таламус и соматосенсорная кора","Выпадение определённого вида чувствительности или характерное распределение дефицита"],
 coordination:["Координация и походка","Точность движения, равновесие, быстрые чередующиеся движения, походка","Мозжечок, вестибулярная система, проприоцепция и моторные сети","Атаксия, дисметрия, нарушение равновесия или походки"]
 }},
 EN:{title:"Virtual station: brief neurological exam",intro:"Choose one part of the exam. See what it tests and which part of the nervous system it helps assess.",test:"What is tested",link:"Related system",finding:"Example abnormal finding",domains:{
 mental:["Mental status","Orientation, attention, memory, language, and behavior","Cerebral cortex and distributed cognitive networks","Language, memory, attention, or behavioral impairment"],
 cranial:["Cranial nerves","Vision, eye movement, facial sensation, facial movement, hearing, swallowing, and tongue movement","Forebrain, brainstem, and peripheral cranial nerves","Diplopia, facial asymmetry, dysphagia, sensory loss, or hearing impairment"],
 motor:["Motor system","Strength, tone, voluntary movement, and reflexes","Motor cortex, descending pathways, spinal cord, peripheral nerve, neuromuscular junction, and muscle","Weakness or abnormal tone/reflexes"],
 sensory:["Sensory system","Touch, pain, temperature, vibration, and joint position","Receptors, peripheral nerves, spinal cord, brainstem, thalamus, and somatosensory cortex","Loss of a sensory modality or a characteristic pattern of deficit"],
 coordination:["Coordination and gait","Movement accuracy, balance, rapid alternating movement, and gait","Cerebellum, vestibular system, proprioception, and motor networks","Ataxia, dysmetria, or impaired balance/gait"]
 }},
 KZ:{title:"Виртуалды станция: қысқа неврологиялық тексеру",intro:"Тексерудің бір бөлігін таңдаңыз. Ол нені тексеретінін және жүйке жүйесінің қай бөлігін бағалауға көмектесетінін көріңіз.",test:"Не тексеріледі",link:"Қай жүйемен байланысты",finding:"Ауытқу мысалы",domains:{
 mental:["Психикалық статус","Бағдар, зейін, жад, сөйлеу және мінез-құлық","Ми қыртысы және таралған когнитивтік желілер","Сөйлеу, жад, зейін немесе мінез-құлық бұзылысы"],
 cranial:["Бассүйек нервтері","Көру, көз қозғалысы, бет сезімталдығы, мимика, есту, жұту және тіл қозғалысы","Алдыңғы ми, ми бағаны және шеткі бассүйек нервтері","Диплопия, бет асимметриясы, дисфагия, сезімталдық немесе есту бұзылысы"],
 motor:["Қозғалыс жүйесі","Күш, тонус, ерікті қозғалыс және рефлекстер","Моторлық қыртыс, төмендеуші жолдар, жұлын, шеткі нерв, жүйке-бұлшықет түйіні және бұлшықет","Әлсіздік, тонус немесе рефлекс өзгерісі"],
 sensory:["Сезімталдық","Жанасу, ауырсыну, температура, вибрация және буын қалпы","Рецепторлар, шеткі нервтер, жұлын, ми бағаны, таламус және соматосенсорлық қыртыс","Белгілі сезім түрінің жоғалуы немесе тән таралуы"],
 coordination:["Үйлестіру және жүріс","Қозғалыс дәлдігі, тепе-теңдік, жылдам кезектескен қозғалыс және жүріс","Мишық, вестибулярлық жүйе, проприоцепция және моторлық желілер","Атаксия, дисметрия, тепе-теңдік немесе жүріс бұзылысы"]
 }}
} as const;

export default function NeurologicalExamLab({language}:{language:Language}){
 const t=T[language]; const [domain,setDomain]=useState<Domain>("mental"); const d=t.domains[domain];
 return <section style={{margin:"26px 0",padding:18,border:"1px solid #cfe0ea",borderRadius:16,background:"#fff"}}>
  <h2>{t.title}</h2><p>{t.intro}</p><div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{(Object.keys(t.domains) as Domain[]).map(k=><button key={k} type="button" aria-pressed={domain===k} onClick={()=>setDomain(k)}>{t.domains[k][0]}</button>)}</div>
  <div style={{marginTop:12,display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:10}}>
   <article style={{padding:12,borderRadius:12,background:"#f8fcff"}}><h3>{t.test}</h3><p>{d[1]}</p></article>
   <article style={{padding:12,borderRadius:12,background:"#f8fcff"}}><h3>{t.link}</h3><p>{d[2]}</p></article>
   <article style={{padding:12,borderRadius:12,background:"#fff8f5"}}><h3>{t.finding}</h3><p>{d[3]}</p></article>
  </div>
 </section>
}
