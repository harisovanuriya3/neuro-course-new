import type { Language } from "../course";
const t=(RU:string,EN:string,KZ:string):Record<Language,string>=>({RU,EN,KZ});
const entries = [
  {
    "id": "module-12-reviewed-1",
    "prompt": {
      "RU": "Выстройте цепь прямого пути от коры через стриатум и GPi/SNr к таламусу. Как изменится таламическое торможение при усилении этой активности, если остальные входы постоянны?",
      "EN": "Trace the canonical direct pathway from cortex through striatum and GPi/SNr to thalamus. What happens to thalamic inhibition if this input increases with other inputs held fixed?",
      "KZ": "Қыртыстан стриатум мен GPi/SNr арқылы таламусқа дейінгі тікелей жолды көрсетіңіз. Басқа кірістер тұрақты болса, осы жол күшейгенде таламус тежелуі қалай өзгереді?"
    },
    "explanation": {
      "RU": "Стриарные ГАМК-ергические нейроны тормозят GPi/SNr, снижая тонический тормозный выход к таламусу. Таламус растормаживается. Это каноническое направление связи, а не гарантия любого движения.",
      "EN": "GABAergic striatal neurons inhibit GPi/SNr and reduce tonic inhibitory output to thalamus, producing disinhibition. This is a canonical pathway sign, not a guarantee that movement occurs.",
      "KZ": "Стриатумның ГАМҚ-ергиялық нейрондары GPi/SNr-ды тежеп, таламусқа тоникалық тежеуді азайтады. Таламус тежелуден босайды. Бұл қозғалыстың міндетті түрде болатынын білдірмейді."
    },
    "target": {
      "section": "theory"
    }
  },
  {
    "id": "module-12-reviewed-2",
    "prompt": {
      "RU": "При избирательном усилении непрямого пути проследите знак связи стриатум → GPe → STN → GPi/SNr → таламус. Что нужно держать постоянным для проверки прогноза?",
      "EN": "With selectively increased indirect-pathway input, trace the signs striatum → GPe → STN → GPi/SNr → thalamus. What should be controlled to test the prediction?",
      "KZ": "Жанама жол таңдамалы күшейгенде стриатум → GPe → STN → GPi/SNr → таламус байланыстарының таңбасын көрсетіңіз. Болжамды тексеру үшін нені тұрақты ұстау керек?"
    },
    "explanation": {
      "RU": "Стриатум тормозит GPe; ослабление торможения STN повышает возбуждающий вклад STN в GPi/SNr, усиливая торможение таламуса в упрощённой модели. Необходимо контролировать другие афферентные входы и исходное состояние сети.",
      "EN": "Striatum inhibits GPe; reduced GPe inhibition of STN permits stronger STN excitation of GPi/SNr and greater thalamic inhibition in the simplified model. Other inputs and network state need control.",
      "KZ": "Стриатум GPe-ні тежейді; STN тежелуі азайғанда ол GPi/SNr-ды күштірек қоздырып, қарапайым модельде таламустың тежелуін арттырады. Өзге кірістер мен желінің бастапқы күйін бақылау қажет."
    },
    "target": {
      "section": "theory"
    }
  },
  {
    "id": "module-12-reviewed-3",
    "prompt": {
      "RU": "Дофаминергическая модуляция SNc ослабла. Сравните ожидаемые последствия для D1- и D2-зависимых стриарных популяций. Почему нельзя назвать это прямым доказательством диагноза?",
      "EN": "SNc dopaminergic modulation decreases. Compare predicted effects in D1- and D2-associated striatal populations. Why does this alone not establish a diagnosis?",
      "KZ": "SNc дофаминдік модуляциясы азайды. D1 және D2 рецепторларымен байланысты стриатум популяцияларындағы ықтимал әсерлерді салыстырыңыз. Неге бұл өздігінен диагнозды дәлелдемейді?"
    },
    "explanation": {
      "RU": "В канонической схеме дофамин облегчает D1-связанный прямой путь и ослабляет D2-связанный непрямой. Его снижение может уменьшить растормаживание таламуса и затруднить выбор движения; реальная сеть сложнее, а симптом и модель не устанавливают этиологию.",
      "EN": "In the canonical model dopamine facilitates the D1-associated direct route and restrains the D2-associated indirect route. Reduced dopamine may impede movement selection; this model or symptom does not establish etiology.",
      "KZ": "Канондық модельде дофамин D1-мен байланысты тікелей жолды жеңілдетіп, D2-мен байланысты жанама жолды бәсеңдетеді. Оның азаюы қозғалысты таңдауды қиындатуы мүмкін; модель де, белгі де этиологияны дәлелдемейді."
    },
    "target": {
      "section": "theory"
    }
  },
  {
    "id": "module-12-reviewed-4",
    "prompt": {
      "RU": "В экспериментальном задании при конфликте двух действий активация корково-субталамического входа связана с кратким подавлением ответа. Опишите гиперпрямой путь и укажите, почему по времени реакции нельзя вычислить синаптическую задержку одного звена.",
      "EN": "During an action-conflict task, engagement of the cortico-subthalamic route accompanies transient response suppression. Describe the hyperdirect pathway and explain why reaction time alone cannot reveal one synaptic delay.",
      "KZ": "Екі әрекет қақтығысқанда кортико-субталамустық кіріс жауапты уақытша тежей алады. Гипертікелей жолды сипаттап, тек реакция уақыты бойынша бір синапстың кідірісін неге табуға болмайтынын түсіндіріңіз."
    },
    "explanation": {
      "RU": "Корковый возбуждающий вход к STN способен повысить активность GPi/SNr и их тормозный выход. Время реакции складывается из восприятия, решения, проведения и моторных компонентов, поэтому не является отдельной синаптической латентностью.",
      "EN": "Excitatory cortical input to STN can recruit GPi/SNr inhibitory output. Reaction time includes perception, decision, transmission and motor stages, not the latency of a single synapse.",
      "KZ": "Қыртыстың STN-ге қоздырғыш кірісі GPi/SNr-дың тежеуші шығысын арттыра алады. Реакция уақытына қабылдау, шешім, өткізу және моторлық кезеңдер кіреді; ол жеке синапс кідірісі емес."
    },
    "target": {
      "section": "theory"
    }
  },
  {
    "id": "module-12-reviewed-5",
    "prompt": {
      "RU": "Пациент начинает движение медленно, но максимальная мышечная сила относительно сохранена; в другом опыте наблюдается промахивание мимо цели. Разделите брадикинезию, парез и дисметрию и предложите дополнительные пробы.",
      "EN": "A patient initiates movement slowly with relatively preserved maximum strength; a different task shows inaccurate target-directed movement. Distinguish bradykinesia, paresis and dysmetria and propose additional measurements.",
      "KZ": "Науқас қозғалысты баяу бастайды, бірақ ең жоғары бұлшықет күші сақталған; басқа сынамада нысанадан ауытқу байқалады. Брадикинезияны, парезді және дисметрияны ажыратып, қосымша тексеруді ұсыныңыз."
    },
    "explanation": {
      "RU": "Брадикинезия относится к скорости и масштабу движения, парез — к снижению силы, дисметрия — к точности попадания в цель. Разделите измерение силы, частоты и амплитуды повторных движений и координатной ошибки; один симптом не локализует поражение однозначно.",
      "EN": "Bradykinesia concerns movement speed/amplitude, paresis concerns strength and dysmetria concerns target accuracy. Separately measure strength, repetitive movement speed/amplitude and endpoint error; one sign alone is not a unique localization.",
      "KZ": "Брадикинезия қозғалыс жылдамдығы мен ауқымына, парез күшке, дисметрия нысанаға дәл жетуге қатысты. Күшті, қайталанатын қозғалыстың жиілігі мен амплитудасын және дәлдік қатесін бөлек өлшеу керек; бір белгі зақымды нақты орнықтыра алмайды."
    },
    "target": {
      "section": "practice"
    }
  }
] as const;
export function moduleTwelveReviewQuestions(language:Language){
 return entries.map(item=>({id:item.id,prompt:item.prompt[language],explanation:item.explanation[language],target:item.target}));
}
