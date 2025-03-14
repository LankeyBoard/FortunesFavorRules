"use client";

import client from "@/utils/graphQLclient";
import { gql, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";

import CharacterStaticInfo from "./blocks/CharacterStaticInfo";
import CharacterCoreInfo from "./blocks/CharacterCoreInfo";
import PlayerCharacter from "@/utils/PlayerCharacter";
import CharacterClassData from "@/utils/CharacterClass";
import CharacterCulture from "@/utils/CharacterCulture";
import CharacterLineage from "@/utils/CharacterLineage";
import CharacterFeatures from "./blocks/CharacterFeatures";
import debounce from "@/utils/debounce";
import TextInput from "./blocks/Inputs/TextInput";
import CharacterClass from "@/utils/CharacterClass";

const query = gql`
  query getCharacter($id: ID!) {
    character(id: $id) {
      agility
      armorName
      baseDamage
      coin
      counter
      currentHealth
      currentStamina
      featureChoiceSlugs
      heart
      id
      intellect
      languages
      level
      maxHealth
      mettle
      maxStamina
      name
      rangeMax
      shieldName
      rangeMin
      characterClass {
        attackStat
        complexity
        damage {
          count
          stat
          dice
          type
        }
        deflect {
          dice
          count
          flat
        }
        description
        extra {
          forms {
            armor {
              baseArmor
              stat
            }
            attackStat
            damage {
              dice
              stat
              type
              count
            }
            features {
              text
              title
            }
            href
            shortTitle
            size
            slug
            title
          }
        }
        health
        healthOnLevel
        href
        shortTitle
        range {
          max
          min
        }
        slug
        stamina
        staminaOnLevel
        staminaStat
        title
        features {
          actionType
          simpleChoices: choices {
            ... on RuleText {
              type
              choices
              text
            }
          }
          complexChoices: choices {
            ... on FeatureWithoutChoices {
              href
              shortTitle
              actionType
              costsFortunesFavor
              multiSelect
              ruleType
              shortText
              slug
              staminaCost
              title
              text {
                choices
                text
                type
              }
            }
          }
          chooseNum
          level
          href
          ruleType
          multiSelect
          shortText
          slug
          shortTitle
          staminaCost
          title
          text {
            choices
            text
            type
          }
          costsFortunesFavor
        }
        training {
          armor
          magic {
            options
            pick
          }
          shields
          weapons {
            melee {
              options
              pick
            }
            ranged {
              options
              pick
            }
            special {
              options
              pick
            }
          }
        }
      }
      characterCulture {
        description
        href
        languages
        shortTitle
        slug
        stat
        traits {
          actionType
          simpleChoices: choices {
            ... on RuleText {
              type
              choices
              text
            }
          }
          complexChoices: choices {
            ... on FeatureWithoutChoices {
              href
              shortTitle
              actionType
              costsFortunesFavor
              multiSelect
              ruleType
              shortText
              slug
              staminaCost
              title
              text {
                choices
                text
                type
              }
            }
          }
          chooseNum
          costsFortunesFavor
          href
          multiSelect
          ruleType
          shortText
          shortTitle
          slug
          staminaCost
          text {
            choices
            type
            text
          }
          title
        }
        title
      }
      characterLineage {
        description
        href
        shortTitle
        size
        slug
        speeds {
          type
          speed
        }
        stat
        title
        traits {
          actionType
          simpleChoices: choices {
            ... on RuleText {
              type
              choices
              text
            }
          }
          complexChoices: choices {
            ... on FeatureWithoutChoices {
              href
              shortTitle
              actionType
              costsFortunesFavor
              multiSelect
              ruleType
              shortText
              slug
              staminaCost
              title
              text {
                choices
                text
                type
              }
            }
          }
          chooseNum
          costsFortunesFavor
          href
          multiSelect
          ruleType
          shortText
          shortTitle
          slug
          staminaCost
          title
          text {
            choices
            text
            type
          }
        }
      }
    }
    characterClasses {
      attackStat
      complexity
      damage {
        count
        stat
        dice
        type
      }
      deflect {
        dice
        count
        flat
      }
      description
      extra {
        forms {
          armor {
            baseArmor
            stat
          }
          attackStat
          damage {
            dice
            stat
            type
            count
          }
          features {
            text
            title
          }
          href
          shortTitle
          size
          slug
          title
        }
      }
      health
      healthOnLevel
      href
      shortTitle
      range {
        max
        min
      }
      slug
      stamina
      staminaOnLevel
      staminaStat
      title
      features {
        actionType
        simpleChoices: choices {
          ... on RuleText {
            type
            choices
            text
          }
        }
        complexChoices: choices {
          ... on FeatureWithoutChoices {
            href
            shortTitle
            actionType
            costsFortunesFavor
            multiSelect
            ruleType
            shortText
            slug
            staminaCost
            title
            text {
              choices
              text
              type
            }
          }
        }
        chooseNum
        level
        href
        ruleType
        multiSelect
        shortText
        slug
        shortTitle
        staminaCost
        title
        text {
          choices
          text
          type
        }
        costsFortunesFavor
      }
      training {
        armor
        magic {
          options
          pick
        }
        shields
        weapons {
          melee {
            options
            pick
          }
          ranged {
            options
            pick
          }
          special {
            options
            pick
          }
        }
      }
    }
    cultures {
      description
      href
      languages
      shortTitle
      slug
      stat
      traits {
        actionType
        simpleChoices: choices {
          ... on RuleText {
            type
            choices
            text
          }
        }
        complexChoices: choices {
          ... on FeatureWithoutChoices {
            href
            shortTitle
            actionType
            costsFortunesFavor
            multiSelect
            ruleType
            shortText
            slug
            staminaCost
            title
            text {
              choices
              text
              type
            }
          }
        }
        chooseNum
        costsFortunesFavor
        href
        multiSelect
        ruleType
        shortText
        shortTitle
        slug
        staminaCost
        text {
          choices
          type
          text
        }
        title
      }
      title
    }
    lineages {
      description
      href
      shortTitle
      size
      slug
      speeds {
        type
        speed
      }
      stat
      title
      traits {
        actionType
        simpleChoices: choices {
          ... on RuleText {
            type
            choices
            text
          }
        }
        complexChoices: choices {
          ... on FeatureWithoutChoices {
            href
            shortTitle
            actionType
            costsFortunesFavor
            multiSelect
            ruleType
            shortText
            slug
            staminaCost
            title
            text {
              choices
              text
              type
            }
          }
        }
        chooseNum
        costsFortunesFavor
        href
        multiSelect
        ruleType
        shortText
        shortTitle
        slug
        staminaCost
        title
        text {
          choices
          text
          type
        }
      }
    }
  }
`;

const UPDATE_CHARACTER_MUTATION = gql`
  mutation UpdateCharacter($id: ID!, $characterInputs: CharacterInput!) {
    updateCharacter(id: $id, input: $characterInputs) {
      name
      items {
        id
        title
      }
      level
      mettle
      agility
      heart
      intellect
      coin
      languages
      characterClass {
        title
      }
      characterLineage {
        title
      }
      characterCulture {
        title
      }
      currentHealth
      currentStamina
      maxHealth
      maxStamina
      armorName
      shieldName
      counter
      baseDamage
      rangeMin
      rangeMax
      featureChoiceSlugs
    }
  }
`;

interface Data {
  character: {
    agility: number;
    armorName: string;
    baseDamage: number;
    coin: number;
    counter: number;
    currentHealth: number;
    currentStamina: number;
    featureChoiceSlugs: string[];
    heart: number;
    id: string;
    intellect: number;
    languages: string[];
    level: number;
    maxHealth: number;
    mettle: number;
    maxStamina: number;
    name: string;
    rangeMax: number;
    shieldName: string;
    rangeMin: number;
    characterClass: {
      attackStat: string;
      complexity: number;
      damage: {
        count: number;
        stat: string;
        dice: string;
        type: string;
      }[];
      deflect: {
        dice: string;
        count: number;
        flat: number;
      };
      description: string;
      extra: {
        forms: {
          armor: {
            baseArmor: number;
            stat: string;
          };
          attackStat: string;
          damage: {
            dice: string;
            stat: string;
            type: string;
            count: number;
          }[];
          features: {
            text: string;
            title: string;
          }[];
          href: string;
          shortTitle: string;
          size: string;
          slug: string;
          title: string;
        }[];
      };
      health: number;
      healthOnLevel: number;
      href: string;
      shortTitle: string;
      range: {
        max: number;
        min: number;
      };
      slug: string;
      stamina: number;
      staminaOnLevel: number;
      staminaStat: string;
      title: string;
      features: {
        actionType: string;
        simpleChoices: {
          type: string;
          choices: string[];
          text: string;
        }[];
        complexChoices: {
          href: string;
          shortTitle: string;
          actionType: string;
          costsFortunesFavor: boolean;
          multiSelect: boolean;
          ruleType: string;
          shortText: string;
          slug: string;
          staminaCost: number;
          title: string;
          text: {
            choices: string[];
            text: string;
            type: string;
          }[];
        }[];
        chooseNum: number;
        level: number;
        href: string;
        ruleType: string;
        multiSelect: boolean;
        shortText: string;
        slug: string;
        shortTitle: string;
        staminaCost: number;
        title: string;
        text: {
          choices: string[];
          text: string;
          type: string;
        }[];
        costsFortunesFavor: boolean;
      }[];
      training: {
        armor: string[];
        magic: {
          options: string[];
          pick: number;
        };
        shields: string[];
        weapons: {
          melee: {
            options: string[];
            pick: number;
          };
          ranged: {
            options: string[];
            pick: number;
          };
          special: {
            options: string[];
            pick: number;
          };
        };
      };
    };
    characterCulture: {
      description: string;
      href: string;
      languages: string[];
      shortTitle: string;
      slug: string;
      stat: string;
      traits: {
        actionType: string;
        simpleChoices: {
          type: string;
          choices: string[];
          text: string;
        }[];
        complexChoices: {
          href: string;
          shortTitle: string;
          actionType: string;
          costsFortunesFavor: boolean;
          multiSelect: boolean;
          ruleType: string;
          shortText: string;
          slug: string;
          staminaCost: number;
          title: string;
          text: {
            choices: string[];
            text: string;
            type: string;
          }[];
        }[];
        chooseNum: number;
        costsFortunesFavor: boolean;
        href: string;
        multiSelect: boolean;
        ruleType: string;
        shortText: string;
        shortTitle: string;
        slug: string;
        staminaCost: number;
        text: {
          choices: string[];
          type: string;
          text: string;
        }[];
        title: string;
      }[];
      title: string;
    };
    characterLineage: {
      description: string;
      href: string;
      shortTitle: string;
      size: string;
      slug: string;
      speeds: {
        type: string;
        speed: number;
      }[];
      stat: string;
      title: string;
      traits: {
        actionType: string;
        simpleChoices: {
          type: string;
          choices: string[];
          text: string;
        }[];
        complexChoices: {
          href: string;
          shortTitle: string;
          actionType: string;
          costsFortunesFavor: boolean;
          multiSelect: boolean;
          ruleType: string;
          shortText: string;
          slug: string;
          staminaCost: number;
          title: string;
          text: {
            choices: string[];
            text: string;
            type: string;
          }[];
        }[];
        chooseNum: number;
        costsFortunesFavor: boolean;
        href: string;
        multiSelect: boolean;
        ruleType: string;
        shortText: string;
        shortTitle: string;
        slug: string;
        staminaCost: number;
        title: string;
        text: {
          choices: string[];
          text: string;
          type: string;
        }[];
      }[];
    };
  };
  characterCulture: {
    description: string;
    href: string;
    languages: string[];
    shortTitle: string;
    slug: string;
    stat: string;
    traits: {
      actionType: string;
      simpleChoices: {
        type: string;
        choices: string[];
        text: string;
      }[];
      complexChoices: {
        href: string;
        shortTitle: string;
        actionType: string;
        costsFortunesFavor: boolean;
        multiSelect: boolean;
        ruleType: string;
        shortText: string;
        slug: string;
        staminaCost: number;
        title: string;
        text: {
          choices: string[];
          text: string;
          type: string;
        }[];
      }[];
      chooseNum: number;
      costsFortunesFavor: boolean;
      href: string;
      multiSelect: boolean;
      ruleType: string;
      shortText: string;
      shortTitle: string;
      slug: string;
      staminaCost: number;
      text: {
        choices: string[];
        type: string;
        text: string;
      }[];
      title: string;
    }[];
    title: string;
  };
  characterLineage: {
    description: string;
    href: string;
    shortTitle: string;
    size: string;
    slug: string;
    speeds: {
      type: string;
      speed: number;
    }[];
    stat: string;
    title: string;
    traits: {
      actionType: string;
      simpleChoices: {
        type: string;
        choices: string[];
        text: string;
      }[];
      complexChoices: {
        href: string;
        shortTitle: string;
        actionType: string;
        costsFortunesFavor: boolean;
        multiSelect: boolean;
        ruleType: string;
        shortText: string;
        slug: string;
        staminaCost: number;
        title: string;
        text: {
          choices: string[];
          text: string;
          type: string;
        }[];
      }[];
      chooseNum: number;
      costsFortunesFavor: boolean;
      href: string;
      multiSelect: boolean;
      ruleType: string;
      shortText: string;
      shortTitle: string;
      slug: string;
      staminaCost: number;
      title: string;
      text: {
        choices: string[];
        text: string;
        type: string;
      }[];
    }[];
  };
  characterClasses: {
    attackStat: string;
    complexity: number;
    damage: {
      count: number;
      stat: string;
      dice: string;
      type: string;
    }[];
    description: string;
    extra: {
      forms: {
        armor: {
          baseArmor: number;
          stat: string;
        };
        attackStat: string;
        damage: {
          dice: string;
          stat: string;
          type: string;
          count: number;
        }[];
        features: {
          text: string;
          title: string;
        }[];
        href: string;
        shortTitle: string;
        size: string;
        slug: string;
        title: string;
      }[];
    };
    health: number;
    healthOnLevel: number;
    href: string;
    shortTitle: string;
    range: {
      max: number;
      min: number;
    };
    slug: string;
    stamina: number;
    staminaOnLevel: number;
    staminaStat: string;
    title: string;
    features: {
      actionType: string;
      simpleChoices: {
        type: string;
        choices: string[];
        text: string;
      }[];
      complexChoices: {
        href: string;
        shortTitle: string;
        actionType: string;
        costsFortunesFavor: boolean;
        multiSelect: boolean;
        ruleType: string;
        shortText: string;
        slug: string;
        staminaCost: number;
        title: string;
        text: {
          choices: string[];
          text: string;
          type: string;
        }[];
      }[];
      chooseNum: number;
      level: number;
      href: string;
      ruleType: string;
      multiSelect: boolean;
      shortText: string;
      slug: string;
      shortTitle: string;
      staminaCost: number;
      title: string;
      text: {
        choices: string[];
        text: string;
        type: string;
      }[];
      costsFortunesFavor: boolean;
    }[];
    training: {
      armor: string[];
      magic: {
        options: string[];
        pick: number;
      };
      shields: string[];
      weapons: {
        melee: {
          options: string[];
          pick: number;
        };
        ranged: {
          options: string[];
          pick: number;
        };
        special: {
          options: string[];
          pick: number;
        };
      };
    };
  }[];
  cultures: {
    description: string;
    href: string;
    languages: string[];
    shortTitle: string;
    slug: string;
    stat: string;
    traits: {
      actionType: string;
      simpleChoices: {
        type: string;
        choices: string[];
        text: string;
      }[];
      complexChoices: {
        href: string;
        shortTitle: string;
        actionType: string;
        costsFortunesFavor: boolean;
        multiSelect: boolean;
        ruleType: string;
        shortText: string;
        slug: string;
        staminaCost: number;
        title: string;
        text: {
          choices: string[];
          text: string;
          type: string;
        }[];
      }[];
      chooseNum: number;
      costsFortunesFavor: boolean;
      href: string;
      multiSelect: boolean;
      ruleType: string;
      shortText: string;
      shortTitle: string;
      slug: string;
      staminaCost: number;
      text: {
        choices: string[];
        type: string;
        text: string;
      }[];
      title: string;
    }[];
    title: string;
  }[];
  lineages: {
    description: string;
    href: string;
    shortTitle: string;
    size: string;
    slug: string;
    speeds: {
      type: string;
      speed: number;
    }[];
    stat: string;
    title: string;
    traits: {
      actionType: string;
      simpleChoices: {
        type: string;
        choices: string[];
        text: string;
      }[];
      complexChoices: {
        href: string;
        shortTitle: string;
        actionType: string;
        costsFortunesFavor: boolean;
        multiSelect: boolean;
        ruleType: string;
        shortText: string;
        slug: string;
        staminaCost: number;
        title: string;
        text: {
          choices: string[];
          text: string;
          type: string;
        }[];
      }[];
      chooseNum: number;
      costsFortunesFavor: boolean;
      href: string;
      multiSelect: boolean;
      ruleType: string;
      shortText: string;
      shortTitle: string;
      slug: string;
      staminaCost: number;
      title: string;
      text: {
        choices: string[];
        text: string;
        type: string;
      }[];
    }[];
  }[];
}
const ConvertToPlayerCharacter = (data: Data): PlayerCharacter => {
  const characterClass = new CharacterClassData(data.character.characterClass);
  const culture = new CharacterCulture(data.character.characterCulture);
  const lineage = new CharacterLineage(data.character.characterLineage);
  const character = new PlayerCharacter(
    culture,
    lineage,
    characterClass,
    undefined,
  );
  character.stats = {
    mettle: data.character.mettle,
    agility: data.character.agility,
    intellect: data.character.intellect,
    heart: data.character.heart,
  };
  character.currentHealth = data.character.currentHealth;
  character.currentStamina = data.character.currentStamina;
  character.coin = data.character.coin;
  character.level = data.character.level;
  character.name = data.character.name;
  character.id = data.character.id;
  return character;
};

const convertPlayerCharacterToGraphInput = (character: PlayerCharacter) => {
  console.log("Choices", character.choices);
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
};

const CharacterSheet = ({ characterId }: { characterId: number }) => {
  const [character, setCharacter] = useState<PlayerCharacter | undefined>(
    undefined,
  );
  const [characterOptions, setCharacterOptions] = useState<
    CharacterOptions | undefined
  >(undefined);
  const [isEditable, setEditable] = useState(false);
  const [loadingError, setLoadingError] = useState<any>(null);
  const [updateCharacter, { data, loading, error }] = useMutation(
    UPDATE_CHARACTER_MUTATION,
  );
  const saveCharacter = async (character: PlayerCharacter) => {
    const { data } = await updateCharacter({
      variables: {
        id: characterId,
        characterInputs: convertPlayerCharacterToGraphInput(character),
      },
    });
    return data;
  };
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await client.query({
          query,
          variables: { id: Number(characterId) },
        });
        setCharacter(
          ConvertToPlayerCharacter(data).UpdateChoices(
            data.character.featureChoiceSlugs,
          ),
        );
        const charOptions: CharacterOptions = {
          characterClasses: [],
          characterCultures: [],
          characterLineages: [],
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
      } catch (error) {
        setLoadingError(error);
      }
    };
    fetchData();
  }, [characterId]);

  useEffect(() => {
    if (character) {
      const debouncedSave = debounce(() => {
        if (!characterId) throw new Error("Cannot update character without ID");
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

  const editCharacter = () => {
    setEditable(true);
  };

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
            isEditable={isEditable}
          />
        </div>
      </div>
      {isEditable ? (
        <button
          onClick={() => {
            setEditable(false);
          }}
          type="button"
        >
          Lock
        </button>
      ) : (
        <button onClick={editCharacter} type="button">
          Edit Character
        </button>
      )}
    </>
  );
};

export default CharacterSheet;
