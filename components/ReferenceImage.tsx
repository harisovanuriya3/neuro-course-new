"use client";
import {useState} from "react";
import type {Language} from "../content/course";

export default function ReferenceImage({src,alt,page,language}:{src:string;alt:string;page:string;language:Language}){
 const [failed,setFailed]=useState(false);
 const [attempt,setAttempt]=useState(0);
 const message={RU:"Изображение не загрузилось. Откройте источник или повторите загрузку.",EN:"The image could not load. Open the source or retry.",KZ:"Кескін жүктелмеді. Дереккөзді ашыңыз немесе қайта жүктеңіз."}[language];
 const source={RU:"Открыть изображение в источнике",EN:"Open image source",KZ:"Кескін дереккөзін ашу"}[language];
 const retry={RU:"Повторить загрузку",EN:"Retry loading",KZ:"Қайта жүктеу"}[language];
 const enlarge={RU:"Открыть изображение крупно",EN:"View larger image",KZ:"Суретті үлкейтіп ашу"}[language];
 function retryLoad(){setAttempt(value=>value+1);setFailed(false);}
 if(failed) return <div role="status" style={{padding:16,background:"#fff8e6",color:"#513b0b",border:"1px solid #b89135",borderRadius:10}}>
  <p>{alt}</p><p>{message}</p>
  <a href={page} target="_blank" rel="noopener noreferrer">{source}</a>{" · "}
  <button type="button" onClick={retryLoad}>{retry}</button>
 </div>;
 return <div style={{display:"grid",gap:8}}>
  <a href={src} target="_blank" rel="noopener noreferrer" aria-label={enlarge} title={enlarge} style={{display:"block"}}>
   <img key={attempt} src={src} alt={alt} loading="lazy" decoding="async" onError={()=>setFailed(true)} style={{display:"block",width:"100%",maxHeight:420,objectFit:"contain",background:"#fff",borderRadius:8}}/>
  </a>
  <a href={page} target="_blank" rel="noopener noreferrer" style={{fontSize:".85rem",overflowWrap:"anywhere"}}>{source}</a>
 </div>;
}
