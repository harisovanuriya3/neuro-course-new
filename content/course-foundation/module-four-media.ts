import type { Language } from '../course';
import type { MediaLesson } from '../media';

// Mechanisms checked with Guyton & Hall 13e PDF 69–72,
// Ganong 23e PDF 96–99 and C. L. Ghai 8e PDF 379–381.
type Copy = {
  intro: string; preview: string; transcript: [string,string,string,string];
  prompt: string; explanation: string; options: [string,string,string]; feedback: [string,string,string];
};
const authored: Record<Language,Copy> = {
  RU: {
    intro: 'Четыре фазы потенциала действия: учебная схема изменений Na⁺- и K⁺-проводимости, а не запись с живого аксона.',
    preview: 'Перед переходом к следующей фазе назовите состояние Na⁺- и K⁺-каналов и направление ионного тока. Время и напряжение на рисунке условны.',
    transcript: [
      'Покой: внутри мембраны отрицательный потенциал; K⁺-проницаемость покоя относительно высока, а большинство потенциал-зависимых Na⁺-каналов доступны для активации.',
      'Порог и восходящая фаза: быстрое открытие потенциал-зависимых Na⁺-каналов вызывает вход Na⁺ и регенеративную деполяризацию. Вершина импульса не достигает E(Na).',
      'Реполяризация: Na⁺-каналы инактивируются, а задержанное увеличение K⁺-проводимости способствует выходу K⁺ и снижению мембранного потенциала.',
      'Следовая гиперполяризация: K⁺-каналы закрываются медленно, Na⁺-каналы восстанавливаются после инактивации. Na⁺/K⁺-АТФаза поддерживает градиенты, но не формирует быстрый спад каждого импульса.'
    ],
    prompt: 'Почему после реполяризации мембранный потенциал может стать более отрицательным, чем в покое?',
    explanation: 'Повышенная K⁺-проводимость некоторое время смещает Vm к E(K); при закрытии каналов Vm возвращается к покою. Длительность и глубина фазы зависят от клетки.',
    options: [
      'Восстановление Na⁺-каналов само по себе выводит положительный заряд наружу.',
      'K⁺-каналы закрываются с задержкой, и K⁺-проводимость временно остаётся повышенной.',
      'Na⁺/K⁺-АТФаза мгновенно усиливается и формирует спад каждого импульса.'
    ],
    feedback: [
      'Восстановление доступности Na⁺-каналов важно для следующего импульса, но не объясняет следовую гиперполяризацию само по себе.',
      'Верно: сохраняющаяся K⁺-проводимость смещает Vm к E(K).',
      'Насос поддерживает градиенты во времени, но не вызывает быструю реполяризацию отдельного импульса.'
    ]
  },
  EN: {
    intro: 'Four action-potential phases: a teaching schematic of Na⁺ and K⁺ conductance, not a recording from a living axon.',
    preview: 'Before advancing, predict Na⁺- and K⁺-channel states and ionic current direction. Time and voltage markers are illustrative.',
    transcript: [
      'Rest: the inside is negative; resting K⁺ permeability is relatively high and most voltage-gated Na⁺ channels are available for activation.',
      'Threshold and upstroke: rapid voltage-gated Na⁺-channel activation causes Na⁺ influx and regenerative depolarization. The spike peak does not reach E(Na).',
      'Repolarization: Na⁺ channels inactivate and delayed K⁺ conductance promotes K⁺ efflux, bringing voltage back toward negative values.',
      'After-hyperpolarization: K⁺ channels close slowly and Na⁺ channels recover from inactivation. Na⁺/K⁺-ATPase maintains gradients but does not cause each spike downstroke.'
    ],
    prompt: 'Why may membrane voltage briefly become more negative than rest after repolarization?',
    explanation: 'Elevated K⁺ conductance temporarily shifts Vm toward E(K); closing the channels returns Vm toward rest. Depth and duration vary by cell type.',
    options: [
      'Recovery of Na⁺-channel availability itself moves positive charge outward.',
      'K⁺ channels close with a delay, leaving K⁺ conductance elevated for a time.',
      'Na⁺/K⁺-ATPase suddenly accelerates and causes the downstroke of each spike.'
    ],
    feedback: [
      'Na⁺-channel recovery permits later spikes but does not alone explain the after-hyperpolarization.',
      'Correct: persistent K⁺ conductance shifts Vm toward E(K).',
      'The pump maintains gradients over time rather than driving fast repolarization of each spike.'
    ]
  },
  KZ: {
    intro: 'Әрекет потенциалының төрт фазасы: тірі аксоннан алынған жазба емес, Na⁺ пен K⁺ өткізгіштігінің оқу сызбасы.',
    preview: 'Келесі фазаға өтпей тұрып Na⁺ және K⁺ арналарының күйін және ион ағынының бағытын болжаңыз. Уақыт пен кернеу шартты түрде көрсетілген.',
    transcript: [
      'Тыныштық: мембрананың ішкі жағы теріс; K⁺ өткізгіштігі салыстырмалы жоғары, Na⁺ арналарының көпшілігі белсенуге дайын.',
      'Табалдырық және көтерілу: кернеуге тәуелді Na⁺ арналары тез ашылып, Na⁺ ішке енеді де регенеративті деполяризация тудырады. Шың E(Na) мәніне жетпейді.',
      'Реполяризация: Na⁺ арналары инактивацияланады, ал кешігіп артқан K⁺ өткізгіштігі K⁺ сыртқа шығуына және потенциалдың төмендеуіне ықпал етеді.',
      'Кейінгі гиперполяризация: K⁺ арналары баяу жабылады, Na⁺ арналары инактивациядан қалпына келеді. Na⁺/K⁺-АТФаза градиенттерді сақтайды, бірақ әр импульстің жылдам төмендеуін тудырмайды.'
    ],
    prompt: 'Неліктен реполяризациядан кейін мембраналық потенциал тыныштық деңгейінен де теріс болуы мүмкін?',
    explanation: 'K⁺ өткізгіштігі біраз уақыт жоғары болып, Vm мәнін E(K) жағына ығыстырады. Арналар жабылғанда Vm тыныштық деңгейіне оралады. Фазаның ұзақтығы мен тереңдігі жасуша түріне тәуелді.',
    options: [
      'Na⁺ арналарының қалпына келуі өздігінен оң зарядты сыртқа шығарады.',
      'K⁺ арналары кеш жабылып, K⁺ өткізгіштігі біраз уақыт жоғары сақталады.',
      'Na⁺/K⁺-АТФаза кенеттен жылдамдап, әр импульстің төмендеуін тудырады.'
    ],
    feedback: [
      'Na⁺ арналарының қалпына келуі келесі импульс үшін маңызды, бірақ кейінгі гиперполяризацияны өздігінен түсіндірмейді.',
      'Дұрыс: сақталған K⁺ өткізгіштігі Vm-ді E(K) жағына ығыстырады.',
      'Сорғы градиенттерді сақтайды, бірақ жеке импульстің жылдам реполяризациясын тудырмайды.'
    ]
  }
};
export function createModuleFourMedia(language:Language,base:MediaLesson):MediaLesson {
 const m=authored[language];
 return {...base,introduction:m.intro,blocks:[{
  id:'module-4-action-potential-phases',
  title:language==='RU'?'Фазы потенциала действия':language==='EN'?'Action-potential phases':'Әрекет потенциалының фазалары',
  preview:m.preview,transcript:m.transcript,theoryAnchor:'mechanism',animation:'foundation',
  question:{
   prompt:m.prompt,correctAnswer:'b',explanation:m.explanation,
   options:m.options.map((text,index)=>({id:['a','b','c'][index],text,feedback:m.feedback[index]}))
  }
 }]};
}
