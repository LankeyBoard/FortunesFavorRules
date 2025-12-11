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

const query = gql`
  query GetNavSlugs {
    rules {
      sectionName
      rules {
        slug
        title
        shortTitle
        href
      }
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

  const rulesSlugsMap = new Map();
  data.rules.forEach((rule: { sectionName: string; rules: any }) => {
    rulesSlugsMap.set(rule.sectionName, rule.rules);
  });
  const rulesSection: NavSection = {
    title: "General Rules",
    basePath: "/rules/player_rules",
    href: "/rules/player_rules",
    subroutes: rulesSlugsMap.get("General Rules"),
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
  const gmSection: NavSection = {
    title: "Running the Game",
    basePath: "/rules/gm_rules",
    href: "/rules/gm_rules",
    subroutes: rulesSlugsMap.get("Running the Game"),
  };

  return (
    <div className="flex flex-row flex-grow">
      <div className="flex-1 flex overflow-hidden mt-6 md:mt-0 pb-10 md:pb-0">
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
            gmSection,
          ]}
        />
      </div>
      <AlertPopup />
    </div>
  );
}
