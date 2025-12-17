import FullPageLoading from "@/components/FullPageLoading";
import RuleField from "@/components/RuleField";
import RuleData from "@/utils/GenericRuleData";
import client from "@/utils/graphQLclient";
import GENERAL_RULES_QUERY from "@/utils/graphQLQueries/GeneralRulesQuery";
import { GenericRule } from "@/utils/graphQLtypes";

async function GeneralRule() {
  const { data, error } = await client.query({
    query: GENERAL_RULES_QUERY,
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
        rule.shortText,
        rule.img,
      ),
    );
  });
  if (!data && !error) {
    return <FullPageLoading />;
  } else if (error) {
    return <div>Error: {error.message}</div>;
  }
  console.log("Data", data);
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
          img: rule.img,
        };
        return <RuleField field={plainRule} depth={1} key={rule.slug} />;
      })}
    </>
  );
}

export default GeneralRule;
