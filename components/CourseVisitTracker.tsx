"use client";

import { useEffect } from "react";
import type { Section } from "../content/sections";
import { recordVisit } from "../lib/courseProgress";

export default function CourseVisitTracker({ moduleId, section }: { moduleId: number; section?: Section }) {
  useEffect(() => { recordVisit(moduleId, section); }, [moduleId, section]);
  return null;
}
