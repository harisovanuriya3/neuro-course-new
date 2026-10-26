"use client";
import {useState} from "react";
import type {Language} from "../content/course";
import ExperimentReflection from "./ExperimentReflection";
import {recordOutcome} from "../lib/courseProgress";
import {compareAscendingDrive, type RelayCondition, type Trend} from "../lib/brainstemArousalModel";

type Trial = {
  id: number; input: number; relay: RelayCondition; baseline: number;
  observed: number; prediction: Trend; trend: Trend; correct: boolean; note: string;
};
const T = {
  RU: {
    title:"Лаборатория: сенсорный вход и восходящие сети бодрствования",
    intro:"Сравните условный выход модели с опорным состоянием (сенсорный вход 50 единиц). Измените вход и условную эффективность восходящей связи. Сначала выберите прогноз, затем проведите опыт.",
    anatomy:"Анатомическая иллюстрация ствола мозга (внешний ресурс)",
    input:"Условный сенсорный вход (0–100 единиц)",relay:"Условная эффективность восходящей связи",
    usual:"Сохранённая в модели",attenuated:"Сниженная в модели",
    prediction:"По сравнению с опорным состоянием индекс будет",choose:"Выберите прогноз",
    lower:"ниже",same:"таким же",higher:"выше",
    run:"Провести опыт",baseline:"Опорный индекс",observed:"Индекс в опыте",
    units:"условных единиц модели",right:"Направление прогноза совпало с моделью.",
    wrong:"Направление прогноза не совпало с моделью. Сравните два индекса.",
    table:"Журнал опытов",trial:"Опыт",correct:"Совпадение",yes:"да",no:"нет",
    note:"Ваше объяснение (не оценивается автоматически)",
    limit:"Это иллюстративная линейная зависимость внутри модели, а не измерение активности ретикулярной формации, ЭЭГ или уровня сознания. В реальном мозге сенсорная модуляция зависит от состояния и вида стимула, таламо-корковых, гипоталамических и стволовых сетей. «Снижение связи» здесь не имитирует конкретное заболевание. Правильный прогноз направления не доказывает понимание механизма.",
    caption:"Схема отражает только два вычисленных индекса, не физиологические проценты."
  },
  EN: {
    title:"Laboratory: sensory input and ascending arousal networks",
    intro:"Compare the illustrative model output with a reference condition (sensory input 50 units). Change input and modeled ascending connectivity. Choose a prediction before running each trial.",
    anatomy:"Anatomical illustration of the brainstem (external resource)",
    input:"Illustrative sensory input (0–100 units)",relay:"Modeled ascending relay efficacy",
    usual:"Preserved in model",attenuated:"Reduced in model",
    prediction:"Relative to the reference, the index will be",choose:"Choose a prediction",
    lower:"lower",same:"unchanged",higher:"higher",
    run:"Run trial",baseline:"Reference index",observed:"Trial index",
    units:"arbitrary model units",right:"Your predicted direction matches the model.",
    wrong:"Your predicted direction does not match the model. Compare the two indices.",
    table:"Trial log",trial:"Trial",correct:"Match",yes:"yes",no:"no",
    note:"Your explanation (not automatically graded)",
    limit:"This is an illustrative linear relationship within a model, not a measurement of reticular-formation activity, EEG or consciousness. In a real brain, sensory modulation depends on stimulus type and state, and on thalamocortical, hypothalamic and brainstem networks. 'Reduced relay' does not simulate a specific disorder. A correct directional prediction does not demonstrate mechanistic understanding.",
    caption:"The graphic represents two computed indices, not physiological percentages."
  },
  KZ: {
    title:"Зертхана: сенсорлық кіріс және сергектіктің жоғарылаушы желілері",
    intro:"Модельдің шартты нәтижесін тірек жағдайымен (сенсорлық кіріс 50 бірлік) салыстырыңыз. Кірісті және жоғарылаушы байланыстың модельдегі тиімділігін өзгертіңіз. Әр тәжірибеге дейін болжам таңдаңыз.",
    anatomy:"Ми бағанының анатомиялық кескіні (сыртқы ресурс)",
    input:"Шартты сенсорлық кіріс (0–100 бірлік)",relay:"Жоғарылаушы байланыстың модельдік тиімділігі",
    usual:"Модельде сақталған",attenuated:"Модельде төмендетілген",
    prediction:"Тірек жағдайымен салыстырғанда индекс",choose:"Болжамды таңдаңыз",
    lower:"төмендейді",same:"өзгермейді",higher:"жоғарылайды",
    run:"Тәжірибені орындау",baseline:"Тірек индексі",observed:"Тәжірибе индексі",
    units:"модельдің шартты бірлігі",right:"Болжам бағыты модель нәтижесіне сәйкес келді.",
    wrong:"Болжам бағыты модель нәтижесіне сәйкес келмеді. Екі индексті салыстырыңыз.",
    table:"Тәжірибе журналы",trial:"Тәжірибе",correct:"Сәйкестік",yes:"иә",no:"жоқ",
    note:"Өз түсіндірмеңіз (автоматты бағаланбайды)",
    limit:"Бұл модель ішіндегі шартты сызықтық тәуелділік; ретикулярлық формацияның белсенділігін, ЭЭГ-ні немесе сана деңгейін өлшеу емес. Нақты мида сенсорлық ықпал тітіркендіргіштің түріне, ағзаның күйіне, таламус-қыртыстық, гипоталамустық және ми бағаны желілеріне тәуелді. «Байланыстың төмендеуі» белгілі бір ауруды бейнелемейді. Бағытты дұрыс болжау механизмді түсінгенін дәлелдемейді.",
    caption:"Сызба физиологиялық пайыздарды емес, есептелген екі индексті ғана көрсетеді."
  }
} as const;

export default function BrainstemLab({language}:{language:Language}) {
  const c=T[language];
  const [input,setInput]=useState(80);
  const [relay,setRelay]=useState<RelayCondition>("usual");
  const [prediction,setPrediction]=useState<Trend | "">("");
  const [result,setResult]=useState<ReturnType<typeof compareAscendingDrive> | null>(null);
  const [lastCorrect,setLastCorrect]=useState<boolean | null>(null);
  const [rows,setRows]=useState<Trial[]>([]);
  const trendLabels:Record<Trend,string>={lower:c.lower,same:c.same,higher:c.higher};
  function invalidate(){setResult(null);setLastCorrect(null);setPrediction("");}
  function run(){
    if(!prediction)return;
    const comparison=compareAscendingDrive(input,relay);
    const correct=prediction===comparison.trend;
    setResult(comparison);setLastCorrect(correct);
    setRows(previous=>[...previous,{
      id:previous.length+1,input,relay,baseline:comparison.baseline,
      observed:comparison.observed,prediction,trend:comparison.trend,correct,note:""
    }]);
    recordOutcome(10,"interactive",Number(correct),1);
    recordOutcome(10,"criterion:application:lab",1,1);
    recordOutcome(10,"criterion:prediction:lab",Number(correct),1);
  }
  return <section style={{margin:"28px 0",padding:20,border:"1px solid #cfe0ea",borderRadius:16}}>
    <h2>{c.title}</h2><p>{c.intro}</p>
    <figure style={{margin:"16px 0"}}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/8/89/Human_brainstem.gif"
        alt={c.anatomy} style={{width:"min(100%,580px)",height:"auto",borderRadius:14}}/>
      <figcaption>{c.anatomy} — Wikimedia Commons.</figcaption>
    </figure>
    <label htmlFor="brainstem-input">{c.input}: <output>{input}</output></label>
    <input id="brainstem-input" type="range" min="0" max="100" step="10"
      value={input} onChange={e=>{setInput(Number(e.target.value));invalidate();}}
      style={{display:"block",width:"100%",margin:"8px 0 16px"}}/>
    <label htmlFor="brainstem-relay">{c.relay}</label>
    <select id="brainstem-relay" value={relay}
      onChange={e=>{setRelay(e.target.value as RelayCondition);invalidate();}}
      style={{display:"block",maxWidth:"100%",margin:"8px 0 16px"}}>
      <option value="usual">{c.usual}</option>
      <option value="attenuated">{c.attenuated}</option>
    </select>
    <label htmlFor="brainstem-prediction">{c.prediction}</label>
    <select id="brainstem-prediction" value={prediction}
      onChange={e=>{setPrediction(e.target.value as Trend | "");setResult(null);setLastCorrect(null);}}
      style={{display:"block",maxWidth:"100%",margin:"8px 0 16px"}}>
      <option value="">{c.choose}</option>
      <option value="lower">{c.lower}</option>
      <option value="same">{c.same}</option>
      <option value="higher">{c.higher}</option>
    </select>
    <button type="button" disabled={!prediction} onClick={run}>{c.run}</button>
    {result&&<div role="status" style={{marginTop:16}}>
      <p><strong>{lastCorrect?c.right:c.wrong}</strong></p>
      <p>{c.baseline}: <strong>{result.baseline}</strong> {c.units}.
        {" "}{c.observed}: <strong>{result.observed}</strong> {c.units}.
        {" "}{c.prediction}: <strong>{trendLabels[result.trend]}</strong>.</p>
      <div role="img" aria-label={c.caption} style={{maxWidth:520}}>
        <div>{c.baseline} ({result.baseline})</div>
        <div style={{width:String(result.baseline)+"%",height:15,background:"#64748b",marginBottom:12}}/>
        <div>{c.observed} ({result.observed})</div>
        <div style={{width:String(result.observed)+"%",height:15,background:"#0d9488"}}/>
      </div>
      <p><small>{c.caption}</small></p>
    </div>}
    {rows.length>0&&<div style={{overflowX:"auto",marginTop:18}}>
      <table><caption>{c.table}</caption><thead><tr>
        <th scope="col">{c.trial}</th><th scope="col">{c.input}</th>
        <th scope="col">{c.relay}</th><th scope="col">{c.baseline}</th>
        <th scope="col">{c.observed}</th><th scope="col">{c.prediction}</th>
        <th scope="col">{c.correct}</th><th scope="col">{c.note}</th>
      </tr></thead><tbody>{rows.map(row=><tr key={row.id}>
        <td>{row.id}</td><td>{row.input}</td>
        <td>{row.relay==="usual"?c.usual:c.attenuated}</td>
        <td>{row.baseline}</td><td>{row.observed}</td>
        <td>{trendLabels[row.prediction]}</td><td>{row.correct?c.yes:c.no}</td>
        <td><input aria-label={c.note+" "+row.id} value={row.note}
          onChange={e=>setRows(old=>old.map(item=>item.id===row.id?{...item,note:e.target.value}:item))}/></td>
      </tr>)}</tbody></table>
    </div>}
    <p><small>{c.limit}</small></p>
    <ExperimentReflection language={language} theoryHref={"/modules/10/theory?lang="+language}/>
  </section>;
}
