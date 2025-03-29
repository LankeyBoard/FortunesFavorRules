import RuleField from "@/components/RuleField";
import RuleData from "@/utils/GenericRuleData";
import client from "@/utils/graphQLclient";
import { GenericRule } from "@/utils/graphQLtypes";
import { gql } from "@apollo/client";

const query = gql`
  query GetGenericRules {
    genericRules {
      href
      lists {
        label
        items
      }
      ruleType
      shortText
      shortTitle
      slug
      title
      subRules {
        href
        lists {
          label
          items
        }
        ruleType
        shortText
        shortTitle
        subRules {
          href
          lists {
            label
            items
          }
          ruleType
          shortText
          shortTitle
          slug
          text {
            text
            type
            choices
          }
          title
          subRules {
            href
            lists {
              label
              items
            }
            ruleType
            shortText
            shortTitle
            slug
            text {
              text
              type
              choices
            }
            title
          }
        }
        slug
        text {
          choices
          text
          type
        }
        title
      }
      text {
        choices
        text
        type
      }
    }
  }
`;

async function GeneralRule() {
  const { data } = await client.query({
    query,
  });
  const rules: GenericRule[] = [];
  data.genericRules.forEach((rule: any) => {
    rules.push(
      new RuleData(
        rule.title,
        rule.slug,
        rule.ruleType,
        rule.text,
        rule.subRules,
        rule.lists,
      ),
    );
  });
  return (
    <>
      {rules.map((rule) => {
        return <RuleField field={rule} depth={1} key={rule.slug} />;
      })}
    </>
  );
}

export default GeneralRule;
