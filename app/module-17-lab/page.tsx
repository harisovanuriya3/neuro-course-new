"use client";
import {useEffect,useState} from "react";
type Lang="RU"|"EN"|"KZ";
const copy={
RU:{title:"Виртуальная лаборатория эмоционального обучения",intro:"Безопасная модель положительного подкрепления. Без неприятных стимулов; не является клиническим тестом.",prob:"Вероятность положительного события",cue:"Сигнал",a:"Сигнал A",b:"Сигнал B",trial:"Испытание",extinction:"Без подкрепления (угасание)",prediction:"Ожидание",outcome:"Результат",yes:"Положительное событие",no:"События нет",count:"Испытаний",reset:"Сбросить",back:"К модулю 17",note:"Ожидание обновляется по ошибке предсказания. Угасание может снижать выученный ответ без полного стирания памяти."},
EN:{title:"Emotional learning virtual laboratory",intro:"Safe positive-reinforcement model. No aversive cues; not a clinical test.",prob:"Positive event probability",cue:"Cue",a:"Cue A",b:"Cue B",trial:"Run trial",extinction:"No reinforcement (extinction)",prediction:"Expectation",outcome:"Outcome",yes:"Positive event",no:"No event",count:"Trials",reset:"Reset",back:"Module 17",note:"Expectation updates from prediction error. Extinction may reduce learned responding without erasing memory."},
KZ:{title:"Эмоциялық үйренудің виртуалды зертханасы",intro:"Қауіпсіз оң нығайту моделі. Жағымсыз стимулдар жоқ; клиникалық тест емес.",prob:"Оң оқиға ықтималдығы",cue:"Сигнал",a:"A сигналы",b:"B сигналы",trial:"Сынақ",extinction:"Нығайтусыз (сөну)",prediction:"Күту",outcome:"Нәтиже",yes:"Оң оқиға",no:"Оқиға жоқ",count:"Сынақтар",reset:"Бастапқы күй",back:"17-модуль",note:"Күту болжау қатесіне сай жаңарады. Сөну бастапқы жадты толық өшірмей жауапты азайтуы мүмкін."}
};
export default function EmotionalLearningLab(){
 const [lang,setLang]=useState<Lang>("RU"),[prob,setProb]=useState(.8),[cue,setCue]=useState<"a"|"b">("a"),[extinction,setExtinction]=useState(false),[expect,setExpect]=useState({a:.5,b:.5}),[history,setHistory]=useState<{cue:string,outcome:number,prediction:number}[]>([]);
 useEffect(()=>{const value=new URLSearchParams(window.location.search).get("lang");if(value==="RU"||value==="EN"||value==="KZ")setLang(value)},[]);
 const t=copy[lang];
 const run=()=>{const prediction=expect[cue];const outcome=extinction?0:Number(Math.random()<(cue==="a"?prob:1-prob));setHistory(h=>[...h.slice(-99),{cue,outcome,prediction}]);setExpect(e=>({...e,[cue]:Math.min(1,Math.max(0,prediction+.25*(outcome-prediction)))}))};
 return <main style={{maxWidth:780,margin:"auto",padding:"24px 16px",fontFamily:"system-ui",lineHeight:1.6}}>
 <nav>{(["RU","EN","KZ"] as const).map(l=><button key={l} onClick={()=>setLang(l)} aria-pressed={lang===l} style={{padding:"8px 12px",marginRight:8}}>{l}</button>)}</nav>
 <h1>{t.title}</h1><p>{t.intro}</p>
 <label style={{display:"block"}}>{t.prob}: {Math.round(prob*100)}%<input type="range" min=".1" max=".9" step=".1" value={prob} onChange={e=>setProb(Number(e.target.value))} style={{width:"100%",display:"block"}}/></label>
 <label>{t.cue}: <select value={cue} onChange={e=>setCue(e.target.value as "a"|"b")}><option value="a">{t.a}</option><option value="b">{t.b}</option></select></label>
 <label style={{display:"block",margin:"14px 0"}}><input type="checkbox" checked={extinction} onChange={e=>setExtinction(e.target.checked)}/> {t.extinction}</label>
 <p>{t.prediction}: A {expect.a.toFixed(2)} / B {expect.b.toFixed(2)}</p>
 <button onClick={run} style={{padding:"10px 18px",marginRight:12}}>{t.trial}</button><button onClick={()=>{setExpect({a:.5,b:.5});setHistory([]);setExtinction(false)}} style={{padding:"10px 18px"}}>{t.reset}</button>
 <section aria-live="polite" style={{padding:16,border:"1px solid #9ca3af",borderRadius:12,marginTop:18}}><h2>{t.count}: {history.length}</h2><ol>{history.slice(-8).reverse().map((v,i)=><li key={i}>{v.cue.toUpperCase()}: {v.outcome?t.yes:t.no}; {t.prediction} {v.prediction.toFixed(2)}</li>)}</ol></section>
 <p>{t.note}</p><a href={`/modules/17?lang=${lang}`}>{t.back}</a>
 </main>;
}
