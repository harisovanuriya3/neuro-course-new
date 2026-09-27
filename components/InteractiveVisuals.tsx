"use client";

import { useId, type ReactNode } from "react";
import type { Language } from "../content/course";
import type { DiagramNode } from "../content/interactive";
import styles from "./InteractiveVisuals.module.css";

const copy = {
  RU: { selected: "Выделено", model: "Условная учебная схема. Номера соответствуют подписям ниже. Выбор меняется кнопками схемы.", pre: "Пресинаптический элемент", post: "Постсинаптический элемент", vesicles: "Везикулы с медиатором", cleft: "Синаптическая щель", receptors: "Постсинаптические рецепторы", junction: "Электрическое соединение: щелевые контакты", unknown: "Возникновение потенциала действия не определено", active: "включено", inactive: "выключено" },
  EN: { selected: "Highlighted", model: "Schematic teaching model. Numbers match the labels below. Use the diagram buttons to change the selection.", pre: "Presynaptic element", post: "Postsynaptic element", vesicles: "Vesicles containing transmitter", cleft: "Synaptic cleft", receptors: "Postsynaptic receptors", junction: "Electrical connection: gap junctions", unknown: "Action potential generation is undetermined", active: "on", inactive: "off" },
  KZ: { selected: "Белгіленген", model: "Шартты оқу сызбасы. Сандар төмендегі атауларға сәйкес келеді. Таңдауды сызба батырмаларымен өзгертіңіз.", pre: "Пресинапстық элемент", post: "Постсинапстық элемент", vesicles: "Медиаторы бар везикулалар", cleft: "Синапстық саңылау", receptors: "Постсинапстық рецепторлар", junction: "Электрлік байланыс: саңылаулы түйіспелер", unknown: "Әрекет потенциалының пайда болуы анықталмаған", active: "қосулы", inactive: "өшірулі" },
};

function Frame({ title, description, children, legend, state }: { title: string; description: string; children: ReactNode; legend: ReactNode; state: string }) {
  const id = useId();
  return <figure className={styles.figure} data-visual-state={state}>
    <svg viewBox="0 0 360 320" role="group" aria-labelledby={`${id}-title ${id}-description`} className={styles.svg}>
      <title id={`${id}-title`}>{title}</title><desc id={`${id}-description`}>{description}</desc>
      {children}
    </svg>
    <figcaption>{legend}</figcaption>
  </figure>;
}
type Action = { label: string; onActivate: () => void };
function Control({ label, onActivate, active, className, children }: Action & { active: boolean; className?: string; children: ReactNode }) {
  return <g role="button" tabIndex={0} aria-label={label} aria-pressed={active} className={styles.control + ' ' + (className ?? '')}
    onClick={onActivate} onKeyDown={event => {
      if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); if (!event.repeat) onActivate(); }
    }}>{children}</g>;
}
function Part({ active, children, label, onActivate }: { active: boolean; children: ReactNode; label?: string; onActivate?: () => void }) {
  const className = active ? styles.active : styles.part;
  return onActivate && label ? <Control label={label} onActivate={onActivate} active={active} className={className}>{children}</Control>
    : <g className={className} data-highlighted={active}>{children}</g>;
}
function Badge({ x, y, n, active, label, onActivate }: { x: number; y: number; n: number; active: boolean } & Action) {
  return <Control className={styles.badge} label={n + ': ' + label} onActivate={onActivate} active={active}>
    {active && <circle cx={x} cy={y} r="20" className={styles.selection} />}
    <circle cx={x} cy={y} r="15" /><text x={x} y={y + 7} textAnchor="middle">{n}</text>
  </Control>;
}
function Legend({ nodes, selected, language }: { nodes: DiagramNode[]; selected: string; language: Language }) {
  return <><p>{copy[language].model}</p><ol className={styles.legend}>{nodes.map(node => <li key={node.id} className={node.id === selected ? styles.current : undefined}>{node.label}{node.id === selected && <strong> — {copy[language].selected}</strong>}</li>)}</ol></>;
}

export function OrganizationVisual({ nodes, selected, language, onSelect }: { nodes: DiagramNode[]; selected: string; language: Language; onSelect: (id: string) => void }) {
  const action = (id: string): Action => ({ label: nodes.find(node => node.id === id)!.label, onActivate: () => onSelect(id) });
  const current = nodes.find(node => node.id === selected)!;
  return <Frame title={`${copy[language].selected}: ${current.label}`} description={current.explanation} state={selected} legend={<Legend {...{ nodes, selected, language }} />}>
    <path className={styles.outline} d="M151 92 Q119 99 107 133 L70 207 87 218 130 163 132 231 111 306 139 306 179 238 218 306 246 306 226 231 229 163 271 218 289 207 250 133 Q238 99 209 92 M151 92 Q129 77 137 42 Q142 14 180 14 Q217 14 223 42 Q232 77 209 92" />
    <Part {...action('brain')} active={selected === 'brain'}><path d="M178 32 C164 21 144 43 153 53 C139 65 155 84 177 77 C192 88 213 72 207 58 C221 39 194 22 178 32Z" /><path d="M179 33V76 M157 45Q173 40 174 54 M189 44Q204 49 193 59 M159 66Q169 55 177 65" fill="none" /></Part>
    <Part {...action('spinal')} active={selected === 'spinal'}><path d="M175 81 L184 81 184 220 180 235 175 220Z" /></Part>
    <Part {...action('nerves')} active={selected === 'nerves'}><path d="M174 111L133 127 87 203 M185 111L226 127 272 203 M174 146L132 153 M185 146L226 153 M175 210L149 251 128 296 M185 210L210 251 231 296" fill="none" /></Part>
    <Part {...action('ganglia')} active={selected === 'ganglia'}>{[[154,119],[207,119],[153,149],[207,149]].map(([x,y])=><ellipse key={`${x}-${y}`} cx={x} cy={y} rx="7" ry="10" />)}</Part>
    <Part {...action('endings')} active={selected === 'endings'}><path d="M87 203l-11 1m11-1-4 11m189-11 12 1m-12-1 4 11m-148 82-10 5m10-5 4 10m99-10 10 5m-10-5-3 10" fill="none" /></Part>
    {[[235,43],[211,189],[102,158],[240,113],[66,237]].map(([x,y],i)=><Badge {...action(nodes[i].id)} key={i} x={x} y={y} n={i+1} active={nodes[i].id === selected} />)}
  </Frame>;
}

export function PathwayVisual({ nodes, selected, returned, language, onSelect }: { nodes: DiagramNode[]; selected: string; returned: boolean; language: Language; onSelect: (id: string) => void }) {
  const action = (id: string): Action => ({ label: nodes.find(node => node.id === id)!.label, onActivate: () => onSelect(id) });
  const id = useId();
  const points = [[55,65],[180,65],[305,65],[305,210],[180,210],[55,210]];
  const paths = ['M30 22L49 44','M79 65H154','M204 65H279','M305 89V184','M281 210H206','M154 210H81'];
  const current = nodes.find(node => node.id === selected)!;
  return <Frame title={`${copy[language].selected}: ${current.label}`} description={current.explanation} state={returned ? 'feedback-center' : selected} legend={<Legend {...{ nodes, selected, language }} />}>
    <defs><marker id={id} markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto"><path d="M0 0L10 5 0 10Z" fill="#00599c" /></marker></defs>
    <path className={styles.heat} d="M8 32H31V50H8Z M11 25q-6-6 0-12m9 12q-6-6 0-12m9 12q-6-6 0-12" />
    {paths.map((d,i)=><Part {...action(nodes[i].id)} key={d} active={nodes[i].id === selected}><path d={d} fill="none" markerEnd={`url(#${id})`} /></Part>)}
    <Part {...action('feedback')} active={selected === 'feedback' || returned}><path d="M55 235V283H337V112Q337 97 318 88" fill="none" strokeDasharray="8 5" markerEnd={`url(#${id})`} /></Part>
    {points.map(([x,y],i)=><g key={i}><Part {...action(nodes[i].id)} active={nodes[i].id === selected}><circle cx={x} cy={y} r="24" /></Part><Badge {...action(nodes[i].id)} x={x} y={y} n={i+1} active={nodes[i].id === selected} /></g>)}
    <path className={styles.outline} d="M282 38q-8-17 8-20q12-12 22 0q18 2 8 20 M154 241q8-12 19-6l13 7 16-10 9 8-22 18-26-3Z" />
  </Frame>;
}

export function SynapseVisual({ nodes, selected, electrical, language, onSelect }: { nodes: DiagramNode[]; selected: string; electrical: boolean; language: Language; onSelect: (id: string) => void }) {
  const action = (id: string): Action => ({ label: nodes.find(node => node.id === id)!.label, onActivate: () => onSelect(id) });
  const c = copy[language];
  const current = nodes.find(node => node.id === selected)!;
  return <Frame title={`${c.selected}: ${current.label}`} description={current.explanation} state={`${electrical ? 'electrical' : 'chemical'}-${selected}`} legend={<><p>A — {c.pre}; B — {c.post}.</p><p>{electrical ? c.junction : `${c.vesicles} · ${c.cleft} · ${c.receptors}`}</p><Legend {...{ nodes, selected, language }} /></>}>
    <Part {...action(electrical ? 'cell' : 'arrival')} active={selected === 'arrival' || selected === 'cell'}><path d="M110 8V42Q47 55 47 120V154H313V120Q313 55 250 42V8" /><path d="M180 8V55m-9-12 9 12 9-12" fill="none" /></Part>
    <text className={styles.letter} x="67" y="91">A</text>
    <Part {...action(electrical ? 'coupled' : 'response')} active={selected === 'response' || selected === 'coupled'}><path d="M47 229Q180 204 313 229V308H47Z" /></Part>
    <text className={styles.letter} x="67" y="279">B</text>
    {electrical ? <>
      <Part {...action('junction')} active={selected === 'junction'}>{[135,175,215].map(x=><path key={x} d={`M${x} 145v85h16v-85Z`} />)}<path d="M112 179H247M112 193H247" fill="none" /></Part>
      <path className={styles.signal} d="M182 118V256m-9-12 9 12 9-12" />
      {[[272,45],[278,187],[271,275]].map(([x,y],i)=><Badge {...action(nodes[i].id)} key={i} x={x} y={y} n={i+1} active={nodes[i].id===selected} />)}
    </> : <>
      <Part {...action('calcium')} active={selected === 'calcium'}><path d="M322 116H276m10-9-10 9 10 9" fill="none" /><text x="263" y="95" className={styles.ion}>Ca²⁺</text></Part>
      <Part {...action('transmitter')} active={selected === 'transmitter'}>{[125,181,230].map((x,i)=><g key={x}><circle cx={x} cy={112+i*9} r="18" />{[-6,0,6].map(dx=><circle key={dx} cx={x+dx} cy={112+i*9} r="2" />)}</g>)}{[132,160,185,213,238].map((x,i)=><circle key={x} cx={x} cy={170+(i%2)*20} r="4" />)}</Part>
      <Part {...action('binding')} active={selected === 'binding'}>{[128,180,232].map(x=><path key={x} d={`M${x-9} 205v20h18v-20m-9 20v14`} fill="none" />)}</Part>
      {[[222,23],[332,87],[93,132],[277,218],[268,279]].map(([x,y],i)=><Badge {...action(nodes[i].id)} key={i} x={x} y={y} n={i+1} active={nodes[i].id===selected} />)}
    </>}
  </Frame>;
}

export function IntegrationVisual({ excitation, inhibition, labels, outcome, language, onExcitation, onInhibition }: { excitation: boolean; inhibition: boolean; labels: [string,string]; outcome: string; language: Language; onExcitation: () => void; onInhibition: () => void }) {
  const c=copy[language];
  return <Frame title={labels.join(' / ')} description={outcome} state={`${Number(excitation)}${Number(inhibition)}`} legend={<><p>+ {labels[0]}: <strong>{excitation ? c.active : c.inactive}</strong><br />− {labels[1]}: <strong>{inhibition ? c.active : c.inactive}</strong></p><p>? — {c.unknown}.</p></>}>
    <Part label={labels[0]} onActivate={onExcitation} active={excitation}><circle cx="66" cy="47" r="26" /><path d="M66 74Q66 118 138 137L157 155" fill="none" strokeDasharray={excitation ? undefined : '5 6'} /><path d="M144 138l-6 13 17 1" fill="none" /></Part>
    <Part label={labels[1]} onActivate={onInhibition} active={inhibition}><circle cx="294" cy="47" r="26" /><path d="M294 74Q294 118 222 137L204 155" fill="none" strokeDasharray={inhibition ? undefined : '5 6'} /><path d="M216 138l6 13-17 1" fill="none" /></Part>
    <text className={styles.symbol} x="66" y="56">+</text><text className={styles.symbol} x="294" y="56">−</text>
    <path className={styles.outline} d="M155 137q25-18 50 0l21 30-12 38-33 11-32-11-14-38Z" />
    <path className={styles.signal} d="M147 151l-32-15-16-25m16 25-23 6m121 9 32-15 16-25m-16 25 23 6 M180 216V273H262" />
    <circle className={styles.outline} cx="180" cy="174" r="16" />
    <text className={styles.symbol} x="287" y="284">?</text>
  </Frame>;
}
