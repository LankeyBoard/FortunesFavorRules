"use client";

import { NavElement, NavSection } from "@/app/rules/layout";
import { isSmallWindow } from "@/utils/isSmallWindow";
import useWindowDimensions from "@/utils/useWindowDimensions";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useState, useEffect } from "react";
import DoubleChevron from "../icons/DoubleChevron";
import buildPartialPathFromStr, {
  partialPath,
} from "@/utils/buildPartialPathFromStr";

const buttonUpStyle =
  "inline-flex items-center w-10 h-10 justify-center text-sm backdrop-blur-sm text-gray-500 rounded-lg md:hidden hover:bg-black/30 dark:hover:bg-black/60 focus:outline-none focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700/70 dark:focus:ring-gray-600";
const buttonDownStyle = buttonUpStyle + " rotate-180";

const mapNavToPartialPaths = (
  navMap: NavSection[],
  mapTopLevel: boolean,
): partialPath[] => {
  const mappedPaths: partialPath[] = [];
  navMap.forEach((n) => {
    const partialPaths: partialPath[] = [];
    if (n.href) partialPaths.push(buildPartialPathFromStr(n.href));
    else if (n.basePath) partialPaths.push(buildPartialPathFromStr(n.basePath));
    if (n.subroutes && !mapTopLevel) {
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
  highlightTopLevel: boolean = false,
): NavSection[] => {
  const updatedNavMap = navMap.map((n) => {
    return {
      ...n,
      isCurrent: currentPath?.isEqual(buildPartialPathFromStr(n.href || "")),
      subroutes: n.subroutes?.map((r) => {
        return {
          ...r,
          isCurrent: highlightTopLevel
            ? false
            : currentPath?.isEqual(buildPartialPathFromStr(r.href || "")),
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
          navEl={{ ...navSection, href: navSection.href }}
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

const NavSidebar = ({
  navMap,
  highlightTopLevel = false,
}: {
  navMap: NavSection[];
  highlightTopLevel?: boolean;
}) => {
  const { height, width } = useWindowDimensions();
  const pathname = usePathname();
  const router = useRouter();

  const navPaths = mapNavToPartialPaths(navMap, highlightTopLevel);
  const [menuStyle, setMenuStyle] = useState("flex");
  const [menuVisible, setMenuVisible] = useState(true);
  const [buttonStyle, setButtonStyle] = useState(buttonUpStyle);
  const [currentPath, setCurrentPath] = useState(
    typeof window !== "undefined"
      ? findCurrentPath(navPaths, window.location)
      : undefined,
  );
  const [currentNavMap, setCurrentNavMap] = useState(
    updateNavMap(navMap, currentPath, highlightTopLevel),
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
    setCurrentNavMap(updateNavMap(navMap, currentPath, highlightTopLevel));
  }, [currentPath, highlightTopLevel]);

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
            <span className="text-sm tracking-wider text-slate-900 dark:text-slate-300 mr-2">
              {menuVisible ? "Hide" : "Show"}
            </span>
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
              <div className="h-10 flex flex-row justify-items-center hover:opacity-70">
                <span className="sr-only">Open navigation menu</span>

                <DoubleChevron className="h-auto" />
              </div>
            </button>
            <span className="text-sm tracking-wider text-slate-900 dark:text-slate-300 ml-2">
              Menu
            </span>
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
