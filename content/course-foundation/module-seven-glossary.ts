import type { Language } from "../course";
import type { GlossaryLesson } from "../study";

// Module 7: stretch reflex and neural circuits. Scientific cross-check:
// Guyton & Hall 13e, Library PDF pp. 666–668; Ganong 23e, pp. 169–171;
// C. L. Ghai Practical Physiology 8e, pp. 317–319.
// The foundation's two term labels are correct, but their generic definitions
// do not match these labels. Its three learning/conditioning extras belong to
// a different topic and must not appear in this module's reflex glossary.
type Triple = Record<Language, string>;
const t = (RU: string, EN: string, KZ: string): Triple => ({ RU, EN, KZ });

const baseDefinitions = [
  t(
    "Функциональный путь от рецептора через афферентный нейрон и центральные синаптические связи к эфферентному нейрону и эффектору. Число центральных синапсов зависит от рефлекса; рефлекторная дуга не обязательно ограничена одним сегментом.",
    "A functional pathway from receptor through an afferent neuron and central synaptic connections to an efferent neuron and effector. The number of central synapses depends on the reflex; the arc need not be confined to one spinal segment.",
    "Рецептордан афференттік нейрон мен орталық синапстық байланыстар арқылы эфференттік нейронға және эффекторға баратын қызметтік жол. Орталық синапстар саны рефлекске тәуелді; доға бір ғана жұлын сегментімен шектелмеуі мүмкін."
  ),
  t(
    "При возбуждении мышцы-агониста активность альфа-мотонейронов антагониста снижается через тормозный интернейрон. В коленном рефлексе это отдельная полисинаптическая ветвь, а не прямой моносинаптический Ia→альфа-путь возбуждения четырёхглавой мышцы.",
    "When an agonist muscle is excited, an inhibitory interneuron reduces activity of alpha motor neurons supplying its antagonist. In the knee jerk this is a separate polysynaptic branch, not the direct monosynaptic Ia-to-alpha excitatory pathway to quadriceps.",
    "Агонист бұлшықет қозғанда тежегіш интернейрон антагонистің альфа-мотонейрондарының белсенділігін азайтады. Тізе рефлексінде бұл — төртбасты бұлшықетке баратын тікелей моносинапстық Ia→альфа қоздыру жолынан бөлек полисинапстық тармақ."
  )
] as const;

const extra = [
  {
    id: "spindle",
    term: t("Мышечное веретено", "Muscle spindle", "Бұлшықет ұршығы"),
    definition: t(
      "Проприорецептор в толще скелетной мышцы, содержащий интрафузальные волокна и окончания Ia и II; кодирует длину мышцы и её изменение. Удар по связке надколенника возбуждает веретено посредством растяжения четырёхглавой мышцы.",
      "A proprioceptor within skeletal muscle containing intrafusal fibers and Ia and II endings; it signals muscle length and its change. Tapping the patellar ligament excites the spindle by stretching quadriceps.",
      "Қаңқа бұлшықетінің ішіндегі интрафузалдық талшықтары мен Ia және II ұштары бар проприорецептор; бұлшықет ұзындығын және оның өзгерісін хабарлайды. Тізе байламын соғу төртбасты бұлшықетті созу арқылы ұршықты қоздырады."
    )
  },
  {
    id: "ia",
    term: t("Афферент Ia", "Group Ia afferent", "Ia тобының афференті"),
    definition: t(
      "Быстро проводящее чувствительное волокно первичного окончания мышечного веретена; сообщает о растяжении, особенно о быстром изменении длины, и непосредственно возбуждает альфа-мотонейроны гомонимной мышцы в рефлексе растяжения.",
      "A rapidly conducting sensory fiber from the primary muscle-spindle ending; it signals stretch, particularly rapid changes in length, and directly excites homonymous alpha motor neurons in the stretch reflex.",
      "Бұлшықет ұршығының бастапқы ұшынан шығатын жылдам өткізетін сезімтал талшық; созылуды, әсіресе ұзындықтың жылдам өзгерісін хабарлайды және созылу рефлексінде сол бұлшықеттің альфа-мотонейрондарын тікелей қоздырады."
    )
  },
  {
    id: "alpha",
    term: t("Альфа-мотонейрон", "Alpha motor neuron", "Альфа-мотонейрон"),
    definition: t(
      "Двигательный нейрон, иннервирующий экстрафузальные мышечные волокна и обеспечивающий силу сокращения. Его центральный возбуждающий вход от Ia-афферента при коленном рефлексе преимущественно глутаматергический; в нервно-мышечном соединении выделяется ацетилхолин.",
      "A motor neuron innervating extrafusal muscle fibers and producing contraction force. Its central excitatory Ia input in the knee jerk is predominantly glutamatergic; acetylcholine is released at the neuromuscular junction.",
      "Экстрафузалдық бұлшықет талшықтарын жүйкелендіріп, жиырылу күшін қамтамасыз ететін қозғалтқыш нейрон. Тізе рефлексіндегі Ia-афференттен келетін орталық қоздырушы кіріс негізінен глутаматергиялық; жүйке-бұлшықет түйіспесінде ацетилхолин бөлінеді."
    )
  },
  {
    id: "gamma",
    term: t("Гамма-мотонейрон", "Gamma motor neuron", "Гамма-мотонейрон"),
    definition: t(
      "Иннервирует сократимые полюса интрафузальных волокон, регулируя чувствительность веретена. Альфа–гамма-коактивация помогает сохранять чувствительность веретена при укорочении мышцы; гамма-нейрон не является основным источником силы мышцы.",
      "Innervates the contractile ends of intrafusal fibers and regulates spindle sensitivity. Alpha–gamma coactivation helps maintain spindle sensitivity during muscle shortening; gamma neurons are not the main source of muscle force.",
      "Интрафузалдық талшықтардың жиырылатын ұштарын жүйкелендіріп, ұршық сезімталдығын реттейді. Альфа–гамма бірге белсенуі бұлшықет қысқарғанда ұршық сезімталдығын сақтауға көмектеседі; гамма-нейрон бұлшықет күшінің негізгі көзі емес."
    )
  },
  {
    id: "golgi",
    term: t("Сухожильный орган Гольджи", "Golgi tendon organ", "Гольджи сіңір мүшесі"),
    definition: t(
      "Проприорецептор в области соединения мышцы с сухожилием, чувствительный прежде всего к мышечному напряжению; передаёт сигналы по Ib-афферентам. Не является основным рецептором коленного рефлекса растяжения.",
      "A proprioceptor near the muscle–tendon junction sensitive primarily to muscle tension; it signals through group Ib afferents. It is not the primary receptor for the knee-jerk stretch reflex.",
      "Бұлшықет пен сіңір түйіскен аймақта орналасып, негізінен бұлшықет керілуіне сезімтал проприорецептор; сигналды Ib-афференттерімен жеткізеді. Тізе созылу рефлексінің негізгі рецепторы емес."
    )
  },
  {
    id: "monosynaptic",
    term: t("Моносинаптический рефлекторный путь", "Monosynaptic reflex pathway", "Моносинапстық рефлекстік жол"),
    definition: t(
      "Центральная связь с одним синапсом между афферентом и эфферентным нейроном. Основная Ia→альфа-ветвь рефлекса растяжения моносинаптическая, но весь наблюдаемый ответ зависит и от других звеньев.",
      "A central connection with one synapse between afferent and efferent neurons. The principal Ia-to-alpha stretch-reflex branch is monosynaptic, but the observed response also depends on other components.",
      "Афференттік және эфференттік нейрондар арасында бір орталық синапсы бар байланыс. Созылу рефлексінің негізгі Ia→альфа тармағы моносинапстық, бірақ байқалатын жауап басқа буындарға да тәуелді."
    )
  },
  {
    id: "polysynaptic",
    term: t("Полисинаптический рефлекторный путь", "Polysynaptic reflex pathway", "Полисинапстық рефлекстік жол"),
    definition: t(
      "Путь, в котором между афферентным и эфферентным нейронами имеется один или более интернейронов и не менее двух центральных синапсов; пример — реципрокное торможение антагониста при рефлексе растяжения.",
      "A pathway with one or more interneurons and at least two central synapses between afferent and efferent neurons; reciprocal inhibition of the antagonist during stretch reflex is an example.",
      "Афференттік және эфференттік нейрондар арасында кемінде бір интернейроны және екі орталық синапсы бар жол; созылу рефлексіндегі антагонистің реципроктық тежелуі — мысал."
    )
  },
  {
    id: "jendrassik",
    term: t("Манёвр Ендрассика", "Jendrassik maneuver", "Ендрассик әдісі"),
    definition: t(
      "Приём подкрепления сухожильного рефлекса: испытуемый сцепляет пальцы и тянет кисти в разные стороны во время удара по сухожилию. Может облегчить выявление слабого коленного рефлекса, но не устанавливает место повреждения и не гарантирует нормальность дуги.",
      "A tendon-reflex reinforcement maneuver: the person interlocks the fingers and pulls the hands apart during tendon percussion. It can facilitate a weak knee jerk but neither localizes a lesion nor proves that the arc is normal.",
      "Сіңір рефлексін күшейту тәсілі: зерттелуші саусақтарын айқастырып, сіңірді соққан кезде қолдарын екі жаққа тартады. Әлсіз тізе рефлексін анықтауға көмектесуі мүмкін, бірақ зақым орнын анықтамайды және доғаның қалыпты екенін дәлелдемейді."
    )
  }
] as const;

export function createModuleSevenGlossary(language: Language, base: GlossaryLesson): GlossaryLesson {
  if (base.kind !== "glossary" || base.terms.length < 2) {
    throw new Error("Module 7 requires its two original reflex glossary terms");
  }
  return {
    ...base,
    introduction: t(
      "Разберите дугу коленного рефлекса: рецептор и афферент Ia, прямое возбуждение альфа-мотонейрона, отдельную тормозную ветвь и ограничения клинической пробы.",
      "Trace the knee-jerk arc: spindle receptor and Ia afferent, direct alpha-motor excitation, a separate inhibitory branch and the limits of clinical examination.",
      "Тізе рефлексінің доғасын талдаңыз: ұршық рецепторы мен Ia-афференті, альфа-мотонейронның тікелей қозуы, бөлек тежегіш тармақ және клиникалық сынаманың шектеулері."
    )[language],
    terms: [
      ...base.terms.slice(0, 2).map((entry, index) => ({
        ...entry,
        definition: baseDefinitions[index][language],
        target: { section: "theory" as const, anchor: index === 0 ? "reflex-arc-path" : "inhibition-and-tendon" }
      })),
      ...extra.map(item => ({
        id: "module-7-glossary-" + item.id,
        term: item.term[language],
        definition: item.definition[language],
        target: { section: "theory" as const,
          anchor: item.id === "gamma" || item.id === "spindle" || item.id === "ia"
            ? "spindle-and-gamma"
            : item.id === "golgi" || item.id === "polysynaptic"
              ? "inhibition-and-tendon"
              : item.id === "jendrassik"
                ? "reflex-examination-limits"
                : "reflex-arc-path" }
      }))
    ]
  };
}
