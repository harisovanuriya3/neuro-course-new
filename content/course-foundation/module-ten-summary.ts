import type { Language } from "../course";
import { getSectionTitle } from "../sections";
import type { ReadingLesson } from "../study";

// Module 10 brainstem one-minute physiological summary. No clinical diagnosis from one sign.
// Library references: Guyton & Hall 13e PDF pp. 718–720; Ganong 23e pp. 243–244;
// C. L. Ghai Practical Physiology 8e pp. 301–303.
type Takeaway = { title: string; explanation: string };
type FiveTakeaways = readonly [Takeaway, Takeaway, Takeaway, Takeaway, Takeaway];
const takeaways: Record<Language, FiveTakeaways> = {
  RU: [
    { title: "Ствол мозга: три уровня и перекрёстные признаки", explanation: "Продолговатый мозг, мост и средний мозг содержат ядра черепных нервов, проводящие пути и распределённые нейронные сети. Одностороннее поражение иногда сочетает симптомы со стороны черепных нервов на стороне очага с двигательными или чувствительными нарушениями на противоположной стороне; точный рисунок зависит от уровня и вовлечённых путей." },
    { title: "Световой рефлекс: II → претектум → оба III", explanation: "Свет от сетчатки передаётся по зрительному нерву (II) в претектальную область среднего мозга. Двусторонние связи с ядрами Эдингера—Вестфаля запускают парасимпатический выход через глазодвигательные нервы (III), ресничные узлы и сфинктеры зрачков. Поэтому при освещении одного глаза обычно сужаются оба зрачка: прямой и содружественный ответы." },
    { title: "Корнеальный рефлекс: V1 → стволовая сеть → VII", explanation: "Чувствительная часть корнеального рефлекса проходит преимущественно по глазной ветви тройничного нерва (V1); стволовые интернейроны активируют лицевые нервы (VII), вызывая обычно двустороннее моргание. Это полисинаптическая защитная реакция. Не следует самостоятельно касаться роговицы: исследование проводят только по клиническим показаниям обученные специалисты." },
    { title: "Бодрствование поддерживают распределённые сети", explanation: "Восходящая активация связана с несколькими стволовыми, таламическими и переднемозговыми путями, а не с одним изолированным «центром сознания». Ретикулярная формация также участвует в нисходящей регуляции позы и рефлексов. Нарушение бодрствования не доказывает само по себе поражение ствола: учитывают лекарства, обменные нарушения и другие причины." },
    { title: "Дыхание и кровообращение: сети и обратная связь", explanation: "Дыхательный ритм и его адаптация обеспечиваются взаимодействующими нейронными сетями продолговатого мозга и моста, на которые влияют хеморецепторы и другие афференты. Медуллярные цепи интегрируют барорецепторные сигналы с вегетативным контролем сердца и сосудов. Схематическая симуляция иллюстрирует механизм, но не заменяет физиологическое измерение или клиническую локализацию." },
  ],
  EN: [
    { title: "Three brainstem levels and crossed signs", explanation: "The medulla, pons and midbrain contain cranial-nerve nuclei, long tracts and distributed neuronal networks. A unilateral lesion can sometimes combine cranial-nerve signs on the lesion side with contralateral motor or sensory findings; the exact pattern depends on lesion level and the tracts involved." },
    { title: "Light reflex: II → pretectum → bilateral III", explanation: "Retinal light signals travel through the optic nerve (II) to the midbrain pretectal area. Bilateral connections to the Edinger–Westphal nuclei recruit parasympathetic output through the oculomotor nerves (III), ciliary ganglia and pupillary sphincters. Thus light in one eye normally constricts both pupils: the direct and consensual responses." },
    { title: "Corneal reflex: V1 → brainstem network → VII", explanation: "The corneal reflex uses sensory input mainly through the ophthalmic division of the trigeminal nerve (V1). Brainstem interneurons recruit the facial nerves (VII), normally producing bilateral blinking. This is a polysynaptic protective response. Students should not touch the cornea themselves; testing is reserved for trained clinicians when indicated." },
    { title: "Arousal relies on distributed networks", explanation: "Ascending arousal involves multiple brainstem, thalamic and forebrain pathways, not one isolated 'consciousness center'. The reticular formation also contributes to descending regulation of posture and reflexes. Reduced arousal alone does not prove a brainstem lesion: drugs, metabolic disturbances and other causes must be considered." },
    { title: "Breathing and circulation: networks and feedback", explanation: "Respiratory rhythm and its adaptation arise from interacting medullary and pontine neuronal networks influenced by chemoreceptors and other afferents. Medullary circuits integrate baroreceptor input with autonomic control of the heart and vessels. A schematic simulation illustrates a mechanism but is not a physiological measurement or clinical localization." },
  ],
  KZ: [
    { title: "Ми бағанының үш деңгейі және айқасқан белгілер", explanation: "Сопақша ми, көпір және ортаңғы мида бассүйек жүйкелерінің ядролары, ұзын өткізгіш жолдар және таралған нейрондық желілер орналасады. Біржақты зақым кезінде ошақ жағындағы бассүйек жүйкелерінің белгілері қарсы жақтағы қозғалыс не сезімталдық бұзылыстарымен қатар кездесуі мүмкін; нақты көрініс зақым деңгейі мен қатысқан жолдарға байланысты." },
    { title: "Жарық рефлексі: II → претектум → екі жақтағы III", explanation: "Торқабықтан шыққан жарық сигналы көру жүйкесі (II) арқылы ортаңғы мидың претекталдық аймағына жетеді. Эдингер—Вестфаль ядроларымен екіжақты байланыстар көзқимылдатқыш жүйкелер (III), кірпікшелі түйіндер және қарашық сфинктерлері арқылы парасимпатикалық жауапты іске қосады. Сондықтан бір көзге жарық түсіргенде әдетте екі қарашық та тарылады: тікелей және содружестволық (қосарлас) жауаптар." },
    { title: "Қасаң қабық рефлексі: V1 → ми бағаны → VII", explanation: "Қасаң қабық рефлексінің сезімтал бөлігі негізінен үшкіл жүйкенің көздік тармағы (V1) арқылы өтеді. Ми бағанының интернейрондары бет жүйкелерін (VII) белсендіріп, әдетте екіжақты жыпылықтау туғызады. Бұл — полисинапстық қорғаныштық жауап. Қасаң қабыққа өздігінен тиюге болмайды; тексеруді көрсетілім бойынша дайындықтан өткен медицина мамандары жүргізеді." },
    { title: "Сергектік таралған желілерге тәуелді", explanation: "Жоғарылайтын белсендіру ми бағаны, таламус және алдыңғы мидың бірнеше жолына байланысты; ол жеке бір «сана орталығымен» шектелмейді. Ретикулярлық формация дене қалпы мен рефлекстердің төмендеуші реттелуіне де қатысады. Сергектіктің төмендеуі өздігінен ми бағанының зақымын дәлелдемейді: дәрілерді, зат алмасу бұзылыстарын және басқа себептерді ескеру қажет." },
    { title: "Тыныс алу мен қанайналым: желілер және кері байланыс", explanation: "Тыныс ырғағы мен оның бейімделуі хеморецепторлар және басқа афференттер ықпал ететін сопақша ми мен көпірдің өзара әрекеттесетін нейрондық желілеріне байланысты. Сопақша ми тізбектері барорецепторлық кірісті жүрек пен тамырлардың вегетативтік реттелуімен біріктіреді. Сызбалық симуляция тетікті түсіндіреді, бірақ физиологиялық өлшеуді немесе клиникалық локализацияны алмастырмайды." },
  ],
};

export function createModuleTenSummary(language: Language): ReadingLesson {
  return {
    kind: "one-minute",
    title: getSectionTitle("one-minute", language),
    introduction: language === "RU"
      ? "Пять физиологических выводов о стволе мозга: пути, рефлексы, бодрствование и автономные сети."
      : language === "EN"
        ? "Five physiological takeaways about brainstem pathways, reflexes, arousal and autonomic networks."
        : "Ми бағанының жолдары, рефлекстері, сергектік және вегетативтік желілері туралы бес физиологиялық қорытынды.",
    cards: takeaways[language].map(({ title, explanation }, index) => ({
      id: "module-10-summary-" + (index + 1),
      title: (index + 1) + ". " + title,
      paragraphs: [explanation],
      links: [{ section: "theory" }, { section: "clinical" }],
    })),
  };
}
