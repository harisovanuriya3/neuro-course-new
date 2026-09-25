"use client";

import { useState } from "react";
import Link from "next/link";

type Lang = "RU" | "KZ" | "EN";

const modules: Record<Lang, string[]> = {
  RU: [
    "Введение",
    "История",
    "Клеточная физиология",
    "Мембранные процессы",
    "Ионные каналы",
    "Синапсы",
    "Возбуждение",
    "Рефлексы",
    "Пути",
    "Спинной мозг",
    "Ретикулярная формация",
    "Ствол мозга",
    "Мозжечок",
    "Таламус",
    "Гипоталамус",
    "Лимбическая система",
    "Миндалина",
    "Кора",
    "Сенсорные системы",
    "Вегетативная система",
    "Высшая деятельность",
    "Нейрогуморальная регуляция",
    "Патофизиология",
  ],

  KZ: [
    "Кіріспе",
    "Тарих",
    "Жасушалық физиология",
    "Мембраналық процестер",
    "Иондық арналар",
    "Синапстар",
    "Қозу",
    "Рефлекстер",
    "Жолдар",
    "Жұлын",
    "Ретикулярлық формация",
    "Ми сабауы",
    "Мишық",
    "Таламус",
    "Гипоталамус",
    "Лимбиялық жүйе",
    "Бадамша дене",
    "Ми қыртысы",
    "Сенсорлық жүйелер",
    "Вегетативтік жүйе",
    "Жоғары жүйке қызметі",
    "Нейрогуморальдық реттелу",
    "Патофизиология",
  ],

  EN: [
    "Introduction",
    "History",
    "Cell Physiology",
    "Membrane Processes",
    "Ion Channels",
    "Synapses",
    "Excitation",
    "Reflexes",
    "Pathways",
    "Spinal Cord",
    "Reticular Formation",
    "Brainstem",
    "Cerebellum",
    "Thalamus",
    "Hypothalamus",
    "Limbic System",
    "Amygdala",
    "Cerebral Cortex",
    "Sensory Systems",
    "Autonomic Nervous System",
    "Higher Nervous Activity",
    "Neurohumoral Regulation",
    "Pathophysiology",
  ],
};

const text = {
  RU: {
    university: "Карагандинский медицинский университет",
    department: "Кафедра нормальной физиологии",
    textbook: "УЧЕБНИК",
    title: "Физиология центральной нервной системы",
    subtitle: "Учебное пособие для студентов медицинских факультетов",
    author: "Автор: Харисова Нурия Мансуровна, к.б.н., профессор",
    approved: "Допущено кафедрой нормальной физиологии",
    city: "Караганда — 2026",

    enter: "Перейти к курсу",

    contents: "Содержание курса",
    contentsText: "Выберите учебный модуль",

    module: "Модуль",
    open: "Открыть модуль",

    patient: "Виртуальный пациент",
    patientText:
      "Интерактивная клиническая среда для применения знаний по нейрофизиологии.",
    patientButton: "Открыть виртуального пациента",
  },

  KZ: {
    university: "Қарағанды медицина университеті",
    department: "Қалыпты физиология кафедрасы",
    textbook: "ОҚУЛЫҚ",
    title: "Орталық жүйке жүйесінің физиологиясы",
    subtitle:
      "Медицина факультетінің студенттеріне арналған оқу құралы",
    author:
      "Автор: Харисова Нурия Мансуровна, б.ғ.к., профессор",
    approved:
      "Қалыпты физиология кафедрасымен мақұлданған",
    city: "Қарағанды — 2026",

    enter: "Курсқа өту",

    contents: "Курс мазмұны",
    contentsText: "Оқу модулін таңдаңыз",

    module: "Модуль",
    open: "Модульді ашу",

    patient: "Виртуалды пациент",
    patientText:
      "Нейрофизиология бойынша білімді қолдануға арналған интерактивті клиникалық орта.",
    patientButton: "Виртуалды пациентті ашу",
  },

  EN: {
    university: "Karaganda Medical University",
    department: "Department of Normal Physiology",
    textbook: "TEXTBOOK",
    title: "Physiology of the Central Nervous System",
    subtitle: "Study guide for medical students",
    author:
      "Author: Nuria Mansurovna Kharissova, PhD, Professor",
    approved:
      "Approved by the Department of Normal Physiology",
    city: "Karaganda — 2026",

    enter: "Enter Course",

    contents: "Course Contents",
    contentsText: "Select a learning module",

    module: "Module",
    open: "Open module",

    patient: "Virtual Patient",
    patientText:
      "An interactive clinical environment for applying knowledge of neurophysiology.",
    patientButton: "Open Virtual Patient",
  },
};

export default function Home() {
  const [lang, setLang] = useState<Lang>("RU");

  const t = text[lang];

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundImage:
          "linear-gradient(rgba(0,20,55,0.25), rgba(0,20,55,0.5)), url('/neuron-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
        padding: "25px 20px 70px",
      }}
    >
      {/* ПЕРЕКЛЮЧАТЕЛЬ ЯЗЫКА */}

      <div
        style={{
          maxWidth: "950px",
          margin: "0 auto 18px",
          display: "flex",
          justifyContent: "flex-end",
          gap: "8px",
        }}
      >
        {(["RU", "KZ", "EN"] as Lang[]).map((code) => (
          <button
            key={code}
            onClick={() => setLang(code)}
            style={{
              padding: "9px 17px",
              borderRadius: "22px",
              border: "1px solid white",
              cursor: "pointer",
              background:
                lang === code
                  ? "#00599c"
                  : "rgba(255,255,255,0.92)",
              color:
                lang === code
                  ? "white"
                  : "#003b6f",
              fontWeight: "bold",
            }}
          >
            {code}
          </button>
        ))}
      </div>

      {/* ТИТУЛЬНЫЙ ЛИСТ */}

      <section
        style={{
          maxWidth: "900px",
          minHeight: "620px",
          margin: "0 auto",
          padding: "55px 50px",
          background: "rgba(255,255,255,0.94)",
          borderRadius: "18px",
          boxShadow: "0 12px 40px rgba(0,0,0,0.25)",
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <h3
            style={{
              color: "#003b6f",
              margin: "0 0 8px",
              fontSize: "20px",
            }}
          >
            {t.university}
          </h3>

          <p
            style={{
              margin: 0,
              color: "#647789",
              fontSize: "16px",
            }}
          >
            {t.department}
          </p>
        </div>

        <div style={{ margin: "50px 0" }}>
          <div
            style={{
              fontSize: "15px",
              letterSpacing: "5px",
              color: "#70879b",
              fontWeight: "bold",
              marginBottom: "22px",
            }}
          >
            {t.textbook}
          </div>

          <h1
            style={{
              margin: 0,
              color: "#003b6f",
              fontSize: "40px",
              lineHeight: 1.25,
            }}
          >
            {t.title}
          </h1>

          <p
            style={{
              marginTop: "22px",
              fontSize: "18px",
              color: "#445566",
            }}
          >
            {t.subtitle}
          </p>
        </div>

        <div>
          <p
            style={{
              fontSize: "17px",
              color: "#222",
            }}
          >
            {t.author}
          </p>

          <p
            style={{
              marginTop: "30px",
              color: "#56697a",
            }}
          >
            {t.approved}
          </p>

          <p
            style={{
              color: "#23384a",
              fontWeight: "bold",
            }}
          >
            {t.city}
          </p>

          {/* ГЛАВНАЯ КНОПКА */}

          <a
            href="#course"
            style={{ textDecoration: "none" }}
          >
            <button
              style={{
                marginTop: "24px",
                padding: "15px 36px",
                background: "#00599c",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "17px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {t.enter} ↓
            </button>
          </a>
        </div>
      </section>

      {/* СОДЕРЖАНИЕ КУРСА */}

      <section
        id="course"
        style={{
          maxWidth: "1150px",
          margin: "55px auto 0",
          padding: "40px",
          background: "rgba(255,255,255,0.95)",
          borderRadius: "18px",
          boxShadow: "0 12px 40px rgba(0,0,0,0.22)",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#003b6f",
            fontSize: "32px",
            margin: "0 0 8px",
          }}
        >
          {t.contents}
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#667788",
            fontSize: "17px",
            marginBottom: "32px",
          }}
        >
          {t.contentsText}
        </p>

        {/* 23 КЛИКАБЕЛЬНЫХ МОДУЛЯ */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(260px, 1fr))",
            gap: "16px",
          }}
        >
          {modules[lang].map((moduleTitle, index) => {
            const id = index + 1;

            return (
              <Link
                key={id}
                href={`/modules/${id}?lang=${lang}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    minHeight: "125px",
                    padding: "20px",
                    background: "white",
                    border: "1px solid #d4e0ea",
                    borderRadius: "13px",
                    boxShadow:
                      "0 4px 13px rgba(0,0,0,0.07)",
                    cursor: "pointer",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      color: "#8295a6",
                      fontSize: "12px",
                      fontWeight: "bold",
                      letterSpacing: "2px",
                    }}
                  >
                    {t.module.toUpperCase()} {id}
                  </div>

                  <h3
                    style={{
                      margin: "8px 0",
                      color: "#003b6f",
                      fontSize: "18px",
                    }}
                  >
                    {id}. {moduleTitle}
                  </h3>

                  <span
                    style={{
                      color: "#0068a8",
                      fontWeight: "bold",
                      fontSize: "14px",
                    }}
                  >
                    {t.open} →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        {/* ВИРТУАЛЬНЫЙ ПАЦИЕНТ */}

        <div
          style={{
            marginTop: "40px",
            padding: "30px",
            borderRadius: "16px",
            background:
              "linear-gradient(135deg, #003b6f, #0069a8)",
            color: "white",
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: "42px",
              marginBottom: "8px",
            }}
          >
            🩺
          </div>

          <h2
            style={{
              margin: "5px 0 10px",
              fontSize: "27px",
            }}
          >
            {t.patient}
          </h2>

          <p
            style={{
              maxWidth: "650px",
              margin: "0 auto 22px",
              lineHeight: 1.6,
              opacity: 0.95,
            }}
          >
            {t.patientText}
          </p>

          <Link
            href={`/virtual-patient?lang=${lang}`}
            style={{
              display: "inline-block",
              background: "white",
              color: "#004b87",
              textDecoration: "none",
              padding: "13px 25px",
              borderRadius: "9px",
              fontWeight: "bold",
            }}
          >
            {t.patientButton} →
          </Link>
        </div>
      </section>
    </main>
  );
}