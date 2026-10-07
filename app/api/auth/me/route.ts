import {cookies} from "next/headers";import {NextResponse} from "next/server";import {readSession,sessionCookie} from "../../../../lib/serverAuth";
export async function GET(){const c=await cookies();const user=readSession(c.get(sessionCookie.name)?.value);return user?NextResponse.json({user}):NextResponse.json({user:null},{status:401});}
