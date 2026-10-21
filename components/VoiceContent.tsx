"use client";
import {useEffect,useState} from "react";
import Link from "next/link";
import {modules,type Language} from "../content/course";
import VoiceTextarea from "./VoiceTextarea";
import styles from "./ModuleTools.module.css";

const copy={
 RU:{self:"Самопроверка структуры ответа — не автоматическая оценка знаний.",min:"Напишите или продиктуйте хотя бы одно короткое предложение.",title:"Объясните своими словами",intro:"Представьте, что объясняете тему знакомому без учебника. Скажите просто: что запускает процесс, что происходит дальше и чем всё заканчивается.",prompt:"Ваше объяснение",check:"Проверить себя",saved:"Ответ сохранён в этом браузере.",unsaved:"Не удалось сохранить ответ в браузере. Скопируйте текст, чтобы не потерять его.",cause:"Я написал(а), с чего всё начинается",path:"Я объяснил(а), что происходит дальше",result:"Я написал(а), к какому результату это приводит",ready:"Отлично: в ответе есть начало, ход процесса и результат. Теперь при желании сравните формулировки с теорией.",need:"Добавьте то, чего пока не хватает:",open:"Сравнить с теорией",progress:"Готовность ответа",level:"Итог",weak:"Нужно дополнить",good:"Ответ полный"},
 EN:{self:"This is a structure self-check, not an automatic knowledge grade.",min:"Type or dictate at least one short sentence.",title:"Explain it in your own words",intro:"Imagine explaining the topic to someone without a textbook. Keep it simple: what starts the process, what happens next, and what result follows.",prompt:"Your explanation",check:"Check my answer",saved:"Your answer is saved in this browser.",unsaved:"Your answer could not be saved in this browser. Copy the text to avoid losing it.",cause:"I said what starts the process",path:"I explained what happens next",result:"I said what result follows",ready:"Good: your answer has a start, a sequence, and a result. You can now compare it with the theory.",need:"Add what is still missing:",open:"Compare with theory",progress:"Answer readiness",level:"Result",weak:"Needs more detail",good:"Complete answer"},
 KZ:{self:"Бұл жауап құрылымын өзіндік тексеру, білімді автоматты бағалау емес.",min:"Кемінде бір қысқа сөйлем жазыңыз немесе айтыңыз.",title:"Өз сөзіңізбен түсіндіріңіз",intro:"Тақырыпты оқулықсыз біреуге түсіндіріп жатырмын деп елестетіңіз. Қарапайым айтыңыз: процесс неден басталады, кейін не болады және немен аяқталады.",prompt:"Сіздің түсіндірмеңіз",check:"Өзімді тексеру",saved:"Жауап осы браузерде сақталды.",unsaved:"Жауап браузерде сақталмады. Жоғалтып алмау үшін мәтінді көшіріп алыңыз.",cause:"Мен процесс неден басталатынын жаздым",path:"Мен кейін не болатынын түсіндірдім",result:"Мен қандай нәтиже болатынын жаздым",ready:"Жақсы: жауапта басталуы, үдеріс және нәтиже бар. Енді теориямен салыстыруға болады.",need:"Жетпейтін бөлікті қосыңыз:",open:"Теориямен салыстыру",progress:"Жауап дайындығы",level:"Нәтиже",weak:"Толықтыру қажет",good:"Жауап толық"}
} as const;

const moduleThreeCopy = {
 RU: {
  intro:"Сравните два разных механизма: утрата миелина в аксоне и недостаточное удаление внеклеточного K⁺ астроцитами. Объясните, почему последствия для проведения и возбудимости различаются. Отмеченные пункты — ваша самооценка, а не проверка правильности ответа.",
  prompt:"Миелин, Ранвье, астроциты и K⁺: объяснение своими словами",
  cause:"Я различил(а) демиелинизацию и нарушение удаления внеклеточного K⁺",
  path:"Я объяснил(а), как миелин обеспечивает ток между перехватами Ранвье и как повышение внеклеточного K⁺ деполяризует мембрану",
  result:"Я указал(а), что демиелинизация может замедлить или блокировать проведение, а повышение K⁺ может сначала повышать возбудимость, но сильная устойчивая деполяризация может инактивировать Na⁺-каналы и снижать возбудимость; модель не ставит диагноз",
  ready:"Вы отметили три пункта самооценки. Сравните написанное с теорией: отметки не подтверждают физиологическую правильность объяснения.",
  good:"Три пункта самооценки отмечены",
 },
 EN: {
  intro:"Compare two mechanisms: axonal myelin loss and inadequate astrocytic clearance of extracellular K⁺. Explain why conduction and excitability are affected differently. Checked boxes are your self-assessment, not verification of scientific accuracy.",
  prompt:"Myelin, Ranvier nodes, astrocytes and K⁺: explain in your own words",
  cause:"I distinguished demyelination from impaired extracellular K⁺ clearance",
  path:"I explained current spread between nodes of Ranvier and how elevated extracellular K⁺ depolarizes the membrane",
  result:"I noted that demyelination can slow or block conduction; elevated K⁺ may initially increase excitability, but marked sustained depolarization can inactivate Na⁺ channels and reduce excitability; the model cannot diagnose a patient",
  ready:"You marked all three self-check items. Compare your explanation with the theory: the check marks do not verify physiological correctness.",
  good:"Three self-check items marked",
 },
 KZ: {
  intro:"Екі бөлек механизмді салыстырыңыз: аксон миелинінің жоғалуы және астроциттердің жасушадан тыс K⁺-ті жеткіліксіз әкетуі. Өткізу мен қозғыштыққа әсері неге әртүрлі екенін түсіндіріңіз. Белгіленген тармақтар — өз бағалауыңыз, жауаптың ғылыми дұрыстығын тексеру емес.",
  prompt:"Миелин, Ранвье түйіндері, астроциттер және K⁺: өз сөзіңізбен түсіндіріңіз",
  cause:"Мен демиелиндену мен жасушадан тыс K⁺ әкетілуінің бұзылуын ажыраттым",
  path:"Мен Ранвье түйіндері арасындағы токтың таралуын және жасушадан тыс K⁺ жоғарылағанда мембрананың деполяризациялануын түсіндірдім",
  result:"Мен демиелиндену өткізуді баяулатуы не бөгелтуі мүмкін екенін, ал K⁺ жоғарылауы бастапқыда қозғыштықты арттырғанымен, күшті тұрақты деполяризация Na⁺ арналарын инактивациялауы және қозғыштықты төмендетуі мүмкін екенін, модель диагноз қоймайтынын айттым",
  ready:"Өзіндік тексерудің үш тармағын белгіледіңіз. Жауабыңызды теориямен салыстырыңыз: белгілер физиологиялық дұрыстықты дәлелдемейді.",
  good:"Өзіндік тексерудің үш тармағы белгіленді",
 },
} as const;

const moduleFourCopy = {
 RU: {
  intro:"Объясните, как повышение наружного K⁺ с 4 до 8 мМ изменяет E(K) и расчётный Vm при остальных постоянных параметрах, а также почему длительная деполяризация может уменьшить доступность Na⁺-каналов. Отметки — самооценка, не проверка знаний.",
  prompt:"Калий, мембранный потенциал и рефрактерность",
  cause:"Я объяснил(а), почему повышение наружного K⁺ делает E(K) менее отрицательным",
  path:"Я различил(а) E(K) и Vm: расчётный Vm меняется примерно с −71,2 до −62,0 мВ; длительная деполяризация может инактивировать Na⁺-каналы",
  result:"Я указал(а), что быстрый спад импульса не вызывает Na⁺/K⁺-АТФаза и расчёт не определяет клинический диагноз",
  ready:"Это самооценка структуры. Сравните механизм и расчёт с теорией.",good:"Три пункта самооценки отмечены",
 },
 EN: {
  intro:"Explain how raising extracellular K⁺ from 4 to 8 mM changes E(K) and calculated Vm with other parameters fixed, and why sustained depolarization can reduce Na⁺-channel availability. Checkboxes assess structure, not correctness.",
  prompt:"Potassium, membrane potential and refractoriness",
  cause:"I explained why higher extracellular K⁺ makes E(K) less negative",
  path:"I distinguished E(K) from Vm: calculated Vm shifts from about −71.2 to −62.0 mV; sustained depolarization may inactivate Na⁺ channels",
  result:"I noted that Na⁺/K⁺-ATPase does not cause rapid spike repolarization and the model does not establish a clinical diagnosis",
  ready:"This is a structure self-check. Compare the mechanism and calculation with theory.",good:"Three self-check items marked",
 },
 KZ: {
  intro:"Басқа параметрлер өзгермегенде жасушадан тыс K⁺ 4-тен 8 мМ-ге артса, E(K) пен есептелген Vm қалай өзгеретінін және ұзақ деполяризация Na⁺ арналарының қолжетімділігін неліктен азайтатынын түсіндіріңіз. Белгілер — жауап құрылымының өзіндік бағасы.",
  prompt:"Калий, мембраналық потенциал және рефрактерлік",
  cause:"Мен сыртқы K⁺ артқанда E(K) азырақ теріс болатынын түсіндірдім",
  path:"Мен E(K) пен Vm-ды ажыраттым: есептелген Vm шамамен −71,2-ден −62,0 мВ-ке өзгереді; ұзақ деполяризация Na⁺ арналарын инактивациялауы мүмкін",
  result:"Мен жылдам реполяризацияны Na⁺/K⁺-АТФазаға телімедім және модель клиникалық диагноз қоймайтынын көрсеттім",
  ready:"Бұл — құрылымды өзіндік бағалау. Тетік пен есепті теориямен салыстырыңыз.",good:"Үш өзіндік тексеру тармағы белгіленді",
 },
} as const;

const moduleFiveCopy = {
 RU: {
  intro:"Сравните два разных способа передачи сигнала. В химическом синапсе потенциал действия зарегистрирован непосредственно в пресинаптическом окончании, но вход Ca²⁺ снижен. Объясните, что происходит с вызванным выделением медиатора. Затем объясните, как ток передаётся через щелевые контакты электрического синапса. Отметки ниже — самооценка, а не автоматическая проверка физиологии.",
  prompt:"Химический и электрический синапсы: механизм, наблюдение и пределы вывода",
  cause:"Я различил(а) приход потенциала действия в окончание и вход Ca²⁺, запускающий выделение медиатора",
  path:"Я объяснил(а), почему уменьшение входа Ca²⁺ снижает вероятность вызванного экзоцитоза, а электрическая передача идёт через щелевые контакты без обязательного выделения медиатора",
  result:"Я указал(а), что спонтанные миниатюрные ответы могут сохраняться; уменьшенный постсинаптический ответ сам по себе не доказывает блок проведения по аксону или точную локализацию дефекта",
  ready:"Три пункта самооценки отмечены. Проверьте по теории, различены ли химический и электрический механизмы; отметки не подтверждают правильность объяснения.",
  good:"Три пункта самооценки отмечены",
 },
 EN: {
  intro:"Compare two distinct transmission mechanisms. In a chemical synapse, an action potential is recorded directly at the presynaptic terminal but Ca²⁺ entry is reduced. Explain the effect on evoked transmitter release. Then explain current flow through gap junctions at an electrical synapse. The checkboxes are self-assessment, not automated physiology grading.",
  prompt:"Chemical versus electrical synapses: mechanism, observation and limits of inference",
  cause:"I distinguished arrival of the terminal action potential from Ca²⁺ entry that triggers transmitter release",
  path:"I explained why reduced Ca²⁺ entry lowers the probability of evoked vesicle exocytosis, while electrical coupling uses gap junctions without requiring transmitter release",
  result:"I noted that spontaneous miniature events may persist; a smaller postsynaptic response alone proves neither axonal conduction block nor the precise location of the defect",
  ready:"All three self-check items are marked. Compare the two transmission mechanisms with the theory; checkmarks do not establish physiological correctness.",
  good:"Three self-check items marked",
 },
 KZ: {
  intro:"Берілудің екі түрлі механизмін салыстырыңыз. Химиялық синапста әрекет потенциалы пресинапстық ұшта тікелей тіркелді, бірақ Ca²⁺ енуі азайды. Бұл шақырылған медиатор бөлінуіне қалай әсер ететінін түсіндіріңіз. Содан кейін электрлік синапста токтың саңылаулы түйіспелер арқылы қалай өтетінін түсіндіріңіз. Белгілер — өзіндік бағалау, физиологиялық білімді автоматты тексеру емес.",
  prompt:"Химиялық және электрлік синапстар: механизм, бақылау және қорытынды шегі",
  cause:"Мен ұшқа әрекет потенциалының жетуін медиатор бөлінуін бастайтын Ca²⁺ енуінен ажыраттым",
  path:"Мен Ca²⁺ енуі азайса, шақырылған везикула экзоцитозының ықтималдығы төмендейтінін, ал электрлік беріліс медиатор бөлінуін міндетті түрде қажет етпейтін саңылаулы түйіспелер арқылы жүретінін түсіндірдім",
  result:"Мен өздігінен туатын миниатюралық жауаптар сақталуы мүмкін екенін және постсинапстық жауаптың азаюы өздігінен аксондағы өткізудің бөгелуін де, ақаудың нақты орнын да дәлелдемейтінін көрсеттім",
  ready:"Өзіндік тексерудің үш тармағы белгіленді. Екі механизмді теориямен салыстырыңыз: белгілер физиологиялық дұрыстықты дәлелдемейді.",
  good:"Үш өзіндік тексеру тармағы белгіленді",
 },
} as const;

export default function VoiceContent({language,moduleId}:{language:Language;moduleId:number}){
 const c=moduleId===3 ? {...copy[language],...moduleThreeCopy[language]} : moduleId===4 ? {...copy[language],...moduleFourCopy[language]} : moduleId===5 ? {...copy[language],...moduleFiveCopy[language]} : copy[language];
 const key=`neuro-course:mechanism:${moduleId}:${language}`;
 const[answer,setAnswer]=useState("");
 const[persisted,setPersisted]=useState(false);
 const[cause,setCause]=useState(false),[path,setPath]=useState(false),[result,setResult]=useState(false),[checked,setChecked]=useState(false);
 useEffect(()=>{
  let saved="";
  try{saved=localStorage.getItem(key)||"";setPersisted(Boolean(saved))}catch{setPersisted(false)}
  setAnswer(saved);
  setCause(false);setPath(false);setResult(false);setChecked(false);
 },[key]);
 function update(v:string){setAnswer(v);setChecked(false);setCause(false);setPath(false);setResult(false);try{localStorage.setItem(key,v);setPersisted(true)}catch{setPersisted(false)}}
 const checks=[{ok:cause,label:c.cause},{ok:path,label:c.path},{ok:result,label:c.result}];
 const done=checks.filter(x=>x.ok).length;
 const missing=checks.filter(x=>!x.ok).map(x=>x.label);
 function evaluate(){
   setChecked(true);
 }
 return <article className={styles.tool}>
   <h1>{c.title}</h1>
   <p><strong>{modules[language][moduleId-1]}</strong></p>
   <p>{c.intro}</p>
   <VoiceTextarea language={language} label={c.prompt} value={answer} onValue={update} rows={7}/>
   <p>{c.progress}: <strong>{done}/3</strong></p>
   <progress value={done} max={3} aria-label={c.progress}/>
   <p><small>{c.self}</small></p>
   <fieldset>
     <legend>{c.check}</legend>
     <label><input type="checkbox" checked={cause} onChange={e=>{setCause(e.target.checked);setChecked(false)}}/> {c.cause}</label><br/>
     <label><input type="checkbox" checked={path} onChange={e=>{setPath(e.target.checked);setChecked(false)}}/> {c.path}</label><br/>
     <label><input type="checkbox" checked={result} onChange={e=>{setResult(e.target.checked);setChecked(false)}}/> {c.result}</label>
   </fieldset>
   <button type="button" disabled={answer.trim().length<12} aria-describedby={answer.trim().length<12?"mechanism-check-hint":undefined} onClick={evaluate}>{c.check}</button>{answer.trim().length<12&&<p id="mechanism-check-hint" style={{color:"#607b8d",fontSize:"0.92rem"}}>{c.min}</p>}
   {answer.trim().length>=12&&<p><small>{persisted?c.saved:c.unsaved}</small></p>}
   {checked&&<div role="status" style={{marginTop:14,padding:"14px 16px",border:"1px solid #d6e3eb",borderRadius:12,background:"#f8fcff"}}>
     <p style={{margin:"0 0 8px"}}><strong>{c.level}: {done===3?c.good:c.weak} · {done}/3</strong></p>
     <p style={{margin:0}}>{done===3?c.ready:c.need}</p>
     {done<3&&<ul>{missing.map(item=><li key={item}>{item}</li>)}</ul>}
   </div>}
   <Link href={`/modules/${moduleId}/theory?lang=${language}`}>{c.open}</Link>
 </article>
}