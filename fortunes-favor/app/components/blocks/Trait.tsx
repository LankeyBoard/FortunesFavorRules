
export class trait {
    title: string;
    text: string;
    constructor(json: any){
        this.title = json.title;
        this.text = json.text;
    }
}
const Trait = ({t}: {t: trait}) => {
    return(
        <div>
            <span className="font-semibold">{t.title} - </span>
            <span>{t.text}</span>
        </div>
    )
}

export default Trait;