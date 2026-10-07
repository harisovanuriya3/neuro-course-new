import {NextResponse} from "next/server";
import {sessionCookie} from "../../../../lib/serverAuth";
export async function POST(){const r=NextResponse.json({ok:true});r.cookies.set(sessionCookie.name,"",{...sessionCookie.options,maxAge:0});return r;}
