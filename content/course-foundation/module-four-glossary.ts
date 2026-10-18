import type { Language } from '../course';
import type { GlossaryLesson } from '../study';

// Original definitions reviewed against Guyton & Hall 13e ch. 5
// (Library PDF 68–75), Ganong 23e ch. 4 (PDF 96–99),
// and C. L. Ghai Practical Physiology 8e chart 5-5 (PDF 379–380).
// The base glossary already includes action potential and refractory period.
type Entry = { key: string; RU: [string, string]; EN: [string, string]; KZ: [string, string] };
const entries: Entry[] = [
  { key: 'resting-vm',
    RU: ['Потенциал покоя', 'Разность электрических потенциалов между внутренней и наружной сторонами мембраны в отсутствие распространяющегося импульса; определяется ионными градиентами и относительной проницаемостью мембраны.'],
    EN: ['Resting membrane potential', 'The voltage difference across a cell membrane in the absence of a propagated spike, determined by ionic gradients and relative membrane permeabilities.'],
    KZ: ['Тыныштық мембраналық потенциалы', 'Таралатын импульс болмаған кезде мембрананың ішкі және сыртқы жақтары арасындағы потенциалдар айырмасы; иондық градиенттер мен мембрананың салыстырмалы өткізгіштігіне тәуелді.'] },
  { key: 'nernst',
    RU: ['Равновесный потенциал Нернста', 'Мембранный потенциал, при котором электрохимические силы для одного вида ионов уравновешены и его суммарный поток через избирательно проницаемую мембрану равен нулю.'],
    EN: ['Nernst equilibrium potential', 'The membrane voltage at which the electrochemical driving force for one ion species is zero, so its net flux across a selectively permeable membrane vanishes.'],
    KZ: ['Нернст тепе-теңдік потенциалы', 'Бір ион түрінің электрохимиялық қозғаушы күші нөлге тең болып, таңдамалы өткізгіш мембрана арқылы сол ионның жиынтық ағыны тоқтайтын мембраналық потенциал.'] },
  { key: 'goldman',
    RU: ['Уравнение Гольдмана — Ходжкина — Катца', 'Приближённое выражение для мембранного потенциала через концентрации и относительные проницаемости нескольких ионов; учебный расчёт модуля включает K⁺ и Na⁺, но не Cl⁻ и прямой электрогенный ток насоса.'],
    EN: ['Goldman–Hodgkin–Katz equation', 'An approximation for membrane voltage using concentrations and relative permeabilities of several ions; this module’s calculation includes K⁺ and Na⁺ but omits Cl⁻ and the pump’s direct electrogenic current.'],
    KZ: ['Гольдман — Ходжкин — Кац теңдеуі', 'Бірнеше ионның концентрациялары мен салыстырмалы өткізгіштіктері арқылы мембраналық потенциалды жуықтап есептейтін теңдеу; модульдің оқу есебіне K⁺ пен Na⁺ кіреді, ал Cl⁻ пен сорғының тікелей электрогендік тогы кірмейді.'] },
  { key: 'permeability',
    RU: ['Относительная ионная проницаемость', 'Способность мембраны пропускать определённый вид ионов по сравнению с другими; вместе с концентрационным градиентом определяет вклад иона в потенциал мембраны.'],
    EN: ['Relative ionic permeability', 'How readily the membrane permits one ion species to cross compared with others; together with concentration gradients it determines that ion’s contribution to membrane voltage.'],
    KZ: ['Салыстырмалы иондық өткізгіштік', 'Мембрананың бір ион түрін басқаларымен салыстырғанда қаншалықты оңай өткізетінін сипаттайтын шама; концентрация градиенттерімен бірге сол ионның мембраналық потенциалға үлесін анықтайды.'] },
  { key: 'pump',
    RU: ['Na⁺/K⁺-АТФаза', 'За счёт АТФ переносит за цикл три Na⁺ наружу и два K⁺ внутрь, поддерживая градиенты и внося электрогенный вклад в Vm; не является причиной быстрой реполяризации каждого потенциала действия.'],
    EN: ['Na⁺/K⁺-ATPase', 'Uses ATP to move three Na⁺ out and two K⁺ in per cycle, maintaining gradients and contributing an electrogenic current to Vm; it does not cause the rapid repolarization of each action potential.'],
    KZ: ['Na⁺/K⁺-АТФаза', 'АТФ энергиясын пайдаланып, әр циклде үш Na⁺ ионын сыртқа, екі K⁺ ионын ішке тасымалдайды; градиенттерді сақтайды және Vm-ға электрогендік үлес қосады, бірақ әр әрекет потенциалының жылдам реполяризациясын тудырмайды.'] },
  { key: 'threshold',
    RU: ['Порог возбуждения', 'При данных условиях минимальный уровень деполяризации, достаточный для запуска регенеративного потенциала действия; порог зависит от состояния каналов и не равен одной универсальной величине Vm.'],
    EN: ['Excitation threshold', 'Under specified conditions, the minimum depolarization needed to initiate a regenerative action potential; threshold depends on channel state and is not one universal Vm value.'],
    KZ: ['Қозу табалдырығы', 'Белгілі жағдайларда регенеративті әрекет потенциалын бастауға жеткілікті ең аз деполяризация деңгейі; табалдырық арналардың күйіне тәуелді және Vm-ның барлық жасушаға ортақ бір мәні емес.'] },
  { key: 'graded-response',
    RU: ['Локальный градуальный ответ', 'Локальное изменение мембранного потенциала, величина которого зависит от стимула; оно может остаться подпороговым или достичь порога и вызвать потенциал действия. При пассивном распространении амплитуда градуального ответа уменьшается с расстоянием.'],
    EN: ['Local graded response', 'A local membrane-voltage change whose magnitude depends on stimulus strength; it may remain subthreshold or reach threshold and trigger an action potential. Its amplitude decays with distance during passive spread.'],
    KZ: ['Жергілікті градуалды жауап', 'Шамасы стимул күшіне тәуелді мембраналық потенциалдың жергілікті өзгерісі; ол табалдырықтан төмен қалуы немесе табалдырыққа жетіп, әрекет потенциалын туғызуы мүмкін. Пассивті таралғанда градуалды жауап амплитудасы қашықтық артқан сайын азаяды.'] },
  { key: 'absolute-refractory',
    RU: ['Абсолютный рефрактерный период', 'Интервал, когда в данном участке возбудимой мембраны невозможно вызвать новый полноценный потенциал действия независимо от силы стимула; преимущественно связан с инактивацией потенциал-зависимых Na⁺-каналов.'],
    EN: ['Absolute refractory period', 'The interval when a second full action potential cannot be initiated in the same excitable membrane region regardless of stimulus strength, mainly because voltage-gated Na⁺ channels are inactivated.'],
    KZ: ['Абсолютті рефрактерлік кезең', 'Қозғыш мембрананың сол аймағында стимул қанша күшті болса да жаңа толық әрекет потенциалын бастау мүмкін болмайтын аралық; негізінен кернеуге тәуелді Na⁺ арналарының инактивациясына байланысты.'] },
  { key: 'relative-refractory',
    RU: ['Относительный рефрактерный период', 'Интервал частичного восстановления возбудимости, когда новый импульс возможен, но обычно требует более сильного стимула из-за неполного восстановления Na⁺-каналов и сохраняющейся K⁺-проводимости.'],
    EN: ['Relative refractory period', 'A period of partial excitability recovery when another spike is possible but usually requires a stronger stimulus because Na⁺-channel recovery is incomplete and K⁺ conductance may remain elevated.'],
    KZ: ['Салыстырмалы рефрактерлік кезең', 'Қозғыштық ішінара қалпына келетін, жаңа импульс туындауы мүмкін, бірақ Na⁺ арналары толық қалпына келмегендіктен және K⁺ өткізгіштігі жоғары болуы мүмкін болғандықтан, әдетте күштірек стимул қажет болатын аралық.'] },
];

export function createModuleFourGlossary(language: Language, base: GlossaryLesson): GlossaryLesson {
  if (base.kind !== 'glossary' || base.terms.length < 2) {
    throw new Error('Module 4 foundation glossary structure changed');
  }
  const additions = entries.map(entry => ({
    id: 'module-4-reviewed-' + entry.key,
    term: entry[language][0],
    definition: entry[language][1],
    target: { section: 'theory' as const },
  }));
  const terms = [...base.terms, ...additions];
  const locale = language === 'EN' ? 'en' : language === 'RU' ? 'ru' : 'kk';
  if (new Set(terms.map(item => item.term.toLocaleLowerCase(locale))).size !== terms.length) {
    throw new Error('Module 4 glossary contains duplicate terms: ' + language);
  }
  return { ...base, terms };
}
