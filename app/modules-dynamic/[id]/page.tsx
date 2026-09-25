"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";

export default function ModulePage() {
  const params = useParams();
  const id = parseInt(params.id as string, 10);
  const [lang, setLang] = useState<"RU"|"EN"|"KZ">("RU");

  // Названия модулей
  const titles = {
    RU: ["Введение","История","Клеточная физиология","Мембранные процессы","Ионные каналы","Синапсы","Возбуждение","Рефлексы","Пути","Спинной мозг","Ретикулярная формация","Ствол мозга","Мозжечок","Таламус","Гипоталамус","Лимбическая система","Миндалина","Кора","Сенсорные системы","Вегетативная система","Высшая деятельность","Нейрогуморальная регуляция","Патофизиология"],
    EN: ["Introduction","History","Cell Physiology","Membrane Processes","Ion Channels","Synapses","Excitation","Reflexes","Pathways","Spinal Cord","Reticular Formation","Brainstem","Cerebellum","Thalamus","Hypothalamus","Limbic System","Amygdala","Cortex","Sensory Systems","Autonomic System","Higher Activity","Neurohumoral Regulation","Pathophysiology"],
    KZ: ["Кіріспе","Тарих","Жасушалық физиология","Мембраналық процестер","Иондық арналар","Синапстар","Қозу","Рефлекстер","Жолдар","Жұлын","Ретикулярлық формация","Ми сабауы","Кішкене ми","Таламус","Гипоталамус","Лимбикалық жүйе","Миндалина","Қыртыс","Сенсорлық жүйелер","Вегетативтік жүйе","Жоғары қызмет","Нейрогуморальдық реттеу","Патофизиология"],
  };

  // Меню внутри модуля
  const menu = {
    RU: ["Теория","Практика","Ситуационные задачи","Тесты","Экзамен","Виртуальный пациент"],
    EN: ["Theory","Practice","Case Studies","Tests","Exam","Virtual Patient"],
    KZ: ["Теория","Практика","Ситуациялық тапсырмалар","Тесттер","Емтихан","Виртуалды пациент"],
  };

  const title = titles[lang][id-1] || "Неизвестный раздел";

  return (
    <main style={{
      backgroundImage:"url('/neuron-bg.jpg')", // фон нейронов
      backgroundSize:"cover",
      backgroundPosition:"center",
      minHeight:"100vh",
      padding:"2rem"
    }}>
      {/* Переключатель языков */}
      <div style={{marginBottom:"1rem"}}>
        {["RU","EN","KZ"].map(code=>(
          <button key={code} onClick={()=>setLang(code as "RU"|"EN"|"KZ")}
            style={{margin:"0 0.5rem",padding:"0.5rem 1rem"}}>
            {code}
          </button>
        ))}
      </div>

      {/* Заголовок модуля */}
      <h1 style={{color:"#004080",background:"rgba(255,255,255,0.85)",padding:"1rem",borderRadius:"8px"}}>
        {id}. {title}
      </h1>

      {/* Меню внутри модуля */}
      <nav style={{marginTop:"1rem",display:"flex",gap:"1rem",flexWrap:"wrap"}}>
        {menu[lang].map((item,i)=>(
          <button key={i} style={{
            padding:"0.5rem 1rem",
            borderRadius:"6px",
            border:"1px solid #004080",
            background:"rgba(255,255,255,0.9)"
          }}>
            {item}
          </button>
        ))}
      </nav>

      {/* Блоки содержимого */}
      {menu[lang].map((item,i)=>(
        <section key={i} style={{marginTop:"1rem",background:"rgba(255,255,255,0.9)",padding:"1rem",borderRadius:"8px"}}>
          <h2>{item}</h2>
          <p>Материалы блока «{item}» для раздела «{title}».</p>
        </section>
      ))}

      {/* Подпись кафедры */}
      <p style={{marginTop:"2rem",fontStyle:"italic",background:"rgba(255,255,255,0.7)",padding:"0.5rem",borderRadius:"6px"}}>
        Кафедра нормальной физиологии
      </p>

      {/* Полная навигация по всем модулям */}
      <div style={{marginTop:"2rem",background:"rgba(255,255,255,0.85)",padding:"1rem",borderRadius:"8px"}}>
        <h3>Все модули</h3>
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(200px,1fr))",gap:"0.5rem"}}>
          {titles[lang].map((modTitle,i)=>(
            <Link key={i} href={`/modules/${i+1}`}>
              <button style={{
                width:"100%",
                padding:"0.5rem",
                borderRadius:"6px",
                border:"1px solid #004080",
                background: i+1===id ? "#004080" : "rgba(255,255,255,0.9)",
                color: i+1===id ? "white" : "black"
              }}>
                {i+1}. {modTitle}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
