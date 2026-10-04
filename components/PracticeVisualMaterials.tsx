"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Language } from "../content/course";
import { OrganizationSpecimens } from "./RealSpecimens";

const words={
 RU:{syn:"Синапс",title:"Реальные интерактивные материалы",intro:"Работайте с анатомическими фотографиями и микрофотографиями. Выберите структуру или этап, чтобы изменить фокус изображения.",neuron:"Нейрон: реальная микрофотография после окраски по Гольджи",reflex:"Рефлекторная реакция: реальные кадры опыта",soma:"Тело нейрона",dend:"Дендриты",axon:"Аксон",contact:"Контакт с раздражителем",withdraw:"Отдёргивание руки",source:"Источник и лицензия",theory:"Открыть Theory Модуля 1",note:"Это реальное изображение нейрона, а не условная схема."},
 EN:{syn:"Synapse",title:"Real interactive materials",intro:"Work with anatomical photographs and micrographs. Select a structure or stage to change the image focus.",neuron:"Neuron: real Golgi-stained micrograph",reflex:"Reflex response: real experiment frames",soma:"Cell body",dend:"Dendrites",axon:"Axon",contact:"Stimulus contact",withdraw:"Hand withdrawal",source:"Source and licence",theory:"Open Module 1 Theory",note:"This is a real neuron image, not a schematic drawing."},
 KZ:{syn:"Синапс",title:"Нақты интерактивті материалдар",intro:"Анатомиялық фотосуреттермен және микрофотографиялармен жұмыс істеңіз. Кескін фокусын өзгерту үшін құрылымды немесе кезеңді таңдаңыз.",neuron:"Нейрон: Гольджи әдісімен боялған нақты микрофотография",reflex:"Рефлекстік жауап: тәжірибенің нақты кадрлары",soma:"Нейрон денесі",dend:"Дендриттер",axon:"Аксон",contact:"Тітіркендіргішпен жанасу",withdraw:"Қолды тартып алу",source:"Дереккөз және лицензия",theory:"1-модуль теориясын ашу",note:"Бұл шартты сызба емес, нейронның нақты бейнесі."}
};

function NeuronPhoto({language}:{language:Language}){
 const c=words[language]; const [part,setPart]=useState(0);
 const labels=[c.soma,c.dend,c.axon];
 return <section style={{border:"1px solid #b9d5e7",borderRadius:16,padding:16,background:"#f8fcff"}}>
  <h3>{c.neuron}</h3>
  <div style={{position:"relative",height:360,borderRadius:12,overflow:"hidden",background:"#eef5f8"}}>
   <Image src="/images/anatomy/peripheral-nerve.jpg" alt={c.neuron} fill priority sizes="(max-width:760px) 95vw,800px" style={{objectFit:"cover"}}/>
   <svg viewBox="0 0 800 360" aria-hidden="true" style={{position:"absolute",inset:0,width:"100%",height:"100%",pointerEvents:"none"}}>
    <defs><marker id="neuron-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#ffdf32"/></marker></defs>
    <path d={part===0?"M170 70 L555 175":part===1?"M170 70 L360 125":"M170 70 L675 245"} stroke="#ffdf32" strokeWidth="7" fill="none" markerEnd="url(#neuron-arrow)"/>
    <rect x="18" y="18" width="190" height="48" rx="10" fill="rgba(0,0,0,.72)"/><text x="32" y="50" fill="white" fontSize="23" fontWeight="700">{labels[part]}</text>
   </svg>
  </div>
  <p><strong>{labels[part]}</strong></p>
  <p>{language==="RU"?"Важно: это реальная микрофотография нервной ткани. Она используется как реальный морфологический материал; отдельный нейрон на этом срезе не следует выдавать за полностью прослеживаемые тело, дендриты и аксон.":language==="EN"?"Important: this is a real micrograph of nerve tissue. It is morphological material; a complete soma, dendrites and axon cannot be traced as one neuron in this section.":"Маңызды: бұл жүйке тінінің нақты микрофотосы. Бұл морфологиялық материал; осы кесіндіде бір нейронның денесін, дендриттері мен аксонын толық қадағалау мүмкін емес."}</p>
  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{labels.map((x,i)=><button key={x} type="button" aria-pressed={part===i} onClick={()=>setPart(i)}>{x}</button>)}</div>
 </section>;
}
function ReflexPhoto({language}:{language:Language}){
 const c=words[language]; const [stage,setStage]=useState(0); const files=["reflex-contact.webp","reflex-withdrawal.webp"];
 return <section style={{border:"1px solid #b9d5e7",borderRadius:16,padding:16,background:"#f8fcff"}}>
  <h3>{c.reflex}</h3>
  <div style={{position:"relative",height:380,borderRadius:12,overflow:"hidden"}}><Image src={"/images/lab/"+files[stage]} alt={[c.contact,c.withdraw][stage]} fill sizes="(max-width:760px) 95vw,800px" style={{objectFit:"cover"}}/></div>
  <p><strong>{[c.contact,c.withdraw][stage]}</strong></p>
  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{[c.contact,c.withdraw].map((x,i)=><button key={x} type="button" aria-pressed={stage===i} onClick={()=>setStage(i)}>{x}</button>)}</div>
 </section>;
}
export default function PracticeVisualMaterials({language}:{language:Language}){
 const c=words[language];
 return <div style={{display:"grid",gap:16}}><div><h3>{c.title}</h3><p>{c.intro}</p></div>
  <OrganizationSpecimens language={language}/>
  <NeuronPhoto language={language}/>
  <section style={{border:"1px solid #b9d5e7",borderRadius:16,padding:16,background:"#f8fcff"}}><h3>{c.syn}</h3><div style={{position:"relative",minHeight:300}}><Image src="/images/anatomy/neuromuscular-junction.jpg" alt={c.syn} fill sizes="(max-width:760px) 95vw,800px" style={{objectFit:"contain"}}/></div></section>
  <ReflexPhoto language={language}/>
  <Link href="/modules/1/theory">{c.theory} →</Link>
 </div>;
}