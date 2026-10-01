"use client";

import { useState } from "react";
import type { Language } from "../content/course";
import { topics } from "../content/course-foundation/topics";
import VoiceTextarea from "./VoiceTextarea";

const ui={
 RU:{title:"Виртуальный пациент",intro:"Синтетический учебный сценарий. Двигайтесь от наблюдения к механизму; это тренировка рассуждения, а не постановка реального диагноза.",stage:["1. Наблюдение","2. Физиологическая гипотеза","3. Проверка и границы вывода"],prompt:["Что в ситуации является наблюдаемым фактом?","Какой физиологический механизм может объяснить изменение?","Какое дополнительное наблюдение проверит гипотезу и чего пока нельзя утверждать?"],show:"Открыть ориентир",hide:"Скрыть ориентир",answer:"Ориентир для самопроверки",note:"Сначала сформулируйте ответ самостоятельно."},
 EN:{title:"Virtual Patient",intro:"A synthetic teaching scenario. Move from observation to mechanism; this trains reasoning and does not establish a real diagnosis.",stage:["1. Observation","2. Physiological hypothesis","3. Test and limits"],prompt:["What in the scenario is directly observable?","Which physiological mechanism could explain the change?","What additional observation would test the hypothesis, and what cannot yet be concluded?"],show:"Show guide",hide:"Hide guide",answer:"Self-check guide",note:"Formulate your own answer first."},
 KZ:{title:"Виртуалды пациент",intro:"Синтетикалық оқу сценарийі. Бақылаудан тетікке өтіңіз; бұл нақты диагноз қою емес, пайымдауды жаттықтыру.",stage:["1. Бақылау","2. Физиологиялық гипотеза","3. Тексеру және шектеу"],prompt:["Жағдайдағы тікелей бақыланатын дерек қандай?","Өзгерісті қандай физиологиялық тетік түсіндіре алады?","Гипотезаны қандай қосымша бақылау тексереді және әзірге нені айтуға болмайды?"],show:"Бағдарды ашу",hide:"Бағдарды жасыру",answer:"Өзін-өзі тексеру бағдары",note:"Алдымен жауабыңызды өзіңіз тұжырымдаңыз."}
} as const;

type Scenario={role:Record<Language,string>;finding:Record<Language,string>;test:Record<Language,string>;alternative:Record<Language,string>};
const scenarioFor=(id:number):Scenario=>{
 const t=(RU:string,EN:string,KZ:string)=>({RU,EN,KZ});
 if(id===2)return{role:t("Пациент на функциональном исследовании","Patient undergoing functional testing","Функционалдық зерттеудегі пациент"),finding:t("Во время регистрации появляется изменение сигнала; одновременно пациент моргает и напрягает мышцы лба.","A signal change appears during recording while the patient blinks and tenses the forehead muscles.","Тіркеу кезінде сигнал өзгереді, сол сәтте пациент көзін жыпылықтатып, маңдай бұлшықеттерін кернейді."),test:t("Повторить запись после устранения возможного артефакта и сравнить участки сигнала.","Repeat the recording after reducing the possible artifact and compare signal segments.","Ықтимал артефактты азайтып, жазбаны қайталап, сигнал бөліктерін салыстыру."),alternative:t("Рассмотреть физиологическое изменение сигнала, но отделить его от артефакта регистрации.","Consider a physiological signal change while separating it from recording artifact.","Физиологиялық сигнал өзгерісін қарастыру, бірақ оны тіркеу артефактынан ажырату.")};
 if(id>=3&&id<=6)return{role:t("Пациент с изменением нервно-мышечной функции","Patient with altered neuromuscular function","Жүйке-бұлшықет қызметі өзгерген пациент"),finding:t("После стандартного стимула ответ ткани отличается от ожидаемого.","After a standard stimulus, the tissue response differs from the expected pattern.","Стандартты стимулдан кейін тін жауабы күтілгеннен өзгеше."),test:t("Изменить один физиологический параметр и сравнить величину и временной ход ответа.","Change one physiological parameter and compare response magnitude and time course.","Бір физиологиялық параметрді өзгертіп, жауап шамасы мен уақыттық барысын салыстыру."),alternative:t("Проверить, относится ли изменение к мембране, проведению или синаптической передаче.","Test whether the change arises from membrane, conduction, or synaptic transmission.","Өзгерістің мембранаға, өткізуге немесе синапстық берілуге қатысты екенін тексеру.")};
 if(id>=7&&id<=14)return{role:t("Пациент с изменением движения или рефлекторного ответа","Patient with an altered movement or reflex response","Қозғалысы немесе рефлекстік жауабы өзгерген пациент"),finding:t("При выполнении двигательной пробы меняются точность, сила или характер ответа.","During a motor task, response accuracy, strength, or pattern changes.","Қозғалыс сынағында жауаптың дәлдігі, күші немесе сипаты өзгереді."),test:t("Сравнить сенсорный вход, двигательную команду и коррекцию при повторной пробе.","Compare sensory input, motor command, and correction during a repeated task.","Қайталама сынақта сенсорлық кірісті, қозғалтқыш команданы және түзетуді салыстыру."),alternative:t("Проверить альтернативную локализацию в другом звене двигательной системы.","Test an alternative localization in another link of the motor system.","Қозғалыс жүйесінің басқа буынындағы балама локализацияны тексеру.")};
 if(id>=15&&id<=18)return{role:t("Пациент с изменением регуляции, эмоций или поведения","Patient with altered regulation, emotion, or behaviour","Реттелуі, эмоциясы немесе мінез-құлқы өзгерген пациент"),finding:t("Наблюдается устойчивое изменение реакции на значимый стимул или внутреннее состояние.","A persistent change is observed in response to a salient stimulus or internal state.","Маңызды стимулға немесе ішкі күйге жауаптың тұрақты өзгерісі байқалады."),test:t("Сопоставить контекст, автономную реакцию и поведенческий ответ в повторной ситуации.","Compare context, autonomic response, and behaviour in a repeated situation.","Қайталама жағдайда контексті, вегетативтік реакцияны және мінез-құлық жауабын салыстыру."),alternative:t("Проверить, объясняется ли результат другой регуляторной системой или контекстом.","Test whether another regulatory system or context explains the result.","Нәтижені басқа реттеуші жүйе немесе контекст түсіндіре ме, соны тексеру.")};
 if(id>=19&&id<=21)return{role:t("Пациент с изменением сенсорного восприятия","Patient with altered sensory perception","Сенсорлық қабылдауы өзгерген пациент"),finding:t("При стандартизированном стимуле пациент описывает изменение качества, локализации или интенсивности ощущения.","With a standardized stimulus, the patient reports altered quality, location, or intensity of sensation.","Стандартталған стимул кезінде пациент сезім сапасының, орнының немесе қарқындылығының өзгеруін сипаттайды."),test:t("Изменить один параметр стимула и сравнить порог, локализацию и субъективный ответ.","Change one stimulus parameter and compare threshold, localization, and subjective response.","Стимулдың бір параметрін өзгертіп, табалдырықты, локализацияны және субъективті жауапты салыстыру."),alternative:t("Проверить периферический и центральный уровни сенсорного пути как разные гипотезы.","Test peripheral and central levels of the sensory pathway as separate hypotheses.","Сенсорлық жолдың перифериялық және орталық деңгейлерін бөлек гипотеза ретінде тексеру.")};
 if(id===22)return{role:t("Пациент с изменением вегетативной реакции","Patient with an altered autonomic response","Вегетативтік реакциясы өзгерген пациент"),finding:t("При смене функционального состояния меняются частота сердечных сокращений и другие вегетативные показатели.","With a change in functional state, heart rate and other autonomic measures change.","Функционалдық күй өзгергенде жүрек жиілігі және басқа вегетативтік көрсеткіштер өзгереді."),test:t("Сравнить исходное состояние, нагрузку и восстановление.","Compare baseline, challenge, and recovery.","Бастапқы күйді, жүктемені және қалпына келуді салыстыру."),alternative:t("Разделить вклад симпатического, парасимпатического и неспецифического стрессового ответа.","Separate sympathetic, parasympathetic, and nonspecific stress contributions.","Симпатикалық, парасимпатикалық және спецификалық емес стресс жауабының үлесін ажырату.")};
 return{role:t("Пациент на нейрофизиологическом обследовании","Patient undergoing neurophysiological assessment","Нейрофизиологиялық тексерудегі пациент"),finding:t("В ходе задания меняется результат по сравнению с исходным состоянием.","Task performance changes relative to baseline.","Тапсырма барысында нәтиже бастапқы күймен салыстырғанда өзгереді."),test:t("Повторить задание с изменением одного условия и сравнить результат.","Repeat the task after changing one condition and compare the result.","Бір шартты өзгертіп, тапсырманы қайталап, нәтижені салыстыру."),alternative:t("Проверить альтернативное объяснение и указать пределы вывода.","Test an alternative explanation and state the limits of inference.","Балама түсіндіруді тексеріп, қорытынды шегін көрсету.")};
};

function ExamScene({moduleId,step,path,language}:{moduleId:number;step:number;path:"mechanism"|"alternative";language:Language}){
 const kind=moduleId===2?"signal":moduleId<=6?"cell":moduleId<=14?"motor":moduleId<=18?"regulation":moduleId<=21?"sensory":moduleId===22?"autonomic":"cognitive";
 const labels:{[key:string]:Record<Language,string>}={
 signal:{RU:"Монитор функциональной регистрации",EN:"Functional recording monitor",KZ:"Функционалдық тіркеу мониторы"},
 cell:{RU:"Нервно-мышечный ответ",EN:"Neuromuscular response",KZ:"Жүйке-бұлшықет жауабы"},
 motor:{RU:"Двигательная проба",EN:"Motor examination",KZ:"Қозғалыс сынағы"},
 regulation:{RU:"Регуляторная реакция",EN:"Regulatory response",KZ:"Реттеуші реакция"},
 sensory:{RU:"Сенсорная проба",EN:"Sensory examination",KZ:"Сенсорлық сынақ"},
 autonomic:{RU:"Вегетативный мониторинг",EN:"Autonomic monitoring",KZ:"Вегетативтік мониторинг"},
 cognitive:{RU:"Когнитивная проба",EN:"Cognitive task",KZ:"Когнитивтік сынақ"}};
 const amplitude=(path==="mechanism"?[28,55,78]:[28,43,61])[step];
 return <figure style={{margin:"16px 0",padding:16,borderRadius:18,background:"linear-gradient(145deg,#071a2c,#12364a)",color:"white",boxShadow:"0 10px 24px rgba(7,26,44,.18)"}}>
  <figcaption style={{fontWeight:800,marginBottom:12}}>{labels[kind][language]}</figcaption>
  <svg viewBox="0 0 640 190" role="img" aria-label={labels[kind][language]} style={{display:"block",width:"100%",borderRadius:12,background:"#06131f"}}>
   <defs><linearGradient id="vpGlow" x1="0" x2="1"><stop stopColor="#38bdf8"/><stop offset="1" stopColor="#4ade80"/></linearGradient></defs>
   <path d={`M10 105 C55 ${105-amplitude/2},85 ${105+amplitude/3},125 105 S190 ${105-amplitude},230 105 S300 ${105+amplitude/2},345 105 S410 ${105-amplitude*.8},455 105 S535 ${105+amplitude/2},630 105`} fill="none" stroke="url(#vpGlow)" strokeWidth="5" style={{transition:"all .5s ease"}}/>
   {kind==="motor"&&<><circle cx={110+step*120} cy={55} r="18" fill="#fbbf24"/><path d={`M${110+step*120} 73v48m0-30l-35 28m35-28l38 20m-38 14l-28 43m28-43l30 43`} stroke="#fde68a" strokeWidth="8" strokeLinecap="round"/></>}
   {kind==="sensory"&&[0,1,2,3,4].map(i=><circle key={i} cx={170+i*55} cy={55+(i%2)*12} r={9+step*3} fill={i<=step+1?"#f472b6":"#475569"}/>)}
   {kind==="autonomic"&&<><text x="28" y="45" fill="#bae6fd" fontSize="22">HR</text><text x="80" y="45" fill="white" fontSize="28">{72+step*(path==="mechanism"?9:5)}</text></>}
   {kind==="cognitive"&&<><rect x="475" y="28" width="120" height="48" rx="10" fill="#312e81"/><text x="495" y="60" fill="white" fontSize="20">{step===0?"BASE":step===1?"TASK":"RETEST"}</text></>}
  </svg>
 </figure>;
}

export default function FoundationVirtualPatient({moduleId,language}:{moduleId:number;language:Language}){
 const topic=topics.find(x=>x.id===moduleId);
 const [open,setOpen]=useState<boolean[]>([false,false,false]);
 const [answers,setAnswers]=useState(["","",""]);
 const [path,setPath]=useState<"mechanism"|"alternative"|null>(null);
 const [examStep,setExamStep]=useState(0);
 if(!topic)return null;
 const c=ui[language], scenario=scenarioFor(moduleId), guides=[scenario.finding[language],topic.mechanism[language],topic.interpretation[language]];
 const speak=(value:string)=>{if(typeof window==="undefined"||!("speechSynthesis" in window))return;window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(value);u.lang={RU:"ru-RU",EN:"en-US",KZ:"kk-KZ"}[language];window.speechSynthesis.speak(u)};
 const teacher=path==="mechanism"?topic.mechanism[language]:path==="alternative"?topic.interpretation[language]:"";
 const pathResult=path==="mechanism"?scenario.test[language]:path==="alternative"?scenario.alternative[language]:"";
 const stateLabels=language==="RU"?["Исходное состояние","После первого шага","После проверки"]:language==="EN"?["Baseline","After first step","After verification"]:["Бастапқы күй","Бірінші қадамнан кейін","Тексеруден кейін"];
 const stateValues=path==="alternative"?[35,52,68]:[35,64,82];
 return <section>
  <h1>{c.title}</h1><p>{c.intro}</p><p><strong>{scenario.role[language]}</strong></p>
  <div style={{padding:18,border:"1px solid #b9d8e8",borderRadius:18,background:"linear-gradient(135deg,#e8f7ff,#f6f0ff)",margin:"18px 0"}}><strong>{scenario.finding[language]}</strong><div><button type="button" onClick={()=>speak(scenario.finding[language])} style={{marginTop:12}}>🔊 {language==="RU"?"Голос пациента":language==="EN"?"Patient voice":"Пациент дауысы"}</button></div></div>
  <section style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:12,margin:"18px 0"}}>
   <button type="button" onClick={()=>{setPath("mechanism");setExamStep(0)}} style={{padding:16,borderRadius:14,border:"1px solid #78aeca",background:path==="mechanism"?"#dff3ff":"white",fontWeight:700}}>{scenario.test[language]}</button>
   <button type="button" onClick={()=>{setPath("alternative");setExamStep(0)}} style={{padding:16,borderRadius:14,border:"1px solid #a993cf",background:path==="alternative"?"#eee6ff":"white",fontWeight:700}}>{scenario.alternative[language]}</button>
  </section>
  {path&&<>
   <section style={{padding:18,borderRadius:16,background:"#f5fbf7",border:"1px solid #b9d8c4",marginBottom:18}}>
    <h2 style={{marginTop:0}}>{language==="RU"?"Динамика обследования":language==="EN"?"Examination dynamics":"Тексеру динамикасы"}</h2>
    <p>{pathResult}</p>
    <ExamScene moduleId={moduleId} step={examStep} path={path} language={language} />
    <div aria-label={stateLabels[examStep]} style={{height:18,borderRadius:99,background:"#dce8ef",overflow:"hidden"}}><div style={{height:"100%",width:`${stateValues[examStep]}%`,background:"linear-gradient(90deg,#3b82f6,#22c55e)",transition:"width .5s ease"}} /></div>
    <p><strong>{stateLabels[examStep]}</strong> · {stateValues[examStep]}%</p>
    <button type="button" disabled={examStep>=2} onClick={()=>setExamStep(v=>Math.min(2,v+1))}>{language==="RU"?"Следующий этап обследования":language==="EN"?"Next examination step":"Тексерудің келесі кезеңі"}</button>
    {examStep>0&&<button type="button" onClick={()=>setExamStep(v=>Math.max(0,v-1))} style={{marginLeft:8}}>{language==="RU"?"Назад":language==="EN"?"Back":"Артқа"}</button>}
   </section>
   <aside style={{padding:14,borderRadius:14,background:"#fff7dc",border:"1px solid #e8cf75",marginBottom:18}}><strong>{language==="RU"?"Комментарий преподавателя":language==="EN"?"Teacher feedback":"Оқытушы пікірі"}</strong><p>{teacher}</p><button type="button" onClick={()=>speak(teacher)}>🔊 {language==="RU"?"Озвучить комментарий":language==="EN"?"Speak feedback":"Пікірді дыбыстау"}</button></aside>
  </>}
  {c.stage.map((title,i)=><section key={title} style={{margin:"18px 0",padding:18,border:"1px solid #dce8ef",borderRadius:16}}>
   <h2 style={{marginTop:0}}>{title}</h2><p>{c.prompt[i]}</p>
   <VoiceTextarea language={language} aria-label={c.prompt[i]} placeholder={c.note} value={answers[i]} onValue={value=>setAnswers(v=>v.map((x,j)=>j===i?value:x))} style={{width:"100%",minHeight:100,padding:12,border:"1px solid #bfd0dc",borderRadius:10}} />
   <button type="button" onClick={()=>setOpen(v=>v.map((x,j)=>j===i?!x:x))} style={{marginTop:10,padding:"9px 13px",fontWeight:700}}>{open[i]?c.hide:c.show}</button>
   {open[i]&&<div style={{marginTop:12,padding:12,background:"#eef6fa",borderRadius:10}}><strong>{c.answer}</strong><p>{guides[i]}</p></div>}
  </section>)}
 </section>;
}