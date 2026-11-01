import type { Language } from "../course";
const sections = [
  {
    id: "dorsal-column-pathway",
    title: { RU: "Задние столбы и медиальная петля", EN: "Dorsal columns and medial lemniscus", KZ: "Артқы бағандар және медиалдық ілмек" },
    text: {
      RU: "Тонкое осязание, вибрация и сознательная проприоцепция проводятся по задним столбам спинного мозга на стороне входа. После переключения в ядрах продолговатого мозга волокна перекрещиваются и формируют медиальную петлю. Затем сигнал поступает в таламус и соматосенсорную кору. Сторона чувствительного нарушения зависит от расположения очага относительно перекрёста.",
      EN: "Discriminative touch, vibration and conscious proprioception ascend ipsilaterally in the spinal dorsal columns. After relaying in the medullary nuclei, second-order fibers cross and form the medial lemniscus. Signals then reach the thalamus and somatosensory cortex. The side of sensory loss depends on lesion location relative to the crossing.",
      KZ: "Дәл жанасу, діріл және саналы проприоцепция жұлынның артқы бағандарымен өз жағында жоғарылайды. Сопақша ми ядроларында ауысқаннан кейін талшықтар айқасып, медиалдық ілмек түзеді. Одан әрі сигнал таламус пен соматосенсорлық қыртысқа жетеді."
    }
  },
  {
    id: "anterolateral-pathway",
    title: { RU: "Антеролатеральная система", EN: "Anterolateral system", KZ: "Антеролатералдық жүйе" },
    text: {
      RU: "Болевые и температурные афференты входят в задний рог, могут пройти несколько сегментов по тракту Лиссауэра и переключаются на нейроны второго порядка. Значительная часть этих нейронов пересекает переднюю белую спайку и поднимается на противоположной стороне. При одностороннем поражении спинного мозга нарушения боли и температуры могут возникать контралатерально ниже очага.",
      EN: "Pain and temperature afferents enter the dorsal horn, may travel several segments in Lissauer's tract and relay onto second-order neurons. Many of these neurons cross through the anterior white commissure and ascend contralaterally. A unilateral cord lesion may cause contralateral pain and temperature loss below the lesion.",
      KZ: "Ауырсыну мен температура афференттері артқы мүйізге еніп, Лиссауэр жолымен бірнеше сегмент өтіп, екінші нейрондарға ауысады. Көп талшық алдыңғы ақ комиссура арқылы айқасып, қарсы жақпен жоғарылайды."
    }
  },
  {
    id: "corticospinal-pathway",
    title: { RU: "Кортикоспинальный путь", EN: "Corticospinal pathway", KZ: "Кортикоспиналдық жол" },
    text: {
      RU: "Кортикоспинальные волокна проходят через лучистый венец, внутреннюю капсулу, ножки мозга, мост и пирамиды продолговатого мозга. Большинство перекрещивается в нижней части продолговатого мозга и формирует латеральный кортикоспинальный тракт. Поражение выше перекрёста обычно вызывает двигательные нарушения на противоположной стороне, а ниже перекрёста — на стороне поражения. Спастичность и гиперрефлексия могут развиваться постепенно.",
      EN: "Corticospinal fibers pass through the corona radiata, internal capsule, cerebral peduncles, pons and medullary pyramids. Most cross in the caudal medulla and form the lateral corticospinal tract. Lesions above this crossing usually produce contralateral motor deficits, while lesions below it affect the ipsilateral side. Spasticity and hyperreflexia may develop over time.",
      KZ: "Кортикоспиналдық талшықтар сәулелі тәж, ішкі капсула, ми аяқшалары, көпір және сопақша ми пирамидалары арқылы өтеді. Көпшілігі төменгі сопақша мида айқасып, латералдық жол түзеді. Айқастан жоғары зақым көбіне қарсы жақта, төменгі зақым өз жағында қозғалыс бұзылысын тудырады."
    }
  }
] as const;
export function moduleEightDetailedTheory(language: Language) {
  return sections.map(section => ({id: section.id, title: section.title[language], blocks: [{type: "paragraph" as const, text: section.text[language]}]}));
}
