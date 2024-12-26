"use client";
import Link from "next/link";
import { nav } from "@/app/rules/layout";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import useWindowDimensions from "@/utils/useWindowDimensions";
import { isSmallWindow } from "@/utils/isSmallWindow";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

type partialPath = {
  pathname: string;
  search?: URLSearchParams;
  hash?: string;
}

const isHrefInPath = (partialPath: partialPath, navHref: string): boolean => {
  const splitHref = navHref.split('#');
  if(splitHref.length > 1 && partialPath.hash){
    if(partialPath.pathname===splitHref[0] && partialPath.hash.includes(splitHref[1])) return true;
    else return false;
  }
  else if(partialPath.pathname === splitHref[0] && !partialPath.hash && splitHref.length === 1) return true;
  return false;
}

const partialPathToStr = (partialPath: partialPath | undefined): string => {
  if(!partialPath) return '';
  else if(partialPath.search && partialPath.hash){
    return partialPath.pathname + partialPath.search.toString() + partialPath.hash.includes('#') ? partialPath.hash : '#' + partialPath.hash;
  }
  else if(partialPath.hash){
    return partialPath.pathname + partialPath.hash.includes('#') ? partialPath.hash : '#' + partialPath.hash;
  }
  else if(partialPath.search){
    return partialPath.pathname + partialPath.search.toString();
  }
  else{
    return partialPath.pathname;
  }
}

const strToPartialPath = (str: string): partialPath | undefined => {
  const splitHref = str?.split('#');
  if(!str) return undefined;
  const searchStartIndex = splitHref[0].indexOf('?');
  const pathname = splitHref[0].substring(0,searchStartIndex);
  const search = new URLSearchParams(splitHref[0].slice(searchStartIndex));
  if (splitHref.length === 1){
    return (
      {
        pathname: pathname,
        search: search
      }
    );
  }
  
  else return(
    {
      pathname: pathname,
      search: search,
      hash: '#'+splitHref[1]
    }
  )

}

const arePathsEqual = (p1?: partialPath, p2?: partialPath): boolean => {
  if(!p1 || !p2) return false;
  if(p1.pathname === p2.pathname && p1.hash === p2.hash)
    return true;
  return false;
}

type navProps = {
  navEl: nav;
  isSub?: boolean;
  closeMenuIfOpen: () => void;
  isCurrent: boolean;
  path: partialPath;
  setPath: Dispatch<SetStateAction<partialPath | undefined>>;
};

export const NavElem = ({
  navEl,
  isSub,
  closeMenuIfOpen,
  isCurrent,
  path,
  setPath,
}: navProps) => {
  if(navEl.href && isHrefInPath(path, navEl.href))
    isCurrent = true;
  return (
    <div key={navEl.title} className="">
      {navEl.href && 
        <div
          className={
            isSub
              ?  isCurrent? "border-l-amber-400 border-l hover:border-l-amber-700 dark:hover:border-l-amber-200": "border-l-amber-700 border-l hover:border-l-amber-400 dark:hover:border-l-amber-500"
              : ""
          }
        >
          <Link
            href={navEl.href}
            className=""
            onClick={() => {
              setPath(strToPartialPath(navEl.href || ""));
              closeMenuIfOpen();
            }}
          >
            <div
              className={
                isCurrent
                ? "text-amber-600 dark:text-amber-300 text-lg text-ellipsis ml-3 hover:text-amber-700 dark:hover:text-amber-100 hover:mr-0" 
                : "font-light text-lg text-slate-800 dark:text-slate-200 hover:text-amber-700 dark:hover:text-amber-100 ml-3 mr-3 text-balance hover:font-normal hover:mr-0"
              }
            >
              {navEl.title}
            </div>
          </Link>
        </div>
      }
      <div className="mx-2">
        {navEl.subroutes?.map((r) => {
          return (
            <NavElem
              navEl={r}
              isSub={true}
              key={r.title}
              closeMenuIfOpen={closeMenuIfOpen}
              isCurrent={arePathsEqual(strToPartialPath(r.href || ''), path)}
              path={path}
              setPath={setPath}
            />
          );
        })}
      </div>
    </div>
  );
};

const NavMenu = ({ navMap }: { navMap: nav[] }) => {
  const { height, width } = useWindowDimensions();
  const [menuVisible, setMenuVisible] = useState(true);
  const [path, setPath] = useState<partialPath>();
  const pathCheck = usePathname()
  const navMapper = (map: nav[]) => {
    console.debug("navMapper map: ", map, typeof document)
    let navIdMap: {[key: string]: {id: string, loc: number}} = {}
    map.forEach(navEl => {
      if(navEl.subroutes){
        const idMap = navMapper(navEl.subroutes);
        const keys = Object.keys(idMap);
        keys.forEach(key => {
          navIdMap[key] = {id: idMap[key].id, loc: idMap[key].loc}
        })
      }
        
      if(navEl.href && navEl.href.includes("#")){
        if(typeof document === "undefined")
          return;
        const elemId = navEl.href.slice(navEl.href.indexOf("#")+1);
        const element = document.getElementById(elemId);

        if(elemId && element){
            navIdMap[navEl.href] = {
            id: elemId,
            loc: element.getBoundingClientRect().top
          }
          console.debug("added ", elemId, navIdMap[navEl.href])
        }
      }})
      console.debug("navId at end of navMapper", navIdMap)
      return navIdMap;
    }
  const [navIdMap, setNavIdMap] = useState(navMapper(navMap));
  const router = useRouter();

  const buttonUpStyle = "inline-flex items-center w-10 h-10 justify-center text-sm backdrop-blur-sm text-gray-500 rounded-lg md:hidden hover:bg-black/30 dark:hover:bg-black/60 focus:outline-none focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700/70 dark:focus:ring-gray-600";
  const buttonDownStyle = buttonUpStyle + " rotate-180";
  
  const [buttonStyle, setButtonStyle] = useState(buttonUpStyle);
  useEffect(() => {
    if (!isSmallWindow(width)) {
      setMenuVisible(true);
    } else {
      setMenuVisible(false);
    }
  }, [width]);

  useEffect(() => {
    if(typeof window !== undefined){
        window.addEventListener('scroll', handleScroll);
        console.debug("current href from NavMenu useEffect:", window.location.pathname + window.location.search + window.location.hash, navIdMap);
        if(Object.keys(navIdMap).length === 0){
          console.debug("no valid navIdMap, setting path to ", window.location.pathname + window.location.search + window.location.hash);
          setPath({pathname: window.location.pathname, search: new URLSearchParams(window.location.search), hash: window.location.hash})
          setNavIdMap(navMapper(navMap))
        }
        if(path === undefined)
          setPath({pathname: window.location.pathname, hash: window.location.hash});
        return () => window.removeEventListener('scroll', handleScroll);
    }
  });

  useEffect(()=>{
    console.debug("update map when path changes");
    setNavIdMap(navMapper(navMap));
  }, [pathCheck])

  function findClosestHref(): partialPath | undefined {
    //update id locations
    for (const [key, elem] of Object.entries(navIdMap)) {
      const element = document.getElementById(elem.id);
      if(element)
        navIdMap[key].loc = element.getBoundingClientRect().top
    }
    let closestHref = undefined;
    //find the id with the lowest negative current top
    for (const [key, elem] of Object.entries(navIdMap)) {
      if(!window.location.toString().includes(key.slice(0,key.indexOf('#')))){
        console.warn("key not on screen");
        break;
      }
      if(!closestHref)
        closestHref = key;
      if(elem.loc < 300 && elem.loc > navIdMap[closestHref].loc )
        closestHref = key;
      
    }
    const splitHref = closestHref?.split('#');
    if(!splitHref) return undefined;
    else if (splitHref.length === 1)
    return (
      {pathname: splitHref[0]}
    );
    else return(
      {
        pathname: splitHref[0],
        hash: '#'+splitHref[1]
      }
    )
  }
  const handleScroll = () => {
    const closestHref = findClosestHref()
    if(closestHref !== path && closestHref){
      console.info("scroll replacing route", closestHref);
      const newPath: partialPath = {...closestHref, search: path?.search};
      const newPathStr: string = partialPathToStr(newPath);
      console.log(newPath, newPathStr)
      setPath(newPath);
      router.replace(newPathStr, {scroll: false})
    }
  }
  const closeMenuIfOpen = () => {
    if (isSmallWindow(width)) {
      setMenuVisible(false);
      setButtonStyle(buttonUpStyle);
    }
  };
  console.debug("path at render: ", path)
  if(typeof window === undefined || path === undefined) return;
  return (
    <div className="flex-left flex-grow overflow-auto md:h-[calc(100vh-72px)] h-auto w-screen md:w-auto backdrop-blur-sm md:backdrop-blur-none ">
      {!isSmallWindow(width)? <></> :
        <div className="flex flex-row justify-center items-center bg-black/50 border-t-2 border-b-2 border-teal-400/50 md:bg-transparent">
          <button
            type="button"
            className={buttonStyle}
            aria-controls="navbar-links"
            aria-expanded="false"
            onClick={() => {
              setMenuVisible(!menuVisible);
              setButtonStyle(!menuVisible? buttonDownStyle: buttonUpStyle)
            }}
          >
            <span className="sr-only">Open main menu</span>
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" className="hover:-translate-y-1"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17.657 11.2929L16.2428 12.7071L12.0002 8.46444L7.75748 12.7071L6.34326 11.2929L12.0001 5.63605L17.657 11.2929Z" className="fill-amber-400"></path> <path d="M17.657 16.9497L16.2428 18.3639L12.0002 14.1213L7.75748 18.364L6.34326 16.9498L12.0001 11.2929L17.657 16.9497Z" className="fill-amber-200"></path> </g></svg>
          </button>
        </div>
      }
      {menuVisible && (
        <aside
          id="sidebar-multi-level-sidebar"
          className="z-40 w-full md:w-64 bg-slate-200 dark:bg-slate-950 p-4 md:h-full sticky overflow-y-auto h-[calc(100vh-120px)]"
          aria-label="Sidebar"
        >
          <div className="flex-col my-5">
            {navMap.map((n) => {
              console.debug(n.href)
              return (
                <NavElem
                  navEl={n}
                  key={n.title}
                  closeMenuIfOpen={closeMenuIfOpen}
                  isCurrent={n.href ? isHrefInPath(path, n.href) : false}
                  path={path}
                  setPath={setPath}
                />
              );
            })}
          </div>
        </aside>
      )}
    </div>
  );
};

const RulesNav = ({ navMap }: { navMap: nav[] }) => {
  const { height, width } = useWindowDimensions();
  const [menuStyle, setMenuStyle] = useState("flex");

  useEffect(() => {
    if (!isSmallWindow(width)) {
      setMenuStyle("flex h-screen");
    } else {
      setMenuStyle("fixed flex items-start bottom-0");
    }
  }, [width]);

  return (
    <div className={menuStyle}>
      <NavMenu navMap={navMap} />
    </div>
  );
};

export default RulesNav;
