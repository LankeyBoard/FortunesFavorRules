import { rule_type } from "../enums";
import { GenericRule } from "../utils/graphQLtypes";
import SlugLinker from "./blocks/SlugLinker";

const titleStyler = (depth: number) => {
  switch (depth) {
    case 1:
      return "text-3xl tracking-wide font-bold py-4 px-1";
    case 2:
      return "mt-3 mb-1 mx-2 text-2xl tracking-wide";
    case 3:
      return "text-lg p-2 font-semibold";
  }
};

type fieldProps = {
  field: GenericRule;
  depth?: number;
};
const RuleField = ({ field, depth = 3 }: fieldProps) => {
  return (
    <div id={field.slug} className="">
      <div className={titleStyler(depth)}>{field.title}</div>
      <div
        className={field.ruleType != rule_type.List ? "pb-2 mx-5" : "pb-2 mx-2"}
      >
        {field.text != undefined && typeof field.text === "string" && (
          <div className="">
            <SlugLinker text={field.text} />
          </div>
        )}
        {field.text != undefined && typeof field.text !== "string" && (
          <div className="mb-2 space-y-3">
            {field.text.map((row) => {
              return (
                <div className="" key={row.text}>
                  <SlugLinker text={row.text} />
                </div>
              );
            })}
          </div>
        )}
        {field.rules && field.ruleType === rule_type.CompactList && (
          <div>
            {field.rules.map((rule) => (
              <div key={rule.slug}>
                {rule.title ? (
                  <>
                    <span className="text-amber-600">- </span>
                    <span className="font-semibold">{rule.title}</span>
                    <span>
                      {" "}
                      -{" "}
                      {rule.text?.map((t) => (
                        <SlugLinker key={t.text} text={t.text} />
                      ))}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-amber-600">- </span>
                    <span>
                      {rule.text?.map((t) => (
                        <SlugLinker key={t.text} text={t.text} />
                      ))}
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
        {field.rules && field.ruleType !== rule_type.CompactList && (
          <ul className="">
            {field.rules.map((f) => (
              <li className={f.title ? "" : "space-y-2"} key={f.slug}>
                <RuleField field={f} depth={depth + 1}></RuleField>
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* {field.rules && (
        <div className={depth > 1 ? "mx-4 border-amber-800 border-l-2" : ""}>
          {field.rules !== undefined && (
            <div className="">
              {field.rules.map((f) => (
                <RuleField field={f} depth={depth + 1} key={f.slug}></RuleField>
              ))}
            </div>
          )}
        </div>
      )} */}
    </div>
  );
};

export default RuleField;
