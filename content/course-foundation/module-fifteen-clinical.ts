import type { Language } from "../course";
import type { ReadingLesson } from "../study";
import { getSectionTitle } from "../sections";

// Original, non-diagnostic teaching scenarios; mechanisms aligned with Guyton & Hall 13e chs 59,74;
// Ganong 23e chs 18,39; Ghai 8e supports peripheral testing limitations, not nuclear localization.
const data: Record<Language, {intro:string; cards: {title:string; explanation:string}[]}> = {
  "RU": {
    "intro": "Клинические связи гипоталамической регуляции. Для каждой ситуации назовите механизм, альтернативное объяснение, дополнительное измерение и границы вывода. Это учебные случаи, а не инструкция по диагностике или лечению.",
    "cards": [
      {
        "title": "Гиперосмоляльность: жажда и вазопрессин",
        "explanation": "У взрослого при ограниченном доступе к питьевой воде эффективная осмоляльность плазмы повысилась с 285 до 298 мОсм/кг, артериальное давление существенно не изменилось. Осмочувствительные структуры переднего гипоталамуса и околожелудочковых органов способствуют жажде и секреции вазопрессина. Через V2-рецепторы собирательных трубочек вазопрессин увеличивает включение AQP2 и реабсорбцию воды. Предскажите изменение жажды, диуреза и осмоляльности мочи при сохранной функции почек. Почему только по объёму мочи нельзя доказать поражение гипоталамуса?"
      },
      {
        "title": "Потеря эффективного объёма: неосмотический стимул",
        "explanation": "После значимой потери жидкости эффективный объём циркуляции снижен, хотя измеренная осмоляльность плазмы остаётся близкой к исходной. Сигналы барорецепторов и ангиотензин II могут поддерживать жажду и неосмотическую секрецию вазопрессина. Сравните этот путь с осмотическим стимулом и объясните, почему гормональная реакция не всегда следует только за осмоляльностью. Какие показатели гемодинамики, электролитов и функции почек понадобятся для интерпретации? Не предлагайте самостоятельные водные пробы."
      },
      {
        "title": "Жара и влажность: испарение, а не количество пота",
        "explanation": "Одни и те же здоровые добровольцы выполняют сопоставимую нагрузку при температуре воздуха 32 °C в двух сериях: относительная влажность 35% и 85%. При сходной скорости потоотделения во влажном воздухе испарение затрудняется, поэтому теплоотдача может быть ниже, а температура тела — выше. Объясните роль преоптической области, кожных терморецепторов и сосудистых реакций. Почему увеличение температуры само по себе не означает лихорадку или очаг в гипоталамусе?"
      },
      {
        "title": "Лихорадка и перегревание: разные механизмы",
        "explanation": "В первом учебном случае при инфекции повышается регулируемая температурная точка под влиянием простагландина E2; в начале возможны озноб и вазоконстрикция. Во втором случае при тяжёлой жаре теплоотдача не покрывает теплопродукцию без обязательного повышения регулируемой точки. Сопоставьте ожидаемые эффекторные реакции и ограничения интерпретации одного измерения температуры. Высокая температура с нарушением сознания требует срочной медицинской оценки; это не домашний эксперимент."
      },
      {
        "title": "Суточный ритм и гипофиз: пределы локализации",
        "explanation": "После смены часовых поясов у добровольца временно смещаются сон и время субъективной сонливости. Световые сигналы через ретиногипоталамический путь синхронизируют супрахиазматическое ядро, а его сети участвуют в координации циркадных ритмов. Отдельно объясните, почему вазопрессин и окситоцин поступают в заднюю долю гипофиза по аксонам, а регуляция передней доли преимущественно использует портальные сосуды. Почему дневник сна, пульс и АД не определяют активность отдельного ядра?"
      }
    ]
  },
  "EN": {
    "intro": "Clinical bridges to hypothalamic regulation. For each scenario identify the mechanism, an alternative explanation, an additional measurement and the limits of inference. These are teaching cases, not diagnostic or treatment instructions.",
    "cards": [
      {
        "title": "Hyperosmolality: thirst and vasopressin",
        "explanation": "With limited access to drinking water, an adult's effective plasma osmolality rises from 285 to 298 mOsm/kg while blood pressure remains broadly stable. Osmosensitive structures in the anterior hypothalamus and circumventricular organs contribute to thirst and vasopressin release. Through collecting-duct V2 receptors, vasopressin promotes AQP2 insertion and water reabsorption. Predict thirst, urine volume and urine osmolality assuming intact renal function. Why cannot urine volume alone localize a defect to the hypothalamus?"
      },
      {
        "title": "Reduced effective volume: a nonosmotic drive",
        "explanation": "After substantial fluid loss, effective circulating volume falls while measured plasma osmolality remains near baseline. Baroreceptor inputs and angiotensin II can sustain thirst and nonosmotic vasopressin secretion. Compare this pathway with the osmotic stimulus and explain why hormone secretion does not depend on osmolality alone. Which hemodynamic, electrolyte and renal-function measurements would inform interpretation? Do not propose unsupervised water challenges."
      },
      {
        "title": "Heat and humidity: evaporation versus sweating",
        "explanation": "The same healthy volunteers undertake comparable activity at 32 °C in two sessions, with relative humidity of 35% and 85%. Even with similar sweat production, evaporation is less effective in humid air, so heat loss may fall and body temperature may rise. Explain the preoptic area's contribution, cutaneous thermosensation and vascular responses. Why does a temperature rise alone prove neither fever nor a hypothalamic lesion?"
      },
      {
        "title": "Fever versus hyperthermia: different mechanisms",
        "explanation": "In one teaching scenario, infection raises the thermoregulatory set point through prostaglandin E2; chills and vasoconstriction may occur early. In another, severe environmental heat overwhelms heat dissipation without necessarily raising the set point. Compare expected effector responses and the limits of a single temperature measurement. High temperature with altered consciousness requires urgent medical assessment; this is not a home experiment."
      },
      {
        "title": "Circadian timing and pituitary routes: localization limits",
        "explanation": "Following travel across time zones, a volunteer temporarily experiences shifted sleep timing and subjective sleepiness. Light signals via the retinohypothalamic tract synchronize the suprachiasmatic nucleus, whose networks help coordinate circadian rhythms. Separately explain why vasopressin and oxytocin reach the posterior pituitary via axons, whereas anterior-pituitary regulation predominantly uses portal vessels. Why cannot a sleep diary, pulse or blood pressure identify activity in an individual nucleus?"
      }
    ]
  },
  "KZ": {
    "intro": "Гипоталамустық реттелудің клиникалық байланыстары. Әр жағдайда тетікті, балама түсіндірмені, қосымша өлшемді және қорытынды шегін көрсетіңіз. Бұл диагноз қою немесе емдеу нұсқаулығы емес, оқу жағдайлары.",
    "cards": [
      {
        "title": "Гиперосмоляльдылық: шөлдеу және вазопрессин",
        "explanation": "Ауызсуға қолжетімділігі шектеулі ересек адамда плазманың тиімді осмоляльдылығы 285-тен 298 мОсм/кг-ға көтерілді, ал артериялық қысым айтарлықтай өзгермеді. Алдыңғы гипоталамус пен қарыншамаңы мүшелерінің осмосезгіш құрылымдары шөлдеуге және вазопрессин бөлінуіне ықпал етеді. Вазопрессин жинағыш түтікшелердің V2-рецепторлары арқылы AQP2 енгізілуін және судың қайта сіңуін арттырады. Бүйрек қызметі сақталғанда шөлдеу, диурез және несеп осмоляльдылығы қалай өзгеретінін болжаңыз. Неге несеп көлемі ғана гипоталамус зақымын дәлелдемейді?"
      },
      {
        "title": "Тиімді қан көлемінің азаюы: осмостық емес ықпал",
        "explanation": "Елеулі сұйықтық жоғалтудан кейін айналымдағы тиімді қан көлемі азайды, бірақ плазма осмоляльдылығы бастапқы деңгейге жақын қалды. Барорецепторлардан келетін сигналдар мен ангиотензин II шөлдеуді және вазопрессиннің осмостық емес бөлінуін күшейтуі мүмкін. Бұл жолды осмостық стимулмен салыстырып, гормон бөлінуінің тек осмоляльдылыққа тәуелді еместігін түсіндіріңіз. Түсіндіру үшін гемодинамика, электролиттер және бүйрек қызметінің қандай көрсеткіштері керек? Өздігінен су жүктемесі сынағын ұсынбаңыз."
      },
      {
        "title": "Ыстық және ылғалдылық: тердің булануы",
        "explanation": "Бірдей дені сау еріктілер 32 °C температурада салыстырмалы ылғалдылығы 35% және 85% болатын екі жағдайда ұқсас жүктеме орындайды. Тер бөлінуі шамалас болса да, ылғалды ауада булану қиындайды; сондықтан жылу шығару төмендеп, дене температурасы жоғарылауы мүмкін. Преоптикалық аймақтың, тері терморецепторларының және тамырлық жауаптардың рөлін түсіндіріңіз. Неге температураның көтерілуі өздігінен қызбаны немесе гипоталамус зақымын дәлелдемейді?"
      },
      {
        "title": "Қызба және гипертермия: әртүрлі тетіктер",
        "explanation": "Бірінші оқу жағдайында инфекция кезінде простагландин E2 әсерінен температураның реттелетін деңгейі жоғарылайды; бастапқыда қалтырау мен тамырлардың тарылуы байқалуы мүмкін. Екінші жағдайда қоршаған ортаның қатты ыстығында жылу шығару жеткіліксіз болады, бірақ реттелетін деңгей міндетті түрде өзгермейді. Эффекторлық жауаптарды және бір реттік температура өлшемінің шектеулерін салыстырыңыз. Жоғары температура сананың бұзылуымен қатар жүрсе, шұғыл медициналық бағалау қажет; бұл үйдегі тәжірибе емес."
      },
      {
        "title": "Тәуліктік ырғақ және гипофиз: локализация шектеулері",
        "explanation": "Бірнеше уақыт белдеуін кесіп өткеннен кейін еріктінің ұйқы уақыты мен ұйқышылдық сезімі уақытша ығысады. Жарық сигналдары ретиногипоталамустық жол арқылы супрахиазматикалық ядроны синхрондайды; оның желілері циркадтық ырғақтарды үйлестіруге қатысады. Вазопрессин мен окситоциннің гипофиздің артқы бөлігіне аксондар арқылы, ал алдыңғы бөліктің реттеуші гормондарының көбіне қақпалық тамырлар арқылы жеткізілетінін бөлек түсіндіріңіз. Неге ұйқы күнделігі, пульс немесе артериялық қысым жеке ядро белсенділігін анықтамайды?"
      }
    ]
  }
};

export function createModuleFifteenClinical(language: Language): ReadingLesson {
 const copy = data[language];
 return {kind:"clinical",title:getSectionTitle("clinical",language),introduction:copy.intro,cards:copy.cards.map((card,index)=>({id:`module-15-clinical-${index+1}`,title:card.title,paragraphs:[card.explanation],links:[{section:"theory"},{section:index===4?"references":"cases"}]}))};
}
