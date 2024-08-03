import { RuleText } from "@/app/utils/graphQLtypes";
import SlugLinker from "./SlugLinker";

const textStyler = (textType?: string) => {
  let style = "pt-3 break-after-all ";
  switch (textType) {
    case "FLAVOR":
      style += "italic";
      break;
    case "EG":
      style += "font-light";
      break;
    case "CHOICE":
      style += "font-light";
  }
  return style;
};

const TextBlock = ({
  text,
  style,
  inline,
}: {
  text: RuleText[];
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
              {t.type == "EG" && <span>Eg: </span>}
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
          <p key={t.text} className={textStyler(t.type)}>
            {t.type == "EG" && <span>Eg: </span>}
            <SlugLinker text={t.text} />
            {t.options && (
              <ul>
                {t.options.map((o) => (
                  <li key={o}>o</li>
                ))}
              </ul>
            )}
          </p>
        );
      })}
    </div>
  );
};

export default TextBlock;
