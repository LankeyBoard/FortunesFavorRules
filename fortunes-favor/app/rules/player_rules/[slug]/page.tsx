import RuleField from "@/components/RuleField";
import RuleData from "@/utils/GenericRuleData";
import client from "@/utils/graphQLclient";
import { GenericRule } from "@/utils/graphQLtypes";
import { gql } from "@apollo/client";

const query = gql`
  query GetGenericRule($slug: String) {
    genericRules(slug: $slug) {
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
            options
          }
          title
        }
        slug
        text {
          options
          text
          type
        }
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
              options
            }
            title
          }
          slug
          text {
            options
            text
            type
          }
          title
        }
      }
      text {
        options
        text
        type
      }
    }
  }
`;

async function GeneralRule(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const { data } = await client.query({
    query,
    variables: { slug: params.slug },
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
        rule.list,
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
