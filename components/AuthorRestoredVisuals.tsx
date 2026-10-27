import type { Language } from "../content/course";

/** Original author-supplied illustrations restored from the October 2026 image archive. */
export default function AuthorRestoredVisuals({moduleId,language}:{moduleId:number;language:Language}){
 if(moduleId<1||moduleId>10)return null;
 const title=language==="RU"?"Иллюстрация из авторского набора":language==="EN"?"Illustration from the author's collection":"Авторлық жинақтан иллюстрация";
 const atlas=language==="RU"?"Нейроатлас":language==="EN"?"Neuroanatomy atlas":"Нейроатлас";
 const suffix=language.toLowerCase();
 return <section aria-label={title} style={{margin:"22px 0",padding:18,border:"1px solid #cee0e9",borderRadius:14,background:"#f7fbfe"}}>
   <h2 style={{fontSize:"1.16rem",margin:"0 0 10px",color:"#075078"}}>{title}</h2>
   <img src={`/images/neuro-modules/module-${String(moduleId).padStart(2,"0")}.webp`} alt={`${title} — ${moduleId}`} loading="lazy" style={{display:"block",width:"100%",maxHeight:460,objectFit:"contain",borderRadius:10,background:"#e9f3f7"}}/>
   {moduleId===1&&<div style={{marginTop:18}}><h3 style={{fontSize:"1rem",margin:"0 0 8px"}}>{atlas}</h3><img src={`/images/neuro-atlas-${suffix}.png`} alt={atlas} loading="lazy" style={{display:"block",width:"100%",maxHeight:560,objectFit:"contain",borderRadius:10}}/></div>}
 </section>
}
