"use client";

import {useMemo,useState} from "react";
import type {Language} from "../content/course";

type Kind="unconditioned"|"conditioned";
type Inhibition="external"|"extinction"|"differentiation"|"delay";

const copy={
 RU:{
  title:"Рефлексы: от врождённой реакции к обучению",
  intro:"Сравните безусловный и условный рефлекс, затем посмотрите, как условная реакция формируется и тормозится.",
  innate:"Безусловный рефлекс",learned:"Условный рефлекс",
  innateText:"Врожденная, видоспецифическая реакция. Для её появления не требуется предварительное обучение.",
  learnedText:"Приобретённая реакция. Нейтральный сигнал начинает вызывать ответ после повторного сочетания с биологически значимым раздражителем.",
  chain:"Схема формирования",before:"До обучения",during:"Во время обучения",after:"После обучения",
  beforeText:"Сигнал сам по себе не вызывает нужную реакцию.",duringText:"Сигнал многократно сочетается с безусловным раздражителем.",afterText:"Сигнал сам начинает вызывать условную реакцию.",
  inhibition:"Торможение условного рефлекса",pick:"Выберите вид торможения",
  external:"Внешнее",extinction:"Угасательное",differentiation:"Дифференцировочное",delay:"Запаздывательное",
  externalText:"Новый сильный стимул временно подавляет текущую условную реакцию.",
  extinctionText:"Если условный сигнал повторяется без подкрепления, условная реакция постепенно ослабевает.",
  differentiationText:"Организм учится отвечать на подкрепляемый сигнал и не отвечать на похожий неподкрепляемый.",
  delayText:"Если подкрепление регулярно появляется с задержкой, реакция тоже смещается ближе ко времени подкрепления.",
  task:"Проверьте себя",scenario:"Звонок несколько раз сочетали с пищей. Позже звонок сам вызывает слюноотделение. Затем звонок много раз предъявляют без пищи. Что произойдёт?",
  a:"Реакция постепенно ослабеет — это угасательное торможение.",b:"Реакция станет врождённой.",c:"Слюноотделение будет усиливаться бесконечно.",
  good:"Верно: отсутствие подкрепления постепенно ослабляет условную реакцию.",bad:"Посмотрите, есть ли подкрепление. Если условный сигнал повторяется без него, реакция угасает.",
  note:"Важно: «центр условного рефлекса» — не одна точка мозга. Формирование условных связей зависит от распределённых корковых и подкорковых сетей, мотивации, подкрепления и состояния организма."
 },
 EN:{
  title:"Reflexes: from innate response to learning",intro:"Compare unconditioned and conditioned reflexes, then see how a conditioned response forms and is inhibited.",
  innate:"Unconditioned reflex",learned:"Conditioned reflex",
  innateText:"An innate, species-typical response that does not require prior learning.",
  learnedText:"An acquired response. A previously neutral cue begins to trigger a response after repeated pairing with a biologically meaningful stimulus.",
  chain:"How it forms",before:"Before learning",during:"During learning",after:"After learning",
  beforeText:"The cue alone does not produce the target response.",duringText:"The cue is repeatedly paired with an unconditioned stimulus.",afterText:"The cue alone now evokes the conditioned response.",
  inhibition:"Inhibition of conditioned reflexes",pick:"Choose a type of inhibition",
  external:"External",extinction:"Extinction",differentiation:"Differential",delay:"Delay",
  externalText:"A new strong stimulus temporarily suppresses the ongoing conditioned response.",
  extinctionText:"If the conditioned cue is repeated without reinforcement, the conditioned response gradually weakens.",
  differentiationText:"The organism learns to respond to the reinforced cue and not to a similar unreinforced cue.",
  delayText:"If reinforcement consistently arrives later, the response shifts closer to the time of reinforcement.",
  task:"Check yourself",scenario:"A bell is repeatedly paired with food. Later the bell alone causes salivation. Then the bell is presented many times without food. What happens?",
  a:"The response gradually weakens — extinction.",b:"The response becomes innate.",c:"Salivation increases without limit.",
  good:"Correct: without reinforcement, the conditioned response gradually weakens.",bad:"Check whether reinforcement is still present. Repeated presentation without reinforcement produces extinction.",
  note:"Important: there is no single anatomical 'center' for a conditioned reflex. Learning depends on distributed cortical and subcortical networks, motivation, reinforcement, and the organism's state."
 },
 KZ:{
  title:"Рефлекстер: туа біткен жауаптан үйренуге дейін",intro:"Шартсыз және шартты рефлексті салыстырып, шартты жауаптың қалай қалыптасатынын және тежелетінін көріңіз.",
  innate:"Шартсыз рефлекс",learned:"Шартты рефлекс",
  innateText:"Алдын ала үйренуді қажет етпейтін туа біткен, түрге тән жауап.",
  learnedText:"Жүре пайда болатын жауап. Бұрын бейтарап болған сигнал биологиялық маңызды тітіркендіргішпен бірнеше рет қосарланғаннан кейін жауап туғызады.",
  chain:"Қалай қалыптасады",before:"Үйренуге дейін",during:"Үйрену кезінде",after:"Үйренгеннен кейін",
  beforeText:"Сигналдың өзі қажетті жауап туғызбайды.",duringText:"Сигнал шартсыз тітіркендіргішпен бірнеше рет қосарланады.",afterText:"Сигналдың өзі шартты жауап туғызады.",
  inhibition:"Шартты рефлекстің тежелуі",pick:"Тежелу түрін таңдаңыз",
  external:"Сыртқы",extinction:"Өшу",differentiation:"Ажырату",delay:"Кешігу",
  externalText:"Жаңа күшті стимул ағымдағы шартты реакцияны уақытша басады.",
  extinctionText:"Шартты сигнал нығайтусыз қайталанса, шартты реакция біртіндеп әлсірейді.",
  differentiationText:"Организм нығайтылатын сигналға жауап беріп, ұқсас бірақ нығайтылмайтын сигналға жауап бермеуді үйренеді.",
  delayText:"Нығайту үнемі кеш берілсе, реакция да нығайту уақытына жақындайды.",
  task:"Өзіңізді тексеріңіз",scenario:"Қоңырау бірнеше рет тағаммен бірге берілді. Кейін қоңыраудың өзі сілекей бөлінуін туғызды. Содан соң қоңырау тағамсыз көп рет берілді. Не болады?",
  a:"Реакция біртіндеп әлсірейді — бұл өшу тежелуі.",b:"Реакция туа біткен болады.",c:"Сілекей бөлінуі шексіз күшейеді.",
  good:"Дұрыс: нығайтусыз шартты реакция біртіндеп әлсірейді.",bad:"Нығайту бар ма, соны тексеріңіз. Нығайтусыз қайталану реакцияның өшуіне әкеледі.",
  note:"Маңызды: шартты рефлекстің бір ғана анатомиялық «орталығы» жоқ. Үйрену қыртыстық және қыртысасты желілерге, мотивацияға, нығайтуға және ағза күйіне тәуелді."
 }
} as const;

export default function ReflexLearningLab({language}:{language:Language}){
 const t=copy[language];
 const [kind,setKind]=useState<Kind>("unconditioned");
 const [inh,setInh]=useState<Inhibition>("extinction");
 const [answer,setAnswer]=useState<string>("");
 const [checked,setChecked]=useState(false);
 const inhibitionText=useMemo(()=>({external:t.externalText,extinction:t.extinctionText,differentiation:t.differentiationText,delay:t.delayText}[inh]),[inh,t]);
 return <section style={{margin:"24px 0",padding:18,border:"1px solid #cfe0ea",borderRadius:16,background:"#fff"}}>
  <h2>{t.title}</h2><p>{t.intro}</p>
  <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:12}}>
   <button type="button" aria-pressed={kind==="unconditioned"} onClick={()=>setKind("unconditioned")} style={{padding:14,borderRadius:12}}><strong>{t.innate}</strong></button>
   <button type="button" aria-pressed={kind==="conditioned"} onClick={()=>setKind("conditioned")} style={{padding:14,borderRadius:12}}><strong>{t.learned}</strong></button>
  </div>
  <p style={{padding:"12px 14px",background:"#f8fcff",borderRadius:12}}>{kind==="unconditioned"?t.innateText:t.learnedText}</p>
  <h3>{t.chain}</h3>
  <ol>
   <li><strong>{t.before}:</strong> {t.beforeText}</li>
   <li><strong>{t.during}:</strong> {t.duringText}</li>
   <li><strong>{t.after}:</strong> {t.afterText}</li>
  </ol>
  <h3>{t.inhibition}</h3><p>{t.pick}</p>
  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
   {([["external",t.external],["extinction",t.extinction],["differentiation",t.differentiation],["delay",t.delay]] as [Inhibition,string][]).map(([id,label])=><button key={id} type="button" aria-pressed={inh===id} onClick={()=>setInh(id)}>{label}</button>)}
  </div>
  <p style={{marginTop:10}}>{inhibitionText}</p>
  <aside style={{padding:"12px 14px",background:"#f8fcff",borderRadius:12}}>{t.note}</aside>
  <h3>{t.task}</h3><p>{t.scenario}</p>
  {[["a",t.a],["b",t.b],["c",t.c]].map(([id,label])=><label key={id} style={{display:"block",padding:"7px 0"}}><input type="radio" name="reflex-check" checked={answer===id} onChange={()=>{setAnswer(id);setChecked(false)}}/> {label}</label>)}
  <button type="button" disabled={!answer} onClick={()=>setChecked(true)}>{language==="RU"?"Проверить":language==="KZ"?"Тексеру":"Check"}</button>
  {checked&&<p role="status"><strong>{answer==="a"?t.good:t.bad}</strong></p>}
 </section>;
}
