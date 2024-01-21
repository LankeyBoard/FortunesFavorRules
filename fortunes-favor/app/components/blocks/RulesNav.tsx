import Link from "next/link";

const RulesNav = () => {
    return(
        <div className="flex-col my-5">
            <Link href={"./brawler"}>
                <div className="font-light text-lg hover:tracking-widest">
                    Brawler
                </div>
            </Link>
            <Link href={"./elementalist"}>
                <div className="font-light text-lg hover:tracking-widest">
                    Elementalist
                </div>
            </Link>
            <Link href={"./knight"}>
                <div className="font-light text-lg hover:tracking-widest">
                    Knight
                </div>
            </Link>
        </div>
    )
}

export default RulesNav;