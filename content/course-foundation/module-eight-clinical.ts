import type { Language } from "../course";
import type { ReadingLesson } from "../study";
import { getSectionTitle } from "../sections";

// Module 8: teaching example of a partial unilateral spinal-cord lesion.
// Source cross-check: Guyton & Hall 13e, PDF pp. 584–586, 677–678;
// Ganong 23e, PDF pp. 185–187, 254–255;
// C. L. Ghai Practical Physiology 8e, PDF pp. 324–327.
// The schematic pattern is not a diagnostic criterion for a real patient.
type ClinicalCopy = {
  introduction: string;
  titles: [string, string, string, string, string];
  explanations: [string, string, string, string, string];
};
const data: Record<Language, ClinicalCopy> = {
  RU: {
    introduction: "Клинический мост: сравните сторону и модальность дефицита при условном одностороннем поражении спинного мозга.",
    titles: ["Учебное наблюдение", "Три пути и три уровня перекрёста", "Почему нарушения оказываются на разных сторонах", "Как проверить альтернативы", "Пределы клинического вывода"],
    explanations: [
      "Учебный пример: после очагового повреждения правой половины грудного отдела спинного мозга у пациента в подостром периоде ниже очага слабее точные произвольные движения правой ноги, снижены вибрация и чувство положения справа, а боль и температура — преимущественно слева, начиная несколько ниже предполагаемого уровня. Это условная комбинация признаков, а не готовый диагноз.",
      "Волокна сознательной проприоцепции и вибрации от туловища и конечностей поднимаются в задних столбах на своей стороне и перекрещиваются после переключения в тонком и клиновидном ядрах продолговатого мозга. Афференты боли и температуры переключаются в заднем роге; аксоны вторых нейронов обычно пересекают переднюю белую спайку спинного мозга близ уровня входа. Большинство корково-спинномозговых волокон пересекается в каудальной части продолговатого мозга.",
      "При условном правостороннем очаге в спинном мозге ниже пирамидного перекрёста могут сочетаться правосторонние нарушения вибрации/положения и произвольных движений с преимущественно левосторонним снижением боли/температуры ниже очага. Болевые афференты могут пройти один-два сегмента в тракте Лиссауэра до переключения; граница выпадения не обязана совпадать с точным сегментом поражения. Выраженность двигательных признаков зависит также от времени после травмы.",
      "Сравните справа и слева вибрацию камертоном, направление пассивного движения пальца, укол и температуру при закрытых глазах; отдельно оцените силу, тонус, рефлексы и чувствительность лица. Уточните сегментарную границу, симптомы на уровне очага, периферическое распределение и историю начала. Изолированная радикулопатия или полинейропатия обычно не объясняет такую сочетанную перекрёстную картину, но исследование должно исключать сопутствующие причины.",
      "Эта модель позволяет выдвинуть гипотезу о преимущественно одностороннем поражении проводящих путей спинного мозга, но не установить точный сегмент, объём, причину или диагноз по одной схеме. Клинические синдромы часто неполные, перекрываются и изменяются во времени; нужны полный неврологический осмотр и, по показаниям, МРТ. При новом быстро нарастающем дефиците необходима срочная медицинская оценка."
    ]
  },
  EN: {
    introduction: "Clinical bridge: compare the side and sensory modality of deficits in a hypothetical unilateral spinal-cord lesion.",
    titles: ["Teaching observation", "Three pathways and their crossing points", "Why the deficits appear on different sides", "Test competing explanations", "Limits of clinical inference"],
    explanations: [
      "Teaching example: after a focal injury to the right half of the thoracic spinal cord, a patient in the subacute phase has weaker skilled voluntary movement of the right leg below the lesion, reduced vibration and joint-position sense on the right, and predominantly reduced pain and temperature sensation on the left beginning somewhat below the suspected level. This is a simplified pattern, not a diagnosis.",
      "Conscious proprioception and vibration from the trunk and limbs ascend ipsilaterally in the dorsal columns and cross after synapsing in the gracile and cuneate nuclei of the medulla. Pain-temperature afferents synapse in the dorsal horn; second-order axons usually cross in the anterior white commissure near their spinal entry level. Most corticospinal fibers cross at the pyramidal decussation in the caudal medulla.",
      "A hypothetical right-sided cord lesion below the pyramidal decussation can combine right-sided deficits of vibration/position and voluntary movement with mainly left-sided loss of pain/temperature below the lesion. Pain afferents may ascend or descend one or two segments in Lissauer's tract before synapsing, so the sensory boundary need not identify the exact damaged segment. Motor signs also depend on the time elapsed after injury.",
      "Compare vibration with a tuning fork, passive joint-position direction, pinprick and temperature on both sides with the eyes closed; separately assess power, tone, reflexes and facial sensation. Map the segmental boundary, findings at the lesion level, peripheral distribution and time course. A single radiculopathy or polyneuropathy would not usually explain this crossed pattern, but coexisting causes must still be considered.",
      "This pattern supports a hypothesis of predominantly unilateral spinal-cord pathway injury; it does not establish an exact segment, lesion extent, cause or diagnosis from a diagram alone. Clinical syndromes can be incomplete, overlap and evolve; a full neurological examination and imaging when indicated are needed. New rapidly progressive neurological deficits warrant urgent medical assessment."
    ]
  },
  KZ: {
    introduction: "Клиникалық көпір: жұлынның бір жақты зақымдануының шартты мысалында сезімталдық түрлері мен бұзылыс жақтарын салыстырыңыз.",
    titles: ["Оқу жағдайы", "Үш жол және олардың айқасу деңгейлері", "Неліктен бұзылыстар әр жақта байқалады", "Балама себептерді тексеру", "Клиникалық қорытындының шектеулері"],
    explanations: [
      "Оқу мысалы: жұлынның кеуде бөлімінің оң жартысы ошақты зақымданғаннан кейін науқастың жеделдеу кезеңінде зақым деңгейінен төмен оң аяқтың дәл ерікті қимылдары әлсіреген, оң жақта діріл мен буын қалпын сезу төмендеген, ал ауырсыну мен температураны сезу көбіне сол жақта, болжамды деңгейден сәл төменірек нашарлаған. Бұл — диагноз емес, шартты үлгі.",
      "Тұлға мен аяқ-қолдан келетін саналы проприоцепция және діріл сезімі артқы бағандармен өз жағында жоғары көтеріліп, сопақша мидың жіңішке және сына тәрізді ядроларында ауысқаннан кейін айқасады. Ауырсыну мен температура афференттері жұлынның артқы мүйізінде ауысады; екінші нейрон аксондары әдетте кірген деңгейге жақын алдыңғы ақ комиссура арқылы айқасады. Кортикоспиналдық талшықтардың көбі сопақша мидың төменгі бөлігіндегі пирамидалар айқасуында өтеді.",
      "Пирамидалар айқасуынан төмен орналасқан жұлынның оң жақты шартты зақымында діріл, буын қалпы және ерікті қозғалыс оң жақта, ал ауырсыну мен температура сезімі зақымнан төмен негізінен сол жақта бұзылуы мүмкін. Ауырсыну афференттері синапсқа дейін Лиссауэр жолымен бір-екі сегмент жоғары не төмен жүруі мүмкін; сондықтан сезімталдық шекарасы зақымның дәл сегментін көрсетпейді. Қозғалыс белгілері жарақаттан кейінгі уақытқа да тәуелді.",
      "Көзді жұмып, екі жақтағы дірілді камертонмен, саусақтың пассивті қозғалыс бағытын, шаншу мен температура сезімін салыстырыңыз; күшті, бұлшықет тонусын, рефлекстерді және бет сезімталдығын бөлек бағалаңыз. Сегменттік шекараны, ошақ деңгейіндегі белгілерді, шеткері таралуды және басталу уақытын анықтаңыз. Жеке радикулопатия немесе полинейропатия мұндай айқасқан көріністі әдетте түсіндірмейді, бірақ қатар жүретін себептерді де ескеру керек.",
      "Бұл үлгі жұлын жолдарының басым түрде бір жақты зақымдануы туралы болжам жасауға мүмкіндік береді, бірақ тек сызбаға сүйеніп дәл сегментті, зақым көлемін, себебін немесе диагнозды анықтауға болмайды. Клиникалық синдромдар толық болмауы, қабаттасуы және уақыт өте өзгеруі мүмкін; толық неврологиялық тексеру және көрсетілім бойынша МРТ қажет. Жаңа әрі тез үдейтін неврологиялық бұзылыстар шұғыл медициналық бағалауды талап етеді."
    ]
  }
};

export function createModuleEightClinical(language: Language): ReadingLesson {
  const copy = data[language];
  const destinations = [
    ["cases", "theory"],
    ["theory", "one-minute"],
    ["theory", "practice"],
    ["practice", "cases"],
    ["tests", "questions"]
  ] as const;
  return {
    kind: "clinical",
    title: getSectionTitle("clinical", language),
    introduction: copy.introduction,
    cards: copy.titles.map((title, i) => ({
      id: "module-8-clinical-" + (i + 1),
      title,
      paragraphs: [copy.explanations[i]],
      links: destinations[i].map(section => ({ section }))
    }))
  };
}
