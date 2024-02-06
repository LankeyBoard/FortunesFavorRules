'use client'
import Link from "next/link";
import { nav } from "@/app/rules/layout";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import resolveConfig from 'tailwindcss/resolveConfig'
import tailwindConfig from '@/tailwind.config'

type navProps = {
    navEl: nav,
    isSub?: boolean
}
const fullConfig = resolveConfig(tailwindConfig);

export const NavElem = ({navEl, isSub} : navProps) => {
    const path = usePathname();
    let isCurrent = false;
    if(path === navEl.href){
        isCurrent = true;
    }
    return(
        <div key={navEl.title}>
            {(navEl.href && !isCurrent) 
            ?
                <div className={isSub?"border-l-amber-700 border-l":""}>   
                    <Link href={navEl.href} className="font-light text-lg hover:tracking-wide whitespace-nowrap">
                        <div className={"font-light text-lg text-slate-200 hover:tracking-wide hover:text-amber-100 whitespace-nowrap ml-3"}>
                            {navEl.title}
                        </div>
                    </Link>
                </div>
            :   
                <div className={isCurrent && isSub ?"border-l-amber-500 border-l":""}>
                    <div className={isCurrent?"text-amber-300 text-lg text-ellipsis whitespace-nowrap ml-3": "font-medium text-xl text-white text-ellipsis whitespace-nowrap"}>
                        {navEl.title}
                    </div>
                </div>
            }
            <div className="mx-2">
                {navEl.subroutes?.map((r) => {
                    return <NavElem navEl={r} isSub={true} key={r.title}/>
                })}
            </div>        
        </div>
    )
}

const NavMenu = ({navMap}: {navMap: nav[]}) => {
    return(
        <div className="flex-left">
            <aside id="sidebar-multi-level-sidebar" className="z-40 w-64 h-screen bg-slate-950 p-4" aria-label="Sidebar">
                <div className="flex-col my-5">
                    {navMap.map(n => {
                        return(
                            <NavElem navEl={n} key={n.title}/>);
                    })}
                </div>     
            </aside>
        </div>
    )
}

const isSmallWindow = (windowWidth: number) => {
    console.log("IS small window", window.innerWidth <= Number(fullConfig.theme.screens.sm.slice(0,-2)))
    return(windowWidth <= Number(fullConfig.theme.screens.sm.slice(0,-2)));
}

const RulesNav = ({navMap}: {navMap: nav[]}) => {
    

    const [windowWidth, setWindowWidth] = useState(0);
    const [menuVisible, setMenuVisible] = useState(!isSmallWindow(windowWidth));
    const [menuStyle, setMenuStyle] = useState("flex");
    useEffect(()=> {
        console.log("WINDOW SIZE = ", window.innerWidth, fullConfig.theme.screens.sm.slice(0,-2));
        if(!isSmallWindow(window.innerWidth)){
            console.log("Not small")
            setMenuStyle("flex");
            setMenuVisible(true);
        }
        else{
            console.log("Small")
            setMenuStyle("fixed flex");
            setMenuVisible(false)
        }
        setWindowWidth(window.innerWidth);
    },[window]);
    
    return(
        <div className={menuStyle}>
            {menuVisible && 
                <NavMenu navMap={navMap}/>
            }
            {(isSmallWindow(windowWidth) || !menuVisible)&&
                <div className="flex-left z-50">
                    <button aria-controls="sidebar-multi-level-sidebar" type="button" onClick={()=> setMenuVisible(!menuVisible)} className="items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
                        <span className="sr-only">Open sidebar</span>
                        <svg className="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path clipRule="evenodd" fillRule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"></path>
                        </svg>
                    </button>
                </div>
            }
        </div>
    )
}

export default RulesNav;