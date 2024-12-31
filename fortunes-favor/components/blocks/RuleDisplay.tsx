"use client";
import { isSmallWindow } from "@/utils/isSmallWindow";
import useWindowDimensions from "@/utils/useWindowDimensions";
import { useEffect, useState } from "react";

export default function RuleDisplay({
  children,
}: {
  children: React.ReactNode;
}) {
  const { height, width } = useWindowDimensions();
  const [ruleStyle, setRuleStyle] = useState(
    "mx-20 my-10 max-w-4xl xl:mx-auto"
  );
  useEffect(() => {
    if (typeof window !== "undefined")
      if (!isSmallWindow(window.innerWidth)) {
        setRuleStyle("ml-72 mr-5 my-10 max-w-4xl xxl:mx-auto");
      } else {
        setRuleStyle("my-5 md:m-5");
      }
  }, [width]);
  return <div className={ruleStyle}>{children}</div>;
}
