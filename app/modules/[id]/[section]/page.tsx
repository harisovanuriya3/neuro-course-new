import Link from "next/link";
import { notFound } from "next/navigation";

import { getLesson } from "../../../../content";
import { isModuleId, type Language as Lang } from "../../../../content/course";
import { isSection, getSectionTitle, sectionOrder } from "../../../../content/sections";

import SectionContent from "../../../../components/SectionContent";
import CourseNavigation from "../../../../components/CourseNavigation";
import DocumentLanguage from "../../../../components/DocumentLanguage";
import VirtualPatient from "../../../../components/VirtualPatient";
import UnifiedVirtualPatient from "../../../../components/UnifiedVirtualPatient";
import ModuleProgress from "../../../../components/ModuleProgress";
import VoiceContent from "../../../../components/VoiceContent";
import NotesContent from "../../../../components/NotesContent";
import BookmarkCurrent from "../../../../components/BookmarkCurrent";
import PageVoiceTools from "../../../../components/PageVoiceTools";
import CourseVisitTracker from "../../../../components/CourseVisitTracker";
import { interfaceText } from "../../../../lib/interface";
import FoundationVisual from "../../../../components/FoundationVisual";
import AnatomyReference from "../../../../components/AnatomyReference";
import AdvancedAnatomyReference from "../../../../components/AdvancedAnatomyReference";
import ModuleSidebar from "../../../../components/ModuleSidebar";
import NerveFiberLab from "../../../../components/NerveFiberLab";
import EEGLab from "../../../../components/EEGLab";
import MembraneElectrophysiologyLab from "../../../../components/MembraneElectrophysiologyLab";
import SynapseExperimentLab from "../../../../components/SynapseExperimentLab";
import IntegrationExperimentLab from "../../../../components/IntegrationExperimentLab";
import ReflexLab from "../../../../components/ReflexLab";
import PathwayLab from "../../../../components/PathwayLab";
import SpinalRegulationLab from "../../../../components/SpinalRegulationLab";
import BrainstemLab from "../../../../components/BrainstemLab";
import MotorControlLab from "../../../../components/MotorControlLab";
import BasalGangliaLab from "../../../../components/BasalGangliaLab";
import CerebellumLab from "../../../../components/CerebellumLab";
import ThalamusLab from "../../../../components/ThalamusLab";
import HypothalamusLab from "../../../../components/HypothalamusLab";
import LimbicLab from "../../../../components/LimbicLab";
import AmygdalaLab from "../../../../components/AmygdalaLab";
import CortexLab from "../../../../components/CortexLab";
import SomatosensoryLab from "../../../../components/SomatosensoryLab";
import VisionLab from "../../../../components/VisionLab";
import SensorySystemsLab from "../../../../components/SensorySystemsLab";
import AutonomicLab from "../../../../components/AutonomicLab";
import LearningMemoryLab from "../../../../components/LearningMemoryLab";
import SleepRhythmLab from "../../../../components/SleepRhythmLab";
import PlasticityLab from "../../../../components/PlasticityLab";
import GuidedLabFrame from "../../../../components/GuidedLabFrame";
import NeuroPracticalStation from "../../../../components/NeuroPracticalStation";
import courseStyles from "../../../CourseLayout.module.css";

const text = {
  RU: {
    module: "Модуль",
    back: "← Назад к модулю",
    pending: "Материал этого раздела не загрузился. Вернитесь к модулю и повторите попытку.",
  },

  KZ: {
    module: "Модуль",
    back: "← Модульге оралу",
    pending: "Бұл бөлімнің материалы жүктелмеді. Модульге оралып, қайтадан көріңіз.",
  },

  EN: {
    module: "Module",
    back: "← Back to module",
    pending: "This section did not load. Return to the module and try again.",
  },
};

type PageProps = {
  params: Promise<{
    id: string;
    section: string;
  }>;

  searchParams: Promise<{
    lang?: string | string[];
  }>;
};

export default async function SectionPage({
  params,
  searchParams,
}: PageProps) {
  const { id, section } = await params;
  const { lang: requestedLang } = await searchParams;

  const rawLang = Array.isArray(requestedLang)
    ? requestedLang[0]
    : requestedLang;

  const lang: Lang =
    rawLang === "KZ" || rawLang === "EN"
      ? rawLang
      : "RU";

  const moduleNumber = Number(id);

  if (!isModuleId(id) || !isSection(section)) {
    notFound();
  }

  const t = text[lang];
  const sectionIndex = sectionOrder.indexOf(section);

  const lesson = getLesson(moduleNumber, section, lang);

  return (
    <main
      id="top"
      style={{
        minHeight: "100vh",
        padding: "40px 20px 60px",
        background:
          "linear-gradient(180deg, #eef5fa 0%, #f8fbfd 100%)",
      }}
    >
      <DocumentLanguage language={lang} />
      <div
        className={courseStyles.sectionShell}
        lang={
          lang === "KZ"
            ? "kk"
            : lang.toLowerCase()
        }
        style={{
        }}
      >
        <ModuleSidebar moduleNumber={moduleNumber} currentSection={section} currentSectionTitle={getSectionTitle(section, lang)} lang={lang} />
        <div style={{ minWidth: 0 }}>
        <div
          style={{
            padding: "clamp(22px, 4vw, 36px)",
            background: "#ffffff",
            borderRadius: "20px",
            border: "1px solid #dce8ef",
            boxShadow:
              "0 8px 25px rgba(28, 72, 102, 0.06)",
          }}
        >
          {/* НАЗАД К ТИТУЛУ МОДУЛЯ */}

          <Link
            href={`/modules/${id}?lang=${lang}`}
            style={{
              color: "#004b87",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            {t.back}
          </Link>

          {/* ЯЗЫК */}

          <nav
            aria-label={interfaceText[lang].language}
            style={{
              display: "flex",
              gap: "10px",
              marginTop: "24px",
              marginBottom: "28px",
              flexWrap: "wrap",
            }}
          >
            {(["RU", "KZ", "EN"] as const).map(
              (code) => (
                <Link
                  key={code}
                  href={`/modules/${id}/${section}?lang=${code}`}
                  aria-current={
                    lang === code
                      ? "page"
                      : undefined
                  }
                  style={{
                    minWidth: "42px",
                    padding: "7px 11px",
                    textAlign: "center",
                    borderRadius: "9px",
                    textDecoration: "none",
                    fontWeight: 700,
                    background:
                      lang === code
                        ? "#005b96"
                        : "#f3f7fa",
                    color:
                      lang === code
                        ? "#ffffff"
                        : "#526b80",
                    border:
                      lang === code
                        ? "1px solid #005b96"
                        : "1px solid #d7e5ed",
                  }}
                >
                  {code}
                </Link>
              )
            )}
          </nav>

          {/* НОМЕР РАЗДЕЛА */}

          <div
            style={{
              display: "inline-block",
              marginBottom: "14px",
              padding: "7px 12px",
              borderRadius: "999px",
              background: "#eaf5fa",
              color: "#236b8e",
              fontSize: "13px",
              fontWeight: 800,
            }}
          >
            {String(sectionIndex + 1).padStart(
              2,
              "0"
            )}{" "}
            / {sectionOrder.length}
          </div>

          {/* СУЩЕСТВУЮЩИЙ КОНТЕНТ */}

          <CourseVisitTracker moduleId={moduleNumber} section={section} />
          <PageVoiceTools key={`${id}/${section}/${lang}`} moduleId={moduleNumber} language={lang} contentId="module1-page-content" section={section} />
          {section !== "notes" && <BookmarkCurrent section={section} language={lang} moduleId={moduleNumber} />}

          <div id="module1-page-content">
          {moduleNumber === 1 && section === "virtual-patient" ? (
            <VirtualPatient language={lang} />
          ) : section === "virtual-patient" ? (
            <UnifiedVirtualPatient moduleId={moduleNumber} language={lang} />
          ) : section === "progress" ? (
            <ModuleProgress language={lang} moduleId={moduleNumber} />
          ) : section === "voice" ? (
            <VoiceContent language={lang} moduleId={moduleNumber} />
          ) : section === "notes" ? (
            <NotesContent language={lang} moduleId={moduleNumber} />
          ) : moduleNumber === 2 && section === "interactive" ? (
            <EEGLab language={lang} />
          ) : moduleNumber === 3 && section === "interactive" ? (
            <><NerveFiberLab language={lang} /><NeuroPracticalStation moduleId={3} language={lang} /></>
          ) : moduleNumber === 4 && section === "interactive" ? (
            <MembraneElectrophysiologyLab language={lang} />
          ) : moduleNumber === 5 && section === "interactive" ? (
            <SynapseExperimentLab language={lang} />
          ) : moduleNumber === 6 && section === "interactive" ? (
            <IntegrationExperimentLab language={lang} />
          ) : moduleNumber === 7 && section === "interactive" ? (
            <ReflexLab language={lang} />
          ) : moduleNumber === 8 && section === "interactive" ? (
            <GuidedLabFrame moduleId={8} language={lang}><PathwayLab language={lang} /></GuidedLabFrame>
          ) : moduleNumber === 9 && section === "interactive" ? (
            <GuidedLabFrame moduleId={9} language={lang}><SpinalRegulationLab language={lang} /></GuidedLabFrame>
          ) : moduleNumber === 10 && section === "interactive" ? (
            <GuidedLabFrame moduleId={10} language={lang}><BrainstemLab language={lang} /></GuidedLabFrame>
          ) : moduleNumber === 11 && section === "interactive" ? (
            <><GuidedLabFrame moduleId={11} language={lang}><MotorControlLab language={lang} /></GuidedLabFrame><NeuroPracticalStation moduleId={11} language={lang} /></>
          ) : moduleNumber === 12 && section === "interactive" ? (
            <GuidedLabFrame moduleId={12} language={lang}><BasalGangliaLab language={lang} /></GuidedLabFrame>
          ) : moduleNumber === 13 && section === "interactive" ? (
            <GuidedLabFrame moduleId={13} language={lang}><CerebellumLab language={lang} /></GuidedLabFrame>
          ) : moduleNumber === 14 && section === "interactive" ? (
            <GuidedLabFrame moduleId={14} language={lang}><ThalamusLab language={lang} /></GuidedLabFrame>
          ) : moduleNumber === 15 && section === "interactive" ? (
            <GuidedLabFrame moduleId={15} language={lang}><HypothalamusLab language={lang} /></GuidedLabFrame>
          ) : moduleNumber === 16 && section === "interactive" ? (
            <GuidedLabFrame moduleId={16} language={lang}><LimbicLab language={lang} /></GuidedLabFrame>
          ) : moduleNumber === 17 && section === "interactive" ? (
            <GuidedLabFrame moduleId={17} language={lang}><AmygdalaLab language={lang} /></GuidedLabFrame>
          ) : moduleNumber === 18 && section === "interactive" ? (
            <GuidedLabFrame moduleId={18} language={lang}><CortexLab language={lang} /></GuidedLabFrame>
          ) : moduleNumber === 19 && section === "interactive" ? (
            <><GuidedLabFrame moduleId={19} language={lang}><SomatosensoryLab language={lang} /></GuidedLabFrame><NeuroPracticalStation moduleId={19} language={lang} /></>
          ) : moduleNumber === 20 && section === "interactive" ? (
            <><GuidedLabFrame moduleId={20} language={lang}><VisionLab language={lang} /></GuidedLabFrame><NeuroPracticalStation moduleId={20} language={lang} /></>
          ) : moduleNumber === 21 && section === "interactive" ? (
            <><GuidedLabFrame moduleId={21} language={lang}><SensorySystemsLab language={lang} /></GuidedLabFrame><NeuroPracticalStation moduleId={21} language={lang} /></>
          ) : moduleNumber === 22 && section === "interactive" ? (
            <AutonomicLab language={lang} />
          ) : moduleNumber === 23 && section === "interactive" ? (
            <GuidedLabFrame moduleId={23} language={lang}><LearningMemoryLab language={lang} /></GuidedLabFrame>
          ) : moduleNumber === 24 && section === "interactive" ? (
            <GuidedLabFrame moduleId={24} language={lang}><SleepRhythmLab language={lang} /></GuidedLabFrame>
          ) : moduleNumber === 25 && section === "interactive" ? (
            <GuidedLabFrame moduleId={25} language={lang}><PlasticityLab language={lang} /></GuidedLabFrame>
          ) : lesson ? (
            <>
              <SectionContent
                key={`${id}/${section}/${lang}`}
                lesson={lesson}
                moduleId={id}
                language={lang}
              />
              {section === 'theory' && moduleNumber > 1 && (
                <>
                  <FoundationVisual moduleId={moduleNumber} language={lang} />
                  <AnatomyReference moduleId={moduleNumber} language={lang} />
                  <AdvancedAnatomyReference moduleId={moduleNumber} language={lang} />
                </>
              )}
            </>
          ) : (
            <>
              <p
                style={{
                  margin: "0 0 8px",
                  color: "#607b8d",
                  fontWeight: 700,
                }}
              >
                {t.module} {moduleNumber}
              </p>

              <h1
                style={{
                  margin: "0 0 18px",
                  color: "#004b87",
                  fontSize:
                    "clamp(1.6rem, 4vw, 2.2rem)",
                  lineHeight: 1.3,
                }}
              >
                {getSectionTitle(section, lang)}
              </h1>

              <p
                style={{
                  margin: 0,
                  color: "#526b80",
                  lineHeight: 1.7,
                }}
              >
                {t.pending}
              </p>
            </>
          )}
          </div>
        </div>

        {/* ЕДИНАЯ НАВИГАЦИЯ:
            17 РАЗДЕЛОВ + 25 МОДУЛЕЙ */}

        <CourseNavigation
          moduleNumber={moduleNumber}
          lang={lang}
          currentSection={section}
        />
        </div>
      </div>
    </main>
  );
}
