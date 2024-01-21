import RulesNav from "../../components/blocks/RulesNav"
import { readdirSync } from 'fs'

const getDirectories = (source: string) =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)

export default function Layout({ children }: {children: React.ReactNode}) {
    return(
        <div className="h-screen flex">
            <div className="w-60 bg-gradient-to-b from-indigo-950 to-blue-900 p-4">
                <RulesNav directories={getDirectories("./app/pages/getting_started")} />
            </div>
            <div className="flex-1 flex overflow-hidden pl-10">
                <div className="flex-1 overflow-y-scroll">
                    {children}
                </div>
            </div>
        </div>
    )
}