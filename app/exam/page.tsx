import Link from "next/link";
import { modules, type Language } from "../../content/course";
import { topics, termDefinitions } from "../../content/course-foundation/topics";
import ExamCenter, { type ExamQuestion } from "../../components/ExamCenter";

type Props = { searchParams: Promise<{ lang?: string | string[] }> };

const copy: Record<Language, { title:string; intro:string; learning:string; exam:string; after:string; back:string }> = {
 RU:{title:"Экзаменационный центр",intro:"Итоговая проверка знаний по курсу нейрофизиологии.",learning:"Учебный режим",exam:"Экзаменационный режим",after:"Разбор ошибок и объяснения доступны только после завершения попытки.",back:"← К содержанию курса"},
 KZ:{title:"Емтихан орталығы",intro:"Нейрофизиология курсы бойынша қорытынды білімді тексеру.",learning:"Оқу режимі",exam:"Емтихан режимі",after:"Қателерді талдау мен түсіндірмелер талпыныс аяқталғаннан кейін ғана қолжетімді.",back:"← Курс мазмұнына"},
 EN:{title:"Exam Center",intro:"Summative knowledge check for the neurophysiology course.",learning:"Learning mode",exam:"Exam mode",after:"Error review and explanations become available only after the attempt is completed.",back:"← Course contents"}
};

function examOnlyBank(lang:Language):ExamQuestion[]{
 const generic = {
  RU:{apply:"Какое утверждение лучше всего применяет физиологический принцип к новой ситуации?", limit:"Какой вывод наиболее корректен при интерпретации нового наблюдения?", w1:"Одного изменённого признака достаточно для окончательного диагноза.",w2:"Контекст и состояние системы не влияют на физиологический ответ.",w3:"Любое отклонение означает полное выключение изучаемой системы."},
  EN:{apply:"Which statement best applies the physiological principle to a new situation?",limit:"Which conclusion is most appropriate when interpreting a new observation?",w1:"One altered finding is sufficient for a definitive diagnosis.",w2:"Context and system state do not affect the physiological response.",w3:"Any deviation means complete failure of the system."},
  KZ:{apply:"Физиологиялық қағиданы жаңа жағдайға қай тұжырым дұрыс қолданады?",limit:"Жаңа бақылауды түсіндіруде қай қорытынды ең орынды?",w1:"Бір өзгерген белгі түпкілікті диагнозға жеткілікті.",w2:"Контекст пен жүйе күйі физиологиялық жауапқа әсер етпейді.",w3:"Кез келген ауытқу зерттелетін жүйенің толық істен шығуын білдіреді."}
 }[lang];
 const bank:ExamQuestion[]=[];
 // Module 1 uses exam-only integrative items; these are intentionally separate from its adaptive learning test.
 const m1=modules[lang][0];
 const m1items = lang==="RU" ? [
  ["При сохранной передаче сенсорного сигнала нарушена его центральная интеграция. Какое последствие наиболее ожидаемо?",["Сигнал может достигать ЦНС, но организованный ответ станет менее адекватным контексту.","Любой афферентный сигнал автоматически создаст нормальный ответ.","Нарушение интеграции всегда прекращает проведение по периферическому нерву.","Рецептор становится эффектором."],"a","Проведение входа и центральная интеграция — разные этапы; сохранность одного не гарантирует полноценный организованный ответ."],
  ["Исследователь хочет отличить нарушение входящей информации от нарушения исполнительного ответа. Какой подход наиболее информативен?",["Отдельно проверить афферентное звено, центральную обработку и эфферентно-эффекторное звено.","Оценить только наличие движения.","Считать отсутствие ответа доказательством повреждения рецептора.","Проверить только анатомическое название нерва."],"a","Разделение функциональной цепи на вход, интеграцию и выход позволяет локализовать нарушенное звено без преждевременного вывода."]
 ] : lang==="EN" ? [
  ["Sensory transmission is preserved but central integration is impaired. Which consequence is most expected?",["The signal may reach the CNS, while the organized response becomes less appropriate to context.","Any afferent signal automatically produces a normal response.","Impaired integration always stops conduction in a peripheral nerve.","A receptor becomes an effector."],"a","Input conduction and central integration are distinct stages; preservation of one does not guarantee an appropriate organized response."],
  ["A researcher wants to distinguish impaired sensory input from impaired execution. Which approach is most informative?",["Assess the afferent link, central processing, and efferent-effector link separately.","Assess only whether movement occurs.","Treat absence of a response as proof of receptor damage.","Check only the anatomical name of the nerve."],"a","Separating input, integration, and output helps localize the affected functional link without a premature conclusion."]
 ] : [
  ["Сенсорлық сигналдың берілуі сақталған, бірақ орталық интеграция бұзылған. Қай салдар көбірек күтіледі?",["Сигнал ОЖЖ-ге жетуі мүмкін, бірақ ұйымдасқан жауап контекстке азырақ сәйкес болады.","Кез келген афференттік сигнал автоматты түрде қалыпты жауап туғызады.","Интеграция бұзылса, шеткі жүйкедегі өткізу әрқашан тоқтайды.","Рецептор эффекторға айналады."],"a","Кірісті өткізу мен орталық интеграция — бөлек кезеңдер; біреуінің сақталуы толыққанды жауапқа кепіл болмайды."],
  ["Зерттеуші сенсорлық кіріс бұзылысын атқарушы жауап бұзылысынан ажыратқысы келеді. Қай тәсіл ең ақпаратты?",["Афференттік буынды, орталық өңдеуді және эфференттік-эффекторлық буынды бөлек тексеру.","Тек қозғалыстың бар-жоғын бағалау.","Жауаптың болмауын рецептор зақымының дәлелі деп санау.","Тек жүйкенің анатомиялық атауын тексеру."],"a","Кіріс, интеграция және шығыс буындарын бөлек бағалау бұзылған деңгейді ерте қорытындысыз анықтауға көмектеседі."]
 ];
 m1items.forEach((x,i)=>bank.push({id:`exam-m1-${i+1}`,moduleId:1,moduleTitle:m1,prompt:x[0] as string,options:(x[1] as string[]).map((text,j)=>({id:"abcd"[j],text})),correctAnswer:x[2] as string,explanation:x[3] as string}));
 for(const topic of topics){
  const defs=termDefinitions[topic.id]; if(!defs) continue;
  const title=modules[lang][topic.id-1], termA=topic.terms[0][lang], termB=topic.terms[1][lang], defA=defs[0][lang], defB=defs[1][lang];
  bank.push({id:`exam-m${topic.id}-concept`,moduleId:topic.id,moduleTitle:title,
   prompt:`${generic.apply} «${termA}» и «${termB}».`,
   options:[
    {id:"a",text:`${termA}: ${defA} ${termB}: ${defB}`},
    {id:"b",text:`${termA}: ${defB} ${termB}: ${defA}`},
    {id:"c",text:generic.w2},{id:"d",text:generic.w3}],
   correctAnswer:"a",explanation:`${termA}: ${defA} ${termB}: ${defB}`});
  bank.push({id:`exam-m${topic.id}-interpret`,moduleId:topic.id,moduleTitle:title,prompt:generic.limit,
   options:[{id:"a",text:topic.interpretation[lang]},{id:"b",text:generic.w1},{id:"c",text:generic.w2},{id:"d",text:generic.w3}],
   correctAnswer:"a",explanation:topic.interpretation[lang]});
 }
 return bank;
}
export default async function ExamPage({searchParams}:Props){
 const p=await searchParams; const raw=Array.isArray(p.lang)?p.lang[0]:p.lang;
 const lang:Language=raw==="EN"||raw==="KZ"?raw:"RU"; const t=copy[lang];
 const bank=examOnlyBank(lang);
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
   <h2 style={{marginTop:32}}>{lang==="RU"?"Охват курса":lang==="KZ"?"Курс қамтуы":"Course coverage"}</h2>
   <ol>{modules[lang].map((m,i)=><li key={i} style={{marginBottom:6}}>{m}</li>)}</ol>
 </main>
}