"use client";
import Link from "next/link";
import {useEffect,useState} from "react";
import {sections} from "../content/sections";
import type {Language} from "../content/course";
import {readCourseProgress} from "../lib/courseProgress";
import styles from "./SectionProgressCards.module.css";

export default function SectionProgressCards({moduleId,language}:{moduleId:number;language:Language}){
 const [visited,setVisited]=useState<string[]>([]);
 useEffect(()=>{const refresh=()=>setVisited(readCourseProgress().visitedSections[String(moduleId)]??[]);refresh();window.addEventListener("pageshow",refresh);window.addEventListener("focus",refresh);return()=>{window.removeEventListener("pageshow",refresh);window.removeEventListener("focus",refresh)}},[moduleId]);
 const count=sections.filter(item=>visited.includes(item.slug)).length;
 const copy={RU:{title:"17 разделов — карта изучения",note:"Процент показывает открытие разделов, а не оценку знаний или подтверждённое выполнение заданий.",opened:"Открыт",new:"Не начат",progress:"Просмотрено разделов",score:"Результаты тестов отображаются отдельно."},EN:{title:"17 sections — learning map",note:"Percentage tracks section visits, not test scores or verified task completion.",opened:"Visited",new:"Not started",progress:"Sections visited",score:"Test performance is reported separately."},KZ:{title:"17 бөлім — оқу картасы",note:"Пайыз бөлімнің ашылғанын көрсетеді, тест бағасын не тапсырманың толық орындалуын емес.",opened:"Ашылды",new:"Басталмаған",progress:"Қаралған бөлімдер",score:"Тест нәтижелері бөлек көрсетіледі."}}[language];
 return <section className={styles.wrap} aria-label={copy.title}>
  <h2>{copy.title}</h2><p className={styles.note}>{copy.note}</p>
  <div className={styles.overall}><strong>{copy.progress}: {count}/17</strong><span>{Math.round(count/17*100)}%</span></div>
  <div className={styles.grid}>{sections.map((item,index)=>{const opened=visited.includes(item.slug);return <Link key={item.slug} href={`/modules/${moduleId}/${item.slug}?lang=${language}`} className={opened?styles.opened:styles.new} aria-label={`${index+1}. ${item.title[language]}. ${opened?copy.opened:copy.new}`}>
   <span className={styles.number}>{String(index+1).padStart(2,"0")}</span><span className={styles.percent}>{opened?"100%":"0%"}</span><span className={styles.name}>{item.title[language]}</span><span className={styles.status}>{opened?copy.opened:copy.new}</span>
  </Link>})}</div><p className={styles.note}>{copy.score}</p>
 </section>;
}
