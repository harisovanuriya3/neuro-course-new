import Link from "next/link";
import { notFound } from "next/navigation";

import { getLesson } from "../../../../content";
import { isModuleId, type Language as Lang } from "../../../../content/course";
import { isSection, getSectionTitle, sectionOrder } from "../../../../content/sections";

import SectionContent from "../../../../components/SectionContent";
import AuthorRestoredVisuals from "../../../../components/AuthorRestoredVisuals";
import CourseNavigation from "../../../../components/CourseNavigation";
import SectionProgressStrip from "../../../../components/SectionProgressStrip";
import DocumentLanguage from "../../../../components/DocumentLanguage";
import VirtualPatient from "../../../../components/VirtualPatient";
import VisualPathwayLocalizer from "../../../../components/VisualPathwayLocalizer";
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
import Module2Content from "../../../../components/Module2Content";
import EvokedAveragingLab from "../../../../components/EvokedAveragingLab";
import MembraneElectrophysiologyLab from "../../../../components/MembraneElectrophysiologyLab";
import SynapseExperimentLab from "../../../../components/SynapseExperimentLab";
import IntegrationExperimentLab from "../../../../components/IntegrationExperimentLab";
import ReflexLab from "../../../../components/ReflexLab";
import SechenovExperiment from "../../../../components/SechenovExperiment";
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
      className={courseStyles.page}
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
        <SectionProgressStrip moduleId={moduleNumber} current={section} language={lang} />
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

          {moduleNumber === 2 && (section === "theory" || section === "interactive") && (
            <nav aria-label={lang === "RU" ? "Теория и лаборатория ЭЭГ" : lang === "EN" ? "EEG theory and laboratory" : "ЭЭГ теориясы мен зертханасы"} style={{display:"flex",flexWrap:"wrap",gap:12,margin:"0 0 20px",padding:14,border:"1px solid #c3d9e6",borderRadius:12,background:"#eff8fc"}}>
              <Link href={`/modules/2/theory?lang=${lang}`} style={{color:"#075783",fontWeight:700}}>{lang==="RU"?"Теория: ЭЭГ и артефакты":lang==="EN"?"Theory: EEG and artifacts":"Теория: ЭЭГ және артефактілер"}</Link>
              <Link href={`/modules/2/interactive?lang=${lang}`} style={{color:"#075783",fontWeight:700}}>{lang==="RU"?"Лабораторная работа: запись ЭЭГ":lang==="EN"?"Laboratory: EEG recording":"Зертханалық жұмыс: ЭЭГ тіркеу"}</Link>
            </nav>
          )}
          <div id="module1-page-content">
          {moduleNumber === 1 && section === "virtual-patient" ? (
            <VirtualPatient language={lang} />
          ) : section === "virtual-patient" ? (
            <>
              {moduleNumber === 20 && <VisualPathwayLocalizer language={lang} />}
              <UnifiedVirtualPatient moduleId={moduleNumber} language={lang} />
            </>
          ) : section === "progress" ? (
            <ModuleProgress language={lang} moduleId={moduleNumber} />
          ) : section === "voice" ? (
            <VoiceContent language={lang} moduleId={moduleNumber} />
          ) : section === "notes" ? (
            <NotesContent language={lang} moduleId={moduleNumber} />
          ) : moduleNumber === 2 && section === "interactive" ? (
            <><EEGLab language={lang} /><EvokedAveragingLab language={lang} /></>
          ) : moduleNumber === 3 && section === "interactive" ? (
            <NerveFiberLab language={lang} />
          ) : moduleNumber === 4 && section === "interactive" ? (
            <MembraneElectrophysiologyLab language={lang} />
          ) : moduleNumber === 5 && section === "interactive" ? (
            <SynapseExperimentLab language={lang} />
          ) : moduleNumber === 6 && section === "interactive" ? (
            <IntegrationExperimentLab language={lang} />
          ) : moduleNumber === 7 && section === "interactive" ? (
            <><ReflexLab language={lang} /><SechenovExperiment language={lang} /></>
          ) : moduleNumber === 8 && section === "interactive" ? (
            <PathwayLab language={lang} />
          ) : moduleNumber === 9 && section === "interactive" ? (
            <SpinalRegulationLab language={lang} />
          ) : moduleNumber === 10 && section === "interactive" ? (
            <BrainstemLab language={lang} />
          ) : moduleNumber === 11 && section === "interactive" ? (
            <MotorControlLab language={lang} />
          ) : moduleNumber === 12 && section === "interactive" ? (
            <BasalGangliaLab language={lang} />
          ) : moduleNumber === 13 && section === "interactive" ? (
            <CerebellumLab language={lang} />
          ) : moduleNumber === 14 && section === "interactive" ? (
            <ThalamusLab language={lang} />
          ) : moduleNumber === 15 && section === "interactive" ? (
            <HypothalamusLab language={lang} />
          ) : moduleNumber === 16 && section === "interactive" ? (
            <LimbicLab language={lang} />
          ) : moduleNumber === 17 && section === "interactive" ? (
            <AmygdalaLab language={lang} />
          ) : moduleNumber === 18 && section === "interactive" ? (
            <CortexLab language={lang} />
          ) : moduleNumber === 19 && section === "interactive" ? (
            <SomatosensoryLab language={lang} />
          ) : moduleNumber === 20 && section === "interactive" ? (
            <VisionLab language={lang} />
          ) : moduleNumber === 21 && section === "interactive" ? (
            <SensorySystemsLab language={lang} />
          ) : moduleNumber === 22 && section === "interactive" ? (
            <AutonomicLab language={lang} />
          ) : moduleNumber === 23 && section === "interactive" ? (
            <LearningMemoryLab language={lang} />
          ) : moduleNumber === 24 && section === "interactive" ? (
            <SleepRhythmLab language={lang} />
          ) : moduleNumber === 25 && section === "interactive" ? (
            <PlasticityLab language={lang} />
          ) : lesson ? (
            <>
              <SectionContent
                key={`${id}/${section}/${lang}`}
                lesson={lesson}
                moduleId={id}
                language={lang}
              />
              {section === "theory" && moduleNumber <= 10 && <AuthorRestoredVisuals moduleId={moduleNumber} language={lang} />}
              {moduleNumber === 2 && ["theory","practice","cases","clinical"].includes(section) && (
                <section aria-label={lang === "RU" ? "Восстановленные материалы модуля 2" : lang === "EN" ? "Restored module 2 materials" : "2-модульдің қалпына келтірілген материалдары"} style={{marginTop:28}}>
                  <Module2Content section={section} language={lang} />
                </section>
              )}
              {section === 'theory' && moduleNumber === 2 && <EvokedAveragingLab language={lang} />}
              {(section === 'theory' || section === 'practice') && (
                <div id="theory-visuals">
                  <FoundationVisual moduleId={moduleNumber} language={lang} />
                  <AnatomyReference moduleId={moduleNumber} language={lang} />
                  <AdvancedAnatomyReference moduleId={moduleNumber} language={lang} />
                </div>
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
