import type { Language } from "../course";
import type { ReadingLesson } from "../study";

// Module 12 basal-ganglia bibliography: source pages checked in Library, 2026-10-28.
// Guyton & Hall 13e, chapter 57, printed pp. 730–733 / PDF pp. 697–700.
// Ganong 23e, chapter 16, printed pp. 250–253 / PDF pp. 262–265.
// C. L. Ghai Practical Physiology 8e, Clinical Examination,
// printed pp. 285–287 / PDF pp. 307–309.
// These external links do not expose the user's uploaded copyrighted PDFs.
type Guidance = { introduction: string; guyton: string; ganong: string; ghai: string; motor: string };
const guidance: Record<Language, Guidance> = {
  "RU": {
    "introduction": "Маршрут чтения: анатомия стриатума, GPe/GPi, STN и SNc/SNr → корково-таламические петли → двигательные программы → различение брадикинезии, слабости и дисметрии. Для каждого учебника указаны печатные страницы и страницы загруженного PDF, которые не совпадают. Ссылки на книги ведут к библиографическим или лицензионным карточкам, не к бесплатным полным текстам; OpenStax доступен открыто. Прямой, непрямой и гиперпрямой пути — качественные учебные схемы, а не измерение активности нейронов или способ поставить диагноз.",
    "guyton": "Глава 57, печатные с. 730–733 (PDF 697–700): базальные ганглии действуют совместно с корой и кортикоспинальной системой. Сравните хвостатое ядро, путамен, бледный шар, чёрную субстанцию и субталамическое ядро. Путаменовая петля связывает корковые моторные области с таламусом и возвращает влияние к коре; обсуждаются выученные последовательности и масштаб движения. В книге не следует искать доказательство, что один путь сам по себе непосредственно сокращает мышцу. Сопоставьте с теорией и схемой.",
    "ganong": "Глава 16, печатные с. 250–253 (PDF 262–265): стриатум образован хвостатым ядром и путаменом; бледный шар делится на GPe и GPi, чёрная субстанция — на SNc и SNr. Возбуждающий корковый вход, дофаминергическая нигростриарная проекция и преимущественно ГАМК-ергические связи формируют несколько петель. Выход GPi к таламусу тормозный, а таламокорковый — возбуждающий. Это не означает, что активация любого стриарного нейрона одинаково меняет движение. Сравните с интерактивной моделью.",
    "ghai": "Clinical Examination, печатные с. 285–287 (PDF 307–309): различайте моторные области коры, базальные ганглии, мозжечок, нисходящие пути и нижние мотонейроны. Последние являются конечным общим нервным путём к скелетной мышце. Клиническое исследование отдельно оценивает силу, тонус, координацию, рефлексы и непроизвольные движения. Поэтому брадикинезию нельзя приравнивать к парезу, а дисметрию — к слабости; один признак не устанавливает локализацию или диагноз. Не проводите обследование других людей без преподавателя.",
    "motor": "OpenStax, Anatomy & Physiology 2e, §14.3 «Motor Responses»: свободно читаемый вводный материал о корковых моторных областях, нисходящих путях и влиянии базальных ядер на моторные сети. Раздел не даёт детальной проверенной модели D1/D2 или гиперпрямого пути; схематичное описание клеток Беца и руброспинальной коррекции не следует переносить как универсальное правило для человека. Для знаков связей GPi–таламус и анатомии стриатума вернитесь к Ganong и Guyton; затем сопоставьте с медиаразделом."
  },
  "EN": {
    "introduction": "Reading route: anatomy of striatum, GPe/GPi, STN and SNc/SNr → cortical–thalamic loops → learned motor patterns → distinguishing bradykinesia, weakness and dysmetria. Printed page numbers and page indices in the uploaded PDFs are specified separately. Textbook links open bibliographic or licensed-edition records, not free full-text copies; OpenStax is openly readable. Direct, indirect and hyperdirect pathways are qualitative teaching models, not neuronal recordings or diagnostic tests.",
    "guyton": "Chapter 57, printed pp. 730–733 (PDF 697–700): basal ganglia work with the cortex and corticospinal system. Identify caudate, putamen, globus pallidus, substantia nigra and subthalamic nucleus. The putamen circuit connects motor-related cortical regions to the thalamus and back to cortex; the chapter discusses learned movement sequences and movement scaling. It does not establish that one basal-ganglia pathway directly contracts a muscle. Compare the theory and interactive diagram.",
    "ganong": "Chapter 16, printed pp. 250–253 (PDF 262–265): caudate and putamen constitute the striatum; globus pallidus has GPe and GPi, and substantia nigra has SNc and SNr. Excitatory cortical input, the dopaminergic nigrostriatal projection and predominantly GABAergic connections participate in interacting loops. GPi output to thalamus is inhibitory whereas thalamocortical output is excitatory. Activating any striatal neuron therefore cannot be assumed to have the same effect on movement. Compare the interactive model.",
    "ghai": "Clinical Examination, printed pp. 285–287 (PDF 307–309): distinguish motor cortical areas, basal ganglia, cerebellum, descending pathways and lower motor neurons. Lower motor neurons provide the final common neural route to skeletal muscle. Clinical examination assesses strength, tone, coordination, reflexes and involuntary movements separately. Thus bradykinesia is not synonymous with paresis, and dysmetria is not synonymous with weakness; one sign alone cannot localise a lesion or establish a diagnosis. Do not examine other people without an instructor.",
    "motor": "OpenStax, Anatomy & Physiology 2e, §14.3 'Motor Responses': an openly accessible introduction to motor cortical areas, descending pathways and the influence of basal nuclei on motor networks. This section does not establish a detailed D1/D2 or hyperdirect-pathway model. Its simplified account of Betz cells and rubrospinal correction should not be treated as a universal rule in humans. For GPi–thalamus signs and striatal anatomy, consult Ganong and Guyton, then compare the media section."
  },
  "KZ": {
    "introduction": "Оқу реті: стриатум, GPe/GPi, STN және SNc/SNr анатомиясы → қыртыс–таламус контурлары → үйренілген қозғалыс үлгілері → брадикинезияны, бұлшықет әлсіздігін және дисметрияны ажырату. Баспа беттері мен жүктелген PDF беттерінің нөмірлері бөлек көрсетілген. Оқулық сілтемелері библиографиялық немесе лицензиялық басылым карточкаларына апарады, тегін толық мәтінге емес; OpenStax ашық оқылады. Тікелей, жанама және гипертікелей жолдар — нейрон белсенділігінің өлшемі де, диагноз қою құралы да емес, сапалық оқу үлгілері.",
    "guyton": "57-тарау, баспа 730–733-беттер (PDF 697–700): базальды ганглийлер қыртыспен және қыртыс-жұлын жүйесімен бірге қызмет етеді. Құйрықты ядроны, путаменді, бозғылт шарды, қара субстанцияны және субталамустық ядроны салыстырыңыз. Путамен контуры қозғалысқа қатысатын қыртыс аймақтарын таламус арқылы қайтадан қыртыспен байланыстырады; тарауда үйренілген қозғалыс тізбектері мен қозғалыс ауқымын реттеу қаралады. Бір ғана базальды ганглия жолы бұлшықетті тікелей жиырылтады деген тұжырым жасамаңыз. Теориямен және сызбамен салыстырыңыз.",
    "ganong": "16-тарау, баспа 250–253-беттер (PDF 262–265): құйрықты ядро мен путамен стриатумды құрайды; бозғылт шар GPe және GPi, ал қара субстанция SNc және SNr бөліктеріне бөлінеді. Қыртыстың қоздырушы кірісі, дофаминергиялық нигростриатумдық проекция және негізінен ГАМҚ-ергиялық байланыстар өзара әрекеттесетін контурларға қатысады. GPi-дің таламусқа шығуы тежеуші, ал таламус-қыртыс проекциясы қоздырушы. Сондықтан стриатумның кез келген нейронын белсендіру қозғалысқа бірдей әсер етеді деуге болмайды. Интерактивті үлгімен салыстырыңыз.",
    "ghai": "Clinical Examination бөлімі, баспа 285–287-беттер (PDF 307–309): қыртыстың қозғалтқыш аймақтарын, базальды ганглийлерді, мишықты, төмендеуші жолдарды және төменгі мотонейрондарды ажыратыңыз. Төменгі мотонейрондар қаңқа бұлшықетіне баратын соңғы ортақ жүйкелік жолды құрайды. Клиникалық тексеруде күш, тонус, үйлесімділік, рефлекстер және еріксіз қозғалыстар бөлек бағаланады. Брадикинезия парезбен, дисметрия әлсіздікпен бірдей емес; бір ғана белгі зақымның орнын не диагнозды анықтамайды. Оқытушысыз басқа адамдарды тексермеңіз.",
    "motor": "OpenStax, Anatomy & Physiology 2e, §14.3 «Motor Responses»: қозғалтқыш қыртыс аймақтары, төмендеуші жолдар және базальды ядролардың қозғалыс желілеріне әсері туралы ашық кіріспе. Бұл бөлім D1/D2 немесе гипертікелей жолдың егжей-тегжейлі үлгісін дәлелдемейді. Бец жасушалары мен руброспиналдық түзету туралы жеңілдетілген сипаттаманы адамға ортақ әмбебап ереже деп қабылдамаңыз. GPi–таламус байланысының таңбаларын және стриатум анатомиясын Ganong пен Guyton арқылы нақтылап, медиабөліммен салыстырыңыз."
  }
};

export function createModuleTwelveReferences(language: Language, base: ReadingLesson): ReadingLesson {
  if (base.kind !== "references" || !base.sources) throw new Error("Module 12 references base missing");
  const find = (prefix: string) => {
    const source = base.sources!.find(item => item.title.startsWith(prefix));
    if (!source) throw new Error("Module 12 bibliography record missing: " + prefix);
    return source;
  };
  const copy = guidance[language];
  return {
    ...base,
    introduction: copy.introduction,
    sources: [
      { ...find("Guyton & Hall"),
        href: "https://www.vitalsource.com/products/lic-guyton-and-hall-textbook-of-medical-john-e-hall-v9780323389303",
        description: copy.guyton, links: [{ section: "theory" }, { section: "interactive" }] },
      { ...find("Ganong"), description: copy.ganong, links: [{ section: "interactive" }, { section: "glossary" }] },
      { title: "C. L. Ghai · A Textbook of Practical Physiology, 8th ed. (2013)",
        href: "https://opac.iitrpr.ac.in/cgi-bin/koha/opac-MARCdetail.pl?biblionumber=10003",
        description: copy.ghai, links: [{ section: "clinical" }, { section: "cases" }] },
      { ...find("OpenStax · Motor Responses"), description: copy.motor,
        links: [{ section: "media" }] }
    ]
  };
}
