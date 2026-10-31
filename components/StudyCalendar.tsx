"use client";
import { useEffect, useState } from "react";

type Language = "RU" | "EN" | "KZ";
const labels = {
 RU: {title:"Учебный календарь",today:"Сегодня",previous:"Предыдущий месяц",next:"Следующий месяц",note:"План занятия или задание",save:"Сохранить",clear:"Удалить запись",saved:"Запись сохранена в этом браузере",hint:"Заметки сохраняются только в этом браузере. Для резервной копии используйте экспорт.",export:"Экспорт записей",back:"К учебнику"},
 EN: {title:"Study calendar",today:"Today",previous:"Previous month",next:"Next month",note:"Study plan or assignment",save:"Save",clear:"Delete entry",saved:"Saved in this browser",hint:"Notes stay in this browser only. Export a backup.",export:"Export entries",back:"Back to course"},
 KZ: {title:"Оқу күнтізбесі",today:"Бүгін",previous:"Алдыңғы ай",next:"Келесі ай",note:"Сабақ жоспары немесе тапсырма",save:"Сақтау",clear:"Жазбаны жою",saved:"Жазба осы браузерде сақталды",hint:"Жазбалар тек осы браузерде сақталады. Сақтық көшірмені экспорттаңыз.",export:"Жазбаларды экспорттау",back:"Оқулыққа оралу"}
};
const key = "neuro-course-study-calendar-v1";
const iso = (date:Date) => [date.getFullYear(),String(date.getMonth()+1).padStart(2,"0"),String(date.getDate()).padStart(2,"0")].join("-");
export default function StudyCalendar({language}:{language:Language}) {
 const t=labels[language];
 const [selected,setSelected]=useState(()=>iso(new Date()));
 const [month,setMonth]=useState(()=>new Date(new Date().getFullYear(),new Date().getMonth(),1));
 const [entries,setEntries]=useState<Record<string,string>>({});
 const [draft,setDraft]=useState("");
 const [ready,setReady]=useState(false);
 const [status,setStatus]=useState("");
 useEffect(()=>{try{const parsed=JSON.parse(localStorage.getItem(key)||"{}");if(parsed&&typeof parsed==="object"&&!Array.isArray(parsed))setEntries(parsed);}catch{}setReady(true);},[]);
 useEffect(()=>{if(ready){try{localStorage.setItem(key,JSON.stringify(entries));}catch{}}},[entries,ready]);
 useEffect(()=>{setDraft(entries[selected]||"");setStatus("");},[selected,entries]);
 const offset=(new Date(month.getFullYear(),month.getMonth(),1).getDay()+6)%7;
 const count=new Date(month.getFullYear(),month.getMonth()+1,0).getDate();
 const days=Array.from({length:offset+count},(_,i)=>i<offset?null:i-offset+1);
 const locale=language==="KZ"?"kk-KZ":language==="EN"?"en-GB":"ru-RU";
 const weekdays=Array.from({length:7},(_,i)=>new Intl.DateTimeFormat(locale,{weekday:"short"}).format(new Date(2024,0,1+i)));
 const button:React.CSSProperties={border:"1px solid #b3cadb",borderRadius:9,padding:"10px 12px",background:"#fff",color:"#164a72",cursor:"pointer"};
 function save(){setEntries(prev=>({...prev,[selected]:draft.slice(0,2000)}));setStatus(t.saved);}
 function remove(){setEntries(prev=>{const next={...prev};delete next[selected];return next;});setDraft("");setStatus("");}
 function exportEntries(){const blob=new Blob([JSON.stringify(entries,null,2)],{type:"application/json"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download="neuro-study-calendar.json";a.click();URL.revokeObjectURL(url);}
 return <main style={{maxWidth:800,margin:"0 auto",padding:"24px 16px 80px",fontFamily:"system-ui,sans-serif",color:"#174461"}}>
  <a href={`/?lang=${language}`} style={{color:"#005b96"}}>{t.back}</a>
  <h1>{t.title}</h1>
  <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",gap:8,flexWrap:"wrap"}}>
   <button type="button" style={button} aria-label={t.previous} onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()-1,1))}>‹</button>
   <strong>{new Intl.DateTimeFormat(locale,{month:"long",year:"numeric"}).format(month)}</strong>
   <button type="button" style={button} aria-label={t.next} onClick={()=>setMonth(new Date(month.getFullYear(),month.getMonth()+1,1))}>›</button>
   <button type="button" style={button} onClick={()=>{const d=new Date();setMonth(new Date(d.getFullYear(),d.getMonth(),1));setSelected(iso(d));}}>{t.today}</button>
  </div>
  <div style={{display:"grid",gridTemplateColumns:"repeat(7,minmax(0,1fr))",gap:5,marginTop:20}}>
   {weekdays.map((d,i)=><div key={i} style={{textAlign:"center",fontWeight:700,fontSize:13}}>{d}</div>)}
   {days.map((day,i)=>day===null?<div key={i}/>:<button key={i} type="button" aria-pressed={selected===iso(new Date(month.getFullYear(),month.getMonth(),day))} onClick={()=>setSelected(iso(new Date(month.getFullYear(),month.getMonth(),day)))} style={{...button,minHeight:55,padding:5,background:selected===iso(new Date(month.getFullYear(),month.getMonth(),day))?"#dceeff":"#fff",fontWeight:entries[iso(new Date(month.getFullYear(),month.getMonth(),day))]?800:400}}>{day}{entries[iso(new Date(month.getFullYear(),month.getMonth(),day))]?" •":""}</button>)}
  </div>
  <section style={{marginTop:24,padding:18,border:"1px solid #cbdde8",borderRadius:14}}>
   <h2 style={{fontSize:18}}>{selected}</h2>
   <label htmlFor="calendar-note">{t.note}</label>
   <textarea id="calendar-note" value={draft} onChange={e=>setDraft(e.target.value)} maxLength={2000} rows={5} style={{display:"block",boxSizing:"border-box",width:"100%",margin:"8px 0 14px",padding:12,border:"1px solid #a8c4d5",borderRadius:9}}/>
   <div style={{display:"flex",gap:8,flexWrap:"wrap"}}><button type="button" style={button} onClick={save}>{t.save}</button><button type="button" style={button} onClick={remove}>{t.clear}</button><button type="button" style={button} onClick={exportEntries}>{t.export}</button></div>
   <p role="status">{status}</p><p style={{fontSize:13,color:"#536e80"}}>{t.hint}</p>
  </section>
 </main>;
}
