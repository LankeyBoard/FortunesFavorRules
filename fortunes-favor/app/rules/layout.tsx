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
  shortTitle?: string;
  basePath: string;
  subroutes?: {
    title: string;
    shortTitle?: string;
    slug: string;
    href: string;
  }[];
};

const NavBuilder = (sections: nav_section[]): nav[] => {
  const navRoutes: nav[] = [];
  sections.forEach((section) => {
    if (section.subroutes) {
      let route: nav = { title: section.title, subroutes: [] };
      section.subroutes.forEach((subRoute) => {
        const sub: nav = {
          title: subRoute.shortTitle ? subRoute.shortTitle : subRoute.title,
          href: subRoute.href.includes("#")
            ? "/rules/" + subRoute.href
            : section.basePath + "/" + subRoute.slug,
        };
        if (!route.subroutes) route.subroutes = [sub];
        route.subroutes.push(sub);
      });
      navRoutes.push(route);
    } else navRoutes.push({ title: section.title, href: section.basePath });
  });
  return navRoutes;
};

const query = gql`
  query GetNavSlugs2 {
    genericRules {
      slug
      title
      shortTitle
      href
    }
    characterClasses {
      slug
      href
      title
      shortTitle
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
  console.log(data);

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
  const noviceFeaturesSection: nav_section = {
    title: "Novice Features",
    basePath: "/rules/generic_features/novice_features",
  };
  const veteranFeaturesSection: nav_section = {
    title: "Veteran Features",
    basePath: "/rules/generic_features/veteran_features",
  };
  return (
    <div className="flex flex-row flex-grow">
      <div className="fixed">
        <RulesNav
          navMap={NavBuilder([
            rulesSection,
            culturesSection,
            lineagesSection,
            characterClassesSection,
            noviceFeaturesSection,
            veteranFeaturesSection,
          ])}
        />
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 overflow-auto">
          <RuleDisplay>{children}</RuleDisplay>
        </div>
      </div>
    </div>
  );
}
