"use client";

import {
  SpellQueryData,
  SpellType,
} from "@/utils/graphQLQueries/AllSpellsQuery";
import { getOrdinal } from "@/utils/utils";
import { useMemo, useState } from "react";
type SpellPageProps = { data: SpellQueryData };
const SpellsPage = ({ data }: SpellPageProps) => {
  const [filterType, setFilterType] = useState<SpellType | "All">("All");
  const [sortOption, setSortOption] = useState<"Level" | "Alphabetical">(
    "Level",
  );
  const spells = data.allSpells;
  const filteredSpells = useMemo(
    () =>
      filterType === "All"
        ? spells
        : spells.filter((s) => s.type.includes(filterType)),
    [spells, filterType],
  );

  const sortedSpells = useMemo(() => {
    const arr = [...filteredSpells];
    return arr.sort((a, b) =>
      sortOption === "Level" ? a.level - b.level : a.name.localeCompare(b.name),
    );
  }, [filteredSpells, sortOption]);

  return (
    <div className="mb-18 md:mb-0">
      <div className="filters mb-6">
        <label className="">
          Filter by Type:
          <select
            value={filterType}
            className="dark:bg-slate-800 mx-2"
            onChange={(e) => setFilterType(e.target.value as SpellType | "All")}
          >
            <option value="All">All</option>
            <option value={SpellType.Arcane}>Arcane</option>
            <option value={SpellType.Divine}>Divine</option>
            <option value={SpellType.Nature}>Nature</option>
          </select>
        </label>
        <label>
          Sort by:
          <select
            value={sortOption}
            className="dark:bg-slate-800 ml-2"
            onChange={(e) =>
              setSortOption(e.target.value as "Level" | "Alphabetical")
            }
          >
            <option value="Level">Level</option>
            <option value="Alphabetical">Alphabetical</option>
          </select>
        </label>
      </div>
      {sortedSpells.map((spell, index) => (
        <div key={index} className="pb-3 mb-4 dark:bg-slate-800 bg-slate-200">
          <div className="flex p-2 bg-teal-300 dark:bg-teal-800">
            <h2 className="text-lg font-semibold float-left grow">
              {spell.name}
            </h2>
            <div className="text-slate-700 dark:text-slate-200 float-right text-base ordinal">
              {spell.level}
              <span className="underline text-xs align-text-top">
                {getOrdinal(spell.level)}
              </span>{" "}
              level
            </div>
          </div>
          <div className="clear-both px-4">
            <p>
              <strong>Type:</strong> {spell.type.join(", ")}
            </p>
            <p>
              <strong>Casting Time:</strong> {spell.castingTime}
            </p>
            <p>
              <strong>Duration:</strong> {spell.duration}
            </p>
            <p>
              <strong>Range:</strong> {spell.range}
            </p>
            <p>{spell.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
export default SpellsPage;
