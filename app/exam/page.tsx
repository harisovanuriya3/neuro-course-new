import Link from "next/link";
import { modules, type Language } from "../../content/course";
import { createExamBank } from "../../content/exam-bank";
import ExamCenter, { type ExamQuestion } from "../../components/ExamCenter";

type Props = { searchParams: Promise<{ lang?: string | string[] }> };

const copy: Record<Language, { title:string; intro:string; learning:string; exam:string; after:string; back:string }> = {
 RU:{title:"Экзаменационный центр",intro:"Итоговая проверка знаний по курсу нейрофизиологии.",learning:"Учебный режим",exam:"Экзаменационный режим",after:"Разбор ошибок и объяснения доступны только после завершения попытки.",back:"← К содержанию курса"},
 KZ:{title:"Емтихан орталығы",intro:"Нейрофизиология курсы бойынша қорытынды білімді тексеру.",learning:"Оқу режимі",exam:"Емтихан режимі",after:"Қателерді талдау мен түсіндірмелер талпыныс аяқталғаннан кейін ғана қолжетімді.",back:"← Курс мазмұнына"},
 EN:{title:"Exam Center",intro:"Summative knowledge check for the neurophysiology course.",learning:"Learning mode",exam:"Exam mode",after:"Error review and explanations become available only after the attempt is completed.",back:"← Course contents"}
};

export default async function ExamPage({searchParams}:Props){
 const p=await searchParams; const raw=Array.isArray(p.lang)?p.lang[0]:p.lang;
 const lang:Language=raw==="EN"||raw==="KZ"?raw:"RU"; const t=copy[lang];
 const bank=createExamBank(lang);
 return <main style={{maxWidth:1100,margin:"0 auto",padding:"40px 24px",fontFamily:"system-ui"}}>
   <Link href={`/?lang=${lang}`}>{t.back}</Link>
   <h1>{t.title}</h1><p>{t.intro}</p>
   <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:18,marginTop:28}}>
    <section style={{border:"1px solid #ccd9e3",borderRadius:16,padding:22}}>
      <h2>{t.learning}</h2><p>{lang==="RU"?"Подсказки, возврат к теории и повтор ошибок остаются в обучающих тестах каждого блока.":lang==="KZ"?"Кеңестер, теорияға оралу және қателерді қайталау әр блоктың оқу тесттерінде қалады.":"Hints, theory review, and error retry remain in each block's learning tests."}</p>
    </section>
    <section style={{border:"2px solid #86aac4",borderRadius:16,padding:22}}>
      <h2>{t.exam}</h2><p>{lang==="RU"?"Без подсказок, объяснений и переходов к теории во время попытки. Экзамен охватывает все 25 блоков.":lang==="KZ"?"Талпыныс кезінде кеңестер, түсіндірмелер және теорияға өту жоқ. Емтихан 25 блоктың барлығын қамтиды.":"No hints, explanations, or theory links during the attempt. The exam covers all 25 blocks."}</p>
      <p><strong>{t.after}</strong></p>
    </section>
   </div>
   <ExamCenter lang={lang} bank={bank}/>
   
 </main>
}