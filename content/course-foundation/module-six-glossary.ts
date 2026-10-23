import type { Language } from "../course";
import type { GlossaryLesson } from "../study";

// Scientific comparison: Ganong 23e PDF pp. 132–134, Guyton & Hall 13e
// PDF pp. 563–565. Ghai 8e pp. 353–354 is a peripheral preparation,
// not a direct measurement of central synaptic integration.
type Triple = Record<Language, string>;
const t = (RU: string, EN: string, KZ: string): Triple => ({ RU, EN, KZ });

const correctedBase: Record<Language, [string, string]> = {
  RU: [
    "Суммация — объединение постсинаптических потенциалов во времени и пространстве; результат зависит от интервала, расположения и электрических свойств нейрона.",
    "Шунтирующее торможение — увеличение мембранной проводимости, уменьшающее входное сопротивление и отклонение напряжения при том же возбуждающем токе; гиперполяризация не обязательна."
  ],
  EN: [
    "Summation combines postsynaptic potentials across time and space; the result depends on intervals, location and neuronal electrical properties.",
    "Shunting inhibition increases membrane conductance, reducing input resistance and the voltage response to the same excitatory current; hyperpolarization is not required."
  ],
  KZ: [
    "Суммация — постсинапстық потенциалдардың уақыт пен кеңістікте бірігуі; нәтиже уақыт аралығына, орналасуына және нейронның электрлік қасиеттеріне тәуелді.",
    "Шунттаушы тежелу — мембрана өткізгіштігінің артуы кіріс кедергісін және бірдей қоздырушы ток кезіндегі кернеу ауытқуын азайтады; гиперполяризация міндетті емес."
  ]
};

const extra = [
  { id:"epsp",
    term:t("Возбуждающий постсинаптический потенциал (ВПСП)","Excitatory postsynaptic potential (EPSP)","Қоздырушы постсинапстық потенциал (ҚПСП)"),
    definition:t("Градуальный ответ постсинаптической мембраны, повышающий вероятность разряда в заданных условиях; один ВПСП не обязательно достигает порога.",
      "A graded postsynaptic response increasing firing probability under specified conditions; a single EPSP need not reach threshold.",
      "Берілген жағдайда разряд ықтималдығын арттыратын градуалды постсинапстық жауап; бір ҚПСП табалдырыққа міндетті түрде жетпейді.") },
  { id:"ipsp",
    term:t("Тормозный постсинаптический потенциал (ТПСП)","Inhibitory postsynaptic potential (IPSP)","Тежеуші постсинапстық потенциал (ТПСП)"),
    definition:t("Постсинаптический ответ, уменьшающий вероятность разряда в данных условиях; может зависеть от Cl⁻- или K⁺-проводимости, но торможение не всегда требует гиперполяризации.",
      "A postsynaptic response reducing firing probability under the given conditions; it may involve Cl⁻ or K⁺ conductance, and inhibition need not require hyperpolarization.",
      "Берілген жағдайда разряд ықтималдығын азайтатын постсинапстық жауап; ол Cl⁻ немесе K⁺ өткізгіштігіне тәуелді болуы мүмкін, ал тежелу үшін гиперполяризация әрқашан қажет емес.") },
  { id:"temporal",
    term:t("Временная суммация","Temporal summation","Уақыттық суммация"),
    definition:t("Наложение ответов, возникших близко по времени, пока предыдущие ещё не затухли; зависит от временной постоянной мембраны.",
      "Overlap of responses close enough in time that earlier responses have not decayed; depends on membrane time constant.",
      "Алдыңғы жауаптар басылмай тұрып, уақыт жағынан жақын жауаптардың қабаттасуы; мембрананың уақыт тұрақтысына тәуелді.") },
  { id:"spatial",
    term:t("Пространственная суммация","Spatial summation","Кеңістіктік суммация"),
    definition:t("Совместное влияние сигналов разных синаптических входов; результат зависит от их положения, времени и электрических свойств дендритов.",
      "Combined influence of signals from distinct synaptic inputs; the result depends on their location, timing and dendritic electrical properties.",
      "Әртүрлі синапстық кірістер сигналдарының бірлескен әсері; нәтиже олардың орнына, уақытына және дендриттердің электрлік қасиеттеріне тәуелді.") },
  { id:"reversal",
    term:t("Потенциал реверсии Cl⁻-тока (ECl)","Chloride-current reversal potential (ECl)","Cl⁻ тогының реверсия потенциалы (ECl)"),
    definition:t("Мембранный потенциал, при котором суммарный ток через данную Cl⁻-проводимость равен нулю; направление тока определяется электрохимической движущей силой.",
      "The voltage at which net current through the specified Cl⁻ conductance is zero; current direction depends on electrochemical driving force.",
      "Берілген Cl⁻ өткізгіштігі арқылы өтетін жиынтық ток нөлге тең болатын мембрана потенциалы; ток бағыты электрохимиялық қозғаушы күшке тәуелді.") },
  { id:"presynaptic",
    term:t("Пресинаптическое торможение","Presynaptic inhibition","Пресинапстық тежелу"),
    definition:t("Снижение эффективности выделения медиатора до постсинаптического ответа, например при уменьшении входа Ca²⁺ в окончание; не тождественно ТПСП.",
      "Reduced transmitter release before the postsynaptic response, for example following lower terminal Ca²⁺ entry; not identical to an IPSP.",
      "Постсинапстық жауапқа дейін медиатор бөлінуінің төмендеуі, мысалы, ұшқа Ca²⁺ енуі азайғанда; ол ТПСП-мен бірдей емес.") }
] as const;

export function createModuleSixGlossary(language: Language, base: GlossaryLesson): GlossaryLesson {
  if (base.terms.length < 2) throw new Error("Module 6 glossary requires two terms");
  return {
    ...base,
    introduction: t(
      "Различайте изменение мембранного потенциала, проводимости и вероятности разряда. Сверяйте определения с опытами модуля.",
      "Distinguish membrane voltage, conductance and firing probability. Relate each term to the module experiments.",
      "Мембрана потенциалын, өткізгіштікті және разряд ықтималдығын ажыратыңыз. Терминдерді модуль тәжірибелерімен салыстырыңыз."
    )[language],
    terms: [
      ...base.terms.slice(0,2).map((entry,index)=>({
        ...entry, definition: correctedBase[language][index]
      })),
      ...extra.map(entry=>({
        id: "module-6-glossary-" + entry.id,
        term: entry.term[language],
        definition: entry.definition[language],
        target: { section: "theory" as const }
      }))
    ]
  };
}
