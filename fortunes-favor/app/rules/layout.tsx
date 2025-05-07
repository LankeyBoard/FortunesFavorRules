import { gql } from "@apollo/client";
import RuleDisplay from "../../components/blocks/RuleDisplay";
import AlertPopup from "../../components/AlertPopup";
import client from "@/utils/graphQLclient";
import NavSidebar from "@/components/blocks/NavSidebar";
export type NavElement = {
  title: string;
  href?: string;
  subroutes?: NavElement[];
  isCurrent?: boolean;
};

export type NavSection = {
  title: string;
  shortTitle?: string;
  basePath: string;
  href?: string;
  subroutes?: {
    title: string;
    shortTitle?: string;
    slug: string;
    href: string;
  }[];
};

const NavBuilder = (sections: NavSection[]): NavElement[] => {
  const navRoutes: NavElement[] = [];
  sections.forEach((section) => {
    if (section.subroutes) {
      let route: NavElement = {
        title: section.title,
        href: section.href,
        subroutes: [],
      };
      section.subroutes.forEach((subRoute) => {
        const sub: NavElement = {
          title: subRoute.shortTitle ? subRoute.shortTitle : subRoute.title,
          href: subRoute.href.includes("#")
            ? subRoute.href
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
  query GetNavSlugs {
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
  const { data } = await client.query({
    query,
  });

  const rulesSection: NavSection = {
    title: "General Rules",
    basePath: "/rules/player_rules",
    href: "/rules/player_rules",
    subroutes: data.genericRules,
  };
  const culturesSection: NavSection = {
    title: "Cultures",
    basePath: "/rules/cultures",
    href: "/rules/cultures",
  };
  const lineagesSection: NavSection = {
    title: "Lineages",
    basePath: "/rules/lineages",
    href: "/rules/lineages",
  };
  const characterClassesSection: NavSection = {
    title: "Classes",
    href: "/rules/classes",
    basePath: "/rules/classes",
    subroutes: data.characterClasses,
  };
  const noviceFeaturesSection: NavSection = {
    title: "Novice Features",
    basePath: "/rules/generic_features/novice_features",
    href: "/rules/generic_features/novice_features",
  };
  const veteranFeaturesSection: NavSection = {
    title: "Veteran Features",
    basePath: "/rules/generic_features/veteran_features",
    href: "/rules/generic_features/veteran_features",
  };

  return (
    <div className="flex flex-row flex-grow">
      <div className="flex-1 flex overflow-hidden mt-6 md:mt-0">
        <div className="flex-1 overflow-auto">
          <RuleDisplay>{children}</RuleDisplay>
        </div>
      </div>
      <div className="fixed">
        <NavSidebar
          navMap={[
            rulesSection,
            culturesSection,
            lineagesSection,
            characterClassesSection,
            noviceFeaturesSection,
            veteranFeaturesSection,
          ]}
        />
      </div>
      <AlertPopup />
    </div>
  );
}
