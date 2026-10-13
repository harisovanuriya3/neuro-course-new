"use client";
import {useId,useState} from "react";
import type {Language} from "../content/course";
import ExperimentReflection from "./ExperimentReflection";
import {recordOutcome} from "../lib/courseProgress";
type Path="dorsal"|"spinothalamic"|"corticospinal"; type Side="left"|"right";
type Row={id:number;path:Path;side:Side;level:string;finding:string;note:string};
import { pathwayResult, type SpinalLevel } from "../lib/pathwayModel";
import styles from "./PathwayLab.module.css";
const T={RU:{title:"Лаборатория проводящих путей",intro:"Выберите путь и сторону условного поражения. Проследите направление сигнала, место перекрёста и ожидаемую сторону дефицита ниже выбранного уровня.",path:"Путь",side:"Сторона поражения",left:"левая",right:"правая",level:"Уровень",save:"Записать опыт",finding:"Ожидаемый учебный результат",note:"Объясните через место перекрёста",paths:{dorsal:"Задние канатики — медиальная петля",spinothalamic:"Спиноталамический путь",corticospinal:"Латеральный кортикоспинальный путь"},findings:{dorsal:"Ниже спинального поражения: ипсилатеральное нарушение тонкого осязания/вибрации/проприоцепции.",spinothalamic:"После сегментарного перекрёста: преимущественно контралатеральное нарушение боли и температуры ниже поражения.",corticospinal:"Ниже спинального поражения: ипсилатеральные признаки поражения нисходящего кортикоспинального пути."},limit:"Это локализационная учебная модель спинального поражения. Реальная клиническая картина зависит от точного уровня, протяжённости поражения и анатомии волокон; для спиноталамического пути начало дефицита может не совпадать точно с уровнем очага."},EN:{title:"Neural pathway laboratory",intro:"Choose a tract and side of a teaching lesion. Trace signal direction, decussation, and the expected side of deficit below the selected level.",path:"Pathway",side:"Lesion side",left:"left",right:"right",level:"Level",save:"Record trial",finding:"Expected teaching finding",note:"Explain using the decussation",paths:{dorsal:"Dorsal column–medial lemniscus",spinothalamic:"Spinothalamic tract",corticospinal:"Lateral corticospinal tract"},findings:{dorsal:"Below a spinal lesion: ipsilateral loss of fine touch/vibration/proprioception.",spinothalamic:"After segmental crossing: predominantly contralateral loss of pain and temperature below the lesion.",corticospinal:"Below a spinal lesion: ipsilateral signs of descending corticospinal tract damage."},limit:"This is a localization model of a spinal lesion. Real findings depend on exact level, lesion extent and fiber anatomy; spinothalamic sensory loss may not begin exactly at the lesion level."},KZ:{title:"Өткізгіш жолдар зертханасы",intro:"Жолды және шартты зақымдану жағын таңдаңыз. Сигнал бағытын, айқасу орнын және таңдалған деңгейден төмен күтілетін тапшылық жағын бақылаңыз.",path:"Жол",side:"Зақым жағы",left:"сол",right:"оң",level:"Деңгей",save:"Тәжірибені жазу",finding:"Күтілетін оқу нәтижесі",note:"Айқасу орны арқылы түсіндіріңіз",paths:{dorsal:"Артқы бағандар — медиалдық ілмек",spinothalamic:"Спиноталамустық жол",corticospinal:"Латералды кортикоспиналдық жол"},findings:{dorsal:"Жұлын зақымынан төмен: нәзік жанасу/вибрация/проприоцепцияның ипсилатералды бұзылысы.",spinothalamic:"Сегменттік айқасудан кейін: зақымнан төмен ауырсыну мен температураның негізінен контралатералды бұзылысы.",corticospinal:"Жұлын зақымынан төмен: төмендейтін кортикоспиналдық жол зақымының ипсилатералды белгілері."},limit:"Бұл жұлын зақымын локализациялауға арналған оқу моделі. Нақты көрініс деңгейге, зақым көлеміне және талшық анатомиясына тәуелді; спиноталамустық тапшылық ошақ деңгейімен дәл сәйкес келмеуі мүмкін."}} as const;
const U={
 RU:{brain:"Кора",medulla:"Продолговатый мозг",spinal:"Спинной мозг",body:"Тело ниже очага",lesion:"Очаг",deficit:"Сторона дефицита",segment:"Сегмент спинного мозга, не позвонок",cross:"Перекрёст",direction:"Направление сигнала",up:"К коре",down:"От коры к мышце",predict:"Прогноз до опыта",limit:"Показан изолированный очаг в выбранном спинальном пути. Метка уровня перемещает очаг, но модель не рассчитывает дерматомы и не моделирует поражение корешка. Спиноталамические волокна перекрещиваются сегментарно; чувствительный дефицит может начинаться на несколько сегментов ниже очага.",table:"Записанные опыты",notice:"Опыт записан. Сравните результат с прогнозом; правильность объяснения обсуждается с преподавателем."},
 EN:{brain:"Cortex",medulla:"Medulla",spinal:"Spinal cord",body:"Body below lesion",lesion:"Lesion",deficit:"Deficit side",segment:"Spinal cord segment, not vertebra",cross:"Decussation",direction:"Signal direction",up:"Towards cortex",down:"From cortex to muscle",predict:"Prediction before trial",limit:"This shows an isolated lesion in the selected spinal tract. The level moves the lesion marker; the model does not calculate dermatomes or simulate a root lesion. Spinothalamic fibers cross segmentally; sensory loss may begin several segments below the lesion.",table:"Recorded trials",notice:"Trial recorded. Compare the result with your prediction; discuss the explanation's accuracy with your teacher."},
 KZ:{brain:"Қыртыс",medulla:"Сопақша ми",spinal:"Жұлын",body:"Ошақтан төмен дене",lesion:"Ошақ",deficit:"Тапшылық жағы",segment:"Омыртқа емес, жұлын сегменті",cross:"Айқасу",direction:"Сигнал бағыты",up:"Қыртысқа қарай",down:"Қыртыстан бұлшықетке",predict:"Тәжірибеге дейінгі болжам",limit:"Таңдалған жұлын жолындағы оқшауланған ошақ көрсетілген. Деңгей ошақ белгісін жылжытады; модель дерматомдарды есептемейді және түбір зақымын модельдемейді. Спиноталамустық талшықтар сегменттік деңгейде айқасады; сезімталдық тапшылығы ошақтан бірнеше сегмент төмен басталуы мүмкін.",table:"Жазылған тәжірибелер",notice:"Тәжірибе жазылды. Нәтижені болжаммен салыстырыңыз; түсіндірменің дұрыстығын оқытушымен талқылаңыз."}
} as const;
export default function PathwayLab({language}:{language:Language}){
 const c=T[language],u=U[language],uid=useId().replaceAll(":","");
 const[prediction,setPrediction]=useState(""),[revealed,setRevealed]=useState(false);
 const[path,setPath]=useState<Path>("dorsal"),[side,setSide]=useState<Side>("left"),[level,setLevel]=useState<SpinalLevel>("T10"),[rows,setRows]=useState<Row[]>([]);
 const result=pathwayResult(path,side,level),x=side==="left"?160:400,other=560-x;
 const bodyX=path==="spinothalamic"?other:x;
 const brainX=path==="spinothalamic"?x:other;
 const crossingY=result.crossing==="medulla"?150:400;
 const route=result.descending?`M${brainX} 65 V120 L${x} 180 V445`:
   `M${bodyX} 445 V${crossingY+30} L${brainX} ${crossingY-30} V65`;
 const finding=`${c.findings[path]} ${u.deficit}: ${c[result.deficitSide]}.`;
 const resetResult=()=>setRevealed(false);
 return <section className={styles.lab}>
  <h2>{c.title}</h2><p>{c.intro}</p><p>{u.segment}</p>
  <div className={styles.controls}>
   <label>{c.path}<select aria-label={c.path} value={path} onChange={e=>{setPath(e.target.value as Path);resetResult()}}>{Object.entries(c.paths).map(([k,v])=><option key={k} value={k}>{v}</option>)}</select></label>
   <label>{c.side}<select aria-label={c.side} value={side} onChange={e=>{setSide(e.target.value as Side);resetResult()}}><option value="left">{c.left}</option><option value="right">{c.right}</option></select></label>
   <label>{c.level}<select aria-label={c.level} value={level} onChange={e=>{setLevel(e.target.value as SpinalLevel);resetResult()}}>{(["C5","T10","L2"] as const).map(v=><option key={v}>{v}</option>)}</select></label>
  </div>
  <figure><div className={styles.diagram} tabIndex={0} aria-label={c.title}><svg viewBox="0 0 560 490" role="img" aria-labelledby={`${uid}-title ${uid}-desc`}>
   <title id={`${uid}-title`}>{c.paths[path]}</title><desc id={`${uid}-desc`}>{u.direction}: {result.descending?u.down:u.up}. {u.cross}: {result.crossing==="medulla"?u.medulla:u.spinal}. {u.lesion}: {c[side]}, {level}.</desc>
   <defs><marker id={`${uid}-arrow`} viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 10 5 0 10Z" fill="#075985"/></marker></defs>
   <rect x="80" y="40" width="400" height="55" rx="14" fill="#dbeafe"/><rect x="80" y="105" width="400" height="85" rx="14" fill="#e0e7ff"/><rect x="80" y="200" width="400" height="220" rx="14" fill="#e0f2fe"/>
   <path d="M280 40 V455" stroke="#64748b" strokeDasharray="5 5"/>
   <text x="160" y="25" textAnchor="middle">{c.left}</text><text x="400" y="25" textAnchor="middle">{c.right}</text>
   <text x="280" y="60" textAnchor="middle">{u.brain}</text><text x="280" y="120" textAnchor="middle">{u.medulla}</text><text x="280" y="220" textAnchor="middle">{u.spinal}</text>
   <path d={route} fill="none" stroke="#075985" strokeWidth="6" markerEnd={`url(#${uid}-arrow)`}/>
   <circle cx={x} cy={result.lesionY} r="14" fill="#fff" stroke="#b91c1c" strokeWidth="4"/><path d={`M${x-7} ${result.lesionY-7} l14 14 m0 -14 l-14 14`} stroke="#b91c1c" strokeWidth="3"/>
   <text x={x} y={result.lesionY-22} textAnchor="middle" fill="#991b1b">{u.lesion}: {level}</text>
   <text x="280" y="480" textAnchor="middle">{u.body}</text>
  </svg></div><figcaption>{u.direction}: {result.descending?u.down:u.up}. {u.cross}: {result.crossing==="medulla"?u.medulla:u.spinal}.</figcaption></figure>
  <label>{u.predict} ({language==="RU"?"не менее 20 символов":language==="EN"?"at least 20 characters":"кемінде 20 таңба"})<textarea value={prediction} onChange={e=>{setPrediction(e.target.value);resetResult()}} rows={3}/></label>
  <button type="button" disabled={prediction.trim().length<20} onClick={()=>{setRevealed(true);recordOutcome(8,"completion:pathway-lab",1,1);setRows(xs=>[...xs,{id:Date.now(),path,side,level,finding,note:""}])}}>{c.save}</button>
  {revealed&&<div role="status"><p><strong>{c.finding}:</strong> {finding}</p><p>{u.notice}</p></div>}
  <div className={styles.table}><table><caption>{u.table}</caption><thead><tr><th>#</th><th>{c.path}</th><th>{c.side}</th><th>{c.level}</th><th>{c.finding}</th><th>{c.note}</th></tr></thead><tbody>{rows.map((r,i)=><tr key={r.id}><td>{i+1}</td><td>{c.paths[r.path]}</td><td>{c[r.side]}</td><td>{r.level}</td><td>{r.finding}</td><td><textarea aria-label={`${c.note} ${i+1}`} value={r.note} onChange={e=>{const note=e.target.value;setRows(xs=>xs.map(x=>x.id===r.id?{...x,note}:x))}}/></td></tr>)}</tbody></table></div>
  <p><small>{u.limit}</small></p><ExperimentReflection language={language} theoryHref={`/modules/8/theory?lang=${language}`}/>
 </section>;
}
