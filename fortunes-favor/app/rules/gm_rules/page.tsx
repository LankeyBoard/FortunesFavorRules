import Loading from "@/components/blocks/Loading";
import FullPageLoading from "@/components/FullPageLoading";
import RuleField from "@/components/RuleField";
import RuleData from "@/utils/GenericRuleData";
import client from "@/utils/graphQLclient";
import { GenericRule } from "@/utils/graphQLtypes";
import { gql } from "@apollo/client";

const query = gql`
  query GetGMRules {
    rules(ruleSectionsToInclude: GM) {
      rules {
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
              }
              title
            }
          }
          slug
          text {
            text
            type
          }
          title
        }
        text {
          text
          type
        }
      }
    }
  }
`;

async function GMRules() {
  const { data, error } = await client.query({
    query,
  });
  const rules: GenericRule[] = [];
  data.rules.forEach((rule: { rules: any[] }) =>
    rule.rules.forEach((rule: any) => {
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
    }),
  );
  if (!data && !error) {
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

export default GMRules;
