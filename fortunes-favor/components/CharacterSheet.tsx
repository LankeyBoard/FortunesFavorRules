"use client";

import client from "@/utils/graphQLclient";
import { gql } from "@apollo/client";
import { useState, useEffect } from "react";

const query = gql`
  query getCharacter($id: ID!) {
    character(id: $id) {
      name
      coin
      characterClass {
        attackStat
        complexity
        damage {
          count
          stat
          dice
          type
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
      featureChoiceSlugs
    }
  }
`;
interface Data {
  character: {
    name: string;
    coin: number;
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
    featureChoiceSlugs: string[];
  };
}

const PlayerCharacterSheet = ({ characterId }: { characterId: number }) => {
  const [data, setData] = useState<Data | undefined>(undefined);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await client.query({
          query,
          variables: { id: characterId },
        });
        setData(data);
      } catch (error) {
        setError(error);
      }
      console.log("Character: ", data, error);
    };
    fetchData();
  }, []);

  return <div>Character Sheet {data?.character.name}</div>;
};

export default PlayerCharacterSheet;
