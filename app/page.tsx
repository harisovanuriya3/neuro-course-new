"use client";

import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [lang, setLang] = useState<"RU" | "EN" | "KZ">("RU");

  const content = {
    RU: [
      "Введение", "История", "Клеточная физиология", "Мембранные процессы",
      "Ионные каналы", "Синапсы", "Возбуждение", "Рефлексы", "Пути",
      "Спинной мозг", "Ретикулярная формация", "Ствол мозга", "Мозжечок",
      "Таламус", "Гипоталамус", "Лимбическая система", "Миндалина",
      "Кора", "Сенсорные системы", "Вегетативная система", "Высшая деятельность",
      "Нейрогуморальная регуляция", "Патофизиология"
    ],
    EN: [
      "Introduction", "History", "Cell Physiology", "Membrane Processes",
      "Ion Channels", "Synapses", "Excitation", "Reflexes", "Pathways",
      "Spinal Cord", "Reticular Formation", "Brainstem", "Cerebellum",
      "Thalamus", "Hypothalamus", "Limbic System", "Amygdala",
      "Cortex", "Sensory Systems", "Autonomic System", "Higher Activity",
      "Neurohumoral Regulation", "Pathophysiology"
    ],
    KZ: [
      "Кіріспе", "Тарих", "Жасушалық физиология", "Мембраналық процестер",
      "Иондық арналар", "Синапстар", "Қозу", "Рефлекстер", "Жолдар",
      "Жұлын", "Ретикулярлық формация", "Ми сабауы", "Кішкене ми",
      "Таламус", "Гипоталамус", "Лимбикалық жүйе", "Миндалина",
      "Қыртыс", "Сенсорлық жүйелер", "Вегетативтік жүйе", "Жоғары қызмет",
      "Нейрогуморальдық реттеу", "Патофизиология"
    ],
  };

  return (
    <main
      style={{
        backgroundImage: "url('/neuron-bg.jpg')", // ⚠️ именно так, файл должен лежать в public
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "2rem",
      }}
    >
      {/* Шапка */}
      <header style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem", color: "white", textShadow: "0 0 5px black" }}>
        <h1>Учебник по нейрофизиологии</h1>
        <div>
          <button onClick={() => setLang("RU")}>RU</button>
          <button onClick={() => setLang("EN")}>EN</button>
          <button onClick={() => setLang("KZ")}>KZ</button>
        </div>
      </header>

      {/* Основные разделы */}
      <section style={{ marginBottom: "2rem", background: "rgba(255,255,255,0.85)", padding: "1rem", borderRadius: "8px" }}>
        <h2>Основные разделы</h2>
        <ul>
          <li><Link href="/theory">Теория</Link></li>
          <li><Link href="/practice">Практика</Link></li>
          <li><Link href="/cases">Ситуационные задачи</Link></li>
          <li><Link href="/tests">Тесты</Link></li>
          <li><Link href="/exam">Экзамен</Link></li>
          <li><Link href="/virtual-patient">Виртуальный пациент</Link></li>
        </ul>
      </section>

      {/* Содержание курса */}
      <section>
        <h2 style={{ color: "white", textShadow: "0 0 5px black" }}>Содержание курса</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem" }}>
          {content[lang].map((title, i) => (
            <div
              key={i}
              style={{
                background: "rgba(255,255,255,0.85)",
                padding: "1rem",
                borderRadius: "8px",
                textAlign: "center",
              }}
            >
              <h3>{i + 1}. {title}</h3>
              <Link href={`/modules/module-${i + 1}`}>
                <button>Перейти</button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
