"use client";

import { useState } from "react";
import type { Language } from "../content/course";
import { topics } from "../content/course-foundation/topics";

const ui={
 RU:{title:"Виртуальный пациент",intro:"Синтетический учебный сценарий. Двигайтесь от наблюдения к механизму; это тренировка рассуждения, а не постановка реального диагноза.",stage:["1. Наблюдение","2. Физиологическая гипотеза","3. Проверка и границы вывода"],prompt:["Что в ситуации является наблюдаемым фактом?","Какой физиологический механизм может объяснить изменение?","Какое дополнительное наблюдение проверит гипотезу и чего пока нельзя утверждать?"],show:"Открыть ориентир",hide:"Скрыть ориентир",answer:"Ориентир для самопроверки",note:"Сначала сформулируйте ответ самостоятельно."},
 EN:{title:"Virtual Patient",intro:"A synthetic teaching scenario. Move from observation to mechanism; this trains reasoning and does not establish a real diagnosis.",stage:["1. Observation","2. Physiological hypothesis","3. Test and limits"],prompt:["What in the scenario is directly observable?","Which physiological mechanism could explain the change?","What additional observation would test the hypothesis, and what cannot yet be concluded?"],show:"Show guide",hide:"Hide guide",answer:"Self-check guide",note:"Formulate your own answer first."},
 KZ:{title:"Виртуалды пациент",intro:"Синтетикалық оқу сценарийі. Бақылаудан тетікке өтіңіз; бұл нақты диагноз қою емес, пайымдауды жаттықтыру.",stage:["1. Бақылау","2. Физиологиялық гипотеза","3. Тексеру және шектеу"],prompt:["Жағдайдағы тікелей бақыланатын дерек қандай?","Өзгерісті қандай физиологиялық тетік түсіндіре алады?","Гипотезаны қандай қосымша бақылау тексереді және әзірге нені айтуға болмайды?"],show:"Бағдарды ашу",hide:"Бағдарды жасыру",answer:"Өзін-өзі тексеру бағдары",note:"Алдымен жауабыңызды өзіңіз тұжырымдаңыз."}
} as const;

export default function FoundationVirtualPatient({moduleId,language}:{moduleId:number;language:Language}){
 const topic=topics.find(x=>x.id===moduleId);
 const [open,setOpen]=useState<boolean[]>([false,false,false]);
 if(!topic)return null;
 const c=ui[language], guides=[topic.task[language],topic.mechanism[language],topic.interpretation[language]];
 return <section>
  <h1>{c.title}</h1><p>{c.intro}</p>
  <div style={{padding:16,border:"1px solid #d7e5ed",borderRadius:14,background:"#f8fbfd",margin:"18px 0"}}><strong>{topic.task[language]}</strong></div>
  {c.stage.map((title,i)=><section key={title} style={{margin:"18px 0",padding:18,border:"1px solid #dce8ef",borderRadius:16}}>
   <h2 style={{marginTop:0}}>{title}</h2><p>{c.prompt[i]}</p>
   <textarea aria-label={c.prompt[i]} placeholder={c.note} style={{width:"100%",minHeight:100,padding:12,border:"1px solid #bfd0dc",borderRadius:10}} />
   <button type="button" onClick={()=>setOpen(v=>v.map((x,j)=>j===i?!x:x))} style={{marginTop:10,padding:"9px 13px",fontWeight:700}}>{open[i]?c.hide:c.show}</button>
   {open[i]&&<div style={{marginTop:12,padding:12,background:"#eef6fa",borderRadius:10}}><strong>{c.answer}</strong><p>{guides[i]}</p></div>}
  </section>)}
 </section>;
}