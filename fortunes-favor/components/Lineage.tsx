import Link from "next/link";
import CharacterLineage from "../utils/CharacterLineage";
import { Lineage as LineageType } from "@/utils/types/types.generated";
import Traits from "./Traits";
import Button, { ButtonType } from "./blocks/Inputs/Button";

type LineageProps = {
  data: LineageType;
  isList?: boolean;
  variantSearchParam?: string | string[];
};

const Lineage = ({
  data,
  isList = false,
  variantSearchParam,
}: LineageProps) => {
  console.log("variantSearchParam", variantSearchParam);
  let lineageRules = new CharacterLineage(data);
  const lineageVariants = data.variants
    ? data.variants?.map((data) => new CharacterLineage(data))
    : [];
  let variantLinks = lineageVariants.map((variant) => {
    return { title: variant.title, href: variant.href, isBase: false };
  });
  if (variantSearchParam) {
    const baseLineageLink = {
      title: data.title,
      href: data.href || "ERROR",
      isBase: true,
    };
    variantLinks.unshift(baseLineageLink);
    let variantStr = Array.isArray(variantSearchParam)
      ? variantSearchParam[0]
      : variantSearchParam;
    if (variantStr) {
      let lineageVariant = lineageVariants.find(
        (v) => v.slug.toLowerCase() === variantStr.toLowerCase(),
      );
      console.log("Lineage variant used", lineageVariant);
      if (lineageVariant) {
        lineageRules = lineageVariant;
        variantLinks = variantLinks.filter(
          (link) => link.title !== lineageVariant.title,
        );
      }
    }
  }
  return (
    <div id={lineageRules.slug} className="mb-6">
      <div className="py-4 px-2 bg-sky-300 dark:bg-sky-800">
        <div className="text-2xl tracking-wide flex flex-row">
          <h1 className="flex-grow">{lineageRules.title}</h1>
          {isList && (
            <div className="flex items-center ps-3 mr-4">
              <Link
                className="cursor-pointer disabled:cursor-not-allowed text-gray-800 dark:text-amber-200 hover:text-amber-400 disabled:text-slate-700"
                href={lineageRules.href}
              >
                <svg
                  className="w-6 h-6 "
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1"
                    d="M1 5h12m0 0L9 1m4 4L9 9"
                  />
                </svg>
              </Link>
            </div>
          )}
        </div>
        {variantLinks && variantLinks.length > 0 && (
          <div className="flex flex-row mx-2">
            <label className="mr-2">Variants</label>
            {variantLinks.map((variant) => {
              if (!variant.href) {
                console.warn(`variant has no href ${variant}`);
                return;
              }
              return (
                <div key={variant.title} className="mr-2">
                  <Button
                    buttonType={ButtonType.simple}
                    color={variant.isBase ? "amber" : "green"}
                  >
                    <Link href={variant.href}>{variant.title}</Link>
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="px-3">
        <div className="italic">{lineageRules.desc}</div>
        <div>
          <span className="font-semibold">Size - </span>{" "}
          {typeof lineageRules.size === "string" ? (
            <span className="capitalize">
              {lineageRules.size.toLocaleLowerCase()}
            </span>
          ) : (
            <span className="capitalize">
              {lineageRules.size.join(", ").toLocaleLowerCase()}
            </span>
          )}
        </div>
        <div>
          <span className="font-semibold">Speed - </span>
          {lineageRules.speeds?.map((s) => {
            return (
              <span key={s.type} className="capitalize mr-2">
                {s.type}: <span className="font-light">{s.speed} ft.</span>
              </span>
            );
          })}
        </div>
        <div>
          <span className="font-semibold">Stat - </span>
          {lineageRules.stat}
        </div>
        <Traits title="Features" traits={lineageRules.features} />
      </div>
    </div>
  );
};

export default Lineage;
