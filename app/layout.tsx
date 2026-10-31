import { Suspense } from "react";
import StudyToolbar from "../components/StudyToolbar";
import StudyTimer from "./StudyTimer";
import { headers } from "next/headers";

export const metadata = {
  title: "Интерактивный учебник по нейрофизиологии",
  description: "Интерактивный учебник по нейрофизиологии: теория, виртуальные лаборатории, клинические задачи, виртуальные пациенты и формирующее оценивание.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const language = (await headers()).get("x-course-language");
  return (
    <html lang={language === "en" || language === "kk" ? language : "ru"}>
      <body><Suspense fallback={null}><StudyToolbar /></Suspense>
        {children}
        <StudyTimer />
      </body>
    </html>
  );
}
