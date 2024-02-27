import { CharacterTrait } from "@/app/utils/CharacterTrait";
const Trait = ({ t }: { t: CharacterTrait }) => {
  return (
    <div key={t.title + "trait"} className="">
      <span className="font-light">{t.title}: &nbsp;</span>
      <span className="">
        {t.text.map((t) => (
          <span key={t.text}>{t.text}</span>
        ))}
      </span>
    </div>
  );
};

export default Trait;
