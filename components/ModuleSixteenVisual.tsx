import Link from "next/link";
import AdvancedAnatomyReference from "./AdvancedAnatomyReference";
import type { Language } from "../content/course";

const copy = {
 RU:{title:"Лимбическая система: анатомия и функции",intro:"Анатомическая реконструкция лимбических структур с указанием источника и лицензии. Иллюстрация — учебный материал, а не индивидуальное МРТ пациента.",theory:"Теория",practice:"Практические занятия",cases:"Клинические задачи",tests:"Тесты",lab:"Лаборатория мотивации",caption:"Ключевые функциональные связи",areas:["Миндалина — оценка биологической значимости и ассоциативное обучение","Гиппокамп — эпизодическая память и контекст","Поясная и префронтальная кора — когнитивный контроль и оценка действий","Гипоталамус и ствол — вегетативные и эндокринные компоненты реакции"],warning:"Функции распределены по сетям: ни одна структура не является единственным «центром эмоций»."},
 EN:{title:"Limbic system: anatomy and function",intro:"An anatomical reconstruction of limbic structures with source and licence. This is teaching material, not a patient's MRI.",theory:"Theory",practice:"Practical activities",cases:"Clinical cases",tests:"Tests",lab:"Motivation laboratory",caption:"Key functional connections",areas:["Amygdala — salience and associative learning","Hippocampus — episodic memory and context","Cingulate and prefrontal cortex — cognitive control and action evaluation","Hypothalamus and brainstem — autonomic and endocrine response components"],warning:"Functions emerge from distributed networks; no structure is the sole emotion center."},
 KZ:{title:"Лимбиялық жүйе: анатомия және қызметі",intro:"Дереккөзі мен лицензиясы көрсетілген лимбиялық құрылымдардың анатомиялық реконструкциясы. Бұл жеке науқастың МРТ-сі емес, оқу материалы.",theory:"Теория",practice:"Практикалық жұмыстар",cases:"Клиникалық есептер",tests:"Тесттер",lab:"Мотивация зертханасы",caption:"Негізгі функционалдық байланыстар",areas:["Амигдала — биологиялық маңыздылық және ассоциативтік үйрену","Гиппокамп — эпизодтық жад және контекст","Белдеулік және префронталдық қыртыс — когнитивтік бақылау","Гипоталамус пен ми бағаны — вегетативтік және эндокриндік жауаптар"],warning:"Қызметтер таралған желілер арқылы орындалады; бір ғана эмоция орталығы жоқ."}
};
export default function ModuleSixteenVisual({language}:{language:Language}) {
 const t=copy[language];
 const links=[["theory",t.theory],["practice",t.practice],["cases",t.cases],["tests",t.tests]];

 const cards = [
  {slug:"theory",label:t.theory,icon:"◉",detail:language==="RU"?"6 дополнительных тем":language==="EN"?"6 additional topics":"6 қосымша тақырып"},
  {slug:"practice",label:t.practice,icon:"⚗",detail:language==="RU"?"3 практикума":language==="EN"?"3 practical exercises":"3 практикалық жұмыс"},
  {slug:"cases",label:t.cases,icon:"✚",detail:language==="RU"?"5 клинических разборов":language==="EN"?"5 clinical cases":"5 клиникалық есеп"},
  {slug:"tests",label:t.tests,icon:"✓",detail:language==="RU"?"Проверка знаний":language==="EN"?"Knowledge checks":"Білімді тексеру"}
 ];
 return <section aria-label={t.title} style={{background:"#101c3a",color:"#f8faff",borderRadius:20,padding:"clamp(16px,3vw,28px)",marginBottom:24,boxShadow:"0 12px 30px rgba(12,24,55,.18)"}}>
  <header style={{display:"flex",flexWrap:"wrap",justifyContent:"space-between",alignItems:"center",gap:14,borderBottom:"1px solid #465477",paddingBottom:14}}>
   <div><p style={{margin:0,color:"#c4adff",fontWeight:700}}>{language==="RU"?"МОДУЛЬ 16":language==="EN"?"MODULE 16":"16-МОДУЛЬ"}</p><h2 style={{fontSize:"clamp(23px,3vw,34px)",margin:"6px 0"}}>{t.title}</h2></div>
   <Link href={`/module-16-lab?lang=${language}`} style={{background:"#7047d9",color:"#fff",padding:"12px 16px",borderRadius:12,textDecoration:"none",fontWeight:700}}>{t.lab}</Link>
  </header>
  <nav aria-label={t.title} style={{display:"flex",flexWrap:"wrap",gap:9,margin:"18px 0"}}>
   {links.map(([slug,label])=><Link key={slug} href={`/modules/16/${slug}?lang=${language}`} style={{padding:"9px 14px",borderRadius:11,background:"#25365c",border:"1px solid #58698e",color:"#fff",textDecoration:"none"}}>{label}</Link>)}
  </nav>
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,300px),1fr))",gap:16}}>
   <div style={{background:"#fff",color:"#162746",borderRadius:16,padding:14,minWidth:0}}>
    <h3 style={{margin:"0 0 10px"}}>{language==="RU"?"Анатомия лимбической системы":language==="EN"?"Limbic system anatomy":"Лимбиялық жүйе анатомиясы"}</h3>
    <AdvancedAnatomyReference moduleId={16} language={language}/>
   </div>
   <div style={{background:"#1d2c52",border:"1px solid #58698e",borderRadius:16,padding:18}}>
    <h3 style={{marginTop:0,color:"#d8c9ff"}}>{t.caption}</h3>
    <ul style={{paddingLeft:22}}>{t.areas.map(a=><li key={a} style={{marginBottom:14}}>{a}</li>)}</ul>
    <p style={{fontSize:14,color:"#cbd5eb"}}>{t.warning}</p>
   </div>
  </div>
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(min(100%,190px),1fr))",gap:12,marginTop:18}}>
   {cards.map(card=><Link key={card.slug} href={`/modules/16/${card.slug}?lang=${language}`} style={{display:"block",background:"#243457",border:"1px solid #58698e",borderRadius:14,padding:18,textDecoration:"none",color:"#fff"}}>
    <span aria-hidden="true" style={{fontSize:26,color:"#c7b0ff"}}>{card.icon}</span><h3 style={{margin:"8px 0 4px",fontSize:17}}>{card.label}</h3><p style={{margin:0,color:"#cbd5eb",fontSize:14}}>{card.detail}</p>
   </Link>)}
   <Link href={`/module-16-lab?lang=${language}`} style={{display:"block",background:"#51348d",border:"1px solid #9879d4",borderRadius:14,padding:18,textDecoration:"none",color:"#fff"}}>
    <span aria-hidden="true" style={{fontSize:26}}>⚗</span><h3 style={{margin:"8px 0 4px",fontSize:17}}>{t.lab}</h3><p style={{margin:0,color:"#e0d7f8",fontSize:14}}>{language==="RU"?"Интерактивная модель подкрепления":language==="EN"?"Interactive reinforcement model":"Интерактивті нығайту моделі"}</p>
   </Link>
  </div>
  <p style={{fontSize:13,color:"#cbd5eb",marginBottom:0,marginTop:18}}>{t.intro}</p>
 </section>;
}
