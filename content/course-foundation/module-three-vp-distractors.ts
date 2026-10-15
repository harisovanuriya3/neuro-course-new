import type { Language } from '../course';

// Wrong alternatives must not be valid actions from later scenario stages.
export const gliaDistractors: Record<Language, [string,string][]> = {
  RU: [
    ['Не измерять внеклеточный K⁺.', 'Считать любое изменение K⁺ необратимым повреждением.'],
    ['Одновременно менять температуру и стимуляцию.', 'Считать результаты равными без сравнения.'],
    ['Утверждать, что K⁺ всегда увеличивает частоту разрядов.', 'Считать, что K⁺ не влияет на мембранный потенциал.'],
    ['Менять одновременно захват K⁺ и температуру.', 'Назвать концентрацию K⁺ скоростью проведения.'],
    ['Поставить клинический диагноз по компьютерной модели.', 'Отрицать все другие механизмы удаления K⁺.'],
    ['Приписать миелинизацию ЦНС астроцитам.', 'Приписать миелинизацию ПНС микроглии.']
  ],
  EN: [
    ['Do not measure extracellular K⁺.', 'Treat any K⁺ change as irreversible injury.'],
    ['Change temperature and stimulation simultaneously.', 'Assume the responses are equal without comparing them.'],
    ['Claim K⁺ always increases firing rate.', 'Claim K⁺ cannot affect membrane potential.'],
    ['Change K⁺ uptake and temperature together.', 'Call K⁺ concentration conduction velocity.'],
    ['Diagnose a person from the computer model.', 'Exclude all other K⁺ clearance mechanisms.'],
    ['Assign CNS myelination to astrocytes.', 'Assign PNS myelination to microglia.']
  ],
  KZ: [
    ['Жасушадан тыс K⁺ өлшемеу.', 'K⁺ өзгерісін қайтымсыз зақым деп санау.'],
    ['Температура мен стимуляцияны бірге өзгерту.', 'Салыстырмай-ақ жауаптар бірдей деу.'],
    ['K⁺ әрқашан разряд жиілігін арттырады деу.', 'K⁺ мембрана потенциалына әсер етпейді деу.'],
    ['K⁺ қармауы мен температураны қатар өзгерту.', 'K⁺ концентрациясын өткізу жылдамдығы деп атау.'],
    ['Компьютерлік модельмен адамға диагноз қою.', 'K⁺ әкетудің басқа механизмдерін жоққа шығару.'],
    ['ОЖЖ миелинін астроциттер түзеді деу.', 'ШЖЖ миелинін микроглия түзеді деу.']
  ]
};
