import RulesNav from "../components/blocks/RulesNav"

export default function Layout({ children }: {children: React.ReactNode}) {
    return(
        <div className="grid grid-cols-10">
            <div className="col-span-1">
                <RulesNav />
            </div>
            <div className="col-span-9">
                {children}
            </div>
        </div>
    )
}