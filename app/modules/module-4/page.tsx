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
    ministry:
      "МИНИСТЕРСТВО НАУКИ И ВЫСШЕГО ОБРАЗОВАНИЯ РЕСПУБЛИКИ КАЗАХСТАН",
    university: "Карагандинский медицинский университет",
    department: "Кафедра нормальной физиологии",

    textbook: "УЧЕБНИК",

    title:
      "ФИЗИОЛОГИЯ ЦЕНТРАЛЬНОЙ НЕРВНОЙ СИСТЕМЫ",

    subtitle:
      "Учебное пособие для студентов медицинских факультетов",

    author:
      "Автор: Харисова Нурия Мансуровна, к.б.н., профессор",

    approved:
      "Допущено кафедрой нормальной физиологии",

    city: "Караганда — 2026",

    enter: "Перейти к учебнику",

    contents: "Содержание учебника",

    description:
      "Интерактивный учебник по физиологии нервной системы",

    module: "Модуль",

    open: "Открыть модуль",
  },

  KZ: {
    ministry:
      "ҚАЗАҚСТАН РЕСПУБЛИКАСЫНЫҢ ҒЫЛЫМ ЖӘНЕ ЖОҒАРЫ БІЛІМ МИНИСТРЛІГІ",

    university: "Қарағанды медицина университеті",

    department: "Қалыпты физиология кафедрасы",

    textbook: "ОҚУЛЫҚ",

    title:
      "ОРТАЛЫҚ ЖҮЙКЕ ЖҮЙЕСІНІҢ ФИЗИОЛОГИЯСЫ",

    subtitle:
      "Медицина факультетінің студенттеріне арналған оқу құралы",

    author:
      "Автор: Харисова Нурия Мансуровна, б.ғ.к., профессор",

    approved:
      "Қалыпты физиология кафедрасымен мақұлданған",

    city: "Қарағанды — 2026",

    enter: "Оқулыққа өту",

    contents: "Оқулық мазмұны",

    description:
      "Жүйке жүйесінің физиологиясы бойынша интерактивті оқулық",

    module: "Модуль",

    open: "Модульді ашу",
  },

  EN: {
    ministry:
      "MINISTRY OF SCIENCE AND HIGHER EDUCATION OF THE REPUBLIC OF KAZAKHSTAN",

    university: "Karaganda Medical University",

    department: "Department of Normal Physiology",

    textbook: "TEXTBOOK",

    title:
      "PHYSIOLOGY OF THE CENTRAL NERVOUS SYSTEM",

    subtitle:
      "Study guide for medical students",

    author:
      "Author: Nuria Mansurovna Kharissova, PhD, Professor",

    approved:
      "Approved by the Department of Normal Physiology",

    city: "Karaganda — 2026",

    enter: "Open textbook",

    contents: "Textbook Contents",

    description:
      "Interactive textbook on nervous system physiology",

    module: "Module",

    open: "Open module",
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
          "linear-gradient(rgba(0,20,55,0.25), rgba(0,20,55,0.55)), url('/neuron-bg.jpg')",

        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",

        padding: "25px 20px 70px",
      }}
    >

      {/* ЯЗЫК */}

      <div
        style={{
          maxWidth: "950px",
          margin: "0 auto 18px",

          display: "flex",
          justifyContent: "flex-end",

          gap: "8px",
        }}
      >
        {(["RU", "KZ", "EN"] as Lang[]).map(
          (code) => (
            <button
              key={code}

              onClick={() => setLang(code)}

              style={{
                padding: "9px 17px",

                borderRadius: "22px",

                border:
                  "1px solid rgba(255,255,255,0.9)",

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
          )
        )}
      </div>

      {/* ===================== */}
      {/* ТИТУЛЬНЫЙ ЛИСТ */}
      {/* ===================== */}

      <section
        style={{
          maxWidth: "900px",
          minHeight: "680px",

          margin: "0 auto",

          background:
            "rgba(255,255,255,0.95)",

          borderRadius: "18px",

          padding: "55px 55px",

          boxShadow:
            "0 15px 45px rgba(0,0,0,0.30)",

          textAlign: "center",

          display: "flex",
          flexDirection: "column",

          justifyContent: "space-between",
        }}
      >

        {/* ВЕРХ */}

        <div>

          <p
            style={{
              fontSize: "14px",

              fontWeight: "bold",

              color: "#334d66",

              lineHeight: "1.6",

              margin: 0,
            }}
          >
            {t.ministry}
          </p>

          <h3
            style={{
              color: "#003b6f",

              marginTop: "18px",

              marginBottom: "6px",
            }}
          >
            {t.university}
          </h3>

          <p
            style={{
              margin: 0,

              color: "#647789",
            }}
          >
            {t.department}
          </p>

        </div>

        {/* ЦЕНТР */}

        <div
          style={{
            margin: "55px 0",
          }}
        >

          <div
            style={{
              color: "#7890a5",

              fontWeight: "bold",

              letterSpacing: "5px",

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

              lineHeight: "1.25",
            }}
          >
            {t.title}
          </h1>

          <p
            style={{
              marginTop: "24px",

              color: "#4c5c6b",

              fontSize: "18px",

              lineHeight: "1.6",
            }}
          >
            {t.subtitle}
          </p>

        </div>

        {/* НИЗ */}

        <div>

          <p
            style={{
              color: "#222",

              fontSize: "17px",

              lineHeight: "1.6",
            }}
          >
            {t.author}
          </p>

          <p
            style={{
              marginTop: "35px",

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

          {/* КНОПКА */}

          <a
            href="#contents"
            style={{
              textDecoration: "none",
            }}
          >
            <button
              style={{
                marginTop: "25px",

                background: "#00599c",

                color: "white",

                border: "none",

                borderRadius: "10px",

                padding: "15px 34px",

                fontSize: "17px",

                fontWeight: "bold",

                cursor: "pointer",

                boxShadow:
                  "0 5px 15px rgba(0,75,135,0.25)",
              }}
            >
              {t.enter} ↓
            </button>
          </a>

        </div>

      </section>

      {/* ===================== */}
      {/* СОДЕРЖАНИЕ */}
      {/* ===================== */}

      <section
        id="contents"

        style={{
          maxWidth: "1150px",

          margin: "55px auto 0",

          background:
            "rgba(255,255,255,0.95)",

          borderRadius: "18px",

          padding: "40px",

          boxShadow:
            "0 15px 45px rgba(0,0,0,0.22)",
        }}
      >

        <h2
          style={{
            textAlign: "center",

            color: "#003b6f",

            fontSize: "32px",

            marginBottom: "8px",
          }}
        >
          {t.contents}
        </h2>

        <p
          style={{
            textAlign: "center",

            color: "#6b7c8c",

            marginBottom: "35px",
          }}
        >
          {t.description}
        </p>

        {/* 23 МОДУЛЯ */}

        <div
          style={{
            display: "grid",

            gridTemplateColumns:
              "repeat(auto-fit, minmax(260px, 1fr))",

            gap: "16px",
          }}
        >

          {modules[lang].map(
            (moduleTitle, index) => {

              const id = index + 1;

              return (

                <Link
                  key={id}

                  href={`/modules/${id}?lang=${lang}`}

                  style={{
                    textDecoration: "none",
                  }}
                >

                  <div
                    style={{
                      minHeight: "125px",

                      padding: "20px",

                      background: "#ffffff",

                      border:
                        "1px solid #d4e0ea",

                      borderRadius: "13px",

                      boxShadow:
                        "0 4px 13px rgba(0,0,0,0.07)",

                      cursor: "pointer",

                      display: "flex",

                      flexDirection: "column",

                      justifyContent:
                        "center",
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
                      {t.module.toUpperCase()}{" "}
                      {id}
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

                        fontSize: "14px",

                        fontWeight: "bold",
                      }}
                    >
                      {t.open} →
                    </span>

                  </div>

                </Link>

              );
            }
          )}

        </div>

      </section>

    </main>
  );
}