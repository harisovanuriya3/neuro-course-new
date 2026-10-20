import type { Language } from '../course';
import { getSectionTitle } from '../sections';
import type { ReadingLesson } from '../study';

// Ganong 23e ch. 6, PDF 127–130; Guyton & Hall 13e ch. 46, PDF 556–558.
// Ghai 8e PDF 353–354 covers the isolated nerve-muscle preparation,
// not direct measurement of central electrical synapses.
const recap: Record<Language, [string, string, string, string, string]> = {
  RU: [
    'Химическая передача: потенциал действия достигает окончания, открываются потенциал-зависимые Ca²⁺-каналы; вход Ca²⁺ запускает экзоцитоз везикул. Блокада входа Ca²⁺ уменьшает вызванное выделение медиатора, но не обязательно блокирует приход импульса.',
    'Ионотропные рецепторы непосредственно меняют ионную проводимость, а метаботропные действуют через внутриклеточные сигнальные пути. Эффект зависит от рецептора, ионной движущей силы и состояния клетки, а не только от названия медиатора.',
    'Возбуждающие и тормозные постсинаптические влияния суммируются во времени и пространстве. Импульс возникает, если деполяризация в зоне его инициации достигает порога; результат зависит от расположения входов, мембранной проводимости и доступности потенциал-зависимых Na⁺-каналов.',
    'Электрические синапсы проводят ионный ток через щелевые контакты без везикулярного выделения медиатора. Передача часто двунаправленная, но бывает выпрямляющей; проводимость контактов регулируется.',
    'Лабораторная анимация блокады Ca²⁺ или рецепторов — упрощённая детерминированная модель. Реальное выделение везикул вероятностно; возможны спонтанные миниатюрные ответы. По этой модели нельзя оценить число квантов или установить диагноз.',
  ],
  EN: [
    'Chemical transmission: a terminal action potential opens voltage-gated Ca²⁺ channels; Ca²⁺ influx triggers vesicle exocytosis. Blocking Ca²⁺ entry reduces evoked transmitter release without necessarily preventing arrival of the impulse.',
    'Ionotropic receptors directly change ionic conductance, whereas metabotropic receptors act through intracellular signalling. Effects depend on receptor subtype, ionic driving force and cell state, not the transmitter name alone.',
    'Excitatory and inhibitory postsynaptic influences summate across time and space. A spike begins when depolarization at the initiation region reaches threshold; synapse location, membrane conductance and availability of voltage-gated Na⁺ channels affect the outcome.',
    'Electrical synapses pass ionic current through gap junctions without vesicular transmitter release. Coupling is often bidirectional but can rectify, and junctional conductance can be regulated.',
    'The Ca²⁺-entry and receptor-block animations are simplified deterministic models. Real vesicle release is probabilistic, and spontaneous miniature events can occur. The model cannot count release quanta or establish a diagnosis.',
  ],
  KZ: [
    'Химиялық беріліс: әрекет потенциалы жүйке ұшына жеткенде потенциалға тәуелді Ca²⁺ арналары ашылады; Ca²⁺ енуі везикулалардың экзоцитозын іске қосады. Ca²⁺ енуін бөгеу шақырылған медиатор бөлінуін азайтады, бірақ импульстің келуін міндетті түрде тоқтатпайды.',
    'Ионотроптық рецепторлар иондық өткізгіштікті тікелей өзгертеді, ал метаботроптық рецепторлар жасушаішілік сигналдық жолдар арқылы әсер етеді. Нәтиже медиатордың атауына ғана емес, рецепторға, иондық қозғаушы күшке және жасушаның күйіне тәуелді.',
    'Қоздырушы және тежеуші постсинапстық әсерлер уақыт пен кеңістік бойынша қосылады. Импульс басталатын аймақта деполяризация табалдырыққа жетсе, әрекет потенциалы туындайды; нәтиже кірістердің орналасуына, мембраналық өткізгіштікке және кернеуге тәуелді Na⁺ арналарының қолжетімділігіне байланысты.',
    'Электрлік синапстарда иондық ток саңылаулы түйіспелер арқылы медиатордың везикуладан бөлінуінсіз өтеді. Байланыс көбіне екі бағытты, бірақ бір бағытта басым өткізетін түйіспелер де болады; өткізгіштік реттеле алады.',
    'Ca²⁺ енуін немесе рецепторларды бөгеу анимациясы — ықшамдалған, нәтижесі алдын ала анықталған модель. Нақты везикула бөлінуі ықтималдық сипатта; өздігінен миниатюралық жауаптар болуы мүмкін. Модель бөліну кванттарын есептемейді және диагноз қоюға жарамайды.',
  ],
};

export function createModuleFiveSummary(language: Language): ReadingLesson {
  return {
    kind: 'one-minute',
    title: getSectionTitle('one-minute', language),
    introduction: language === 'RU' ? 'Пять физиологических выводов о синапсах.'
      : language === 'EN' ? 'Five physiological takeaways about synapses.'
      : 'Синапстар туралы бес физиологиялық қорытынды.',
    cards: recap[language].map((paragraph, index) => ({
      id: 'module-5-recap-' + (index + 1),
      title: (index + 1) + '. ' + (language === 'RU' ? ['Химическая передача','Рецепторы','Интеграция','Электрическая передача','Границы модели'][index]
        : language === 'EN' ? ['Chemical transmission','Receptors','Integration','Electrical transmission','Model limits'][index]
        : ['Химиялық беріліс','Рецепторлар','Интеграция','Электрлік беріліс','Модельдің шектеулері'][index]),
      paragraphs: [paragraph],
      links: [{ section: 'theory' }, { section: 'interactive' }],
    })),
  };
}
