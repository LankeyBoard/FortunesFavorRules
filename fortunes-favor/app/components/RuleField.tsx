import { rule_type } from "../enums";
import { GenericRule } from "../utils/graphQLtypes";
import SlugLinker from "./blocks/SlugLinker";
import TextBlock from "./blocks/TextBlock";

const titleStyler = (depth: number) => {
  switch (depth) {
    case 1:
      return "text-3xl tracking-wide font-bold py-4 px-2 bg-purple-300 dark:bg-purple-800";
    case 2:
      return "mt-3 mb-1 text-2xl px-2 tracking-wide";
    case 3:
      return "text-lg p-2 font-light text-lg";
  }
};

const CompactList = ({ rule }: { rule: GenericRule }) => {
  return (
    <div>
      {rule.title ? (
        <>
          <span className="text-amber-600">- </span>
          <span className="font-semibold">{rule.title}</span>
          <span>
            {" "}
            - {rule.text?.map((t) => <SlugLinker key={t.text} text={t.text} />)}
          </span>
        </>
      ) : (
        <>
          <span className="text-amber-600">- </span>
          <span>
            {rule.text?.map((t) => <SlugLinker key={t.text} text={t.text} />)}
          </span>
        </>
      )}
    </div>
  );
};

type fieldProps = {
  field: GenericRule;
  depth?: number;
};
const RuleField = ({ field, depth = 3 }: fieldProps) => {
  return (
    <div id={field.slug} className="z-0 scroll-mt-20">
      <div className={titleStyler(depth)}>{field.title}</div>
      <div className={field.ruleType != rule_type.List ? "pb-2" : "pb-2 mx-2"}>
        {field.text != undefined && typeof field.text === "string" && (
          <div className="mt-2">
            <SlugLinker text={field.text} />
          </div>
        )}
        {field.text != undefined && typeof field.text !== "string" && (
          <div className="mb-2 space-y-3 pl-4">
            <TextBlock text={field.text} style={depth === 1 ? "mt-3" : ""} />
          </div>
        )}
        {field.list && field.list.length > 0 && (
          <ul className="pl-4 text-slate-700 dark:text-slate-200 border-l-2 border-amber-800">
            {field.list.map((text) => {
              return (
                <li key={text}>
                  <SlugLinker text={text} />
                </li>
              );
            })}
          </ul>
        )}
        {field.subRules && field.ruleType === rule_type.CompactList && (
          <div className="pl-4">
            {field.subRules.map((rule) => (
              <CompactList key={rule.slug} rule={rule} />
            ))}
          </div>
        )}
        {field.subRules && field.ruleType === rule_type.List && (
          <div className="pl-4">
            {field.subRules.map((rule) => (
              <CompactList key={rule.slug} rule={rule} />
            ))}
          </div>
        )}
        {field.subRules && field.ruleType !== rule_type.CompactList && (
          <ul className="">
            {field.subRules.map((f) => (
              <li className={f.title ? "" : "space-y-2"} key={f.slug}>
                <RuleField field={f} depth={depth + 1}></RuleField>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default RuleField;
