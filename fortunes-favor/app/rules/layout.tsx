import { gql } from "@apollo/client";
import RuleDisplay from "../components/blocks/RuleDisplay";
import RulesNav from "../components/blocks/RulesNav";
import { getClient } from "../utils/graphQLclient";

export type nav = {
  title: string;
  href?: string;
  subroutes?: nav[];
};

type nav_section = {
  title: string;
  basePath: string;
  subroutes?: { title: string; slug: string }[];
};

const NavBuilder = (sections: nav_section[]): nav[] => {
  const navRoutes: nav[] = [];
  console.log("building nav for sections: ", sections);
  sections.forEach((section) => {
    console.log("building nav for sections: ", sections);
    if (section.subroutes) {
      let route: nav = { title: section.title, subroutes: [] };
      section.subroutes.forEach((subRoute) => {
        console.log(subRoute);
        const sub: nav = {
          title: subRoute.title,
          href: section.basePath + "/" + subRoute.slug,
        };
        if (!route.subroutes) route.subroutes = [sub];
        route.subroutes.push(sub);
      });
      navRoutes.push(route);
    } else navRoutes.push({ title: section.title, href: section.basePath });
  });
  return navRoutes;
};

// const navRoutes: nav[] = [
//   {
//     title: "Rules",
//     subroutes: [
//       {
//         title: "Building A Character",
//         href: "/rules/player_rules/getting_started/building_a_character",
//       },
//       {
//         title: "Character Components",
//         href: "/rules/player_rules/getting_started/character_components",
//       },
//       {
//         title: "Character Resources",
//         href: "/rules/player_rules/getting_started/character_resources",
//       },
//       {
//         title: "Tests",
//         href: "/rules/player_rules/getting_started/tests",
//       },
//       {
//         title: "Combat",
//         href: "/rules/player_rules/getting_started/combat",
//       },
//       {
//         title: "Dying & Last Stand",
//         href: "/rules/player_rules/getting_started/dying",
//       },
//       {
//         title: "Healing",
//         href: "/rules/player_rules/getting_started/healing",
//       },
//       {
//         title: "Movement",
//         href: "/rules/player_rules/getting_started/movement",
//       },
//       {
//         title: "Lift, Drag, & Pack",
//         href: "/rules/player_rules/getting_started/lift_drag_pack",
//       },
//       {
//         title: "Equipment",
//         href: "/rules/player_rules/getting_started/equipment",
//       },
//       {
//         title: "Reference",
//         href: "/rules/player_rules/getting_started/references",
//       },
//     ],
//   },
//   {
//     title: "Classes",
//     subroutes: [
//       {
//         title: "Brawler",
//         href: "/rules/classes/brawler",
//       },
//       {
//         title: "Devoted",
//         href: "/rules/classes/devoted",
//       },
//       {
//         title: "Elementalist",
//         href: "/rules/classes/elementalist",
//       },
//       {
//         title: "Knight",
//         href: "/rules/classes/knight",
//       },
//       {
//         title: "Ranger",
//         href: "/rules/classes/ranger",
//       },
//     ],
//   },
//   {
//     title: "Lineages",
//     href: "/rules/lineages",
//   },
//   {
//     title: "Cultures",
//     href: "/rules/cultures",
//   },
//   {
//     title: "Generic Features",
//     subroutes: [
//       {
//         title: "Novice Features",
//         href: "/rules/generic_features/novice_features",
//       },
//       {
//         title: "Veteran Features",
//         href: "/rules/generic_features/veteran_features",
//       },
//     ],
//   },
// ];
const query = gql`
  query GetSlugs {
    genericRules {
      slug
      title
    }
    characterClasses {
      slug
      title
    }
  }
`;
export default async function RulesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = getClient();
  const { data } = await client.query({
    query,
  });

  const rulesSection: nav_section = {
    title: "General Rules",
    basePath: "/rules/player_rules",
    subroutes: data.genericRules,
  };
  const culturesSection: nav_section = {
    title: "Cultures",
    basePath: "/rules/cultures",
  };
  const lineagesSection: nav_section = {
    title: "Lineages",
    basePath: "/rules/lineages",
  };
  const characterClassesSection: nav_section = {
    title: "Classes",
    basePath: "/rules/classes",
    subroutes: data.characterClasses,
  };

  return (
    <div className="flex flex-row">
      <RulesNav
        navMap={NavBuilder([
          rulesSection,
          culturesSection,
          lineagesSection,
          characterClassesSection,
        ])}
      />
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-auto">
          <RuleDisplay>{children}</RuleDisplay>
        </div>
      </div>
    </div>
  );
}
