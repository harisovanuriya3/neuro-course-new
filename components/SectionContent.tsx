import Link from "next/link";
import type { Language, SectionLesson } from "../content/types";
import TheoryMedia from "./TheoryMedia";
import LessonContent from "./LessonContent";
import PracticeContent from "./PracticeContent";
import CasesContent from "./CasesContent";
import BranchingTestContent from "./BranchingTestContent";
import StudyContent from "./StudyContent";
import InteractiveContent from "./InteractiveContent";
import MediaContent from "./MediaContent";
import AnatomyPathBuilder from "./AnatomyPathBuilder";
import PhysiologyInfographic from "./PhysiologyInfographic";
import NerveFiberExpandedTheory from "./NerveFiberExpandedTheory";

type Props = {
  lesson: SectionLesson;
  moduleId: string;
  language: Language;
};

function unsupportedContent(lesson: never): never {
  throw new Error("Unsupported section content kind");
}

export default function SectionContent({ lesson, moduleId, language }: Props) {
  switch (lesson.kind) {
    case "media":
      return <MediaContent lesson={lesson} moduleId={moduleId} language={language} />;
    case "interactive":
      return <InteractiveContent lesson={lesson} moduleId={moduleId} language={language} />;
    case "theory": {
      const guide = language === "RU"
        ? {title:"Как читать эту теорию",text:"Не пытайтесь запомнить всё сразу. Для каждого механизма найдите три вещи: что меняется → почему это меняется → к какому результату приводит."}
        : language === "KZ"
          ? {title:"Теорияны қалай оқу керек",text:"Барлығын бірден жаттауға тырыспаңыз. Әр механизмнен үш нәрсені табыңыз: не өзгереді → неліктен өзгереді → қандай нәтижеге әкеледі."}
          : {title:"How to read this theory",text:"Do not try to memorize everything at once. For each mechanism, find three things: what changes → why it changes → what result follows."};
      return <>
        <aside style={{margin:"0 0 20px",padding:"14px 16px",border:"1px solid #d6e3eb",borderRadius:12,background:"#f8fcff"}}>
          <strong>{guide.title}</strong>
          <p style={{margin:"6px 0 0",lineHeight:1.6}}>{guide.text}</p>
        </aside>
        {(() => {
          const illustrations: Record<number, {src:string; RU:string; EN:string; KZ:string}> = {
            1:{src:"/images/anatomy/brain-spinal-cord.jpg",RU:"Анатомический препарат головного и спинного мозга",EN:"Anatomical specimen of brain and spinal cord",KZ:"Бас миы мен жұлынның анатомиялық препараты"},
            2:{src:"https://commons.wikimedia.org/wiki/Special:FilePath/EEG_recording.jpg",RU:"Реальная фотография подготовки испытуемого к регистрации ЭЭГ",EN:"Real photograph of a participant prepared for EEG recording",KZ:"ЭЭГ тіркеуге дайындалған қатысушының нақты фотосуреті"},
            3:{src:"/images/anatomy/peripheral-nerve.jpg",RU:"Микрофотография периферического нерва",EN:"Peripheral nerve micrograph",KZ:"Шеткі жүйкенің микрофотографиясы"},
            5:{src:"/images/anatomy/neuromuscular-junction.jpg",RU:"Электронная микрофотография нервно-мышечного соединения",EN:"Electron micrograph of a neuromuscular junction",KZ:"Жүйке-бұлшықет түйіспесінің электрондық микрофотографиясы"}
          };
          const selected=illustrations[Number(moduleId)];
          if (!selected) return null;
          const src=selected.src;
          const caption=selected[language];
          return <figure style={{margin:"12px 0 28px",padding:12,border:"1px solid #dce4eb",borderRadius:12}}>
            <a href={src} target="_blank" rel="noopener noreferrer" aria-label={caption}>
              <img src={src} alt={caption} loading="lazy" style={{display:"block",width:"100%",height:"auto",maxHeight:520,objectFit:"contain",borderRadius:8}} />
            </a>
            <figcaption style={{fontSize:14,marginTop:10,color:"#3c566a"}}>
              {caption}
              {Number(moduleId) === 2 && (
                <> — <a href="https://commons.wikimedia.org/wiki/File:EEG_recording.jpg" target="_blank" rel="noopener noreferrer">
                  Petter Kallioinen / Wikimedia Commons, CC BY-SA 3.0
                </a></>
              )}
            </figcaption>
          </figure>;
        })()}
        {Number(moduleId) === 2 && (
          <figure style={{margin:"12px 0 28px",padding:12,border:"1px solid #dce4eb",borderRadius:12}}>
            <a href={`/images/module2/evoked-averaging-${language.toLowerCase()}.png`} target="_blank" rel="noopener noreferrer">
              <img
                src={`/images/module2/evoked-averaging-${language.toLowerCase()}.png`}
                alt={language === "RU" ? "Схема усреднения вызванных потенциалов" : language === "EN" ? "Evoked potential averaging diagram" : "Шақырылған потенциалдарды орташалау сызбасы"}
                loading="lazy"
                style={{display:"block",width:"100%",height:"auto",maxHeight:520,objectFit:"contain",borderRadius:8}}
              />
            </a>
            <figcaption style={{fontSize:14,marginTop:10,color:"#3c566a"}}>
              {language === "RU" ? "Схема усреднения вызванных потенциалов" : language === "EN" ? "Evoked potential averaging diagram" : "Шақырылған потенциалдарды орташалау сызбасы"}
            </figcaption>
          </figure>
        )}
        <PhysiologyInfographic moduleId={Number(moduleId)} language={language} />
        <TheoryMedia moduleId={Number(moduleId)} language={language} />
        <LessonContent lesson={lesson} moduleId={moduleId} language={language} />
        {Number(moduleId) === 3 && <NerveFiberExpandedTheory language={language} />}
      </>;
    }
    case "practice":
      return (
        <>
          <Link
            href={`/modules/${moduleId}/theory?lang=${language}`}
            style={{
              display: "inline-block",
              marginBottom: "20px",
              color: "#005b96",
              fontWeight: 700,
            }}
          >
            {lesson.ui.theory}
          </Link>
          <PracticeContent lesson={lesson} language={language} moduleId={moduleId} />
          <PhysiologyInfographic moduleId={Number(moduleId)} language={language} />
          <AnatomyPathBuilder moduleId={Number(moduleId)} language={language} />
        </>
      );
    case "cases":
      return <><CasesContent lesson={lesson} language={language} moduleId={Number(moduleId)} /><PhysiologyInfographic moduleId={Number(moduleId)} language={language} /><AnatomyPathBuilder moduleId={Number(moduleId)} language={language} /></>;
    case "tests":
      return <BranchingTestContent test={lesson} language={language} moduleId={Number(moduleId)} />;
    case "objectives": case "pretest": case "one-minute": case "clinical":
    case "questions": case "glossary": case "references":
      return <StudyContent lesson={lesson} moduleId={moduleId} language={language} />;
    default:
      return unsupportedContent(lesson);
  }
}
