import type { Language } from "../course";

// Additional authored teaching chapter for module 20. Keep existing theory intact.
const chapters = [
  {
    "id": "retinal-layers",
    "title": [
      "Гистофизиология сетчатки и нейронные цепи",
      "Retinal histophysiology and neural circuits",
      "Торқабықтың гистофизиологиясы және нейрондық тізбектер"
    ],
    "text": [
      "Сетчатка состоит из пигментного эпителия и нейросенсорной части. Пигментный эпителий участвует в регенерации зрительного пигмента, фагоцитозе наружных сегментов фоторецепторов и поддержании наружного гематоретинального барьера. Свет проходит через внутренние слои к палочкам и колбочкам, а информация передаётся в обратном направлении через биполярные клетки к ганглиозным. Горизонтальные клетки формируют латеральные взаимодействия на уровне наружного плексиформного слоя, амакриновые — на уровне внутреннего. Фовеа характеризуется высокой плотностью колбочек и смещением внутренних слоёв, что способствует высокой пространственной остроте; периферия богаче палочками, чувствительными к слабому освещению. Диск зрительного нерва не содержит фоторецепторов и формирует физиологическое слепое пятно. Важно отличать анатомический слой от функции: один и тот же световой стимул может усиливать активность ON-ганглиозных клеток и снижать активность OFF-клеток.",
      "The retina comprises retinal pigment epithelium and neural retina. Pigment epithelium participates in visual pigment recycling, outer-segment phagocytosis and the outer blood–retinal barrier. Light traverses inner retinal layers to rods and cones, while neural signals travel in the opposite direction through bipolar cells to ganglion cells. Horizontal cells mediate lateral interactions in the outer plexiform layer, and amacrine cells shape signaling in the inner plexiform layer. The fovea has a high cone density and displaced inner layers, supporting fine spatial acuity; peripheral retina has more rods, supporting dim-light sensitivity. The optic disc lacks photoreceptors and creates the physiological blind spot. Anatomical layers must not be confused with functional output: the same light increment can excite ON ganglion cells while suppressing OFF pathways.",
      "Торқабық пигментті эпителийден және нейросенсорлық бөліктен тұрады. Пигментті эпителий көру пигментінің жаңаруына, фоторецепторлардың сыртқы сегменттерін фагоцитоздауға және сыртқы гематоретиналдық бөгетті сақтауға қатысады. Жарық ішкі қабаттар арқылы таяқшалар мен сауытшаларға өтеді, ал жүйкелік ақпарат биполярлық жасушалардан ганглиоздық жасушаларға кері бағытта беріледі. Горизонталдық жасушалар сыртқы плексиформды қабатта, амакриндік жасушалар ішкі плексиформды қабатта сигналды өңдейді. Фовеада сауытшалар тығыз орналасқандықтан кеңістіктік айыру қабілеті жоғары; шеткі торқабықтағы таяқшалар әлсіз жарыққа сезімтал. Көру нерві дискісінде фоторецепторлар болмайды, сондықтан физиологиялық соқыр дақ қалыптасады."
    ]
  },
  {
    "id": "adaptation",
    "title": [
      "Световая и темновая адаптация",
      "Light and dark adaptation",
      "Жарыққа және қараңғылыққа бейімделу"
    ],
    "text": [
      "Темновая адаптация — не просто расширение зрачка. После перехода из яркого света в темноту восстанавливается доступность фотопигментов, изменяются чувствительность фоторецепторов и усиление ретинальных цепей. Колбочки адаптируются быстрее, но палочки обеспечивают более высокую чувствительность при очень слабом освещении; их восстановление занимает больше времени. При ярком освещении насыщение палочек ограничивает их вклад, а колбочки поддерживают цветовое и высокоразрешающее зрение. Диаметр зрачка меняет количество поступающего света, но не заменяет клеточную адаптацию. Поэтому при клиническом исследовании важно фиксировать длительность адаптации, освещённость и состояние зрачков. Нарушение темновой адаптации может сопровождать заболевания палочек и дефицит витамина A, однако один симптом ночной слепоты не устанавливает этиологию.",
      "Dark adaptation is more than pupil dilation. After moving from bright light into darkness, photopigment availability recovers and photoreceptor sensitivity and retinal gain change. Cones adapt relatively rapidly, whereas rods ultimately provide greater sensitivity at very low luminance but recover more slowly. In bright light, rod saturation limits their contribution and cones support color and high-resolution vision. Pupil size changes the amount of incident light but cannot replace cellular adaptation. Clinical measurements must therefore control adaptation time, luminance and pupil state. Impaired dark adaptation can occur with rod disorders or vitamin A deficiency, but night blindness alone does not establish the cause.",
      "Қараңғылыққа бейімделу тек қарашықтың кеңеюі емес. Жарықтан қараңғылыққа ауысқанда фотопигменттердің қалпына келуі, фоторецептор сезімталдығы және торқабық тізбектерінің күшейтуі өзгереді. Сауытшалар тезірек бейімделеді, ал таяқшалар әлсіз жарықта жоғары сезімталдық береді, бірақ баяуырақ қалпына келеді. Жарықта таяқшалардың қанығуы олардың үлесін шектейді, сауытшалар түс пен айқын көруді қамтамасыз етеді. Қарашық диаметрі түсетін жарық мөлшерін өзгертеді, алайда жасушалық бейімделуді алмастырмайды. Клиникалық зерттеуде бейімделу уақытын, жарық деңгейін және қарашық жағдайын ескеру қажет."
    ]
  },
  {
    "id": "pupillary-reflex",
    "title": [
      "Зрачковый световой рефлекс и его диагностическое значение",
      "Pupillary light reflex and diagnostic significance",
      "Қарашықтың жарық рефлексі және диагностикалық маңызы"
    ],
    "text": [
      "Афферентная часть зрачкового светового рефлекса начинается в сетчатке, включая внутренне фоточувствительные ганглиозные клетки, и проходит по зрительному нерву и тракту к претектальной области среднего мозга. Претектальные нейроны проецируются к обоим ядрам Эдингера—Вестфаля. Парасимпатические преганглионарные волокна в составе глазодвигательного нерва переключаются в ресничном узле, а короткие ресничные нервы активируют сфинктер зрачка. Поэтому освещение одного глаза обычно вызывает прямое и содружественное сужение зрачков. Относительный афферентный зрачковый дефект выявляют пробой с перемещаемым фонариком; его нельзя автоматически трактовать как поражение глазодвигательного нерва. При оценке учитывают лекарства, анизокорию, состояние радужки и освещённость.",
      "The afferent limb of the pupillary light reflex begins in the retina, including intrinsically photosensitive retinal ganglion cells, and travels through the optic nerve and tract to the midbrain pretectal region. Pretectal neurons project bilaterally to the Edinger–Westphal nuclei. Preganglionic parasympathetic fibers in the oculomotor nerve synapse in the ciliary ganglion; short ciliary nerves activate the pupillary sphincter. Thus illuminating one eye normally produces direct and consensual constriction. A relative afferent pupillary defect can be assessed using a swinging-flashlight test and should not automatically be attributed to an oculomotor lesion. Medication, anisocoria, iris pathology and ambient light must be considered.",
      "Қарашықтың жарық рефлексінің афференттік бөлігі торқабықтан, оның ішінде ішкі фотосезімтал ганглиоздық жасушалардан басталып, көру нерві мен тракты арқылы ортаңғы мидың претекталдық аймағына өтеді. Претекталдық нейрондар екі жақтағы Эдингер—Вестфаль ядроларына проекция жасайды. Көзқимылдатқыш нервтің парасимпатикалық талшықтары кірпікшелі түйінде ауысып, қысқа кірпікшелі нервтер қарашық сфинктерін белсендіреді. Сондықтан бір көзді жарықтандырғанда тікелей және содружестволық тарылу байқалады. Салыстырмалы афференттік ақауды ауыспалы фонарик сынамасымен анықтайды; оны автоматты түрде көзқимылдатқыш нерв зақымына жатқызуға болмайды."
    ]
  },
  {
    "id": "visual-examination",
    "title": [
      "Методы исследования зрения и интерпретация результатов",
      "Methods of visual assessment and interpretation",
      "Көруді зерттеу әдістері және нәтижелерді түсіндіру"
    ],
    "text": [
      "Острота зрения оценивает способность различать мелкие детали и зависит от рефракции, состояния прозрачных сред, макулы и проводящих путей. Периметрия исследует поле зрения; для локализации поражения важны монокулярность или бинокулярность дефекта, его вертикальные и горизонтальные границы, воспроизводимость и надёжность фиксации. Офтальмоскопия позволяет оценивать диск зрительного нерва и сетчатку, оптическая когерентная томография — структуру сетчатки и слоя нервных волокон, электроретинография — суммарные ответы ретинальных клеточных популяций, зрительные вызванные потенциалы — проведение по зрительному пути с ограниченной топической специфичностью. Ни один метод сам по себе не заменяет сопоставление с анамнезом и неврологическим осмотром. В учебных случаях обязательно различайте измеренное наблюдение, гипотезу локализации и подтверждённый диагноз.",
      "Visual acuity tests fine-detail discrimination and depends on refraction, ocular media, macular function and visual pathways. Perimetry measures the visual field; lesion localization depends on whether the defect is monocular or binocular, its respect for vertical or horizontal meridians, reproducibility and fixation reliability. Fundoscopy assesses the optic disc and retina; optical coherence tomography measures retinal and nerve-fiber-layer structure; electroretinography captures aggregate retinal responses; visual evoked potentials assess pathway function but have limited anatomical specificity. No single investigation replaces clinical history and neurological examination. In teaching cases distinguish measured observation, localization hypothesis and confirmed diagnosis.",
      "Көру өткірлігі ұсақ бөлшектерді ажыратуды бағалайды және рефракцияға, көздің мөлдір орталарына, макулаға және көру жолдарына тәуелді. Периметрия көру өрісін зерттейді; зақым орнын анықтауда ақаудың бір не екі көзде болуы, шекарасы, қайталануы және фиксация сенімділігі маңызды. Офтальмоскопия көру нерві дискісі мен торқабықты, оптикалық когеренттік томография торқабық пен нерв талшықтары қабатын бағалайды. Электроретинография торқабық жасушаларының жиынтық жауабын, көру шақырылған потенциалдары көру жолының қызметін көрсетеді, бірақ олардың топикалық нақтылығы шектеулі. Бір ғана әдіс анамнез бен неврологиялық тексеруді алмастырмайды."
    ]
  },
  {
    "id": "visual-clinical-reasoning",
    "title": [
      "Разбор клинической локализации: три диагностических ситуации",
      "Clinical localization: three diagnostic patterns",
      "Клиникалық локализация: үш диагностикалық жағдай"
    ],
    "text": [
      "Ситуация 1: постепенное снижение зрения только одного глаза при поражении зрительного нерва обычно указывает на прехиазмальную локализацию; наличие боли при движении глаз, нарушения цветоощущения и афферентного дефекта уточняет гипотезу, но не определяет причину без обследования. Ситуация 2: битемпоральное выпадение полей зрения заставляет рассматривать поражение хиазмы, например при объёмном процессе селлярной области; необходимы формальная периметрия и нейровизуализация. Ситуация 3: правосторонняя гомонимная гемианопсия указывает на левостороннее ретрохиазмальное поражение, но по одному полю зрения нельзя надёжно различить тракт, лучистость и затылочную кору. Внезапное появление дефекта зрения требует не учебного наблюдения, а неотложной клинической оценки. Во всех случаях разделяйте признак, предполагаемую локализацию, дифференциальные причины и подтверждающие исследования.",
      "Pattern 1: progressive monocular visual loss from optic nerve dysfunction suggests a prechiasmal site; pain with eye movement, impaired color vision and an afferent pupillary defect refine the hypothesis but do not establish etiology without investigation. Pattern 2: bitemporal visual-field loss suggests chiasmal involvement, including possible sellar masses, requiring formal perimetry and imaging. Pattern 3: right homonymous hemianopia suggests a left retrochiasmal lesion, but field pattern alone may not reliably distinguish optic tract, radiations and occipital cortex. Sudden visual loss requires urgent clinical assessment rather than teaching-only observation. For each pattern distinguish observed signs, suspected localization, differential causes and confirmatory tests.",
      "1-жағдай: бір көздің көруі біртіндеп төмендесе, көру нервінің хиазмаға дейінгі зақымы ықтимал; көз қозғалғандағы ауырсыну, түсті ажырату және афференттік қарашық ақауы гипотезаны нақтылайды, бірақ себебін зерттеусіз анықтамайды. 2-жағдай: битемпоралдық көру өрісі ақауы хиазма зақымын, соның ішінде селлярлық аймақтағы түзілісті қарастыруды талап етеді; периметрия мен бейнелеу қажет. 3-жағдай: оң жақ гомонимдік гемианопсия сол жақ хиазмадан кейінгі зақымды көрсетеді, бірақ тек өріс ақауына қарап тракт, сәулелену және шүйде қыртысын сенімді ажырату қиын. Көрудің кенеттен төмендеуі шұғыл клиникалық бағалауды талап етеді. Әр жағдайда белгі, болжамды локализация, ықтимал себеп және растаушы зерттеу бөлек қаралады."
    ]
  }
] as const;

export function moduleTwentyExpandedTheory(language: Language) {
  const index = language === "RU" ? 0 : language === "EN" ? 1 : 2;
  return chapters.map(chapter => ({
    id: chapter.id,
    title: chapter.title[index],
    blocks: [{ type: "paragraph" as const, text: chapter.text[index] }],
  }));
}
