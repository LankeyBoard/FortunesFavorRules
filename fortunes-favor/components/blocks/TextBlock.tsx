import { RuleText } from "@/utils/graphQLtypes";
import SlugLinker from "./SlugLinker";

const textStyler = (textType?: string) => {
  let style = "pt-3 break-after-all pr-2 ";
  switch (textType?.toUpperCase()) {
    case "FLAVOR":
      style += "italic";
      break;
    case "EG":
      style += "font-light italic";
      break;
    case "CHOICE":
      style += "font-light";
  }
  return style;
};

const TextBlock = ({
  text,
  style,
  inline = false,
}: {
  text?: RuleText[];
  style?: string;
  inline?: boolean;
}) => {
  if (!text) return;
  if (inline) {
    return (
      <span className={style}>
        {text.map((t) => {
          return (
            <span key={t.text} className={textStyler(t.type)}>
              {t.type == "EG" && (
                <span className={"font-light italic"}>Eg: </span>
              )}
              <SlugLinker text={t.text} />
            </span>
          );
        })}
      </span>
    );
  }
  return (
    <div className={style}>
      {text.map((t) => {
        return (
          <div key={t.text} className={textStyler(t.type)}>
            {t.type == "EG" && <span>Eg: </span>}
            <SlugLinker text={t.text} />
          </div>
        );
      })}
    </div>
  );
};

export default TextBlock;
