"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };
type Stroke = { points: Point[]; color: string; width: number };
const KEY = "neuro-course-drawing-v1";
const W = 1000;
const H = 620;

export default function DrawingBoard() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const active = useRef<Stroke | null>(null);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [color, setColor] = useState("#175d86");
  const [width, setWidth] = useState(4);
  const [ready, setReady] = useState(false);
  const [message, setMessage] = useState("");
  const [lang, setLang] = useState<"RU" | "EN" | "KZ">("RU");
  const [moduleId, setModuleId] = useState<number | null>(null);
  const [storageKey, setStorageKey] = useState(KEY);
  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("lang");
    if (requested === "EN" || requested === "KZ") setLang(requested);
    const rawModule = Number(new URLSearchParams(window.location.search).get("module"));
    const id = Number.isInteger(rawModule) && rawModule >= 1 && rawModule <= 25 ? rawModule : null;
    setModuleId(id);
    const key = id ? `${KEY}-module-${id}` : KEY;
    setStorageKey(key);
    try {
      const saved = JSON.parse(localStorage.getItem(key) || "[]");
      if (Array.isArray(saved)) setStrokes(saved.filter((s: Stroke) => Array.isArray(s.points) && typeof s.color === "string" && typeof s.width === "number"));
    } catch { setMessage("Saved drawing could not be restored."); }
    setReady(true);
  }, []);
  useEffect(() => {
    const ctx = canvas.current?.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, W, H);
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, W, H);
    for (const stroke of strokes) {
      if (!stroke.points.length) continue;
      ctx.strokeStyle = stroke.color;
      ctx.fillStyle = stroke.color;
      ctx.lineWidth = stroke.width;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.beginPath();
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (const p of stroke.points.slice(1)) ctx.lineTo(p.x, p.y);
      if (stroke.points.length === 1) {
        ctx.beginPath();
        ctx.arc(stroke.points[0].x, stroke.points[0].y, stroke.width / 2, 0, 2 * Math.PI);
        ctx.fill();
      } else ctx.stroke();
    }
  }, [strokes]);
  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(storageKey, JSON.stringify(strokes)); }
    catch { setMessage("Storage unavailable. Export the drawing to keep it."); }
  }, [strokes, ready, storageKey]);
  const point = (event: React.PointerEvent<HTMLCanvasElement>): Point => {
    const rect = event.currentTarget.getBoundingClientRect();
    return { x: (event.clientX - rect.left) * W / rect.width, y: (event.clientY - rect.top) * H / rect.height };
  };
  const begin = (event: React.PointerEvent<HTMLCanvasElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    active.current = { points: [point(event)], color, width };
  };
  const move = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!active.current) return;
    active.current.points.push(point(event));
    const ctx = canvas.current?.getContext("2d");
    const pts = active.current.points;
    if (!ctx || pts.length < 2) return;
    ctx.strokeStyle = active.current.color; ctx.lineWidth = active.current.width;
    ctx.lineCap = "round"; ctx.lineJoin = "round";
    ctx.beginPath(); ctx.moveTo(pts[pts.length - 2].x, pts[pts.length - 2].y);
    ctx.lineTo(pts[pts.length - 1].x, pts[pts.length - 1].y); ctx.stroke();
  };
  const end = () => {
    if (active.current) setStrokes(old => [...old, active.current!]);
    active.current = null;
  };
  const exportPng = () => {
    const url = canvas.current?.toDataURL("image/png");
    if (!url) return;
    const a = document.createElement("a");
    a.href = url; a.download = "neurophysiology-drawing.png"; a.click();
  };
  const labels = {
    RU: ["Поле для рисования схем", "Рисуйте мышью, пальцем или стилусом. Сохранение выполняется в этом браузере.", "Толщина", "Отменить", "Очистить", "Сохранить PNG", "К учебнику"],
    EN: ["Diagram drawing board", "Draw with mouse, finger or stylus. Saved in this browser only.", "Width", "Undo", "Clear", "Save PNG", "Back to textbook"],
    KZ: ["Сызба салу алаңы", "Тінтуірмен, саусақпен немесе қаламмен сурет салыңыз. Тек осы браузерде сақталады.", "Қалыңдық", "Болдырмау", "Тазарту", "PNG сақтау", "Оқулыққа оралу"],
  }[lang];
  return <main style={{maxWidth:1160,margin:"0 auto",padding:"24px 16px",fontFamily:"system-ui",color:"#173e55"}}>
    <h1>{labels[0]}{moduleId ? ` — ${lang === "RU" ? "Модуль" : lang === "EN" ? "Module" : "Модуль"} ${moduleId}` : ""}</h1><p>{labels[1]}</p>
    <div style={{display:"flex",gap:12,flexWrap:"wrap",alignItems:"center",marginBottom:14}}>
      <label>🎨 <input aria-label="Color" type="color" value={color} onChange={e=>setColor(e.target.value)}/></label>
      <label>{labels[2]} <input type="range" min="1" max="20" value={width} onChange={e=>setWidth(Number(e.target.value))}/></label>
      <button type="button" disabled={!strokes.length} onClick={()=>setStrokes(old=>old.slice(0,-1))}>{labels[3]}</button>
      <button type="button" disabled={!strokes.length} onClick={()=>{if(window.confirm(labels[4]+"?"))setStrokes([]);}}>{labels[4]}</button>
      <button type="button" onClick={exportPng}>{labels[5]}</button>
      <Link href={moduleId ? `/modules/${moduleId}?lang=${lang}` : `/?lang=${lang}`}>{labels[6]}</Link>
    </div>
    <canvas ref={canvas} width={W} height={H} aria-label={labels[0]} onPointerDown={begin} onPointerMove={move} onPointerUp={end} onPointerCancel={end} style={{display:"block",width:"100%",height:"auto",aspectRatio:"1000 / 620",border:"2px solid #9cb9cf",borderRadius:12,touchAction:"none",background:"white",cursor:"crosshair"}}/>
    {message&&<p role="status">{message}</p>}
  </main>;
}
