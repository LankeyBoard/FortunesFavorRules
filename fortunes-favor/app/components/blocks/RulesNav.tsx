"use client";
import Link from "next/link";
import { nav } from "@/app/rules/layout";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import useWindowDimensions from "@/app/utils/useWindowDimensions";
import { isSmallWindow } from "@/app/utils/isSmallWindow";

type navProps = {
  navEl: nav;
  isSub?: boolean;
  closeMenuIfOpen: () => void;
  path: string;
  setPath: Dispatch<SetStateAction<string>>;
};

export const NavElem = ({
  navEl,
  isSub,
  closeMenuIfOpen,
  path,
  setPath,
}: navProps) => {
  let isCurrent = false;
  if (path === navEl.href) {
    isCurrent = true;
  }
  return (
    <div key={navEl.title} className="">
      {navEl.href && !isCurrent ? (
        <div
          className={
            isSub
              ? "border-l-amber-700 border-l hover:border-l-amber-400 dark:hover:border-l-amber-500"
              : ""
          }
        >
          <Link
            href={navEl.href}
            className=""
            onClick={() => {
              setPath(navEl.href || "");
              closeMenuIfOpen();
            }}
          >
            <div
              className={
                "font-light text-lg text-slate-800 dark:text-slate-200 hover:text-amber-700 dark:hover:text-amber-100 ml-3 mr-3 text-balance hover:font-normal hover:mr-0"
              }
            >
              {navEl.title}
            </div>
          </Link>
        </div>
      ) : (
        <div
          className={isCurrent && isSub ? "border-l-amber-400 border-l" : ""}
        >
          <div
            className={
              isCurrent
                ? "text-amber-600 dark:text-amber-300 text-lg text-ellipsis ml-3"
                : "font-medium text-xl dark:text-white text-ellipsis whitespace-nowrap"
            }
          >
            {navEl.title}
          </div>
        </div>
      )}
      <div className="mx-2">
        {navEl.subroutes?.map((r) => {
          return (
            <NavElem
              navEl={r}
              isSub={true}
              key={r.title}
              closeMenuIfOpen={closeMenuIfOpen}
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
  const [path, setPath] = useState(
    typeof window !== "undefined" ? window.Location.toString() : ""
  );
  const buttonUpStyle = "inline-flex items-center w-10 h-10 justify-center text-sm backdrop-blur-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100/70 focus:outline-none focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700/70 dark:focus:ring-gray-600";
  const buttonDownStyle = "inline-flex items-center w-10 h-10 justify-center text-sm backdrop-blur-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100/70 focus:outline-none focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700/70 dark:focus:ring-gray-600 rotate-180";
  
  const [buttonStyle, setButtonStyle] = useState(buttonUpStyle);
  
  useEffect(() => {
    if (!isSmallWindow(width)) {
      setMenuVisible(true);
    } else {
      setMenuVisible(false);
    }
  }, [width]);
  const closeMenuIfOpen = () => {
    if (isSmallWindow(width)) {
      setMenuVisible(false);
      setButtonStyle(buttonUpStyle);
    }
  };
  return (
    <div className="flex-left flex-grow overflow-auto md:h-[calc(100vh-72px)] h-auto w-screen md:w-auto backdrop-blur-sm md:backdrop-blur-none ">
      {isSmallWindow(width) && 
        <div className="flex flex-row justify-center items-center bg-black/30 border-t-2 border-b-2 border-teal-400/50 md:bg-transparent">
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
            <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M17.657 11.2929L16.2428 12.7071L12.0002 8.46444L7.75748 12.7071L6.34326 11.2929L12.0001 5.63605L17.657 11.2929Z" className="fill-amber-400"></path> <path d="M17.657 16.9497L16.2428 18.3639L12.0002 14.1213L7.75748 18.364L6.34326 16.9498L12.0001 11.2929L17.657 16.9497Z" className="fill-amber-200"></path> </g></svg>
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
              return (
                <NavElem
                  navEl={n}
                  key={n.title}
                  closeMenuIfOpen={closeMenuIfOpen}
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
