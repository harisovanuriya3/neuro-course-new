"use client";

import {useState,type ReactNode} from "react";
import type {Language} from "../content/course";
import styles from "./GuidedLabFrame.module.css";
import {recordOutcome} from "../lib/courseProgress";

const prompts={
 8:{RU:"Предскажите: если нервный путь перекрещивается, с какой стороны ниже повреждения изменится чувствительность или движение?",KZ:"Болжаңыз: жүйке жолы айқасса, зақымнан төмен сезімталдық немесе қозғалыс қай жақта өзгереді?",EN:"Predict: if the pathway crosses, which side below the lesion will show a sensory or motor change?"},
 9:{RU:"Предскажите: что произойдёт с мышцей-агонистом и мышцей-антагонистом, когда одна из них растягивается?",KZ:"Болжаңыз: бір бұлшықет созылғанда агонист пен антагонист бұлшықеттерде не болады?",EN:"Predict what happens to the agonist and antagonist muscles when one is stretched."},
 10:{RU:"Предскажите: если сенсорных сигналов станет больше или меньше, как изменится уровень бодрствования?",KZ:"Болжаңыз: сенсорлық сигналдар көбейсе немесе азайса, сергектік қалай өзгереді?",EN:"Predict: if sensory input increases or decreases, how will alertness change?"},
 11:{RU:"Предскажите: если мозг хуже получает информацию о выполненном движении, станет ли движение точнее или менее точным?",KZ:"Болжаңыз: ми орындалған қозғалыс туралы ақпаратты нашар алса, қозғалыс дәлірек пе әлде дәлдігі төмен бола ма?",EN:"Predict: if the brain receives poorer feedback about a movement, will the movement become more or less accurate?"},
 12:{RU:"Предскажите: если дофамина становится меньше, как изменится готовность системы запускать движение?",KZ:"Болжаңыз: дофамин азайса, жүйенің қозғалысты бастауға дайындығы қалай өзгереді?",EN:"Predict: if dopamine falls, how will the system's readiness to initiate movement change?"},
 13:{RU:"Предскажите: если мозжечок получает менее точную обратную связь, как это повлияет на исправление ошибки движения?",KZ:"Болжаңыз: мишыққа кері байланыс дәлдігі төмен болса, қозғалыс қатесін түзету қалай өзгереді?",EN:"Predict: if the cerebellum receives less accurate feedback, how will movement-error correction change?"},
 14:{RU:"Предскажите: если таламус хуже пропускает сенсорный сигнал, что изменится в сигнале, который дойдёт до коры?",KZ:"Болжаңыз: таламус сенсорлық сигналды нашар өткізсе, қыртысқа жететін сигнал қалай өзгереді?",EN:"Predict: if the thalamus relays a sensory signal less effectively, what will change in the signal reaching cortex?"},
 15:{RU:"Предскажите: если отрицательная обратная связь усилится, отклонение регулируемого показателя станет больше или меньше?",KZ:"Болжаңыз: теріс кері байланыс күшейсе, реттелетін көрсеткіштің ауытқуы арта ма әлде азая ма?",EN:"Predict: if negative feedback becomes stronger, will deviation of the regulated variable increase or decrease?"},
 16:{RU:"Предскажите: может ли один и тот же эмоциональный сигнал вызвать разную реакцию в разном контексте? Почему?",KZ:"Болжаңыз: бір эмоциялық сигнал әртүрлі жағдайда әртүрлі реакция тудыруы мүмкін бе? Неліктен?",EN:"Predict: can the same emotional signal produce different responses in different contexts? Why?"},
 17:{RU:"Предскажите: если человек безопасно встречается со стимулом снова и снова, как изменится выученная реакция страха?",KZ:"Болжаңыз: адам қауіпсіз жағдайда сол стимулмен қайта-қайта кездессе, үйренген қорқыныш жауабы қалай өзгереді?",EN:"Predict: if a person repeatedly encounters the stimulus safely, how will the learned fear response change?"},
 18:{RU:"Предскажите: если соседние участки коры сильнее подавляют друг друга, границы сигнала станут чётче или слабее?",KZ:"Болжаңыз: көрші қыртыс аймақтары бір-бірін күштірек тежесе, сигнал шекарасы айқынырақ па әлде әлсіз бе болады?",EN:"Predict: if neighboring cortical regions inhibit each other more strongly, will signal boundaries become sharper or weaker?"},
 19:{RU:"Предскажите: при большом рецептивном поле человеку будет легче или труднее различить две близкие точки?",KZ:"Болжаңыз: рецептивтік өріс үлкен болса, екі жақын нүктені ажырату оңай ма әлде қиын ба?",EN:"Predict: with a larger receptive field, will it be easier or harder to distinguish two nearby points?"},
 20:{RU:"Предскажите: как сетчатка изменит ответ, если яркость и контраст меняются после периода адаптации?",KZ:"Болжаңыз: бейімделуден кейін жарықтық пен контраст өзгерсе, торқабық жауабы қалай өзгереді?",EN:"Predict how the retinal response will change when luminance and contrast change after adaptation."},
 21:{RU:"Предскажите: если рецепторы привыкли к постоянному стимулу, станет их ответ сильнее или слабее?",KZ:"Болжаңыз: рецепторлар тұрақты стимулға бейімделсе, олардың жауабы күшейе ме әлде әлсірей ме?",EN:"Predict: if receptors adapt to a constant stimulus, will their response become stronger or weaker?"},
 22:{RU:"Предскажите: если симпатическая активность усиливается, обязательно ли парасимпатическая активность во всех органах уменьшается?",KZ:"Болжаңыз: симпатикалық белсенділік күшейсе, барлық мүшеде парасимпатикалық белсенділік міндетті түрде төмендей ме?",EN:"Predict: if sympathetic activity increases, must parasympathetic activity decrease in every organ?"},
 23:{RU:"Предскажите: что лучше для запоминания — много повторений подряд или повторения с интервалами?",KZ:"Болжаңыз: есте сақтау үшін қайсысы тиімді — қатарынан көп қайталау ма, әлде аралықпен қайталау ма?",EN:"Predict: which is better for memory—many repetitions in a row or repetitions spaced over time?"},
 24:{RU:"Предскажите: как недосып и время суток вместе повлияют на бодрствование и структуру сна?",KZ:"Болжаңыз: ұйқының жетіспеуі мен тәулік уақыты бірге сергектік пен ұйқы құрылымына қалай әсер етеді?",EN:"Predict how sleep loss and time of day together will affect alertness and sleep structure."},
 25:{RU:"Предскажите: если два входа активируются с разным интервалом, может ли связь между нейронами усиливаться или ослабевать?",KZ:"Болжаңыз: екі кіріс әртүрлі уақыт аралығында белсенсе, нейрондар арасындағы байланыс күшеюі немесе әлсіреуі мүмкін бе?",EN:"Predict: if two inputs are active at different time intervals, can the connection between neurons strengthen or weaken?"}
} as const;
const clinical={
 8:{RU:"Клиническая связь: сторона дефицита зависит от того, пересеклись ли волокна до или после уровня поражения; протяжённость реального очага также меняет картину.",KZ:"Клиникалық байланыс: тапшылық жағы талшықтардың зақым деңгейіне дейін немесе кейін айқасуына тәуелді; нақты ошақтың көлемі де көріністі өзгертеді.",EN:"Clinical link: the side of deficit depends on whether fibers crossed before or after the lesion level; the extent of a real lesion also changes the pattern."},
 9:{RU:"Клиническая связь: реципрокное торможение координирует суставное движение, но реальный тонус также зависит от нисходящего контроля и других спинальных контуров.",KZ:"Клиникалық байланыс: реципрокты тежелу буын қозғалысын үйлестіреді, бірақ нақты тонус төмендейтін бақылау мен басқа жұлын контурларына да тәуелді.",EN:"Clinical link: reciprocal inhibition coordinates joint movement, but real tone also depends on descending control and other spinal circuits."},
 10:{RU:"Клиническая связь: двустороннее повреждение восходящих систем активации может глубоко нарушать бодрствование, но уровень сознания определяется распределённой сетью.",KZ:"Клиникалық байланыс: жоғарылаушы белсендіру жүйелерінің екіжақты зақымы сергектікті ауыр бұзуы мүмкін, бірақ сана деңгейін таралған желі анықтайды.",EN:"Clinical link: bilateral injury to ascending arousal systems can profoundly impair wakefulness, although consciousness depends on a distributed network."},
 11:{RU:"Клиническая связь: дефицит нисходящего контроля и сенсорной обратной связи по-разному нарушает точность движения.",KZ:"Клиникалық байланыс: төмендейтін бақылау мен сенсорлық кері байланыс тапшылығы қозғалыс дәлдігін әртүрлі бұзады.",EN:"Clinical link: deficits of descending control and sensory feedback impair movement accuracy in different ways."},
 12:{RU:"Клиническая связь: при болезни Паркинсона потеря нигростриарного дофамина смещает сетевой баланс в сторону снижения облегчения движения.",KZ:"Клиникалық байланыс: Паркинсон ауруында нигростриарлық дофаминнің азаюы желілік теңгерімді қозғалысты жеңілдетудің төмендеуіне ығыстырады.",EN:"Clinical link: in Parkinson disease, loss of nigrostriatal dopamine shifts network balance toward reduced facilitation of movement."},
 13:{RU:"Клиническая связь: мозжечковые поражения вызывают дисметрию и нарушение коррекции текущего движения, а не первичный паралич.",KZ:"Клиникалық байланыс: мишық зақымы бастапқы салдануды емес, дисметрияны және ағымдағы қозғалысты түзетудің бұзылуын туғызады.",EN:"Clinical link: cerebellar lesions cause dysmetria and impaired online correction rather than primary paralysis."},
 14:{RU:"Клиническая связь: таламические поражения могут нарушать сенсорную передачу, внимание и состояние сознания в зависимости от локализации.",KZ:"Клиникалық байланыс: таламус зақымы орналасуына қарай сенсорлық берілісті, зейінді және сана күйін бұзуы мүмкін.",EN:"Clinical link: depending on location, thalamic lesions can disrupt sensory relay, attention, and consciousness."},
 15:{RU:"Клиническая связь: нарушения гипоталамической регуляции могут затрагивать температуру, водный баланс, питание и эндокринные оси.",KZ:"Клиникалық байланыс: гипоталамустық реттелудің бұзылыстары температураға, су теңгеріміне, тамақтануға және эндокриндік осьтерге әсер етуі мүмкін.",EN:"Clinical link: hypothalamic dysregulation may affect temperature, water balance, feeding, and endocrine axes."},
 16:{RU:"Клиническая связь: нарушения лимбико-корковых сетей могут менять мотивацию, эмоциональное обучение и контекстную регуляцию поведения.",KZ:"Клиникалық байланыс: лимбиялық-қыртыстық желілер бұзылса, мотивация, эмоциялық үйрену және мінез-құлықтың контекстік реттелуі өзгеруі мүмкін.",EN:"Clinical link: disruption of limbic–cortical networks may alter motivation, emotional learning, and contextual regulation of behavior."},
 17:{RU:"Клиническая связь: нарушение угасания страха и префронтальной регуляции миндалины связано с тревожными и травматическими расстройствами.",KZ:"Клиникалық байланыс: қорқыныштың сөнуі мен миндалинаның префронталдық реттелуінің бұзылысы мазасыздық және жарақаттық бұзылыстармен байланысты.",EN:"Clinical link: impaired fear extinction and prefrontal regulation of the amygdala are relevant to anxiety and trauma-related disorders."},
 18:{RU:"Клиническая связь: очаговое поражение коры вызывает дефицит, зависящий от локализации и сетевых связей, а не единый корковый синдром.",KZ:"Клиникалық байланыс: қыртыстың ошақтық зақымы бірыңғай синдромды емес, орналасу мен желілік байланыстарға тәуелді тапшылықты туғызады.",EN:"Clinical link: focal cortical injury causes deficits determined by location and network connections rather than one uniform cortical syndrome."},
 19:{RU:"Клиническая связь: двухточечное различение зависит от участка тела, периферической иннервации и центральной обработки; это не самостоятельный диагноз.",KZ:"Клиникалық байланыс: екі нүктені ажырату дене аймағына, шеткі иннервацияға және орталық өңдеуге тәуелді; ол жеке диагноз емес.",EN:"Clinical link: two-point discrimination depends on body region, peripheral innervation, and central processing; it is not a diagnosis by itself."},
 20:{RU:"Клиническая связь: нарушения фоторецепторов, сетчатки, зрительного нерва и коры дают разные дефекты; единый индекс не локализует поражение.",KZ:"Клиникалық байланыс: фоторецепторлар, торқабық, көру жүйкесі және қыртыс зақымдары әртүрлі тапшылық береді; бір индекс зақымды локализацияламайды.",EN:"Clinical link: photoreceptor, retinal, optic-nerve, and cortical disorders produce different deficits; one response index cannot localize a lesion."},
 21:{RU:"Клиническая связь: слух, равновесие, вкус и обоняние используют разные рецепторы и пути, поэтому адаптацию интерпретируют по модальности.",KZ:"Клиникалық байланыс: есту, тепе-теңдік, дәм және иіс әртүрлі рецепторлар мен жолдарды қолданады, сондықтан бейімделу модальдық бойынша түсіндіріледі.",EN:"Clinical link: hearing, balance, taste, and smell use distinct receptors and pathways, so adaptation must be interpreted by modality."},
 22:{RU:"Клиническая связь: автономная недостаточность может проявляться ортостатической гипотензией и нарушениями потоотделения, моторики ЖКТ и мочеиспускания.",KZ:"Клиникалық байланыс: автономдық жеткіліксіздік ортостатикалық гипотензиямен, терлеу, асқазан-ішек моторикасы және зәр шығару бұзылыстарымен көрінуі мүмкін.",EN:"Clinical link: autonomic failure may cause orthostatic hypotension and disturbances of sweating, gastrointestinal motility, and urination."},
 23:{RU:"Клиническая связь: нарушения кодирования, консолидации и извлечения дают разные профили памяти; один итоговый балл не определяет механизм.",KZ:"Клиникалық байланыс: кодтау, бекіту және еске түсіру бұзылыстары жадтың әртүрлі профилін береді; бір қорытынды ұпай механизмді анықтамайды.",EN:"Clinical link: impaired encoding, consolidation, and retrieval produce different memory profiles; one summary score does not identify the mechanism."},
 24:{RU:"Клиническая связь: бессонница, циркадное рассогласование и нарушения дыхания во сне требуют различной интерпретации и не сводятся к одной шкале сонливости.",KZ:"Клиникалық байланыс: ұйқысыздық, циркадалық сәйкессіздік және ұйқыдағы тыныс бұзылыстары әртүрлі түсіндіруді қажет етеді және бір ұйқышылдық шкаласына сыймайды.",EN:"Clinical link: insomnia, circadian misalignment, and sleep-disordered breathing require different interpretations and cannot be reduced to one sleepiness scale."},
 25:{RU:"Клиническая связь: пластичность поддерживает обучение и восстановление, но её направление зависит от времени, контекста и состояния сети; усиление не всегда полезно.",KZ:"Клиникалық байланыс: пластикалылық үйрену мен қалпына келуді қолдайды, бірақ оның бағыты уақытқа, контекстке және желі күйіне тәуелді; күшею әрдайым пайдалы емес.",EN:"Clinical link: plasticity supports learning and recovery, but its direction depends on timing, context, and network state; potentiation is not always beneficial."}
} as const;
const ui={
 RU:{heading:"Сначала предположите, затем проверьте",label:"Как вы думаете, что произойдёт?",start:"Запустить опыт",replay:"Попробовать ещё раз",result:"Теперь сравните результат со своим предположением.",min:"Напишите короткий прогноз — хотя бы одно предложение.",explain:"Почему получился такой результат? Напишите простыми словами: что изменилось → почему → что получилось.",finish:"Сохранить вывод",done:"Вы объяснили результат. Он учтён в прогрессе модуля.",explainMin:"Напишите хотя бы одно короткое объяснение (не менее 20 символов)."},
 KZ:{heading:"Алдымен болжаңыз, содан кейін тексеріңіз",label:"Сіздің ойыңызша не болады?",start:"Тәжірибені бастау",replay:"Қайта байқап көру",result:"Енді нәтижені өз болжамыңызбен салыстырыңыз.",min:"Қысқа болжам жазыңыз — кемінде бір сөйлем.",explain:"Неліктен осындай нәтиже шықты? Қарапайым түрде жазыңыз: не өзгерді → неліктен → қандай нәтиже болды.",finish:"Қорытындыны сақтау",done:"Нәтижені түсіндірдіңіз. Ол модуль прогресіне енгізілді.",explainMin:"Кемінде бір қысқа түсіндіру жазыңыз (20 таңбадан аз емес)."},
 EN:{heading:"Predict first, then test it",label:"What do you think will happen?",start:"Run experiment",replay:"Try again",result:"Now compare the result with your prediction.",min:"Write a short prediction—at least one sentence.",explain:"Why did this result occur? Use simple words: what changed → why → what happened.",finish:"Save conclusion",done:"You explained the result. It is included in module progress.",explainMin:"Write at least one short explanation (20 characters or more)."}
} as const;

export default function GuidedLabFrame({moduleId,language,children}:{moduleId:keyof typeof prompts;language:Language;children:ReactNode}){
  const t=ui[language];
  const [prediction,setPrediction]=useState("");
  const [started,setStarted]=useState(false);
  const [explanation,setExplanation]=useState("");
  const [finished,setFinished]=useState(false);
  const ready=prediction.trim().length>=12;
  const explanationReady=explanation.trim().length>=20;
  function finish(){
    setFinished(true);
    recordOutcome(Number(moduleId),"criterion:application:guided-lab",1,1);
    recordOutcome(Number(moduleId),"criterion:transfer:guided-lab",1,1);
  }
  return <div className={styles.frame} data-testid={`guided-lab-${moduleId}`}>
    <section className={styles.predict}>
      <h2>{t.heading}</h2>
      <p>{prompts[moduleId][language]}</p>
      <label>{t.label}<textarea rows={3} value={prediction} onChange={event=>setPrediction(event.target.value)}/></label>
      <button type="button" disabled={!ready} onClick={()=>setStarted(true)}>{t.start}</button>
      {prediction.trim().length>0&&!ready&&<p role="status">{t.min}</p>}
    </section>
    {started&&<>
      <div className={styles.experiment}>{children}</div>
      <aside className={styles.result}>
        <strong>{t.result}</strong>
        <label style={{display:"block",marginTop:12}}>{t.explain}
          <textarea rows={4} value={explanation} onChange={event=>{setExplanation(event.target.value);setFinished(false)}} style={{display:"block",width:"100%",marginTop:8}}/>
        </label>
        {!explanationReady&&explanation.trim().length>0&&<p role="status">{t.explainMin}</p>}
        <button type="button" disabled={!explanationReady} onClick={finish}>{t.finish}</button>
        {finished&&<><p role="status"><strong>{t.done}</strong></p><p>{clinical[moduleId][language]}</p></>}
        <button type="button" onClick={()=>{setStarted(false);setPrediction("");setExplanation("");setFinished(false)}}>{t.replay}</button>
      </aside>
    </>}
  </div>;
}
