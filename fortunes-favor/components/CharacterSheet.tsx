"use client";

import client from "@/utils/graphQLclient";
import { gql } from "@apollo/client";
import { useState, useEffect } from "react";

import CharacterStaticInfo from "./blocks/CharacterStaticInfo";
import CharacterCoreInfo from "./blocks/CharacterCoreInfo";
import PlayerCharacter from "@/utils/PlayerCharacter";
import CharacterClassData from "@/utils/CharacterClass";
import CharacterCulture from "@/utils/CharacterCulture";
import CharacterLineage from "@/utils/CharacterLineage";
import CharacterFeatures from "./blocks/CharacterFeatures";

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
}
const ConvertToPlayerCharacter = (data: Data): PlayerCharacter => {
  const character = new PlayerCharacter();
  character.characterClass = new CharacterClassData(
    data.character.characterClass,
  );
  character.culture = new CharacterCulture(data.character.characterCulture);
  character.lineage = new CharacterLineage(data.character.characterLineage);
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
  return character;
};

const CharacterSheet = ({ characterId }: { characterId: number }) => {
  const [character, setCharacter] = useState<PlayerCharacter | undefined>(
    undefined,
  );
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await client.query({
          query,
          variables: { id: characterId },
        });
        setCharacter(ConvertToPlayerCharacter(data));
      } catch (error) {
        setError(error);
      }
    };
    fetchData();
  }, [characterId]);

  if (error) {
    console.error(error);
    return <div>Error loading character data.</div>;
  }

  if (!character) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md grid grid-cols-3 gap-2 ">
      <div className="bg-slate-600">
        <CharacterStaticInfo character={character} />
      </div>
      <div>
        <CharacterCoreInfo character={character} />
      </div>
      <div className="bg-slate-600">
        <CharacterFeatures character={character} />
      </div>
    </div>
  );
};

export default CharacterSheet;
