"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import type {Language} from "../content/course";
import {sectionOrder,getSectionTitle,type Section} from "../content/sections";
import {readCourseProgress} from "../lib/courseProgress";

const copy={
 RU:{start:"Начать изучение",continue:"Продолжить обучение",hint:"Рекомендуемый следующий шаг",done:"Все разделы этого модуля уже открыты — можно перейти к повторению и контролю знаний."},
 EN:{start:"Start learning",continue:"Continue learning",hint:"Recommended next step",done:"All sections in this module have been opened — continue with review and assessment."},
 KZ:{start:"Оқуды бастау",continue:"Оқуды жалғастыру",hint:"Ұсынылатын келесі қадам",done:"Бұл модульдің барлық бөлімдері ашылған — қайталау мен білімді тексеруге өтіңіз."}
} as const;

export default function ContinueLearning({moduleId,language}:{moduleId:number;language:Language}){
 const[ready,setReady]=useState(false);
 const[next,setNext]=useState<Section>("objectives");
 const[visitedCount,setVisitedCount]=useState(0);
 useEffect(()=>{
   const data=readCourseProgress();
   const visited=data.visitedSections[moduleId]??[];
   setVisitedCount(visited.length);
   const candidate=sectionOrder.find(s=>!visited.includes(s)) ?? "progress";
   setNext(candidate);
   setReady(true);
 },[moduleId]);
 const c=copy[language];
 return <section style={{marginTop:18,padding:"16px 18px",border:"1px solid #cfe0ea",borderRadius:14,background:"#f8fcff"}}>
   <p style={{margin:"0 0 8px",fontSize:13,fontWeight:800,color:"#527083"}}>{c.hint}</p>
   <Link href={`/modules/${moduleId}/${next}?lang=${language}`} style={{display:"inline-block",padding:"11px 16px",borderRadius:10,background:"#005b96",color:"#fff",fontWeight:800,textDecoration:"none"}}>
     {visitedCount>0?c.continue:c.start}: {getSectionTitle(next,language)}
   </Link>
   {ready&&visitedCount>=sectionOrder.length&&<p style={{margin:"10px 0 0",color:"#526b80"}}>{c.done}</p>}
 </section>;
}