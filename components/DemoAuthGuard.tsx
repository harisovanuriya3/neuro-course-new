"use client";
import {useEffect,useState} from "react";
import {usePathname,useRouter} from "next/navigation";
import {currentUser} from "../lib/demoAuth";
export default function DemoAuthGuard({children}:{children:React.ReactNode}){const path=usePathname(),r=useRouter(),[ok,setOk]=useState(path==="/login");useEffect(()=>{if(path==="/login"){setOk(true);return}if(!currentUser()){r.replace(`/login?next=${encodeURIComponent(path)}`);return}setOk(true)},[path,r]);return ok?<>{children}</>:null}