import Link from "next/link";
import type { Language, SectionLesson } from "../content/types";
import LessonContent from "./LessonContent";
import PracticeContent from "./PracticeContent";
import CasesContent from "./CasesContent";
import BranchingTestContent from "./BranchingTestContent";
import StudyContent from "./StudyContent";
import InteractiveContent from "./InteractiveContent";
import MediaContent from "./MediaContent";

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
    case "theory":
      return <LessonContent lesson={lesson} />;
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
        </>
      );
    case "cases":
      return <CasesContent lesson={lesson} language={language} />;
    case "tests":
      return <BranchingTestContent test={lesson} language={language} moduleId={Number(moduleId)} />;
    case "objectives": case "pretest": case "one-minute": case "clinical":
    case "questions": case "glossary": case "references":
      return <StudyContent lesson={lesson} moduleId={moduleId} language={language} />;
    default:
      return unsupportedContent(lesson);
  }
}
