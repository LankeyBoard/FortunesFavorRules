"use client";
import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Button, { ButtonType } from "./Inputs/Button";
import Tag from "./Tag";
const levels = new Map([
  [0, "0th"],
  [0.5, "0.5th"],
  [1, "1st"],
  [2, "2nd"],
  [3, "3rd"],
  [4, "4th"],
  [5, "5th"],
  [6, "6th"],
  [7, "7th"],
  [8, "8th"],
]);
interface FilterHeaderProps {
  tags: Set<string>;
}
const FilterHeader = ({ tags }: FilterHeaderProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [monsterTagsFilter, setMonsterTagFilter] = useState(tags);
  const [levelsFilter, setLevelsFilter] = useState<Set<number>>(
    new Set(levels.keys()),
  );
  const prevUrlRef = useRef(window.location.toString());
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (monsterTagsFilter.size === 0) params.set("tagFilter", "none");
    else if (monsterTagsFilter.size < tags.size) {
      params.set("tagFilter", Array.from(monsterTagsFilter).join(","));
    } else {
      params.delete("tagFilter");
    }
    const newUrl = `?${params.toString()}${window.location.hash}`;
    if (newUrl !== prevUrlRef.current) {
      prevUrlRef.current = newUrl;
      router.replace(newUrl);
    }
  }, [monsterTagsFilter, tags, searchParams]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (levelsFilter.size === 0) params.set("lvlFilter", "none");
    else if (levelsFilter.size < levels.size) {
      params.set("lvlFilter", Array.from(levelsFilter).join(","));
    } else {
      params.delete("lvlFilter");
    }
    const newUrl = `?${params.toString()}${window.location.hash}`;
    if (newUrl !== prevUrlRef.current) {
      prevUrlRef.current = newUrl;
      router.replace(newUrl);
    }
  }, [levelsFilter, levels, searchParams]);

  return (
    <div className="fixed w-full bg-slate-200 dark:bg-slate-950 z-40">
      <div className="p-2">
        <h1 className="text-xl font-light">Filters</h1>
        <div>
          <h2 className="inline font-light text-lg">Levels</h2>
          {levels.keys().map((key) => {
            return (
              <Button
                key={key}
                buttonType={ButtonType.default}
                className="p-0"
                value={levels.get(key)}
                onClick={() => {
                  console.log("click", key);
                  const updatedLevels = new Set(levelsFilter);
                  if (updatedLevels.has(Number(key)))
                    updatedLevels.delete(Number(key));
                  else updatedLevels.add(Number(key));
                  console.log(updatedLevels);
                  setLevelsFilter(updatedLevels);
                }}
              >
                <Tag
                  className={
                    levelsFilter.has(key)
                      ? "bg-purple-300 dark:bg-purple-700 hover:bg-slate-500"
                      : "bg-slate-300 dark:bg-slate-700 hover:bg-purple-500"
                  }
                >
                  {levels.get(key)}
                </Tag>
              </Button>
            );
          })}
          <Button
            buttonType={ButtonType.default}
            className="p-0"
            onClick={() => {
              console.log(
                levelsFilter.keys().toArray().length,
                levels.keys().toArray(),
              );
              setLevelsFilter(
                levelsFilter.keys().toArray().length ===
                  levels.keys().toArray().length
                  ? new Set()
                  : new Set(levels.keys()),
              );
            }}
          >
            <Tag className="bg-amber-300 dark:bg-amber-700 hover:bg-amber-500">
              Toggle
            </Tag>
          </Button>
        </div>

        <div>
          <h2 className="inline font-light text-lg">Tags</h2>

          {[...tags].map((t) => (
            <Button
              buttonType={ButtonType.default}
              key={t}
              value={t}
              className="p-0"
              onClick={(e) => {
                console.log("click", e.currentTarget.value);
                const updatedTags = new Set(monsterTagsFilter);
                if (updatedTags.has(e.currentTarget.value))
                  updatedTags.delete(e.currentTarget.value);
                else updatedTags.add(e.currentTarget.value);
                console.log(updatedTags);
                setMonsterTagFilter(updatedTags);
              }}
            >
              <Tag
                className={
                  monsterTagsFilter.has(t)
                    ? "bg-teal-300 dark:bg-teal-700 hover:bg-slate-500"
                    : "bg-slate-300 dark:bg-slate-700 hover:bg-teal-500"
                }
                value={t}
              >
                {t}
              </Tag>
            </Button>
          ))}
          <Button
            buttonType={ButtonType.default}
            className="p-0"
            onClick={() => {
              console.log(monsterTagsFilter);
              setMonsterTagFilter(
                monsterTagsFilter.keys().toArray().length ===
                  tags.keys().toArray().length
                  ? new Set()
                  : new Set(tags),
              );
            }}
          >
            <Tag className="bg-amber-300 dark:bg-amber-700 hover:bg-amber-500">
              Toggle
            </Tag>
          </Button>
        </div>
      </div>
    </div>
  );
};
export default FilterHeader;
