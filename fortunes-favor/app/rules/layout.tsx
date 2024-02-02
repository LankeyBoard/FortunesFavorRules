import Rule from "../components/blocks/Rule"
import RulesNav from "../components/blocks/RulesNav"

export type nav = {
  title: string,
  href?: string,
  subroutes?: nav[]
}

const navRoutes: nav[] = [
  {
    "title": "Rules",
    "subroutes": [{
      "title": "Building A Character",
      "href": "/rules/player_rules/getting_started/building_a_character"
    },
    {
      "title": "Character Components",
      "href": "/rules/player_rules/getting_started/character_components"
    },
    {
      "title": "Character Resources",
      "href": "/rules/player_rules/getting_started/character_resources"
    },
    {
      "title": "Tests",
      "href": "/rules/player_rules/getting_started/tests"
    },
    {
      "title": "Combat",
      "href": "/rules/player_rules/getting_started/combat"
    },
    {
      "title": "Dying & Last Stand",
      "href": "/rules/player_rules/getting_started/dying"
    },
    {
      "title": "Healing",
      "href": "/rules/player_rules/getting_started/healing"
    },
    {
      "title": "Movement",
      "href": "/rules/player_rules/getting_started/movement"
    },
    {
      "title": "Lift, Drag, & Pack",
      "href": "/rules/player_rules/getting_started/lift_drag_pack"
    },
    {
      "title": "Equipment",
      "href": "/rules/player_rules/getting_started/equipment"
    },
    {
      "title": "Reference",
      "href": "/rules/player_rules/getting_started/references"
    }]
  },
  {
    "title": "Classes",
    "subroutes": [{
      "title": "Brawler",
      "href": "/rules/classes/brawler"
    },
    {
      "title": "Devoted",
      "href": "/rules/classes/devoted"
    },
    {
      "title": "Elementalist",
      "href": "/rules/classes/elementalist"
    },
    {
      "title": "Knight",
      "href": "/rules/classes/knight"
    },
    {
      "title": "Ranger",
      "href": "/rules/classes/ranger"
    }]
  },
  {
    "title": "Lineages",
    "href": "/rules/lineages"
  },
  {
    "title": "Cultures",
    "href": "/rules/cultures"
  },
  {
    "title": "Generic Features",
    "subroutes": [
      {
        "title": "Novice Features",
        "href": "/rules/generic_features/novice_features"
      },
      {
        "title": "Veteran Features",
        "href": "/rules/generic_features/veteran_features"
      }
    ]
  }
]

export default function RulesLayout({ children }: {children: React.ReactNode}) {
    return(
      <div className="">
          <div className="w-60 bg-slate-950 p-4">
              <RulesNav navMap={navRoutes} />
          </div>
          <div className="flex-1 flex overflow-hidden">
              <div className="flex-1 overflow-auto">
                <Rule>
                  {children}
                </Rule>
              </div>
          </div>
      </div>
    )
}