import type { Language } from "../course";
import type { CasesLesson } from "../cases";
// Authored teaching cases: Guyton & Hall 13e chapters 59,74; Ganong 23e chapters 18,39.
const scenarios = [
  {
    "id": "osmotic-vs-volume",
    "title": {
      "RU": "Осмотический и объёмный стимулы",
      "EN": "Osmotic versus volume stimuli",
      "KZ": "Осмостық және көлемдік стимулдар"
    },
    "situation": {
      "RU": "В двух учебных сериях: А — эффективная осмоляльность плазмы возрастает с 285 до 298 мОсм/кг без существенного снижения эффективного объёма; Б — эффективный объём снижается при осмоляльности около 285 мОсм/кг. В обеих сериях концентрация вазопрессина повышена. Сравните механизмы, не предполагая, что одна величина гормона позволяет локализовать нарушение.",
      "EN": "In two teaching trials: A — effective plasma osmolality rises from 285 to 298 mOsm/kg without major effective-volume loss; B — effective circulating volume falls with osmolality near 285 mOsm/kg. Vasopressin increases in both. Compare the mechanisms without assuming that one hormone value localizes a lesion.",
      "KZ": "Екі оқу жағдайы: А — тиімді плазма осмоляльдылығы 285-тен 298 мОсм/кг-ға жоғарылайды, тиімді қан көлемі айтарлықтай азаймайды; Б — осмоляльдылық шамамен 285 мОсм/кг болғанда тиімді қан көлемі төмендейді. Екі жағдайда да вазопрессин артады. Гормонның бір ғана көрсеткіші зақым орнын анықтайды деп есептемей, тетіктерді салыстырыңыз."
    },
    "explanation": {
      "RU": "В ситуации А преобладает осмотический сигнал, в ситуации Б — барорецепторные влияния и ангиотензин II. Оба механизма могут усиливать секрецию вазопрессина; уровень гормона сам по себе не определяет место нарушения.",
      "EN": "Trial A primarily recruits osmosensitive signaling; B recruits baroreceptor and angiotensin II pathways. Both can increase vasopressin.",
      "KZ": "А жағдайында осмосезгіш құрылымдар, Б жағдайында барорецепторлық және ангиотензин II ықпалы маңызды; екі жол да вазопрессинді арттыра алады."
    }
  },
  {
    "id": "humidity-heat",
    "title": {
      "RU": "Влажность и эффективность теплоотдачи",
      "EN": "Humidity and effective heat loss",
      "KZ": "Ылғалдылық және жылу шығару"
    },
    "situation": {
      "RU": "Те же добровольцы выполняют одинаковую умеренную нагрузку при 32 °C: в одной серии влажность 35%, в другой — 85%. Потоотделение сопоставимо, но внутренняя температура во второй серии растёт быстрее. Объясните отличие секреции пота от его испарения.",
      "EN": "The same volunteers exercise moderately at 32 °C in 35% and 85% relative humidity. Sweat production is comparable, but core temperature rises faster in the humid trial. Distinguish sweat secretion from evaporation.",
      "KZ": "Бірдей еріктілер 32 °C-та салыстырмалы ылғалдылығы 35% және 85% болатын ортада бірдей орташа жүктеме орындайды. Тер бөлінуі ұқсас, бірақ ылғалды жағдайда ішкі температура тезірек көтеріледі. Тердің бөлінуі мен булануының айырмасын түсіндіріңіз."
    },
    "explanation": {
      "RU": "При высокой влажности испарение затрудняется, хотя потовые железы могут выделять сопоставимое количество пота; рост температуры не доказывает лихорадку.",
      "EN": "Higher humidity impairs evaporation even with similar sweat secretion; a temperature rise alone does not establish fever.",
      "KZ": "Ылғалдылық жоғары болғанда тердің булануы қиындайды, тер бөлінуі шамалас болуы мүмкін; температураның көтерілуі қызбаны дәлелдемейді."
    }
  },
  {
    "id": "fever-vs-heat",
    "title": {
      "RU": "Лихорадка или перегревание?",
      "EN": "Fever or environmental hyperthermia?",
      "KZ": "Қызба ма, әлде қызып кету ме?"
    },
    "situation": {
      "RU": "В случае А при инфекции в начале подъёма температуры наблюдаются озноб и сужение кожных сосудов. В случае Б после пребывания в сильной жаре температура повышается без обязательного изменения регулируемой точки. Сопоставьте регуляторные механизмы; не ставьте диагноз по одному значению температуры.",
      "EN": "In case A, early infection-associated temperature rise includes chills and cutaneous vasoconstriction. In case B, intense environmental heat elevates temperature without necessarily changing the thermoregulatory set point. Compare mechanisms; do not diagnose from one temperature reading.",
      "KZ": "А жағдайында инфекция кезіндегі температура көтерілуінің басында қалтырау мен тері тамырларының тарылуы байқалады. Б жағдайында қатты ыстықтан температура реттелетін деңгей міндетті түрде өзгермей жоғарылайды. Тетіктерді салыстырыңыз; бір температура көрсеткішімен диагноз қоймаңыз."
    },
    "explanation": {
      "RU": "Лихорадка связана с повышением регулируемой точки, в том числе через простагландин E2; при перегревании теплоотдача не покрывает тепловую нагрузку.",
      "EN": "Fever involves an elevated regulated set point, including prostaglandin E2 signaling; environmental hyperthermia reflects heat gain exceeding dissipation.",
      "KZ": "Қызбада простагландин E2 қатысуымен реттелетін температура деңгейі жоғарылайды; қызып кетуде жылу шығару жылу жүктемесін өтей алмайды."
    }
  }
];
const questions = [
  {
    "RU": "Какие факты даны и какие переменные контролируются?",
    "EN": "Which findings are supplied and which variables are controlled?",
    "KZ": "Қандай деректер берілген және қандай айнымалылар бақыланады?"
  },
  {
    "RU": "Постройте причинную цепь от стимула до физиологического ответа.",
    "EN": "Build a causal chain from stimulus to physiological response.",
    "KZ": "Стимулдан физиологиялық жауапқа дейінгі себептік тізбекті құрыңыз."
  },
  {
    "RU": "Какое дополнительное измерение различит альтернативные объяснения? Назовите ограничение вывода.",
    "EN": "Which additional measurement discriminates alternatives? State a limitation of inference.",
    "KZ": "Қандай қосымша өлшеу балама түсіндірмелерді ажыратады? Қорытынды шегін көрсетіңіз."
  }
];
export function createModuleFifteenCases(language: Language, moduleTitle: string, ui: CasesLesson["ui"]): CasesLesson {
 return {kind:"cases",title:language==="RU"?"Ситуационные задачи":language==="EN"?"Case Problems":"Ситуациялық тапсырмалар",moduleTitle,introduction:language==="RU"?"Разберите данные, механизм, альтернативу и ограничения вывода.":language==="EN"?"Analyze evidence, mechanism, alternatives and limits of inference.":"Деректерді, тетікті, баламаларды және қорытынды шектерін талдаңыз.",ui,cases:scenarios.map((s,index)=>({id:"m15-case-"+s.id,title:s.title[language],situation:s.situation[language],stages:questions.map((question,j)=>({title:(j+1)+". "+(language==="RU"?["Данные","Механизм","Проверка"][j]:language==="EN"?["Evidence","Mechanism","Discrimination"][j]:["Деректер","Тетік","Тексеру"][j]),questions:[question[language]]})),explanation:[s.explanation[language]]}))};
}
