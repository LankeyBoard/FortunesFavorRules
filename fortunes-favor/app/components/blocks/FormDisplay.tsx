import { size_options, stat_options } from "@/app/enums";

export type Form = {
  armor: {
    baseArmor: number;
    stat?: stat_options;
  };
  attackStat: stat_options;
  damage: [
    {
      count: number;
      dice: number;
      stat?: stat_options;
      type: [string];
    },
  ];
  features: [
    {
      text: string;
      title?: string;
    },
  ];
  href?: string;
  shortTitle?: string;
  size: size_options;
  slug: string;
  title: string;
};

type formProps = {
  form: Form;
};
type damageTypesProps = {
  damageArr: string[];
};
const DamageTypes = ({ damageArr }: damageTypesProps) => {
  if (damageArr.length < 1) {
    return;
  } else if (damageArr.length === 1) {
    return <span>{damageArr}</span>;
  } else {
    return (
      <span>
        {damageArr.map((dmg, i) => {
          if (i < damageArr.length - 2) {
            return <span key={dmg}>{dmg}, </span>;
          } else if (i === damageArr.length - 2) {
            return (
              <span key={dmg}>
                {dmg}, <span className="lowercase">or</span>{" "}
              </span>
            );
          } else {
            return <span key={dmg}>{dmg}</span>;
          }
        })}
      </span>
    );
  }
};

const FormDisplay = ({ form }: formProps) => {
  return (
    <div className="md:mx-10 bg-slate-200 dark:bg-slate-800 my-5">
      <h1 className="bg-teal-200 dark:bg-teal-800 text-lg p-2 font-semibold">
        {form.title}
      </h1>
      <div className="px-4 py-2">
        <span className="font-bold">Size: </span>
        <span className="capitalize">{form.size.toLocaleLowerCase()}</span>
        <div>
          <span className="font-bold">Armor: </span>
          <span className="capitalize">
            {form.armor.baseArmor}{" "}
            {form.armor.stat && "+ " + form.armor.stat.toLocaleLowerCase()}
          </span>
        </div>
        <div>
          <span className="font-bold">Base Attack Stat: </span>
          <span className="capitalize">
            {form.attackStat.toLocaleLowerCase()}
          </span>
        </div>
        <div className="mb-4">
          <span className="font-bold">Damage: </span>
          {form.damage.map((damage, index) => {
            return (
              <span
                key={damage.count + "-" + damage.dice}
                className="capitalize"
              >
                {damage.count}d{damage.dice}{" "}
                {damage.stat && "+ " + damage.stat.toLocaleLowerCase()}{" "}
                <span className="italic">
                  <DamageTypes damageArr={damage.type} />
                  {form.damage.length > 1 &&
                    index < form.damage.length - 1 &&
                    " + "}
                </span>
              </span>
            );
          })}
        </div>
        <div>
          {form.features.map((feature) => {
            return (
              <div key={feature.text} className="mb-2">
                {feature.title && (
                  <h3 className="inline font-semibold">{feature.title}: </h3>
                )}
                <span>{feature.text}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default FormDisplay;
