import { field_options } from "../enums";
import SlugLinker from "./blocks/SlugLinker";

export type field_type = {
  type: field_options;
  title?: string;
  slug?: string;
  text?: string | [string];
  eg?: string;
  list?: field_type[];
  rules?: field_type[];
};

export function fieldCreator(json: any) {
  if ("type" in json) {
    if (Object.values(field_options).includes(json.type)) {
      let f: field_type = { type: json.type };
      f = json;
      console.log("Field creator", f);
      return f;
    }
  }
  console.log("Error creating field from json", json);
  return null;
}

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
  field: field_type;
  depth?: number;
};
const Field = ({ field, depth = 1 }: fieldProps) => {
  return (
    <div id={field.slug} className="">
      <div className={titleStyler(depth)}>{field.title}</div>
      <div
        className={field.type != field_options.List ? "pb-2 mx-5" : "pb-2 mx-2"}
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
                <div className="" key={row}>
                  <SlugLinker text={row} />
                </div>
              );
            })}
          </div>
        )}

        {field.eg !== undefined && (
          <div>
            <p>
              e.g. <i>{field.eg}</i>
            </p>
          </div>
        )}
        {field.list && field.type === field_options.CompactList && (
          <div>
            {field.list.map((rule) => (
              <div key={rule.slug}>
                {rule.title ? (
                  <>
                    <span className="text-amber-600">- </span>
                    <span className="font-semibold">{rule.title}</span>
                    <span>
                      {" "}
                      - <SlugLinker text={rule.text} />
                    </span>
                  </>
                ) : (
                  <>
                    <span className="text-amber-600">- </span>
                    <span>
                      <SlugLinker text={rule.text} />
                    </span>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
        {field.list && field.type !== field_options.CompactList && (
          <ul className="">
            {field.list.map((f) => (
              <li className={f.title ? "" : "space-y-2"} key={f.slug}>
                <Field field={f} depth={depth + 1}></Field>
              </li>
            ))}
          </ul>
        )}
      </div>
      {field.rules && (
        <div className={depth > 1 ? "mx-4 border-amber-800 border-l-2" : ""}>
          {field.rules !== undefined && (
            <div className="">
              {field.rules.map((f) => (
                <Field field={f} depth={depth + 1} key={f.slug}></Field>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Field;
