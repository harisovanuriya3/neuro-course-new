import {createHmac,timingSafeEqual} from "crypto";
export type UserRole="student"|"teacher";
export type SessionUser={username:string;role:UserRole;displayName:string};
const COOKIE="neuro_session";
const secret=()=>process.env.AUTH_SECRET||"";
function sig(v:string){return createHmac("sha256",secret()).update(v).digest("base64url")}
export function makeSession(user:SessionUser){if(!secret())throw new Error("AUTH_SECRET is not configured");const payload=Buffer.from(JSON.stringify(user)).toString("base64url");return payload+"."+sig(payload)}
export function readSession(raw?:string|null):SessionUser|null{try{if(!raw||!secret())return null;const [p,s]=raw.split(".");if(!p||!s)return null;const a=Buffer.from(sig(p)),b=Buffer.from(s);if(a.length!==b.length||!timingSafeEqual(a,b))return null;const u=JSON.parse(Buffer.from(p,"base64url").toString());return u&&(u.role==="student"||u.role==="teacher")?u:null}catch{return null}}
export function authenticate(username:string,password:string):SessionUser|null{
 const users=[
  {username:process.env.STUDENT_USERNAME||"",password:process.env.STUDENT_PASSWORD||"",role:"student" as const,displayName:process.env.STUDENT_NAME||"Student"},
  {username:process.env.TEACHER_USERNAME||"",password:process.env.TEACHER_PASSWORD||"",role:"teacher" as const,displayName:process.env.TEACHER_NAME||"Teacher"}
 ];
 const u=users.find(x=>x.username&&x.password&&x.username===username.trim()&&x.password===password);
 return u?{username:u.username,role:u.role,displayName:u.displayName}:null;
}
export const sessionCookie={name:COOKIE,options:{httpOnly:true,secure:process.env.NODE_ENV==="production",sameSite:"lax" as const,path:"/",maxAge:60*60*12}};
