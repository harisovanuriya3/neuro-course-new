"use client";

import {useMemo,useState} from "react";
import type {Language} from "../content/course";
import AnatomyReference from "./AnatomyReference";

type Fiber="GSE"|"SVE"|"GVE"|"GSA"|"GVA"|"SSA"|"SVA";
const copy={
 RU:{
  title:"Черепные нервы и типы нервных волокон",
  intro:"Выберите тип волокон и посмотрите, какие функции и черепные нервы с ним связаны. Затем выберите нерв, чтобы увидеть его состав.",
  fiber:"Тип волокон",nerve:"Черепной нерв",function:"Что проводят",examples:"Где встречаются",composition:"Состав нерва",
  fibers:{
   GSE:["Общие соматические эфферентные","Двигательные команды к скелетным мышцам, происходящим из сомитов","III, IV, VI, XII"],
   SVE:["Специальные висцеральные эфферентные","Двигательные волокна к мышцам, развившимся из жаберных дуг","V, VII, IX, X, XI"],
   GVE:["Общие висцеральные эфферентные","Парасимпатические преганглионарные волокна к гладким мышцам и железам","III, VII, IX, X"],
   GSA:["Общие соматические афферентные","Осязание, боль, температура и проприоцепция от кожи, слизистых и глубоких тканей","V; небольшие компоненты VII, IX, X"],
   GVA:["Общие висцеральные афферентные","Сигналы от внутренних органов и сосудистых рецепторов","IX, X"],
   SSA:["Специальные соматические афферентные","Зрение, слух и равновесие","II, VIII"],
   SVA:["Специальные висцеральные афферентные","Обоняние и вкус","I, VII, IX, X"]
  },
  nerves:{
   I:["Обонятельный","SVA","обоняние"],
   II:["Зрительный","SSA","зрение"],
   III:["Глазодвигательный","GSE + GVE","движения глаза, поднятие века, сужение зрачка и аккомодация"],
   IV:["Блоковый","GSE","верхняя косая мышца глаза"],
   V:["Тройничный","GSA + SVE","чувствительность лица и жевательные мышцы"],
   VI:["Отводящий","GSE","латеральная прямая мышца глаза"],
   VII:["Лицевой","SVE + GVE + SVA + GSA","мимика, слёзные/слюнные железы, вкус передних 2/3 языка, небольшая соматическая чувствительность"],
   VIII:["Преддверно-улитковый","SSA","слух и равновесие"],
   IX:["Языкоглоточный","SVE + GVE + SVA + GVA + GSA","глотание, околоушная железа, вкус задней 1/3 языка, каротидные рецепторы, чувствительность глотки"],
   X:["Блуждающий","SVE + GVE + SVA + GVA + GSA","глотание/голос, парасимпатическая регуляция грудных и брюшных органов, висцеральная чувствительность"],
   XI:["Добавочный","SVE","грудино-ключично-сосцевидная и трапециевидная мышцы"],
   XII:["Подъязычный","GSE","мышцы языка"]
  },
  lesion:"Виртуальная проба: выключить нерв",normal:"Норма",deficit:"Ожидаемый дефицит",note:"Важно: это функциональная классификация волокон. В учебной литературе отдельные компоненты и происхождение XI нерва могут классифицироваться немного по-разному; ориентируйтесь на принятую в вашем курсе схему.",deficits:{I:"снижение или потеря обоняния",II:"нарушение зрения и афферентного звена зрачкового рефлекса",III:"птоз, глаз отклонён кнаружи и книзу, мидриаз, нарушение аккомодации",IV:"диплопия, особенно при взгляде вниз и внутрь",V:"снижение чувствительности лица, слабость жевательных мышц; ослабление афферентного звена корнеального рефлекса",VI:"невозможность нормально отвести глаз кнаружи, горизонтальная диплопия",VII:"слабость мимических мышц, нарушение эфферентного звена корнеального рефлекса; возможны нарушения вкуса и секреции",VIII:"снижение слуха, шум, головокружение или нарушение равновесия",IX:"нарушение вкуса задней 1/3 языка и афферентного звена глоточного рефлекса; дисфагия возможна",X:"дисфония, дисфагия, отклонение язычка от стороны поражения и нарушение парасимпатической/висцеральной функции",XI:"слабость поворота головы и подъёма плеча",XII:"язык отклоняется в сторону периферического поражения; слабость движений языка"}
 },
 EN:{
  title:"Cranial nerves and fiber types",intro:"Choose a fiber type to see its function and related cranial nerves. Then choose a nerve to see its fiber composition.",
  fiber:"Fiber type",nerve:"Cranial nerve",function:"What it carries",examples:"Where it occurs",composition:"Nerve composition",
  fibers:{
   GSE:["General somatic efferent","Motor output to skeletal muscles derived from somites","III, IV, VI, XII"],
   SVE:["Special visceral efferent","Branchial motor output to muscles derived from pharyngeal arches","V, VII, IX, X, XI"],
   GVE:["General visceral efferent","Preganglionic parasympathetic output to smooth muscle and glands","III, VII, IX, X"],
   GSA:["General somatic afferent","Touch, pain, temperature, and proprioceptive input from skin, mucosa, and deep tissues","V; small components of VII, IX, X"],
   GVA:["General visceral afferent","Signals from viscera and vascular receptors","IX, X"],
   SSA:["Special somatic afferent","Vision, hearing, and balance","II, VIII"],
   SVA:["Special visceral afferent","Smell and taste","I, VII, IX, X"]
  },
  nerves:{
   I:["Olfactory","SVA","smell"],II:["Optic","SSA","vision"],III:["Oculomotor","GSE + GVE","eye movement, eyelid elevation, pupillary constriction and accommodation"],IV:["Trochlear","GSE","superior oblique muscle"],V:["Trigeminal","GSA + SVE","facial sensation and muscles of mastication"],VI:["Abducens","GSE","lateral rectus muscle"],VII:["Facial","SVE + GVE + SVA + GSA","facial expression, lacrimal/salivary glands, taste from anterior 2/3 of tongue, small somatic sensory component"],VIII:["Vestibulocochlear","SSA","hearing and balance"],IX:["Glossopharyngeal","SVE + GVE + SVA + GVA + GSA","swallowing, parotid gland, taste from posterior 1/3 of tongue, carotid receptors, pharyngeal sensation"],X:["Vagus","SVE + GVE + SVA + GVA + GSA","swallowing/voice, parasympathetic control of thoracic and abdominal organs, visceral sensation"],XI:["Accessory","SVE","sternocleidomastoid and trapezius"],XII:["Hypoglossal","GSE","tongue muscles"]
  },
  lesion:"Virtual test: switch off nerve",normal:"Normal",deficit:"Expected deficit",note:"This is a functional fiber classification. Some textbooks classify individual components, especially the accessory nerve, slightly differently; follow the scheme used in your course.",deficits:{I:"reduced or absent smell",II:"visual loss and impaired afferent limb of the pupillary light reflex",III:"ptosis, eye down and out, mydriasis, impaired accommodation",IV:"diplopia, especially looking down and in",V:"reduced facial sensation and weak mastication; impaired afferent corneal reflex",VI:"impaired eye abduction with horizontal diplopia",VII:"facial weakness and impaired efferent corneal reflex; taste/secretory deficits may occur",VIII:"hearing loss, tinnitus, vertigo, or balance problems",IX:"loss of taste from posterior tongue and impaired afferent gag reflex; dysphagia may occur",X:"dysphonia, dysphagia, uvula deviation away from the lesion, and autonomic/visceral dysfunction",XI:"weak head turn and shoulder elevation",XII:"tongue deviates toward a peripheral lesion with tongue weakness"}
 },
 KZ:{
  title:"Бассүйек нервтері және талшық түрлері",intro:"Талшық түрін таңдап, оның қызметі мен қай бассүйек нервтерінде кездесетінін көріңіз. Кейін нервтің құрамын қараңыз.",
  fiber:"Талшық түрі",nerve:"Бассүйек нерві",function:"Не өткізеді",examples:"Қай жерде кездеседі",composition:"Нерв құрамы",
  fibers:{
   GSE:["Жалпы соматикалық эфференттік","Сомиттерден дамыған қаңқа бұлшықеттеріне қозғалтқыш команда","III, IV, VI, XII"],
   SVE:["Арнайы висцералдық эфференттік","Жұтқыншақ доғаларынан дамыған бұлшықеттерге қозғалтқыш талшықтар","V, VII, IX, X, XI"],
   GVE:["Жалпы висцералдық эфференттік","Тегіс бұлшықет пен бездерге парасимпатикалық преганглионарлық талшықтар","III, VII, IX, X"],
   GSA:["Жалпы соматикалық афференттік","Тері, шырышты қабық және терең тіндерден жанасу, ауырсыну, температура және проприоцепция","V; VII, IX, X нервтерінде шағын компоненттер"],
   GVA:["Жалпы висцералдық афференттік","Ішкі мүшелер мен тамыр рецепторларынан сигнал","IX, X"],
   SSA:["Арнайы соматикалық афференттік","Көру, есту және тепе-теңдік","II, VIII"],
   SVA:["Арнайы висцералдық афференттік","Иіс және дәм","I, VII, IX, X"]
  },
  nerves:{
   I:["Иіс сезу","SVA","иіс сезу"],II:["Көру","SSA","көру"],III:["Көз қимылдатқыш","GSE + GVE","көз қозғалысы, қабақты көтеру, қарашықты тарылту және аккомодация"],IV:["Шығыршық","GSE","көздің жоғарғы қиғаш бұлшықеті"],V:["Үшкіл","GSA + SVE","бет сезімталдығы және шайнау бұлшықеттері"],VI:["Әкеткіш","GSE","көздің латералды тік бұлшықеті"],VII:["Бет","SVE + GVE + SVA + GSA","мимика, жас/сілекей бездері, тілдің алдыңғы 2/3 дәмі, шағын соматикалық сезімталдық"],VIII:["Кіреберіс-ұлу","SSA","есту және тепе-теңдік"],IX:["Тіл-жұтқыншақ","SVE + GVE + SVA + GVA + GSA","жұту, құлақмаңы безі, тілдің артқы 1/3 дәмі, каротид рецепторлары, жұтқыншақ сезімталдығы"],X:["Кезбе","SVE + GVE + SVA + GVA + GSA","жұту/дауыс, кеуде және құрсақ мүшелерінің парасимпатикалық реттелуі, висцералдық сезімталдық"],XI:["Қосымша","SVE","төс-бұғана-емізікше және трапеция тәрізді бұлшықеттер"],XII:["Тіласты","GSE","тіл бұлшықеттері"]
  },
  lesion:"Виртуалды сынама: нервті ажырату",normal:"Қалыпты",deficit:"Күтілетін тапшылық",note:"Бұл функционалдық талшық жіктемесі. Кейбір оқулықтарда жеке компоненттер, әсіресе XI нерв, сәл басқаша жіктелуі мүмкін; курста қабылданған сызбаны ұстаныңыз.",deficits:{I:"иіс сезудің төмендеуі немесе жоғалуы",II:"көрудің бұзылысы және қарашық жарық рефлексінің афференттік бөлігінің бұзылысы",III:"птоз, көздің сыртқа және төмен ауытқуы, мидриаз, аккомодацияның бұзылысы",IV:"әсіресе төмен және ішке қарағанда диплопия",V:"бет сезімталдығының төмендеуі, шайнау әлсіздігі; корнеалдық рефлекстің афференттік бөлігінің әлсіреуі",VI:"көзді сыртқа әкетудің бұзылысы және көлденең диплопия",VII:"мимикалық әлсіздік және корнеалдық рефлекстің эфференттік бөлігінің бұзылысы; дәм/секреция бұзылыстары болуы мүмкін",VIII:"естудің төмендеуі, құлақтағы шу, бас айналу немесе тепе-теңдік бұзылысы",IX:"тілдің артқы 1/3 дәмінің және жұтқыншақ рефлексінің афференттік бөлігінің бұзылысы; дисфагия болуы мүмкін",X:"дисфония, дисфагия, тілшіктің зақымнан қарама-қарсы жаққа ауытқуы және вегетативтік/висцералдық бұзылыстар",XI:"басты бұру және иықты көтеру әлсіздігі",XII:"тіл перифериялық зақым жағына ауытқиды, тіл қимылы әлсірейді"}
 }
} as const;

export default function CranialNerveFiberLab({language}:{language:Language}){
 const t=copy[language];
 const [fiber,setFiber]=useState<Fiber>("GSA");
 const [nerve,setNerve]=useState("V");
 const [lesion,setLesion]=useState(false);
 const f=t.fibers[fiber];
 const n=t.nerves[nerve as keyof typeof t.nerves];
 const fiberKeys=Object.keys(t.fibers) as Fiber[];
 const nerveKeys=Object.keys(t.nerves);
 return <section style={{margin:"24px 0",padding:18,border:"1px solid #cfe0ea",borderRadius:16,background:"#fff"}}>
  <h2>{t.title}</h2><p>{t.intro}</p><AnatomyReference moduleId={10} language={language}/>
  <h3>{t.fiber}</h3>
  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{fiberKeys.map(k=><button key={k} type="button" aria-pressed={fiber===k} onClick={()=>setFiber(k)}>{k}</button>)}</div>
  <div style={{marginTop:10,padding:"12px 14px",background:"#f8fcff",borderRadius:12}}>
   <p><strong>{fiber} — {f[0]}</strong></p><p><strong>{t.function}:</strong> {f[1]}</p><p><strong>{t.examples}:</strong> {f[2]}</p>
  </div>
  <h3>{t.nerve}</h3>
  <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>{nerveKeys.map(k=><button key={k} type="button" aria-pressed={nerve===k} onClick={()=>setNerve(k)}>{k}</button>)}</div>
  <div style={{marginTop:10,padding:"12px 14px",background:"#f8fcff",borderRadius:12}}>
   <p><strong>{nerve}. {n[0]}</strong></p><p><strong>{t.composition}:</strong> {n[1]}</p><p>{n[2]}</p>
   <button type="button" aria-pressed={lesion} onClick={()=>setLesion(v=>!v)}>{t.lesion}</button>
   <p style={{marginTop:10}}><strong>{lesion?t.deficit:t.normal}:</strong> {lesion?t.deficits[nerve as keyof typeof t.deficits]:n[2]}</p>
  </div>
  <p style={{fontSize:14}}>{t.note}</p>
 </section>;
}
