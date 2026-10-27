"use client";

import { useEffect, useState } from "react";
import type { Language } from "../content/course";

type Clip = { file: string; title: Record<Language, string> };
const tr = (RU:string, EN:string, KZ:string):Record<Language,string>=>({RU,EN,KZ});
const clips: Record<number,Clip[]> = {
  1: [{file:"clip-03.mp4",title:tr("Введение: клиническая демонстрация","Introduction: clinical demonstration","Кіріспе: клиникалық көрсетілім")},{file:"clip-07.mp4",title:tr("Анатомический разбор","Anatomical discussion","Анатомиялық талдау")},{file:"clip-20.mp4",title:tr("Учебный монтаж","Teaching montage","Оқу бейнемонтажы")}],
  2: [{file:"clip-01.mp4",title:tr("Наблюдение и границы клинического вывода","Observation and limits of clinical inference","Клиникалық қорытындының шегі")},{file:"clip-05.mp4",title:tr("Демонстрация для обсуждения","Demonstration for discussion","Талқылауға арналған көрсетілім")}],
  3: [{file:"clip-09.mp4",title:tr("Строение нейрона: учебная модель","Neuron anatomy: teaching model","Нейрон құрылысы: оқу моделі")},{file:"clip-15.mp4",title:tr("Стилизованная анимация нейрона","Stylized neuron animation","Нейронның стильдендірілген анимациясы")}],
  5: [{file:"clip-11.mp4",title:tr("Химический синапс — модель","Chemical synapse: illustrative model","Химиялық синапс: шартты модель")},{file:"clip-12.mp4",title:tr("Высвобождение медиатора — условная анимация","Transmitter release: conceptual animation","Медиатор бөлінуі: шартты анимация")},{file:"clip-13.mp4",title:tr("Синаптическая передача — вариант","Synaptic transmission: variation","Синапстық берілу: нұсқа")}],
  6: [{file:"clip-10.mp4",title:tr("Нейрон как модель интеграции","Neuron as an integration model","Нейрон — интеграция моделі")}],
  7: [{file:"clip-04.mp4",title:tr("Демонстрация учебной практики","Teaching practice demonstration","Оқу практикасының көрсетілімі")}],
  9: [{file:"clip-08.mp4",title:tr("Практическая демонстрация","Practical demonstration","Практикалық көрсетілім")}],
};
const labels = {
 RU:{heading:"Видеоматериалы преподавателя",note:"ИИ-визуализация: условная иллюстрация, не видеозапись реального эксперимента. Проверяйте механизм по теории.",play:"Воспроизвести видео"},
 EN:{heading:"Instructor video materials",note:"AI-generated conceptual illustration, not a recording of a real experiment. Confirm mechanisms against the theory.",play:"Play video"},
 KZ:{heading:"Оқытушының бейнематериалдары",note:"ЖИ жасаған шартты бейне; нақты тәжірибенің жазбасы емес. Тетікті теориямен салыстырыңыз.",play:"Бейнені ойнату"},
};
export default function TeacherVideoGallery({moduleId,language}:{moduleId:number;language:Language}) {
 const [available,setAvailable]=useState<string[]>([]);
 const relevant=clips[moduleId]??[];
 useEffect(()=>{
  let active=true;
  Promise.all(relevant.map(async clip=>{
   const url="/media/teacher/"+clip.file;
   try { const response=await fetch(url,{method:"HEAD",cache:"no-store"});return response.ok?clip.file:null; } catch {return null;}
  })).then(values=>{if(active)setAvailable(values.filter((x):x is string=>Boolean(x)));});
  return ()=>{active=false;};
 },[moduleId]);
 const visible=relevant.filter(x=>available.includes(x.file));
 if(!visible.length)return null;
 return <section aria-label={labels[language].heading} style={{marginBlock:"1.5rem"}}>
   <h2>{labels[language].heading}</h2><p>{labels[language].note}</p>
   {visible.map(c=><figure key={c.file} style={{margin:"1rem 0"}}>
    <video controls playsInline preload="metadata" aria-label={c.title[language]} style={{width:"100%",maxWidth:720,borderRadius:12}} src={"/media/teacher/"+c.file}>{labels[language].play}</video>
    <figcaption>{c.title[language]}</figcaption>
   </figure>)}
  </section>;
}
