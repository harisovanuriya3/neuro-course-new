"use client";
import { useEffect, useRef, useState } from "react";

export default function StudyTimer() {
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState("timer");
  const [minutes, setMinutes] = useState(15);
  const [seconds, setSeconds] = useState(900);
  const [running, setRunning] = useState(false);
  const [clock, setClock] = useState("");
  const endRef = useRef(null);
  const startRef = useRef(null);
  const elapsedRef = useRef(0);
  const alertedRef = useRef(false);
  useEffect(() => {
    const tick = () => {
      setClock(new Date().toLocaleTimeString());
      if (!running) return;
      if (mode === "timer") {
        const remaining = Math.max(0, Math.ceil((endRef.current - Date.now()) / 1000));
        setSeconds(remaining);
        if (remaining === 0) {
          setRunning(false);
          if (!alertedRef.current) {
            alertedRef.current = true;
            try {
              const AudioContextClass = window.AudioContext || window.webkitAudioContext;
              if (AudioContextClass) {
                const ctx = new AudioContextClass();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.connect(gain); gain.connect(ctx.destination);
                osc.frequency.value = 880; gain.gain.value = 0.08;
                osc.start(); osc.stop(ctx.currentTime + 0.25);
                osc.onended = () => ctx.close();
              }
            } catch (_) {}
          }
        }
      } else if (mode === "stopwatch") {
        setSeconds(Math.floor((Date.now() - startRef.current + elapsedRef.current) / 1000));
      }
    };
    tick();
    const id = window.setInterval(tick, 250);
    return () => window.clearInterval(id);
  }, [running, mode]);
  function pause() {
    if (mode === "stopwatch" && running) elapsedRef.current += Date.now() - startRef.current;
    setRunning(false);
  }
  function reset(nextMode = mode) {
    setRunning(false); setMode(nextMode); elapsedRef.current = 0;
    alertedRef.current = false;
    setSeconds(nextMode === "timer" ? minutes * 60 : 0);
  }
  function start() {
    if (mode === "clock") return;
    if (mode === "timer") {
      const value = seconds || minutes * 60;
      setSeconds(value); endRef.current = Date.now() + value * 1000;
    } else startRef.current = Date.now();
    alertedRef.current = false; setRunning(true);
  }
  const button = { padding: "7px 10px", borderRadius: 8, border: "1px solid #94a3b8", background: "#fff", color: "#172554", cursor: "pointer" };
  const display = mode === "clock" ? clock : String(Math.floor(seconds / 60)).padStart(2, "0") + ":" + String(seconds % 60).padStart(2, "0");
  return <div style={{position:"fixed",right:12,bottom:12,zIndex:1000,fontFamily:"system-ui,sans-serif",color:"#172554"}}>
    {open && <section role="region" aria-label="Учебный таймер" style={{background:"#fff",border:"1px solid #94a3b8",borderRadius:12,padding:14,boxShadow:"0 4px 20px #0003",width:"min(300px, calc(100vw - 24px))",marginBottom:8}}>
      <div style={{display:"flex",gap:5,flexWrap:"wrap"}}>
        {[["timer","Таймер"],["stopwatch","Секундомер"],["clock","Часы"]].map(([id,label])=><button key={id} type="button" aria-pressed={mode===id} style={{...button,background:mode===id?"#dbeafe":"#fff"}} onClick={()=>reset(id)}>{label}</button>)}
      </div>
      <div role="timer" aria-live={seconds===0 && mode==="timer"?"polite":"off"} style={{fontSize:32,fontVariantNumeric:"tabular-nums",textAlign:"center",padding:12}}>{display}</div>
      {mode==="timer" && <label style={{display:"block",marginBottom:10}}>Минуты: <input aria-label="Продолжительность в минутах" type="number" min="1" max="240" value={minutes} disabled={running} onChange={e=>{const n=Math.max(1,Math.min(240,Number(e.target.value)||1));setMinutes(n);setSeconds(n*60);}} style={{width:70,padding:5}} /></label>}
      {mode!=="clock" && <div style={{display:"flex",gap:8}}><button type="button" style={button} onClick={running?pause:start}>{running?"Пауза":"Старт"}</button><button type="button" style={button} onClick={()=>reset()}>Сброс</button></div>}
    </section>}
    <button type="button" aria-label={open?"Закрыть учебный таймер":"Открыть учебный таймер"} aria-expanded={open} onClick={()=>setOpen(!open)} style={{...button,background:"#1e40af",color:"#fff",boxShadow:"0 3px 12px #0003"}}>{open?"✕ Закрыть":"⏱ Таймер"}</button>
  </div>;
}
