import type { Language } from '../course';
import type { GlossaryLesson } from '../study';

// Module 3: original definitions checked against Ganong 23e, ch. 4
// (PDF pp. 92–94), Guyton & Hall 13e, ch. 5 (PDF pp. 78–79),
// and C. L. Ghai 8e, motor nerve conduction (PDF pp. 250–251).
// Keep existing neuron, myelin, BBB, CSF and astrocyte entries.
type Entry = { key: string; RU: [string, string]; EN: [string, string]; KZ: [string, string] };
const entries: Entry[] = [
  {key:'microglia',
   RU:['Микроглия','Резидентные иммунные клетки ЦНС, осуществляющие надзор, ответ на повреждение и фагоцитоз клеточного детрита; не формируют миелин.'],
   EN:['Microglia','Resident immune cells of the CNS that survey tissue, respond to injury and phagocytose cellular debris; they do not form myelin.'],
   KZ:['Микроглия','ОЖЖ-нің резиденттік иммундық жасушалары: тінді қадағалайды, зақымға жауап береді және жасуша қалдықтарын фагоцитоздайды; миелин түзбейді.']},
  {key:'oligodendrocyte',
   RU:['Олигодендроцит','Клетка макроглии ЦНС, отростки которой образуют миелиновые сегменты на нескольких аксонах; отличается от шванновской клетки ПНС.'],
   EN:['Oligodendrocyte','A CNS macroglial cell whose processes form myelin internodes on multiple axons, unlike a myelinating Schwann cell in the PNS.'],
   KZ:['Олигодендроцит','ОЖЖ макроглиясының жасушасы; өсінділері бірнеше аксонда миелинді сегменттер түзеді, ал ШЖЖ-де бұл қызметті шванн жасушалары атқарады.']},
  {key:'schwann',
   RU:['Миелинизирующая шванновская клетка','Клетка ПНС, образующая один миелиновый межузловой сегмент одного аксона; немиелинизирующие шванновские клетки также поддерживают мелкие аксоны.'],
   EN:['Myelinating Schwann cell','A PNS cell that forms one myelin internode on one axon; nonmyelinating Schwann cells also support small axons.'],
   KZ:['Миелин түзетін шванн жасушасы','ШЖЖ жасушасы бір аксонның бір түйінаралық миелин сегментін түзеді; миелин түзбейтін шванн жасушалары да ұсақ аксондарды қолдайды.']},
  {key:'ranvier',
   RU:['Перехват Ранвье','Короткий немиелинизированный участок аксона между межузловыми сегментами, где высокая плотность потенциал-зависимых Na⁺-каналов обеспечивает регенерацию потенциала действия.'],
   EN:['Node of Ranvier','A short unmyelinated axonal gap between internodes where a high density of voltage-gated Na⁺ channels supports action-potential regeneration.'],
   KZ:['Ранвье түйіні','Миелинді сегменттердің арасындағы аксонның қысқа ашық бөлігі; мұнда кернеуге тәуелді Na⁺ арналарының тығыздығы жоғары болып, әрекет потенциалы қайта түзіледі.']},
  {key:'saltatory',
   RU:['Сальтаторное проведение','Распространение возбуждения по миелинизированному аксону: местный ток проходит под миелином, а потенциал действия регенерируется в последовательных перехватах Ранвье.'],
   EN:['Saltatory conduction','Propagation along a myelinated axon: local current spreads beneath myelin and the action potential is regenerated at successive nodes of Ranvier.'],
   KZ:['Сальтаторлық өткізу','Миелинденген аксонда жергілікті ток миелин астымен таралады, ал әрекет потенциалы келесі Ранвье түйіндерінде қайта түзіледі.']},
  {key:'demyelination',
   RU:['Демиелинизация','Утрата или повреждение миелиновой оболочки; увеличивает межузловую утечку тока и ёмкостную нагрузку, может замедлить проведение либо вызвать блок без разрыва аксона.'],
   EN:['Demyelination','Loss or damage of myelin that increases internodal current leakage and capacitive load and may slow or block conduction even without axonal transection.'],
   KZ:['Демиелиндену','Миелин қабығының жоғалуы не зақымдануы; түйінаралық токтың ағып кетуі мен сыйымдылық жүктемесін арттырып, аксон үзілмесе де өткізуді баяулатуы не бөгелтуі мүмкін.']},
  {key:'pseudounipolar',
   RU:['Псевдоуниполярный чувствительный нейрон','Нейрон спинномозгового узла, у которого единый отросток разделяется на периферическую и центральную ветви; сома расположена сбоку от основного пути проведения.'],
   EN:['Pseudounipolar sensory neuron','A dorsal-root-ganglion neuron whose single process divides into peripheral and central branches; the soma lies off the main conduction path.'],
   KZ:['Псевдоуниполярлы сезгіш нейрон','Жұлын түйінінің нейроны; бір өсіндісі шеткі және орталық тармақтарға бөлінеді, ал сомасы негізгі өткізу жолының жанында орналасады.']},
  {key:'cmap',
   RU:['М-ответ (CMAP)','Суммарный потенциал действия мышцы, регистрируемый после стимуляции моторного нерва; его начальная латентность включает нервное проведение, нервно-мышечную передачу и возбуждение мышцы.'],
   EN:['Compound muscle action potential (CMAP)','The summed muscle electrical response evoked by motor-nerve stimulation; its onset latency includes nerve conduction, neuromuscular transmission and muscle excitation.'],
   KZ:['Жиынтық бұлшықет әрекет потенциалы (М-жауап, CMAP)','Моторлық жүйкені тітіркендіргенде тіркелетін бұлшықеттің жиынтық электрлік жауабы; басталу латенттілігіне жүйке бойымен өткізу, жүйке-бұлшықет берілісі және бұлшықеттің қозуы кіреді.']},
  {key:'motor-velocity',
   RU:['Сегментарная скорость моторного проведения','Две точки стимуляции одного нерва: скорость равна расстоянию вдоль сегмента, делённому на разность проксимальной и дистальной начальных латентностей М-ответа; оценка требует контроля температуры.'],
   EN:['Segmental motor conduction velocity','For two stimulation sites on the same nerve, the distance along the segment divided by the proximal-minus-distal CMAP onset-latency difference; temperature must be controlled.'],
   KZ:['Моторлық өткізудің сегменттік жылдамдығы','Бір жүйкенің екі нүктесін тітіркендіргенде сегмент бойындағы арақашықтық М-жауаптың проксималдық және дисталдық басталу латенттіліктерінің айырмасына бөлінеді; температураны бақылау қажет.']}
];

export function createModuleThreeGlossary(language: Language, base: GlossaryLesson): GlossaryLesson {
  if (base.kind !== 'glossary' || base.terms.length < 5) {
    throw new Error('Module 3 foundation glossary structure changed');
  }
  const additions = entries.map(entry => ({
    id: 'module-3-reviewed-' + entry.key,
    term: entry[language][0],
    definition: entry[language][1],
    target: { section: 'theory' as const },
  }));
  const terms = [...base.terms, ...additions];
  if (new Set(terms.map(term => term.term.toLocaleLowerCase(language === 'EN' ? 'en' : language === 'RU' ? 'ru' : 'kk'))).size !== terms.length) {
    throw new Error('Module 3 glossary contains duplicate terms: ' + language);
  }
  return { ...base, terms };
}
