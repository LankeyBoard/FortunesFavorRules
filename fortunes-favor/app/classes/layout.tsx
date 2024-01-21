import RulesNav from "../components/blocks/RulesNav"
import { readdirSync } from 'fs'

const getDirectories = (source: string) =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

export default function Layout({ children }: {children: React.ReactNode}) {
    return(
        <div className="grid grid-cols-10">
            <div className="col-span-2">
                <RulesNav directories={getDirectories("./app/classes")} />
            </div>
            <div className="col-span-6">
                {children}
            </div>
        </div>
    )
}