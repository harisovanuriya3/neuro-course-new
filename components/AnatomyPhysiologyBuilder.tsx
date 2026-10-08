"use client";

import {useMemo,useState} from "react";
import type {Language} from "../content/course";
import {recordOutcome} from "../lib/courseProgress";

type Node={id:string;labels:Record<Language,string>;kind:"receptor"|"nerve"|"cns"|"neuron"|"muscle"|"organ"|"process"};
type Link={from:string;to:string;type:"excite"|"inhibit"};
type Spec={nodes:Node[];links:Link[];lesion:string};

const L=(RU:string,EN:string,KZ:string)=>({RU,EN,KZ});
const specs:Record<number,Spec>={
  7:{nodes:[
    {id:"spindle",labels:L("Мышечное веретено","Muscle spindle","Бұлшықет ұршығы"),kind:"receptor"},
    {id:"ia",labels:L("Ia-афферент","Ia afferent","Ia-афферент"),kind:"nerve"},
    {id:"alpha",labels:L("α-мотонейрон мышцы","α-motor neuron","Бұлшықеттің α-мотонейроны"),kind:"neuron"},
    {id:"muscle",labels:L("Растянутая мышца","Stretched muscle","Созылған бұлшықет"),kind:"muscle"},
    {id:"inter",labels:L("Тормозный интернейрон","Inhibitory interneuron","Тежегіш интернейрон"),kind:"neuron"},
    {id:"antalpha",labels:L("α-мотонейрон антагониста","Antagonist α-motor neuron","Антагонист α-мотонейроны"),kind:"neuron"},
    {id:"ant",labels:L("Мышца-антагонист","Antagonist muscle","Антагонист бұлшықет"),kind:"muscle"}],
    links:[{from:"spindle",to:"ia",type:"excite"},{from:"ia",to:"alpha",type:"excite"},{from:"alpha",to:"muscle",type:"excite"},{from:"ia",to:"inter",type:"excite"},{from:"inter",to:"antalpha",type:"inhibit"},{from:"antalpha",to:"ant",type:"excite"}],lesion:"ia"},
  8:{nodes:[
    {id:"receptor",labels:L("Кожный/проприоцептивный рецептор","Cutaneous/proprioceptive receptor","Тері/проприоцептивтік рецептор"),kind:"receptor"},
    {id:"first",labels:L("Первичный афферент","Primary afferent","Біріншілік афферент"),kind:"nerve"},
    {id:"spinal",labels:L("Спинной мозг","Spinal cord","Жұлын"),kind:"cns"},
    {id:"cross",labels:L("Перекрёст пути","Pathway decussation","Жол айқасуы"),kind:"cns"},
    {id:"thalamus",labels:L("Таламус","Thalamus","Таламус"),kind:"cns"},
    {id:"cortex",labels:L("Соматосенсорная кора","Somatosensory cortex","Соматосенсорлық қыртыс"),kind:"cns"}],
    links:[{from:"receptor",to:"first",type:"excite"},{from:"first",to:"spinal",type:"excite"},{from:"spinal",to:"cross",type:"excite"},{from:"cross",to:"thalamus",type:"excite"},{from:"thalamus",to:"cortex",type:"excite"}],lesion:"cross"},
  15:{nodes:[
    {id:"osmo",labels:L("Осморецепторы","Osmoreceptors","Осморецепторлар"),kind:"receptor"},
    {id:"hypo",labels:L("Гипоталамус","Hypothalamus","Гипоталамус"),kind:"cns"},
    {id:"adh",labels:L("Вазопрессиновый выход","Vasopressin output","Вазопрессиндік шығу"),kind:"process"},
    {id:"kidney",labels:L("Почка","Kidney","Бүйрек"),kind:"organ"},
    {id:"water",labels:L("Сохранение воды","Water conservation","Суды сақтау"),kind:"process"}],
    links:[{from:"osmo",to:"hypo",type:"excite"},{from:"hypo",to:"adh",type:"excite"},{from:"adh",to:"kidney",type:"excite"},{from:"kidney",to:"water",type:"excite"}],lesion:"hypo"}
};

const C={RU:{title:"Анатомо-физиологический конструктор",intro:"Соберите путь из реальных анатомических и физиологических звеньев. Выберите следующий элемент и тип связи.",excite:"→ возбуждение / передача",inhibit:"┤ торможение",check:"Проверить схему",reset:"Сначала",good:"Связи собраны правильно. Это засчитывается как применение знания.",bad:"Есть ошибка в структуре, направлении или типе связи. Исправьте схему.",lesion:"Проверка нарушения",lesionQ:"Если указанное звено повреждено, где впервые прервётся нормальная передача?",choose:"Выберите звено",lesionGood:"Верно: вы локализовали место нарушения.",lesionBad:"Проверьте, какое звено находится непосредственно после повреждения."},EN:{title:"Anatomy–physiology pathway builder",intro:"Build the pathway from anatomical and physiological elements. Choose the next structure and the connection type.",excite:"→ excitation / transmission",inhibit:"┤ inhibition",check:"Check pathway",reset:"Reset",good:"The pathway and connections are correct. This counts as application evidence.",bad:"A structure, direction, or connection type is incorrect. Revise the pathway.",lesion:"Lesion challenge",lesionQ:"If the indicated element is damaged, where is normal transmission first interrupted?",choose:"Choose element",lesionGood:"Correct: you localized the interruption.",lesionBad:"Check which element lies immediately after the damaged link."},KZ:{title:"Анатомиялық-физиологиялық конструктор",intro:"Анатомиялық және физиологиялық буындардан жолды құрастырыңыз. Келесі құрылым мен байланыс түрін таңдаңыз.",excite:"→ қозу / берілу",inhibit:"┤ тежелу",check:"Сызбаны тексеру",reset:"Басынан",good:"Жол мен байланыстар дұрыс. Бұл білімді қолдану дәлелі ретінде есептеледі.",bad:"Құрылымда, бағытта немесе байланыс түрінде қате бар. Сызбаны түзетіңіз.",lesion:"Зақым сынағы",lesionQ:"Көрсетілген буын зақымдалса, қалыпты берілу алғаш қай жерде үзіледі?",choose:"Буын таңдаңыз",lesionGood:"Дұрыс: үзілу орнын анықтадыңыз.",lesionBad:"Зақымдалған буыннан кейін қай құрылым орналасқанын тексеріңіз."}} as const;

export default function AnatomyPhysiologyBuilder({moduleId,language}:{moduleId:number;language:Language}){
 const spec=specs[moduleId]; const t=C[language]; const [links,setLinks]=useState<Link[]>([]); const [from,setFrom]=useState(""); const [type,setType]=useState<"excite"|"inhibit">("excite"); const [checked,setChecked]=useState(false); const [lesionAnswer,setLesionAnswer]=useState("");
 const expectedAfter=useMemo(()=>spec?.links.find(x=>x.from===spec.lesion)?.to??"",[spec]);
 if(!spec)return null;
 const add=(to:string)=>{if(!from||from===to)return;setLinks(v=>[...v.filter(x=>!(x.from===from&&x.to===to)),{from,to,type}]);setFrom("");setChecked(false)};
 const good=links.length===spec.links.length&&spec.links.every(e=>links.some(x=>x.from===e.from&&x.to===e.to&&x.type===e.type));
 return <section style={{margin:"24px 0",padding:"clamp(14px,3vw,22px)",border:"1px solid #bfd5e2",borderRadius:18,background:"#fafdff"}}>
  <h2 style={{marginTop:0}}>{t.title}</h2><p>{t.intro}</p>
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(150px,1fr))",gap:10}}>
   {spec.nodes.map(n=><button key={n.id} type="button" aria-pressed={from===n.id} onClick={()=>from?add(n.id):setFrom(n.id)} style={{minHeight:76,padding:10,borderRadius:14,fontWeight:700}}><span aria-hidden="true" style={{display:"block",fontSize:24}}>{n.kind==="receptor"?"◉":n.kind==="nerve"?"〰":n.kind==="cns"?"🧠":n.kind==="neuron"?"⌁":n.kind==="muscle"?"▰":n.kind==="organ"?"⬡":"◎"}</span>{n.labels[language]}</button>)}
  </div>
  <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:12}}><button type="button" aria-pressed={type==="excite"} onClick={()=>setType("excite")}>{t.excite}</button><button type="button" aria-pressed={type==="inhibit"} onClick={()=>setType("inhibit")}>{t.inhibit}</button></div>
  <ol>{links.map((x,i)=><li key={i}>{spec.nodes.find(n=>n.id===x.from)?.labels[language]} {x.type==="inhibit"?" ┤ ":" → "} {spec.nodes.find(n=>n.id===x.to)?.labels[language]}</li>)}</ol>
  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}><button type="button" disabled={!links.length} onClick={()=>{setLinks([]);setFrom("");setChecked(false);setLesionAnswer("")}}>{t.reset}</button><button type="button" disabled={!links.length} onClick={()=>{setChecked(true);recordOutcome(moduleId,"criterion:application:anatomy-builder",good?1:0,1)}}>{t.check}</button></div>
  {checked&&<p role="status"><strong>{good?t.good:t.bad}</strong></p>}
  {good&&<div style={{marginTop:18,padding:14,border:"1px solid #d7e5ed",borderRadius:14}}><h3>{t.lesion}</h3><p>{t.lesionQ}</p><p><strong>{spec.nodes.find(n=>n.id===spec.lesion)?.labels[language]}</strong></p><select value={lesionAnswer} onChange={e=>{const v=e.target.value;setLesionAnswer(v);if(v)recordOutcome(moduleId,"criterion:transfer:anatomy-builder",v===expectedAfter?1:0,1)}}><option value="">{t.choose}</option>{spec.nodes.filter(n=>n.id!==spec.lesion).map(n=><option key={n.id} value={n.id}>{n.labels[language]}</option>)}</select>{lesionAnswer&&<p><strong>{lesionAnswer===expectedAfter?t.lesionGood:t.lesionBad}</strong></p>}</div>}
 </section>;
}
