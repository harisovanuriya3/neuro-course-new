import type { Language, Lesson } from "../types";
// Module 15 authored extension: educational physiology, not diagnostic guidance.
const sections = [
  {
    "id": "functional-anatomy",
    "heading": {
      "RU": "Функциональная анатомия гипоталамуса",
      "EN": "Functional anatomy of the hypothalamus",
      "KZ": "Гипоталамустың функционалдық анатомиясы"
    },
    "paragraph": {
      "RU": "Гипоталамус расположен в промежуточном мозге вокруг нижней части III желудочка. Преоптическая область интегрирует температурные сигналы; супраоптическое и паравентрикулярное ядра содержат нейроны, синтезирующие вазопрессин и окситоцин; дугообразное ядро участвует в энергетическом балансе; супрахиазматическое ядро синхронизирует циркадные ритмы. Функции распределены по взаимодействующим сетям, а не изолированным «центрам».",
      "EN": "The hypothalamus lies in the diencephalon around the lower third ventricle. The preoptic area integrates thermal information; supraoptic and paraventricular nuclei contain vasopressin- and oxytocin-producing neurons; the arcuate nucleus participates in energy balance; and the suprachiasmatic nucleus coordinates circadian timing. These functions arise from interacting networks rather than isolated centers.",
      "KZ": "Гипоталамус аралық мида, III қарыншаның төменгі бөлігінің маңында орналасқан. Преоптикалық аймақ температура сигналдарын біріктіреді; супраоптикалық және паравентрикулярлық ядроларда вазопрессин мен окситоцин түзетін нейрондар бар; доғалы ядро энергия теңгеріміне, ал супрахиазматикалық ядро циркадтық ырғақтарға қатысады. Қызметтер оқшау орталықтармен емес, өзара байланысқан желілермен жүзеге асады."
    }
  },
  {
    "id": "pituitary-axes",
    "heading": {
      "RU": "Гипоталамо-гипофизарные оси",
      "EN": "Hypothalamic–pituitary axes",
      "KZ": "Гипоталамус–гипофиз осьтері"
    },
    "paragraph": {
      "RU": "Вазопрессин и окситоцин синтезируются преимущественно в магноцеллюлярных нейронах и выделяются из нейрогипофиза. Рилизинг-гормоны и соматостатин поступают через портальную систему в аденогипофиз. Основные оси: CRH–ACTH–кортизол, TRH–TSH–тиреоидные гормоны, GnRH–LH/FSH–половые гормоны, GHRH/соматостатин–GH–IGF-1. Дофамин тормозит секрецию пролактина. Отрицательная обратная связь ограничивает избыточную секрецию.",
      "EN": "Vasopressin and oxytocin are mainly synthesized in magnocellular neurons and released from the posterior pituitary. Releasing factors and somatostatin reach the anterior pituitary via portal vessels. Major axes include CRH–ACTH–cortisol, TRH–TSH–thyroid hormones, GnRH–LH/FSH–sex steroids and GHRH/somatostatin–GH–IGF-1. Dopamine inhibits prolactin secretion. Negative feedback limits excessive hormone release.",
      "KZ": "Вазопрессин мен окситоцин негізінен ірі жасушалы нейрондарда түзіліп, нейрогипофизден бөлінеді. Рилизинг-факторлар мен соматостатин портальдық қан тамырлары арқылы аденогипофизге жетеді. Негізгі осьтер: CRH–ACTH–кортизол, TRH–TSH–қалқанша без гормондары, GnRH–LH/FSH–жыныс гормондары және GHRH/соматостатин–GH–IGF-1. Дофамин пролактин бөлінуін тежейді. Теріс кері байланыс гормондардың шамадан тыс бөлінуін шектейді."
    }
  },
  {
    "id": "water-balance",
    "heading": {
      "RU": "Осморегуляция, вазопрессин и жажда",
      "EN": "Osmoregulation, vasopressin and thirst",
      "KZ": "Осморегуляция, вазопрессин және шөлдеу"
    },
    "paragraph": {
      "RU": "Рост эффективной осмоляльности стимулирует жажду и высвобождение вазопрессина. Вазопрессин действует через рецепторы V2 собирательных трубочек, увеличивая включение аквапорина-2 и реабсорбцию воды. Снижение эффективного объёма циркулирующей крови может повышать вазопрессин независимо от осмоляльности. Расчётная осмоляльность в ммоль/л ≈ 2 × Na + глюкоза + мочевина; тоничность обычно оценивают без мочевины. Это учебная модель, а не самостоятельный диагностический критерий.",
      "EN": "Higher effective plasma osmolality promotes thirst and vasopressin release. Vasopressin activates V2 receptors in collecting ducts, increasing aquaporin-2 insertion and water reabsorption. Reduced effective circulating volume can stimulate vasopressin independently of osmolality. Calculated osmolality in mmol/L is approximately 2 × sodium + glucose + urea; effective tonicity generally excludes urea. This teaching model is not a stand-alone diagnostic test.",
      "KZ": "Плазманың тиімді осмолялдығы жоғарыласа, шөлдеу мен вазопрессин бөлінуі күшейеді. Вазопрессин жинағыш түтікшелердегі V2 рецепторлары арқылы аквапорин-2 енгізілуін және судың кері сіңірілуін арттырады. Тиімді айналымдағы қан көлемі азайса, осмолялдыққа тәуелсіз вазопрессин көбеюі мүмкін. Есептік осмолялдық (ммоль/л) ≈ 2 × натрий + глюкоза + мочевина; тиімді тоникалық көрсеткіште мочевина әдетте есептелмейді. Бұл жеке диагностикалық өлшем емес, оқу моделі."
    }
  },
  {
    "id": "thermoregulation",
    "heading": {
      "RU": "Терморегуляция: холод, жара, лихорадка",
      "EN": "Thermoregulation: cold, heat and fever",
      "KZ": "Терморегуляция: суық, ыстық және қызба"
    },
    "paragraph": {
      "RU": "Преоптические сети интегрируют центральные и периферические температурные сигналы. При охлаждении усиливаются теплосбережение и теплопродукция, включая кожную вазоконстрикцию и дрожь; при перегревании — потоотделение и кожная вазодилатация. При лихорадке простагландин E2 способствует повышению регулируемой температурной установки; гипертермия может возникать без её повышения. Одинаковая температура тела не доказывает одинаковый механизм.",
      "EN": "Preoptic circuits integrate central and peripheral temperature inputs. Cooling recruits heat conservation and production, including cutaneous vasoconstriction and shivering; heating recruits sweating and cutaneous vasodilation. In fever, prostaglandin E2 contributes to an elevated thermoregulatory set point; hyperthermia may occur without such a shift. The same measured body temperature does not establish the same mechanism.",
      "KZ": "Преоптикалық желілер орталық және шеткі температура сигналдарын біріктіреді. Суықта жылуды сақтау және өндіру, соның ішінде тері тамырларының тарылуы мен қалтырау күшейеді; ыстықта терлеу және тері тамырларының кеңеюі артады. Қызба кезінде простагландин E2 реттелетін температура деңгейінің жоғарылауына қатысады; гипертермия мұндай өзгеріссіз де болуы мүмкін. Бірдей дене температурасы бірдей механизмді білдірмейді."
    }
  },
  {
    "id": "feeding",
    "heading": {
      "RU": "Голод, насыщение и энергетический баланс",
      "EN": "Hunger, satiety and energy balance",
      "KZ": "Аштық, тою және энергия теңгерімі"
    },
    "paragraph": {
      "RU": "Нейроны POMC/CART и AgRP/NPY дугообразного ядра интегрируют сигналы лептина, инсулина, грелина и других медиаторов. Лептин отражает долгосрочные энергетические запасы, а грелин участвует в формировании голода. Сигналы кишечника, блуждающего нерва, системы вознаграждения и окружающей среды также изменяют пищевое поведение. Модель одного «центра голода» недостаточна.",
      "EN": "Arcuate POMC/CART and AgRP/NPY neurons integrate leptin, insulin, ghrelin and other signals. Leptin conveys information about longer-term energy stores, whereas ghrelin contributes to hunger signaling. Gut hormones, vagal inputs, reward networks and environmental context also influence eating. A single hunger-center model is insufficient.",
      "KZ": "Доғалы ядроның POMC/CART және AgRP/NPY нейрондары лептин, инсулин, грелин және басқа сигналдарды біріктіреді. Лептин ұзақ мерзімді энергия қорлары туралы ақпарат береді, ал грелин аштық сигналына қатысады. Ішек гормондары, кезбе жүйке, марапаттау желілері және қоршаған орта да тамақтануға әсер етеді. Бір ғана «аштық орталығы» моделі жеткіліксіз."
    }
  },
  {
    "id": "stress-circadian",
    "heading": {
      "RU": "Стресс и циркадные ритмы",
      "EN": "Stress and circadian rhythms",
      "KZ": "Стресс және циркадтық ырғақтар"
    },
    "paragraph": {
      "RU": "При стрессовой реакции гипоталамический CRH стимулирует ACTH и секрецию кортизола; глюкокортикоиды участвуют в отрицательной обратной связи. Супрахиазматическое ядро получает световую информацию от сетчатки и согласует суточные ритмы, включая гормональную секрецию и сон–бодрствование. Уровень кортизола следует интерпретировать с учётом времени забора, лекарств и клинической ситуации.",
      "EN": "During stress, hypothalamic CRH promotes ACTH and cortisol secretion; glucocorticoids participate in negative feedback. The suprachiasmatic nucleus receives retinal light information and coordinates daily rhythms, including hormone secretion and sleep–wake timing. Cortisol measurements require interpretation in light of sampling time, medications and clinical context.",
      "KZ": "Стресс кезінде гипоталамустық CRH ACTH пен кортизол бөлінуін ынталандырады; глюкокортикоидтар теріс кері байланысқа қатысады. Супрахиазматикалық ядро торқабықтан жарық туралы ақпарат алып, гормон бөлінуі мен ұйқы–сергектік сияқты тәуліктік ырғақтарды үйлестіреді. Кортизол деңгейін қан алу уақыты, дәрілер және клиникалық жағдайды ескеріп түсіндіру керек."
    }
  }
];
export function createModuleFifteenTheory(language: Language, base: Lesson & {kind:"theory"}): Lesson & {kind:"theory"} {
 return {...base, sections:[...base.sections,...sections.map(s=>({id:s.id,title:s.heading[language],blocks:[{type:"paragraph" as const,text:s.paragraph[language]}]}))]};
}
