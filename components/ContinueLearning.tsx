"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import type {Language} from "../content/course";
import {sectionOrder,getSectionTitle,type Section} from "../content/sections";
import {readCourseProgress} from "../lib/courseProgress";

const copy={
 RU:{start:"Начать изучение",continue:"Продолжить обучение",hint:"Рекомендуемый следующий шаг",done:"Основной маршрут завершён — переходите к повторению, прогрессу и итоговому контролю.",progress:"Основной маршрут"},
 EN:{start:"Start learning",continue:"Continue learning",hint:"Recommended next step",done:"The core learning path is complete — continue with review, progress, and final assessment.",progress:"Core learning path"},
 KZ:{start:"Оқуды бастау",continue:"Оқуды жалғастыру",hint:"Ұсынылатын келесі қадам",done:"Негізгі оқу бағыты аяқталды — қайталауға, прогреске және қорытынды бақылауға өтіңіз.",progress:"Негізгі оқу бағыты"}
} as const;

const coreLearningOrder: Section[]=[
 "objectives","pretest","theory","one-minute","clinical","interactive",
 "practice","cases","tests","questions","virtual-patient"
];

export default function ContinueLearning({moduleId,language}:{moduleId:number;language:Language}){
 const[ready,setReady]=useState(false);
 const[next,setNext]=useState<Section>("objectives");
 const[visitedCount,setVisitedCount]=useState(0);
 useEffect(()=>{
   const data=readCourseProgress();
   const visited=data.visitedSections[moduleId]??[];
   setVisitedCount(visited.length);
   const candidate=coreLearningOrder.find(s=>!visited.includes(s)) ?? "progress";
   setNext(candidate);
   setReady(true);
 },[moduleId]);
 const c=copy[language];
 const coreVisited=coreLearningOrder.filter(s=>(readCourseProgress().visitedSections[moduleId]??[]).includes(s)).length;
 const corePercent=Math.round((coreVisited/coreLearningOrder.length)*100);
 return <section style={{marginTop:18,padding:"16px 18px",border:"1px solid #cfe0ea",borderRadius:14,background:"#f8fcff"}}>
   <div style={{display:"flex",justifyContent:"space-between",gap:12,alignItems:"center",flexWrap:"wrap",marginBottom:8}}>
     <p style={{margin:0,fontSize:13,fontWeight:800,color:"#527083"}}>{c.hint}</p>
     <strong style={{fontSize:13,color:"#005b96"}}>{c.progress}: {coreVisited}/{coreLearningOrder.length} · {corePercent}%</strong>
   </div>
   <progress value={coreVisited} max={coreLearningOrder.length} aria-label={c.progress} style={{width:"100%",marginBottom:12}}/>
   <Link href={`/modules/${moduleId}/${next}?lang=${language}`} style={{display:"inline-block",padding:"11px 16px",borderRadius:10,background:"#005b96",color:"#fff",fontWeight:800,textDecoration:"none"}}>
     {visitedCount>0?c.continue:c.start}: {getSectionTitle(next,language)}
   </Link>
   {ready&&coreVisited>=coreLearningOrder.length&&<p style={{margin:"10px 0 0",color:"#526b80"}}>{c.done}</p>}
 </section>;
}