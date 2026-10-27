import type { Language } from "../course";
import type { ReadingLesson } from "../study";
import { getSectionTitle } from "../sections";

// Module 12 clinical bridge. Original educational synthesis grounded in:
// Guyton & Hall 13e, ch. 57, printed pp. 730–732 (PDF pp. 697–699);
// Ganong 23e, ch. 16, printed pp. 250–253 (PDF pp. 262–265);
// C. L. Ghai Practical Physiology 8e, printed pp. 285–287 (PDF pp. 307–309).
// Direct/indirect/hyperdirect circuits are canonical teaching models, not diagnostic rules.
type Copy = { intro: string; titles: string[]; paragraphs: string[] };
const data: Record<Language, Copy> = {
  "RU": {
    "intro": "Клинический мост по базальным ганглиям: сопоставьте наблюдаемое движение, возможный сетевой механизм и альтернативные объяснения. Случаи учебные; отдельный симптом не устанавливает диагноз или точное место поражения.",
    "titles": [
      "Учебный случай: медленное начало движения при сохранной силе",
      "Как дофамин и выход GPi/SNr связаны с началом действия",
      "Чем брадикинезия отличается от слабости и дисметрии",
      "Гиперкинезы: хорея и баллизм не равны одному очагу",
      "Границы клинического вывода и безопасность"
    ],
    "paragraphs": [
      "Учебная ситуация: у взрослого человека постепенно уменьшился размах одной руки при ходьбе, почерк стал мельче, а начало повторных целенаправленных движений замедлилось. При формальном сравнении силы мышц врач не обнаружил выраженного пареза. Почему это описание заставляет отдельно оценить скорость и амплитуду движения, а не объяснять всё мышечной слабостью? Какие дополнительные признаки и данные анамнеза необходимы, прежде чем обсуждать причину?",
      "Стриатум получает корковые сигналы; его ГАМК-ергические проекции участвуют в прямом и непрямом путях. GPi и SNr в состоянии покоя оказывают тоническое тормозное влияние на ряд таламических и стволовых мишеней. В упрощённой канонической схеме дофамин из SNc через D1-рецепторы обычно облегчает активность соответствующих нейронов прямого пути, а через D2-рецепторы уменьшает активность соответствующих нейронов непрямого пути. Утрата дофаминовой модуляции может усилить тормозный выход к части таламических мишеней и затруднить запуск движения. Это не прямое измерение активности ядер у данного человека и не объяснение всех симптомов.",
      "Брадикинезия означает замедленность движения; при повторении движений может уменьшаться их амплитуда. Парез — снижение способности развить силу, тогда как мозжечковая дисметрия проявляется ошибкой попадания в цель, например промахиванием. Сравнение скорости, амплитуды, силы и точности помогает различить описания, но ни один признак не локализует поражение сам по себе. Тремор покоя, ригидность, лекарства, асимметрия, динамика симптомов и другие неврологические данные меняют интерпретацию.",
      "В другой учебной ситуации внезапно появляются крупноамплитудные непроизвольные бросковые движения одной конечности; их описывают как баллизм. Хорея, напротив, проявляется нерегулярными, краткими, непредсказуемыми движениями. Нарушение субталамических и связанных базально-ганглионарных контуров может участвовать в баллизме, но по одному виду движения нельзя доказать изолированное поражение STN. Реальные гиперкинезы имеют разные причины, включая лекарственные и сосудистые; они не являются простым зеркальным отражением брадикинезии.",
      "Для обоснованного клинического вывода необходимы сведения о начале и динамике симптомов, принимаемых препаратах (в том числе блокирующих D2-рецепторы), других неврологических признаках и осмотр специалистом. Учебная схема прямого, непрямого и гиперпрямого путей не заменяет диагностику и не позволяет рассчитывать индивидуальный прогноз. Внезапно возникшие новые двигательные нарушения, особенно вместе со слабостью, расстройством речи или асимметрией лица, требуют срочной медицинской оценки. Студенты анализируют предоставленные данные, а не назначают препараты и не проводят обследование без руководства."
    ]
  },
  "EN": {
    "intro": "Clinical bridge for the basal ganglia: connect observed movement, a possible circuit mechanism and competing explanations. These are teaching scenarios; one sign does not establish a diagnosis or an exact lesion site.",
    "titles": [
      "Teaching case: slow movement initiation despite preserved strength",
      "How dopamine and GPi/SNr output affect action initiation",
      "Distinguishing bradykinesia, weakness and dysmetria",
      "Hyperkinesias: chorea and ballism do not pinpoint one nucleus",
      "Limits of inference and clinical safety"
    ],
    "paragraphs": [
      "Teaching case: an adult has gradually developed reduced arm swing on one side, smaller handwriting and slower initiation of repeated goal-directed movements. During a clinician's comparison of muscle strength, no marked paresis is found. Why should movement speed and amplitude be assessed separately rather than attributing everything to muscle weakness? What additional findings and history are needed before discussing a cause?",
      "The striatum receives cortical signals; its GABAergic projections participate in direct and indirect pathways. At baseline, GPi and SNr provide tonic inhibitory output to several thalamic and brainstem targets. In the simplified canonical scheme, dopamine from SNc acting at D1 receptors generally facilitates the relevant direct-pathway neurons, while action at D2 receptors reduces activity of the relevant indirect-pathway neurons. Loss of dopaminergic modulation can increase inhibitory output to some thalamic targets and make movement initiation more difficult. This is not a direct measurement of this person's nuclear activity and does not explain every symptom.",
      "Bradykinesia means slowness of movement; the amplitude of repeated movements may also decrease. Paresis is reduced capacity to generate force, whereas cerebellar dysmetria involves an error in reaching a target, such as overshooting. Comparing speed, amplitude, force and accuracy helps distinguish the descriptions, but no single finding localizes a lesion. Rest tremor, rigidity, medications, asymmetry, symptom time course and other neurological findings change the interpretation.",
      "In a separate teaching scenario, large-amplitude involuntary flinging movements of one limb begin suddenly; this pattern is called ballism. Chorea instead involves irregular, brief, unpredictable movements. Dysfunction of subthalamic and connected basal-ganglia circuits may contribute to ballism, but movement appearance alone cannot establish an isolated STN lesion. Real hyperkinetic syndromes have multiple causes, including medication-related and vascular causes, and are not simply the mirror image of bradykinesia.",
      "A sound clinical interpretation requires the onset and course of symptoms, medication history (including drugs that block D2 receptors), other neurological findings and assessment by a qualified clinician. The direct, indirect and hyperdirect pathway diagram is a teaching simplification, not a diagnostic test or an individual prognostic model. Sudden new movement abnormalities, especially with weakness, speech disturbance or facial asymmetry, require urgent medical evaluation. Students interpret supplied observations rather than prescribing drugs or examining patients without supervision."
    ]
  },
  "KZ": {
    "intro": "Базальды ганглийлер бойынша клиникалық байланыс: байқалған қимылды, ықтимал жүйкелік механизмді және балама түсіндірмелерді салыстырыңыз. Бұл оқу жағдайлары; бір белгі диагнозды немесе зақымның нақты орнын анықтамайды.",
    "titles": [
      "Оқу жағдайы: күш сақталғанымен қозғалыстың басталуы баяу",
      "Дофамин мен GPi/SNr шығысы әрекетті бастауға қалай әсер етеді",
      "Брадикинезияны әлсіздік пен дисметриядан ажырату",
      "Гиперкинездер: хорея мен баллизм бір ядроны дәл көрсетпейді",
      "Клиникалық қорытындының шегі және қауіпсіздік"
    ],
    "paragraphs": [
      "Оқу жағдайы: ересек адамның жүргенде бір қолының сермеуі біртіндеп азайған, жазуы ұсақталған және қайталанатын мақсатты қимылдарды бастауы баяулаған. Дәрігер бұлшықет күшін салыстырғанда айқын парез байқамаған. Неліктен бұл өзгерістерді тек бұлшықет әлсіздігімен түсіндірмей, қимыл жылдамдығы мен амплитудасын бөлек бағалау қажет? Себебін талқыламас бұрын қандай қосымша белгілер мен анамнез деректері керек?",
      "Стриатум қыртыстан сигнал қабылдайды; оның ГАМҚ-ергиялық проекциялары тікелей және жанама жолдарға қатысады. GPi мен SNr қалыпты жағдайда таламустың және ми бағанының бірқатар нысанасына тұрақты тежегіш әсер етеді. Жеңілдетілген канондық үлгіде SNc-ден бөлінетін дофамин D1-рецепторлары арқылы тікелей жолдың тиісті нейрондарының белсенділігін көбіне арттырады, ал D2-рецепторлары арқылы жанама жолдың тиісті нейрондарының белсенділігін төмендетеді. Дофаминдік модуляция азайғанда таламустың кейбір нысаналарына тежегіш шығыс күшейіп, қозғалысты бастау қиындауы мүмкін. Бұл нақты науқастың ядролар белсенділігін тікелей өлшеу емес және барлық симптомды түсіндірмейді.",
      "Брадикинезия — қимылдың баяулауы; қайталанатын қимылдардың амплитудасы да азаюы мүмкін. Парез — бұлшықет күшін өндіру қабілетінің төмендеуі, ал мишықтық дисметрия нысанаға дәл жетпеумен, мысалы нысанадан асып кетумен сипатталады. Жылдамдықты, амплитуданы, күшті және дәлдікті салыстыру сипаттамаларды ажыратуға көмектеседі, бірақ бір белгі зақым орнын нақтыламайды. Тыныштық треморы, ригидтілік, қабылданатын дәрілер, асимметрия, белгілердің даму уақыты және өзге неврологиялық деректер қорытындыға әсер етеді.",
      "Басқа оқу жағдайында бір аяқ-қолда кенеттен ірі амплитудалы еріксіз сермелмелі қимылдар пайда болады; мұндай көрініс баллизм деп аталады. Ал хорея тұрақсыз, қысқа, алдын ала болжауға келмейтін еріксіз қимылдармен сипатталады. Субталамустық ядро (STN) және онымен байланысқан базальды ганглия контурларының бұзылысы баллизмге қатысуы мүмкін, бірақ қимыл түріне ғана қарап STN-нің оқшау зақымын дәлелдеуге болмайды. Гиперкинездердің дәріге байланысты және қантамырлық себептері де болуы мүмкін; олар брадикинезияның жай ғана кері көрінісі емес.",
      "Негізді клиникалық қорытынды үшін белгілердің басталу уақыты мен дамуы, қабылданатын дәрілер (соның ішінде D2-рецепторларын бөгейтін дәрілер), басқа неврологиялық белгілер және маманның тексеруі қажет. Тікелей, жанама және гипертікелей жолдардың сызбасы — диагностикалық сынама емес, оқу үшін жеңілдетілген үлгі; ол жеке адамға нақты болжам бермейді. Жаңа қимыл бұзылыстары кенеттен пайда болса, әсіресе әлсіздікпен, сөйлеудің бұзылуымен немесе бет асимметриясымен қатар жүрсе, шұғыл медициналық бағалау қажет. Студенттер берілген деректерді талдайды, дәрі тағайындамайды және жетекшісіз науқасты тексермейді."
    ]
  }
};

export function createModuleTwelveClinical(language: Language): ReadingLesson {
  const copy = data[language];
  const destinations = [
    ["cases", "theory"],
    ["theory", "interactive"],
    ["practice", "theory"],
    ["cases", "theory"],
    ["questions", "references"],
  ] as const;
  return {
    kind: "clinical",
    title: getSectionTitle("clinical", language),
    introduction: copy.intro,
    cards: copy.titles.map((title, index) => ({
      id: "module-12-clinical-" + (index + 1),
      title,
      paragraphs: [copy.paragraphs[index]],
      links: destinations[index].map(section => ({ section })),
    })),
  };
}
