"use client";

import { useState } from "react";
import type { Language } from "../content/course";
import { topics } from "../content/course-foundation/topics";
import VoiceTextarea from "./VoiceTextarea";

const ui={
 RU:{title:"Виртуальный пациент",intro:"Синтетический учебный сценарий. Двигайтесь от наблюдения к механизму; это тренировка рассуждения, а не постановка реального диагноза.",stage:["1. Наблюдение","2. Физиологическая гипотеза","3. Проверка и границы вывода"],prompt:["Что в ситуации является наблюдаемым фактом?","Какой физиологический механизм может объяснить изменение?","Какое дополнительное наблюдение проверит гипотезу и чего пока нельзя утверждать?"],show:"Открыть ориентир",hide:"Скрыть ориентир",answer:"Ориентир для самопроверки",note:"Сначала сформулируйте ответ самостоятельно."},
 EN:{title:"Virtual Patient",intro:"A synthetic teaching scenario. Move from observation to mechanism; this trains reasoning and does not establish a real diagnosis.",stage:["1. Observation","2. Physiological hypothesis","3. Test and limits"],prompt:["What in the scenario is directly observable?","Which physiological mechanism could explain the change?","What additional observation would test the hypothesis, and what cannot yet be concluded?"],show:"Show guide",hide:"Hide guide",answer:"Self-check guide",note:"Formulate your own answer first."},
 KZ:{title:"Виртуалды пациент",intro:"Синтетикалық оқу сценарийі. Бақылаудан тетікке өтіңіз; бұл нақты диагноз қою емес, пайымдауды жаттықтыру.",stage:["1. Бақылау","2. Физиологиялық гипотеза","3. Тексеру және шектеу"],prompt:["Жағдайдағы тікелей бақыланатын дерек қандай?","Өзгерісті қандай физиологиялық тетік түсіндіре алады?","Гипотезаны қандай қосымша бақылау тексереді және әзірге нені айтуға болмайды?"],show:"Бағдарды ашу",hide:"Бағдарды жасыру",answer:"Өзін-өзі тексеру бағдары",note:"Алдымен жауабыңызды өзіңіз тұжырымдаңыз."}
} as const;

export default function FoundationVirtualPatient({moduleId,language}:{moduleId:number;language:Language}){
 const topic=topics.find(x=>x.id===moduleId);
 const [open,setOpen]=useState<boolean[]>([false,false,false]);
 const [answers,setAnswers]=useState(["","",""]);
 const [path,setPath]=useState<"mechanism"|"alternative"|null>(null);
 if(!topic)return null;
 const c=ui[language], guides=[topic.task[language],topic.mechanism[language],topic.interpretation[language]];
 const speak=(value:string)=>{if(typeof window==="undefined"||!("speechSynthesis" in window))return;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(value);u.lang={RU:"ru-RU",EN:"en-US",KZ:"kk-KZ"}[language];window.speechSynthesis.speak(u)};
 const teacher=path==="mechanism"?topic.mechanism[language]:path==="alternative"?topic.interpretation[language]:"";
 return <section>
  <h1>{c.title}</h1><p>{c.intro}</p>
  <div style={{padding:18,border:"1px solid #b9d8e8",borderRadius:18,background:"linear-gradient(135deg,#e8f7ff,#f6f0ff)",margin:"18px 0"}}><strong>{topic.task[language]}</strong><div><button type="button" onClick={()=>speak(topic.task[language])} style={{marginTop:12}}>🔊 {language==="RU"?"Голос пациента":language==="EN"?"Patient voice":"Пациент дауысы"}</button></div></div>
  <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:12,margin:"18px 0"}}>
   <button type="button" onClick={()=>setPath("mechanism")} style={{padding:16,borderRadius:14,border:"1px solid #78aeca",background:path==="mechanism"?"#dff3ff":"white",fontWeight:700}}>{language==="RU"?"Путь A: проверить основной механизм":language==="EN"?"Path A: test the main mechanism":"A жолы: негізгі тетікті тексеру"}</button>
   <button type="button" onClick={()=>setPath("alternative")} style={{padding:16,borderRadius:14,border:"1px solid #a993cf",background:path==="alternative"?"#eee6ff":"white",fontWeight:700}}>{language==="RU"?"Путь B: проверить альтернативу":language==="EN"?"Path B: test an alternative":"B жолы: баламаны тексеру"}</button>
  </section>
  {path&&<aside style={{padding:14,borderRadius:14,background:"#fff7dc",border:"1px solid #e8cf75",marginBottom:18}}><strong>{language==="RU"?"Комментарий преподавателя":language==="EN"?"Teacher feedback":"Оқытушы пікірі"}</strong><p>{teacher}</p><button type="button" onClick={()=>speak(teacher)}>🔊 {language==="RU"?"Озвучить комментарий":language==="EN"?"Speak feedback":"Пікірді дыбыстау"}</button></aside>}
  {c.stage.map((title,i)=><section key={title} style={{margin:"18px 0",padding:18,border:"1px solid #dce8ef",borderRadius:16}}>
   <h2 style={{marginTop:0}}>{title}</h2><p>{c.prompt[i]}</p>
   <VoiceTextarea language={language} aria-label={c.prompt[i]} placeholder={c.note} value={answers[i]} onValue={value=>setAnswers(v=>v.map((x,j)=>j===i?value:x))} style={{width:"100%",minHeight:100,padding:12,border:"1px solid #bfd0dc",borderRadius:10}} />
   <button type="button" onClick={()=>setOpen(v=>v.map((x,j)=>j===i?!x:x))} style={{marginTop:10,padding:"9px 13px",fontWeight:700}}>{open[i]?c.hide:c.show}</button>
   {open[i]&&<div style={{marginTop:12,padding:12,background:"#eef6fa",borderRadius:10}}><strong>{c.answer}</strong><p>{guides[i]}</p></div>}
  </section>)}
 </section>;
}