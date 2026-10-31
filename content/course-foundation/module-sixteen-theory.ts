import type { Language, Lesson } from "../types";
// Module 16: trilingual authored extension, educational physiology.
const sections = [
  {
    "id": "functional-networks",
    "heading": {
      "RU": "Лимбическая система как функциональная сеть",
      "EN": "Limbic system as a functional network",
      "KZ": "Лимбиялық жүйе функционалдық желі ретінде"
    },
    "paragraph": {
      "RU": "Лимбическая система — не единый анатомически замкнутый «центр эмоций». Миндалина, гиппокамп, поясная кора, гипоталамус, островковая и префронтальная кора участвуют в распределённых контурах оценки значимости, памяти, интероцепции и выбора действий. Функции структур перекрываются и зависят от контекста.",
      "EN": "The limbic system is not a single anatomically enclosed emotion center. Amygdala, hippocampus, cingulate cortex, hypothalamus, insula and prefrontal cortex contribute to distributed networks for salience, memory, interoception and action selection. Their functions overlap and depend on context.",
      "KZ": "Лимбиялық жүйе эмоцияның бір ғана тұйық анатомиялық орталығы емес. Амигдала, гиппокамп, белдеулік қыртыс, гипоталамус, аралшық және префронталдық қыртыс маңыздылықты бағалау, жад, интероцепция және әрекетті таңдау желілеріне қатысады. Олардың қызметтері қабаттасады және контекстке тәуелді."
    }
  },
  {
    "id": "amygdala",
    "heading": {
      "RU": "Миндалина и оценка значимости",
      "EN": "Amygdala and salience evaluation",
      "KZ": "Амигдала және маңыздылықты бағалау"
    },
    "paragraph": {
      "RU": "Базолатеральные комплексы миндалины интегрируют сенсорные и контекстные сигналы и участвуют в ассоциативном обучении. Центральные ядра через гипоталамус и ствол влияют на вегетативные и защитные ответы. Миндалина участвует не только в страхе, но и в оценке положительно и отрицательно значимых событий.",
      "EN": "Basolateral amygdala networks integrate sensory and contextual signals and support associative learning. Central nuclei influence autonomic and defensive responses via hypothalamic and brainstem connections. The amygdala processes both positively and negatively salient events, not fear alone.",
      "KZ": "Амигдаланың базолатералдық кешендері сенсорлық және контекстік сигналдарды біріктіріп, ассоциативтік үйренуге қатысады. Орталық ядролар гипоталамус пен ми бағаны арқылы вегетативтік және қорғаныш жауаптарына әсер етеді. Амигдала тек қорқынышқа емес, жағымды және жағымсыз маңызды оқиғаларды бағалауға қатысады."
    }
  },
  {
    "id": "hippocampus",
    "heading": {
      "RU": "Гиппокамп, контекст и память",
      "EN": "Hippocampus, context and memory",
      "KZ": "Гиппокамп, контекст және жад"
    },
    "paragraph": {
      "RU": "Гиппокамп участвует в формировании эпизодической памяти и пространственно-контекстных представлений. Его взаимодействие с миндалиной помогает связывать эмоциональную значимость с обстановкой. Поражение гиппокампа не означает утрату всех видов памяти; процедурное обучение может сохраняться.",
      "EN": "The hippocampus contributes to episodic memory formation and spatial-contextual representations. Its interactions with the amygdala help associate emotional significance with context. Hippocampal damage does not abolish every kind of memory; procedural learning may remain.",
      "KZ": "Гиппокамп эпизодтық жадтың қалыптасуына және кеңістіктік-контекстік көріністерге қатысады. Амигдаламен байланысы эмоциялық маңыздылықты жағдаймен байланыстыруға көмектеседі. Гиппокамп зақымданғанда жадтың барлық түрі жоғалмайды; процедуралық үйрену сақталуы мүмкін."
    }
  },
  {
    "id": "motivation",
    "heading": {
      "RU": "Мотивация, подкрепление и дофамин",
      "EN": "Motivation, reinforcement and dopamine",
      "KZ": "Мотивация, нығайту және дофамин"
    },
    "paragraph": {
      "RU": "Мезолимбические дофаминовые пути от вентральной области покрышки к прилежащему ядру участвуют в обучении по ошибке предсказания вознаграждения, мотивационной значимости и выборе поведения. Дофамин нельзя сводить к «гормону удовольствия»: сигнал зависит от задачи, ожиданий и нейронной популяции.",
      "EN": "Mesolimbic dopamine pathways from the ventral tegmental area to the nucleus accumbens participate in reward-prediction-error learning, incentive salience and behavioral selection. Dopamine is not simply a pleasure chemical; its signals depend on task, expectation and neuronal population.",
      "KZ": "Вентралдық жабын аймағынан прилежащий ядроға баратын мезолимбиялық дофамин жолдары сыйақыны болжау қатесі арқылы үйренуге, мотивациялық маңыздылыққа және мінез-құлықты таңдауға қатысады. Дофаминді тек «ләззат гормоны» деп түсіндіру дұрыс емес."
    }
  },
  {
    "id": "emotion-body",
    "heading": {
      "RU": "Эмоции, интероцепция и вегетативные ответы",
      "EN": "Emotion, interoception and autonomic responses",
      "KZ": "Эмоция, интероцепция және вегетативтік жауаптар"
    },
    "paragraph": {
      "RU": "Островковая и поясная кора участвуют в восприятии внутренних сигналов и организации эмоционального поведения. Гипоталамус и ствол обеспечивают многие сердечно-сосудистые, дыхательные и эндокринные компоненты реакции. Частота сердечных сокращений сама по себе не позволяет определить конкретную эмоцию.",
      "EN": "Insular and cingulate regions contribute to bodily-state perception and emotional behavior. Hypothalamic and brainstem circuits support cardiovascular, respiratory and endocrine response components. Heart rate alone cannot identify a particular emotion.",
      "KZ": "Аралшық және белдеулік қыртыс ішкі дене сигналдарын қабылдауға және эмоциялық мінез-құлыққа қатысады. Гипоталамус пен ми бағаны жүрек-қантамыр, тыныс алу және эндокриндік жауаптарды қамтамасыз етеді. Жүрек соғу жиілігі жеке эмоцияны дәл анықтамайды."
    }
  },
  {
    "id": "regulation",
    "heading": {
      "RU": "Префронтальная регуляция и клиническое значение",
      "EN": "Prefrontal regulation and clinical significance",
      "KZ": "Префронталдық реттелу және клиникалық маңызы"
    },
    "paragraph": {
      "RU": "Префронтальные сети участвуют в переоценке стимулов, торможении импульсивных ответов и целенаправленном выборе. При тревожных расстройствах, депрессии и посттравматических симптомах могут изменяться взаимодействия этих сетей; ни один отдельный снимок или физиологический показатель не является достаточным диагностическим тестом.",
      "EN": "Prefrontal networks support reappraisal, impulse regulation and goal-directed choice. Interactions among these networks can change in anxiety disorders, depression and post-traumatic symptoms; no single scan or physiological marker is a sufficient diagnostic test.",
      "KZ": "Префронталдық желілер стимулдарды қайта бағалауға, импульсивтік жауаптарды тежеуге және мақсатты таңдауға қатысады. Мазасыздық, депрессия және жарақаттан кейінгі симптомдар кезінде желілердің өзара әрекеті өзгеруі мүмкін; бір ғана бейне немесе физиологиялық көрсеткіш диагноз қоюға жеткіліксіз."
    }
  }
];
export function createModuleSixteenTheory(language: Language, base: Lesson & {kind:"theory"}): Lesson & {kind:"theory"} {
 return {...base,sections:[...base.sections,...sections.map(s=>({id:s.id,title:s.heading[language],blocks:[{type:"paragraph" as const,text:s.paragraph[language]}]}))]};
}
