import Loading from "@/components/blocks/Loading";
import FullPageLoading from "@/components/FullPageLoading";
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
  const { data, loading, error } = await client.query({
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
  if (loading || !data) {
    return <FullPageLoading />;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  }
  return (
    <>
      {rules.map((rule) => {
        const plainRule = {
          title: rule.title,
          slug: rule.slug,
          ruleType: rule.ruleType,
          text: rule.text,
          subRules: rule.subRules,
          lists: rule.lists,
          shortText: rule.shortText,
        };
        return <RuleField field={plainRule} depth={1} key={rule.slug} />;
      })}
    </>
  );
}

export default GeneralRule;
