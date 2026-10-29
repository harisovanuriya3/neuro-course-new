"use client";

import { useState } from "react";
import type { Language } from "../content/course";

// Qualitative pathway explorer: highlighted links are not recorded spikes,
// transmission latencies, measured strengths, or a lesion-localization test.
type Route = { name: string; nodes: [string, string, string, string]; explanation: string };
type Copy = {
  heading: string; back: string; next: string; inhibition: string;
  note: string; inhibitionDetail: string; noEarlyRelay: string;
  routes: [Route, Route, Route, Route, Route, Route];
};
const copy: Record<Language, Copy> = {
  RU: {
    heading: "Атлас таламических переключений",
    back: "Предыдущий путь", next: "Следующий путь",
    inhibition: "Показать тормозный контур",
    note: "Стрелки показывают упрощённое направление передачи. Они не отражают точную скорость, силу синапсов или все параллельные проекции. Порядок выбора путей не означает временную последовательность активности мозга.",
    inhibitionDetail: "Ретикулярное ядро таламуса (ГАМК) —| таламическое реле: тормозное влияние изменяет передачу, но не позволяет по одной схеме вычислить её величину.",
    noEarlyRelay: "Для первичного обонятельного пути обязательного первого таламического реле нет; здесь не изображено торможение такого несуществующего переключения.",
    routes: [
      { name: "Тонкое осязание тела", nodes: ["Рецепторы тела", "Задние канатики → ядра продолговатого мозга → перекрёст", "Медиальная петля → VPL", "Соматосенсорная кора"], explanation: "Вторые нейроны перекрещиваются в продолговатом мозге; соматотопия сохраняется в VPL и коре." },
      { name: "Боль и температура тела", nodes: ["Ноцицепторы / терморецепторы", "Задний рог → перекрёст в спинном мозге", "Переднебоковая система → несколько таламических мишеней", "Соматосенсорные и другие корковые сети"], explanation: "В переднебоковой системе существуют проекции не только в VPL; боль нельзя объяснить одной релейной цепью." },
      { name: "Чувствительность лица", nodes: ["Рецепторы лица", "Тройничные чувствительные ядра → соответствующий перекрёст", "Тройнично-таламические пути → VPM", "Соматосенсорная кора"], explanation: "Основное таламическое реле лица — VPM. Уровень перекрёста зависит от конкретной модальности и пути." },
      { name: "Зрение", nodes: ["Сетчатка", "Зрительный нерв → хиазма → тракт", "Латеральное коленчатое тело (LGN)", "Зрительная кора"], explanation: "Часть зрительных волокон перекрещивается в хиазме; латеральное коленчатое тело является основным зрительным реле." },
      { name: "Слух", nodes: ["Улитка", "Слуховые ядра → двусторонние стволовые пути", "Медиальное коленчатое тело (MGN)", "Слуховая кора"], explanation: "Слуховые проекции выше ствола двусторонние; медиальное коленчатое тело — таламическое слуховое реле." },
      { name: "Обоняние: исключение", nodes: ["Обонятельные рецепторы", "Обонятельная луковица", "Обонятельный тракт", "Первичная обонятельная кора"], explanation: "Первичная обонятельная кора получает вход без обязательного первого таламического переключения; последующие связи с таламусом существуют." }
    ]
  },
  EN: {
    heading: "Thalamic relay explorer",
    back: "Previous pathway", next: "Next pathway",
    inhibition: "Show inhibitory circuit",
    note: "Arrows show simplified signal direction, not exact speed, synaptic strength or all parallel projections. The order in which pathways are selected is not a timeline of brain activity.",
    inhibitionDetail: "Thalamic reticular nucleus (GABA) —| thalamic relay: inhibition modulates transmission, but its magnitude cannot be calculated from this diagram.",
    noEarlyRelay: "The primary olfactory route has no obligatory initial thalamic relay; no inhibition of a nonexistent initial relay is depicted.",
    routes: [
      { name: "Fine touch from the body", nodes: ["Body receptors", "Dorsal columns → medullary nuclei → decussation", "Medial lemniscus → VPL", "Somatosensory cortex"], explanation: "Second-order axons cross in the medulla; somatotopy is maintained in VPL and cortex." },
      { name: "Body pain and temperature", nodes: ["Nociceptors / thermoreceptors", "Dorsal horn → spinal decussation", "Anterolateral system → multiple thalamic targets", "Somatosensory and other cortical networks"], explanation: "The anterolateral system projects beyond VPL; pain cannot be explained by a single relay chain." },
      { name: "Facial sensation", nodes: ["Facial receptors", "Trigeminal sensory nuclei → pathway-specific crossing", "Trigeminothalamic pathways → VPM", "Somatosensory cortex"], explanation: "VPM is the main facial thalamic relay. Crossing level varies with modality and pathway." },
      { name: "Vision", nodes: ["Retina", "Optic nerve → chiasm → tract", "Lateral geniculate nucleus (LGN)", "Visual cortex"], explanation: "Some optic fibres cross in the chiasm; LGN is the main thalamic visual relay." },
      { name: "Hearing", nodes: ["Cochlea", "Auditory nuclei → bilateral brainstem pathways", "Medial geniculate nucleus (MGN)", "Auditory cortex"], explanation: "Ascending auditory pathways are bilateral above the brainstem; MGN is the thalamic auditory relay." },
      { name: "Olfaction: exception", nodes: ["Olfactory receptors", "Olfactory bulb", "Olfactory tract", "Primary olfactory cortex"], explanation: "Primary olfactory cortex receives input without an obligatory first thalamic relay; later thalamic connections exist." }
    ]
  },
  KZ: {
    heading: "Таламустық реле жолдарын зерттеу",
    back: "Алдыңғы жол", next: "Келесі жол",
    inhibition: "Тежегіш тізбекті көрсету",
    note: "Көрсеткілер сигналдың жеңілдетілген бағытын көрсетеді, нақты жылдамдықты, синапс күшін немесе барлық параллель проекцияларды емес. Жолдарды таңдау реті мидағы белсенділіктің уақыттық ретін білдірмейді.",
    inhibitionDetail: "Таламустың ретикулярлық ядросы (ГАМҚ) —| таламустық реле: тежелу берілісті реттейді, бірақ оның шамасын бұл сызбадан есептеу мүмкін емес.",
    noEarlyRelay: "Бастапқы иіс сезу жолында таламустың міндетті алғашқы релесі жоқ; сондықтан мұнда жоқ реленің тежелуі бейнеленбейді.",
    routes: [
      { name: "Дененің нәзік жанасуы", nodes: ["Дене рецепторлары", "Артқы бағандар → сопақша ми ядролары → айқасу", "Медиалдық ілмек → VPL", "Соматосенсорлық қыртыс"], explanation: "Екінші нейрон аксондары сопақша мида айқасады; VPL мен қыртыста соматотопия сақталады." },
      { name: "Дененің ауырсынуы мен температурасы", nodes: ["Ноцицепторлар / терморецепторлар", "Артқы мүйіз → жұлындағы айқасу", "Алдыңғы-бүйірлік жүйе → бірнеше таламустық нысана", "Соматосенсорлық және басқа қыртыстық желілер"], explanation: "Алдыңғы-бүйірлік жүйенің проекциялары VPL-мен шектелмейді; ауырсынуды бір ғана релемен түсіндіруге болмайды." },
      { name: "Бет сезімталдығы", nodes: ["Бет рецепторлары", "Үшкіл жүйке сезімтал ядролары → жолға тән айқасу", "Үшкіл-таламустық жолдар → VPM", "Соматосенсорлық қыртыс"], explanation: "Беттің негізгі таламустық релесі — VPM. Айқасу деңгейі сезімталдық түрі мен жолына тәуелді." },
      { name: "Көру", nodes: ["Торлы қабық", "Көру жүйкесі → хиазма → жол", "Латералдық тізелі дене (LGN)", "Көру қыртысы"], explanation: "Көру талшықтарының бір бөлігі хиазмада айқасады; LGN — негізгі таламустық көру релесі." },
      { name: "Есту", nodes: ["Ұлу", "Есту ядролары → ми бағанының екіжақты жолдары", "Медиалдық тізелі дене (MGN)", "Есту қыртысы"], explanation: "Ми бағанынан жоғары есту жолдары екіжақты; MGN — таламустық есту релесі." },
      { name: "Иіс сезу: ерекшелік", nodes: ["Иіс сезу рецепторлары", "Иіс сезу буылтығы", "Иіс сезу жолы", "Бастапқы иіс сезу қыртысы"], explanation: "Бастапқы иіс сезу қыртысы сигналды таламустың міндетті алғашқы релесінсіз алады; кейінгі таламустық байланыстар бар." }
    ]
  }
};

export default function ModuleFourteenMediaAnimation({ language }: { language: Language }) {
  const [routeIndex, setRouteIndex] = useState(0);
  const [showInhibition, setShowInhibition] = useState(false);
  const c = copy[language];
  const route = c.routes[routeIndex];
  const olfaction = routeIndex === 5;
  return <section data-testid="module-fourteen-media-animation"
    aria-label={c.heading} style={{background:"#102437",color:"#fff",borderRadius:16,padding:16,margin:"1rem 0"}}>
    <h3 style={{marginTop:0}}>{c.heading}</h3>
    <div role="group" aria-label={c.heading} style={{display:"flex",flexWrap:"wrap",gap:8}}>
      {c.routes.map((item,index)=><button key={index} type="button"
        aria-pressed={routeIndex===index}
        onClick={()=>{setRouteIndex(index);setShowInhibition(false);}}
        style={{borderRadius:8,padding:"8px 10px",border:"2px solid",
          borderColor:routeIndex===index?"#67e8f9":"#94a3b8",
          background:routeIndex===index?"#155e75":"#1e293b",color:"#fff"}}>
        {item.name}
      </button>)}
    </div>
    <ol aria-label={route.name} style={{display:"grid",gap:8,padding:0,listStyle:"none",margin:"1rem 0"}}>
      {route.nodes.map((node,index)=><li key={index}
        style={{background:index===2&&!olfaction?"#155e75":"#1e293b",
          border:index===2&&!olfaction?"2px solid #67e8f9":"1px solid #64748b",
          borderRadius:8,padding:12}}>
        <strong>{index+1}. {node}</strong>
        {index<route.nodes.length-1&&<span aria-hidden="true" style={{paddingLeft:12,color:"#86efac"}}>→</span>}
      </li>)}
    </ol>
    <p role="status" aria-live="polite" style={{lineHeight:1.6,minHeight:60}}>{route.explanation}</p>
    <button type="button" disabled={olfaction} aria-pressed={showInhibition}
      onClick={()=>setShowInhibition(value=>!value)}
      style={{padding:"8px 12px",borderRadius:8,marginBottom:8}}>
      {c.inhibition}
    </button>
    {showInhibition&&!olfaction&&<p role="status" aria-live="polite"
      style={{padding:12,border:"2px solid #fda4af",borderRadius:8,lineHeight:1.5}}>
      {c.inhibitionDetail}
    </p>}
    {olfaction&&<p style={{lineHeight:1.5}}>{c.noEarlyRelay}</p>}
    <p style={{fontSize:".9rem",lineHeight:1.5}}>{c.note}</p>
    <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
      <button type="button" disabled={routeIndex===0}
        onClick={()=>{setRouteIndex(value=>Math.max(0,value-1));setShowInhibition(false);}}>{c.back}</button>
      <button type="button" disabled={routeIndex===c.routes.length-1}
        onClick={()=>{setRouteIndex(value=>Math.min(c.routes.length-1,value+1));setShowInhibition(false);}}>{c.next}</button>
    </div>
  </section>;
}
