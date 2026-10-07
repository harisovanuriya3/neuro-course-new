"use client";

import {useState} from "react";
import type {Language} from "../content/course";

type Stage="child"|"adult"|"older";
const T={
 RU:{title:"Возрастная нейрофизиология",intro:"Сравните, как меняются нервная система, обучение и сон на разных этапах жизни.",child:"Детство и подростковый возраст",adult:"Взрослый возраст",older:"Пожилой возраст",development:"Развитие и пластичность",memory:"Обучение и память",sleep:"Сон",clinical:"Что важно помнить",data:{
  child:["Продолжаются миелинизация, созревание префронтальных сетей и перестройка синаптических связей; пластичность высока.","Обучение сильно зависит от опыта, повторения, эмоциональной значимости и созревания исполнительных функций.","Потребность во сне выше; архитектура сна и циркадные ритмы меняются по мере взросления.","Нельзя оценивать детскую нервную систему как уменьшенную копию взрослой: возраст влияет на норму реакции и результаты тестов."],
  adult:["Сети в основном зрелые, но пластичность сохраняется и поддерживает обучение и адаптацию.","Рабочая, декларативная и процедурная память опираются на разные, взаимодействующие системы.","Сон продолжает участвовать в консолидации памяти и восстановлении функций.","Нормальные показатели зависят от контекста, сна, стресса, лекарств и индивидуальных различий."],
  older:["Некоторые скорости обработки и сенсорные функции могут снижаться, но обучение и пластичность сохраняются.","Эпизодическая память и скорость извлечения могут становиться менее эффективными; это не равно деменции.","Сон часто становится более фрагментированным, меняются его глубина и циркадная организация.","Нужно отличать нормальные возрастные изменения от патологического когнитивного снижения и неврологических заболеваний."]
 }},
 EN:{title:"Neurophysiology across age",intro:"Compare nervous-system function, learning, and sleep across stages of life.",child:"Childhood and adolescence",adult:"Adulthood",older:"Older age",development:"Development and plasticity",memory:"Learning and memory",sleep:"Sleep",clinical:"Key point",data:{
  child:["Myelination, prefrontal-network maturation, and synaptic remodeling continue; plasticity is high.","Learning strongly depends on experience, repetition, emotional salience, and maturation of executive functions.","Sleep need is higher, and sleep architecture and circadian timing change with maturation.","Do not treat the developing nervous system as a smaller adult system; age changes normal responses and test interpretation."],
  adult:["Networks are largely mature, but plasticity remains and supports learning and adaptation.","Working, declarative, and procedural memory depend on partly distinct interacting systems.","Sleep remains important for memory consolidation and recovery.","Normal performance varies with context, sleep, stress, medication, and individual differences."],
  older:["Some processing speed and sensory functions may decline, while learning and plasticity remain possible.","Episodic memory and retrieval speed may become less efficient; this is not the same as dementia.","Sleep often becomes more fragmented, with changes in depth and circadian organization.","Distinguish normal aging from pathological cognitive decline and neurological disease."]
 }},
 KZ:{title:"Жас ерекшелік нейрофизиологиясы",intro:"Өмір кезеңдерінде жүйке жүйесі, үйрену және ұйқы қалай өзгеретінін салыстырыңыз.",child:"Балалық және жасөспірім кезең",adult:"Ересек кезең",older:"Қарт жас",development:"Даму және пластикалылық",memory:"Үйрену және жад",sleep:"Ұйқы",clinical:"Маңыздысы",data:{
  child:["Миелинизация, префронталдық желілердің жетілуі және синапстық қайта құрылу жалғасады; пластикалылық жоғары.","Үйрену тәжірибеге, қайталауға, эмоциялық маңызға және атқарушы қызметтердің жетілуіне тәуелді.","Ұйқы қажеттілігі жоғары; ұйқы құрылымы мен циркадтық ырғақтар жас ұлғайған сайын өзгереді.","Баланың жүйке жүйесін ересектің кішірейтілген көшірмесі деп қарауға болмайды: жас қалыпты жауап пен тест нәтижесіне әсер етеді."],
  adult:["Желілер негізінен жетілген, бірақ пластикалылық сақталып, үйрену мен бейімделуге мүмкіндік береді.","Жұмыс, декларативті және процедуралық жад ішінара әртүрлі өзара әрекеттесетін жүйелерге сүйенеді.","Ұйқы жад консолидациясы мен қалпына келуге қатысады.","Қалыпты көрсеткіштер контекстке, ұйқыға, стреске, дәрілерге және жеке айырмашылықтарға тәуелді."],
  older:["Кейбір өңдеу жылдамдығы мен сенсорлық қызметтер төмендеуі мүмкін, бірақ үйрену мен пластикалылық сақталады.","Эпизодтық жад және ақпаратты еске түсіру жылдамдығы төмендеуі мүмкін; бұл деменциямен бірдей емес.","Ұйқы жиі фрагменттеледі, тереңдігі мен циркадтық ұйымдасуы өзгереді.","Қалыпты жас өзгерістерін патологиялық когнитивтік төмендеу мен неврологиялық аурудан ажырату керек."]
 }}
} as const;

export default function AgeNeurophysiologyPanel({language}:{language:Language}){
 const t=T[language]; const [stage,setStage]=useState<Stage>("adult"); const d=t.data[stage];
 return <section style={{margin:"24px 0",padding:18,border:"1px solid #d6e3eb",borderRadius:16,background:"#fff"}}>
  <h2>{t.title}</h2><p>{t.intro}</p><div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
   {([["child",t.child],["adult",t.adult],["older",t.older]] as [Stage,string][]).map(([id,label])=><button key={id} type="button" aria-pressed={stage===id} onClick={()=>setStage(id)}>{label}</button>)}
  </div>
  <div style={{marginTop:12,display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(220px,1fr))",gap:10}}>
   {[[t.development,d[0]],[t.memory,d[1]],[t.sleep,d[2]],[t.clinical,d[3]]].map(([h,p])=><article key={h} style={{padding:12,borderRadius:12,background:"#f8fcff"}}><h3>{h}</h3><p>{p}</p></article>)}
  </div>
 </section>
}
