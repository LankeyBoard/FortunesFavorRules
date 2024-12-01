import { rule_type, complexity_options, stat_options } from "../enums";
import { getOrdinal } from "../utils/utils";
import { ReactElement } from "react";
import CharacterFeature from "../utils/CharacterFeature";
import CharacterClass, { TrainingOptions } from "../utils/CharacterClass";
import SlugLinker from "./blocks/SlugLinker";
import { Deflect, RuleText } from "../utils/graphQLtypes";
import FormDisplay, { Form } from "./blocks/FormDisplay";
import { CharacterClass as ClassGraphType } from "../types.generated";
import TextBlock from "./blocks/TextBlock";

type fieldProps = {
  field: RuleText;
};
const FieldDisplay = ({ field }: fieldProps) => {
  const displayVariants = {
    reg: "inline",
    flavor: "inline italic",
    eg: "inline italic text-slate-700 dark:text-slate-300",
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
      <span className="block" />
    </div>
  );
};
type featureProps = {
  feature: CharacterFeature;
};
const FeatureDisplay = ({ feature }: featureProps) => {
  return (
    <div id={feature.slug} className="bg-slate-200 dark:bg-slate-800 my-5">
      <div className="bg-teal-200 dark:bg-teal-800 text-lg p-2 font-semibold">
        {feature.title}
        <div className="text-slate-700 dark:text-slate-200 float-right text-base ordinal">
          {feature.level}
          <span className="underline text-xs align-text-top">
            {getOrdinal(feature.level)}
          </span>{" "}
          level
        </div>
      </div>
      <div className="px-2 md:px-4 py-2">
        {(feature.staminaCost || feature.costsFortunesFavor) && (
          <div className="mb-2" id="FeatureCosts">
            <span className="font-semibold">Costs: </span>
            {feature.staminaCost ? (
              <span id="StaminaCost">{feature.staminaCost} Stamina</span>
            ) : (
              <></>
            )}
            {feature.staminaCost && feature.costsFortunesFavor ? (
              <span> & </span>
            ) : (
              <></>
            )}
            {feature.costsFortunesFavor && (
              <span id="FortuneCost">Fortune&apos;s Favor</span>
            )}
          </div>
        )}
        <TextBlock text={feature.text} />
        <div className="md:m-4 my-4 ">
          {feature.choices &&
            feature.choices.length > 0 &&
            feature.choices.map((choice) => {
              if (typeof choice.text === "string") {
                return <p key={choice.text}>{choice.text}</p>;
              } else if ("slug" in choice) {
                return (
                  <div
                    key={choice.slug}
                    id={choice.slug}
                    className="odd:bg-slate-300 dark:odd:bg-slate-700 p-2"
                  >
                    <h3 className="text-lg font-semibold">{choice.title}</h3>
                    {choice.staminaCost > 0 && (
                      <>
                        <span className="font-semibold">Costs:</span>{" "}
                        <span>{choice.staminaCost} Stamina</span>
                      </>
                    )}
                    <TextBlock text={choice.text} style="mx-2 font-light" />
                  </div>
                );
              }
            })}
        </div>
      </div>
    </div>
  );
};

type extrasDisplayProps = {
  extras: any;
};

const ExtrasDisplay = ({ extras }: extrasDisplayProps) => {
  if (extras.forms) {
    return (
      <div>
        <h1 className="py-2 my-2 px-2 text-2xl tracking-wide bg-purple-300 dark:bg-purple-800">
          Forms
        </h1>
        {extras.forms.map((form: Form) => (
          <FormDisplay form={form} key={form.slug} />
        ))}
      </div>
    );
  }
};

type trainingProps = {
  training_type: string;
  training_list: string[] | TrainingOptions | undefined;
};

const Training = ({ training_type, training_list }: trainingProps) => {
  let training;
  if (
    !training_list ||
    (Array.isArray(training_list) && training_list.length === 0)
  )
    training = <span>None</span>;
  else if (!Array.isArray(training_list)) {
    if (!training_list.pick || training_list.pick === 0) {
      training = (
        <span>
          <span>[ </span>
          <span className="capitalize">{training_list.options.join(", ")}</span>
          <span> ]</span>
        </span>
      );
    } else if (training_list.options.length === 1) {
      training = (
        <span>
          <span>Choose </span>
          <span>{training_list.pick}</span>
          <span> {training_list.options}</span>
        </span>
      );
    } else {
      training = (
        <span>
          <span>Choose </span>
          <span>{training_list.pick}</span>
          <span> of the following options [ </span>
          <span>{training_list.options.join(", ")}</span>
          <span> ]</span>
        </span>
      );
    }
  } else {
    if (training_list.length > 0 && training_list[0] !== null)
      training = <span>[ {training_list.join(", ")} ]</span>;
    else training = <span>None</span>;
  }
  return (
    <li>
      <span className="font-normal">{training_type}: </span>
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
    " capitalize float-left rounded-lg py-1 px-2 mr-2 my-2 text-sm text-white";
  return <div className={tagStyle}>{text}</div>;
};
type classTagsProps = {
  c: {
    complexity?: string;
    attackStat?: stat_options[];
    damage?: { stat?: stat_options[] };
    staminaStat?: stat_options;
  };
};

export const ClassTags = ({ c }: classTagsProps) => {
  let tags: ReactElement[] = new Array();
  let tagNames: string[] = new Array();
  let tagStyle;
  if ("complexity" in c && c.complexity) {
    switch (c.complexity.toLocaleLowerCase()) {
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
    tags.push(<Tag key={c.complexity} style={tagStyle} text={c.complexity.toLocaleLowerCase()} />);
  }
  if ("attackStat" in c && c.attackStat) {
    c.attackStat.forEach((stat) => {
      tags.push(<Tag text={stat.toLocaleLowerCase()} />);
      tagNames.push(stat);
    });
  }
  if ("damage" in c && c.damage && "stat" in c.damage && c.damage.stat)
    c.damage.stat.forEach((stat) => {
      if (!tagNames.includes(stat)) {
        tags.push(<Tag text={stat.toLocaleLowerCase()} />);
      }
    });
  if ("staminaStat" in c && c.staminaStat) {
    if (!tagNames.includes(c.staminaStat)) {
      tags.push(<Tag text={c.staminaStat.toLocaleLowerCase()} />);
    }
  }
  return <div className="mt-1">{tags}</div>;
};

type ClassTitleAndTagsProps = {
  classRules: CharacterClass;
};

export const ClassTitleAndTags = ({ classRules }: ClassTitleAndTagsProps) => {
  return (
    <div className="w-full h-fit bg-teal-300 dark:bg-teal-700">
      <div className="text-3xl tracking-wide font-bold h-16 bg-teal-300 dark:bg-teal-700 flex justify-between">
        <span className="py-4 px-3">{classRules.title}</span>{" "}
        <span className="text-base font-normal overflow-auto">
          <ClassTags c={classRules} />
        </span>
      </div>
    </div>
  );
};

type ClassDeflectProps = {
  classDeflect: Deflect;
}

const ClassDeflect = ({classDeflect}: ClassDeflectProps) => {
  return(
    <div className="mb-3">
      <span className="font-semibold clear-left">Deflect</span>:
      <span> {classDeflect.count}d{classDeflect.dice}</span> {classDeflect.flat > 0 &&<span> + {classDeflect.flat}</span>}
    </div>
  )
  
  
}

type classProps = {
  data: ClassGraphType;
};
const ClassRule = ({ data }: classProps) => {
  const class_rules: CharacterClass = new CharacterClass(data);
  let rangeString = "";
  if (class_rules.range.min === 0) {
    if (class_rules.range.max === 0) {
      rangeString = "Melee";
    } else rangeString = "Melee - " + class_rules.range.max + "ft";
  } else {
    rangeString =
      class_rules.range.min + "ft - " + class_rules.range.max + "ft";
  }
  const dmgString =
    class_rules.damage.count +
    "d" +
    class_rules.damage.dice +
    " + " +
    class_rules.damage.stat.join(", ").replace(/, ((?:.(?!, ))+)$/, " or $1");
  return (
    <div id={class_rules.slug}>
      <ClassTitleAndTags classRules={class_rules} />
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
                : {class_rules.health} (+{class_rules.healthOnLevel} on level
                up)
              </span>
            </p>
            <p>
              <span className="font-semibold clear-left">Stamina</span>
              <span>
                {" "}
                : {class_rules.stamina}+{class_rules.staminaStat} (+
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
                training_list={class_rules.training.shields}
              />
              <li>
                <p className="font-normal">Weapons </p>
                <ul className="font-extralight px-4">
                  <Training
                    training_type="Melee"
                    training_list={class_rules.training.weapons?.melee}
                  />
                  <Training
                    training_type="Ranged"
                    training_list={class_rules.training.weapons?.ranged}
                  />
                  <Training
                    training_type="Special"
                    training_list={class_rules.training.weapons?.special}
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

              <span className="">
                :{" "}
                {class_rules.attackStat
                  .join(", ")
                  .replace(/, ((?:.(?!, ))+)$/, " or $1")}
              </span>
            </p>
            <p>
              <span className="font-semibold clear-left">Range</span>
              <span>: {rangeString}</span>
            </p>
            <p>
              <span className="font-semibold clear-left">Damage</span>
              <span>: {dmgString}</span>
            </p>
            <ClassDeflect classDeflect={class_rules.deflect}/>
          </div>
        </div>
      </div>
      
      <div id="features">
        <div className="py-2 my-2 px-2 text-2xl tracking-wide bg-purple-300 dark:bg-purple-800">
          Features
        </div>
        <div className="md:px-10">
          {class_rules.features.map((f) => (
            <FeatureDisplay feature={f} key={f.slug} />
          ))}
        </div>
      </div>
      {class_rules.extra && (
        <div id="extras">
          <ExtrasDisplay extras={class_rules.extra} />
        </div>
      )}
    </div>
  );
};

export default ClassRule;
