"use client";
import Link from "next/link";
import { useRef,useState } from "react";
import { modules,type Language } from "../content/course";
import { sections,type Section } from "../content/sections";
import styles from "./ModuleSidebar.module.css";

const copy={RU:{nav:"Навигация по курсу",open:"Открыть навигацию",close:"Свернуть панель",expand:"Развернуть панель",location:"Вы находитесь",module:"Модуль",home:"Титул модуля",login:"Вход",dashboard:"Кабинет"},KZ:{nav:"Курс навигациясы",open:"Навигацияны ашу",close:"Панельді жинау",expand:"Панельді ашу",location:"Сіздің орныңыз",module:"Модуль",home:"Модуль беті",login:"Кіру",dashboard:"Кабинет"},EN:{nav:"Course navigation",open:"Open navigation",close:"Collapse sidebar",expand:"Expand sidebar",location:"You are here",module:"Module",home:"Module home",login:"Sign in",dashboard:"Dashboard"}} as const;
type Props={moduleNumber:number;currentSection?:Section;currentSectionTitle?:string;lang:Language};

function Navigation({moduleNumber,currentSection,currentSectionTitle,lang,onNavigate}:{moduleNumber:number;currentSection?:Section;currentSectionTitle?:string;lang:Language;onNavigate?:()=>void}){
  const[expanded,setExpanded]=useState(moduleNumber),c=copy[lang];
  return <><div className={styles.heading}><h2>{c.nav}</h2><p><span>{c.location}</span><strong>{c.module} {moduleNumber}{currentSectionTitle?` → ${currentSectionTitle}`:""}</strong></p></div>
    <div className={styles.accountLinks}><Link href={`/login?next=/dashboard?lang=${lang}`}>{c.login}</Link><Link href={`/dashboard?lang=${lang}`}>{c.dashboard}</Link></div>
    <nav className={styles.moduleList} aria-label={c.nav} data-module-count={modules[lang].length}>{modules[lang].map((title,index)=>{const id=index+1,isCurrent=id===moduleNumber,isOpen=id===expanded;return <section className={`${styles.moduleItem} ${isCurrent?styles.currentModule:""}`} key={id} data-module-id={id}>
      <button type="button" className={styles.moduleButton} aria-expanded={isOpen} aria-controls={`sidebar-module-${id}`} onClick={()=>setExpanded(value=>value===id?0:id)}><span>{id}</span><strong>{title}</strong><i aria-hidden="true">{isOpen?"−":"+"}</i></button>
      {isOpen&&<div id={`sidebar-module-${id}`} className={styles.sectionList} data-section-count={sections.length}><Link href={`/modules/${id}?lang=${lang}`} onClick={onNavigate} className={!currentSection&&isCurrent?styles.currentSection:undefined}>{c.home}</Link>{sections.map(section=><Link key={section.slug} href={`/modules/${id}/${section.slug}?lang=${lang}`} onClick={onNavigate} aria-current={isCurrent&&currentSection===section.slug?"page":undefined} className={isCurrent&&currentSection===section.slug?styles.currentSection:undefined}><span aria-hidden="true">{section.icon}</span>{section.title[lang]}</Link>)}</div>}
    </section>})}</nav></>;
}

export default function ModuleSidebar(props:Props){const[collapsed,setCollapsed]=useState(false),mobile=useRef<HTMLDetailsElement>(null),c=copy[props.lang];return <div className={styles.sidebarHost}>
  <aside className={`${styles.desktop} ${collapsed?styles.collapsed:""}`} data-testid="course-sidebar-desktop"><button type="button" className={styles.collapse} aria-expanded={!collapsed} onClick={()=>setCollapsed(v=>!v)}>{collapsed?"☰":"‹"}<span>{collapsed?c.expand:c.close}</span></button>{!collapsed?<Navigation {...props}/>:<nav className={styles.rail} aria-label={c.nav}>{modules[props.lang].map((_,i)=><Link key={i} href={`/modules/${i+1}?lang=${props.lang}`} aria-current={i+1===props.moduleNumber?"page":undefined}>{i+1}</Link>)}</nav>}</aside>
  <details className={styles.mobile} ref={mobile} data-testid="course-sidebar-mobile"><summary>{c.open}<span aria-hidden="true"> ☰</span></summary><div><Navigation {...props} onNavigate={()=>mobile.current?.removeAttribute("open")}/></div></details>
  </div>}
