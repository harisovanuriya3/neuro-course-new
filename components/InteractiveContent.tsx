"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import type { Language } from "../content/course";
import type { DiagramBase, DiagramNode, InteractiveLesson } from "../content/interactive";
import shared from "./PracticeContent.module.css";
import styles from "./InteractiveContent.module.css";
import { OrganizationVisual, PathwayVisual, SynapseVisual, IntegrationVisual } from "./InteractiveVisuals";
import { OrganizationSpecimens, SynapseSpecimen } from "./RealSpecimens";
import SynapseLab from "./SynapseLab";
import EEGLab from "./EEGLab";
import BalanceDiagram from "./BalanceDiagram";
import NerveFiberLab from "./NerveFiberLab";
import MembranePotentialLab from "./MembranePotentialLab";
import IntegrationExperimentLab from "./IntegrationExperimentLab";
import ReflexLab from "./ReflexLab";
import PathwayLab from "./PathwayLab";
import SpinalRegulationLab from "./SpinalRegulationLab";
import BrainstemLab from "./BrainstemLab";
import MotorControlLab from "./MotorControlLab";
import BasalGangliaLab from "./BasalGangliaLab";
import CerebellumLab from "./CerebellumLab";
import ThalamusLab from "./ThalamusLab";
import HypothalamusLab from "./HypothalamusLab";
import LimbicLab from "./LimbicLab";
import AmygdalaLab from "./AmygdalaLab";
import CortexLab from "./CortexLab";
import SomatosensoryLab from "./SomatosensoryLab";
import VisionLab from "./VisionLab";
import SensorySystemsLab from "./SensorySystemsLab";
import AutonomicLab from "./AutonomicLab";
import LearningMemoryLab from "./LearningMemoryLab";
import SleepRhythmLab from "./SleepRhythmLab";
import PlasticityLab from "./PlasticityLab";
import ReflexLearningLab from "./ReflexLearningLab";
import CranialNerveFiberLab from "./CranialNerveFiberLab";
import FunctionalCentersLab from "./FunctionalCentersLab";
import CerebralHomeostasisLab from "./CerebralHomeostasisLab";
import AgeNeurophysiologyPanel from "./AgeNeurophysiologyPanel";
import NeuromuscularJunctionLab from "./NeuromuscularJunctionLab";
import NeurologicalExamLab from "./NeurologicalExamLab";
import AdvancedAnatomyReference from "./AdvancedAnatomyReference";
import ClinicalMechanismAtlas from "./ClinicalMechanismAtlas";
import SketchPad from "./SketchPad";
import BlockPathBuilder, {type BuilderItem} from "./BlockPathBuilder";
import AnatomyPhysiologyBuilder from "./AnatomyPhysiologyBuilder";

type UI = InteractiveLesson["ui"];

function Explanation({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <div id={id} className={styles.explanation} role="status" aria-live="polite" aria-atomic="true">
    <h3>{title}</h3>{children}
  </div>;
}

function Sequence({ id, nodes, ui, loop, language }: { id: string; nodes: DiagramNode[]; ui: UI; loop?: string; language: Language }) {
  const [index, setIndex] = useState(0);
  const [returned, setReturned] = useState(false);
  function select(next: number) { if (next >= 0 && next < nodes.length) { setIndex(next); setReturned(false); } }
  function selectId(id: string) { const next=nodes.findIndex(node=>node.id===id); if(next>=0)select(next); }
  function returnToCenter() { const next=nodes.findIndex(node=>node.id==="center"); if(next>=0){setIndex(next);setReturned(true);} }
  const current = nodes[index] ?? nodes[0];
  if (!current) return <p role="status">{ui.select}</p>;
  return <div data-sequence={id}>
    {id === "pathway"
      ? <PathwayVisual nodes={nodes} selected={current.id} returned={returned} language={language} onSelect={selectId} />
      : <SynapseVisual nodes={nodes} selected={current.id} electrical={id === "synapse-electrical"} language={language} onSelect={selectId} />}
    <ol className={styles.sequence} aria-label={ui.select}>
      {nodes.map((node, i) => <li key={node.id}>
        <button type="button" aria-pressed={index === i} aria-controls={`${id}-explanation`} onClick={() => select(i)} data-node={node.id}>
          <span className={styles.number} aria-hidden="true">{i + 1}</span>{node.label}
        </button>
        {i < nodes.length - 1 && <span className={styles.arrow} aria-hidden="true">↓</span>}
      </li>)}
    </ol>
    <div className={styles.actions}>
      <button type="button" data-action="previous" disabled={index === 0} onClick={() => select(index - 1)}>{ui.previous}</button>
      <button type="button" data-action="next" disabled={index === nodes.length - 1} onClick={() => select(index + 1)}>{ui.next}</button>
      <button type="button" data-action="reset" onClick={() => select(0)}>{ui.reset}</button>
    </div>
    {loop && <div className={styles.loop}>
      <p>{loop}</p>
      <button type="button" data-action="feedback" disabled={index !== nodes.length - 1} aria-controls={`${id}-explanation`} onClick={returnToCenter}>
        <span aria-hidden="true">↩ </span>{ui.returnToCenter}
      </button>
    </div>}
    <Explanation id={`${id}-explanation`} title={`${ui.explanation}: ${current.label}`}>
      <p>{ui.step} {index + 1} / {nodes.length}</p>
      {returned && <p className={styles.returned}>{loop}</p>}
      <p>{current.explanation}</p>
    </Explanation>
  </div>;
}

function Organization({ diagram, ui, language }: { diagram: InteractiveLesson["organization"]; ui: UI; language: Language }) {
  const [selected, setSelected] = useState(diagram.groups[0]?.nodes[0]?.id ?? "");
  const group = diagram.groups.find(group => group.nodes.some(node => node.id === selected)) ?? diagram.groups[0];
  const node = group?.nodes.find(node => node.id === selected) ?? group?.nodes[0];
  if (!group || !node) return <p role="status">{ui.select}</p>;
  return <>
    <OrganizationVisual nodes={diagram.groups.flatMap(group => group.nodes)} selected={selected} language={language} onSelect={setSelected} />
    <OrganizationSpecimens language={language} />
    <div className={styles.root}>{diagram.root}</div>
    <div className={styles.branches}>
      {diagram.groups.map(branch => <div className={styles.branch} key={branch.id} data-group={branch.id}>
        <h3>{branch.title}</h3>
        <div className={styles.nodes} role="group" aria-label={branch.title}>
          {branch.nodes.map(item => <button key={item.id} type="button" data-node={item.id} aria-pressed={selected === item.id} aria-controls="organization-explanation" onClick={() => setSelected(item.id)}>{item.label}</button>)}
        </div>
      </div>)}
    </div>
    <Explanation id="organization-explanation" title={`${ui.explanation}: ${node.label}`}>
      <p><strong>{group.title}</strong></p><p>{node.explanation}</p>
    </Explanation>
  </>;
}

function Synapse({ diagram, ui, language }: { diagram: InteractiveLesson["synapse"]; ui: UI; language: Language }) {
  const [mode, setMode] = useState(diagram.modes[0]?.id ?? "");
  const selected = diagram.modes.find(item => item.id === mode) ?? diagram.modes[0];
  if (!selected) return <p role="status">{ui.select}</p>;
  return <>
    <div className={styles.actions} role="group" aria-label={diagram.title}>
      {diagram.modes.map(item => <button key={item.id} type="button" data-mode={item.id} aria-pressed={mode === item.id} aria-controls="synapse-model" onClick={() => setMode(item.id)}>{item.title}</button>)}
    </div>
    <div id="synapse-model">
      <h3>{selected.title}</h3><p>{selected.note}</p>
      <Sequence key={mode} id={`synapse-${mode}`} nodes={selected.nodes} ui={ui} language={language} />
      {mode === "chemical" && <SynapseSpecimen language={language} />}
    </div>
  </>;
}

function Integration({ diagram, ui, language }: { diagram: InteractiveLesson["integration"]; ui: UI; language: Language }) {
  const [excitation, setExcitation] = useState(false);
  const [inhibition, setInhibition] = useState(false);
  const outcome = Number(excitation) + 2 * Number(inhibition);
  return <>
    <IntegrationVisual excitation={excitation} inhibition={inhibition} labels={[diagram.excitation, diagram.inhibition]} outcome={diagram.outcomes[outcome]} language={language} onExcitation={() => setExcitation(value => !value)} onInhibition={() => setInhibition(value => !value)} />
    <div className={styles.inputs} role="group" aria-label={diagram.title}>
      <button type="button" data-input="excitation" aria-pressed={excitation} aria-controls="integration-explanation" onClick={() => setExcitation(!excitation)}>
        {diagram.excitation}<span className={styles.state}>{excitation ? ui.active : ui.inactive}</span>
      </button>
      <button type="button" data-input="inhibition" aria-pressed={inhibition} aria-controls="integration-explanation" onClick={() => setInhibition(!inhibition)}>
        {diagram.inhibition}<span className={styles.state}>{inhibition ? ui.active : ui.inactive}</span>
      </button>
    </div>
    <div className={styles.convergence} aria-hidden="true"><span>{excitation ? "↓" : "┊"}</span><span>{inhibition ? "↓" : "┊"}</span></div>
    <div className={styles.neuron}>{diagram.neuron}</div>
    <Explanation id="integration-explanation" title={ui.result}><p>{diagram.outcomes[outcome]}</p></Explanation>
    <p className={styles.note}>{diagram.note}</p>
    <button type="button" data-action="reset" onClick={() => { setExcitation(false); setInhibition(false); }}>{ui.reset}</button>
  </>;
}

export default function InteractiveContent({ lesson, moduleId, language }: { lesson: InteractiveLesson; moduleId: string; language: Language }) {
  const ui = lesson.ui;
  const builderSets:Partial<Record<string,{items:BuilderItem[];order:string[]}>>={
    "3":{
      items:[
        {id:"dendrite",labels:{RU:"Дендриты",EN:"Dendrites",KZ:"Дендриттер"}},
        {id:"soma",labels:{RU:"Тело нейрона",EN:"Soma",KZ:"Нейрон денесі"}},
        {id:"initial",labels:{RU:"Начальный сегмент аксона",EN:"Axon initial segment",KZ:"Аксонның бастапқы сегменті"}},
        {id:"axon",labels:{RU:"Аксон",EN:"Axon",KZ:"Аксон"}},
        {id:"terminal",labels:{RU:"Нервное окончание",EN:"Axon terminal",KZ:"Нерв ұшы"}}
      ],order:["dendrite","soma","initial","axon","terminal"]
    },
    "4":{
      items:[
        {id:"rest",labels:{RU:"Покой",EN:"Resting state",KZ:"Тыныштық"}},
        {id:"threshold",labels:{RU:"Порог",EN:"Threshold",KZ:"Табалдырық"}},
        {id:"depol",labels:{RU:"Деполяризация",EN:"Depolarization",KZ:"Деполяризация"}},
        {id:"repol",labels:{RU:"Реполяризация",EN:"Repolarization",KZ:"Реполяризация"}},
        {id:"after",labels:{RU:"Следовая гиперполяризация",EN:"After-hyperpolarization",KZ:"Кейінгі гиперполяризация"}}
      ],order:["rest","threshold","depol","repol","after"]
    },
    "5":{
      items:[
        {id:"ap",labels:{RU:"Потенциал действия мотонейрона",EN:"Motor-neuron action potential",KZ:"Мотонейрон әрекет потенциалы"}},
        {id:"ca",labels:{RU:"Вход Ca²⁺",EN:"Ca²⁺ entry",KZ:"Ca²⁺ кіруі"}},
        {id:"ach",labels:{RU:"Выделение ацетилхолина",EN:"Acetylcholine release",KZ:"Ацетилхолин бөлінуі"}},
        {id:"rec",labels:{RU:"Никотиновые рецепторы",EN:"Nicotinic receptors",KZ:"Никотиндік рецепторлар"}},
        {id:"muscle",labels:{RU:"Потенциал действия мышцы",EN:"Muscle action potential",KZ:"Бұлшықет әрекет потенциалы"}},
        {id:"contract",labels:{RU:"Сокращение",EN:"Contraction",KZ:"Жиырылу"}}
      ],order:["ap","ca","ach","rec","muscle","contract"]
    },
    "7":{
      items:[
        {id:"receptor",labels:{RU:"Рецептор",EN:"Receptor",KZ:"Рецептор"}},
        {id:"afferent",labels:{RU:"Афферентное волокно",EN:"Afferent fiber",KZ:"Афференттік талшық"}},
        {id:"center",labels:{RU:"Центр интеграции",EN:"Integration center",KZ:"Интеграция орталығы"}},
        {id:"efferent",labels:{RU:"Эфферентное волокно",EN:"Efferent fiber",KZ:"Эфференттік талшық"}},
        {id:"effector",labels:{RU:"Эффектор",EN:"Effector",KZ:"Эффектор"}}
      ],order:["receptor","afferent","center","efferent","effector"]
    },
    "10":{
      items:[
        {id:"retina",labels:{RU:"Сетчатка",EN:"Retina",KZ:"Торқабық"}},
        {id:"optic",labels:{RU:"Зрительный нерв (II)",EN:"Optic nerve (II)",KZ:"Көру нерві (II)"}},
        {id:"pretectal",labels:{RU:"Претектальная область",EN:"Pretectal area",KZ:"Претекталдық аймақ"}},
        {id:"ew",labels:{RU:"Ядро Эдингера–Вестфаля",EN:"Edinger–Westphal nucleus",KZ:"Эдингер–Вестфаль ядросы"}},
        {id:"oculo",labels:{RU:"Глазодвигательный нерв (III)",EN:"Oculomotor nerve (III)",KZ:"Көз қимылдатқыш нерв (III)"}},
        {id:"pupil",labels:{RU:"Сужение зрачка",EN:"Pupil constriction",KZ:"Қарашықтың тарылуы"}}
      ],order:["retina","optic","pretectal","ew","oculo","pupil"]
    },
    "18":{
      items:[
        {id:"heard",labels:{RU:"Слышим/читаем слово",EN:"Hear/read a word",KZ:"Сөзді естиміз/оқимыз"}},
        {id:"understand",labels:{RU:"Понимание смысла",EN:"Understand meaning",KZ:"Мағынасын түсіну"}},
        {id:"plan",labels:{RU:"План речи",EN:"Speech plan",KZ:"Сөйлеу жоспары"}},
        {id:"motor",labels:{RU:"Моторная программа речи",EN:"Motor speech program",KZ:"Сөйлеудің моторлық бағдарламасы"}},
        {id:"speak",labels:{RU:"Произнесение",EN:"Speech output",KZ:"Айту"}}
      ],order:["heard","understand","plan","motor","speak"]
    },
    "15":{
      items:[
        {id:"deficit",labels:{RU:"Дефицит воды / рост осмолярности",EN:"Water deficit / higher osmolality",KZ:"Су тапшылығы / осмолярлықтың өсуі"}},
        {id:"sensor",labels:{RU:"Осморецепторный сигнал",EN:"Osmoreceptor signal",KZ:"Осморецепторлық сигнал"}},
        {id:"hypo",labels:{RU:"Интеграция в гипоталамусе",EN:"Hypothalamic integration",KZ:"Гипоталамустық интеграция"}},
        {id:"outputs",labels:{RU:"Жажда + вазопрессин",EN:"Thirst + vasopressin",KZ:"Шөлдеу + вазопрессин"}},
        {id:"water",labels:{RU:"Сохранение и поступление воды",EN:"Water intake and conservation",KZ:"Суды қабылдау және сақтау"}},
        {id:"restore",labels:{RU:"Уменьшение отклонения",EN:"Deviation decreases",KZ:"Ауытқу азаяды"}}
      ],order:["deficit","sensor","hypo","outputs","water","restore"]
    },
    "21":{
      items:[
        {id:"head",labels:{RU:"Поворот головы",EN:"Head rotation",KZ:"Бастың бұрылуы"}},
        {id:"hair",labels:{RU:"Вестибулярные волосковые клетки",EN:"Vestibular hair cells",KZ:"Вестибулярлық түкті жасушалар"}},
        {id:"viii",labels:{RU:"Вестибулярный афферент VIII",EN:"Vestibular afferent in CN VIII",KZ:"VIII нервтің вестибулярлық афференті"}},
        {id:"nuclei",labels:{RU:"Вестибулярные ядра",EN:"Vestibular nuclei",KZ:"Вестибулярлық ядролар"}},
        {id:"ocular",labels:{RU:"Глазодвигательные ядра",EN:"Ocular motor nuclei",KZ:"Көз қимылдатқыш ядролар"}},
        {id:"eyes",labels:{RU:"Компенсаторное движение глаз",EN:"Compensatory eye movement",KZ:"Көздің компенсаторлық қозғалысы"}}
      ],order:["head","hair","viii","nuclei","ocular","eyes"]
    },
    "22":{
      items:[
        {id:"sensor",labels:{RU:"Висцеральный рецептор",EN:"Visceral receptor",KZ:"Висцералдық рецептор"}},
        {id:"afferent",labels:{RU:"Висцеральный афферент",EN:"Visceral afferent",KZ:"Висцералдық афферент"}},
        {id:"cns",labels:{RU:"Центральная интеграция",EN:"Central integration",KZ:"Орталық интеграция"}},
        {id:"pregang",labels:{RU:"Преганглионарный нейрон",EN:"Preganglionic neuron",KZ:"Преганглионарлық нейрон"}},
        {id:"ganglion",labels:{RU:"Вегетативный ганглий",EN:"Autonomic ganglion",KZ:"Вегетативтік ганглий"}},
        {id:"target",labels:{RU:"Орган-мишень",EN:"Target organ",KZ:"Нысана мүше"}}
      ],order:["sensor","afferent","cns","pregang","ganglion","target"]
    }
  };
  const builder=builderSets[moduleId];

  function card(diagram: DiagramBase, children: ReactNode) {
    return <section id={diagram.id} className={`${shared.card} ${styles.card}`} aria-labelledby={`${diagram.id}-title`}>
      <h2 id={`${diagram.id}-title`}>{diagram.title}</h2>
      <p id={`${diagram.id}-instructions`}><strong>{ui.instructions}: </strong>{diagram.instruction}</p>
      <div role="group" aria-labelledby={`${diagram.id}-title`} aria-describedby={`${diagram.id}-instructions`}>{children}</div>
      <p className={styles.theory}><Link href={`/modules/${moduleId}/theory?lang=${language}#${diagram.anchor}`}>{ui.theory}</Link></p>
    </section>;
  }
  return <article className={`${shared.practice} ${styles.interactive}`} data-testid="interactive-diagrams" lang={language === "KZ" ? "kk" : language.toLowerCase()}>
    <h1>{lesson.title}</h1><p>{lesson.introduction}</p><p className={styles.note}>{ui.keyboard}</p>
    {moduleId === "21" && <><SensorySystemsLab language={language} /><NeurologicalExamLab language={language} /></>}
    {card(lesson.organization, <Organization diagram={lesson.organization} ui={ui} language={language} />)}
    {card(lesson.pathway, <Sequence id="pathway" nodes={lesson.pathway.nodes} ui={ui} loop={lesson.pathway.loop} language={language} />)}
    {moduleId === "2" && <EEGLab language={language} />}
    {moduleId === "3" && <><NerveFiberLab language={language} /><CerebralHomeostasisLab language={language} /><AgeNeurophysiologyPanel language={language} /></>}
    {moduleId === "4" && <><AdvancedAnatomyReference moduleId={4} language={language}/><MembranePotentialLab language={language} /></>}
    {moduleId === "6" && <IntegrationExperimentLab language={language} />}
    {moduleId === "7" && <><AdvancedAnatomyReference moduleId={7} language={language}/><ReflexLab language={language} /><ReflexLearningLab language={language} /></>}
    {moduleId === "8" && <PathwayLab language={language} />}
    {moduleId === "9" && <SpinalRegulationLab language={language} />}
    {moduleId === "10" && <><BrainstemLab language={language} /><CranialNerveFiberLab language={language} /><FunctionalCentersLab language={language} moduleId={10} /><NeurologicalExamLab language={language} /></>}
    {moduleId === "11" && <><MotorControlLab language={language} /><NeuromuscularJunctionLab language={language} /></>}
    {moduleId === "12" && <BasalGangliaLab language={language} />}
    {moduleId === "13" && <CerebellumLab language={language} />}
    {moduleId === "14" && <ThalamusLab language={language} />}
    {moduleId === "15" && <HypothalamusLab language={language} />}
    {moduleId === "16" && <LimbicLab language={language} />}
    {moduleId === "17" && <AmygdalaLab language={language} />}
    {moduleId === "18" && <><CortexLab language={language} /><FunctionalCentersLab language={language} /><NeurologicalExamLab language={language} /></>}
    {moduleId === "19" && <><SomatosensoryLab language={language} /><NeurologicalExamLab language={language} /></>}
    {moduleId === "20" && <VisionLab language={language} />}
    {moduleId === "22" && <AutonomicLab language={language} />}
    {moduleId === "23" && <><LearningMemoryLab language={language} /><ReflexLearningLab language={language} /><FunctionalCentersLab language={language} moduleId={23} /><AgeNeurophysiologyPanel language={language} /></>}
    {moduleId === "24" && <><SleepRhythmLab language={language} /><AgeNeurophysiologyPanel language={language} /></>}
    {moduleId === "25" && <><PlasticityLab language={language} /><CerebralHomeostasisLab language={language} /><AgeNeurophysiologyPanel language={language} /></>}
    <ClinicalMechanismAtlas moduleId={Number(moduleId)} language={language} />
    <AnatomyPhysiologyBuilder moduleId={Number(moduleId)} language={language} />
    {builder && <BlockPathBuilder language={language} items={builder.items} correctOrder={builder.order} moduleId={Number(moduleId)} />}
    {["3","4","5","7","10","15","17","18","21","22","23"].includes(moduleId) && <SketchPad language={language} storageKey={`neuro-course:sketch:${moduleId}:${language}`} moduleId={Number(moduleId)} />}
    {card(lesson.synapse, <Synapse diagram={lesson.synapse} ui={ui} language={language} />)}
    {moduleId === "1" && <SynapseLab language={language} />}
    {moduleId === "5" && <><SynapseLab language={language} /><NeuromuscularJunctionLab language={language} /></>}
    {card(lesson.integration, <Integration diagram={lesson.integration} ui={ui} language={language} />)}
    {moduleId === "1" && <BalanceDiagram language={language} ui={ui} />}
  </article>;
}
