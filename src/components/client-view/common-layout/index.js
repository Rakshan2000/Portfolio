'use client'

import { usePathname } from "next/navigation"
import NavBar from "@/components/navbar";

export default function CommonLayout ({children}){

    const pathName = usePathname();
    return <>
    {pathName != '/admin' ? <NavBar/> : null }
    {children}
    </>

}