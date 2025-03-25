"use client";

import client from "@/utils/graphQLclient";
import { gql, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";

import CharacterStaticInfo from "./blocks/CharacterSheetComponents/CharacterStaticInfo";
import CharacterCoreInfo from "./blocks/CharacterSheetComponents/CharacterCoreInfo";
import PlayerCharacter, {
  FeatureSource,
  PlayerCharacterFeature,
} from "@/utils/PlayerCharacter";
import CharacterClassData from "@/utils/CharacterClass";
import CharacterCulture from "@/utils/CharacterCulture";
import CharacterLineage from "@/utils/CharacterLineage";
import CharacterFeatures from "./blocks/CharacterSheetComponents/CharacterFeatures";
import debounce from "@/utils/debounce";
import TextInput from "./blocks/Inputs/TextInput";
import CharacterClass from "@/utils/CharacterClass";
import { ActionType, findEnum, RuleType } from "@/utils/enums";
import { GenericCharacterFeatures } from "./blocks/GenericFeaturePicker";
import GET_CHARACTER_INFO, {
  GetCharacterData,
} from "@/utils/graphQLQueries/PlayerCharacterQuery";
import UPDATE_CHARACTER_MUTATION from "@/utils/graphQLMutations/UpdateCharacterMutation";
import GET_CHARACTER_OPTIONS from "@/utils/graphQLQueries/PlayerCharacterOptionsQuery";
import CREATE_CHARACTER_MUTATION from "@/utils/graphQLMutations/CreateCharacterMutation";
import Button, { ButtonType } from "./blocks/Inputs/Button";

const extractPlayerCharacter = (data: GetCharacterData): PlayerCharacter => {
  const characterClass = new CharacterClassData(data.character.characterClass);
  const culture = new CharacterCulture(data.character.characterCulture);
  const lineage = new CharacterLineage(data.character.characterLineage);
  const character = new PlayerCharacter(
    culture,
    lineage,
    characterClass,
    undefined,
  );
  character.level = data.character.level;
  character.stats = {
    mettle: data.character.mettle,
    agility: data.character.agility,
    intellect: data.character.intellect,
    heart: data.character.heart,
  };
  character.currentHealth = data.character.currentHealth;
  character.currentStamina = data.character.currentStamina;
  character.coin = data.character.coin;
  character.name = data.character.name;
  character.id = data.character.id;
  return character;
};

const extractGenericFeatures = (
  data: GetCharacterData,
): {
  noviceFeatures: PlayerCharacterFeature[];
  veteranFeatures: PlayerCharacterFeature[];
} => {
  const noviceFeature: PlayerCharacterFeature[] = [];
  const veteranFeatures: PlayerCharacterFeature[] = [];
  data.noviceFeatures.forEach((feature) => {
    const f = new PlayerCharacterFeature(
      feature.title,
      FeatureSource.NOVICE_FEATURE,
      [],
      feature.slug,
      findEnum(feature.ruleType, RuleType),
      feature.text,
      feature.multiSelect,
      feature.complexChoices
        ? feature.complexChoices.length > 0
          ? feature.complexChoices?.map((choice) => {
              return {
                ...choice,
                ruleType: findEnum(choice.ruleType, RuleType),
                actionType: findEnum(choice.actionType, ActionType),
              };
            })
          : feature.simpleChoices
            ? feature.simpleChoices
            : []
        : [],
      [],
      feature.chooseNum,
      feature.shortText,
    );
    noviceFeature.push(f);
  });
  data.veteranFeatures.forEach((feature) => {
    const f = new PlayerCharacterFeature(
      feature.title,
      FeatureSource.VETERAN_FEATURE,
      [],
      feature.slug,
      findEnum(feature.ruleType, RuleType),
      feature.text,
      feature.multiSelect,
      feature.complexChoices
        ? feature.complexChoices.length > 0
          ? feature.complexChoices?.map((choice) => {
              return {
                ...choice,
                ruleType: findEnum(choice.ruleType, RuleType),
                actionType: findEnum(choice.actionType, ActionType),
              };
            })
          : feature.simpleChoices
            ? feature.simpleChoices
            : []
        : [],
      [],
      feature.chooseNum,
      feature.shortText,
    );
    veteranFeatures.push(f);
  });
  return { noviceFeatures: noviceFeature, veteranFeatures: veteranFeatures };
};

const convertPlayerCharacterToGraphInput = (character: PlayerCharacter) => {
  return {
    name: character.name,
    level: character.level,
    mettle: character.stats.mettle,
    agility: character.stats.agility,
    heart: character.stats.heart,
    intellect: character.stats.intellect,
    coin: character.coin,
    languages: character.languages,
    characterClass: character.characterClass?.slug || "",
    characterLineage: character.lineage?.slug || "",
    characterCulture: character.culture?.slug || "",
    maxHealth: character.maxHealth,
    maxStamina: character.maxStamina,
    currentHealth: character.currentHealth,
    currentStamina: character.currentStamina,
    armorName: character.armorName,
    shieldName: character.shieldName,
    counter: character.counter,
    baseDamage: character.baseDamage?.count || 0,
    rangeMin: character.range?.min || 0,
    rangeMax: character.range?.max || 0,
    featureChoiceSlugs: character.choices,
  };
};

export type CharacterOptions = {
  characterClasses: CharacterClass[];
  characterCultures: CharacterCulture[];
  characterLineages: CharacterLineage[];
  genericFeatures: GenericCharacterFeatures;
};

// If a characterId is provided, the sheet will load that character and edit it. Otherwise a new character will be created.
const CharacterSheet = ({ characterId }: { characterId?: number }) => {
  const [character, setCharacter] = useState<PlayerCharacter | undefined>(
    undefined,
  );
  const [characterOptions, setCharacterOptions] = useState<
    CharacterOptions | undefined
  >(undefined);
  const [isEditable, setEditable] = useState(characterId === undefined);
  const [loadingError, setLoadingError] = useState<any>(null);
  const [updateCharacter] = useMutation(UPDATE_CHARACTER_MUTATION);
  const [createCharacter] = useMutation(CREATE_CHARACTER_MUTATION);
  const saveCharacter = async (character: PlayerCharacter) => {
    console.log("saveCharacter character id", character.id);
    if (character.id) {
      const { data } = await updateCharacter({
        variables: {
          id: character.id,
          characterInputs: convertPlayerCharacterToGraphInput(character),
        },
      });
      return data;
    } else {
      const { data } = await createCharacter({
        variables: {
          characterInputs: convertPlayerCharacterToGraphInput(character),
        },
      });
      console.log("character created", data);
      if (!data.id) throw new Error("Error creating character");
      const newCharacter = new PlayerCharacter(
        undefined,
        undefined,
        undefined,
        character,
      );
      newCharacter.id = data.id;
      setCharacter(newCharacter);
      return data;
    }
  };
  // load character if there is a characterId otherwise only load character options.
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await client.query({
          query: characterId ? GET_CHARACTER_INFO : GET_CHARACTER_OPTIONS,
          variables: { id: Number(characterId) },
        });
        const genericFeatures = extractGenericFeatures(data);
        if (characterId) {
          setCharacter(
            extractPlayerCharacter(data)
              .updateChoices(data.character.featureChoiceSlugs)
              .extractGenericFeaturesFromChoices(
                data.character.featureChoiceSlugs,
                genericFeatures.noviceFeatures.concat(
                  genericFeatures.veteranFeatures,
                ),
              ),
          );
        }
        const charOptions: CharacterOptions = {
          characterClasses: [],
          characterCultures: [],
          characterLineages: [],
          genericFeatures: genericFeatures,
        };
        if (data.cultures) {
          data.cultures.forEach((culture: any) => {
            charOptions.characterCultures.push(new CharacterCulture(culture));
          });
        }
        if (data.lineages) {
          data.lineages.forEach((lineage: any) => {
            charOptions.characterLineages.push(new CharacterLineage(lineage));
          });
        }
        if (data.characterClasses) {
          data.characterClasses.forEach((characterClass: any) => {
            charOptions.characterClasses.push(
              new CharacterClass(characterClass),
            );
          });
        }
        setCharacterOptions(charOptions);
        if (!characterId) {
          setCharacter(
            new PlayerCharacter(
              charOptions.characterCultures[0],
              charOptions.characterLineages[0],
              charOptions.characterClasses[0],
            ),
          );
        }
      } catch (error) {
        setLoadingError(error);
      }
    };
    fetchData();
  }, [characterId]);

  // save updates to the backend of an existing character.
  useEffect(() => {
    if (character && character.id) {
      const debouncedSave = debounce(() => {
        console.log("Saving character to DB", character);
        saveCharacter(character);
      }, 2000);
      debouncedSave();
    }
  }, [character]);

  if (loadingError) {
    console.error(loadingError);
    return <div>Error loading character data.</div>;
  }

  if (!character || !character.characterClass || !characterOptions) {
    return <div>Loading...</div>;
  }

  const updateName = (newName: string) => {
    const newCharacter = new PlayerCharacter(
      undefined,
      undefined,
      undefined,
      character,
    );
    newCharacter.name = newName;
    setCharacter(newCharacter);
  };

  return (
    <>
      {isEditable ? (
        <h2 className="font-thin text-xl mx-auto text-center p-4 dark:bg-teal-900 bg-teal-100">
          <TextInput
            placeholder="Character Name"
            defaultValue={character.name}
            onChange={(e) => {
              updateName(e.target.value);
            }}
          />
        </h2>
      ) : (
        <h2 className="font-thin text-xl mx-auto text-center p-4 dark:bg-teal-900 bg-teal-100">
          {character.name}
        </h2>
      )}
      <div className=" dark:bg-slate-950 rounded-lg shadow-md flex flex-col md:grid md:grid-cols-3 md:gap-2">
        <div className="bg-slate-100 dark:bg-slate-900">
          <CharacterStaticInfo
            character={character}
            setCharacter={setCharacter}
            isEditable={isEditable}
            characterOptions={characterOptions}
          />
        </div>
        <div className="border-t-2 border-b-2 pb-4 border-amber-700 md:border-y-0 bg-slate-50 dark:bg-slate-900">
          <CharacterCoreInfo
            character={character}
            setCharacter={setCharacter}
            isEditable={isEditable}
          />
        </div>
        <div className="pt-6 md:pt-0 bg-slate-100 dark:bg-slate-900">
          <CharacterFeatures
            character={character}
            setCharacter={setCharacter}
            features={character.features}
            isEditable={isEditable}
            label="Features"
            characterOptions={characterOptions}
          />
        </div>
      </div>
      <div className="mx-auto w-fit">
        <Button
          buttonType={ButtonType.simple}
          color="amber"
          onClick={() => {
            if (isEditable) saveCharacter(character);
            setEditable(!isEditable);
          }}
        >
          {isEditable ? (
            <span>Save Character</span>
          ) : (
            <span>Edit Character</span>
          )}
        </Button>
      </div>
    </>
  );
};

export default CharacterSheet;
