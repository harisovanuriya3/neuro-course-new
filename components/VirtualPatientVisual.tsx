import type { CSSProperties } from "react";
import type { Language } from "../content/course";
import styles from "./VirtualPatientVisual.module.css";

type L = Record<Language, string>;
type Kind = "cell" | "pathway" | "brain" | "sensory" | "eeg";
type Config = { kind: Kind; title: L; labels: [L, L, L]; accent: string };
const l = (RU: string, KZ: string, EN: string): L => ({ RU, KZ, EN });
const labels = (a: string[], b: string[], c: string[]): [L, L, L] => [l(a[0],a[1],a[2]),l(b[0],b[1],b[2]),l(c[0],c[1],c[2])];

const configs: Record<number, Config> = {
  1:{kind:"pathway",title:l("ЦНС и периферические нервы","ОЖЖ және шеткі жүйкелер","CNS and peripheral nerves"),labels:labels(["Мозг","Ми","Brain"],["Спинной мозг","Жұлын","Spinal cord"],["Периферия","Шеткері бөлік","Periphery"]),accent:"#087e8b"},
  2:{kind:"eeg",title:l("Функциональная регистрация","Функциялық тіркеу","Functional recording"),labels:labels(["ЭЭГ","ЭЭГ","EEG"],["Стимул","Стимул","Stimulus"],["Ответ","Жауап","Response"]),accent:"#3568a8"},
  3:{kind:"cell",title:l("Нейрон и нейроглия","Нейрон және нейроглия","Neuron and neuroglia"),labels:labels(["Нейрон","Нейрон","Neuron"],["Миелин","Миелин","Myelin"],["Глия","Глия","Glia"]),accent:"#7761a8"},
  4:{kind:"cell",title:l("Мембрана и потенциал действия","Мембрана және әрекет потенциалы","Membrane and action potential"),labels:labels(["Na⁺-канал","Na⁺ арнасы","Na⁺ channel"],["Мембрана","Мембрана","Membrane"],["K⁺-канал","K⁺ арнасы","K⁺ channel"]),accent:"#b24b58"},
  5:{kind:"cell",title:l("Химический синапс","Химиялық синапс","Chemical synapse"),labels:labels(["Ca²⁺","Ca²⁺","Ca²⁺"],["Медиатор","Медиатор","Transmitter"],["Ответ","Жауап","Response"]),accent:"#8b5d9f"},
  6:{kind:"cell",title:l("Возбуждение и торможение","Қозу және тежелу","Excitation and inhibition"),labels:labels(["ВПСП","ҚПСП","EPSP"],["Интеграция","Интеграция","Integration"],["ТПСП","ТПСП","IPSP"]),accent:"#397b72"},
  7:{kind:"pathway",title:l("Рефлекторная дуга","Рефлекстік доға","Reflex arc"),labels:labels(["Рецептор","Рецептор","Receptor"],["Спинной мозг","Жұлын","Spinal cord"],["Мышца","Бұлшықет","Muscle"]),accent:"#c05b3c"},
  8:{kind:"pathway",title:l("Восходящие пути","Өрлеме жолдар","Ascending pathways"),labels:labels(["Рецептор","Рецептор","Receptor"],["Перекрёст","Айқасу","Decussation"],["Кора","Қыртыс","Cortex"]),accent:"#287aa0"},
  9:{kind:"pathway",title:l("Спинной мозг","Жұлын","Spinal cord"),labels:labels(["Задний рог","Артқы мүйіз","Dorsal horn"],["Путь","Жол","Tract"],["Передний рог","Алдыңғы мүйіз","Ventral horn"]),accent:"#985f48"},
  10:{kind:"pathway",title:l("Ствол мозга","Ми бағаны","Brainstem"),labels:labels(["Средний мозг","Ортаңғы ми","Midbrain"],["Мост","Көпір","Pons"],["Продолговатый мозг","Сопақша ми","Medulla"]),accent:"#526f9e"},
  11:{kind:"pathway",title:l("Двигательная система","Қимыл жүйесі","Motor system"),labels:labels(["Моторная кора","Қимыл қыртысы","Motor cortex"],["Пирамидный путь","Пирамидалық жол","Corticospinal tract"],["Мышца","Бұлшықет","Muscle"]),accent:"#b05b4d"},
  12:{kind:"brain",title:l("Базальные ганглии","Базальды ганглийлер","Basal ganglia"),labels:labels(["Стриатум","Стриатум","Striatum"],["Бледный шар","Бозғылт шар","Globus pallidus"],["Таламус","Таламус","Thalamus"]),accent:"#7158a6"},
  13:{kind:"brain",title:l("Мозжечковая коррекция","Мишықтық түзету","Cerebellar correction"),labels:labels(["Кора","Қыртыс","Cortex"],["Ядра","Ядролар","Nuclei"],["Ошибка","Қате","Error signal"]),accent:"#16827a"},
  14:{kind:"brain",title:l("Таламические реле","Таламустық реле","Thalamic relays"),labels:labels(["Сенсорный вход","Сенсорлық кіріс","Sensory input"],["Таламус","Таламус","Thalamus"],["Кора","Қыртыс","Cortex"]),accent:"#4b72a3"},
  15:{kind:"brain",title:l("Гипоталамический контроль","Гипоталамустық бақылау","Hypothalamic control"),labels:labels(["Осморецептор","Осморецептор","Osmoreceptor"],["Гипоталамус","Гипоталамус","Hypothalamus"],["Эффектор","Эффектор","Effector"]),accent:"#21827c"},
  16:{kind:"brain",title:l("Лимбический контур","Лимбиялық контур","Limbic circuit"),labels:labels(["Гиппокамп","Гиппокамп","Hippocampus"],["Поясная кора","Белдеулік қыртыс","Cingulate cortex"],["Гипоталамус","Гипоталамус","Hypothalamus"]),accent:"#9a5b76"},
  17:{kind:"brain",title:l("Миндалина и стресс-ответ","Амигдала және стресс жауабы","Amygdala and stress response"),labels:labels(["Стимул","Стимул","Stimulus"],["Миндалина","Амигдала","Amygdala"],["Ответ","Жауап","Response"]),accent:"#a65252"},
  18:{kind:"brain",title:l("Функциональная кора","Функциялық қыртыс","Functional cortex"),labels:labels(["Лобная","Маңдай","Frontal"],["Теменная","Төбе","Parietal"],["Затылочная","Шүйде","Occipital"]),accent:"#456da0"},
  19:{kind:"pathway",title:l("Болевой путь и соматотопия","Ауырсыну жолы және соматотопия","Pain pathway and somatotopy"),labels:labels(["Ноцицептор","Ноцицептор","Nociceptor"],["Спиноталамический путь","Спиноталамустық жол","Spinothalamic tract"],["Кора","Қыртыс","Cortex"]),accent:"#bc493f"},
  20:{kind:"sensory",title:l("Зрительный анализатор","Көру анализаторы","Visual system"),labels:labels(["Сетчатка","Тор қабық","Retina"],["Хиазма","Хиазма","Chiasm"],["Зрительная кора","Көру қыртысы","Visual cortex"]),accent:"#596bb2"},
  21:{kind:"sensory",title:l("Слух и вестибулярная система","Есту және вестибулярлық жүйе","Auditory and vestibular systems"),labels:labels(["Улитка","Ұлу","Cochlea"],["Вестибулярные ядра","Вестибулярлық ядролар","Vestibular nuclei"],["Кора","Қыртыс","Cortex"]),accent:"#27808c"},
  22:{kind:"pathway",title:l("Вегетативная регуляция","Вегетативтік реттелу","Autonomic regulation"),labels:labels(["Рецептор","Рецептор","Receptor"],["ВНС","ВЖЖ","ANS"],["Орган","Мүше","Organ"]),accent:"#437d68"},
  23:{kind:"brain",title:l("Обучение и память","Оқу және жад","Learning and memory"),labels:labels(["Кодирование","Кодтау","Encoding"],["Гиппокамп","Гиппокамп","Hippocampus"],["Извлечение","Қайта жаңғырту","Retrieval"]),accent:"#7862a0"},
  24:{kind:"eeg",title:l("Сон и ЭЭГ","Ұйқы және ЭЭГ","Sleep and EEG"),labels:labels(["Бодрствование","Сергектік","Wake"],["NREM","NREM","NREM"],["REM","REM","REM"]),accent:"#495f9e"},
  25:{kind:"cell",title:l("Синаптическая пластичность","Синапстық пластикалылық","Synaptic plasticity"),labels:labels(["До обучения","Оқуға дейін","Before learning"],["Укрепление","Күшейту","Potentiation"],["Новая сеть","Жаңа желі","New network"]),accent:"#6e5aa8"},
};

const copy={RU:{stage:"Этап",scene:"Динамическая учебная схема",phase:"Текущая фаза",changed:"Сцена изменена выбранным действием"},KZ:{stage:"Кезең",scene:"Динамикалық оқу сызбасы",phase:"Ағымдағы фаза",changed:"Көрініс таңдалған әрекетпен өзгертілді"},EN:{stage:"Stage",scene:"Dynamic teaching diagram",phase:"Current phase",changed:"Scene updated by the selected action"}} as const;

function Scene({config,active,selected}:{config:Config;active:number;selected:number|null}) {
  const id=`arrow-${active}-${selected??"none"}`, wave="M20 110 C35 110 38 70 52 110 S72 150 87 110 S108 78 122 110 S143 140 158 110 S180 62 194 110 S216 150 230 110 S252 80 266 110 S288 138 302 110 S324 72 340 110 S365 145 400 110";
  return <svg viewBox="0 0 420 220" role="img" aria-label={config.title.EN} className={styles.diagram} style={{"--scene-accent":config.accent} as CSSProperties}>
    <defs><marker id={id} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto"><path d="M0 0 10 5 0 10Z" fill={config.accent}/></marker></defs>
    <rect x="8" y="8" width="404" height="204" rx="24" className={styles.diagramBg}/>
    {config.kind==="eeg"?<>{[55,88,121,154].map((y,i)=><path key={y} d={wave} transform={`translate(0 ${y-110}) scale(1 ${.35+i*.12})`} className={i===active%4?styles.activeTrace:styles.trace}/>)}<line x1="20" y1="181" x2={50+active*58} y2="181" className={styles.cursor}/></>:<>
      <path d="M72 106 C112 40 165 40 210 106 S302 172 348 106" className={styles.route} markerEnd={`url(#${id})`}/>
      {config.kind==="brain"&&<path d="M125 55C125 20 190 17 215 43C255 25 304 54 294 94C322 126 284 169 244 158C215 187 157 173 151 140C112 130 99 86 125 55Z" className={styles.organ}/>} 
      {config.kind==="sensory"&&<><path d="M44 70Q72 42 100 70Q72 98 44 70Z" className={styles.organ}/><circle cx="72" cy="70" r="10" className={styles.pupil}/><path d="M320 58q34 45 0 90q-32-45 0-90" className={styles.organ}/></>}
      {config.kind==="cell"&&[118,145,172,199,226,253,280].map((x,i)=><circle key={x} cx={x} cy={72+(i%2)*17} r="7" className={i<=active?styles.vesicleActive:styles.vesicle}/>)}
      {[[72,106],[210,106],[348,106]].map(([x,y],i)=><g key={x} className={i===active%3?styles.activeNode:styles.node}><circle cx={x} cy={y} r={i===active%3?31:25}/><text x={x} y={y+4}>{i+1}</text></g>)}
    </>}
    {selected!==null&&<path d={`M${52+selected*18} 194H${185+active*25}`} className={styles.decisionPulse}/>} 
  </svg>;
}

export default function VirtualPatientVisual({moduleId,stage,selected,language}:{moduleId:number;stage:number;selected:number|null;language:Language}) {
  const config=configs[moduleId]??configs[1], safeStage=Math.max(1,Math.min(6,stage)), active=(safeStage-1+(selected??0))%6, c=copy[language];
  return <figure className={styles.figure} data-testid="virtual-patient-visual" data-module={moduleId} data-stage={safeStage} data-selected={selected??"none"}>
    <div className={styles.mediaHeader}><div><span>{c.scene}</span><strong>{config.title[language]}</strong></div><b>{c.stage} {safeStage}/6</b></div>
    <Scene config={config} active={active} selected={selected}/>
    <div className={styles.structureLegend}>{config.labels.map((label,i)=><span key={label.EN} className={i===active%3?styles.legendActive:undefined}><i>{i+1}</i>{label[language]}</span>)}</div>
    <figcaption><span>{c.phase}: {config.labels[active%3][language]}</span>{selected!==null&&<strong>{c.changed}</strong>}</figcaption>
  </figure>;
}
