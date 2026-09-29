import Image from "next/image";
import type { Language } from "../content/course";
import styles from "./RealSpecimens.module.css";

const copy = {
  RU: {
    title: "Как это выглядит в настоящем препарате",
    note: "Схема показывает связи и позволяет выбрать элемент. Снимки ниже показывают реальные препараты в другом масштабе; не переносите на них условные линии схемы буквально.",
    central: "ЦНС: головной и спинной мозг",
    centralDetail: "Фотография анатомического препарата. Головной и спинной мозг относятся к центральной нервной системе.",
    peripheral: "ПНС: поперечный срез периферического нерва",
    peripheralDetail: "Световая микрофотография ткани нерва. Это срез пучков нервных волокон, а не изображение всего пути на схеме.",
    synapseTitle: "Настоящая электронная микрофотография",
    synapseDetail: "Нервно-мышечное соединение — пример химического синапса между двигательным нейроном и мышечным волокном. Это не синапс двух нейронов, показанный на учебной схеме.",
    labels: "T — окончание аксона; M — мышечное волокно; стрелка — складки постсинаптической мембраны; масштабная линейка — 0,3 мкм.",
    source: "Источник и лицензия",
    centralAlt: "Подлинный анатомический препарат головного и спинного мозга",
    peripheralAlt: "Микрофотография поперечного среза периферического нерва",
    synapseAlt: "Электронная микрофотография нервно-мышечного соединения с метками T и M",
  },
  EN: {
    title: "See real specimens",
    note: "The diagram shows relationships and lets you select a part. These images show real specimens at different scales; the diagram's simplified lines are not literal anatomy.",
    central: "CNS: brain and spinal cord",
    centralDetail: "An anatomical specimen. The brain and spinal cord belong to the central nervous system.",
    peripheral: "PNS: peripheral nerve cross-section",
    peripheralDetail: "A light micrograph of nerve tissue. It shows nerve fiber bundles, not the whole pathway in the diagram.",
    synapseTitle: "Real electron micrograph",
    synapseDetail: "A neuromuscular junction is a chemical synapse between a motor neuron and a muscle fiber. It is not the two-neuron synapse shown in the teaching diagram.",
    labels: "T — axon terminal; M — muscle fiber; arrow — postsynaptic folds; scale bar — 0.3 µm.",
    source: "Source and license",
    centralAlt: "Real anatomical specimen of the brain and spinal cord",
    peripheralAlt: "Light micrograph of a peripheral nerve cross-section",
    synapseAlt: "Electron micrograph of a neuromuscular junction labeled T and M",
  },
  KZ: {
    title: "Нақты препараттарда қалай көрінеді",
    note: "Сызба байланыстарды көрсетіп, бөліктерді таңдауға мүмкіндік береді. Төмендегі суреттер нақты препараттарды басқа масштабта көрсетеді; сызбаның шартты сызықтарын тура анатомия деп қабылдамаңыз.",
    central: "ОЖЖ: бас миы мен жұлын",
    centralDetail: "Анатомиялық препараттың фотосы. Бас миы мен жұлын орталық жүйке жүйесіне жатады.",
    peripheral: "ШЖЖ: шеткі жүйкенің көлденең кесіндісі",
    peripheralDetail: "Жүйке тінінің жарық микрофотосы. Онда жүйке талшықтарының шоғырлары көрсетілген, сызбадағы тұтас жол емес.",
    synapseTitle: "Нақты электрондық микрофотосурет",
    synapseDetail: "Жүйке-бұлшықет түйіспесі — қимылдатқыш нейрон мен бұлшықет талшығы арасындағы химиялық синапс. Бұл оқу сызбасындағы екі нейрон арасындағы синапс емес.",
    labels: "T — аксон ұшы; M — бұлшықет талшығы; жебе — постсинапстық мембрананың қатпарлары; масштаб сызығы — 0,3 мкм.",
    source: "Дереккөз және лицензия",
    centralAlt: "Бас миы мен жұлынның нақты анатомиялық препараты",
    peripheralAlt: "Шеткі жүйкенің көлденең кесіндісінің микрофотосы",
    synapseAlt: "T және M таңбалары бар жүйке-бұлшықет түйіспесінің электрондық микрофотосы",
  },
};

const specimenSources = {
  central: "https://commons.wikimedia.org/wiki/File:Human_brain_and_spinal_cord.jpg",
  peripheral: "https://commons.wikimedia.org/wiki/File:Peripheral_nerve,_cross_section.jpg",
  synapse: "https://commons.wikimedia.org/wiki/File:Electron_micrograph_of_neuromuscular_junction_(cross-section).jpg",
};

export function OrganizationSpecimens({ language }: { language: Language }) {
  const c = copy[language];
  return <aside className={styles.panel} aria-label={c.title}>
    <h3>{c.title}</h3><p>{c.note}</p>
    <div className={styles.grid}>
      <figure className={styles.specimen}>
        <Image src="/images/anatomy/brain-spinal-cord.jpg" width={1003} height={3232} alt={c.centralAlt} sizes="(max-width: 760px) 90vw, 360px" />
        <figcaption><strong>{c.central}</strong><span>{c.centralDetail}</span>
          <a href={specimenSources.central} target="_blank" rel="noopener noreferrer">{c.source}: Z22, CC BY-SA 4.0</a>
        </figcaption>
      </figure>
      <figure className={styles.specimen}>
        <Image src="/images/anatomy/peripheral-nerve.jpg" width={709} height={532} alt={c.peripheralAlt} sizes="(max-width: 760px) 90vw, 360px" />
        <figcaption><strong>{c.peripheral}</strong><span>{c.peripheralDetail}</span>
          <a href={specimenSources.peripheral} target="_blank" rel="noopener noreferrer">{c.source}: Jagiellonian University Medical College, CC BY-SA 3.0</a>
        </figcaption>
      </figure>
    </div>
  </aside>;
}

export function SynapseSpecimen({ language }: { language: Language }) {
  const c = copy[language];
  return <aside className={styles.panel} aria-label={c.synapseTitle}>
    <h3>{c.synapseTitle}</h3>
    <div className={styles.synapse}>
      <Image src="/images/anatomy/neuromuscular-junction.jpg" width={433} height={289} alt={c.synapseAlt} sizes="(max-width: 760px) 90vw, 430px" />
      <div><p>{c.synapseDetail}</p><p><strong>{c.labels}</strong></p>
        <a href={specimenSources.synapse} target="_blank" rel="noopener noreferrer">{c.source}: National Institute of Mental Health, public domain</a>
      </div>
    </div>
  </aside>;
}
