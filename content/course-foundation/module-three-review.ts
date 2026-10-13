import type { Language } from "../course";
import type { ObjectivesLesson, ReadingLesson } from "../study";
import { getSectionTitle } from "../sections";

// Module 3: outcomes and retrieval practice based on physiological mechanisms.
// Sources: Ganong 23e pp. 82, 85 (PDF 94, 97); Guyton & Hall 13e p. 72
// (PDF 79); C. L. Ghai 8e p. 228 (PDF 250).
const outcomes: Record<Language, [string,string][]> = {
 RU: [
  ["Функциональные зоны нейрона","Определить зоны приёма, генерации, проведения и передачи сигнала; объяснить, почему не у всех нейронов импульс начинается в начальном сегменте аксона."],
  ["Нейроглия и микросреда","Сравнить астроциты, микроглию, олигодендроциты и шванновские клетки; указать, кто образует миелин в ЦНС и ПНС."],
  ["Миелин и перехваты Ранвье","Объяснить роль изоляции межузловых участков и регенерации потенциала действия в перехватах при сальтаторном проведении."],
  ["Прогноз при демиелинизации","Предсказать возможное замедление или блок проведения при утрате миелина и отличить это от нарушения внеклеточного K⁺-гомеостаза."],
  ["Оценка скорости проведения","Использовать расстояние между двумя точками стимуляции и разность латентностей; отличить экспериментальную оценку от условных чисел симулятора."]
 ],
 EN: [
  ["Functional zones of a neuron","Identify signal input, spike initiation, conduction and output zones; explain why spikes do not always originate at the axon initial segment."],
  ["Glia and extracellular environment","Compare astrocytes, microglia, oligodendrocytes and Schwann cells; identify the myelin-forming cells in the CNS and PNS."],
  ["Myelin and nodes of Ranvier","Explain how internodal insulation and action-potential regeneration at nodes support saltatory conduction."],
  ["Effects of demyelination","Predict possible slowing or failure of conduction after myelin loss and distinguish this from impaired extracellular K⁺ homeostasis."],
  ["Estimating conduction velocity","Use the distance between two stimulation sites and the latency difference; distinguish experimental measurements from illustrative simulator values."]
 ],
 KZ: [
  ["Нейронның функционалдық аймақтары","Сигналды қабылдау, әрекет потенциалын бастау, өткізу және беру аймақтарын көрсетіп, импульс барлық нейронда аксонның бастапқы сегментінде тумайтынын түсіндіру."],
  ["Нейроглия және жасушадан тыс орта","Астроциттер, микроглия, олигодендроциттер мен Шванн жасушаларын салыстырып, ОЖЖ мен ШЖЖ-де миелин түзетін жасушаларды атау."],
  ["Миелин және Ранвье түйіндері","Түйінаралық оқшаулану мен түйіндерде әрекет потенциалының қайта түзілуі секірмелі өткізуді қалай қамтамасыз ететінін түсіндіру."],
  ["Демиелинденудің салдары","Миелин жоғалғанда өткізудің баяулауы немесе бөгелуі мүмкін екенін болжап, оны жасушадан тыс K⁺ гомеостазының бұзылуынан ажырату."],
  ["Өткізу жылдамдығын бағалау","Екі тітіркендіру нүктесінің арақашықтығын және латенттілік айырмасын пайдаланып, тәжірибелік өлшемді симулятордың шартты нәтижесінен ажырату."]
 ]
};
const review: Record<Language, [string,string,"theory"|"interactive"|"practice"][]> = {
 RU: [
  ["1. Где возникает импульс?","Назовите функциональные зоны нейрона. У первичного чувствительного нейрона импульс может начинаться в периферическом отростке или первом перехвате, а не в начальном сегменте аксона.","theory"],
  ["2. Зачем нужен миелин?","Объясните изоляцию межузловых участков и регенерацию потенциала действия в перехватах Ранвье. Как демиелинизация влияет на проведение?","interactive"],
  ["3. Что показывает латентность?","Расстояние между двумя точками стимуляции — 0,20 м, разность латентностей — 4 мс. Рассчитайте скорость (50 м/с). Почему одиночная латентность мышечного ответа включает не только время проведения по нерву?","practice"]
 ],
 EN: [
  ["1. Where does a spike start?","Name the functional zones of a neuron. A primary sensory neuron may initiate a spike in its peripheral process or first node, rather than an axon initial segment.","theory"],
  ["2. Why is myelin important?","Explain internodal insulation and action-potential regeneration at nodes of Ranvier. How can demyelination affect conduction?","interactive"],
  ["3. What does latency mean?","Two stimulation sites are 0.20 m apart and their latency difference is 4 ms. Calculate velocity (50 m/s). Why does one muscle-response latency include more than nerve conduction time?","practice"]
 ],
 KZ: [
  ["1. Импульс қайда басталады?","Нейронның функционалдық аймақтарын атаңыз. Бастапқы сезімтал нейронда импульс аксонның бастапқы сегментінде емес, шеткі өсіндіде немесе алғашқы Ранвье түйінінде басталуы мүмкін.","theory"],
  ["2. Миелин не үшін қажет?","Түйінаралық оқшаулану мен Ранвье түйіндерінде әрекет потенциалының қайта түзілуін түсіндіріңіз. Демиелиндену өткізуді қалай өзгертуі мүмкін?","interactive"],
  ["3. Латенттілік нені білдіреді?","Екі тітіркендіру нүктесінің арасы 0,20 м, латенттілік айырмасы 4 мс. Жылдамдықты есептеңіз (50 м/с). Неліктен бұлшықет жауабының жалғыз латенттілігі тек нерв бойымен өткізу уақытын қамтымайды?","practice"]
 ]
};
export function createModuleThreeObjectives(language:Language):ObjectivesLesson {
 return {
  kind:"objectives",title:getSectionTitle("objectives",language),
  introduction:language==="RU"?"После изучения модуля студент сможет:":language==="EN"?"After completing this module, the student will be able to:":"Модульді аяқтағаннан кейін студент:",
  outcomes:outcomes[language].map(([title,description],i)=>({id:`module-3-objective-${i+1}`,title,description})),
  navigation:{
   title:language==="RU"?"Перейти к изучению модуля":language==="EN"?"Continue learning":"Модульді оқуға өту",
   pathwayLabel:language==="RU"?"Рекомендуемый маршрут":language==="EN"?"Recommended pathway":"Ұсынылатын оқу бағыты",
   links:[{section:"theory"},{section:"practice"},{section:"cases"},{section:"interactive"},{section:"virtual-patient"}]
  }
 };
}
export function createModuleThreeMinute(language:Language):ReadingLesson {
 return {
  kind:"one-minute",title:getSectionTitle("one-minute",language),
  introduction:language==="RU"?"Восстановите три причинно-следственные связи без подсказки.":language==="EN"?"Recall three causal links without hints.":"Үш себеп-салдарлық байланысты көмексіз еске түсіріңіз.",
  cards:review[language].map(([title,paragraph,section],i)=>({
   id:`module-3-one-minute-${i+1}`,title,paragraphs:[paragraph],links:[{section}]
  }))
 };
}
