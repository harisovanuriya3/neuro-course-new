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
    <defs><marker id="neuron-arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0,0 L10,5 L0,10 z" fill="#ff2d2d"/></marker></defs>
    <path d={part===0?"M215 55 L625 155":part===1?"M215 55 L500 105":"M215 55 L705 245"} stroke="#ff2d2d" strokeWidth="10" fill="none" markerEnd="url(#neuron-arrow)"/>
    <rect x="18" y="18" width="250" height="52" rx="10" fill="rgba(0,0,0,.72)"/><text x="32" y="50" fill="white" fontSize="23" fontWeight="700">{labels[part]}</text>
   </svg>
  </div>
  <p><strong>{labels[part]}</strong></p>
  <p>{language==="RU"?"Важно: это реальная микрофотография нервной ткани. Она используется как реальный морфологический материал; отдельный нейрон на этом срезе не следует выдавать за полностью прослеживаемые тело, дендриты и аксон.":language==="EN"?"Important: this is a real micrograph of nerve tissue. It is morphological material; a complete soma, dendrites and axon cannot be traced as one neuron in this section.":"Маңызды: бұл жүйке тінінің нақты микрофотосы. Бұл морфологиялық материал; осы кесіндіде бір нейронның денесін, дендриттері мен аксонын толық қадағалау мүмкін емес."}</p>
  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{labels.map((x,i)=><button key={x} type="button" aria-pressed={part===i} onClick={()=>setPart(i)}>{x}</button>)}</div>
 </section>;
}
function ReflexPhoto({language}:{language:Language}){
 const c=words[language]; const [stage,setStage]=useState(0); const [running,setRunning]=useState(false);
 const t={RU:{title:"Интерактивная рефлекторная дуга",run:"▶ Запустить",reset:"↻ Сбросить",steps:["Рецептор кожи","Афферентный нейрон","Интеграция в спинном мозге","Эфферентный нейрон","Эффектор: мышца"],desc:["Раздражитель активирует рецепторы кожи.","Потенциалы действия идут по чувствительному волокну через задний корешок к спинному мозгу.","В сером веществе сигнал передаётся через синаптическое звено на нейроны рефлекторной сети.","Мотонейрон проводит команду через передний корешок к мышце.","Мышца сокращается — рука отдёргивается."]},EN:{title:"Interactive reflex arc",run:"▶ Run",reset:"↻ Reset",steps:["Skin receptor","Afferent neuron","Spinal integration","Efferent neuron","Effector: muscle"],desc:["The stimulus activates skin receptors.","Action potentials travel along the sensory fiber through the dorsal root to the spinal cord.","In gray matter the signal crosses synaptic elements of the reflex network.","The motor neuron carries the command through the ventral root to muscle.","The muscle contracts and the hand withdraws."]},KZ:{title:"Интерактивті рефлекстік доға",run:"▶ Іске қосу",reset:"↻ Қалпына келтіру",steps:["Тері рецепторы","Афференттік нейрон","Жұлындағы интеграция","Эфференттік нейрон","Эффектор: бұлшықет"],desc:["Тітіркендіргіш тері рецепторларын белсендіреді.","Әрекет потенциалдары сезімтал талшықпен артқы түбір арқылы жұлынға өтеді.","Сұр затта сигнал рефлекстік желінің синапстық буындары арқылы беріледі.","Мотонейрон команданы алдыңғы түбір арқылы бұлшықетке өткізеді.","Бұлшықет жиырылып, қол тартылады."]}}[language];
 function run(){if(running)return;setStage(0);setRunning(true);let i=0;const timer=window.setInterval(()=>{i++;setStage(i);if(i>=4){window.clearInterval(timer);setRunning(false)}},1100)}
 const pts=[[85,225],[250,155],[400,185],[555,225],[715,150]];
 return <section style={{border:"1px solid #b9d5e7",borderRadius:16,padding:16,background:"#f8fcff"}}>
  <h3>{t.title}</h3>
  <svg viewBox="0 0 800 360" role="img" aria-label={t.steps[stage]} style={{width:"100%",height:"auto",borderRadius:12,background:"linear-gradient(180deg,#eef8ff,#fff)"}}>
   <defs><marker id="ra" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto"><path d="M0 0L10 5L0 10z" fill="#d52222"/></marker></defs>
   <rect x="330" y="55" width="145" height="230" rx="68" fill="#ead7bd" stroke="#765f4b" strokeWidth="4"/><path d="M400 78 C350 105 350 150 400 178 C450 150 450 105 400 78 M400 178 C350 205 350 245 400 270 C450 245 450 205 400 178" fill="#8c7767" opacity=".55"/>
   <path d="M85 225 C165 220 205 170 250 155 C300 140 320 160 360 175" fill="none" stroke="#2676d9" strokeWidth="12"/>
   <path d="M440 195 C500 205 520 220 555 225 C620 235 655 195 715 150" fill="none" stroke="#d52222" strokeWidth="12"/>
   <circle cx="85" cy="225" r="24" fill="#f6b44a"/><circle cx="250" cy="155" r="20" fill="#2676d9"/><circle cx="400" cy="185" r="20" fill="#7a48b5"/><circle cx="555" cy="225" r="20" fill="#d52222"/><ellipse cx="715" cy="150" rx="45" ry="75" fill="#b94c3e"/>
   <path d="M92 210 C180 195 245 150 355 176" fill="none" stroke="#fff" strokeWidth="4" strokeDasharray="10 10" markerEnd="url(#ra)"/><path d="M445 195 C540 220 620 225 690 165" fill="none" stroke="#fff" strokeWidth="4" strokeDasharray="10 10" markerEnd="url(#ra)"/>
   {pts.map((p,i)=><g key={i} opacity={i<=stage?1:.28}><circle cx={p[0]} cy={p[1]} r={i===stage?17:10} fill={i===stage?"#ffe600":"#fff"} stroke="#111" strokeWidth="3"/><text x={p[0]} y={p[1]-30} textAnchor="middle" fontSize="17" fontWeight="700">{i+1}</text></g>)}
   <circle cx={pts[stage][0]} cy={pts[stage][1]} r="25" fill="none" stroke="#ffe600" strokeWidth="7"><animate attributeName="r" values="18;30;18" dur=".9s" repeatCount="indefinite"/></circle>
  </svg>
  <ol style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(135px,1fr))",gap:8,padding:0,listStyle:"none"}}>{t.steps.map((x,i)=><li key={x}><button type="button" onClick={()=>{setRunning(false);setStage(i)}} aria-pressed={stage===i} style={{width:"100%",minHeight:58,fontWeight:stage===i?800:600}}>{i+1}. {x}</button></li>)}</ol>
  <p aria-live="polite"><strong>{t.steps[stage]}.</strong> {t.desc[stage]}</p>
  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}><button type="button" disabled={running} onClick={run}>{t.run}</button><button type="button" onClick={()=>{setRunning(false);setStage(0)}}>{t.reset}</button></div>
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