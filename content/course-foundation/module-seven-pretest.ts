import type { Language } from "../course";
import type { PretestLesson } from "../study";
// Module 7: reflex arcs and networks. Checked against Ganong 23e, ch. 9
// (PDF pp. 169–172), Guyton & Hall 13e, ch. 55 (PDF pp. 666–668),
// and Ghai Practical Physiology 8e (PDF pp. 317–319).
// This is a diagnostic teaching task, not a clinical examination.
type Item={prompt:string;options:[string,string,string,string];answer:"a"|"b"|"c"|"d";explanation:string};
type Locale={intro:string;q:[Item,Item]};
const localized:Record<Language,Locale>={
  "RU": {
    "intro": "Два диагностических вопроса о коленном рефлексе и реципрокном торможении. Баллы не выставляются; после ответа проверьте объяснение физиологического механизма.",
    "q": [
      {
        "prompt": "При ударе неврологическим молоточком по связке надколенника у здорового человека кратковременно сокращается четырёхглавая мышца. Какой рецептор запускает основную быструю дугу этого ответа?",
        "options": [
          "Сухожильный орган Гольджи, регистрирующий исключительно силу натяжения сухожилия.",
          "Болевой рецептор кожи, активирующий только полисинаптический рефлекс отдёргивания.",
          "Мышечное веретено четырёхглавой мышцы: её быстрое растяжение повышает импульсацию афферентов Ia.",
          "Барорецептор сосудов, посылающий сигнал непосредственно к альфа-мотонейрону."
        ],
        "answer": "c",
        "explanation": "Удар по связке надколенника быстро растягивает четырёхглавую мышцу и её мышечные веретёна. Ia-афференты возбуждают альфа-мотонейроны той же мышцы через основную моносинаптическую связь, вызывая краткое сокращение. Рецептор находится в мышце, хотя удар приходится на связку; сила рефлекса зависит также от состояния спинальных сетей и нисходящих влияний."
      },
      {
        "prompt": "При растяжении четырёхглавой мышцы возбуждение её Ia-афферентов сопровождается уменьшением активности мотонейронов мышц-сгибателей колена. Какое звено объясняет это реципрокное торможение?",
        "options": [
          "Ia-афферент непосредственно возбуждает мотонейроны антагониста через единственный синапс.",
          "Коллатераль Ia-афферента возбуждает тормозный спинальный интернейрон, который уменьшает активность мотонейронов антагониста.",
          "Сухожильный орган Гольджи полностью выключает все мотонейроны спинного мозга.",
          "Ацетилхолин в нервно-мышечном соединении мгновенно превращается в ГАМК."
        ],
        "answer": "b",
        "explanation": "Ia-афференты от растянутой мышцы имеют возбуждающую моносинаптическую связь с её альфа-мотонейронами и через тормозный интернейрон подавляют мотонейроны антагониста. Поэтому реципрокное торможение включает дополнительный центральный синапс и не является той же самой моносинаптической ветвью рефлекса. Реальный ответ также зависит от фоновой активности и других входов."
      }
    ]
  },
  "EN": {
    "intro": "Two ungraded diagnostic questions on the knee-jerk reflex and reciprocal inhibition. After each answer, review the mechanism-based explanation.",
    "q": [
      {
        "prompt": "Tapping the patellar ligament with a reflex hammer briefly contracts the quadriceps in a healthy person. Which receptor initiates the principal short-latency pathway of this response?",
        "options": [
          "The Golgi tendon organ, detecting tendon tension alone.",
          "A cutaneous nociceptor initiating only a polysynaptic withdrawal reflex.",
          "The quadriceps muscle spindle: rapid stretch increases discharge in group Ia afferents.",
          "A vascular baroreceptor directly exciting an alpha motor neuron."
        ],
        "answer": "c",
        "explanation": "A tap on the patellar ligament rapidly stretches the quadriceps and its muscle spindles. Ia afferents excite alpha motor neurons of the same muscle through the principal monosynaptic connection, producing a brief contraction. The receptor lies in the muscle even though the ligament is tapped. Reflex size also depends on spinal circuit state and descending influences."
      },
      {
        "prompt": "When quadriceps Ia afferents are activated by stretch, motor-neuron activity in the antagonistic knee flexors decreases. Which circuit element explains this reciprocal inhibition?",
        "options": [
          "The Ia afferent directly excites antagonist motor neurons through a single synapse.",
          "An Ia afferent collateral excites an inhibitory spinal interneuron, which reduces antagonist motor-neuron activity.",
          "A Golgi tendon organ completely silences all spinal motor neurons.",
          "Acetylcholine at the neuromuscular junction immediately converts into GABA."
        ],
        "answer": "b",
        "explanation": "Ia afferents from the stretched muscle excite its alpha motor neurons monosynaptically and inhibit antagonist motor neurons through a spinal inhibitory interneuron. Reciprocal inhibition therefore requires an additional central synapse and is not the same monosynaptic branch of the stretch reflex. The response also depends on background activity and other inputs."
      }
    ]
  },
  "KZ": {
    "intro": "Тізе рефлексі мен реципрокты тежелу туралы бағаланбайтын екі диагностикалық сұрақ. Әр жауаптан кейін физиологиялық тетіктің түсіндірмесін оқыңыз.",
    "q": [
      {
        "prompt": "Дені сау адамда тізе тостағаншасының байламын рефлекстік балғашамен соққанда санның төртбасты бұлшықеті қысқа уақыт жиырылады. Осы жауаптың негізгі қысқа жолын қай рецептор іске қосады?",
        "options": [
          "Тек сіңірдің керілу күшін сезетін Гольджи сіңір органы.",
          "Тек полисинапстық тартып алу рефлексін бастайтын терінің ауырсыну рецепторы.",
          "Төртбасты бұлшықеттің бұлшықет ұршығы: жылдам созылу Ia-афференттерінің импульсациясын арттырады.",
          "Альфа-мотонейронды тікелей қоздыратын тамыр барорецепторы."
        ],
        "answer": "c",
        "explanation": "Тізе тостағаншасының байламын соғу төртбасты бұлшықет пен оның ұршықтарын тез созады. Ia-афференттер сол бұлшықеттің альфа-мотонейрондарын негізгі моносинапстық байланыс арқылы қоздырып, қысқа жиырылу тудырады. Соққы байламға жасалғанымен, рецептор бұлшықетте орналасқан. Рефлекстің күші жұлын тізбектерінің күйіне және төмендеуші әсерлерге де тәуелді."
      },
      {
        "prompt": "Төртбасты бұлшықет созылғанда оның Ia-афференттері белсеніп, тізені бүгетін антагонист бұлшықеттер мотонейрондарының белсенділігі төмендейді. Осы реципрокты тежелуді қай тізбек түсіндіреді?",
        "options": [
          "Ia-афферент бір ғана синапс арқылы антагонист мотонейрондарын тікелей қоздырады.",
          "Ia-афференттің тармағы жұлындағы тежегіш интернейронды қоздырып, ол антагонист мотонейрондарының белсенділігін төмендетеді.",
          "Гольджи сіңір органы жұлындағы барлық мотонейрондарды толық тоқтатады.",
          "Жүйке-бұлшықет түйісіндегі ацетилхолин бірден ГАМҚ-ға айналады."
        ],
        "answer": "b",
        "explanation": "Созылған бұлшықеттің Ia-афференттері оның альфа-мотонейрондарын моносинапстық жолмен қоздырады, ал антагонист мотонейрондарын жұлындағы тежегіш интернейрон арқылы тежейді. Демек, реципрокты тежелу қосымша орталық синапсты қамтиды және созылу рефлексінің моносинапстық тармағымен бірдей емес. Нәтиже бастапқы белсенділік пен басқа кірістерге де тәуелді."
      }
    ]
  }
};
export function createModuleSevenPretest(language:Language,moduleTitle:string,title:string):PretestLesson {
 const c=localized[language];
 return {kind:"pretest",title,introduction:c.intro,questions:c.q.map((q,i)=>({
 id:i===0?"module-7-pretest-spindle":"module-7-pretest-reciprocal",topic:moduleTitle,
 prompt:q.prompt,options:q.options.map((s,n)=>({id:["a","b","c","d"][n],text:s})),
 correctAnswer:q.answer,explanation:q.explanation,target:{section:"theory" as const}
 }))};
}
