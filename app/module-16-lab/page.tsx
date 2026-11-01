"use client";
import {useEffect,useMemo,useState} from "react";
type Lang="RU"|"EN"|"KZ";
const labels={
RU:{title:"Лаборатория мотивации и подкрепления",intro:"Модель вероятностного обучения. Это демонстрация, не измерение активности дофамина.",prob:"Вероятность подкрепления",expect:"Ожидаемая награда",trial:"Провести испытание",reset:"Сбросить",outcome:"Полученная награда",error:"Ошибка предсказания",trials:"Число испытаний",average:"Средняя ошибка предсказания",back:"К модулю 16",positive:"награда",negative:"нет награды",history:"Последние испытания",explain:"Ошибка предсказания = исход (0 или 1) − ожидание. Положительное значение означает результат лучше ожидаемого; отрицательное — хуже."},
EN:{title:"Motivation and reinforcement laboratory",intro:"Probabilistic learning model. This is a demonstration, not a dopamine measurement.",prob:"Reward probability",expect:"Expected reward",trial:"Run trial",reset:"Reset",outcome:"Reward received",error:"Prediction error",trials:"Trials",average:"Mean prediction error",back:"Module 16",positive:"reward",negative:"no reward",history:"Recent trials",explain:"Prediction error = outcome (0 or 1) − expectation. Positive means better than expected; negative means worse."},
KZ:{title:"Мотивация және нығайту зертханасы",intro:"Ықтималдық үйрену моделі. Бұл дофамин белсенділігін өлшеу емес.",prob:"Сыйақы ықтималдығы",expect:"Күтілетін сыйақы",trial:"Сынақ өткізу",reset:"Бастапқы күй",outcome:"Алынған сыйақы",error:"Болжау қатесі",trials:"Сынақ саны",average:"Орташа болжау қатесі",back:"16-модуль",positive:"сыйақы",negative:"сыйақы жоқ",history:"Соңғы сынақтар",explain:"Болжау қатесі = нәтиже (0 немесе 1) − күту. Оң мән — күткеннен жақсы, теріс мән — нашар нәтиже."}
};
type Trial={outcome:number,error:number,expected:number};
export default function LimbicLearningLab(){
 const [lang,setLang]=useState<Lang>("RU"),[prob,setProb]=useState(0.7),[expected,setExpected]=useState(0.5),[history,setHistory]=useState<Trial[]>([]);
 useEffect(()=>{const l=new URLSearchParams(window.location.search).get("lang");if(l==="RU"||l==="EN"||l==="KZ")setLang(l)},[]);
 const t=labels[lang];const last=history[history.length-1];const avg=useMemo(()=>history.length?history.reduce((s,v)=>s+v.error,0)/history.length:0,[history]);
 const run=()=>{const outcome=Math.random()<prob?1:0;const error=outcome-expected;setHistory(h=>[...h.slice(-49),{outcome,error,expected}]);setExpected(e=>Math.max(0,Math.min(1,e+0.2*error)))};
 return <main style={{maxWidth:780,margin:"0 auto",padding:"2rem 1rem",fontFamily:"system-ui",lineHeight:1.6}}>
 <nav>{(["RU","EN","KZ"] as const).map(l=><button key={l} onClick={()=>setLang(l)} aria-pressed={lang===l} style={{marginRight:8,padding:"8px 12px"}}>{l}</button>)}</nav>
 <h1>{t.title}</h1><p>{t.intro}</p>
 <label style={{display:"block"}}>{t.prob}: <strong>{Math.round(prob*100)}%</strong><input aria-label={t.prob} type="range" min="0.1" max="0.9" step="0.1" value={prob} onChange={e=>setProb(Number(e.target.value))} style={{display:"block",width:"100%"}}/></label>
 <p>{t.expect}: <strong>{expected.toFixed(2)}</strong></p><p>{t.explain}</p>
 <button onClick={run} style={{padding:"10px 16px",marginRight:12}}>{t.trial}</button><button onClick={()=>{setHistory([]);setExpected(0.5)}} style={{padding:"10px 16px"}}>{t.reset}</button>
 <section aria-live="polite" style={{border:"1px solid #94a3b8",padding:16,borderRadius:12,marginTop:20}}><h2>{t.trials}: {history.length}</h2>{last&&<><p>{t.outcome}: {last.outcome?t.positive:t.negative}</p><p>{t.error}: <strong>{last.error.toFixed(2)}</strong></p></>}<p>{t.average}: {avg.toFixed(2)}</p></section>
 <h2>{t.history}</h2><ol>{history.slice(-8).reverse().map((v,i)=><li key={i}>{t.outcome}: {v.outcome}; {t.error}: {v.error.toFixed(2)}</li>)}</ol>
 <p><a href={`/modules/16?lang=${lang}`}>{t.back}</a></p>
 </main>
}