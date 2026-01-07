"use client";

import { useEffect } from "react";
import { RuleType } from "../utils/enums";
import { GenericRule } from "../utils/graphQLtypes";
import SlugLinker from "./blocks/SlugLinker";
import TextBlock from "./blocks/TextBlock";
import CopyLink from "./CopyLink";
import ImgDisplay from "./blocks/ImgDisplay";
const titleStyler = (depth: number) => {
  switch (depth) {
    case 1:
      return "text-3xl tracking-wider font-extralight py-4 px-3 bg-purple-300 dark:bg-purple-800";
    case 2:
      return "mt-3 mb-1 text-2xl px-2 tracking-wide";
    case 3:
      return "text-lg p-2 font-light";
  }
};

const CompactList = ({ rule }: { rule: GenericRule }) => {
  return (
    <div id={rule.slug}>
      {rule.title ? (
        <>
          <span className="text-amber-600">- </span>
          <span className="font-semibold">{rule.title}</span>
          <span>
            {" "}
            - {rule.text?.map((t) => <SlugLinker key={t.text} text={t.text} />)}
          </span>
        </>
      ) : (
        <>
          <span className="text-amber-600">- </span>
          <span>
            {rule.text?.map((t) => <SlugLinker key={t.text} text={t.text} />)}
          </span>
        </>
      )}
    </div>
  );
};

type fieldProps = {
  field: GenericRule;
  depth?: number;
};
const RuleField = ({ field, depth = 3 }: fieldProps) => {
  useEffect(() => {
    if (window.top !== null) {
      const path = window.location.hash;
      if (path && path.includes("#")) {
        setTimeout(() => {
          const id = path.replace("#", "");
          const el = window.document.getElementById(id);
          if (!el) return;
          const r = el.getBoundingClientRect();
          if (!window.top) return;
          const remInPixels =
            parseFloat(getComputedStyle(document.documentElement).fontSize) * 5;
          window.top.scroll({
            top: pageYOffset + r.top - remInPixels,
            behavior: "smooth",
          });
        }, 600);
      }
    }
  }, [field.slug]);
  return (
    <div id={field.slug} className="z-0 scroll-mt-20">
      <div className={titleStyler(depth)}>
        <label className="display-flex">
          {field.title}{" "}
          {field.slug && depth < 3 && <CopyLink target={field.slug} />}
        </label>
      </div>
      {field.img && (
        <ImgDisplay
          img={field.img}
          altText={field.title}
          className="m-4 w-1/2 float-right"
        />
      )}

      <div className={field.ruleType != RuleType.LIST ? "pb-2" : "pb-2 mx-2"}>
        {field.text != undefined && typeof field.text === "string" && (
          <div className="mt-2">
            <SlugLinker text={field.text} />
          </div>
        )}
        {field.text != undefined && typeof field.text !== "string" && (
          <div className="mb-2 space-y-3 pl-4">
            <TextBlock text={field.text} style={depth === 1 ? "mt-3" : ""} />
          </div>
        )}
        {field.lists &&
          field.lists.length > 0 &&
          field.lists.map((list) => {
            return (
              <div key={list.label} className="mb-2 mt-2">
                {list.label && list.label.length > 0 && (
                  <span className="text-slate-700 dark:text-slate-400 ml-4 font-semibold">
                    {list.label}
                  </span>
                )}

                <ul className="ml-4 pl-4 text-slate-700 dark:text-slate-200 border-l-2 border-amber-800">
                  {list.items.map((item) => {
                    return (
                      <li key={item}>
                        <SlugLinker text={item} />
                      </li>
                    );
                  })}
                </ul>
              </div>
            );
          })}
        {field.subRules && field.ruleType === RuleType.COMPACTLIST && (
          <div className="pl-4">
            {field.subRules.map((rule) => (
              <CompactList key={rule.slug} rule={rule} />
            ))}
          </div>
        )}
        {field.subRules && field.ruleType === RuleType.LIST && (
          <div className="pl-4">
            {field.subRules.map((rule) => (
              <CompactList key={rule.slug} rule={rule} />
            ))}
          </div>
        )}
        {field.subRules &&
          field.ruleType !== RuleType.COMPACTLIST &&
          field.ruleType !== RuleType.LIST && (
            <ul className="">
              {field.subRules.map((f) => (
                <li className={f.title ? "" : "space-y-2"} key={f.slug}>
                  <RuleField field={f} depth={depth + 1}></RuleField>
                </li>
              ))}
            </ul>
          )}
      </div>
    </div>
  );
};

export default RuleField;
