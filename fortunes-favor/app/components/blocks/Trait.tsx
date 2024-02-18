import { CharacterTrait } from "@/app/utils/CharacterTrait";
const Trait = ({ t }: { t: CharacterTrait }) => {
  return (
    <div key={t.title + "trait"}>
      <span className="font-semibold">{t.title} - </span>
      <div>
        {t.text.map((t) => (
          <p key={t.text}>{t.text}</p>
        ))}
      </div>
    </div>
  );
};

export default Trait;
