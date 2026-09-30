import Link from "next/link";
import { modules, type Language } from "../../content/course";

type Props = { searchParams: Promise<{ lang?: string | string[] }> };

const copy: Record<Language, { title:string; intro:string; learning:string; exam:string; after:string; back:string }> = {
  RU:{title:"Экзаменационный центр",intro:"Итоговая проверка знаний по курсу нейрофизиологии.",learning:"Учебный режим",exam:"Экзаменационный режим",after:"Разбор ошибок и рекомендации доступны после завершения попытки.",back:"← К содержанию курса"},
  KZ:{title:"Емтихан орталығы",intro:"Нейрофизиология курсы бойынша қорытынды білімді тексеру.",learning:"Оқу режимі",exam:"Емтихан режимі",after:"Қателерді талдау және ұсыныстар талпыныс аяқталғаннан кейін қолжетімді.",back:"← Курс мазмұнына"},
  EN:{title:"Exam Center",intro:"Summative knowledge check for the neurophysiology course.",learning:"Learning mode",exam:"Exam mode",after:"Error review and recommendations become available after the attempt is completed.",back:"← Course contents"}
};

export default async function ExamPage({searchParams}:Props){
 const p=await searchParams; const raw=Array.isArray(p.lang)?p.lang[0]:p.lang;
 const lang:Language=raw==="EN"||raw==="KZ"?raw:"RU"; const t=copy[lang];
 return <main style={{maxWidth:1100,margin:"0 auto",padding:"40px 24px",fontFamily:"system-ui"}}>
   <Link href={`/?lang=${lang}`}>{t.back}</Link>
   <h1>{t.title}</h1><p>{t.intro}</p>
   <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:18,marginTop:28}}>
    <section style={{border:"1px solid #ccd9e3",borderRadius:16,padding:22}}>
      <h2>{t.learning}</h2><p>{lang==="RU"?"Подсказки, возврат к теории и повтор ошибок доступны в тестах каждого модуля.":lang==="KZ"?"Кеңестер, теорияға оралу және қателерді қайталау әр модуль тестінде қолжетімді.":"Hints, theory review, and error retry remain available in each module."}</p>
    </section>
    <section style={{border:"2px solid #86aac4",borderRadius:16,padding:22}}>
      <h2>{t.exam}</h2><p>{lang==="RU"?"Без подсказок и переходов к теории во время попытки. Вопросы будут выбираться из всех 25 модулей и включать клинические виньетки, графики и интерпретацию процессов.":lang==="KZ"?"Талпыныс кезінде кеңестер мен теорияға өту жоқ. Сұрақтар 25 модульдің барлығынан алынып, клиникалық жағдайлар, графиктер және үдерістерді түсіндіруді қамтиды.":"No hints or theory links during the attempt. Questions will span all 25 modules and include clinical vignettes, graphs, and process interpretation."}</p>
      <p><strong>{t.after}</strong></p>
    </section>
   </div>
   <h2 style={{marginTop:32}}>{lang==="RU"?"Охват курса":lang==="KZ"?"Курс қамтуы":"Course coverage"}</h2>
   <ol>{modules[lang].map((m,i)=><li key={i} style={{marginBottom:6}}>{m}</li>)}</ol>
 </main>
}