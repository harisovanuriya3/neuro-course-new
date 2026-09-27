import { NextResponse, type NextRequest } from "next/server";
import { htmlLanguage, normalizeLanguage } from "./lib/interface";

export function proxy(request: NextRequest) {
  const headers = new Headers(request.headers);
  headers.set("x-course-language", htmlLanguage[normalizeLanguage(request.nextUrl.searchParams.get("lang"))]);
  return NextResponse.next({ request: { headers } });
}

export const config = { matcher: ["/", "/modules/:path*", "/modules-dynamic/:path*"] };
