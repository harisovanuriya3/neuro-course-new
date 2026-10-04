"use client";
import { useEffect, useState } from "react";
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
 const t={RU:{title:"Рефлекс отдёргивания: реальный опыт + динамический путь",run:"▶ Запустить опыт",reset:"↻ Сбросить",steps:["Кожа: болевой/тепловой рецептор","Чувствительный нейрон","Спинной мозг: интеграция","Двигательный нейрон","Сокращение мышцы и отдёргивание руки"],desc:["Раздражитель активирует ноцицептивные/термочувствительные окончания кожи.","Импульсы идут по афферентному волокну через задний корешок.","В сером веществе спинного мозга активируется рефлекторная сеть через синаптические контакты.","Мотонейрон проводит эфферентную команду к мышце.","Сгибатели сокращаются, рука отдёргивается от раздражителя."]},EN:{title:"Withdrawal reflex: real experiment + dynamic pathway",run:"▶ Run experiment",reset:"↻ Reset",steps:["Skin receptor","Sensory neuron","Spinal integration","Motor neuron","Muscle contraction and withdrawal"],desc:["The stimulus activates nociceptive/thermosensitive skin endings.","Impulses travel in the afferent fiber through the dorsal root.","A spinal gray-matter reflex network is activated through synaptic contacts.","The motor neuron carries the efferent command to muscle.","Flexor muscles contract and the hand withdraws."]},KZ:{title:"Тарту рефлексі: нақты тәжірибе + динамикалық жол",run:"▶ Тәжірибені іске қосу",reset:"↻ Қалпына келтіру",steps:["Тері рецепторы","Сезімтал нейрон","Жұлындағы интеграция","Қозғалтқыш нейрон","Бұлшықет жиырылып, қол тартылады"],desc:["Тітіркендіргіш терінің ноцицептивті/термосезімтал ұштарын белсендіреді.","Импульстер афференттік талшықпен артқы түбір арқылы өтеді.","Жұлынның сұр затында синапстық байланыстар арқылы рефлекстік желі белсендіріледі.","Мотонейрон эфференттік команданы бұлшықетке өткізеді.","Бүккіш бұлшықеттер жиырылып, қол тітіркендіргіштен тартылады."]}}[language];
 function run(){if(running)return;setStage(0);setRunning(true);let i=0;const timer=window.setInterval(()=>{i++;setStage(i);if(i>=4){window.clearInterval(timer);setRunning(false)}},1200)}
 const pos=[[13,75],[29,57],[50,50],[69,60],[87,35]];
 return <section style={{border:"1px solid #b9d5e7",borderRadius:16,padding:16,background:"#f8fcff"}}><h3>{t.title}</h3>
  <div style={{position:"relative",height:420,borderRadius:14,overflow:"hidden",background:"#07131c"}}>
   <Image src={"/images/lab/"+(stage===4?"reflex-withdrawal.webp":"reflex-contact.webp")} alt={t.steps[stage]} fill sizes="(max-width:760px) 95vw,900px" style={{objectFit:"cover",transition:"opacity .35s ease"}}/>
   <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,rgba(0,0,0,.05),rgba(0,0,0,.28))"}}/>
   <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" style={{position:"absolute",inset:0,width:"100%",height:"100%"}}>
    <polyline points="13,75 29,57 50,50 69,60 87,35" fill="none" stroke="rgba(255,255,255,.8)" strokeWidth="1.8" strokeDasharray="3 2"/>
    {pos.map((p,i)=><circle key={i} cx={p[0]} cy={p[1]} r={i===stage?3.2:1.8} fill={i<=stage?"#ffe000":"#fff"} stroke="#d71920" strokeWidth=".8"/>)}
   </svg>
   <div style={{position:"absolute",left:`calc(${pos[stage][0]}% - 18px)`,top:`calc(${pos[stage][1]}% - 18px)`,width:36,height:36,border:"5px solid #ffe000",borderRadius:"50%",boxShadow:"0 0 0 6px rgba(215,25,32,.75),0 0 22px #ffe000",transition:"left .55s ease,top .55s ease"}}/>
   <div style={{position:"absolute",left:12,bottom:12,right:12,padding:"10px 12px",background:"rgba(0,0,0,.72)",color:"#fff",borderRadius:10,fontWeight:800}}>{stage+1}/5 — {t.steps[stage]}</div>
  </div>
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(145px,1fr))",gap:8,marginTop:12}}>{t.steps.map((x,i)=><button key={x} type="button" onClick={()=>{setRunning(false);setStage(i)}} aria-pressed={stage===i} style={{minHeight:58,fontWeight:stage===i?800:600}}>{i+1}. {x}</button>)}</div>
  <p aria-live="polite"><strong>{t.steps[stage]}.</strong> {t.desc[stage]}</p><div style={{display:"flex",gap:8,flexWrap:"wrap"}}><button type="button" disabled={running} onClick={run}>{t.run}</button><button type="button" onClick={()=>{setRunning(false);setStage(0)}}>{t.reset}</button></div>
 </section>;
}


function ReflexArcAtlas({language}:{language:Language}){
 const [stage,setStage]=useState(0); const [playing,setPlaying]=useState(false); const [speed,setSpeed]=useState(1000);
 const t={RU:{title:"Рефлекторная дуга: анатомический интерактив",run:"▶ Запустить рефлекс",stop:"■ Остановить",reset:"↻ Сбросить",speed:"Скорость",steps:["Рецептор","Афферентный нейрон","Интеграция (синапс)","Эфферентный нейрон","Ответ"],desc:["Тепловое раздражение активирует ноцицепторы кожи.","Импульс проходит по чувствительному волокну через спинномозговой ганглий и задний корешок.","В сером веществе спинного мозга сигнал переключается через синаптическое звено.","Мотонейрон проводит импульс через передний корешок к мышце.","Сгибатели сокращаются — рука отдёргивается от горячего предмета."]},EN:{title:"Reflex arc: anatomical interactive",run:"▶ Run reflex",stop:"■ Stop",reset:"↻ Reset",speed:"Speed",steps:["Receptor","Afferent neuron","Integration (synapse)","Efferent neuron","Response"],desc:["Thermal stimulation activates skin nociceptors.","The impulse travels through the sensory fiber, dorsal root ganglion and dorsal root.","In spinal gray matter the signal crosses a synaptic element.","The motor neuron conducts the impulse through the ventral root to muscle.","Flexors contract and the hand withdraws from the hot object."]},KZ:{title:"Рефлекстік доға: анатомиялық интерактив",run:"▶ Рефлексті іске қосу",stop:"■ Тоқтату",reset:"↻ Қалпына келтіру",speed:"Жылдамдық",steps:["Рецептор","Афференттік нейрон","Интеграция (синапс)","Эфференттік нейрон","Жауап"],desc:["Жылулық тітіркену тері ноцицепторларын белсендіреді.","Импульс сезімтал талшықпен жұлын түйіні және артқы түбір арқылы өтеді.","Жұлынның сұр затында сигнал синапстық буын арқылы ауысады.","Мотонейрон импульсті алдыңғы түбір арқылы бұлшықетке өткізеді.","Бүккіштер жиырылып, қол ыстық заттан тартылады."]}}[language];
 useEffect(()=>{if(!playing)return;const id=window.setTimeout(()=>{if(stage===4){setPlaying(false);return}setStage(s=>s+1)},speed);return()=>clearTimeout(id)},[playing,stage,speed]);
 const pts=[[9,66],[31,56],[50,50],[69,58],[90,35]];
 return <section style={{border:"1px solid #b9d5e7",borderRadius:18,padding:16,background:"#fff"}}><h3>{t.title}</h3>
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:8,marginBottom:12}}>{t.steps.map((s,i)=><button key={s} type="button" onClick={()=>{setPlaying(false);setStage(i)}} aria-pressed={stage===i} style={{minHeight:74,fontWeight:stage===i?800:600,borderColor:stage===i?"#176bd6":undefined}}><b>{i+1}</b><br/>{s}</button>)}</div>
  <div style={{position:"relative",height:500,borderRadius:16,overflow:"hidden",background:"#dce9ef"}}>
   <div style={{position:"absolute",left:0,top:0,bottom:0,width:"34%"}}><Image src="/images/lab/reflex-contact.webp" alt={t.steps[0]} fill sizes="34vw" style={{objectFit:"cover"}}/></div>
   <div style={{position:"absolute",left:"31%",top:0,bottom:0,width:"42%",background:"rgba(255,255,255,.9)"}}><Image src="/images/anatomy/brain-spinal-cord.jpg" alt={t.steps[2]} fill sizes="42vw" style={{objectFit:"cover",objectPosition:"center"}}/></div>
   <div style={{position:"absolute",right:0,top:0,bottom:0,width:"31%"}}><Image src="/images/lab/reflex-withdrawal.webp" alt={t.steps[4]} fill sizes="31vw" style={{objectFit:"cover"}}/></div>
   <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,rgba(0,0,0,.06),rgba(255,255,255,.02),rgba(0,0,0,.06))"}}/>
   <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" style={{position:"absolute",inset:0,width:"100%",height:"100%"}}><path d="M9 66 C19 64 24 57 31 56 C39 54 43 50 50 50" fill="none" stroke="#1684ff" strokeWidth="2.4"/><path d="M50 50 C58 52 63 57 69 58 C78 59 84 43 90 35" fill="none" stroke="#f12626" strokeWidth="2.4"/><path d="M9 66 C19 64 24 57 31 56 C39 54 43 50 50 50 C58 52 63 57 69 58 C78 59 84 43 90 35" fill="none" stroke="#fff" strokeWidth=".65" strokeDasharray="2 1"/></svg>
   <div style={{position:"absolute",left:`calc(${pts[stage][0]}% - 22px)`,top:`calc(${pts[stage][1]}% - 22px)`,width:44,height:44,borderRadius:"50%",border:"6px solid #ffe100",boxShadow:"0 0 0 7px rgba(220,20,20,.78),0 0 30px #ffe100",transition:"left .65s ease,top .65s ease"}}/>
   <div style={{position:"absolute",left:12,right:12,bottom:12,background:"rgba(0,0,0,.76)",color:"white",padding:12,borderRadius:10}}><b>{stage+1}. {t.steps[stage]}</b><br/>{t.desc[stage]}</div>
  </div>
  <div style={{display:"flex",gap:10,flexWrap:"wrap",alignItems:"center",marginTop:12}}><button type="button" disabled={playing} onClick={()=>{setStage(0);setPlaying(true)}}>{t.run}</button><button type="button" disabled={!playing} onClick={()=>setPlaying(false)}>{t.stop}</button><button type="button" onClick={()=>{setPlaying(false);setStage(0)}}>{t.reset}</button><label>{t.speed}: <input type="range" min="600" max="1600" step="200" value={2200-speed} onChange={e=>setSpeed(2200-Number(e.target.value))}/></label></div>
 </section>
}
\nfunction DetailedReflexArc({language}:{language:Language}){
 const [stage,setStage]=useState(0); const [running,setRunning]=useState(false); const [speed,setSpeed]=useState(1100);
 const x={RU:{title:"Рефлекторная дуга: от раздражения к ответу",sub:"Интерактивная анатомическая модель",run:"▶ Запустить рефлекс",stop:"■ Остановить",reset:"↻ Сбросить",speed:"Скорость",steps:["Рецептор","Афферентный нейрон","Интеграция","Эфферентный нейрон","Ответ"],desc:["Тепловое/болевое раздражение активирует свободные нервные окончания кожи.","Импульс по чувствительному волокну идёт через спинномозговой ганглий и задний корешок.","В сером веществе спинного мозга сигнал переключается в рефлекторной сети.","Импульс мотонейрона выходит через передний корешок к скелетной мышце.","Сокращение сгибателей вызывает быстрое отдёргивание руки."]},EN:{title:"Reflex arc: from stimulus to response",sub:"Interactive anatomical model",run:"▶ Run reflex",stop:"■ Stop",reset:"↻ Reset",speed:"Speed",steps:["Receptor","Afferent neuron","Integration","Efferent neuron","Response"],desc:["Thermal/pain stimulation activates free nerve endings in skin.","The sensory impulse travels through the dorsal root ganglion and dorsal root.","In spinal gray matter the signal is relayed through the reflex network.","The motor-neuron impulse leaves through the ventral root toward skeletal muscle.","Flexor contraction produces rapid withdrawal of the hand."]},KZ:{title:"Рефлекстік доға: тітіркенуден жауапқа дейін",sub:"Интерактивті анатомиялық модель",run:"▶ Рефлексті іске қосу",stop:"■ Тоқтату",reset:"↻ Қалпына келтіру",speed:"Жылдамдық",steps:["Рецептор","Афференттік нейрон","Интеграция","Эфференттік нейрон","Жауап"],desc:["Жылулық/ауырсыну тітіркенуі терідегі бос жүйке ұштарын белсендіреді.","Сезімтал импульс жұлын түйіні мен артқы түбір арқылы өтеді.","Жұлынның сұр затында сигнал рефлекстік желі арқылы ауысады.","Мотонейрон импульсі алдыңғы түбір арқылы қаңқа бұлшықетіне барады.","Бүккіштердің жиырылуы қолдың тез тартылуын туғызады."]}}[language];
 function run(){setStage(0);setRunning(true)}
 useEffect(()=>{if(!running)return;const id=window.setTimeout(()=>{if(stage>=4)setRunning(false);else setStage(v=>v+1)},speed);return()=>window.clearTimeout(id)},[running,stage,speed]);
 const p=[[11,72],[31,56],[50,48],[70,57],[88,33]][stage];
 return <section style={{border:"1px solid #b9d5e7",borderRadius:18,padding:16,background:"#fff"}}><h3>{x.title}</h3><p>{x.sub}</p>
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:8,marginBottom:12}}>{x.steps.map((s,i)=><button key={s} type="button" onClick={()=>{setRunning(false);setStage(i)}} aria-pressed={stage===i} style={{minHeight:72,fontWeight:stage===i?800:600}}><b>{i+1}</b><br/>{s}</button>)}</div>
  <div style={{position:"relative",height:500,borderRadius:16,overflow:"hidden",background:"#15202a"}}>
   <Image src={stage===4?"/images/lab/reflex-withdrawal.webp":"/images/lab/reflex-contact.webp"} alt={x.steps[stage]} fill sizes="(max-width:760px) 95vw,1000px" style={{objectFit:"cover"}}/>
   <div style={{position:"absolute",inset:0,background:"linear-gradient(90deg,rgba(0,0,0,.08),rgba(0,0,0,.18))"}}/>
   <svg viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true" style={{position:"absolute",inset:0,width:"100%",height:"100%"}}><path d="M11 72 C20 70 24 60 31 56 C38 51 43 48 50 48 C58 49 63 55 70 57 C78 58 82 42 88 33" fill="none" stroke="#fff" strokeWidth="1.6" strokeDasharray="2.5 1.5"/><path d="M11 72 C20 70 24 60 31 56 C38 51 43 48 50 48" fill="none" stroke="#1987ff" strokeWidth="2.6" opacity={stage>=1?1:.25}/><path d="M50 48 C58 49 63 55 70 57 C78 58 82 42 88 33" fill="none" stroke="#ff3030" strokeWidth="2.6" opacity={stage>=3?1:.25}/></svg>
   <div style={{position:"absolute",left:`calc(${p[0]}% - 22px)`,top:`calc(${p[1]}% - 22px)`,width:44,height:44,borderRadius:"50%",border:"6px solid #ffe000",boxShadow:"0 0 0 6px rgba(220,30,30,.8),0 0 28px #ffe000",transition:"left .65s ease,top .65s ease"}}/>
   <div style={{position:"absolute",left:12,right:12,bottom:12,padding:12,borderRadius:10,background:"rgba(0,0,0,.76)",color:"white"}}><b>{stage+1}. {x.steps[stage]}</b><br/>{x.desc[stage]}</div>
  </div>
  <div style={{display:"flex",gap:10,flexWrap:"wrap",alignItems:"center",marginTop:12}}><button type="button" onClick={run} disabled={running}>{x.run}</button><button type="button" onClick={()=>setRunning(false)} disabled={!running}>{x.stop}</button><button type="button" onClick={()=>{setRunning(false);setStage(0)}}>{x.reset}</button><label>{x.speed}: <input aria-label={x.speed} type="range" min="600" max="1800" step="200" value={2400-speed} onChange={e=>setSpeed(2400-Number(e.target.value))}/></label></div>
 </section>
}

export default function PracticeVisualMaterials({language}:{language:Language}){
 const c=words[language];
 return <div style={{display:"grid",gap:16}}><div><h3>{c.title}</h3><p>{c.intro}</p></div>
  <OrganizationSpecimens language={language}/>
  <NeuronPhoto language={language}/>
  <section style={{border:"1px solid #b9d5e7",borderRadius:16,padding:16,background:"#f8fcff"}}><h3>{c.syn}</h3><div style={{position:"relative",minHeight:300}}><Image src="/images/anatomy/neuromuscular-junction.jpg" alt={c.syn} fill sizes="(max-width:760px) 95vw,800px" style={{objectFit:"contain"}}/></div></section>
  <ReflexArcAtlas language={language}/>\n  <DetailedReflexArc language={language}/>\n  <ReflexPhoto language={language}/>
  <Link href="/modules/1/theory">{c.theory} →</Link>
 </div>;
}