"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import type { Language } from "../content/course";
import type { DiagramBase, DiagramNode, InteractiveLesson } from "../content/interactive";
import shared from "./PracticeContent.module.css";
import styles from "./InteractiveContent.module.css";
import { OrganizationVisual, PathwayVisual, SynapseVisual, IntegrationVisual } from "./InteractiveVisuals";

type UI = InteractiveLesson["ui"];

function Explanation({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return <div id={id} className={styles.explanation} role="status" aria-live="polite" aria-atomic="true">
    <h3>{title}</h3>{children}
  </div>;
}

function Sequence({ id, nodes, ui, loop, language }: { id: string; nodes: DiagramNode[]; ui: UI; loop?: string; language: Language }) {
  const [index, setIndex] = useState(0);
  const [returned, setReturned] = useState(false);
  function select(next: number) { setIndex(next); setReturned(false); }
  const current = nodes[index];
  return <div data-sequence={id}>
    {id === "pathway"
      ? <PathwayVisual nodes={nodes} selected={current.id} returned={returned} language={language} onSelect={id => select(nodes.findIndex(node => node.id === id))} />
      : <SynapseVisual nodes={nodes} selected={current.id} electrical={id === "synapse-electrical"} language={language} onSelect={id => select(nodes.findIndex(node => node.id === id))} />}
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
      <button type="button" data-action="feedback" disabled={index !== nodes.length - 1} aria-controls={`${id}-explanation`} onClick={() => { setIndex(nodes.findIndex(node => node.id === "center")); setReturned(true); }}>
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
  const [selected, setSelected] = useState(diagram.groups[0].nodes[0].id);
  const group = diagram.groups.find(group => group.nodes.some(node => node.id === selected))!;
  const node = group.nodes.find(node => node.id === selected)!;
  return <>
    <OrganizationVisual nodes={diagram.groups.flatMap(group => group.nodes)} selected={selected} language={language} onSelect={setSelected} />
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
  const [mode, setMode] = useState(diagram.modes[0].id);
  const selected = diagram.modes.find(item => item.id === mode)!;
  return <>
    <div className={styles.actions} role="group" aria-label={diagram.title}>
      {diagram.modes.map(item => <button key={item.id} type="button" data-mode={item.id} aria-pressed={mode === item.id} aria-controls="synapse-model" onClick={() => setMode(item.id)}>{item.title}</button>)}
    </div>
    <div id="synapse-model">
      <h3>{selected.title}</h3><p>{selected.note}</p>
      <Sequence key={mode} id={`synapse-${mode}`} nodes={selected.nodes} ui={ui} language={language} />
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
    {card(lesson.organization, <Organization diagram={lesson.organization} ui={ui} language={language} />)}
    {card(lesson.pathway, <Sequence id="pathway" nodes={lesson.pathway.nodes} ui={ui} loop={lesson.pathway.loop} language={language} />)}
    {card(lesson.synapse, <Synapse diagram={lesson.synapse} ui={ui} language={language} />)}
    {card(lesson.integration, <Integration diagram={lesson.integration} ui={ui} language={language} />)}
  </article>;
}
