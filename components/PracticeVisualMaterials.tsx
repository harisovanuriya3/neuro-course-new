"use client";
import { useState } from "react";
import Link from "next/link";
import type { Language } from "../content/course";
import { OrganizationSpecimens } from "./RealSpecimens";

const words = {
 RU:{title:"Интерактивные материалы",intro:"Материалы встроены в практику — отдельный атлас не требуется.",system:"Нервная система: ЦНС и ПНС",neuron:"Нейрон: основные части",reflex:"Рефлекторная дуга",brain:"Головной мозг",cord:"Спинной мозг",nerves:"Периферические нервы",soma:"Тело нейрона",dend:"Дендриты",axon:"Аксон",rec:"Рецептор",aff:"Афферентный путь",eff:"Эфферентный путь",muscle:"Мышца",hint:"Нажимайте на подписи: соответствующая часть схемы подсвечивается.",theory:"Открыть Theory Модуля 1"},
 EN:{title:"Interactive materials",intro:"Materials are embedded in the practice; a separate atlas is not required.",system:"Nervous system: CNS and PNS",neuron:"Neuron: main parts",reflex:"Reflex arc",brain:"Brain",cord:"Spinal cord",nerves:"Peripheral nerves",soma:"Cell body",dend:"Dendrites",axon:"Axon",rec:"Receptor",aff:"Afferent pathway",eff:"Efferent pathway",muscle:"Muscle",hint:"Select a label to highlight the corresponding diagram part.",theory:"Open Module 1 Theory"},
 KZ:{title:"Интерактивті материалдар",intro:"Материалдар практикалық бөлімге енгізілген, бөлек атлас қажет емес.",system:"Жүйке жүйесі: ОЖЖ және ШЖЖ",neuron:"Нейрон: негізгі бөліктер",reflex:"Рефлекстік доға",brain:"Ми",cord:"Жұлын",nerves:"Шеткі жүйкелер",soma:"Нейрон денесі",dend:"Дендриттер",axon:"Аксон",rec:"Рецептор",aff:"Афференттік жол",eff:"Эфференттік жол",muscle:"Бұлшықет",hint:"Белгіні таңдаңыз: сызбаның тиісті бөлігі ерекшеленеді.",theory:"1-модуль теориясын ашу"}
};
function Diagram({title,labels,kind}:{title:string;labels:string[];kind:string}) {
 const [active,setActive]=useState(0);
 const hi=(n:number)=>active===n?"#ffd166":"#9bd3ee";
 return <section style={{border:"1px solid #b9d5e7",borderRadius:16,padding:16,background:"#f8fcff"}}><h3>{title}</h3>
 <svg viewBox="0 0 620 230" role="img" aria-label={title} style={{width:"100%",maxHeight:250}}>
 {kind==="system"&&<><circle cx="160" cy="60" r="40" fill={hi(0)}/><path d="M160 100v100" stroke={hi(1)} strokeWidth="18"/><g stroke={hi(2)} strokeWidth="6"><path d="M160 125L45 180M160 145L285 205M160 125L300 70"/></g></>}
 {kind==="neuron"&&<><g stroke={hi(1)} strokeWidth="7"><path d="M175 115L60 45M175 115L45 120M175 115L70 200M175 115L120 25"/></g><circle cx="195" cy="115" r="48" fill={hi(0)}/><path d="M240 115C350 115 410 80 540 115" stroke={hi(2)} strokeWidth="12" fill="none"/></>}
 {kind==="reflex"&&<><circle cx="55" cy="115" r="24" fill={hi(0)}/><path d="M80 115H225" stroke={hi(1)} strokeWidth="10"/><rect x="225" y="70" width="105" height="90" rx="28" fill={hi(2)}/><path d="M330 115H475" stroke={hi(3)} strokeWidth="10"/><ellipse cx="540" cy="115" rx="55" ry="32" fill={hi(4)}/></>}
 </svg><div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{labels.map((x,i)=><button key={x} type="button" onClick={()=>setActive(i)} aria-pressed={active===i}>{x}</button>)}</div></section>;
}
export default function PracticeVisualMaterials({language}:{language:Language}) {
 const c=words[language]; return <div style={{display:"grid",gap:16}}><div><h3>{c.title}</h3><p>{c.intro} {c.hint}</p></div>
 <OrganizationSpecimens language={language}/>
 <Diagram title={c.system} kind="system" labels={[c.brain,c.cord,c.nerves]}/>
 <Diagram title={c.neuron} kind="neuron" labels={[c.soma,c.dend,c.axon]}/>
 <Diagram title={c.reflex} kind="reflex" labels={[c.rec,c.aff,c.cord,c.eff,c.muscle]}/>
 <Link href="/modules/1/theory">{c.theory} →</Link></div>;
}