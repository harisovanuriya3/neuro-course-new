"use client";

import {useEffect,useRef,useState} from "react";
import type {Language} from "../content/course";
import {recordOutcome} from "../lib/courseProgress";

const copy={
 RU:{title:"Нарисуйте схему",intro:"Можно рисовать мышкой или пальцем. Используйте рисунок, чтобы показать путь сигнала или связь между структурами.",clear:"Очистить",save:"Сохранить рисунок",saved:"Рисунок сохранён в этом браузере.",hint:"Подпишите ключевые звенья и соедините их стрелками."},
 EN:{title:"Draw the pathway",intro:"Draw with a mouse or finger. Use the sketch to show signal flow or links between structures.",clear:"Clear",save:"Save drawing",saved:"Drawing saved in this browser.",hint:"Label the key parts and connect them with arrows."},
 KZ:{title:"Сызбаны салыңыз",intro:"Тінтуірмен немесе саусақпен салыңыз. Сигнал жолын немесе құрылымдар байланысын көрсету үшін қолданыңыз.",clear:"Тазалау",save:"Сызбаны сақтау",saved:"Сызба осы браузерде сақталды.",hint:"Негізгі буындарды белгілеп, оларды жебелермен қосыңыз."}
} as const;

export default function SketchPad({language,storageKey,moduleId}:{language:Language;storageKey:string;moduleId?:number}){
 const t=copy[language]; const ref=useRef<HTMLCanvasElement>(null); const drawing=useRef(false); const [saved,setSaved]=useState(false);
 useEffect(()=>{const c=ref.current;if(!c)return;const ctx=c.getContext("2d");if(!ctx)return;ctx.lineWidth=3;ctx.lineCap="round";const v=localStorage.getItem(storageKey);if(v){const img=new Image();img.onload=()=>ctx.drawImage(img,0,0,c.width,c.height);img.src=v}},[storageKey]);
 function pos(e:React.PointerEvent<HTMLCanvasElement>){const c=e.currentTarget,r=c.getBoundingClientRect();return{x:(e.clientX-r.left)*c.width/r.width,y:(e.clientY-r.top)*c.height/r.height}}
 function down(e:React.PointerEvent<HTMLCanvasElement>){drawing.current=true;const p=pos(e);const ctx=e.currentTarget.getContext("2d");ctx?.beginPath();ctx?.moveTo(p.x,p.y);e.currentTarget.setPointerCapture(e.pointerId)}
 function move(e:React.PointerEvent<HTMLCanvasElement>){if(!drawing.current)return;const p=pos(e),ctx=e.currentTarget.getContext("2d");ctx?.lineTo(p.x,p.y);ctx?.stroke()}
 function up(){drawing.current=false}
 function clear(){const c=ref.current;if(!c)return;c.getContext("2d")?.clearRect(0,0,c.width,c.height);localStorage.removeItem(storageKey);setSaved(false)}
 function save(){const c=ref.current;if(!c)return;localStorage.setItem(storageKey,c.toDataURL("image/png"));setSaved(true);if(moduleId)recordOutcome(moduleId,"criterion:application:sketch",1,1)}
 return <section style={{margin:"20px 0",padding:16,border:"1px solid #d6e3eb",borderRadius:14,background:"#fff"}}>
  <h3>{t.title}</h3><p>{t.intro}</p><p><small>{t.hint}</small></p>
  <canvas ref={ref} width={900} height={460} onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} style={{width:"100%",maxWidth:900,height:"auto",aspectRatio:"900/460",border:"1px solid #b9cbd6",borderRadius:12,touchAction:"none",background:"#fff"}}/>
  <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:10}}><button type="button" onClick={clear}>{t.clear}</button><button type="button" onClick={save}>{t.save}</button></div>
  {saved&&<p role="status">{t.saved}</p>}
 </section>
}
