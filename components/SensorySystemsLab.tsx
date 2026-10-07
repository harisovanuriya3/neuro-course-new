"use client";
import {useEffect,useMemo,useState} from "react";
import type {Language} from "../content/course";
import styles from "./SensorySystemsLab.module.css";
import {recordOutcome} from "../lib/courseProgress";

type Analyzer={
 id:string;icon:string;ru:string;en:string;kz:string;
 receptor:string;stimulus:string;path:string;center:string;cortex:string;
 lesion:string; organ:string; nodes:[string,string,string,string,string];
};

const A:Analyzer[]=[
{id:"visual",icon:"👁️",ru:"Зрительный",en:"Visual",kz:"Көру",receptor:"Палочки и колбочки сетчатки",stimulus:"Свет",path:"Зрительный нерв II → хиазма → зрительный тракт",center:"Латеральное коленчатое тело",cortex:"Поле 17, затылочная кора",lesion:"Поражение пути вызывает характерные дефекты поля зрения в зависимости от уровня.",organ:"Глаз и сетчатка",nodes:["Сетчатка","Зрительный нерв","Хиазма / тракт","ЛКТ таламуса","Затылочная кора"]},
{id:"auditory",icon:"👂",ru:"Слуховой",en:"Auditory",kz:"Есту",receptor:"Волосковые клетки органа Корти",stimulus:"Звуковые колебания",path:"Улитковый нерв → улитковые ядра → верхняя олива → латеральная петля",center:"Нижний холмик и медиальное коленчатое тело",cortex:"Поля 41–42, височная кора",lesion:"Одностороннее центральное поражение редко вызывает полную глухоту из-за двусторонних проекций.",organ:"Наружное, среднее и внутреннее ухо",nodes:["Орган Корти","VIII нерв","Стволовые ядра","МКТ таламуса","Слуховая кора"]},
{id:"vestibular",icon:"🧭",ru:"Вестибулярный",en:"Vestibular",kz:"Вестибулярлық",receptor:"Волосковые клетки полукружных каналов, маточки и мешочка",stimulus:"Угловое/линейное ускорение, положение головы",path:"Вестибулярный нерв → вестибулярные ядра → мозжечок / таламус",center:"Вестибулярные ядра, мозжечок, таламус",cortex:"Теменно-островковая вестибулярная кора",lesion:"Поражение может вызывать головокружение, нистагм и нарушение равновесия.",organ:"Лабиринт внутреннего уха",nodes:["Лабиринт","VIII нерв","Вестибулярные ядра","Таламус / мозжечок","Вестибулярная кора"]},
{id:"olfactory",icon:"👃",ru:"Обонятельный",en:"Olfactory",kz:"Иіс сезу",receptor:"Обонятельные рецепторные нейроны эпителия",stimulus:"Пахучие молекулы",path:"I нерв → обонятельная луковица → тракт",center:"Обонятельная луковица и лимбические структуры",cortex:"Пириформная кора",lesion:"Повреждение рецепторов, волокон I нерва или луковицы может вызвать аносмию.",organ:"Обонятельный эпителий носовой полости",nodes:["Эпителий","I нерв","Луковица","Обонятельный тракт","Пириформная кора"]},
{id:"gustatory",icon:"👅",ru:"Вкусовой",en:"Gustatory",kz:"Дәм сезу",receptor:"Вкусовые рецепторные клетки",stimulus:"Растворённые химические вещества",path:"VII, IX, X → ядро одиночного пути → VPM",center:"Ядро одиночного пути и VPM таламуса",cortex:"Островок и фронтальный оперкулум",lesion:"Поражение периферических нервов или центрального пути может вызвать гипогевзию или дисгевзию.",organ:"Язык и вкусовые почки",nodes:["Вкусовая почка","VII/IX/X","Ядро одиночного пути","VPM таламуса","Вкусовая кора"]},
{id:"touch",icon:"✋",ru:"Осязание / давление",en:"Touch / pressure",kz:"Жанасу / қысым",receptor:"Механорецепторы кожи",stimulus:"Прикосновение, давление, вибрация",path:"Задние столбы → ядра Голля/Бурдаха → медиальная петля",center:"VPL таламуса",cortex:"Поля 3,1,2 постцентральной извилины",lesion:"Поражение задних столбов нарушает тонкое осязание и сознательную проприоцепцию ниже очага.",organ:"Кожа",nodes:["Механорецептор","Задний корешок","Задние столбы","VPL таламуса","S1 кора"]},
{id:"pain",icon:"⚡",ru:"Болевой",en:"Pain",kz:"Ауырсыну",receptor:"Свободные нервные окончания / ноцицепторы",stimulus:"Повреждающий механический, термический или химический стимул",path:"Aδ/C → задний рог → спиноталамический тракт",center:"Таламус, ретикулярная формация, PAG",cortex:"S1/S2, островок, передняя поясная кора",lesion:"Поражение антеролатеральной системы снижает болевую чувствительность контралатерально ниже уровня.",organ:"Кожа и глубокие ткани",nodes:["Ноцицептор","Задний рог","Спиноталамический тракт","Таламус","Кора боли"]},
{id:"temperature",icon:"🌡️",ru:"Температурный",en:"Temperature",kz:"Температура",receptor:"Терморецепторы кожи",stimulus:"Тепло и холод",path:"Задний рог → антеролатеральная система → таламус",center:"Таламус; гипоталамус для терморегуляции",cortex:"Островковая и соматосенсорная кора",lesion:"Поражение антеролатерального пути нарушает температурную чувствительность ниже очага.",organ:"Кожа",nodes:["Терморецептор","Задний рог","Антеролатеральный путь","Таламус","Кора"]},
{id:"proprio",icon:"🦵",ru:"Проприоцептивный",en:"Proprioceptive",kz:"Проприоцептивтік",receptor:"Мышечные веретёна, органы Гольджи, суставные рецепторы",stimulus:"Длина мышцы, натяжение, положение сустава",path:"Задние столбы и спинно-мозжечковые пути",center:"Мозжечок и таламус",cortex:"Поля 3,1,2",lesion:"Поражение сознательной проприоцепции вызывает сенсорную атаксию и положительный симптом Ромберга.",organ:"Мышцы, сухожилия, суставы",nodes:["Проприорецептор","Спинной мозг","Задние столбы","Таламус / мозжечок","S1 кора"]},
{id:"visceral",icon:"🫀",ru:"Висцеральный",en:"Visceral",kz:"Висцералдық",receptor:"Механо- и хеморецепторы внутренних органов",stimulus:"Растяжение, давление, химические изменения",path:"Висцеральные афференты IX/X и спинальных нервов",center:"Ядро одиночного пути, гипоталамус, таламус",cortex:"Островок и поясная кора",lesion:"Нарушение интероцептивных путей меняет восприятие состояния внутренних органов и автономные рефлексы.",organ:"Внутренние органы и сосуды",nodes:["Висцеральный рецептор","Афферентный нерв","Ствол / спинной мозг","Таламус / гипоталамус","Островковая кора"]}
];

const T={
 RU:{title:"Динамическая лаборатория анализаторов",intro:"Выберите анализатор. Нажмите «Запустить»: импульс пройдёт по анатомическому пути от рецептора к коре. Можно остановить анимацию, выбрать отдельную структуру или смоделировать повреждение.",modes:["Норма","Повреждение пути","Сравнение"],run:"Запустить",pause:"Пауза",resume:"Продолжить",reset:"Сброс",speed:"Скорость",slow:"Медленно",normal:"Нормально",fast:"Быстро",organ:"Анатомическая структура",function:"Что происходит здесь",lesion:"Если этот уровень повреждён",compare:"Сравнить с",selectLesion:"Нажмите структуру, которую хотите «повредить»."},
 EN:{title:"Dynamic sensory analyzer laboratory",intro:"Choose an analyzer and press Start. The impulse will travel from receptor to cortex. Pause the animation, inspect any structure, or simulate a lesion.",modes:["Normal","Pathway lesion","Compare"],run:"Start",pause:"Pause",resume:"Resume",reset:"Reset",speed:"Speed",slow:"Slow",normal:"Normal",fast:"Fast",organ:"Anatomical structure",function:"What happens here",lesion:"If this level is damaged",compare:"Compare with",selectLesion:"Select the structure you want to lesion."},
 KZ:{title:"Анализаторлардың динамикалық зертханасы",intro:"Анализаторды таңдап, «Іске қосу» түймесін басыңыз: импульс рецептордан қыртысқа дейін өтеді. Анимацияны тоқтатып, құрылымды таңдап немесе зақымдануды модельдеуге болады.",modes:["Қалыпты","Жолдың зақымдануы","Салыстыру"],run:"Іске қосу",pause:"Үзіліс",resume:"Жалғастыру",reset:"Қалпына келтіру",speed:"Жылдамдық",slow:"Баяу",normal:"Қалыпты",fast:"Жылдам",organ:"Анатомиялық құрылым",function:"Бұл жерде не болады",lesion:"Осы деңгей зақымдалса",compare:"Салыстыру",selectLesion:"Зақымдағыңыз келетін құрылымды таңдаңыз."}
} as const;

const name=(a:Analyzer,l:Language)=>l==="RU"?a.ru:l==="KZ"?a.kz:a.en;

export default function SensorySystemsLab({language}:{language:Language}){
 const t=T[language];
 const[selected,setSelected]=useState(0);
 const[active,setActive]=useState(0);
 const[running,setRunning]=useState(false);
 const[paused,setPaused]=useState(false);
 const[mode,setMode]=useState(0);
 const[lesion,setLesion]=useState<number|null>(null);
 const[speed,setSpeed]=useState(1);
 const[compare,setCompare]=useState(1);
 const[prediction,setPrediction]=useState("");
 const[predictionChoice,setPredictionChoice]=useState<"distal"|"level"|"none"|null>(null);
 const[reflection,setReflection]=useState("");
 const a=A[selected], b=A[compare];
 useEffect(()=>{if(!running||paused)return; const delay=[1400,850,520][speed]; const id=setTimeout(()=>setActive(s=>{if(mode===1&&lesion!==null&&s>=lesion){setRunning(false);return lesion} if(s>=4){setRunning(false);return 4} return s+1}),delay); return()=>clearTimeout(id)},[running,paused,active,speed,mode,lesion]);
 const localDetail=(kind:"receptor"|"path"|"center"|"cortex"|"lesion",x:Analyzer)=>{
 if(language==="RU") return x[kind];
 const names:Record<string,{EN:string;KZ:string}>={
 visual:{EN:"retina → optic nerve → chiasm/tract → LGN → primary visual cortex",KZ:"торқабық → көру жүйкесі → хиазма/тракт → латералды тізелі дене → алғашқы көру қыртысы"},
 auditory:{EN:"organ of Corti → CN VIII → brainstem nuclei → MGN → auditory cortex",KZ:"Корти мүшесі → VIII жүйке → ми бағаны ядролары → медиалды тізелі дене → есту қыртысы"},
 vestibular:{EN:"labyrinth → vestibular nerve → vestibular nuclei/cerebellum → thalamus → vestibular cortex",KZ:"лабиринт → вестибулярлық жүйке → вестибулярлық ядролар/мишық → таламус → вестибулярлық қыртыс"},
 olfactory:{EN:"olfactory epithelium → CN I → bulb/tract → piriform cortex",KZ:"иіс эпителийі → I жүйке → иіс баданасы/тракт → пириформды қыртыс"},
 gustatory:{EN:"taste receptors → CN VII/IX/X → solitary nucleus → VPM → gustatory cortex",KZ:"дәм рецепторлары → VII/IX/X → жалғыз жол ядросы → VPM → дәм қыртысы"},
 touch:{EN:"skin mechanoreceptors → dorsal root → dorsal columns → VPL → S1",KZ:"тері механорецепторлары → артқы түбір → артқы бағандар → VPL → S1"},
 pain:{EN:"nociceptors → dorsal horn → spinothalamic tract → thalamus → pain cortex",KZ:"ноцицепторлар → артқы мүйіз → жұлын-таламус жолы → таламус → ауырсыну қыртысы"},
 temperature:{EN:"thermoreceptors → dorsal horn → anterolateral system → thalamus → cortex",KZ:"терморецепторлар → артқы мүйіз → антеролатералды жүйе → таламус → қыртыс"},
 proprio:{EN:"proprioceptors → spinal cord → dorsal columns/spinocerebellar pathways → thalamus/cerebellum → S1",KZ:"проприорецепторлар → жұлын → артқы бағандар/жұлын-мишық жолдары → таламус/мишық → S1"},
 visceral:{EN:"visceral receptors → visceral afferents → brainstem/spinal cord → hypothalamus/thalamus → insula",KZ:"висцералды рецепторлар → висцералды афференттер → ми бағаны/жұлын → гипоталамус/таламус → аралша қыртыс"}
 };
 const pathway=names[x.id]?.[language]??x.path;
 if(kind==="path"||kind==="center"||kind==="cortex"||kind==="receptor") return pathway;
 return language==="EN"?"A lesion interrupts transmission at this level and impairs functions represented downstream.":"Зақым осы деңгейдегі өткізуді үзіп, одан кейінгі құрылымдар көрсететін функцияларды бұзады.";
};
function choose(i:number){setSelected(i);setActive(0);setRunning(false);setPaused(false);setLesion(null);setPrediction("");setPredictionChoice(null);setReflection("")}
 function run(){setActive(0);if(mode!==1)setLesion(null);setPaused(false);setRunning(true);recordOutcome(21,"interactive",1,1);if(mode===1&&lesion!==null){const correct=predictionChoice==="distal";recordOutcome(21,"criterion:clinical:sensory-lesion",correct?1:0,1)}}
 const nodeText=useMemo(()=>[a.receptor,a.path,a.center,a.cortex,a.cortex],[a]);
 return <section className={styles.lab}>
  <div className={styles.header}><div><h2>{t.title}</h2><p>{t.intro}</p></div></div>
  <div className={styles.mode}>{t.modes.map((m,i)=><button type="button" key={m} data-active={mode===i} onClick={()=>{setMode(i);setRunning(false);setPaused(false);setLesion(null)}}>{m}</button>)}</div>
  <div className={styles.grid}>
   <aside className={styles.list}>{A.map((x,i)=><button type="button" className={styles.analyzer} data-active={selected===i} key={x.id} onClick={()=>choose(i)}><span className={styles.icon}>{x.icon}</span><span>{name(x,language)}</span></button>)}</aside>
   <div className={styles.main}>
    {mode!==2&&<>
      <div className={styles.visualWrap}>
       <svg viewBox="0 0 900 430" className={styles.anatomySvg} role="img" aria-label={name(a,language)}>
        <defs><filter id="g"><feGaussianBlur stdDeviation="5" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>
        <path className={styles.bodySilhouette} d="M70 315 C125 260 160 230 205 215 C260 195 315 205 365 230 C430 260 475 230 520 205 C585 165 650 145 740 150 C795 153 835 180 858 220 L858 355 L70 355 Z"/>
        <ellipse className={styles.organShape} cx="125" cy="245" rx="58" ry="45"/><text x="125" y="250" textAnchor="middle" className={styles.organLabel}>{a.icon}</text>
        <ellipse className={styles.brainShape} cx="770" cy="205" rx="82" ry="62"/><path className={styles.cortexShape} d="M718 205c28-48 92-48 105-4c-9 42-75 56-105 4Z"/>
        <path className={styles.basePath} d="M170 245 C280 205 330 215 405 250 C485 285 560 235 630 215 C680 200 720 200 745 205"/>
        <path className={styles.basePath2} d="M405 250 C455 215 495 195 535 190"/>
        {running||active>0?<path className={styles.flowPath} data-paused={paused} d="M170 245 C280 205 330 215 405 250 C485 285 560 235 630 215 C680 200 720 200 745 205"/>:null}
        {[0,1,2,3,4].map((n)=>{const pts=[[170,245],[330,215],[465,255],[630,215],[745,205]][n];return <g key={n} className={styles.node} data-active={active===n} data-done={active>n} data-lesion={lesion===n} onClick={()=>{setActive(n);if(mode===1)setLesion(n)}} role="button" tabIndex={0}><circle cx={pts[0]} cy={pts[1]} r="24"/><text x={pts[0]} y={pts[1]+5} textAnchor="middle">{n+1}</text></g>})}
       </svg>
       <div className={styles.stageRail}>{a.nodes.map((n,i)=><button key={n} type="button" data-active={active===i} data-done={active>i} data-lesion={lesion===i} onClick={()=>{setActive(i);if(mode===1)setLesion(i)}}><b>{i+1}</b><span>{n}</span></button>)}</div>
      </div>
      {mode===1&&<><label style={{display:"block",margin:"12px 0",fontWeight:700}}>{language==="RU"?"До запуска предскажите дефицит при выбранном повреждении":language==="KZ"?"Іске қоспас бұрын таңдалған зақым кезіндегі тапшылықты болжаңыз":"Before starting, predict the deficit from the selected lesion"}<textarea value={prediction} onChange={e=>setPrediction(e.target.value)} rows={2} style={{width:"100%",marginTop:6}} />
<div role="group" aria-label={language==="RU"?"Направление дефицита":language==="KZ"?"Тапшылық бағыты":"Deficit direction"} style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:8}}>
{([
 ["distal",language==="RU"?"Функция нарушится после уровня поражения":language==="KZ"?"Зақым деңгейінен кейін функция бұзылады":"Function is disrupted downstream of the lesion"],
 ["level",language==="RU"?"Нарушится только выбранная структура":language==="KZ"?"Тек таңдалған құрылым бұзылады":"Only the selected structure is affected"],
 ["none",language==="RU"?"Дефицита не будет":language==="KZ"?"Тапшылық болмайды":"No deficit"]
] as const).map(([v,label])=><button type="button" key={v} aria-pressed={predictionChoice===v} onClick={()=>setPredictionChoice(v)}>{label}</button>)}
</div></label><div className={styles.damageHint}><strong>{t.selectLesion}</strong><span>{language==="RU"?"После выбора нажмите «Запустить». Импульс остановится на повреждённом уровне.":language==="KZ"?"Таңдағаннан кейін «Іске қосу» басыңыз. Импульс зақым деңгейінде тоқтайды.":"Then press Start. The impulse will stop at the damaged level."}</span></div></>}
      <div className={styles.controls}><button type="button" onClick={run} disabled={mode===1&&(lesion===null||!predictionChoice||prediction.trim().length<20)}>▶ {t.run}</button><button type="button" onClick={()=>setPaused(p=>!p)} disabled={!running}>{paused?"▶ "+t.resume:"Ⅱ "+t.pause}</button><button type="button" onClick={()=>{setRunning(false);setPaused(false);setActive(0);setLesion(null)}}>↻ {t.reset}</button><label>{t.speed}<select value={speed} onChange={e=>setSpeed(+e.target.value)}><option value={0}>{t.slow}</option><option value={1}>{t.normal}</option><option value={2}>{t.fast}</option></select></label></div>
      <div className={styles.infoPanel}><div><strong>{t.organ}</strong><p>{a.nodes[active]}</p></div><div><strong>{t.function}</strong><p>{localDetail(active===0?"receptor":active===1?"path":active===2?"center":"cortex",a)}</p></div>{mode===1&&!running&&active===lesion&&active>0&&<div className={styles.lesionBox}><strong>{t.lesion}</strong><p>{lesion===null?t.selectLesion:<><b>{a.nodes[lesion]}</b>. {localDetail("lesion",a)}</>}</p></div>}</div>{mode===1&&lesion!==null&&!running&&active===lesion&&active>0&&<label style={{display:"block",marginTop:12}}>{language==="RU"?"После опыта объясните, почему возник именно такой дефицит":language==="KZ"?"Тәжірибеден кейін бұл тапшылықтың неліктен пайда болғанын түсіндіріңіз":"After the experiment, explain why this deficit occurs"}<textarea value={reflection} onChange={e=>{const v=e.target.value;setReflection(v);if(v.trim().length>=30){recordOutcome(21,"criterion:justification:sensory-lesion",1,1);recordOutcome(21,"criterion:correction:sensory-reflection",1,1)}}} rows={3} style={{width:"100%",marginTop:6}} /></label>}
    </>}
    {mode===2&&<div className={styles.compareMode}><label>{t.compare}: <select value={compare} onChange={e=>setCompare(+e.target.value)}>{A.map((x,i)=><option value={i} key={x.id}>{name(x,language)}</option>)}</select></label><div className={styles.compareCards}><article><h3>{a.icon} {name(a,language)}</h3><p><b>{a.nodes[0]}:</b> {a.receptor}</p><p><b>{a.nodes[2]}:</b> {a.center}</p><p><b>{a.nodes[4]}:</b> {a.cortex}</p></article><article><h3>{b.icon} {name(b,language)}</h3><p><b>{b.nodes[0]}:</b> {b.receptor}</p><p><b>{b.nodes[2]}:</b> {b.center}</p><p><b>{b.nodes[4]}:</b> {b.cortex}</p></article></div></div>}
   </div>
  </div>
 </section>
}