import { RuleText } from "@/app/utils/graphQLtypes";
import SlugLinker from "./SlugLinker";

const textStyler = (textType?: string) => {
  let style = "pt-3 ";
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

const TextBlock = ({ text, style }: { text: RuleText[]; style?: string }) => {
  return (
    <div className={style}>
      {text.map((t) => {
        return (
          <p key={t.text} className={textStyler(t.type)}>
            {t.type == "EG" && <span>Eg: </span>}
            <SlugLinker text={t.text} />
          </p>
        );
      })}
    </div>
  );
};

export default TextBlock;
