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
 return <section aria-label={t.title} style={{border:"1px solid #c5c4eb",borderRadius:20,background:"linear-gradient(135deg,#f3f0ff,#e7f3ff)",padding:20,marginBottom:24,color:"#1c2751"}}>
 <h2 style={{marginTop:0}}>{t.title}</h2><p>{t.intro}</p>
 <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",gap:20,alignItems:"start"}}>
 <div style={{background:"#fff",padding:12,borderRadius:14}}><AdvancedAnatomyReference moduleId={16} language={language}/></div>
 <div><h3>{t.caption}</h3><ul>{t.areas.map(a=><li key={a} style={{marginBottom:10}}>{a}</li>)}</ul><p>{t.warning}</p></div>
 </div>
 <nav aria-label={t.title} style={{display:"flex",gap:10,flexWrap:"wrap",marginTop:18}}>{links.map(([slug,label])=><Link key={slug} href={`/modules/16/${slug}?lang=${language}`} style={{padding:"9px 14px",borderRadius:10,background:"#fff",border:"1px solid #a9b8e2",color:"#1e3975",textDecoration:"none"}}>{label}</Link>)}<Link href={`/module-16-lab?lang=${language}`} style={{padding:"9px 14px",borderRadius:10,background:"#312e81",color:"#fff",textDecoration:"none"}}>{t.lab}</Link></nav>
 </section>;
}
