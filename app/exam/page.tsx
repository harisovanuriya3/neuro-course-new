import Link from "next/link";
import { modules, type Language } from "../../content/course";
import { createExamBank } from "../../content/exam-bank";
import ExamCenter, { type ExamQuestion } from "../../components/ExamCenter";

type Props = { searchParams: Promise<{ lang?: string | string[] }> };

const copy: Record<Language, { title:string; intro:string; learning:string; exam:string; after:string; back:string }> = {
 RU:{title:"Экзаменационный центр",intro:"Проверьте, насколько вы понимаете основные механизмы курса и умеете применять их в новых ситуациях.",learning:"Учебный режим",exam:"Экзаменационный режим",after:"Сначала завершите попытку. После этого вы увидите ошибки, правильные ответы и объяснения.",back:"← К содержанию курса"},
 KZ:{title:"Емтихан орталығы",intro:"Курстың негізгі механизмдерін қаншалықты түсінетініңізді және оларды жаңа жағдайда қолдана алатыныңызды тексеріңіз.",learning:"Оқу режимі",exam:"Емтихан режимі",after:"Алдымен талпынысты аяқтаңыз. Содан кейін қателер, дұрыс жауаптар және түсіндірмелер көрсетіледі.",back:"← Курс мазмұнына"},
 EN:{title:"Exam Center",intro:"Check how well you understand the course mechanisms and can use them in new situations.",learning:"Learning mode",exam:"Exam mode",after:"Finish the attempt first. Then you will see errors, correct answers, and explanations.",back:"← Course contents"}
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
      <h2>{t.learning}</h2><p>{lang==="RU"?"Здесь можно учиться без риска: после ошибки вы получите объяснение и сможете повторить тему.":lang==="KZ"?"Мұнда қатеден қорықпай үйренуге болады: қатеден кейін түсіндірме алып, тақырыпты қайталай аласыз.":"Use this mode to learn without pressure: after an error, you get an explanation and can review the topic."}</p>
    </section>
    <section style={{border:"2px solid #86aac4",borderRadius:16,padding:22}}>
      <h2>{t.exam}</h2><p>{lang==="RU"?"Во время попытки подсказок нет. Вопросы выбираются случайно из банка по 25 блокам. Разбор появится после завершения.":lang==="KZ"?"Талпыныс кезінде кеңес болмайды. Сұрақтар 25 блоктың банкінен кездейсоқ таңдалады. Талдау аяқталғаннан кейін ашылады.":"There are no hints during the attempt. Questions are drawn randomly from all 25 blocks, and review appears after you finish."}</p>
      <p><strong>{t.after}</strong></p>
    </section>
   </div>
   <ExamCenter lang={lang} bank={bank}/>
   
 </main>
}
