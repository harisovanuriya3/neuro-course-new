"use client";
export type DemoRole="student"|"teacher";
export type DemoUser={username:string;role:DemoRole;displayName:string};
const KEY="neuro-course:demo-user:v1";
const USERS=[{username:"student01",password:"Demo2026!",role:"student" as const,displayName:"Student 01"},{username:"teacher01",password:"Demo2026!",role:"teacher" as const,displayName:"Teacher 01"}];
export function signIn(username:string,password:string):DemoUser|null{const u=USERS.find(x=>x.username===username.trim()&&x.password===password);if(!u)return null;const user={username:u.username,role:u.role,displayName:u.displayName};localStorage.setItem(KEY,JSON.stringify(user));return user}
export function currentUser():DemoUser|null{try{const x=JSON.parse(localStorage.getItem(KEY)||"null");return x&&(x.role==="student"||x.role==="teacher")?x:null}catch{return null}}
export function signOut(){localStorage.removeItem(KEY)}
