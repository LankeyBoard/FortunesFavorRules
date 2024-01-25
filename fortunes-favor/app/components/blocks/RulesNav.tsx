'use client'
import Link from "next/link";
import { nav } from "@/app/layout";
import { usePathname } from "next/navigation";

type navProps = {
    navEl: nav,
    isSub?: boolean
}

export const NavElem = ({navEl, isSub} : navProps) => {
    const path = usePathname();
    console.log("path - ", path)
    let isCurrent = false;

    if(path === navEl.href){
        isCurrent = true;
    }
    return(
        <div>
            {(navEl.href && !isCurrent) 
            ?
                <div className={isSub?"border-l-amber-700 border-l":""}>   
                    <Link href={navEl.href} className="font-light text-lg hover:tracking-wide hover: text-amber-100 whitespace-nowrap">
                        <div className={"font-light text-lg hover:tracking-wide hover: text-amber-100 whitespace-nowrap ml-3"}>
                            {navEl.title}
                        </div>
                    </Link>
                </div>
            :   
                <div className={isCurrent && isSub ?"border-l-amber-500 border-l":""}>
                    <div className={isCurrent?"text-amber-300 text-lg text-ellipsis whitespace-nowrap ml-3": "font-medium text-xl text-teal-300 text-ellipsis whitespace-nowrap"}>
                        {navEl.title}
                    </div>
                </div>
            }
            <div className="mx-2">
                {navEl.subroutes?.map((r) => {
                    return <NavElem navEl={r} isSub={true}/>
                })}
            </div>
        
        </div>
    )
}

const RulesNav = ({navMap}: {navMap: nav[]}) => {
    return(
        <div className="flex-col my-5">
            {navMap.map(n => {
                return(
                    <NavElem navEl={n}/>);
            })}     
        </div>
    )
}

export default RulesNav;