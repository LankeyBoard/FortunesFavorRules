"use client";

import {
  SpellQueryData,
  SpellType,
} from "@/utils/graphQLQueries/AllSpellsQuery";
import { getOrdinal } from "@/utils/utils";
import { useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { findEnumValue } from "@/utils/enums";
import DropdownField from "../blocks/Inputs/DropdownField";

const filterOptions = ["All", "Arcane", "Divine", "Nature"];

type SpellPageProps = { data: SpellQueryData };
const SpellsPage = ({ data }: SpellPageProps) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const filterParam = searchParams.get("filter");
  const [filterType, setFilterType] = useState<number>(
    Number(filterParam) || 0,
  );
  const [sortOption, setSortOption] = useState<"Level" | "Alphabetical">(
    "Level",
  );

  useEffect(() => {
    if (filterParam) {
      setFilterType(Number(filterParam) || 0);
    }
  }, [filterParam]);

  const spells = data.allSpells;
  const filteredSpells = useMemo(
    () =>
      filterOptions[filterType] === "All" || filterType.toString() === "NaN"
        ? spells
        : spells.filter((s) =>
            s.type.includes(SpellType[filterType - 1] as unknown as SpellType),
          ),
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
      <div className="filters mb-6 flex flex-row">
        <span className="my-auto">Sort By: </span>
        <DropdownField
          name="Type"
          options={[]}
          defaultValue={filterType}
          className="mx-4"
          onChange={(e) => {
            const newValue = Number(e.target.value);
            console.log(newValue);
            setFilterType(newValue);
            const params = new URLSearchParams(searchParams);
            params.set("filter", newValue.toString());
            router.push(`?${params.toString()}`);
          }}
        >
          {filterOptions.map((f, i) => (
            <option key={i} value={i}>
              {f}
            </option>
          ))}
        </DropdownField>
        <DropdownField
          name="Level"
          value={sortOption}
          className=""
          onChange={(e) =>
            setSortOption(e.target.value as "Level" | "Alphabetical")
          }
        >
          <option value="Level">Level</option>
          <option value="Alphabetical">Alphabetical</option>
        </DropdownField>
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
