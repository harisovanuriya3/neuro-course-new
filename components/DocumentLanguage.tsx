"use client";

import { useEffect } from "react";
import type { Language } from "../content/course";
import { htmlLanguage } from "../lib/interface";

// Root layouts persist during client navigation; update the document as well.
export default function DocumentLanguage({ language }: { language: Language }) {
  useEffect(() => { document.documentElement.lang = htmlLanguage[language]; }, [language]);
  return null;
}
