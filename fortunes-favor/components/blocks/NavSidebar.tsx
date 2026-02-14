"use client";

import { NavElement, NavSection } from "@/app/rules/layout";
import { isSmallWindow } from "@/utils/isSmallWindow";
import useWindowDimensions from "@/utils/useWindowDimensions";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { useState, useEffect } from "react";
import DoubleChevron from "../icons/DoubleChevron";
import Chevron from "../icons/Chevron";
import Button, { ButtonType } from "./Inputs/Button";

const buttonUpStyle =
  "inline-flex items-center w-10 h-10 justify-center text-sm backdrop-blur-sm text-gray-500 rounded-lg md:hidden hover:bg-black/30 dark:hover:bg-black/60 focus:outline-none focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700/70 dark:focus:ring-gray-600 p-0";
const buttonDownStyle = buttonUpStyle + " rotate-180";

class PartialPath {
  pathname!: string;
  hash?: string;
  constructor(pathname: string, hash?: string) {
    this.pathname = pathname[0] === "/" ? pathname : "/" + pathname;
    this.hash = hash;
  }
  isEqual(other: PartialPath) {
    return this.pathname === other.pathname && this.hash === other.hash;
  }
  toString() {
    return this.pathname + (this.hash ? "#" + this.hash : "");
  }
}

const buildPartialPathFromStr = (str: string) => {
  const [pathname, hash] = str.split("#");
  return new PartialPath(pathname, hash);
};

const mapNavToPartialPaths = (
  navMap: NavSection[],
  mapTopLevel: boolean,
): PartialPath[] => {
  const mappedPaths: PartialPath[] = [];
  navMap.forEach((n) => {
    const partialPaths: PartialPath[] = [];
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
  partialPaths: PartialPath[],
  currentLocation: Location,
) => {
  if (currentLocation.hash) {
    const path = partialPaths.find(
      (p) =>
        p.pathname === currentLocation.pathname &&
        (p.hash === currentLocation.hash ||
          p.hash === currentLocation.hash.slice(1)),
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
  partialPaths: PartialPath[],
  document: Document,
) => {
  if (typeof window === "undefined") return undefined;
  let closestPath: PartialPath | undefined;
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
  currentPath: PartialPath | undefined,
  highlightOnlyTopLevel: boolean = false,
): NavSection[] => {
  const updatedNavMap = navMap.map((n) => {
    const subRoutes = n.subroutes?.map((r) => {
      return {
        ...r,
        isCurrent: highlightOnlyTopLevel
          ? false
          : currentPath?.isEqual(buildPartialPathFromStr(r.href || "")),
      };
    });
    const isSubrouteCurrent = subRoutes
      ? subRoutes.some((subRoute) => subRoute.isCurrent)
      : false;
    const shouldHighlight: boolean =
      currentPath?.isEqual(buildPartialPathFromStr(n.href || "")) ||
      isSubrouteCurrent;
    return {
      ...n,
      subroutes: subRoutes,
      isCurrent: shouldHighlight,
    };
  });

  return updatedNavMap;
};

const findNavElementTitle = (
  navMap: NavSection[],
  currentPath: PartialPath | undefined,
): string | undefined => {
  if (!currentPath) return undefined;
  for (const section of navMap) {
    // Check subroutes
    if (section.subroutes) {
      for (const subroute of section.subroutes) {
        if (currentPath.toString() === subroute.href) {
          return subroute.title;
        }
      }
    }
    // Check if section matches
    if (currentPath.toString() === section.href) {
      return section.title;
    }
  }

  return undefined;
};

const findNavSectionTitleByPathname = (
  navMap: NavSection[],
  pathname: string,
): string | undefined => {
  for (const section of navMap) {
    // Check if section matches
    if (section.href === pathname || section.basePath === pathname) {
      return section.title;
    }
    // Check subroutes
    if (section.subroutes) {
      for (const subroute of section.subroutes) {
        if (subroute.href === pathname) {
          return section.title;
        }
      }
    }
  }

  return undefined;
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
  expandedSection: string | null;
  setExpandedSection: (title: string | null) => void;
  keepAllExpanded: boolean;
};
const NavSectionDisplay = ({
  navSection,
  closeMenuIfOpen,
  expandedSection,
  setExpandedSection,
  keepAllExpanded = false,
}: NavSectionProps) => {
  const hasSubroutes = navSection.subroutes && navSection.subroutes.length > 0;

  // Auto-expand if current route matches parent or any subrou

  const isExpanded = keepAllExpanded || expandedSection === navSection.title;

  // Update expanded state when pathname changes - auto-expand matching section
  useEffect(() => {
    if (navSection.isCurrent) {
      setExpandedSection(navSection.title);
    }
  }, [navSection.title, navSection.isCurrent, setExpandedSection]);

  const handleParentClick = () => {
    if (hasSubroutes) {
      setExpandedSection(isExpanded ? null : navSection.title);
    } else {
      closeMenuIfOpen();
    }
  };

  return (
    <div>
      <div className="flex flex-row items-center justify-between group">
        {navSection.href ? (
          <div className="flex-1">
            <Link
              href={navSection.href}
              className="flex-1"
              onClick={() => {
                if (!hasSubroutes) {
                  closeMenuIfOpen();
                }
              }}
            >
              <div
                className={
                  navSection.isCurrent
                    ? "text-amber-600 dark:text-amber-300 text-lg text-ellipsis ml-3 hover:text-amber-700 dark:hover:text-amber-100 hover:mr-2"
                    : "font-light text-lg text-slate-800 dark:text-slate-200 hover:text-amber-700 dark:hover:text-amber-100 ml-3 mr-3 text-balance hover:font-normal hover:mr-2"
                }
              >
                {navSection.title}
              </div>
            </Link>
          </div>
        ) : (
          <div
            className={
              navSection.isCurrent
                ? "text-amber-600 dark:text-amber-300 text-lg text-ellipsis ml-3 hover:text-amber-700 dark:hover:text-amber-100 hover:mr-2"
                : "font-light text-lg text-slate-800 dark:text-slate-200 hover:text-amber-700 dark:hover:text-amber-100 ml-3 mr-3 text-balance hover:font-normal hover:mr-2"
            }
          >
            {navSection.title}
          </div>
        )}
        {hasSubroutes && !keepAllExpanded && (
          <button
            onClick={handleParentClick}
            className="flex items-center justify-center w-6 h-6 mr-2 rounded-md hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
            aria-expanded={isExpanded}
          >
            <Chevron
              className={`w-5 h-5 transition-transform ${
                !isExpanded ? "rotate-180" : ""
              }`}
            />
          </button>
        )}
      </div>

      {hasSubroutes && isExpanded && (
        <div className="mx-4">
          {navSection.subroutes!.map((n) => (
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
  highlightOnlyTopLevel = false,
}: {
  navMap: NavSection[];
  highlightOnlyTopLevel?: boolean;
}) => {
  const { height, width } = useWindowDimensions();
  const pathname = usePathname();
  const router = useRouter();

  const navPaths = mapNavToPartialPaths(navMap, highlightOnlyTopLevel);
  const [menuStyle, setMenuStyle] = useState("flex");
  const [menuVisible, setMenuVisible] = useState(true);
  const [buttonStyle, setButtonStyle] = useState(buttonUpStyle);
  const [currentPath, setCurrentPath] = useState(
    typeof window !== "undefined"
      ? findCurrentPath(navPaths, window.location)
      : new PartialPath(""),
  );
  const [currentNavMap, setCurrentNavMap] = useState(
    updateNavMap(navMap, currentPath, highlightOnlyTopLevel),
  );
  const [timeoutID, setTimeoutId] = useState<NodeJS.Timeout>();
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  // Initialize expanded section based on current pathname on mount
  useEffect(() => {
    if (currentPath) {
      const matchingSection = findNavSectionTitleByPathname(
        navMap,
        currentPath.toString(),
      );
      if (matchingSection) {
        setExpandedSection(matchingSection);
      }
    }
  }, []);

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
    if (typeof window === "undefined") return;
    let path = findCurrentPath(navPaths, window.location);
    if (!path) path = findCurrentPathOnScroll(navPaths, document);
    if (path) setCurrentPath(path);
  }, [pathname]);

  useEffect(() => {
    setCurrentNavMap(updateNavMap(navMap, currentPath, highlightOnlyTopLevel));
  }, [currentPath, highlightOnlyTopLevel]);

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
        if (!path || path.pathname !== currentPath?.pathname) return;
        if (typeof window === "undefined") return;
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
      <div className="flex-left flex-grow overflow-auto md:h-[calc(100vh-72px)] h-auto w-screen md:w-auto backdrop-blur-sm md:backdrop-blur-none">
        {!isSmallWindow(width) ? (
          <></>
        ) : (
          <div className="flex flex-row justify-center items-center bg-black/50 border-t-2 border-b-2 border-teal-400/50 md:bg-transparent">
            <Button
              buttonType={ButtonType.icon}
              className={buttonStyle}
              aria-controls="navbar-links"
              aria-expanded="false"
              onClick={() => {
                setMenuVisible(!menuVisible);
                setButtonStyle(!menuVisible ? buttonDownStyle : buttonUpStyle);
              }}
            >
              <span className="sr-only">Open Nav Menu</span>
              <DoubleChevron />
            </Button>
            <label className="text-slate-300 absolute right-2 w-[40%] text-right">
              {findNavElementTitle(navMap, currentPath)}
            </label>
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
                      expandedSection={expandedSection}
                      setExpandedSection={setExpandedSection}
                      keepAllExpanded={highlightOnlyTopLevel}
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
