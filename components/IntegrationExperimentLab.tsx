"use client";
import {useEffect,useMemo,useRef,useState} from "react";
import type {Language} from "../content/course";
import ExperimentReflection from "./ExperimentReflection";
import {recordOutcome} from "../lib/courseProgress";
import styles from "./IntegrationExperimentLab.module.css";
type Prediction="spike"|"subthreshold";type Mode="temporal"|"spatial";
const C={RU:{title:"Лаборатория интеграции ВПСП и ТПСП",intro:"Сравните временную и пространственную суммацию. Сначала спрогнозируйте, достигнет ли начальный сегмент аксона условного порога −55 мВ.",temporal:"Временная суммация",spatial:"Пространственная суммация",exc:"Возбуждающие входы",inh:"Тормозные входы",interval:"Интервал",predict:"Прогноз",spike:"Порог достигнут: ПД прогнозируется",subthreshold:"Ответ останется подпороговым",run:"Запустить",pause:"Пауза",resume:"Продолжить",replay:"Повтор",vm:"Линейная оценка Vm (не запись)",curve:"Условный профиль пика, не временная запись",threshold:"Условный порог",result:"Результат",correct:"Прогноз подтверждён.",retry:"Пересмотрите баланс возбуждения, торможения и временное затухание.",mechanism:"Механизм",explain:"Модель суммирует условные ВПСП по 6 мВ: при временной суммации предыдущие ответы затухают с постоянной времени 18 мс, при пространственной входы совпадают по времени. Исходный Vm = −70 мВ, условный порог = −55 мВ. Тормозные входы здесь условно вычитают 4,5 мВ каждый (гиперполяризация); шунтирующее торможение, проводимости, запуск и форму ПД модель не рассчитывает.",clinical:"Клиническая связь",clinicalText:"Изменение баланса возбуждения и торможения может повышать или снижать вероятность разряда сети. Эта линейная модель не воспроизводит реальные проводимости, дендритную геометрию и нелинейные каналы."},KZ:{title:"ҚПСП және ТПСП интеграциясы зертханасы",intro:"Уақыттық және кеңістіктік суммацияны салыстырыңыз. Алдымен аксонның бастапқы сегменті −55 мВ шартты табалдырыққа жететінін болжаңыз.",temporal:"Уақыттық суммация",spatial:"Кеңістіктік суммация",exc:"Қоздырушы кірістер",inh:"Тежеуші кірістер",interval:"Аралық",predict:"Болжам",spike:"Табалдырыққа жетті: әрекет потенциалы болжанады",subthreshold:"Жауап табалдырықтан төмен қалады",run:"Бастау",pause:"Үзіліс",resume:"Жалғастыру",replay:"Қайталау",vm:"Vm сызықтық бағасы (өлшеу емес)",curve:"Шыңның шартты бейнесі, уақыттық жазба емес",threshold:"Шартты табалдырық",result:"Нәтиже",correct:"Болжам расталды.",retry:"Қозу, тежелу және уақыттық бәсеңдеу теңгерімін қайта қараңыз.",mechanism:"Механизм",explain:"Модель әрқайсысы 6 мВ болатын шартты ҚПСП-ларды қосады: уақыттық суммацияда алдыңғы жауаптар 18 мс уақыт тұрақтысымен бәсеңдейді; кеңістіктік суммацияда кірістер бір мезгілде келеді. Бастапқы Vm = −70 мВ, шартты табалдырық = −55 мВ. Тежеуші кірістер әрқайсысы шартты түрде 4,5 мВ азайтады (гиперполяризация). Шунттаушы тежелу, нақты өткізгіштік, әрекет потенциалының басталуы мен пішіні есептелмейді.",clinical:"Клиникалық байланыс",clinicalText:"Қозу мен тежелу теңгерімінің өзгеруі желі разрядының ықтималдығын арттыруы немесе азайтуы мүмкін. Бұл сызықтық модель нақты өткізгіштіктер мен дендриттік геометрияны қайталамайды."},EN:{title:"EPSP and IPSP integration laboratory",intro:"Compare temporal and spatial summation. First predict whether the axon initial segment reaches an illustrative threshold of −55 mV.",temporal:"Temporal summation",spatial:"Spatial summation",exc:"Excitatory inputs",inh:"Inhibitory inputs",interval:"Interval",predict:"Prediction",spike:"Threshold reached: spike predicted",subthreshold:"The response remains subthreshold",run:"Run",pause:"Pause",resume:"Resume",replay:"Replay",vm:"Linear Vm estimate (not a recording)",curve:"Schematic peak profile, not a time-series recording",threshold:"Illustrative threshold",result:"Result",correct:"Prediction confirmed.",retry:"Reconsider excitation, inhibition, and temporal decay.",mechanism:"Mechanism",explain:"This teaching model adds illustrative 6-mV EPSPs: earlier EPSPs decay with an 18-ms time constant before the last input; spatial inputs arrive simultaneously. Baseline Vm = −70 mV and the illustrative threshold is −55 mV. Each inhibitory input is represented by a fixed −4.5 mV hyperpolarizing deflection. Shunting conductance, dendritic effects, spike initiation and the action-potential waveform are not simulated.",clinical:"Clinical connection",clinicalText:"Changing excitation–inhibition balance can raise or lower network firing probability. This linear model does not reproduce real conductances, dendritic geometry, or nonlinear channels."}} as const;
export function estimateIntegrationVoltage(mode:Mode,exc:number,inh:number,interval:number):number {
 const epspMv=Array.from({length:exc},(_,i)=>6*(mode==="temporal"?Math.exp(-i*interval/18):1)).reduce((sum,v)=>sum+v,0);
 return Math.round((-70+epspMv-inh*4.5)*10)/10;
}

type Trial = {
  id: number;
  mode: Mode;
  exc: number;
  inh: number;
  interval: number;
  prediction: Prediction;
  vm: number;
  spike: boolean;
};

export default function IntegrationExperimentLab({language}:{language:Language}) {
  const c=C[language];
  const [mode,setMode]=useState<Mode>("temporal");
  const [exc,setExc]=useState(3);
  const [inh,setInh]=useState(1);
  const [interval,setInputInterval]=useState(8);
  const [prediction,setPrediction]=useState<Prediction|null>(null);
  const [trial,setTrial]=useState<Trial|null>(null);
  const [running,setRunning]=useState(false);
  const [progress,setProgress]=useState(0);
  const [rows,setRows]=useState<Trial[]>([]);
  const nextId=useRef(0);
  const lastRecordedId=useRef(0);

  const vm=useMemo(()=>estimateIntegrationVoltage(mode,exc,inh,interval),[mode,exc,inh,interval]);
  const displayedVm=trial?.vm ?? vm;
  const completed=Boolean(trial && progress>=1);
  const actual:Prediction=(trial?.spike ?? vm>=-55)?"spike":"subthreshold";

  // Controls are frozen during playback. Editing a condition invalidates the old prediction.
  const invalidate=()=>{
    setPrediction(null);
    setTrial(null);
    setProgress(0);
  };
  const beginTrial=(forceNew=false)=>{
    if(!prediction || running)return;
    // Resume the same frozen experiment rather than silently starting a different trial.
    if(!forceNew && trial && progress>0 && progress<1){
      setRunning(true);
      return;
    }
    const next:Trial={
      id:++nextId.current,mode,exc,inh,interval,prediction,vm,spike:vm>=-55
    };
    setTrial(next);
    setProgress(0);
    setRunning(true);
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)setProgress(1);
  };

  useEffect(()=>{
    if(!running || !trial)return;
    const timer=window.setInterval(()=>setProgress(p=>Math.min(1,p+0.025)),40);
    return()=>window.clearInterval(timer);
  },[running,trial]);

  useEffect(()=>{
    if(!running || !trial || progress<1 || lastRecordedId.current===trial.id)return;
    lastRecordedId.current=trial.id;
    setRunning(false);
    setRows(history=>[trial,...history].slice(0,8));
    recordOutcome(6,"interactive",1,1);
    recordOutcome(6,"criterion:mechanism:integration-prediction",
      trial.prediction===(trial.spike?"spike":"subthreshold")?1:0,1);
  },[running,trial,progress]);

  // This is a stylized peak marker for the algebraic endpoint, not a simulated
  // membrane time course. In particular, the trace does not model synaptic conductances.
  const points=Array.from({length:101},(_,n)=>{
    const x=n/100;
    const amp=(displayedVm+70)*Math.exp(-(((x-0.46)/0.2)**2));
    return `${20+n*5.5},${135-amp*1.25}`;
  }).join(" ");

  return (
    <section className={styles.lab} data-testid="integration-experiment-lab">
      <h1>{c.title}</h1>
      <p>{c.intro}</p>
      <div className={styles.modes}>
        <button type="button" disabled={running} aria-pressed={mode==="temporal"}
          onClick={()=>{setMode("temporal");invalidate();}}>{c.temporal}</button>
        <button type="button" disabled={running} aria-pressed={mode==="spatial"}
          onClick={()=>{setMode("spatial");invalidate();}}>{c.spatial}</button>
      </div>
      <div className={styles.workspace}>
        <div className={styles.controls}>
          <label>{c.exc}: <b>{exc}</b>
            <input type="range" min="0" max="6" value={exc} disabled={running}
              onChange={e=>{setExc(+e.target.value);invalidate();}} />
          </label>
          <label>{c.inh}: <b>{inh}</b>
            <input type="range" min="0" max="5" value={inh} disabled={running}
              onChange={e=>{setInh(+e.target.value);invalidate();}} />
          </label>
          <label>{c.interval}: <b>{interval} ms</b>
            <input type="range" min="1" max="50" value={interval}
              disabled={running || mode==="spatial"}
              onChange={e=>{setInputInterval(+e.target.value);invalidate();}} />
          </label>
          <fieldset disabled={running}>
            <legend>{c.predict}</legend>
            {(["spike","subthreshold"] as Prediction[]).map(p=>(
              <button key={p} type="button" aria-pressed={prediction===p}
                onClick={()=>{setPrediction(p);setTrial(null);setProgress(0);}}>{c[p]}</button>
            ))}
          </fieldset>
          <div>
            <button type="button" disabled={!prediction||running} onClick={()=>beginTrial()}>
              {trial&&progress>0&&progress<1?c.resume:c.run}
            </button>
            <button type="button" disabled={!running} onClick={()=>setRunning(false)}>{c.pause}</button>
            <button type="button" disabled={!prediction||running}
              onClick={()=>beginTrial(true)}>{c.replay}</button>
          </div>
        </div>
        <div className={styles.graph}>
          <svg viewBox="0 0 600 170" role="img" aria-label={c.curve}>
            <line x1="20" x2="570" y1="116.25" y2="116.25" />
            <line x1="20" x2="570" y1="135" y2="135" stroke="#a3b7c2" strokeWidth="1" />
            <polyline points={points} />
            <line className={styles.cursor} x1={20+progress*550} x2={20+progress*550} y1="10" y2="155" />
          </svg>
          <p>{c.curve} · {c.threshold}: −55 mV</p>
          {completed&&trial&&<p role="status" aria-live="polite">
            <b>{c.vm}:</b> {trial.vm} mV · <b>{trial.spike?c.spike:c.subthreshold}</b>
          </p>}
          {completed&&trial&&<p className={trial.prediction===actual?styles.correct:styles.retry}>
            <b>{c.result}:</b> {trial.prediction===actual?c.correct:c.retry}
          </p>}
        </div>
      </div>
      <div className={styles.notes}>
        <section><h2>{c.mechanism}</h2><p>{c.explain}</p></section>
        <section><h2>{c.clinical}</h2><p>{c.clinicalText}</p></section>
      </div>
      {rows.length>0&&<div className={styles.history}>
        {rows.map((r,i)=><span key={r.id}>{i+1}. {c[r.mode]} · {r.vm} mV ·
          {r.spike?c.spike:c.subthreshold}</span>)}
      </div>}
      <ExperimentReflection language={language} theoryHref={`/modules/6/theory?lang=${language}`} moduleId={6}/>
    </section>
  );
}
