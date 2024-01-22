'use client'
import Link from "next/link";
import { usePathname } from "next/navigation";

const cleanPath = (path: string) => {
    const i = path.lastIndexOf("/");
    return(path.substring(i+1));
}

export const NavElem = ({directory}: {directory: string}) => {
    const path = cleanPath(usePathname());
    let isCurrent = false;
    let name = cleanPath(directory);
    console.log(name + " - " + path);
    if(path === name){
        isCurrent = true;
    }
    name = name.split("_").map(word => {
        return word[0].toUpperCase() + word.substring(1);
    }).join(" ")
    return(
        <Link href={"./"+directory}>
            <div className={isCurrent?"font-medium text-xl text-amber-300 text-ellipsis whitespace-nowrap" :"font-light text-lg hover:tracking-wide hover: text-amber-100 whitespace-nowrap"}>
                {name}
            </div>
        </Link>
    )
}

const RulesNav = ({directories}: {directories: string[]}) => {
    return(
        <div className="flex-col my-5">
            {directories.map(dir => {
                return(
                    <NavElem directory={dir}/>);
            })}     
        </div>
    )
}

export default RulesNav;