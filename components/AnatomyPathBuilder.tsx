"use client";
import {useMemo,useState} from "react";
import {recordOutcome} from "../lib/courseProgress";
import type {Language} from "../content/course";

type Node={id:string,label:Record<Language,string>,kind:"anatomy"|"physiology"};
const nodes:Node[]=[
{id:"receptor",kind:"anatomy",label:{RU:"Рецептор / сенсорная структура",EN:"Receptor / sensory structure",KZ:"Рецептор / сенсорлық құрылым"}},
{id:"afferent",kind:"anatomy",label:{RU:"Афферентный нейрон / нерв",EN:"Afferent neuron / nerve",KZ:"Афференттік нейрон / жүйке"}},
{id:"spinal",kind:"anatomy",label:{RU:"Спинной мозг",EN:"Spinal cord",KZ:"Жұлын"}},
{id:"brainstem",kind:"anatomy",label:{RU:"Ствол мозга",EN:"Brainstem",KZ:"Ми сабауы"}},
{id:"thalamus",kind:"anatomy",label:{RU:"Таламус",EN:"Thalamus",KZ:"Таламус"}},
{id:"cortex",kind:"anatomy",label:{RU:"Кора",EN:"Cortex",KZ:"Қыртыс"}},
{id:"interneuron",kind:"anatomy",label:{RU:"Интернейрон",EN:"Interneuron",KZ:"Интернейрон"}},
{id:"motor",kind:"anatomy",label:{RU:"Мотонейрон / эфферент",EN:"Motor neuron / efferent",KZ:"Мотонейрон / эфферент"}},
{id:"muscle",kind:"anatomy",label:{RU:"Мышца / орган-мишень",EN:"Muscle / target organ",KZ:"Бұлшықет / нысана мүше"}},
{id:"synapse",kind:"physiology",label:{RU:"Синапс",EN:"Synapse",KZ:"Синапс"}},
{id:"excite",kind:"physiology",label:{RU:"Возбуждение (+)",EN:"Excitation (+)",KZ:"Қозу (+)"}},
{id:"inhibit",kind:"physiology",label:{RU:"Торможение (−)",EN:"Inhibition (−)",KZ:"Тежелу (−)"}},
{id:"feedback",kind:"physiology",label:{RU:"Обратная связь",EN:"Feedback",KZ:"Кері байланыс"}},
];
const ui={RU:{title:"Соберите физиологическую схему",hint:"Выберите реальные анатомические структуры и физиологические процессы в правильном порядке. Стрелка показывает направление сигнала.",bank:"Блоки",scheme:"Ваша схема",remove:"Убрать",clear:"Очистить",check:"Проверить схему",need:"Добавьте не менее трёх разных звеньев.",ok:"Схема сохранена как выполненная работа. Освоение подтверждается заданиями с однозначно проверяемыми связями."},EN:{title:"Build a physiological pathway",hint:"Choose anatomical structures and physiological processes in the correct order. Arrows show signal direction.",bank:"Blocks",scheme:"Your pathway",remove:"Remove",clear:"Clear",check:"Check pathway",need:"Add at least three different links.",ok:"The pathway is saved as completed work. Mastery is confirmed by tasks with objectively checkable links."},KZ:{title:"Физиологиялық сызбаны құрастырыңыз",hint:"Нақты анатомиялық құрылымдар мен физиологиялық үдерістерді дұрыс ретпен таңдаңыз. Жебе сигнал бағытын көрсетеді.",bank:"Блоктар",scheme:"Сіздің сызбаңыз",remove:"Алып тастау",clear:"Тазарту",check:"Сызбаны тексеру",need:"Кемінде үш түрлі буын қосыңыз.",ok:"Сызба орындалған жұмыс ретінде сақталды. Меңгеру объективті тексерілетін байланыстары бар тапсырмалармен расталады."}} as const;
export default function AnatomyPathBuilder({moduleId,language}:{moduleId:number;language:Language}){
 const t=ui[language]; const [chosen,setChosen]=useState<string[]>([]); const [saved,setSaved]=useState(false);
 const valid=useMemo(()=>chosen.length>=3&&new Set(chosen).size>=3,[chosen]);
 return <section style={{margin:"24px 0",padding:"clamp(14px,3vw,22px)",border:"1px solid #bfd5e2",borderRadius:16,background:"#f8fcff"}}>
  <h2 style={{marginTop:0}}>{t.title}</h2><p>{t.hint}</p>
  <h3>{t.bank}</h3><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))",gap:8}}>
   {nodes.map(n=><button type="button" key={n.id} onClick={()=>{setChosen(x=>[...x,n.id]);setSaved(false)}} style={{padding:12,textAlign:"left",borderRadius:12,border:"1px solid #b8cfdd",background:n.kind==="anatomy"?"#fff":"#f3f8fb"}}><strong>{n.label[language]}</strong><br/><small>{n.kind==="anatomy"?(language==="RU"?"анатомическая структура":language==="EN"?"anatomical structure":"анатомиялық құрылым"):(language==="RU"?"физиологический процесс":language==="EN"?"physiological process":"физиологиялық үдеріс")}</small></button>)}
  </div>
  <h3>{t.scheme}</h3><div style={{display:"flex",gap:8,alignItems:"center",flexWrap:"wrap",minHeight:58,padding:10,border:"1px dashed #9bb9ca",borderRadius:12,background:"#fff"}}>
   {chosen.map((id,i)=>{const n=nodes.find(x=>x.id===id)!;return <span key={i} style={{display:"inline-flex",alignItems:"center",gap:6}}><button type="button" title={t.remove} onClick={()=>{setChosen(x=>x.filter((_,j)=>j!==i));setSaved(false)}} style={{padding:"8px 10px",borderRadius:10,border:"1px solid #b8cfdd",background:"#fff"}}>{n.label[language]} ×</button>{i<chosen.length-1&&<b aria-hidden="true">→</b>}</span>})}
  </div>
  {!valid&&chosen.length>0&&<p role="status">{t.need}</p>}
  <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:12}}><button type="button" onClick={()=>{setChosen([]);setSaved(false)}}>{t.clear}</button><button type="button" disabled={!valid} onClick={()=>{recordOutcome(moduleId,"path-builder-completion",1,1);setSaved(true)}}>{t.check}</button></div>
  {saved&&<p role="status"><strong>{t.ok}</strong></p>}
 </section>;
}