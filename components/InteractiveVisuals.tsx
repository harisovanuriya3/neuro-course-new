"use client";

import { useId, type ReactNode } from "react";
import type { Language } from "../content/course";
import type { DiagramNode } from "../content/interactive";
import styles from "./InteractiveVisuals.module.css";

const copy = {
  RU: { selected: "Выделено", model: "Условная учебная схема. Номера соответствуют подписям ниже. Выбор меняется кнопками схемы.", pre: "Пресинаптический элемент", post: "Постсинаптический элемент", vesicles: "Везикулы с медиатором", cleft: "Синаптическая щель", receptors: "Постсинаптические рецепторы", junction: "Электрическое соединение: щелевые контакты", unknown: "Возникновение потенциала действия не определено", unavailable: "Элемент схемы временно недоступен", active: "включено", inactive: "выключено" },
  EN: { selected: "Highlighted", model: "Schematic teaching model. Numbers match the labels below. Use the diagram buttons to change the selection.", pre: "Presynaptic element", post: "Postsynaptic element", vesicles: "Vesicles containing transmitter", cleft: "Synaptic cleft", receptors: "Postsynaptic receptors", junction: "Electrical connection: gap junctions", unknown: "Action potential generation is undetermined", unavailable: "This diagram item is temporarily unavailable", active: "on", inactive: "off" },
  KZ: { selected: "Белгіленген", model: "Шартты оқу сызбасы. Сандар төмендегі атауларға сәйкес келеді. Таңдауды сызба батырмаларымен өзгертіңіз.", pre: "Пресинапстық элемент", post: "Постсинапстық элемент", vesicles: "Медиаторы бар везикулалар", cleft: "Синапстық саңылау", receptors: "Постсинапстық рецепторлар", junction: "Электрлік байланыс: саңылаулы түйіспелер", unknown: "Әрекет потенциалының пайда болуы анықталмаған", unavailable: "Сызба элементі уақытша қолжетімсіз", active: "қосулы", inactive: "өшірулі" },
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
  const current = nodes.find(node => node.id === selected) ?? nodes[0];
  if (!current) return <p role="status">{copy[language].unavailable}</p>;
  const title = language === "RU" ? "Анатомические структуры ЦНС и ПНС" : language === "EN" ? "Anatomical structures of the CNS and PNS" : "ОЖЖ және ШЖЖ анатомиялық құрылымдары";
  const detail = language === "RU" ? "Выберите структуру: выделение и импульс покажут её участие в передаче сигнала. Фотографии ниже позволяют рассмотреть реальные препараты." : language === "EN" ? "Select a structure to highlight its role in signal transmission. The photographs below show real anatomical specimens." : "Құрылымды таңдаңыз: белгілеу мен импульс сигнал берілуіндегі рөлін көрсетеді. Төменде нақты анатомиялық препараттар берілген.";
  const region = selected === "brain" || selected === "spinal" ? "central" : "peripheral";
  const signal = region === "central" ? "M 180 28 C 180 90 180 110 180 185 L 180 275" : "M 180 90 Q 230 132 300 172 Q 325 186 330 265";
  return <figure className={styles.figure} data-visual-state={selected} aria-label={title}>
    <div style={{padding:16}}>
      <h3 style={{margin:"0 0 8px"}}>{title}</h3><p style={{lineHeight:1.6}}>{detail}</p>
      <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))",gap:16}}>
        <div style={{position:"relative",minHeight:360,border:"1px solid #c5dae5",borderRadius:14,background:"#eaf4f8",overflow:"hidden",display:"grid",placeItems:"center"}}>
          <img src="/images/anatomy/brain-spinal-cord.jpg" alt={language==="RU"?"Анатомический препарат головного и спинного мозга":language==="EN"?"Anatomical specimen of the brain and spinal cord":"Бас миы мен жұлынның анатомиялық препараты"} style={{height:360,maxWidth:"100%",objectFit:"contain"}} />
          <span style={{position:"absolute",bottom:8,left:8,right:8,background:"#ffffffeb",padding:8,borderRadius:8,fontSize:13}}>{region==="central"?"ЦНС / CNS / ОЖЖ":"ЦНС и отходящие нервы / CNS and exiting nerves"}</span>
        </div>
        <div style={{display:"grid",gap:12,alignContent:"start"}}>
          <div style={{position:"relative",padding:10,border:"1px solid #c5dae5",borderRadius:14,background:"#f7fbfe"}}>
            <svg viewBox="0 0 360 300" role="img" aria-label={current.explanation} style={{display:"block",width:"100%"}}>
              <path d="M180 20 Q130 5 112 42 Q91 78 146 100 L175 105 L175 232 M180 20 Q230 5 248 42 Q269 78 214 100 L185 105 L185 232" fill="none" stroke="#567b93" strokeWidth="10" strokeLinecap="round"/>
              <path d="M177 107 L177 275 M184 107 L184 275 M178 143 Q109 126 44 180 M184 143 Q251 126 317 180 M178 205 Q110 228 50 275 M184 205 Q250 228 310 275" fill="none" stroke="#b68c4d" strokeWidth="5" strokeLinecap="round"/>
              <path d={signal} fill="none" stroke={region==="central"?"#116ca8":"#d06a26"} strokeWidth="5" strokeDasharray="12 10">
                <animate attributeName="stroke-dashoffset" from="44" to="0" dur="1.4s" repeatCount="indefinite"/>
              </path>
              <circle cx={region==="central"?180:300} cy={region==="central"?125:173} r="12" fill="#e9faff" stroke="#005b91" strokeWidth="3"/>
              <text x="180" y="294" textAnchor="middle" fontSize="12" fill="#24465d">{region==="central"?"CNS / ОЖЖ":"PNS / ШЖЖ"}</text>
            </svg>
          </div>
          <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(125px,1fr))",gap:8}}>
            {nodes.map((node,i)=><button key={node.id} type="button" aria-pressed={node.id===selected} onClick={()=>onSelect(node.id)} style={{padding:"10px",borderRadius:10,cursor:"pointer",border:node.id===selected?"2px solid #005b91":"1px solid #b7d1df",background:node.id===selected?"#d5eef9":"#fff",fontWeight:node.id===selected?750:500,textAlign:"left"}}>{i+1}. {node.label}</button>)}
          </div>
          <p aria-live="polite" style={{margin:0,lineHeight:1.55}}><strong>{current.label}.</strong> {current.explanation}</p>
        </div>
      </div>
    </div>
  </figure>;
}

export function PathwayVisual({ nodes, selected, returned, language, onSelect }: { nodes: DiagramNode[]; selected: string; returned: boolean; language: Language; onSelect: (id: string) => void }) {
  const action = (id: string): Action => { const node=nodes.find(item=>item.id===id); return { label:node?.label??copy[language].unavailable, onActivate:()=>{if(node)onSelect(id)} }; };
  const id = useId();
  const points = [[55,65],[180,65],[305,65],[305,210],[180,210],[55,210]];
  const paths = ['M30 22L49 44','M79 65H154','M204 65H279','M305 89V184','M281 210H206','M154 210H81'];
  const pathwayIds = ['receptor','afferent','center','efferent','effector','feedback'];
  const current = nodes.find(node => node.id === selected) ?? nodes[0];
  if (!current) return <p role="status">{copy[language].unavailable}</p>;
  return <Frame title={`${copy[language].selected}: ${current.label}`} description={current.explanation} state={returned ? 'feedback-center' : selected} legend={<Legend {...{ nodes, selected, language }} />}>
    <defs><marker id={id} markerUnits="userSpaceOnUse" markerWidth="10" markerHeight="10" refX="9" refY="5" orient="auto"><path d="M0 0L10 5 0 10Z" fill="#00599c" /></marker></defs>
    <path className={styles.heat} d="M8 32H31V50H8Z M11 25q-6-6 0-12m9 12q-6-6 0-12m9 12q-6-6 0-12" />
    {paths.map((d,i)=><Part {...action(pathwayIds[i])} key={d} active={pathwayIds[i] === selected}><path d={d} fill="none" markerEnd={`url(#${id})`} /></Part>)}
    <Part {...action('feedback')} active={selected === 'feedback' || returned}><path d="M55 235V283H337V112Q337 97 318 88" fill="none" strokeDasharray="8 5" markerEnd={`url(#${id})`} /></Part>
    {points.map(([x,y],i)=><g key={pathwayIds[i]}><Part {...action(pathwayIds[i])} active={pathwayIds[i] === selected}><circle cx={x} cy={y} r="24" /></Part><Badge {...action(pathwayIds[i])} x={x} y={y} n={i+1} active={pathwayIds[i] === selected} /></g>)}
    <path className={styles.outline} d="M282 38q-8-17 8-20q12-12 22 0q18 2 8 20 M154 241q8-12 19-6l13 7 16-10 9 8-22 18-26-3Z" />
  </Frame>;
}

export function SynapseVisual({ nodes, selected, electrical, language, onSelect }: { nodes: DiagramNode[]; selected: string; electrical: boolean; language: Language; onSelect: (id: string) => void }) {
  const c = copy[language];
  const action = (id: string): Action => { const node=nodes.find(item=>item.id===id); return { label:node?.label??c.unavailable, onActivate:()=>{if(node)onSelect(id)} }; };
  const current = nodes.find(node => node.id === selected) ?? nodes[0];
  if (!current) return <p role="status">{c.unavailable}</p>;
  return <Frame title={`${c.selected}: ${current.label}`} description={current.explanation} state={`${electrical ? 'electrical' : 'chemical'}-${selected}`} legend={<><p>A — {c.pre}; B — {c.post}.</p><p>{electrical ? c.junction : `${c.vesicles} · ${c.cleft} · ${c.receptors}`}</p><Legend {...{ nodes, selected, language }} /></>}>
    <Part {...action(electrical ? 'cell' : 'arrival')} active={selected === 'arrival' || selected === 'cell'}><path d="M110 8V42Q47 55 47 120V154H313V120Q313 55 250 42V8" /><path d="M180 8V55m-9-12 9 12 9-12" fill="none" /></Part>
    <text className={styles.letter} x="67" y="91">A</text>
    <Part {...action(electrical ? 'coupled' : 'response')} active={selected === 'response' || selected === 'coupled'}><path d="M47 229Q180 204 313 229V308H47Z" /></Part>
    <text className={styles.letter} x="67" y="279">B</text>
    {electrical ? <>
      <Part {...action('junction')} active={selected === 'junction'}>{[135,175,215].map(x=><path key={x} d={`M${x} 145v85h16v-85Z`} />)}<path d="M112 179H247M112 193H247" fill="none" /></Part>
      <path className={styles.signal} d="M182 118V256m-9-12 9 12 9-12" />
      {[[272,45,"cell"],[278,187,"junction"],[271,275,"coupled"]].map(([x,y,id],i)=><Badge {...action(String(id))} key={String(id)} x={Number(x)} y={Number(y)} n={i+1} active={id===selected} />)}
    </> : <>
      <Part {...action('calcium')} active={selected === 'calcium'}><path d="M322 116H276m10-9-10 9 10 9" fill="none" /><text x="263" y="95" className={styles.ion}>Ca²⁺</text></Part>
      <Part {...action('transmitter')} active={selected === 'transmitter'}>{[125,181,230].map((x,i)=><g key={x}><circle cx={x} cy={112+i*9} r="18" />{[-6,0,6].map(dx=><circle key={dx} cx={x+dx} cy={112+i*9} r="2" />)}</g>)}{[132,160,185,213,238].map((x,i)=><circle key={x} cx={x} cy={170+(i%2)*20} r="4" />)}</Part>
      <Part {...action('binding')} active={selected === 'binding'}>{[128,180,232].map(x=><path key={x} d={`M${x-9} 205v20h18v-20m-9 20v14`} fill="none" />)}</Part>
      {[[222,23,"arrival"],[332,87,"calcium"],[93,132,"transmitter"],[277,218,"binding"],[268,279,"response"]].map(([x,y,id],i)=><Badge {...action(String(id))} key={String(id)} x={Number(x)} y={Number(y)} n={i+1} active={id===selected} />)}
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
