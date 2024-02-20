import { rule_type, complexity_options } from "../enums";
import { getOrdinal } from "../utils/utils";
import { ReactElement } from "react";
import CharacterFeature from "../utils/CharacterFeature";
import { TextField } from "@/app/utils/FieldTypes";
import CharacterClassData, { TrainingOptions } from "../utils/CharacterClass";
import SlugLinker from "./blocks/SlugLinker";

type fieldProps = {
  field: TextField;
};
const FieldDisplay = ({ field }: fieldProps) => {
  const displayVariants = {
    reg: "",
    flavor: "italic",
    eg: "italic text-slate-300",
  };
  let fieldDisplayStyle = displayVariants.reg;
  switch (field.type) {
    case rule_type.Flavor:
      fieldDisplayStyle = displayVariants.flavor;
      break;
    case rule_type.Eg:
      fieldDisplayStyle = displayVariants.eg;
      break;
  }
  return (
    <div className={fieldDisplayStyle}>
      {field.type === rule_type.Eg && <span>Eg. </span>}
      <SlugLinker text={field.text} />
    </div>
  );
};
type featureProps = {
  feature: CharacterFeature;
};
const FeatureDisplay = ({ feature }: featureProps) => {
  return (
    <div id={feature.slug} className="bg-slate-200 dark:bg-slate-800 my-5">
      <div className="bg-teal-300 dark:bg-teal-700 text-lg p-2 font-semibold">
        {feature.title}
        <div className="text-slate-700 dark:text-slate-200 text-sm ordinal float-right">
          {feature.level + getOrdinal(feature.level)} level
        </div>
      </div>
      <div className="px-4 py-2">
        {(feature.stamina || feature.ff) && (
          <div className="mb-2" id="FeatureCosts">
            <span className="font-semibold">Costs - </span>
            {feature.stamina ? (
              <span id="StaminaCost">{feature.stamina} Stamina</span>
            ) : (
              <></>
            )}
            {feature.stamina && feature.ff ? <span> & </span> : <></>}
            {feature.ff && <span id="FortuneCost">Fortune&apos;s Favor</span>}
          </div>
        )}
        <div className="space-y-2">
          {feature.fields.map((f) => (
            <FieldDisplay field={f} key={f.text} />
          ))}
        </div>
        {feature.choices && (
          <tbody className="mt-2 space-y-0.5">
            {feature.choices.map((c) => (
              <ChoiceDisplay choice={c} key={c.slug} />
            ))}
          </tbody>
        )}
      </div>
    </div>
  );
};

type choiceProps = {
  choice: TextField;
};
const ChoiceDisplay = ({ choice }: choiceProps) => {
  return (
    <tr className="">
      <td className="px-2" id={choice.slug}>
        <b>{choice.title}</b> -{" "}
        {choice.text?.map((t) => <FieldDisplay key={t.text} field={t} />)}
      </td>
    </tr>
  );
};

type trainingProps = {
  training_type: string;
  training_list: string[] | TrainingOptions | undefined;
};

const Training = ({ training_type, training_list }: trainingProps) => {
  console.log("training list = " + training_list);
  let training;
  if (
    !training_list ||
    (Array.isArray(training_list) && training_list.length === 0)
  )
    training = <span>None</span>;
  else if (!Array.isArray(training_list)) {
    training = (
      <span>
        <span>Choose </span>
        <span>{training_list.pick}</span>
        <span> of the following options [ </span>
        <span>{training_list.options.join(", ")}</span>
        <span> ]</span>
      </span>
    );
  } else {
    if (training_list.length > 0 && training_list[0] !== null)
      training = <span>[ {training_list.join(", ")} ]</span>;
    else training = <span>None</span>;
  }
  return (
    <li>
      <span className="font-normal">{training_type} - </span>
      <span className="font-light">{training}</span>
    </li>
  );
};

type tagProps = {
  text: string;
  style?: string;
};

const Tag = ({ text, style }: tagProps) => {
  const s = style ? style : "bg-teal-900";
  const tagStyle =
    s +
    " capitalize float-left rounded-lg py-2 px-4 mr-3 my-4 text-sm text-white";
  return <div className={tagStyle}>{text}</div>;
};
type classTagsProps = {
  c: CharacterClassData;
};

const ClassTags = ({ c }: classTagsProps) => {
  let tags: ReactElement[] = new Array();
  let tagStyle;
  switch (c.complexity) {
    case complexity_options.simple:
      tagStyle = "bg-green-800";
      break;
    case complexity_options.std:
      tagStyle = "bg-amber-800";
      break;
    case complexity_options.complex:
      tagStyle = "bg-blue-800";
      break;
    default:
      tagStyle = "bg-rose-500";
  }
  tags.push(<Tag style={tagStyle} text={c.complexity} />);
  tags.push(<Tag text={c.attackStat} />);
  if (c.attackStat !== c.damage.stat) {
    tags.push(<Tag text={c.damage.stat} />);
  }
  if (
    c.attackStat !== c.damage.stat &&
    c.damage.stat !== c.staminaStat &&
    c.attackStat !== c.staminaStat
  ) {
    tags.push(<Tag text={c.staminaStat} />);
  }
  return <div>{tags}</div>;
};

type classProps = {
  data: any;
};
const ClassRule = ({ data }: classProps) => {
  console.log("ClassRules input", data);
  const class_rules: CharacterClassData = new CharacterClassData(data);
  const rangeString =
    class_rules.range.min === 0
      ? "Melee - " + class_rules.range.max + "ft"
      : class_rules.range.min + "ft - " + class_rules.range.max + "ft";
  const dmgString =
    class_rules.damage.count +
    "d" +
    class_rules.damage.dice +
    " + " +
    class_rules.damage.stat;
  return (
    <div id={class_rules.slug}>
      <div className="w-full">
        <div className="text-3xl tracking-wide font-bold py-4 px-1">
          {class_rules.title}
        </div>
      </div>
      <ClassTags c={class_rules} />
      <div className="clear-both">
        <div className="mx-3">
          <p className="italic">{class_rules.description}</p>
        </div>
        <div className="mt-2">
          <div className="mx-3">
            <p>
              <span className="font-semibold">Health</span>
              <span className="">
                {" "}
                - {class_rules.health} (+{class_rules.healthOnLevel} on level
                up)
              </span>
            </p>
            <p>
              <span className="font-semibold clear-left">Stamina</span>
              <span>
                {" "}
                - {class_rules.stamina}+{class_rules.staminaStat} (+
                {class_rules.staminaOnLevel}+{class_rules.staminaStat} on level
                up)
              </span>
            </p>
          </div>
          <div
            id="classTraining"
            className="mt-2 p-3 border-amber-800 border-y-2"
          >
            <p className="font-semibold text-lg">Training</p>
            <ul className="px-4">
              <Training
                training_type="Armor"
                training_list={class_rules.training.armor}
              />
              <Training
                training_type="Shield"
                training_list={class_rules.training.shield}
              />
              <li>
                <p className="font-normal">Weapons </p>
                <ul className="font-extralight px-4">
                  <Training
                    training_type="Melee"
                    training_list={class_rules.training.weapon?.melee}
                  />
                  <Training
                    training_type="Ranged"
                    training_list={class_rules.training.weapon?.ranged}
                  />
                  <Training
                    training_type="Special"
                    training_list={class_rules.training.weapon?.special}
                  />
                </ul>
              </li>
              <Training
                training_type="Magic"
                training_list={class_rules.training.magic}
              />
            </ul>
          </div>
          <div className="mx-3 mt-2">
            <p>
              <span className="font-semibold">Attack Stat</span>
              <span className=""> - {class_rules.attackStat}</span>
            </p>
            <p>
              <span className="font-semibold clear-left">Range</span>
              <span> - {rangeString}</span>
            </p>
            <p>
              <span className="font-semibold clear-left">Damage</span>
              <span> - {dmgString}</span>
            </p>
          </div>
        </div>
      </div>
      <div id="features">
        <div className="my-4 mx-2 text-2xl tracking-wide">Features</div>
        <div className="px-10">
          {class_rules.features.map((f) => (
            <FeatureDisplay feature={f} key={f.slug} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ClassRule;
