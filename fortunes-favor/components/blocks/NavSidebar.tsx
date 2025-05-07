"use client";

import { NavElement, NavSection } from "@/app/rules/layout";
import { isSmallWindow } from "@/utils/isSmallWindow";
import useWindowDimensions from "@/utils/useWindowDimensions";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useState, useEffect } from "react";
import FancyChevron from "../icons/FancyChevron";
import Button, { ButtonType } from "./Inputs/Button";
import Chevron from "../icons/Chevron";

const buttonUpStyle =
  "inline-flex items-center w-10 h-10 justify-center text-sm backdrop-blur-sm text-gray-500 rounded-lg md:hidden hover:bg-black/30 dark:hover:bg-black/60 focus:outline-none focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700/70 dark:focus:ring-gray-600";
const buttonDownStyle = buttonUpStyle + " rotate-180";

class partialPath {
  pathname!: string;
  hash?: string;
  constructor(pathname: string, hash?: string) {
    this.pathname = pathname[0] === "/" ? pathname : "/" + pathname;
    this.hash = hash;
  }
  isEqual(other: partialPath) {
    return this.pathname === other.pathname && this.hash === other.hash;
  }
  toString() {
    return this.pathname + (this.hash ? "#" + this.hash : "");
  }
}

const buildPartialPathFromStr = (str: string) => {
  const [pathname, hash] = str.split("#");
  return new partialPath(pathname, hash);
};

const mapNavToPartialPaths = (navMap: NavSection[]): partialPath[] => {
  const mappedPaths: partialPath[] = [];
  navMap.forEach((n) => {
    const partialPaths: partialPath[] = [];
    if (n.href) partialPaths.push(buildPartialPathFromStr(n.href));
    else if (n.basePath) partialPaths.push(buildPartialPathFromStr(n.basePath));
    if (n.subroutes) {
      n.subroutes.forEach((r) => {
        if (r.href) partialPaths.push(buildPartialPathFromStr(r.href));
      });
    }
    mappedPaths.push(...partialPaths);
  });
  return mappedPaths;
};

// with a list of partialPaths, use the current location to determine which one is current and return that partialPath.
const findCurrentPath = (
  partialPaths: partialPath[],
  currentLocation: Location,
) => {
  console.log(
    "location",
    currentLocation.pathname,
    partialPaths,
    currentLocation.hash,
  );
  if (currentLocation.hash) {
    const path = partialPaths.find(
      (p) =>
        p.pathname === currentLocation.pathname &&
        p.hash === currentLocation.hash,
    );
    if (path) return path;
  } else {
    const path = partialPaths.find(
      (p) => p.pathname === currentLocation.pathname,
    );
    if (path) return path;
  }
  return undefined;
};

// given a current document and list of partial paths, return the partial path that has an element within the top 1/4 of the screen or closest off the screen on the top.
const findCurrentPathOnScroll = (
  partialPaths: partialPath[],
  document: Document,
) => {
  let closestPath: partialPath | undefined;
  let closestLocation: number | undefined;

  partialPaths.forEach((path) => {
    if (!path.hash) return;
    const element = document.getElementById(path.hash);
    if (element) {
      const location = element.getBoundingClientRect().top;
      if (!closestLocation) {
        closestLocation = location;
        closestPath = path;
      } else if (
        location > closestLocation &&
        location < window.innerHeight / 4
      ) {
        closestLocation = location;
        closestPath = path;
      }
    }
  });
  // if a closestPath hasn't been found, look for a matching pathname and return that
  if (!closestPath) {
    closestPath = partialPaths.find(
      (p) => p.pathname === window.location.pathname,
    );
  }
  return closestPath;
};

const updateNavMap = (
  navMap: NavSection[],
  currentPath: partialPath | undefined,
): NavSection[] => {
  const updatedNavMap = navMap.map((n) => {
    return {
      ...n,
      isCurrent: currentPath?.isEqual(buildPartialPathFromStr(n.href || "")),
      subroutes: n.subroutes?.map((r) => {
        return {
          ...r,
          isCurrent: currentPath?.isEqual(
            buildPartialPathFromStr(r.href || ""),
          ),
        };
      }),
    };
  });

  return updatedNavMap;
};

type navProps = {
  navEl: NavElement;
  isSub?: boolean;
  closeMenuIfOpen: () => void;
};
export const NavElem = ({ navEl, isSub, closeMenuIfOpen }: navProps) => {
  return (
    <div key={navEl.title} className="w-fit">
      {navEl.href && (
        <div
          className={
            isSub
              ? navEl.isCurrent
                ? "border-l-amber-400 border-l hover:border-l-amber-700 dark:hover:border-l-amber-200"
                : "border-l-amber-700 border-l hover:border-l-amber-400 dark:hover:border-l-amber-500"
              : ""
          }
        >
          <Link
            href={navEl.href}
            className=""
            onClick={() => {
              closeMenuIfOpen();
            }}
          >
            <div
              className={
                navEl.isCurrent
                  ? "text-amber-600 dark:text-amber-300 text-lg text-ellipsis ml-3 hover:text-amber-700 dark:hover:text-amber-100 hover:mr-2"
                  : "font-light text-lg text-slate-800 dark:text-slate-200 hover:text-amber-700 dark:hover:text-amber-100 ml-3 mr-3 text-balance hover:font-normal hover:mr-2"
              }
            >
              {navEl.title}
            </div>
          </Link>
        </div>
      )}
    </div>
  );
};

type NavSectionProps = {
  navSection: NavSection;
  closeMenuIfOpen: () => void;
};
const NavSectionDisplay = ({
  navSection,
  closeMenuIfOpen,
}: NavSectionProps) => {
  return (
    <div>
      <div className="flex flex-row items-center">
        <NavElem
          navEl={{ ...navSection, href: navSection.basePath }}
          closeMenuIfOpen={closeMenuIfOpen}
          isSub={false}
        />
      </div>

      {navSection.subroutes && (
        <div className="mx-4">
          {navSection.subroutes.map((n) => (
            <NavElem
              key={n.slug}
              navEl={n}
              closeMenuIfOpen={closeMenuIfOpen}
              isSub={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const NavSidebar = ({ navMap }: { navMap: NavSection[] }) => {
  const { height, width } = useWindowDimensions();
  const pathname = usePathname();
  const router = useRouter();

  const navPaths = mapNavToPartialPaths(navMap);
  const [menuStyle, setMenuStyle] = useState("flex");
  const [menuVisible, setMenuVisible] = useState(true);
  const [buttonStyle, setButtonStyle] = useState(buttonUpStyle);
  const [currentPath, setCurrentPath] = useState(
    typeof window !== "undefined"
      ? findCurrentPath(navPaths, window.location)
      : undefined,
  );
  const [currentNavMap, setCurrentNavMap] = useState(
    updateNavMap(navMap, currentPath),
  );
  const [timeoutID, setTimeoutId] = useState<NodeJS.Timeout>();

  const handleScroll = () => {
    const closestPath = findCurrentPathOnScroll(navPaths, document);
    if (closestPath) setCurrentPath(closestPath);
  };
  const closeMenuIfOpen = () => {
    if (isSmallWindow(width)) {
      setMenuVisible(false);
      setButtonStyle(buttonUpStyle);
    }
  };

  useEffect(() => {
    if (!isSmallWindow(width)) {
      setMenuStyle("flex h-screen");
    } else {
      setMenuStyle("fixed flex items-start bottom-0");
      setMenuVisible(false);
    }
  }, [width]);

  // when the path changes, find the current path.
  useEffect(() => {
    let path = findCurrentPath(navPaths, window.location);
    if (!path) path = findCurrentPathOnScroll(navPaths, document);
    if (path) setCurrentPath(path);
  }, [pathname]);

  useEffect(() => {
    setCurrentNavMap(updateNavMap(navMap, currentPath));
  }, [currentPath]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", handleScroll);
      return () => window.removeEventListener("scroll", handleScroll);
    }
  });
  useEffect(() => {
    if (typeof timeoutID === "number") {
      clearTimeout(timeoutID);
    }
    const id = setTimeout(
      (path) => {
        if (!path || path.pathname !== pathname) return;
        router.replace(
          `${path.pathname}${window.location.search}${path.hash ? "#" + path.hash : ""}`,
          { scroll: false },
        );
      },
      500,
      currentPath,
    );
    setTimeoutId(id);
  }, [currentPath]);

  if (!currentNavMap) return;

  return (
    <div className={menuStyle}>
      <div className="flex-left flex-grow overflow-auto md:h-[calc(100vh-72px)] h-auto w-screen md:w-auto backdrop-blur-sm md:backdrop-blur-none ">
        {!isSmallWindow(width) ? (
          <></>
        ) : (
          <div className="flex flex-row justify-center items-center bg-black/50 border-t-2 border-b-2 border-teal-400/50 md:bg-transparent">
            <button
              type="button"
              className={buttonStyle}
              aria-controls="navbar-links"
              aria-expanded="false"
              onClick={() => {
                setMenuVisible(!menuVisible);
                setButtonStyle(!menuVisible ? buttonDownStyle : buttonUpStyle);
              }}
            >
              <span className="sr-only">Open main menu</span>
              <svg
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="hover:-translate-y-1"
              >
                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                <g
                  id="SVGRepo_tracerCarrier"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></g>
                <g id="SVGRepo_iconCarrier">
                  {" "}
                  <path
                    d="M17.657 11.2929L16.2428 12.7071L12.0002 8.46444L7.75748 12.7071L6.34326 11.2929L12.0001 5.63605L17.657 11.2929Z"
                    className="fill-amber-400"
                  ></path>{" "}
                  <path
                    d="M17.657 16.9497L16.2428 18.3639L12.0002 14.1213L7.75748 18.364L6.34326 16.9498L12.0001 11.2929L17.657 16.9497Z"
                    className="fill-amber-200"
                  ></path>{" "}
                </g>
              </svg>
            </button>
          </div>
        )}

        {menuVisible && (
          <aside
            id="sidebar-multi-level-sidebar"
            className="z-40 w-full md:w-64 bg-slate-200 dark:bg-slate-950 p-4 md:h-full sticky overflow-y-auto h-[calc(100vh-120px)]"
            aria-label="Sidebar"
          >
            <div className="flex-col my-5">
              {currentNavMap.map((n) => {
                return (
                  <div key={n.title} className="flex flex-col">
                    <NavSectionDisplay
                      navSection={n}
                      closeMenuIfOpen={closeMenuIfOpen}
                    />
                  </div>
                );
              })}
            </div>
          </aside>
        )}
      </div>
    </div>
  );
};

export default NavSidebar;
