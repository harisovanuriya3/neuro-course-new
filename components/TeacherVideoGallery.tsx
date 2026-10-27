"use client";

import { useEffect, useState } from "react";
import type { Language } from "../content/course";

type Clip = {
  file: string;
  title: Record<Language, string>;
  explanation: Record<Language, string>;
};

const tr = (RU: string, EN: string, KZ: string): Record<Language, string> => ({ RU, EN, KZ });
const emptyClips: Clip[] = [];
const clips: Record<number, Clip[]> = {
  1: [
    { file: "clip-03.mp4", title: tr("Беседа преподавателя с пациентом", "Instructor–patient conversation", "Оқытушы мен пациенттің әңгімесі"), explanation: tr("Учебная сцена для обсуждения наблюдения; показанная беседа сама по себе не подтверждает физиологический тест.", "A teaching scene for discussing observation; the conversation alone does not demonstrate a validated physiological test.", "Бақылауды талқылауға арналған оқу көрінісі; бұл әңгіме физиологиялық сынақтың расталғанын білдірмейді.") },
    { file: "clip-07.mp4", title: tr("Обсуждение анатомического плаката", "Anatomical poster discussion", "Анатомиялық плакатты талқылау"), explanation: tr("Разбор учебного плаката; это визуальное объяснение, а не клиническое измерение.", "A teaching-poster discussion; this is a visual explanation, not a clinical measurement.", "Оқу плакатын талдау; бұл көрнекі түсіндірме, клиникалық өлшеу емес.") },
    { file: "clip-20.mp4", title: tr("Учебный монтаж: вводные сюжеты", "Teaching montage: introductory scenes", "Оқу монтажы: кіріспе көріністер"), explanation: tr("Монтаж разных учебных и клинических сцен; не является записью единого эксперимента.", "A montage of different teaching and clinical scenes; it is not a recording of one experiment.", "Әртүрлі оқу және клиникалық көріністердің монтажы; біртұтас тәжірибенің жазбасы емес.") },
  ],
  2: [
    { file: "clip-01.mp4", title: tr("Клиническое наблюдение: границы вывода", "Clinical observation: limits of inference", "Клиникалық бақылау: қорытынды шектері"), explanation: tr("Постановочная клиническая сцена для обсуждения наблюдения; она не подтверждает рефлекс или диагноз.", "A staged clinical scene for discussing observation; it does not establish a reflex or diagnosis.", "Бақылауды талқылауға арналған қойылымдық клиникалық көрініс; ол рефлексті немесе диагнозды растамайды.") },
    { file: "clip-06.mp4", title: tr("Клиническая беседа для обсуждения", "Clinical conversation for discussion", "Талқылауға арналған клиникалық әңгіме"), explanation: tr("Учебная беседа; не трактуйте её как документированное обследование или клиническое заключение.", "A teaching conversation; do not treat it as a documented examination or clinical conclusion.", "Оқу әңгімесі; оны құжатталған тексеру немесе клиникалық қорытынды деп қабылдамаңыз.") },
    { file: "clip-13.mp4", title: tr("Анатомический учебный эпизод", "Anatomy teaching segment", "Анатомия бойынша оқу көрінісі"), explanation: tr("Анатомический учебный фрагмент; не является записью физиологического эксперимента.", "An anatomy teaching segment; it is not a recording of a physiological experiment.", "Анатомия бойынша оқу үзіндісі; физиологиялық тәжірибенің жазбасы емес.") },
    { file: "clip-14.mp4", title: tr("Объяснение анатомического материала", "Anatomy teaching explanation", "Анатомиялық материалды түсіндіру"), explanation: tr("Анатомическая учебная сцена, предварительно отнесённая к теме наблюдения; содержание требует редакционной проверки.", "An anatomy teaching scene provisionally assigned to observation; its content still needs editorial review.", "Бақылау тақырыбына алдын ала сәйкестендірілген анатомиялық оқу көрінісі; мазмұны редакциялық тексеруді қажет етеді.") },
  ],
  3: [
    { file: "clip-05.mp4", title: tr("Нейрон на экране: учебная модель", "Neuron on screen: teaching model", "Экрандағы нейрон: оқу моделі"), explanation: tr("Экранная модель нейрона; не является записью реального нервного импульса.", "An on-screen neuron model; it is not a recording of a real nerve impulse.", "Экрандағы нейрон моделі; нақты жүйке импульсінің жазбасы емес.") },
    { file: "clip-09.mp4", title: tr("Строение нейрона: учебная модель", "Neuron anatomy: teaching model", "Нейрон құрылысы: оқу моделі"), explanation: tr("Схематическое объяснение строения нейрона; это не микрофотография и не микроскопическая запись.", "A schematic explanation of neuron structure; this is not a micrograph or microscopic recording.", "Нейрон құрылысын сызбалық түсіндіру; бұл микрофотосурет те, микроскопиялық жазба да емес.") },
    { file: "clip-15.mp4", title: tr("Стилизованная модель нейрона", "Stylized neuron model", "Нейронның стильдендірілген моделі"), explanation: tr("Стилизованное изображение клетки; его нельзя принимать за микрофотографию или точную реконструкцию.", "A stylized cell image; do not treat it as a micrograph or an exact reconstruction.", "Жасушаның стильдендірілген бейнесі; оны микрофотосурет немесе дәл реконструкция деп қабылдамаңыз.") },
  ],
  5: [
    { file: "clip-11.mp4", title: tr("Химический синапс: условная модель", "Chemical synapse: conceptual model", "Химиялық синапс: шартты модель"), explanation: tr("Иллюстрация химического синапса; масштаб и количественная точность не установлены.", "An illustration of a chemical synapse; scale and quantitative accuracy have not been established.", "Химиялық синапстың иллюстрациясы; масштабы мен сандық дәлдігі расталмаған.") },
    { file: "clip-12.mp4", title: tr("Высвобождение медиатора: условная анимация", "Transmitter release: conceptual animation", "Медиатордың бөлінуі: шартты анимация"), explanation: tr("Условная визуализация высвобождения медиатора; временная и количественная точность не проверена.", "A conceptual visualization of transmitter release; timing and quantitative accuracy are unverified.", "Медиатордың бөлінуін шартты бейнелеу; уақыттық және сандық дәлдігі тексерілмеген.") },
  ],
  6: [
    { file: "clip-10.mp4", title: tr("Нейрон: модель интеграции", "Neuron: integration model", "Нейрон: интеграция моделі"), explanation: tr("Экранная модель нейрона для вводного обсуждения; это не экспериментальное измерение интеграции.", "An on-screen neuron model for introductory discussion; it is not an experimental measurement of integration.", "Кіріспе талқылауға арналған экрандағы нейрон моделі; интеграцияның эксперименттік өлшемі емес.") },
  ],
  7: [
    { file: "clip-04.mp4", title: tr("Учебная демонстрация", "Teaching demonstration", "Оқу көрсетілімі"), explanation: tr("Учебная демонстрация; по доступному обзору нельзя подтвердить показанный физиологический рефлекс.", "A teaching demonstration; the available review cannot confirm the physiological reflex shown.", "Оқу көрсетілімі; қолда бар шолумен көрсетілген физиологиялық рефлексті растау мүмкін емес.") },
    { file: "clip-08.mp4", title: tr("Практика на тренажёре", "Practice on a training model", "Тренажердегі практика"), explanation: tr("Практическая сцена на тренажёре; соответствие процедуры методике ещё не проверено.", "A practical scene using a training model; the procedure has not yet been checked against a validated method.", "Тренажердегі практикалық көрініс; процедураның бекітілген әдіске сәйкестігі әлі тексерілмеген.") },
  ],
  9: [
    { file: "clip-08.mp4", title: tr("Практическая демонстрация на тренажёре", "Practical demonstration on a training model", "Тренажердегі практикалық көрсетілім"), explanation: tr("Сюжет может быть полезен для обсуждения практики, но правильность методики не подтверждена.", "The scene may support discussion of practice, but the correctness of the method has not been confirmed.", "Бұл көрініс практиканы талқылауға пайдалы болуы мүмкін, бірақ әдістеменің дұрыстығы расталмаған.") },
  ],
};

const labels = {
  RU: {
    heading: "Видеоматериалы преподавателя",
    note: "ИИ-визуализация: условная иллюстрация, а не видеозапись реального эксперимента. Проверяйте механизм по теории.",
    captions: "Субтитры пока не созданы и не проверены. Названия и пояснения — редакционные аннотации, а не субтитры или стенограмма.",
    explanation: "Пояснение",
    play: "Воспроизвести видео",
  },
  EN: {
    heading: "Instructor video materials",
    note: "AI-generated conceptual illustration, not a recording of a real experiment. Confirm mechanisms against the theory.",
    captions: "Subtitles have not yet been created or reviewed. Titles and explanations are editorial notes, not subtitles or a transcript.",
    explanation: "Explanation",
    play: "Play video",
  },
  KZ: {
    heading: "Оқытушының бейнематериалдары",
    note: "ЖИ жасаған шартты бейне; нақты тәжірибенің жазбасы емес. Тетікті теориямен салыстырыңыз.",
    captions: "Қазақша субтитрлер әлі әзірленіп, тексерілген жоқ. Төмендегі мәтін — оқу түсіндірмесі, субтитр немесе дыбыстың стенограммасы емес; түпнұсқа дыбыс болса, ол аударылмаған күйде беріледі.",
    explanation: "Түсіндірме",
    play: "Бейнені ойнату",
  },
};

export default function TeacherVideoGallery({ moduleId, language }: { moduleId: number; language: Language }) {
  const [available, setAvailable] = useState<string[]>([]);
  const relevant = clips[moduleId] ?? emptyClips;

  useEffect(() => {
    let active = true;
    Promise.all(relevant.map(async clip => {
      const url = `/media/teacher/${clip.file}`;
      try {
        const response = await fetch(url, { method: "HEAD", cache: "no-store" });
        return response.ok ? clip.file : null;
      } catch {
        return null;
      }
    })).then(values => {
      if (active) setAvailable(values.filter((value): value is string => Boolean(value)));
    });
    return () => {
      active = false;
    };
  }, [moduleId, relevant]);

  const visible = relevant.filter(clip => available.includes(clip.file));
  if (!visible.length) return null;

  return (
    <section aria-label={labels[language].heading} style={{ marginBlock: "1.5rem" }}>
      <h2>{labels[language].heading}</h2>
      <p>{labels[language].note}</p>
      <p>{labels[language].captions}</p>
      {visible.map(clip => (
        <figure key={clip.file} style={{ margin: "1rem 0" }}>
          <video controls playsInline preload="metadata" aria-label={clip.title[language]} style={{ width: "100%", maxWidth: 720, borderRadius: 12 }} src={`/media/teacher/${clip.file}`}>
            {labels[language].play}
          </video>
          <figcaption>
            <strong>{clip.title[language]}</strong>
            <p><strong>{labels[language].explanation}: </strong>{clip.explanation[language]}</p>
          </figcaption>
        </figure>
      ))}
    </section>
  );
}
