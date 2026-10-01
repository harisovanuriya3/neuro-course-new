import Image from 'next/image';
import type { Language } from '../content/course';
import { createInteractiveLesson } from '../content/modules/1/interactive';
import BalanceDiagram from './BalanceDiagram';
import SynapseLab from './SynapseLab';
import MembranePotentialLab from './MembranePotentialLab';
import EEGLab from './EEGLab';
import REGLab from './REGLab';
import IntegrationLab from './IntegrationLab';
import PathwayLab from './PathwayLab';
import SpinalRegulationLab from './SpinalRegulationLab';
import BrainstemLab from './BrainstemLab';
import MotorControlLab from './MotorControlLab';
import BasalGangliaLab from './BasalGangliaLab';
import styles from './FoundationVisual.module.css';

const copy = {
  RU: {
    specimen: 'Реальное анатомическое изображение', nerve: 'Поперечный срез периферического нерва: микрофотография ткани, а не схема отдельного нейрона.',
    brain: 'Анатомический препарат головного и спинного мозга. Обзорное фото показывает строение; глубокие ядра на нём отдельно не размечены.',
    junction: 'Электронная микрофотография нервно-мышечного соединения. T — окончание аксона; M — мышечное волокно; масштабная линейка — 0,3 мкм. Это контакт нейрона с мышцей.',
    source: 'Оригинал и лицензия', balance: 'Динамическая учебная модель равновесия',
    control: 'Сопоставьте изменение положения стопы, сенсорный вход и двигательную коррекцию. В реальном движении предварительное управление и обратная связь действуют совместно.',
    cerebellum: 'Используйте последовательность для обсуждения сенсорной обратной связи и точности коррекции. Кадры не показывают деятельность мозжечка и не служат пробой для диагностики.',
  },
  EN: {
    specimen: 'Real anatomical image', nerve: 'Peripheral nerve cross-section: a tissue micrograph, rather than a diagram of one neuron.',
    brain: 'Anatomical specimen of the brain and spinal cord. This overview shows structure; individual deep nuclei are not labelled.',
    junction: 'Electron micrograph of a neuromuscular junction. T: axon terminal; M: muscle fibre; scale bar: 0.3 µm. This is a neuron-to-muscle contact.',
    source: 'Original and licence', balance: 'Dynamic teaching model of balance',
    control: 'Compare foot position, sensory input and motor correction. Feedforward control and sensory feedback work together during real movement.',
    cerebellum: 'Use this sequence to discuss sensory feedback and correction accuracy. The frames do not show cerebellar activity and are not a diagnostic test.',
  },
  KZ: {
    specimen: 'Нақты анатомиялық бейне', nerve: 'Шеткі жүйкенің көлденең кесіндісі: бұл жеке нейрон сызбасы емес, тіннің микрофотографиясы.',
    brain: 'Бас миы мен жұлынның анатомиялық препараты. Жалпы фото құрылымды көрсетеді; терең ядролар жеке белгіленбеген.',
    junction: 'Жүйке-бұлшықет түйіспесінің электрондық микрофотографиясы. T — аксон ұшы; M — бұлшықет талшығы; масштаб сызығы — 0,3 мкм. Бұл нейрон мен бұлшықет байланысы.',
    source: 'Түпнұсқа және лицензия', balance: 'Тепе-теңдіктің динамикалық оқу моделі',
    control: 'Табан қалпының өзгеруін, сенсорлық кіріс пен қозғалыс түзетуін салыстырыңыз. Нақты қозғалыста алдын ала басқару мен кері байланыс бірге жұмыс істейді.',
    cerebellum: 'Кезеңдерді сенсорлық кері байланыс пен түзету дәлдігін талқылау үшін пайдаланыңыз. Кадрлар мишық белсенділігін көрсетпейді және диагностикалық сынама емес.',
  },
};

export default function FoundationVisual({ moduleId, language }: { moduleId: number; language: Language }) {
  const c = copy[language];
  if (moduleId === 2) return <div className={styles.visual}><EEGLab language={language} /><REGLab language={language} /></div>;
  if (moduleId === 12) return <div className={styles.visual}><BasalGangliaLab language={language} /></div>;
  if (moduleId === 11) return <div className={styles.visual}><MotorControlLab language={language} /></div>;
  if (moduleId === 10) return <div className={styles.visual}><BrainstemLab language={language} /></div>;
  if (moduleId === 9) return <div className={styles.visual}><SpinalRegulationLab language={language} /></div>;
  if (moduleId === 8) return <div className={styles.visual}><PathwayLab language={language} /></div>;
  if (moduleId === 6) return <div className={styles.visual}><IntegrationLab language={language} /></div>;
  if (moduleId === 4) return <div className={styles.visual}><MembranePotentialLab language={language} /></div>;
  if (moduleId === 12 || moduleId === 13) return <div className={styles.visual}>
    <p>{moduleId === 12 ? c.control : c.cerebellum}</p>
    <BalanceDiagram language={language} ui={createInteractiveLesson(language).ui} title={c.balance} />
  </div>;
  const visual = moduleId === 3 ? {
    file: 'peripheral-nerve', caption: c.nerve,
    source: 'https://commons.wikimedia.org/wiki/File:Peripheral_nerve,_cross_section.jpg',
    credit: 'Department of Histology, Jagiellonian University Medical College · CC BY-SA 3.0',
  } : moduleId === 6 ? {
    file: 'neuromuscular-junction', caption: c.junction,
    source: 'https://commons.wikimedia.org/wiki/File:Electron_micrograph_of_neuromuscular_junction_(cross-section).jpg',
    credit: 'National Institute of Mental Health · Public domain (US)',
  } : moduleId === 10 || moduleId === 18 ? {
    file: 'brain-spinal-cord', caption: c.brain,
    source: 'https://commons.wikimedia.org/wiki/File:Human_brain_and_spinal_cord.jpg',
    credit: 'Z22 · National Museum of Health and Medicine · CC BY-SA 4.0',
  } : null;
  if (!visual) return null;
  return <section className={styles.visual}>
    <h2>{c.specimen}</h2>
    <figure>
      <div className={styles.photo}><Image src={`/images/anatomy/${visual.file}.jpg`} alt={visual.caption} fill sizes="(max-width: 600px) 80vw, 520px" /></div>
      <figcaption><p>{visual.caption}</p><a href={visual.source}>{c.source}</a> · {visual.credit}</figcaption>
    </figure>
    {moduleId === 6 && <SynapseLab language={language} />}
  </section>;
}
