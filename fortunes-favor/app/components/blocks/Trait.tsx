import { CharacterTrait } from "@/app/utils/CharacterTrait";
const Trait = ({t}: {t: CharacterTrait}) => {
    return(
        <div key={t.title+"trait"}>
            <span className="font-semibold">{t.title} - </span>
            <span>{t.text}</span>
        </div>
    )
}

export default Trait;