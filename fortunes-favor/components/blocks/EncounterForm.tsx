"use client";

import React, { useState, useEffect } from "react";
import client from "@/utils/graphQLclient";
import CREATE_ENCOUNTER_MUTATION from "@/utils/graphQLMutations/CreateEncounterMutation";
import UPDATE_ENCOUNTER_MUTATION from "@/utils/graphQLMutations/UpdateEncounterMutation";
import Button, { ButtonType } from "./Inputs/Button";
import TextInput from "./Inputs/TextInput";
import { EncounterData } from "@/utils/graphQLtypes";
import MultilineTextInput from "./Inputs/MulitlineTextInput";
import { Monster } from "@/utils/graphQLQueries/monsters/AllMonstersQuery";
import ComboBoxField from "./Inputs/ComboBoxField";
import { useRouter } from "next/navigation";

interface MonsterInputData {
  name: string;
  currentHealth?: number;
  maxHealth?: number;
}

interface EncounterFormProps {
  encounter?: EncounterData;
  allMonsters: Monster[];
  onSubmit?: () => void;
}

const EncounterForm = ({
  encounter,
  allMonsters,
  onSubmit,
}: EncounterFormProps) => {
  const router = useRouter();
  const [title, setTitle] = useState(encounter?.title ?? "");
  const [description, setDescription] = useState(encounter?.description ?? "");
  const [monsters, setMonsters] = useState<MonsterInputData[]>(
    encounter?.monsters ?? [],
  );
  const [currentMonster, setCurrentMonster] = useState<Monster>();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (encounter) {
      setDescription(encounter.description || "");
      setMonsters(
        encounter.monsters?.map((m) => ({
          name: m.name,
          currentHealth: m.currentHealth,
          maxHealth: m.maxHealth,
        })) || [],
      );
    }
  }, [encounter]);

  const addMonster = () => {
    if (!currentMonster) {
      throw new Error("Cannot add undefined monster");
    }
    if (!currentMonster.name.trim()) {
      setError("Monster name is required");
      return;
    }
    setMonsters([
      ...monsters,
      {
        name: currentMonster.name,
        currentHealth: currentMonster.currentHealth ?? currentMonster.health,
        maxHealth: currentMonster.health,
      },
    ]);
    setCurrentMonster(undefined);
    setError(null);
  };

  const removeMonster = (index: number) => {
    setMonsters(monsters.filter((_, i) => i !== index));
  };

  const handleCancel = () => {
    setTitle(encounter?.title ?? "");
    setDescription(encounter?.description ?? "");
    setMonsters(encounter?.monsters ?? []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const input = {
        title: title,
        description: description || undefined,
        monsters: monsters.length > 0 ? monsters : undefined,
      };

      let mutation;
      let variables;

      if (encounter) {
        mutation = UPDATE_ENCOUNTER_MUTATION;
        variables = { id: encounter.id, input };
      } else {
        mutation = CREATE_ENCOUNTER_MUTATION;
        variables = { input };
      }

      const { data } = await client.mutate({
        mutation,
        variables,
      });
      console.log(data);
      if (onSubmit) onSubmit();
      if ("createEncounter" in data) {
        router.push(`/encounter/${data.createEncounter.id}`);
      } else if ("updateEncounter" in data) {
      } else {
        throw new Error(`Error in the data ${data}`);
      }
    } catch (err: any) {
      console.error("Error:", err);
      setError(err.message || "Failed to save encounter");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4">
      <h3 className="font-bold text-lg">
        {encounter ? "Edit Encounter" : "Create New Encounter"}
      </h3>

      <div>
        <TextInput
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div>
        <MultilineTextInput
          placeholder="Describe the encounter (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold mb-2">Monsters</label>

        {monsters.length > 0 && (
          <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded mb-3 space-y-2">
            {monsters.map((monster, index) => (
              <div
                key={index}
                className="flex justify-between items-center bg-white dark:bg-gray-700 p-2 rounded"
              >
                <div>
                  <p className="font-semibold">{monster.name}</p>
                  {(monster.currentHealth || monster.maxHealth) && (
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      HP: {monster.currentHealth || 0} /{" "}
                      {monster.maxHealth || 0}
                    </p>
                  )}
                </div>
                <Button
                  buttonType={ButtonType.default}
                  color={"red"}
                  onClick={() => removeMonster(index)}
                  className="px-3 py-1"
                >
                  Remove
                </Button>
              </div>
            ))}
          </div>
        )}

        <div className="bg-gray-50 dark:bg-gray-900 p-3 rounded space-y-2">
          <ComboBoxField
            name="Monster"
            placeholder="Monster name"
            value={currentMonster?.name}
            options={allMonsters.map((m) => m.name)}
            onChange={(e) =>
              setCurrentMonster(
                allMonsters.find((m) => m.name === e.target.value),
              )
            }
          />
          <div className="flex gap-2">
            <TextInput
              type="number"
              placeholder="Current Health (optional)"
              value={currentMonster?.currentHealth?.toString() || undefined}
              onChange={(e) => {
                if (currentMonster) {
                  setCurrentMonster({
                    ...currentMonster,
                    currentHealth: e.target.value
                      ? parseInt(e.target.value)
                      : undefined,
                  });
                }
              }}
            />
            <TextInput
              type="number"
              placeholder="Max Health (optional)"
              value={currentMonster?.health?.toString() || ""}
              onChange={(e) => {
                if (currentMonster) {
                  setCurrentMonster({
                    ...currentMonster,
                    health: e.target.value ? parseInt(e.target.value) : 0,
                  });
                }
              }}
            />
          </div>
          <Button
            type="button"
            color="blue"
            buttonType={ButtonType.default}
            onClick={addMonster}
          >
            Add Monster
          </Button>
        </div>
      </div>

      {error && <div className="text-red-600 text-sm">{error}</div>}

      <div className="flex gap-2 justify-end pt-4">
        <Button
          type="button"
          color="gray"
          buttonType={ButtonType.default}
          onClick={handleCancel}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          color="blue"
          buttonType={ButtonType.default}
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : encounter
              ? "Update Encounter"
              : "Create Encounter"}
        </Button>
      </div>
    </form>
  );
};

export default EncounterForm;
