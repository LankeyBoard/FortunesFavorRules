import { Dispatch, MouseEventHandler, SetStateAction } from "react"

type cardProps = {
    title: string,
    text: string,
    slug: string,
    pickCard: Function,
    selectedSlug?: string;
}
const Card = ({title, text, slug, pickCard, selectedSlug}: cardProps) => {
    const cardStyle = "hover:text-slate-300 cursor-pointer hover:tracking-wide m-2 ".concat(slug===selectedSlug?"bg-emerald-900 scale-105": "bg-slate-700");
    const titleStyle = "w-full text-lg font-semibold p-3 mb-2 h-18 ".concat(slug===selectedSlug? "bg-green-700" : "bg-teal-700");
    return(
        <div className="w-1/4 p-2" key={title}>
            <div onClick={()=> pickCard(slug)} className={cardStyle}>
                <div className={titleStyle}>{title}</div>
                <div className="px-3 pb-3">
                    <div className="line-clamp-3">{text}</div>
                </div>
            </div>
        </div>
    )
}

export default Card