import { NextRequest, NextResponse } from "next/server";
import { searchCourse } from "../../../lib/courseSearch";

export function GET(request: NextRequest) {
  const query = (request.nextUrl.searchParams.get("q") ?? "").slice(0, 160);
  const requested = request.nextUrl.searchParams.get("lang");
  const language = requested === "EN" || requested === "KZ" ? requested : "RU";
  return NextResponse.json({ results: searchCourse(query, language) });
}
