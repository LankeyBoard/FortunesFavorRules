import RuleField from "@/app/components/RuleField";
import RuleData from "@/app/utils/GenericRuleData";
import { getClient } from "@/app/utils/graphQLclient";
import { GenericRule } from "@/app/utils/graphQLtypes";
import { gql } from "@apollo/client";

const query = gql`
  query GetGenericRule($slug: String) {
    genericRules(slug: $slug) {
      slug
      title
      list
      ruleType
      rules {
        list
        ruleType
        rules {
          list
          ruleType
          rules {
            list
            ruleType
            slug
            title
            text {
              text
              type
            }
          }
          slug
          text {
            text
            type
          }
          title
        }
        slug
        title
        text {
          text
          type
        }
      }
      text {
        text
        type
      }
    }
  }
`;

async function GeneralRule({ params }: { params: { slug: string } }) {
  const client = getClient();
  const { data } = await client.query({
    query,
    variables: { slug: params.slug },
  });
  console.log("rule query results", data);
  const rules: GenericRule[] = [];
  data.genericRules.forEach((rule: any) => {
    rules.push(
      new RuleData(
        rule.title,
        rule.slug,
        rule.ruleType,
        rule.text,
        rule.rules,
        rule.list
      )
    );
    console.log("rule-", rule);
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
