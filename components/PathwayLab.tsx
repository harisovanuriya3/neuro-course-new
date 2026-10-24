"use client";
import {useState} from "react";
import type {Language} from "../content/course";
import ExperimentReflection from "./ExperimentReflection";
import {recordOutcome} from "../lib/courseProgress";
type Path="dorsal"|"spinothalamic"|"corticospinal"; type Side="left"|"right";
type Row={id:number;path:Path;side:Side;level:string;finding:string;note:string;predicted:Side;correct:boolean};
const T={RU:{title:"Лаборатория проводящих путей",intro:"Выберите путь и сторону условного поражения. Проследите направление сигнала, место перекрёста и ожидаемую сторону дефицита ниже выбранного уровня.",path:"Путь",side:"Сторона поражения",left:"левая",right:"правая",level:"Уровень",save:"Записать опыт",finding:"Ожидаемый учебный результат",note:"Объясните через место перекрёста",paths:{dorsal:"Задние канатики — медиальная петля",spinothalamic:"Спиноталамический путь",corticospinal:"Латеральный кортикоспинальный путь"},findings:{dorsal:"Ниже спинального поражения: ипсилатеральное нарушение тонкого осязания/вибрации/проприоцепции.",spinothalamic:"После сегментарного перекрёста: преимущественно контралатеральное нарушение боли и температуры ниже поражения.",corticospinal:"Ниже спинального поражения: ипсилатеральные признаки поражения нисходящего кортикоспинального пути."},limit:"Это локализационная учебная модель спинального поражения. Реальная клиническая картина зависит от точного уровня, протяжённости поражения и анатомии волокон; для спиноталамического пути начало дефицита может не совпадать точно с уровнем очага."},EN:{title:"Neural pathway laboratory",intro:"Choose a tract and side of a teaching lesion. Trace signal direction, decussation, and the expected side of deficit below the selected level.",path:"Pathway",side:"Lesion side",left:"left",right:"right",level:"Level",save:"Record trial",finding:"Expected teaching finding",note:"Explain using the decussation",paths:{dorsal:"Dorsal column–medial lemniscus",spinothalamic:"Spinothalamic tract",corticospinal:"Lateral corticospinal tract"},findings:{dorsal:"Below a spinal lesion: ipsilateral loss of fine touch/vibration/proprioception.",spinothalamic:"After segmental crossing: predominantly contralateral loss of pain and temperature below the lesion.",corticospinal:"Below a spinal lesion: ipsilateral signs of descending corticospinal tract damage."},limit:"This is a localization model of a spinal lesion. Real findings depend on exact level, lesion extent and fiber anatomy; spinothalamic sensory loss may not begin exactly at the lesion level."},KZ:{title:"Өткізгіш жолдар зертханасы",intro:"Жолды және шартты зақымдану жағын таңдаңыз. Сигнал бағытын, айқасу орнын және таңдалған деңгейден төмен күтілетін тапшылық жағын бақылаңыз.",path:"Жол",side:"Зақым жағы",left:"сол",right:"оң",level:"Деңгей",save:"Тәжірибені жазу",finding:"Күтілетін оқу нәтижесі",note:"Айқасу орны арқылы түсіндіріңіз",paths:{dorsal:"Артқы бағандар — медиалдық ілмек",spinothalamic:"Спиноталамустық жол",corticospinal:"Латералды кортикоспиналдық жол"},findings:{dorsal:"Жұлын зақымынан төмен: нәзік жанасу/вибрация/проприоцепцияның ипсилатералды бұзылысы.",spinothalamic:"Сегменттік айқасудан кейін: зақымнан төмен ауырсыну мен температураның негізінен контралатералды бұзылысы.",corticospinal:"Жұлын зақымынан төмен: төмендейтін кортикоспиналдық жол зақымының ипсилатералды белгілері."},limit:"Бұл жұлын зақымын локализациялауға арналған оқу моделі. Нақты көрініс деңгейге, зақым көлеміне және талшық анатомиясына тәуелді; спиноталамустық тапшылық ошақ деңгейімен дәл сәйкес келмеуі мүмкін."}} as const;

// Explicit localization of the *side* of impairment in a unilateral spinal-cord tract model.
// The selectable levels refer to cord segments, NOT vertebral body levels.
const EXTRA={
  RU:{segment:"Сегмент спинного мозга",prediction:"Прогноз: сторона нарушения ниже очага",reason:"Объясните свой прогноз до опыта (не менее 20 символов)",left:"слева",right:"справа",expected:"Ожидаемая сторона нарушения",correct:"Прогноз стороны совпал с моделью.",incorrect:"Прогноз стороны не совпал с моделью. Сравните уровень перекрёста.",cross:"Место перекрёста",medulla:"продолговатый мозг",cord:"спинной мозг (через несколько сегментов)",cortex:"Кора",spinal:"Спинной мозг",direction:"Направление проведения",ascending:"восходящее",descending:"нисходящее",model:"Условная схема направления, не в анатомическом масштабе. Очаг расположен в выбранном сегменте спинного мозга; знак стрелки показывает ход информации, а не сторону дефицита.",predicted:"Прогноз",observed:"Результат",evaluation:"Сверка",notes:"Обоснование (не оценивается автоматически)",prompt:"Сначала выберите сторону и запишите физиологическое объяснение. После записи сравните прогноз с моделью.",trial:"Опыт"},
  EN:{segment:"Spinal cord segment",prediction:"Prediction: side of deficit below lesion",reason:"Explain your prediction before the trial (at least 20 characters)",left:"on the left",right:"on the right",expected:"Expected side of deficit",correct:"Predicted side matches the model.",incorrect:"Predicted side differs from the model. Recheck the decussation level.",cross:"Site of crossing",medulla:"medulla oblongata",cord:"spinal cord (across nearby segments)",cortex:"Cortex",spinal:"Spinal cord",direction:"Conduction direction",ascending:"ascending",descending:"descending",model:"Schematic direction only; not to anatomical scale. The lesion is in the selected spinal cord segment. The arrow indicates signal direction, not the side of impairment.",predicted:"Prediction",observed:"Result",evaluation:"Comparison",notes:"Explanation (not automatically graded)",prompt:"First select a side and write a physiological explanation. Then record and compare with the model.",trial:"Trial"},
  KZ:{segment:"Жұлын сегменті",prediction:"Болжам: ошақтан төмен бұзылыс жағы",reason:"Тәжірибеге дейін болжамды түсіндіріңіз (кемінде 20 таңба)",left:"сол жақта",right:"оң жақта",expected:"Күтілетін бұзылыс жағы",correct:"Болжанған жақ үлгімен сәйкес келді.",incorrect:"Болжанған жақ үлгімен сәйкес келмеді. Айқасу деңгейін қайта тексеріңіз.",cross:"Айқасу орны",medulla:"сопақша ми",cord:"жұлын (бірнеше көрші сегмент бойында)",cortex:"Қыртыс",spinal:"Жұлын",direction:"Өткізу бағыты",ascending:"жоғарылаушы",descending:"төмендеуші",model:"Бағытты көрсететін шартты сызба, анатомиялық масштаб сақталмаған. Ошақ таңдалған жұлын сегментінде орналасқан. Жебе бұзылыс жағын емес, сигнал бағытын көрсетеді.",predicted:"Болжам",observed:"Нәтиже",evaluation:"Салыстыру",notes:"Негіздеме (автоматты бағаланбайды)",prompt:"Алдымен бұзылыс жағын таңдап, физиологиялық түсіндірме жазыңыз. Содан кейін нәтижені үлгімен салыстырыңыз.",trial:"Тәжірибе"}
} as const;
const opposite=(side:Side):Side=>side==="left"?"right":"left";

export default function PathwayLab({language}:{language:Language}){
  const c=T[language], x=EXTRA[language];
  const [prediction,setPrediction]=useState("");
  const [predictedSide,setPredictedSide]=useState<Side>("left");
  const [revealed,setRevealed]=useState(false);
  const [path,setPath]=useState<Path>("dorsal");
  const [side,setSide]=useState<Side>("left");
  const [level,setLevel]=useState("T10");
  const [rows,setRows]=useState<Row[]>([]);
  const expectedSide:Side=path==="spinothalamic"?opposite(side):side;
  const crossing=path==="spinothalamic"?x.cord:x.medulla;
  const motor=path==="corticospinal";
  const direction=motor?x.descending:x.ascending;
  const sideLabel=(s:Side)=>s==="left"?x.left:x.right;
  const resetPrediction=()=>{
    setPrediction("");
    setPredictedSide("left");
    setRevealed(false);
  };
  const recordTrial=()=>{
    if(prediction.trim().length<20)return;
    const correct=predictedSide===expectedSide;
    const finding=c.findings[path]+" "+x.expected+": "+sideLabel(expectedSide)+".";
    setRows(previous=>[...previous,{id:previous.length+1,path,side,level,finding,note:"",predicted:predictedSide,correct}]);
    setRevealed(true);
    recordOutcome(8,"interactive",Number(correct),1);
    recordOutcome(8,"criterion:application:lab",Number(correct),1);
    recordOutcome(8,"criterion:mechanism:prediction",Number(correct),1);
    // Written reasoning is stored but never marked correct just because it is long.
  };
  return <section style={{margin:"28px 0",padding:20,border:"1px solid #cfe0ea",borderRadius:16}}>
    <h2>{c.title}</h2><p>{c.intro}</p>
    <p>{x.prompt}</p>
    <label>{c.path}
      <select value={path} onChange={e=>{setPath(e.target.value as Path);resetPrediction()}} style={{display:"block",margin:"6px 0 12px"}}>
        {Object.entries(c.paths).map(([key,label])=><option key={key} value={key}>{label}</option>)}
      </select>
    </label>
    <label>{c.side}
      <select value={side} onChange={e=>{setSide(e.target.value as Side);resetPrediction()}}>
        <option value="left">{c.left}</option><option value="right">{c.right}</option>
      </select>
    </label>{" "}
    <label>{x.segment}
      <select value={level} onChange={e=>{setLevel(e.target.value);resetPrediction()}}>
        <option value="C5">C5</option><option value="T10">T10</option><option value="L2">L2</option>
      </select>
    </label>
    <figure style={{margin:"18px 0"}}>
      <svg viewBox="0 0 600 190" role="img" aria-label={x.model} style={{width:"100%",background:"#fff"}}>
        <title>{x.model}</title>
        <defs><marker id="pathway-arrow-8" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0 L10 5 L0 10 z" fill="currentColor"/></marker></defs>
        <path d={motor?"M510 35 L310 92 L85 155":"M85 155 L310 92 L510 35"} fill="none" stroke="currentColor" strokeWidth="4" markerEnd="url(#pathway-arrow-8)"/>
        <circle cx="310" cy="92" r="9" fill="white" stroke="currentColor" strokeWidth="3"/>
        <text x="365" y="25" fontSize="15">{x.cortex}</text>
        <text x="20" y="182" fontSize="15">{x.spinal}</text>
        <text x="310" y="126" textAnchor="middle" fontSize="14">{x.cross}: {path==="spinothalamic"?x.spinal:x.medulla}</text>
      </svg>
      <figcaption>{x.direction}: {direction}. {x.model}</figcaption>
    </figure>
    <p><strong>{x.cross}:</strong> {crossing}.</p>
    <label style={{display:"block",margin:"12px 0"}}>{x.prediction}
      <select value={predictedSide} onChange={e=>{setPredictedSide(e.target.value as Side);setRevealed(false)}}>
        <option value="left">{x.left}</option><option value="right">{x.right}</option>
      </select>
    </label>
    <label style={{display:"block",margin:"12px 0"}}>{x.reason}
      <textarea value={prediction} onChange={e=>{setPrediction(e.target.value);setRevealed(false)}} rows={3} style={{width:"100%"}}/>
    </label>
    <button type="button" disabled={prediction.trim().length<20} onClick={recordTrial}>{c.save}</button>
    {revealed&&<div role="status" aria-live="polite">
      <p><strong>{c.finding}:</strong> {c.findings[path]} <strong>{x.expected}:</strong> {sideLabel(expectedSide)}.</p>
      <p>{predictedSide===expectedSide?x.correct:x.incorrect}</p>
      <p>{c.limit}</p>
    </div>}
    {rows.length>0&&<div style={{overflowX:"auto"}}>
      <table>
        <thead><tr><th scope="col">{x.trial}</th><th scope="col">{c.path}</th><th scope="col">{c.side}</th><th scope="col">{x.segment}</th><th scope="col">{x.predicted}</th><th scope="col">{x.observed}</th><th scope="col">{x.evaluation}</th><th scope="col">{x.notes}</th></tr></thead>
        <tbody>{rows.map(row=><tr key={row.id}>
          <td>{row.id}</td><td>{c.paths[row.path]}</td><td>{sideLabel(row.side)}</td><td>{row.level}</td>
          <td>{sideLabel(row.predicted)}</td><td>{row.finding}</td><td>{row.correct?x.correct:x.incorrect}</td>
          <td><input aria-label={x.notes+" "+row.id} value={row.note} onChange={e=>{const note=e.target.value;setRows(previous=>previous.map(item=>item.id===row.id?{...item,note}:item))}}/></td>
        </tr>)}</tbody>
      </table>
    </div>}
    <p><small>{c.limit}</small></p>
    <ExperimentReflection language={language} theoryHref={ "/modules/8/theory?lang="+language }/>
  </section>;
}
