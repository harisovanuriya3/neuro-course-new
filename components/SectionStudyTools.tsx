"use client";

import {useEffect,useRef,useState} from "react";
import type {PointerEvent as ReactPointerEvent} from "react";
type Language="RU"|"EN"|"KZ";
const words={
 RU:{search:"Поиск в разделе",placeholder:"Найти слово на странице",find:"Найти",next:"Следующее",none:"Совпадений нет",matches:"Совпадений",draw:"Поле для рисования",clear:"Очистить",save:"Сохранить рисунок PNG",pen:"Перо",eraser:"Ластик",close:"Закрыть"},
 EN:{search:"Search this section",placeholder:"Find text on this page",find:"Find",next:"Next",none:"No matches",matches:"Matches",draw:"Drawing board",clear:"Clear",save:"Save drawing PNG",pen:"Pen",eraser:"Eraser",close:"Close"},
 KZ:{search:"Бөлімнен іздеу",placeholder:"Осы беттен мәтін іздеу",find:"Іздеу",next:"Келесі",none:"Сәйкестік жоқ",matches:"Сәйкестік",draw:"Сурет салу алаңы",clear:"Тазарту",save:"PNG сақтау",pen:"Қалам",eraser:"Өшіргіш",close:"Жабу"}
};
export default function SectionStudyTools({language,moduleNumber,section}:{language:Language;moduleNumber:number;section:string}){
 const t=words[language];const [query,setQuery]=useState("");const [matches,setMatches]=useState(0);const [active,setActive]=useState(0);const [open,setOpen]=useState(false);const [eraser,setEraser]=useState(false);
 const canvas=useRef<HTMLCanvasElement>(null);const drawing=useRef(false);const last=useRef<{x:number;y:number}|null>(null);const marks=useRef<HTMLElement[]>([]);
 const clearMarks=()=>{for(const mark of marks.current){mark.replaceWith(document.createTextNode(mark.textContent||""));}marks.current=[];document.querySelector("#course-section-search-root")?.normalize();};
 useEffect(()=>()=>{clearMarks()},[]);
 const find=(term=query)=>{clearMarks();const q=term.trim();if(!q){setMatches(0);setActive(0);return;}const root=document.getElementById("course-section-search-root");if(!root)return;const walker=document.createTreeWalker(root,NodeFilter.SHOW_TEXT,{acceptNode(node){const p=node.parentElement;if(!p||p.closest("button,input,textarea,select,script,style,mark,[data-search-ignore]"))return NodeFilter.FILTER_REJECT;return node.textContent?.toLocaleLowerCase().includes(q.toLocaleLowerCase())?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;}});const nodes:Text[]=[];while(walker.nextNode())nodes.push(walker.currentNode as Text);for(const node of nodes){const raw=node.textContent||"";const lower=raw.toLocaleLowerCase(),needle=q.toLocaleLowerCase();let from=0;const fragment=document.createDocumentFragment();while(from<raw.length){const at=lower.indexOf(needle,from);if(at<0){fragment.append(raw.slice(from));break;}fragment.append(raw.slice(from,at));const mark=document.createElement("mark");mark.textContent=raw.slice(at,at+q.length);mark.dataset.studyMatch="true";fragment.append(mark);marks.current.push(mark);from=at+q.length;}node.replaceWith(fragment);}setMatches(marks.current.length);setActive(0);marks.current[0]?.scrollIntoView({behavior:"smooth",block:"center"});};
 const next=()=>{if(!marks.current.length)return;const index=(active+1)%marks.current.length;setActive(index);marks.current[index].scrollIntoView({behavior:"smooth",block:"center"});};
 const context=()=>canvas.current?.getContext("2d");
 const point=(event:ReactPointerEvent<HTMLCanvasElement>)=>{const rect=event.currentTarget.getBoundingClientRect();return {x:(event.clientX-rect.left)*event.currentTarget.width/rect.width,y:(event.clientY-rect.top)*event.currentTarget.height/rect.height};};
 const down=(event:ReactPointerEvent<HTMLCanvasElement>)=>{event.currentTarget.setPointerCapture(event.pointerId);drawing.current=true;last.current=point(event);};
 const move=(event:ReactPointerEvent<HTMLCanvasElement>)=>{if(!drawing.current||!last.current)return;const p=point(event),ctx=context();if(ctx){ctx.beginPath();ctx.strokeStyle=eraser?"#ffffff":"#164c84";ctx.lineWidth=eraser?25:3;ctx.lineCap="round";ctx.lineJoin="round";ctx.moveTo(last.current.x,last.current.y);ctx.lineTo(p.x,p.y);ctx.stroke();}last.current=p;};
 const stop=()=>{drawing.current=false;last.current=null;};
 const clear=()=>{const ctx=context();if(ctx){ctx.fillStyle="#ffffff";ctx.fillRect(0,0,900,420);}};
 useEffect(()=>{if(open)clear();},[open]);
 const save=()=>{const element=canvas.current;if(!element)return;const a=document.createElement("a");a.href=element.toDataURL("image/png");a.download=`module-${moduleNumber}-${section}-drawing.png`;a.click();};
 return <aside data-search-ignore style={{border:"1px solid #9bb4c9",borderRadius:14,padding:14,margin:"18px 0",background:"#f4f8fc",color:"#123b5a"}}>
 <form onSubmit={e=>{e.preventDefault();find();}} style={{display:"flex",flexWrap:"wrap",gap:8,alignItems:"center"}}>
 <label htmlFor="section-search" style={{fontWeight:700}}>{t.search}</label>
 <input id="section-search" value={query} onChange={e=>setQuery(e.target.value)} placeholder={t.placeholder} style={{flex:"1 1 170px",padding:10,border:"1px solid #789",borderRadius:8}}/>
 <button type="submit" style={{padding:10}}>{t.find}</button><button type="button" disabled={!matches} onClick={next} style={{padding:10}}>{t.next}</button>
 <span role="status">{matches? `${t.matches}: ${active+1}/${matches}`:query?t.none:""}</span>
 </form>
 <button type="button" onClick={()=>setOpen(v=>!v)} aria-expanded={open} style={{marginTop:12,padding:10}}>{open?t.close:t.draw}</button>
 {open&&<div style={{marginTop:12}}>
 <div style={{display:"flex",gap:8,flexWrap:"wrap",marginBottom:8}}><button type="button" aria-pressed={!eraser} onClick={()=>setEraser(false)}>{t.pen}</button><button type="button" aria-pressed={eraser} onClick={()=>setEraser(true)}>{t.eraser}</button><button type="button" onClick={clear}>{t.clear}</button><button type="button" onClick={save}>{t.save}</button></div>
 <canvas ref={canvas} width={900} height={420} aria-label={t.draw} onPointerDown={down} onPointerMove={move} onPointerUp={stop} onPointerCancel={stop} style={{display:"block",width:"100%",maxWidth:900,aspectRatio:"15 / 7",background:"white",border:"1px solid #8193a6",borderRadius:8,touchAction:"none",cursor:"crosshair"}}/>
 </div>}
 </aside>;
}
