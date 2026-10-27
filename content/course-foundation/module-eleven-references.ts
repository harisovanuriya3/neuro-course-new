import type { Language } from "../course";
import type { ReadingLesson } from "../study";

// Module 11 motor control: checked against the user's Library editions on 2026-10-27.
// Guyton & Hall 13e, chapter 56: printed pp. 709–711 / PDF pp. 677–679.
// Ganong 23e, chapter 16: printed pp. 241–244 / PDF pp. 253–256.
// C. L. Ghai Practical Physiology 8e, Clinical Examination:
// printed pp. 295–297 / PDF pp. 317–319.
// These bibliographic links never expose the user's uploaded copyrighted PDFs.
type Guidance = {
  introduction: string;
  guyton: string;
  ganong: string;
  ghai: string;
  motor: string;
};

const guidance: Record<Language, Guidance> = {
  RU: {
    introduction: "Маршрут чтения: корковая подготовка движения → кортикоспинальные и кортико-бульбарные команды → нисходящие постуральные пути → сенсорная коррекция → мышечное веретено и клинические ограничения. Указаны отдельно печатные страницы и номера страниц загруженных PDF. Ссылки на книги открывают библиографические записи или страницу лицензированного издания, а не бесплатные полные тексты. OpenStax можно читать открыто. Учебная схема не является клиническим исследованием; один двигательный признак не позволяет поставить диагноз.",
    guyton: "Глава 56, печатные с. 709–711 (PDF 677–679): кортикоспинальные волокна исходят не только из первичной моторной, но и из премоторной, дополнительной моторной и соматосенсорной коры. Они проходят через заднюю ножку внутренней капсулы; большинство перекрещивается в нижней части продолговатого мозга. Значительная часть влияний на α-мотонейроны опосредована спинальными интернейронами. Для позы важны также ретикулярные и вестибулярные нисходящие связи. Термин «экстрапирамидная система» объединяет неоднородные сети и не заменяет указания конкретного пути. Сравните с интерактивной схемой.",
    ganong: "Глава 16, печатные с. 241–244 (PDF 253–256): конечный общий путь к скелетной мышце образуют спинальные и черепные двигательные нейроны. Кора, базальные ганглии и латеральный мозжечок участвуют в подготовке действия; нисходящие пути и афферентная обратная связь помогают корректировать выполнение и поддерживать позу. Базальные ганглии не являются прямым периферическим двигательным нервом. Кортикоспинальные волокна могут действовать через интернейроны, а часть образует прямые контакты с мотонейронами. Сопоставьте с теорией.",
    ghai: "Clinical Examination, печатные с. 295–297 (PDF 317–319): удар по связке надколенника кратковременно растягивает четырёхглавую мышцу и активирует мышечные веретёна; не следует называть сухожильный орган Гольджи основным рецептором коленного рефлекса. Выраженность рефлекса зависит от условий исследования и состояния человека. Один усиленный или ослабленный ответ не определяет точную локализацию поражения. Не проводите неврологические пробы на других людях без преподавателя.",
    motor: "OpenStax, Anatomy & Physiology 2e, §14.3 «Motor Responses»: свободно доступные схемы корковых моторных областей, нисходящих путей, двигательной единицы и рефлексов. Схемы упрощают реальные связи; формулировки о единственном корковом источнике команд и обязательной ведущей роли руброспинального пути не следует переносить в клинические выводы. Для уточнения используйте главы Guyton и Ganong; сопоставьте с медиаразделом."
  },
  EN: {
    introduction: "Reading sequence: cortical movement preparation → corticospinal and corticobulbar commands → descending postural pathways → sensory correction → muscle spindle and clinical limitations. Printed page numbers are distinguished from uploaded-PDF page indices. Textbook links lead to catalogue or licensed-edition records, not free full text. OpenStax is openly readable. An educational diagram is not a clinical test, and one motor sign cannot establish a diagnosis.",
    guyton: "Chapter 56, printed pp. 709–711 (PDF 677–679): corticospinal fibers arise from primary motor, premotor, supplementary motor and somatosensory cortical areas. They pass through the posterior limb of the internal capsule, and most cross in the caudal medulla. Much corticospinal influence on alpha motor neurons is mediated through spinal interneurons. Reticular and vestibular descending pathways also contribute to posture. The label 'extrapyramidal system' groups heterogeneous networks and should not replace naming a specific pathway. Compare with the interactive diagram.",
    ganong: "Chapter 16, printed pp. 241–244 (PDF 253–256): spinal and cranial motor neurons are the final common neural paths to skeletal muscle. Cortex, basal ganglia and lateral cerebellum contribute to movement planning; descending pathways and sensory feedback adjust execution and posture. Basal ganglia do not directly constitute a peripheral motor nerve. Corticospinal fibers can act through interneurons, while some make direct motor-neuron connections. Compare with the theory section.",
    ghai: "Clinical Examination, printed pp. 295–297 (PDF 317–319): tapping the patellar ligament briefly stretches the quadriceps and activates muscle spindles; the Golgi tendon organ is not the primary receptor for the knee jerk. Reflex magnitude depends on examination conditions and the person examined. A single brisk or weak response cannot precisely localize a lesion. Do not perform neurological examinations on other people without an instructor.",
    motor: "OpenStax, Anatomy & Physiology 2e, §14.3 'Motor Responses': openly accessible diagrams of motor cortical regions, descending pathways, motor units and reflexes. These figures simplify real circuitry; claims suggesting a single cortical source of all commands or a necessarily dominant rubrospinal correction route should not be extrapolated to clinical reasoning. Consult Guyton and Ganong for nuance; compare with the media section."
  },
  KZ: {
    introduction: "Оқу реті: қозғалысты қыртыста дайындау → қыртыс-жұлын және қыртыс-ядролық командалар → дене қалпын реттейтін төмендеуші жолдар → сенсорлық кері байланыс арқылы түзету → бұлшықет ұршығы және клиникалық қорытындының шектеулері. Баспа беттері мен жүктелген PDF беттері бөлек көрсетілген. Оқулық сілтемелері каталогқа немесе лицензиялық басылым карточкасына апарады, тегін толық мәтінге емес. OpenStax ашық қолжетімді. Оқу сызбасы клиникалық тексеру емес; бір қозғалыс белгісі диагноз қоюға жеткіліксіз.",
    guyton: "56-тарау, баспа 709–711-беттер (PDF 677–679): қыртыс-жұлын талшықтары тек алғашқы қозғалтқыш аймақтан емес, премоторлық, қосымша моторлық және соматосенсорлық қыртыстан да басталады. Олар ішкі капсуланың артқы аяғы арқылы өтеді; көпшілігі сопақша мидың төменгі бөлігінде айқасады. Альфа-мотонейрондарға әсердің елеулі бөлігі жұлын интернейрондары арқылы беріледі. Дене қалпын реттеуге ретикулярлық және вестибулярлық төмендеуші жолдар да қатысады. «Экстрапирамидалық жүйе» әртүрлі желілерді біріктіреді, нақты жолдың атауын алмастырмайды. Интерактивті сызбамен салыстырыңыз.",
    ganong: "16-тарау, баспа 241–244-беттер (PDF 253–256): жұлын мен бассүйек жүйкелерінің қозғалтқыш нейрондары қаңқа бұлшықетіне баратын соңғы ортақ жүйкелік жолды құрайды. Ми қыртысы, базальды ганглийлер және мишықтың латеральды бөлігі қозғалысты жоспарлауға қатысады; төмендеуші жолдар мен сенсорлық кері байланыс қозғалысты және дене қалпын түзетеді. Базальды ганглийлер бұлшықетке тікелей баратын шеткі қозғалтқыш жүйке емес. Қыртыс-жұлын талшықтары интернейрондар арқылы да, кейбірі мотонейрондармен тікелей байланыс арқылы да әсер етеді. Теориямен салыстырыңыз.",
    ghai: "Clinical Examination бөлімі, баспа 295–297-беттер (PDF 317–319): тізе тобығының байламын соққанда төртбасты бұлшықет қысқа уақытқа созылып, бұлшықет ұршықтары белсендіріледі; Гольджидің сіңірлік мүшесі тізе рефлексінің негізгі рецепторы емес. Рефлекстің айқындылығы тексеру жағдайына және адамның күйіне байланысты. Бір ғана күшейген немесе әлсіреген жауап зақымның нақты орнын анықтамайды. Оқытушысыз басқа адамдарға неврологиялық сынама жасамаңыз.",
    motor: "OpenStax, Anatomy & Physiology 2e, §14.3 «Motor Responses»: қыртыстың қозғалтқыш аймақтары, төмендеуші жолдар, қозғалтқыш бірлік пен рефлекстер туралы ашық сызбалар. Сызбалар нақты байланыстарды жеңілдетіп көрсетеді; барлық команданың бір ғана қыртыстық көзі бар немесе руброспиналдық жол әрдайым негізгі түзету жолы деген тұжырымдарды клиникалық қорытындыға тікелей қолдануға болмайды. Нақтылау үшін Guyton және Ganong тарауларын оқып, медиабөліммен салыстырыңыз."
  }
};

export function createModuleElevenReferences(language: Language, base: ReadingLesson): ReadingLesson {
  if (base.kind !== "references" || !base.sources) {
    throw new Error("Module 11 references base missing");
  }
  const find = (prefix: string) => {
    const source = base.sources!.find(item => item.title.startsWith(prefix));
    if (!source) throw new Error("Module 11 bibliography record missing: " + prefix);
    return source;
  };
  const copy = guidance[language];
  return {
    ...base,
    introduction: copy.introduction,
    sources: [
      {
        ...find("Guyton & Hall"),
        // The legacy publisher path returns HTTP 404; link to the verified exact 13th edition.
        href: "https://www.vitalsource.com/products/lic-guyton-and-hall-textbook-of-medical-john-e-hall-v9780323389303",
        description: copy.guyton,
        links: [{ section: "interactive" }]
      },
      { ...find("Ganong"), description: copy.ganong, links: [{ section: "theory" }] },
      {
        title: "C. L. Ghai · A Textbook of Practical Physiology, 8th ed. (2013)",
        href: "https://opac.iitrpr.ac.in/cgi-bin/koha/opac-MARCdetail.pl?biblionumber=10003",
        description: copy.ghai,
        links: [{ section: "clinical" }, { section: "practice" }]
      },
      { ...find("OpenStax · Motor Responses"), description: copy.motor, links: [{ section: "media" }] }
    ]
  };
}
