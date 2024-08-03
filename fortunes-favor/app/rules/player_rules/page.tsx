import RuleField from "@/app/components/RuleField";
import RuleData from "@/app/utils/GenericRuleData";
import { getClient } from "@/app/utils/graphQLclient";
import { GenericRule } from "@/app/utils/graphQLtypes";
import { gql } from "@apollo/client";

const query = gql`
  query GetGenericRules {
    genericRules {
      href
      list
      ruleType
      shortText
      shortTitle
      slug
      title
      subRules {
        href
        list
        ruleType
        shortText
        shortTitle
        subRules {
          href
          list
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
            list
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
  const client = getClient();
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
        rule.list
      )
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
