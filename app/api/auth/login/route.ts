import {NextResponse} from "next/server";
import {authenticate,makeSession,sessionCookie} from "../../../../lib/serverAuth";
export async function POST(req:Request){const {username,password}=await req.json().catch(()=>({}));if(typeof username!=="string"||typeof password!=="string")return NextResponse.json({error:"Invalid request"},{status:400});const user=authenticate(username,password);if(!user)return NextResponse.json({error:"Invalid credentials"},{status:401});const res=NextResponse.json({user});res.cookies.set(sessionCookie.name,makeSession(user),sessionCookie.options);return res;}
