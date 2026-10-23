"use client";
import Link from "next/link";
import {useEffect,useState} from "react";
import type {Language} from "../content/course";
import {sections,type Section} from "../content/sections";
import {readCourseProgress} from "../lib/courseProgress";
import styles from "./SectionProgressStrip.module.css";

export default function SectionProgressStrip({moduleId,current,language}:{moduleId:number;current:Section;language:Language}){
 const [completed,setCompleted]=useState<Section[]>([]);
 useEffect(()=>setCompleted(readCourseProgress().visitedSections[String(moduleId)]??[]),[moduleId,current]);
 const label=language==="RU"?"Быстрый переход по 17 разделам":language==="KZ"?"17 бөлім бойынша жылдам өту":"Quick navigation through 17 sections";
 return <nav className={styles.wrap} aria-label={label}><ol className={styles.list}>
  {sections.map((item,index)=>{const active=item.slug===current,done=completed.includes(item.slug);return <li key={item.slug}>
   <Link href={`/modules/${moduleId}/${item.slug}?lang=${language}`} aria-current={active?"page":undefined} title={item.title[language]} className={active?styles.active:done?styles.done:undefined}>
    <span>{index+1}</span><span className={styles.tooltip}>{item.title[language]}</span>
   </Link>
  </li>})}
 </ol></nav>;
}
