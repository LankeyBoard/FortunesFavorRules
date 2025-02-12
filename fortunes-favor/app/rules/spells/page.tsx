"use client";

import { getOrdinal } from "@/utils/utils";
import React, { useState } from "react";

enum SpellType {
  Arcane = "Arcane",
  Divine = "Divine",
  Nature = "Nature",
}

interface Spell {
  name: string;
  level: number;
  type: SpellType[];
  castingTime: string;
  duration: string;
  range: string;
  description: string;
}

const spells: Spell[] = [
  {
    name: "Quick Heal",
    level: 3,
    type: [SpellType.Divine, SpellType.Nature],
    castingTime: "Instant",
    duration: "Instant",
    range: "30ft",
    description:
      "A word of divine power and a wave of your hand quickly undo wounds and stitch flesh back together. Just after an ally loses Health you can cast this spell. They regain up to 2d6+Casting Modifier health. They cannot regain more Health than the just lost.",
  },
  {
    name: "Bolster Vitality",
    level: 1,
    type: [SpellType.Divine, SpellType.Nature],
    castingTime: "Action",
    duration: "1 minute",
    range: "30ft",
    description:
      "You offer words of blessing, bolstering your allies spirits and filling them with energy. As an action, choose up to 3 creatures. For the next minute, when they spend Stamina they may choose to reduce the Stamina cost by 1d6, ending this effect on themselves.",
  },
  {
    name: "Shield",
    level: 1,
    type: [SpellType.Divine],
    castingTime: "Action",
    duration: "2 rounds",
    range: "Touch",
    description:
      "You lay your hands on your ally. A shimmering shield appears around them offering them temporary divine protection. Touch a creature. Until the end of the next round of combat, the next time they would take damage, prevent it.",
  },
  {
    name: "Mote of Health",
    level: 3,
    type: [SpellType.Divine],
    castingTime: "Action",
    duration: "1 minute",
    range: "60ft",
    description:
      "A small glowing orb of healing energy attaches itself to your ally, ready to aid them as soon as they need it. Select a creature within range and place the mote on them. While a creature has the mote on them the next time that creature takes damage they are immediately healed for 1d6 Heath and the mote jumps to a new creature of your choice within 60ft of them.",
  },
  {
    name: "Leaching Tether",
    level: 1,
    type: [SpellType.Nature],
    castingTime: "Action",
    duration: "1 minute",
    range: "60ft",
    description:
      "You create a vampiric bond between yourself and your target, stealing vitality from them whenever you harm them. When you cast this spell, select a creature. Whenever you deal damage to them they take an additional 1d4 necrotic damage and you heal an equal amount.",
  },
  {
    name: "Enhanced Aid",
    level: 1,
    type: [SpellType.Arcane, SpellType.Divine, SpellType.Nature],
    castingTime: "Instant",
    duration: "Instant",
    range: "Self",
    description:
      "When you take the help action, cast this spell to add your Spellcasting Stat to the roll total.",
  },
  {
    name: "Hindering Wall",
    level: 1,
    type: [SpellType.Arcane, SpellType.Divine, SpellType.Nature],
    castingTime: "Action",
    duration: "1 minute",
    range: "30ft",
    description:
      "You summon forth a magical wall to cover yourself and damage those that would try and cross it. You create a 15ft long, 5ft wide, & 10ft tall wall of magic. When you pick this spell, select the damage type. Creatures inside the wall are hindered and take 1d6 of the chosen damage type when they start their turn and for every 5ft they move within the wall. The wall provides Half Cover. You can spend extra stamina to increase the walls length. Spending 1 Stamina per 5ft of length.",
  },
  {
    name: "Light",
    level: 0,
    type: [SpellType.Arcane, SpellType.Divine, SpellType.Nature],
    castingTime: "Instant",
    duration: "10 minutes",
    range: "Self",
    description:
      "You speak a word of power to create light in the darkness. You create a light to illuminate the world around you. You provide light as though you are holding a torch.",
  },
  {
    name: "Blip",
    level: 3,
    type: [SpellType.Arcane],
    castingTime: "Action",
    duration: "Instant",
    range: "Self",
    description:
      "You and a friend slip through a portal and emerge on the other side of your enemies. You and up to one Ally no more than 1 size larger than you teleport up to 30ft to a space you can see. You can spend extra stamina to increase the size limit. The limit increases by 1 size for every 2 stamina you spend.",
  },
  {
    name: "Power Spike",
    level: 1,
    type: [SpellType.Arcane, SpellType.Divine, SpellType.Nature],
    castingTime: "Action",
    duration: "Instant",
    range: "Base Range",
    description:
      "A surge of energy courses through you. This spell can be cast when making a Basic Attack to increase your base damage by 1 Step for this attack. You can spend Stamina up to your level to increase the damage further, increasing the damage by an additional 1 Step for every 2 Stamina you spend.",
  },
  {
    name: "Simple Illusion",
    level: 1,
    type: [SpellType.Arcane],
    castingTime: "Action",
    duration: "Up to 10 minutes",
    range: "30ft",
    description:
      "Create an illusion no larger than a 5ft cube. The illusion cannot move. Spend 1 stamina when you cast this spell to have the illusion also make noise.",
  },
  {
    name: "Animated Illusion",
    level: 3,
    type: [SpellType.Arcane],
    castingTime: "Action",
    duration: "Up to 10 minutes",
    range: "30ft",
    description:
      "Create a moving illusion that occupies no larger than a 10ft cube. When you cast the spell you can also decide how the illusion moves. It can move no more than 30ft per round. When you cast the spell you can spend 1 stamina to add sound to the spell. As long as the spell is active you can spend 1 stamina to change the animation of the spell.",
  },
  {
    name: "Illusionary Wall",
    level: 5,
    type: [SpellType.Arcane],
    castingTime: "Action",
    duration: "1 minute",
    range: "30ft",
    description:
      "Create an up to 10ft wide 60ft long and 10ft tall illusion. The wall cannot move locations, but can animate in place. Spend 1 stamina to double the height of the illusion. Spend 2 stamina to increase the duration of the wall to 10 minutes.",
  },
  {
    name: "Return Home",
    level: 3,
    type: [SpellType.Arcane, SpellType.Divine],
    castingTime: "1 minute",
    duration: "Instant",
    range: "10ft",
    description:
      "Return from whence you came. During your R&R you can create an anchor, an item tied to the location that later allows you to return to that location. When you cast this spell you and up to 6 other willing creatures are returned to the location you set up as your anchor. Spend 3 stamina to cast this as an action.",
  },
];

const SpellList: React.FC = () => {
  const [filterType, setFilterType] = useState<SpellType | "All">("All");
  const [sortOption, setSortOption] = useState<"Level" | "Alphabetical">(
    "Level",
  );

  const filteredSpells =
    filterType === "All"
      ? spells
      : spells.filter((spell) => spell.type.includes(filterType));
  const sortedSpells = [...filteredSpells].sort((a, b) => {
    if (sortOption === "Level") {
      return a.level - b.level;
    } else {
      return a.name.localeCompare(b.name);
    }
  });

  return (
    <div>
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

export default SpellList;
