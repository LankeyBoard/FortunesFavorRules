import { CharacterTrait } from "../utils/CharacterTrait";
import Trait from "./blocks/Trait";

const Traits = ({
  title,
  traits,
}: {
  title: string;
  traits: [CharacterTrait];
}) => {
  return (
    <div>
      <span className="text-lg font-semibold">{title}</span>
      <div className="px-3 border-amber-800 border-l-2 space-y-1">
        {traits.map((t) => {
          return <Trait t={t} key={t.title} />;
        })}
      </div>
    </div>
  );
};

export default Traits;
