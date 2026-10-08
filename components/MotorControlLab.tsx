"use client";

import { useState } from "react";
import type { Language } from "../content/course";
import ExperimentReflection from "./ExperimentReflection";
import { recordOutcome } from "../lib/courseProgress";
import {isMeaningfulResponse} from "../lib/meaningfulResponse";

type Row = {
  id: number;
  drive: number;
  sensory: number;
  output: number;
  error: number;
  note: string;
};

const T = {
  RU: {
    title: "Лаборатория моторного контроля",
    intro:
      "Изменяйте нисходящую моторную команду и качество сенсорной обратной связи. Модель показывает, как обратная связь позволяет обнаруживать расхождение между требуемым и фактическим движением и поддерживает онлайн-коррекцию.",
    drive: "Нисходящая команда",
    sensory: "Сенсорная обратная связь",
    output: "Моторный выход",
    error: "Ошибка движения",
    save: "Записать опыт",
    note: "Объясните роль обратной связи",
    task:
      "Сравните одинаковую моторную команду при слабой и сильной сенсорной обратной связи.",
    anatomy: "Анатомическая опора: моторная кора и нисходящий контроль",
    prediction: "Прогноз до опыта",
    limit:
      "Это учебная модель замкнутого моторного контроля. Сенсорная обратная связь не создаёт моторную команду и не гарантирует точность сама по себе: мозг сопоставляет эфферентную команду/предсказание с сенсорными последствиями и использует ошибку для коррекции. Реальное движение также зависит от мозжечка, базальных ганглиев, спинальных сетей, биомеханики и задержек обратной связи; проценты условны.",
  },
  EN: {
    title: "Motor control laboratory",
    intro:
      "Change descending motor drive and sensory-feedback quality. The model illustrates how feedback detects mismatch between intended and actual movement and supports online correction.",
    drive: "Descending command",
    sensory: "Sensory feedback",
    output: "Motor output",
    error: "Movement error",
    save: "Record trial",
    note: "Explain the role of feedback",
    task:
      "Compare the same motor command with weak and strong sensory feedback.",
    anatomy: "Anatomical reference: motor cortex and descending control",
    prediction: "Prediction before trial",
    limit:
      "This is a teaching model of closed-loop motor control. Sensory feedback neither generates the motor command nor guarantees accuracy by itself: the nervous system compares efferent command/prediction with sensory consequences and uses error signals for correction. Real movement also depends on cerebellar, basal-ganglia and spinal networks, biomechanics, and feedback delays; percentages are modeled.",
  },
  KZ: {
    title: "Қозғалысты басқару зертханасы",
    intro:
      "Төмендейтін моторлық команданы және сенсорлық кері байланыс сапасын өзгертіңіз. Модель кері байланыстың жоспарланған және нақты қозғалыс арасындағы сәйкессіздікті анықтап, ағымдағы түзетуді қалай қолдайтынын көрсетеді.",
    drive: "Төмендейтін команда",
    sensory: "Сенсорлық кері байланыс",
    output: "Моторлық шығыс",
    error: "Қозғалыс қатесі",
    save: "Тәжірибені жазу",
    note: "Кері байланыстың рөлін түсіндіріңіз",
    task:
      "Бірдей моторлық команданы әлсіз және күшті сенсорлық кері байланыста салыстырыңыз.",
    anatomy: "Анатомиялық тірек: моторлық қыртыс және төмендейтін бақылау",
    prediction: "Тәжірибеге дейінгі болжам",
    limit:
      "Бұл тұйық контурлы моторлық бақылаудың оқу моделі. Сенсорлық кері байланыс моторлық команданы өзі тудырмайды және дәлдікке жалғыз өзі кепіл болмайды: жүйке жүйесі эфференттік команда/болжамды сенсорлық салдармен салыстырып, қате сигналын түзету үшін қолданады. Нақты қозғалысқа мишық, базальды ганглийлер, жұлын желілері, биомеханика және кері байланыс кідірістері де әсер етеді; пайыздар шартты.",
  },
} as const;

export default function MotorControlLab({
  language,
}: {
  language: Language;
}) {
  const c = T[language];
  const [prediction, setPrediction] = useState("");
  const [revealed, setRevealed] = useState(false);
  const [drive, setDrive] = useState(65);
  const [sensory, setSensory] = useState(50);
  const [rows, setRows] = useState<Row[]>([]);

  const movementError = Math.max(0, Math.round((100 - sensory) * 0.35));
  const output = Math.max(
    0,
    Math.min(100, Math.round(drive - movementError * 0.45)),
  );

  const recordTrial = () => {
    setRevealed(true);
    recordOutcome(11, "interactive", 1, 1);
    recordOutcome(11, "criterion:application:lab", 1, 1);
    setRows((current) => [
      ...current,
      {
        id: Date.now(),
        drive,
        sensory,
        output,
        error: movementError,
        note: "",
      },
    ]);
  };

  const updateNote = (id: number, note: string) => {
    setRows((current) =>
      current.map((row) => (row.id === id ? { ...row, note } : row)),
    );
    if (isMeaningfulResponse(note,30,4)) {
      recordOutcome(11, "criterion:justification:lab", 1, 1);
    }
  };

  return (
    <section
      style={{
        margin: "28px 0",
        padding: 20,
        border: "1px solid #cfe0ea",
        borderRadius: 16,
      }}
    >
      <h2>{c.title}</h2>
      <p>{c.intro}</p>
      <p>
        <strong>{c.task}</strong>
      </p>

      <figure>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/8/88/Gray726-Brodman.png"
          alt={c.anatomy}
          style={{ maxWidth: 420, width: "100%", height: "auto" }}
        />
        <figcaption>
          {c.anatomy} — Gray&apos;s Anatomy / Wikimedia Commons, public domain.
        </figcaption>
      </figure>

      <label>
        {c.drive}: {drive}%
        <input
          type="range"
          min={0}
          max={100}
          value={drive}
          onChange={(event) => setDrive(Number(event.target.value))}
          style={{ width: "100%" }}
        />
      </label>

      <label>
        {c.sensory}: {sensory}%
        <input
          type="range"
          min={0}
          max={100}
          value={sensory}
          onChange={(event) => setSensory(Number(event.target.value))}
          style={{ width: "100%" }}
        />
      </label>

      <svg
        viewBox="0 0 600 145"
        style={{ width: "100%", background: "#fff", margin: "12px 0" }}
        aria-label={c.title}
        role="img"
      >
        <circle
          cx="80"
          cy="70"
          r="30"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          d="M110 70 H285"
          stroke="currentColor"
          strokeWidth={2 + drive / 25}
        />
        <circle
          cx="320"
          cy="70"
          r="28"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
        <path
          d="M348 70 H535"
          stroke="currentColor"
          strokeWidth={2 + output / 25}
        />
        <path
          d="M500 105 C390 140 250 140 190 105"
          fill="none"
          stroke="currentColor"
          strokeWidth={2 + sensory / 30}
          strokeDasharray="7 5"
        />
        {revealed && (
          <>
            <text x="250" y="25">
              {c.output}: {output}%
            </text>
            <text x="245" y="135">
              {c.error}: {movementError}%
            </text>
          </>
        )}
      </svg>

      <label style={{ display: "block", margin: "12px 0" }}>
        {c.prediction}
        <textarea
          value={prediction}
          onChange={(event) => {
            setPrediction(event.target.value);
            setRevealed(false);
          }}
          rows={2}
          style={{ width: "100%" }}
        />
      </label>

      <button disabled={!isMeaningfulResponse(prediction,20,3)} onClick={recordTrial}>
        {c.save}
      </button>

      <div style={{ overflowX: "auto" }}>
        <table>
          <tbody>
            {rows.map((row, index) => (
              <tr key={row.id}>
                <td>{index + 1}</td>
                <td>{row.drive}%</td>
                <td>{row.sensory}%</td>
                <td>{row.output}%</td>
                <td>{row.error}%</td>
                <td>
                  <input
                    aria-label={c.note}
                    value={row.note}
                    onChange={(event) => updateNote(row.id, event.target.value)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p>
        <small>{c.limit}</small>
      </p>

      <ExperimentReflection
        language={language}
        theoryHref={`/modules/11/theory?lang=${language}`}
      />
    </section>
  );
}
