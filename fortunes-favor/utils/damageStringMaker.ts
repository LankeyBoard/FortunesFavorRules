import { Damage } from "./graphQLtypes";
import { Stats } from "./PlayerCharacter";

const DamageStringMaker = (dmg: Damage, stats: Stats): string => {
  const diceStr = dmg.count ? `${dmg.count}d${dmg.dice}` : null;
  const statStr = dmg.stat
    ?.map((s) =>
      stats[s.toLowerCase() as keyof Stats] > 0
        ? "+" + stats[s.toLowerCase() as keyof Stats]
        : "",
    )
    .join("+");
  let returnString = diceStr ?? "";
  if (statStr) returnString = returnString.concat(` + ${statStr}`);
  if (dmg.flat) returnString = returnString.concat(` + ${dmg.flat}`);
  if (dmg.type) returnString = returnString.concat(` + ${dmg.type}`);
  return returnString;
};
export default DamageStringMaker;
