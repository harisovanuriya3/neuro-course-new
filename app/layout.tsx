import { headers } from "next/headers";
import DemoAuthGuard from "../components/DemoAuthGuard";

export const metadata = {
  title: "Neuro Course",
  description: "Учебный проект на Next.js",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const language = (await headers()).get("x-course-language");
  return (
    <html lang={language === "en" || language === "kk" ? language : "ru"}>
      <body>
        <DemoAuthGuard>{children}</DemoAuthGuard>
      </body>
    </html>
  );
}
