"use client";

import React, { useState, useEffect } from "react";
import client from "@/utils/graphQLclient";
import MY_ENCOUNTERS_QUERY, {
  MyEncountersQueryData,
} from "@/utils/graphQLQueries/MyEncountersQuery";
import EncounterCard from "@/components/blocks/EncounterCard";
import Button, { ButtonType } from "@/components/blocks/Inputs/Button";
import FullPageLoading from "@/components/FullPageLoading";
import { EncounterData } from "@/utils/graphQLtypes";
import ENCOUNTER_QUERY, {
  EncounterQueryData,
} from "@/utils/graphQLQueries/EncounterQuery";
import MonsterCard from "../blocks/MonsterCard";
import MonsterEncounterCard from "../blocks/MonsterEncounterCard";
import VerifyLogin from "../VerifyLogin";
import Edit from "../icons/Edit";
import EncounterForm from "../blocks/EncounterForm";
import ALL_MONSTERS_QUERY, {
  Monster,
  MonsterData,
} from "@/utils/graphQLQueries/monsters/AllMonstersQuery";
import { ApolloError } from "@apollo/client";

const EncounterRunner = ({ id: encounterId }: { id: string }) => {
  const [encounter, setEncounter] = useState<EncounterData | undefined>(
    undefined,
  );
  const [allMonsters, setAllMonsters] = useState<Monster[] | undefined>(
    undefined,
  );
  const [isEditable, setEditable] = useState(false);

  if (!encounterId) {
    throw new Error("No id provided");
  }

  const fetchData = async () => {
    try {
      const { data } = await client.query({
        query: ENCOUNTER_QUERY,
        variables: { id: encounterId },
      });
      const e = data.encounter;
      setEncounter(e as EncounterData);
    } catch (error) {
      console.error("Error fetching encounters:", error);
    }
    try {
      const { data }: { data: MonsterData; error?: ApolloError } =
        await client.query({
          query: ALL_MONSTERS_QUERY,
        });
      setAllMonsters(
        data.allMonsters.flatMap((m) => {
          return "monsters" in m ? m.monsters : m;
        }),
      );
    } catch (error) {
      console.error("Error fetching monsters:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (!encounter) {
    return <FullPageLoading />;
  }
  console.log(encounter);
  const EncounterView = () => (
    <div className="w-full">
      <div className="bg-purple-300 dark:bg-purple-700 p-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="font-bold text-lg">
              {encounter.title || "Encounter"}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <span>{encounter.monsters?.length || 0} monsters</span>
              <span className="ml-4">
                Encounter level:{" "}
                {encounter.monsters?.reduce(
                  (accumulator, monster) => accumulator + monster.level,
                  0,
                )}
              </span>
            </p>
          </div>
          <div className="text-xs text-gray-600 dark:text-gray-400">
            {encounter.createdAt &&
              new Date(encounter.createdAt).toLocaleDateString()}
          </div>
        </div>
      </div>
      <p className="my-2 mx-4">{encounter.description}</p>
      <div className="flex flex-wrap">
        {encounter.monsters?.map((monster) => (
          <MonsterEncounterCard
            key={monster.name + Math.random() * 100}
            monster={monster}
          />
        ))}
      </div>
      {!isEditable && (
        <Button
          buttonType={ButtonType.default}
          color="amber"
          onClick={() => setEditable(true)}
          className="flex flex-row"
        >
          <span className="pr-2">Edit</span>
          <Edit className="w-6" />
        </Button>
      )}
    </div>
  );

  return (
    <VerifyLogin>
      {isEditable ? (
        <EncounterForm
          encounter={encounter}
          allMonsters={allMonsters ?? []}
          onSubmit={() => {
            setEditable(false);
          }}
        />
      ) : (
        <EncounterView />
      )}
    </VerifyLogin>
  );
};

export default EncounterRunner;
