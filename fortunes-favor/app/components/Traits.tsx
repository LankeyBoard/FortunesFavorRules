import Trait, {trait} from "./blocks/Trait";

const Traits = ({title, traits}: {title: string, traits: [trait]}) => {
    return(
        <div>
            <span className="text-lg font-semibold">{title}</span>
            <div className="px-3 border-amber-800 border-l-2 space-y-1">
            {traits.map(t => {
                return(
                    <Trait t={t}/>
                )
            })}
            </div>
        </div>
    )
}

export default Traits;