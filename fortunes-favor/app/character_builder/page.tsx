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
