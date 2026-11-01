"use client";
import {useEffect,useState} from "react";
type Lang="RU"|"EN"|"KZ";
const copy={
RU:{title:"Виртуальная лаборатория корковой локализации",intro:"Учебная модель, не диагностический инструмент.",region:"Область коры",lesion:"Сторона поражения",left:"Левая",right:"Правая",motor:"Первичная моторная",sensory:"Первичная соматосенсорная",visual:"Зрительная",language:"Речевые сети",executive:"Префронтальные сети",outcome:"Ожидаемый учебный эффект",note:"Локализация симптомов зависит от точного очага, связей, доминантности и клинического контекста.",back:"Модуль 18"},
EN:{title:"Cortical localization virtual laboratory",intro:"Teaching model, not a diagnostic tool.",region:"Cortical region",lesion:"Lesion side",left:"Left",right:"Right",motor:"Primary motor",sensory:"Primary somatosensory",visual:"Visual",language:"Language networks",executive:"Prefrontal networks",outcome:"Expected teaching effect",note:"Deficits depend on lesion extent, connectivity, dominance and clinical context.",back:"Module 18"},
KZ:{title:"Қыртыстық локализация виртуалды зертханасы",intro:"Оқу моделі, диагностикалық құрал емес.",region:"Қыртыс аймағы",lesion:"Зақым жағы",left:"Сол",right:"Оң",motor:"Алғашқы қозғалтқыш",sensory:"Алғашқы соматосенсорлық",visual:"Көру",language:"Сөйлеу желілері",executive:"Префронталдық желілер",outcome:"Күтілетін оқу нәтижесі",note:"Белгілер ошақтың көлеміне, байланыстарға, доминанттылыққа және клиникалық контекстке тәуелді.",back:"18-модуль"}
};
const results={
motor:["Возможна слабость противоположных конечностей.","Contralateral limb weakness may occur.","Қарама-қарсы аяқ-қол әлсіздігі болуы мүмкін."],
sensory:["Возможны нарушения противоположной соматосенсорной чувствительности.","Contralateral somatosensory deficits may occur.","Қарама-қарсы соматосенсорлық бұзылыстар болуы мүмкін."],
visual:["Возможны контралатеральные дефекты поля зрения при соответствующем поражении.","Contralateral visual-field defects may occur with an appropriate lesion.","Сәйкес зақымда қарама-қарсы көру өрісінің ақаулары болуы мүмкін."],
language:["При поражении доминантных речевых сетей возможна афазия; доминантность индивидуальна.","Aphasia may follow damage to dominant language networks; dominance varies.","Доминантты сөйлеу желілері зақымданса афазия болуы мүмкін; доминанттылық әртүрлі."],
executive:["Возможны нарушения планирования, рабочей памяти и переключения.","Planning, working memory and switching may be impaired.","Жоспарлау, жұмыс жадысы және ауысу бұзылуы мүмкін."]
};
export default function CortexLab(){
 const [lang,setLang]=useState<Lang>("RU"),[region,setRegion]=useState<keyof typeof results>("motor"),[side,setSide]=useState<"left"|"right">("left");
 useEffect(()=>{const value=new URLSearchParams(window.location.search).get("lang");if(value==="RU"||value==="EN"||value==="KZ")setLang(value)},[]);
 const t=copy[lang],i=lang==="RU"?0:lang==="EN"?1:2;
 return <main style={{maxWidth:800,margin:"auto",padding:"24px 16px",fontFamily:"system-ui",lineHeight:1.6}}>
 <nav>{(["RU","EN","KZ"] as const).map(l=><button key={l} onClick={()=>setLang(l)} aria-pressed={lang===l} style={{padding:10,marginRight:8}}>{l}</button>)}</nav>
 <h1>{t.title}</h1><p>{t.intro}</p>
 <label style={{display:"block",margin:"16px 0"}}>{t.region}: <select value={region} onChange={e=>setRegion(e.target.value as keyof typeof results)} style={{padding:8}}>{(["motor","sensory","visual","language","executive"] as const).map(k=><option key={k} value={k}>{t[k]}</option>)}</select></label>
 <fieldset style={{border:"1px solid #94a3b8",borderRadius:12}}><legend>{t.lesion}</legend>{(["left","right"] as const).map(k=><label key={k} style={{marginRight:18}}><input type="radio" checked={side===k} onChange={()=>setSide(k)}/> {t[k]}</label>)}</fieldset>
 <section aria-live="polite" style={{marginTop:18,padding:20,background:"#eef2ff",color:"#172554",borderRadius:14}}><h2>{t.outcome}</h2><p>{results[region][i]}</p><p>{t.lesion}: {t[side]}</p></section>
 <p>{t.note}</p><a href={`/modules/18?lang=${lang}`}>{t.back}</a>
 </main>;
}
