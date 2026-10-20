import type { Language } from "../course";
import type { GlossaryLesson } from "../study";
import { getSectionTitle } from "../sections";

// Module 5 only: the foundation glossary incorrectly paired "Ionotropic receptor"
// with a definition of "synapse" and "Neuromodulation" with "neurotransmitter".
// Mechanisms checked against Ganong 23e, ch. 6 (PDF 127–130),
// Guyton & Hall 13e, ch. 46 (PDF 556–558); Ghai 8e, expt. 4-9
// (PDF 353–354) illustrates an isolated nerve–muscle preparation.
type Triple = Record<Language, string>;
type Entry = { id: string; term: Triple; definition: Triple };
const t = (RU: string, EN: string, KZ: string): Triple => ({ RU, EN, KZ });
const entries: Entry[] = [
  { id: "ionotropic", term: t("Ионотропный рецептор", "Ionotropic receptor", "Ионотроптық рецептор"),
    definition: t("Рецептор-ионный канал: связывание медиатора изменяет проводимость канала и вызывает быстрый постсинаптический ток.",
      "A receptor that is itself an ion channel: transmitter binding changes its conductance and produces a fast postsynaptic current.",
      "Өзі иондық арна болып табылатын рецептор: медиатор байланысқанда өткізгіштік өзгеріп, жылдам постсинапстық ток пайда болады.") },
  { id: "neuromodulation", term: t("Нейромодуляция", "Neuromodulation", "Нейромодуляция"),
    definition: t("Изменение возбудимости, эффективности синапсов или активности сети, часто через внутриклеточные сигнальные пути; эффект зависит от рецепторов и состояния клеток.",
      "A change in excitability, synaptic efficacy or network activity, often through intracellular signaling; the effect depends on receptors and cellular state.",
      "Қозғыштықтың, синапстық берілу тиімділігінің немесе жүйке желісі белсенділігінің өзгеруі; ол көбіне жасушаішілік сигналдық жолдар арқылы іске асады және рецепторлар мен жасуша күйіне тәуелді.") },
  { id: "chemical", term: t("Химический синапс", "Chemical synapse", "Химиялық синапс"),
    definition: t("Контакт, где пресинаптическая клетка выделяет медиатор, действующий на рецепторы другой клетки; вызванное выделение обычно зависит от входа Ca²⁺.",
      "A junction where a presynaptic cell releases transmitter that acts on another cell's receptors; evoked release usually depends on Ca²⁺ entry.",
      "Пресинапстық жасуша медиатор бөліп, ол келесі жасушаның рецепторларына әсер ететін түйісу; шақырылған бөліну әдетте Ca²⁺ енуіне тәуелді.") },
  { id: "transmitter", term: t("Нейромедиатор", "Neurotransmitter", "Нейромедиатор"),
    definition: t("Химический сигнальный агент, выделяемый нейроном и действующий на специфические рецепторы; его эффект определяется рецептором и ионными градиентами.",
      "A chemical signal released by a neuron that acts on specific receptors; its effect depends on receptor properties and ionic gradients.",
      "Нейрон бөліп шығаратын және арнайы рецепторларға әсер ететін химиялық сигнал; әсері рецептор қасиеті мен иондық градиенттерге тәуелді.") },
  { id: "metabotropic", term: t("Метаботропный рецептор", "Metabotropic receptor", "Метаботроптық рецептор"),
    definition: t("Рецептор, влияющий на каналы и другие клеточные процессы через внутриклеточные сигнальные пути, а не образующий сам ионный канал.",
      "A receptor that regulates channels and other cellular processes through intracellular signaling rather than forming an ion channel itself.",
      "Өзі иондық арна түзбейтін, бірақ жасушаішілік сигналдық жолдар арқылы арналар мен басқа үдерістерді реттейтін рецептор.") },
  { id: "quantal", term: t("Квантовое выделение", "Quantal release", "Кванттық бөліну"),
    definition: t("Медиатор выделяется отдельными порциями из везикул; вероятность их высвобождения при импульсе зависит, в частности, от пресинаптического Ca²⁺.",
      "Transmitter is released in discrete vesicular packets; release probability during a spike depends in part on presynaptic Ca²⁺.",
      "Медиатор көпіршіктерден жеке үлестермен бөлінеді; импульс кезіндегі бөліну ықтималдығы пресинапстық Ca²⁺ мөлшеріне де тәуелді.") },
  { id: "epsp", term: t("Возбуждающий постсинаптический потенциал", "Excitatory postsynaptic potential (EPSP)", "Қоздырушы постсинапстық потенциал"),
    definition: t("Градуальное изменение мембранного потенциала, повышающее вероятность достижения порога; один ВПСП не обязан вызывать потенциал действия.",
      "A graded membrane-potential change that increases the likelihood of reaching spike threshold; one EPSP need not trigger a spike.",
      "Әрекет потенциалының табалдырығына жету ықтималдығын арттыратын градуалды мембраналық өзгеріс; бір жауап міндетті түрде импульс туғызбайды.") },
  { id: "shunting", term: t("Шунтирующее торможение", "Shunting inhibition", "Шунттаушы тежелу"),
    definition: t("Увеличение мембранной проводимости снижает влияние возбуждающего тока на напряжение; заметная гиперполяризация не обязательна.",
      "Increased membrane conductance reduces the voltage response to excitatory current; marked hyperpolarization is not required.",
      "Мембраналық өткізгіштіктің артуы қоздырушы токтың кернеуге әсерін азайтады; айқын гиперполяризация міндетті емес.") },
  { id: "electrical", term: t("Электрический синапс", "Electrical synapse", "Электрлік синапс"),
    definition: t("Передача ионного тока через щелевые контакты между клетками без везикулярного выделения медиатора; связь может быть двусторонней или выпрямляющей.",
      "Ionic-current coupling through gap junctions without vesicular transmitter release; coupling can be bidirectional or rectifying.",
      "Медиатордың көпіршіктерден бөлінуінсіз жасушалар арасындағы саңылаулы түйіспелер арқылы иондық токтың өтуі; байланыс екі бағытты немесе бағытқа тәуелді болуы мүмкін.") },
  { id: "endplate", term: t("Двигательная концевая пластинка", "Motor end plate", "Қозғалтқыш соңғы пластинка"),
    definition: t("Специализированная постсинаптическая область мембраны скелетного мышечного волокна в нервно-мышечном соединении.",
      "The specialized postsynaptic region of skeletal-muscle membrane at the neuromuscular junction.",
      "Жүйке-бұлшықет түйіспесіндегі қаңқа бұлшықеті талшығы мембранасының маманданған постсинапстық бөлігі.") },
  { id: "nachr", term: t("Никотиновый ацетилхолиновый рецептор", "Nicotinic acetylcholine receptor", "Никотиндік ацетилхолин рецепторы"),
    definition: t("Лиганд-зависимый катионный канал; на мышечной концевой пластинке его открытие обычно вызывает деполяризацию.",
      "A ligand-gated cation channel whose opening at the muscle end plate normally produces depolarization.",
      "Лигандпен ашылатын катиондық арна; бұлшықеттің соңғы пластинкасында оның ашылуы әдетте деполяризация туғызады.") },
  { id: "ache", term: t("Ацетилхолинэстераза", "Acetylcholinesterase", "Ацетилхолинэстераза"),
    definition: t("Фермент, расщепляющий ацетилхолин в нервно-мышечном соединении и завершающий действие медиатора.",
      "An enzyme that hydrolyzes acetylcholine at the neuromuscular junction, terminating transmitter action.",
      "Жүйке-бұлшықет түйіспесінде ацетилхолинді ыдыратып, медиатор әсерін тоқтататын фермент.") },
];
export function createModuleFiveGlossary(language: Language): GlossaryLesson {
  return {
    kind: "glossary",
    title: getSectionTitle("glossary", language),
    introduction: t(
      "Термины с механизмом и ограничениями; начните с различия рецептора и медиатора.",
      "Mechanism-focused terms; begin by distinguishing receptor from transmitter.",
      "Тетіктерге негізделген терминдер; алдымен рецептор мен медиаторды ажыратыңыз."
    )[language],
    terms: entries.map(item => ({
      id: "module-5-glossary-" + item.id,
      term: item.term[language],
      definition: item.definition[language],
      target: { section: "theory" as const },
    })),
  };
}
