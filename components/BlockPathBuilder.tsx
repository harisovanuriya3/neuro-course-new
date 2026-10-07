"use client";

import {useMemo,useState} from "react";
import type {Language} from "../content/course";

export type BuilderItem={id:string;labels:Record<Language,string>};
const copy={RU:{title:"Соберите схему",intro:"Нажимайте на блоки в правильном порядке. Можно отменить последний шаг и начать заново.",undo:"Отменить",reset:"Сначала",check:"Проверить",good:"Схема собрана правильно.",bad:"Порядок пока неверный. Сравните, куда должен идти сигнал дальше."},EN:{title:"Build the pathway",intro:"Tap the blocks in the correct order. You can undo the last step or reset.",undo:"Undo",reset:"Reset",check:"Check",good:"The pathway is correct.",bad:"The order is not correct yet. Think about where the signal should go next."},KZ:{title:"Сызбаны құрастырыңыз",intro:"Блоктарды дұрыс ретпен басыңыз. Соңғы қадамды болдырмауға немесе қайта бастауға болады.",undo:"Болдырмау",reset:"Басынан",check:"Тексеру",good:"Сызба дұрыс құрастырылды.",bad:"Рет әлі дұрыс емес. Сигнал әрі қарай қайда баруы керек екенін ойлаңыз."}} as const;

export default function BlockPathBuilder({language,items,correctOrder}:{language:Language;items:BuilderItem[];correctOrder:string[]}){
 const t=copy[language]; const [order,setOrder]=useState<string[]>([]),[checked,setChecked]=useState(false);
 const remaining=useMemo(()=>items.filter(i=>!order.includes(i.id)),[items,order]);
 const good=checked&&order.length===correctOrder.length&&order.every((id,i)=>id===correctOrder[i]);
 return <section style={{margin:"20px 0",padding:16,border:"1px solid #d6e3eb",borderRadius:14,background:"#fff"}}>
  <h3>{t.title}</h3><p>{t.intro}</p>
  <div style={{minHeight:64,padding:10,border:"1px dashed #9fb7c5",borderRadius:12,display:"flex",gap:8,flexWrap:"wrap",alignItems:"center"}}>
   {order.map((id,i)=>{const item=items.find(x=>x.id===id)!;return <span key={id} style={{padding:"8px 10px",borderRadius:10,background:"#eef6fa"}}>{i+1}. {item.labels[language]}</span>})}
  </div>
  <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:10}}>{remaining.map(item=><button key={item.id} type="button" onClick={()=>{setOrder(v=>[...v,item.id]);setChecked(false)}}>{item.labels[language]}</button>)}</div>
  <div style={{display:"flex",gap:8,flexWrap:"wrap",marginTop:10}}><button type="button" disabled={!order.length} onClick={()=>{setOrder(v=>v.slice(0,-1));setChecked(false)}}>{t.undo}</button><button type="button" disabled={!order.length} onClick={()=>{setOrder([]);setChecked(false)}}>{t.reset}</button><button type="button" disabled={order.length!==correctOrder.length} onClick={()=>setChecked(true)}>{t.check}</button></div>
  {checked&&<p role="status"><strong>{good?t.good:t.bad}</strong></p>}
 </section>
}
