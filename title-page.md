"use client";

import { useState } from "react";

export default function Home() {
  const [lang, setLang] = useState<"RU" | "EN" | "KZ">("RU");

  const titles = {
    RU: {
      heading: "Учебник по нейрофизиологии",
      content: `
МИНИСТЕРСТВО ОБРАЗОВАНИЯ И НАУКИ РЕСПУБЛИКИ КАЗАХСТАН
Карагандинский государственный медицинский университет
Кафедра нормальной физиологии

Учебник
«Физиология центральной нервной системы»
Учебное пособие для студентов медицинских факультетов

Автор: Харисова Нурия Мансуровна, к.б.н., профессор

Допущено кафедрой физиологии
Караганда – 2026
      `,
    },
    EN: {
      heading: "Neurophysiology Textbook",
      content: `
MINISTRY OF EDUCATION AND SCIENCE OF THE REPUBLIC OF KAZAKHSTAN
Karaganda State Medical University
Department of Normal Physiology

Textbook
“Physiology of the Central Nervous System”
Study guide for medical students

Author: Nuria Mansurovna Kharissova, PhD, Professor

Approved by the Department of Physiology
Karaganda – 2026
      `,
    },
    KZ: {
      heading: "Нейрофизиология оқулығы",
      content: `
ҚАЗАҚСТАН РЕСПУБЛИКАСЫНЫҢ БІЛІМ ЖӘНЕ ҒЫЛЫМ МИНИСТРЛІГІ
Қарағанды мемлекеттік медицина университеті
Қалыпты физиология кафедрасы

Оқулық
«Орталық жүйке жүйесінің физиологиясы»
Медициналық факультет студенттеріне арналған оқу құралы

Автор: Харисова Нурия Мансуровна, б.ғ.к., профессор

Физиология кафедрасымен мақұлданған
Қарағанды – 2026
      `,
    },
  };

  return (
    <main
      style={{
        backgroundImage: "url('/neuron-bg.jpg')", // ⚠️ картинка должна лежать в public
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        padding: "2rem",
        color: "white",
        textShadow: "0 0 5px black",
      }}
    >
      {/* Шапка */}
      <header style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
        <h1>{titles[lang].heading}</h1>
        <div>
          <button onClick={() => setLang("RU")}>RU</button>
          <button onClick={() => setLang("EN")}>EN</button>
          <button onClick={() => setLang("KZ")}>KZ</button>
        </div>
      </header>

      {/* Титульный лист */}
      <section
        style={{
          background: "rgba(255,255,255,0.85)",
          padding: "1rem",
          borderRadius: "8px",
          color: "black",
          whiteSpace: "pre-line",
        }}
      >
        <h2>Титульный лист</h2>
        <p>{titles[lang].content}</p>
      </section>
    </main>
  );
}
