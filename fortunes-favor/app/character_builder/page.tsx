import BasicInfoBuilder from "./basic_info/builder";
import LineageSelectBuilder from "./lineage/builder";
import CultureSelectBuilder from "./culture/builder";
import ClassSelectBuilder from "./class/builder";
import QuestionsBuilder from "./questions/builder";
import PlayerCharacter from "../utils/PlayerCharacter";
import { gql } from "@apollo/client";
import { getClient } from "../utils/graphQLclient";
const query = gql`
  query AllCultures {
    cultures {
      description
      href
      languages
      shortTitle
      slug
      stat
      title
      traits {
        list
        ruleType
        rules {
          list
          rules {
            list
            ruleType
            shortText
            shortTitle
            slug
            title
            text {
              options
              text
              type
            }
          }
          ruleType
          shortText
          shortTitle
          text {
            options
            text
            type
          }
          slug
          title
        }
        shortText
        shortTitle
        slug
        title
        text {
          options
          text
          type
        }
      }
    }
  }
`;
const tabs = [
  {
    name: "Basic Info",
    href: "/character_builder/basic_info",
    isComplete: false,
    isEnabled: true,
  },
  {
    name: "Lineage",
    href: "/character_builder/lineage",
    isComplete: false,
    isEnabled: true,
  },
  {
    name: "Culture",
    href: "/character_builder/culture",
    isComplete: false,
    isEnabled: true,
  },
  {
    name: "Class",
    href: "/character_builder/class",
    isComplete: false,
    isEnabled: true,
  },
  {
    name: "Questions",
    href: "/character_builder/questions",
    isComplete: false,
    isEnabled: false,
  },
];

const COMPLETE_CURRENT = "bg-emerald-600";
const CURRENT = "bg-amber-800";
const COMPLETE = "bg-emerald-800";
const ENABLED = "bg-violet-900";
const DISABLED = "bg-slate-800";

const Tab = ({
  name,
  setCurrentTab,
  isCurrent,
  isComplete = false,
  isEnabled = true,
}: tabProps) => {
  let style = "basis-1/5 py-3 mx-2 rounded-t-lg text-center ";
  if (isCurrent && isComplete) style += COMPLETE_CURRENT + " cursor-default";
  else if (isCurrent) style += CURRENT + " cursor-default";
  else if (isComplete) style += COMPLETE + " cursor-pointer";
  else if (isEnabled)
    style +=
      ENABLED + " hover:bg-violet-800 hover:tracking-wider cursor-pointer";
  else style += DISABLED + " cursor-default";
  if (isEnabled && !isCurrent) {
    return (
      <div
        className={style}
        onClick={() => setCurrentTab(name)}
        key={name + "builder-tab"}
      >
        {name}
      </div>
    );
  } else {
    return (
      <div className={style} key={name}>
        {name}
      </div>
    );
  }
};

async function CharacterBuilder() {
  const client = getClient();
  const { data } = await client.query({
    query,
  });

  return (
    <div className="w-full">
      <div className="">
        {data.cultures.map((culture: any) => {
          return <div key={culture.slug}>{culture.title}</div>;
        })}
      </div>
    </div>
  );
}

export default CharacterBuilder;
