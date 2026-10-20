import type { Language } from "../course";
import type { PracticeLesson } from "../types";

// Module 5: authored exercises replace generic term-to-term causal prompts.
// References: Ganong 23e chs. 6–7 (PDF pp. 127–130, 146–148);
// Guyton & Hall 13e ch. 7 (PDF pp. 96–98) and autonomic receptors (PDF p. 743);
// Ganong 23e ch. 30 (PDF pp. 503–504): SA-node M2/Gi/o, K⁺ conductance, cAMP.
// Ghai Practical Physiology 8e experiment 4-9 (PDF pp. 353–354).
type Copy = {
  titles: [string, string, string, string];
  prompts: [string, string, string];
  answers: [string[], string[], string[]];
  response: string;
  criteria: string[];
};
const copy: Record<Language, Copy> = {
  RU: {
    titles: ["1. Один медиатор — разные рецепторы", "2. Два места нарушения передачи",
      "3. Данные и пределы заключения", "Самопроверка"],
    prompts: [
      "Сравните ацетилхолин в двух разных тканях: никотиновый рецептор концевой пластинки скелетной мышцы и мускариновый M2-рецептор синусового узла сердца. Для каждого укажите тип рецептора, механизм и направление ответа. Не переносите эффект одного рецептора на другой.",
      "В модели A потенциал действия достигает окончания аксона, но вход Ca²⁺ снижен. В модели B вход Ca²⁺ и выделение медиатора сохранены, но никотиновые рецепторы мышечной концевой пластинки заблокированы. До открытия ответа предскажите, что произойдёт с выделением ацетилхолина и потенциалом концевой пластинки в каждом случае. Модель условная, не клиническое измерение.",
      "Наблюдение A: после воздействия выделяется меньше везикул и уменьшается потенциал концевой пластинки, но ответ мышцы на местное нанесение ацетилхолина сохранён. Наблюдение B: потенциал концевой пластинки уменьшился, однако выделение медиатора и чувствительность рецепторов не исследовали. Какое наблюдение поддерживает пресинаптический механизм? Почему B не доказывает место нарушения? Предложите дополнительный опыт.",
    ],
    answers: [
      ["Никотиновый рецептор мышцы — лиганд-зависимый катионный канал. Вход Na⁺ преобладает, возникает локальная деполяризация концевой пластинки; достаточная деполяризация запускает мышечный потенциал действия.",
       "M2-рецептор синусового узла связан с Gi/o-белком: его βγ-субъединицы открывают K⁺-каналы, а снижение цАМФ замедляет пейсмекерную деполяризацию. Поэтому частота импульсов обычно уменьшается. Метаботропная передача не всегда тормозная: эффект зависит от рецептора и клетки."],
      ["A: снижение входа Ca²⁺ уменьшает вероятность везикулярного выделения и в среднем ослабляет потенциал концевой пластинки, хотя импульс доходит до окончания.",
       "B: выделение ацетилхолина может сохраняться, но заблокированные рецепторы не создают нормальный ответ концевой пластинки. Снижение ответа само по себе не локализует нарушение."],
      ["A поддерживает пресинаптический дефект, поскольку снижение выделения наблюдается непосредственно, а ответ на местный ацетилхолин сохранён.",
       "B неоднозначно: нужны независимая оценка выделения медиатора и проверка ответа на локальное применение ацетилхолина. Эти наблюдения не дают диагноза пациента."],
    ],
    response: "Ваш прогноз и объяснение",
    criteria: ["Различаю ионотропный и метаботропный рецепторы.",
      "Разделяю вход Ca²⁺, выделение медиатора и постсинаптический ответ.",
      "Не считаю уменьшенный потенциал концевой пластинки доказательством одного места повреждения.",
      "Понимаю, что учебная модель не ставит клинический диагноз."],
  },
  EN: {
    titles: ["1. One transmitter, different receptors", "2. Two sites of transmission failure",
      "3. Evidence and limits of inference", "Self-check"],
    prompts: [
      "Compare acetylcholine in two different tissues: the skeletal-muscle end-plate nicotinic receptor and the cardiac sinoatrial-node muscarinic M2 receptor. For each, identify receptor class, signaling mechanism and direction of effect. Do not transfer one receptor's effect to the other.",
      "In model A an action potential reaches the axon terminal, but Ca²⁺ entry is reduced. In model B Ca²⁺ entry and transmitter release are preserved, but muscle end-plate nicotinic receptors are blocked. Before revealing the explanation, predict acetylcholine release and end-plate potential in each case. These are schematic conditions, not clinical measurements.",
      "Observation A: fewer vesicles are released and the end-plate potential decreases, but the muscle still responds to locally applied acetylcholine. Observation B: the end-plate potential decreases, but release and receptor responsiveness were not measured. Which observation supports a presynaptic mechanism? Why does B not locate the defect? Suggest another experiment.",
    ],
    answers: [
      ["The muscle nicotinic receptor is a ligand-gated cation channel. Predominant Na⁺ influx depolarizes the end plate; sufficient depolarization initiates a muscle action potential.",
       "The sinoatrial M2 receptor couples to Gi/o: G-protein βγ subunits open K⁺ channels, while reduced cAMP slows pacemaker depolarization. The firing rate usually falls. Metabotropic signaling is not invariably inhibitory; its effect depends on receptor and cell type."],
      ["A: reduced Ca²⁺ entry lowers the probability of vesicular release and usually reduces the mean end-plate potential, even though the nerve impulse reaches the terminal.",
       "B: acetylcholine release can continue, but blocked receptors cannot generate the normal end-plate response. A reduced response alone does not locate the defect."],
      ["A supports a presynaptic defect because release is directly reduced while the local acetylcholine response is preserved.",
       "B is ambiguous: assess release independently and test the response to locally applied acetylcholine. Neither observation alone establishes a patient diagnosis."],
    ],
    response: "Your prediction and reasoning",
    criteria: ["Distinguished ionotropic from metabotropic receptors.",
      "Separated Ca²⁺ entry, transmitter release and postsynaptic response.",
      "Did not infer one lesion site from a reduced end-plate potential alone.",
      "Recognized that a teaching model cannot diagnose a patient."],
  },
  KZ: {
    titles: ["1. Бір медиатор — әртүрлі рецепторлар", "2. Берілістің бұзылатын екі орны",
      "3. Деректер және қорытындының шегі", "Өзіндік тексеру"],
    prompts: [
      "Ацетилхолиннің екі түрлі тіндегі әсерін салыстырыңыз: қаңқа бұлшықетінің соңғы пластинкасындағы никотиндік рецептор және жүректің синустық түйініндегі мускариндік M2-рецептор. Әрқайсысының түрін, сигнал беру тетігін және әсер бағытын атаңыз. Бір рецептордың әсерін екіншісіне телімеңіз.",
      "A моделінде әрекет потенциалы аксон ұшына жетеді, бірақ Ca²⁺ енуі азаяды. B моделінде Ca²⁺ енуі мен медиатор бөлінуі сақталады, алайда бұлшықет соңғы пластинкасының никотиндік рецепторлары бөгелген. Түсіндірмені ашпас бұрын әр жағдайда ацетилхолин бөлінуі мен соңғы пластинка потенциалын болжаңыз. Бұл — клиникалық өлшем емес, шартты модель.",
      "A бақылауы: бөлінетін везикулалар саны және соңғы пластинка потенциалы азаяды, бірақ бұлшықет жергілікті енгізілген ацетилхолинге жауап береді. B бақылауы: соңғы пластинка потенциалы азайды, алайда медиатор бөлінуі мен рецептор сезімталдығы өлшенбеді. Қай бақылау пресинапстық тетікті қолдайды? Неліктен B бұзылу орнын дәлелдемейді? Қосымша тәжірибе ұсыныңыз.",
    ],
    answers: [
      ["Бұлшықеттің никотиндік рецепторы — лигандпен ашылатын катиондық арна. Na⁺ енуі басым болып, соңғы пластинка деполяризацияланады; жеткілікті деполяризация бұлшықет әрекет потенциалын туғызады.",
       "Синустық түйіндегі M2-рецептор Gi/o-ақуызымен байланысады: оның βγ-суббірліктері K⁺ арналарын ашады, ал цАМФ деңгейінің төмендеуі пейсмекерлік деполяризацияны баяулатады. Сондықтан импульс жиілігі әдетте азаяды. Метаботроптық әсер әрдайым тежеуші емес: ол рецептор мен жасушаға тәуелді."],
      ["A: Ca²⁺ енуінің азаюы везикулалық бөліну ықтималдығын төмендетіп, орташа соңғы пластинка потенциалын әлсіретеді; жүйке импульсі ұшына жетеді.",
       "B: ацетилхолин бөлінуі сақталуы мүмкін, бірақ бөгелген рецепторлар қалыпты соңғы пластинка жауабын тудырмайды. Жауаптың азаюы бұзылу орнын өздігінен көрсетпейді."],
      ["A пресинапстық бұзылысты қолдайды: медиатор бөлінуі азайған, ал жергілікті ацетилхолинге жауап сақталған.",
       "B бірмәнді емес: бөлінуді бөлек өлшеп, жергілікті ацетилхолинге жауапты тексеру керек. Бұл деректер пациентке диагноз қоюға жеткіліксіз."],
    ],
    response: "Болжамыңыз бен түсіндірмеңіз",
    criteria: ["Ионотроптық және метаботроптық рецепторларды ажыраттым.",
      "Ca²⁺ енуін, медиатор бөлінуін және постсинапстық жауапты бөлек түсіндірдім.",
      "Соңғы пластинка потенциалының азаюынан бұзылу орнын бірден анықтамадым.",
      "Оқу моделінің клиникалық диагноз қоймайтынын түсіндім."],
  },
};

export function createModuleFivePractice(language: Language, base: PracticeLesson): PracticeLesson {
  const c = copy[language];
  return {
    ...base,
    sections: [
      ...c.prompts.map((prompt, i) => ({
        title: c.titles[i],
        blocks: [
          { type: "paragraph" as const, text: prompt },
          { type: "response" as const, label: c.response },
          { type: "answer" as const, items: c.answers[i] },
        ],
      })),
      { title: c.titles[3], blocks: [{ type: "checklist", items: c.criteria }] },
    ],
  };
}
