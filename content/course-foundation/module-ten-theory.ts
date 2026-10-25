
import type { Language, Lesson } from "../types";

// Module 10 / brainstem: localized expansion of the foundation theory.
// Sources read: Guyton & Hall 13e ch.59, PDF 718–720 (printed 751–753);
// Ganong 23e ch.15, PDF 243–244 (printed 231–232);
// C. L. Ghai Practical Physiology 8e, PDF 301–303 (printed 279–281).
type Text = Record<Language,string>;
const t=(RU:string,EN:string,KZ:string):Text=>({RU,EN,KZ});
const sections:{id:string;heading:Text;paragraphs:Text[]}[]=[
  {
    id:"brainstem-levels-and-tracts",
    heading:t("Отделы ствола и проводящие пути","Brainstem levels and long tracts","Ми бағанының бөлімдері мен өткізгіш жолдар"),
    paragraphs:[
      t(
        "Продолговатый мозг, мост и средний мозг содержат не только восходящие и нисходящие волокна, но и ядра черепных нервов, интернейронные сети и связи с мозжечком. В продолговатом мозге расположены важные ядра IX–XII нервов, в мосту — ядра и пути V–VIII, а в среднем мозге — III–IV, претектальная область и холмики. Функции распределены между уровнями и не ограничиваются одной точкой.",
        "The medulla, pons and midbrain contain ascending and descending fibers, cranial-nerve nuclei, interneuronal networks and cerebellar connections. The medulla includes important nuclei of cranial nerves IX–XII; the pons contains nuclei and pathways associated with V–VIII; the midbrain contains III–IV, the pretectal region and colliculi. Functions are distributed across levels rather than confined to a single point.",
        "Сопақша ми, көпір және ортаңғы ми жоғарылайтын және төмендейтін талшықтарды, бассүйек жүйкелерінің ядроларын, интернейрондық желілерді және мишықпен байланыстарды қамтиды. Сопақша мида IX–XII жүйкелерінің маңызды ядролары, көпірде V–VIII жүйкелеріне қатысты ядролар мен жолдар, ортаңғы мида III–IV жүйкелер, претекталдық аймақ және төмпешіктер орналасады. Қызметтер бірнеше деңгейге таралған."
      ),
      t(
        "Часть длинных путей перекрещивается, поэтому односторонний стволовой очаг иногда вызывает сочетание ипсилатеральных нарушений черепных нервов и контралатеральных нарушений движений или чувствительности. Это полезная схема локализации, но конкретное сочетание зависит от уровня, сосудистой территории и вовлечённых путей. Один симптом не доказывает точный уровень поражения.",
        "Some long tracts decussate, so a unilateral brainstem lesion may combine ipsilateral cranial-nerve findings with contralateral motor or sensory deficits. This is a useful localization principle, but the pattern depends on lesion level, vascular territory and affected tracts. One sign cannot establish the exact site.",
        "Кейбір ұзын жолдар айқасады, сондықтан ми бағанының біржақты зақымында ошақ жағындағы бассүйек жүйкелерінің белгілері қарсы жақтағы қозғалыс немесе сезімталдық бұзылысымен қатар жүруі мүмкін. Бұл зақым орнын болжауға көмектеседі, бірақ нақты көрініс деңгейге, қанмен қамтамасыз ету аймағына және зақымдалған жолдарға тәуелді. Бір белгі зақым орнын дәлелдемейді."
      )
    ]
  },
  {
    id:"pupillary-and-corneal-reflexes",
    heading:t("Зрачковый и корнеальный рефлексы","Pupillary and corneal reflexes","Қарашық және қасаң қабық рефлекстері"),
    paragraphs:[
      t(
        "При зрачковом световом рефлексе сигнал идёт от сетчатки по II нерву, через хиазму и зрительный тракт к претектальной области среднего мозга. Претектальные связи активируют оба ядра Эдингера—Вестфаля; парасимпатические волокна III нерва переключаются в ресничном узле, а короткие ресничные нервы вызывают сокращение сфинктера зрачка. Поэтому освещение одного глаза в норме вызывает прямое и содружественное сужение зрачков.",
        "In the pupillary light reflex, retinal signals travel in cranial nerve II through the chiasm and optic tract to the midbrain pretectal area. Pretectal connections activate both Edinger–Westphal nuclei; parasympathetic fibers of III synapse in the ciliary ganglion, and short ciliary nerves activate the pupillary sphincter. Light in one eye therefore normally produces direct and consensual constriction.",
        "Қарашықтың жарық рефлексінде сигнал торқабықтан II жүйке, хиазма және көру тракты арқылы ортаңғы мидың претекталдық аймағына өтеді. Претекталдық байланыстар екі жақтағы Эдингер—Вестфаль ядроларын белсендіреді; III жүйкенің парасимпатикалық талшықтары кірпікшелі түйінде ауысады, ал қысқа кірпікшелі жүйкелер қарашық сфинктерін жиырады. Сондықтан бір көзге жарық түскенде екі қарашық та тарылады."
      ),
      t(
        "Корнеальный рефлекс имеет афферентное звено V1, стволовые интернейронные связи и эфферентное звено VII нерва, сокращающее круговую мышцу глаза с двух сторон. Это полисинаптический защитный рефлекс, а не прямой синапс V→VII. Отсутствие моргания может отражать нарушения V1, VII, местную патологию глаза или влияние лекарств. Самостоятельно касаться чужой роговицы нельзя: особенно при сниженной чувствительности возможно повреждение.",
        "The corneal reflex uses V1 afferents, brainstem interneuronal connections and VII efferents to orbicularis oculi, normally producing bilateral blinking. It is a polysynaptic protective reflex, not a direct V-to-VII synapse. Absent blinking may reflect V1 or VII dysfunction, local eye disease or medication. Students must not touch another person's cornea: impaired sensation increases injury risk.",
        "Қасаң қабық рефлексінде V1 афференттері, ми бағанының интернейрондық байланыстары және көздің айналма бұлшықетін жиыратын VII эфференттері қатысып, әдетте екіжақты кірпік қағуды туғызады. Бұл — V→VII тікелей синапсы емес, полисинапстық қорғаныш рефлекс. Жауаптың болмауы V1 не VII бұзылысынан, көздің жергілікті ауруынан немесе дәріден болуы мүмкін. Студенттер басқа адамның қасаң қабығын өздігінен ұстамауы тиіс: сезімталдық төмендесе жарақат қаупі артады."
      )
    ]
  },
  {
    id:"ascending-arousal-and-descending-posture",
    heading:t("Бодрствование и нисходящий постуральный контроль","Arousal and descending postural control","Сергектік және төмендеуші постуралдық реттеу"),
    paragraphs:[
      t(
        "Ретикулярная формация состоит из неоднородных нейронных групп, а не из единственного центра сознания. Восходящие активирующие пути через таламус и другие структуры переднего мозга взаимодействуют с корой и поддерживают бодрствование. Холинергические, норадренергические, серотонинергические и другие системы оказывают эффекты, зависящие от рецептора и мишени; нельзя считать любой медиатор всегда только возбуждающим или только тормозным.",
        "The reticular formation consists of heterogeneous neuronal groups, not one center of consciousness. Ascending activating pathways through the thalamus and other forebrain structures interact with cortex to support arousal. Cholinergic, noradrenergic, serotonergic and other systems have receptor- and target-dependent effects; a transmitter is not universally excitatory or inhibitory.",
        "Ретикулярлық формация сананың жалғыз орталығы емес, әртүрлі нейрондық топтардан тұрады. Таламус және алдыңғы мидың басқа құрылымдары арқылы өтетін жоғарылайтын белсендіруші жолдар қыртыспен әрекеттесіп, сергектікті қолдайды. Холинергиялық, норадренергиялық, серотонинергиялық және басқа жүйелердің әсері рецептор мен нысанаға тәуелді; медиаторды барлық жерде тек қоздырушы немесе тежеуші деуге болмайды."
      ),
      t(
        "Нисходящие ретикулоспинальные пути изменяют возбудимость спинальных интернейронов и мотонейронов, тонус и постуральные ответы вместе с вестибулоспинальными и кортикоспинальными влияниями. Результат зависит от конкретного пути и состояния сети; повреждение «ретикулярной формации» не всегда повышает и не всегда снижает тонус. Снижение бодрствования также не локализует очаг само по себе: учитывают двусторонние поражения полушарий, метаболические причины и лекарства.",
        "Descending reticulospinal pathways modulate spinal interneurons, motor neurons, tone and postural responses alongside vestibulospinal and corticospinal influences. Effects depend on the pathway and network state; injury to the 'reticular formation' does not uniformly raise or lower tone. Reduced arousal also does not localize a lesion alone: bilateral hemispheric disease, metabolic causes and medications must be considered.",
        "Төмендеуші ретикулоспиналдық жолдар вестибулоспиналдық және қыртыс-жұлын әсерлерімен бірге жұлын интернейрондарының, мотонейрондардың қозғыштығын, тонусты және дене қалпының жауабын реттейді. Нәтиже нақты жол мен желі күйіне тәуелді; ретикулярлық формация зақымданғанда тонус әрқашан бір бағытта өзгермейді. Сергектіктің төмендеуі де зақым орнын жеке анықтамайды: екі жартышар аурулары, метаболизмдік себептер және дәрілер ескеріледі."
      )
    ]
  },
  {
    id:"distributed-autonomic-brainstem-networks",
    heading:t("Распределённые дыхательные и сердечно-сосудистые сети","Distributed respiratory and cardiovascular networks","Тыныс және жүрек-қантамыр жүйелерінің таралған желілері"),
    paragraphs:[
      t(
        "Дыхательный ритм формируют взаимодействующие сети продолговатого мозга, а мостовые связи изменяют его паттерн. Эти сети получают сигналы от центральных и периферических хеморецепторов, рецепторов лёгких и высших центров. Поэтому современное объяснение регуляции дыхания не сводится к единственному «пневмотаксическому переключателю» вдоха и выдоха.",
        "Interacting medullary networks generate respiratory rhythm, while pontine connections shape the breathing pattern. These circuits receive input from central and peripheral chemoreceptors, pulmonary receptors and higher centers. Respiratory control is therefore not explained by one isolated 'pneumotaxic switch' toggling inspiration and expiration.",
        "Тыныс ырғағын сопақша мидың өзара әрекеттесетін желілері қалыптастырады, ал көпір байланыстары тыныс үлгісін өзгертеді. Бұл тізбектер орталық және шеткі хеморецепторлардан, өкпе рецепторларынан және жоғары орталықтардан сигнал алады. Сондықтан тынысты реттеуді дем алу мен дем шығаруды ауыстыратын жалғыз «пневмотаксикалық қосқышпен» түсіндіруге болмайды."
      ),
      t(
        "Продолговатый мозг объединяет афферентацию барорецепторов и хеморецепторов с автономными выходами, влияющими на частоту сердца, сосудистый тонус и давление. Реакция зависит от состояния организма, симпатических и парасимпатических путей и гуморальных факторов. Упрощённая анимация может показывать направление ответа, но не является клиническим измерением и не доказывает локализацию поражения.",
        "Medullary circuits integrate baroreceptor and chemoreceptor inputs with autonomic outputs affecting heart rate, vascular tone and pressure. The response depends on physiological state, sympathetic and parasympathetic pathways and humoral influences. A simplified animation may illustrate response direction, but it is not a clinical measurement or proof of lesion location.",
        "Сопақша ми желілері барорецепторлар мен хеморецепторлардан келген сигналдарды жүрек жиілігіне, тамыр тонусына және қысымға әсер ететін вегетативтік шығыстармен біріктіреді. Жауап ағзаның күйіне, симпатикалық және парасимпатикалық жолдарға және гуморальдық ықпалдарға тәуелді. Қарапайым анимация жауап бағытын көрсете алады, бірақ клиникалық өлшеу де, зақым орнын дәлелдеу де емес."
      )
    ]
  }
];
export function createModuleTenTheory(language:Language,base:Lesson & {kind:"theory"}):Lesson & {kind:"theory"}{
  return {...base,sections:[...base.sections,...sections.map(section=>({
    id:section.id,title:section.heading[language],
    blocks:section.paragraphs.map(paragraph=>({type:"paragraph" as const,text:paragraph[language]}))
  }))]};
}
