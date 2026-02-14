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
  const [ruleStyle, setRuleStyle] = useState("my-5 md:m-5 max-w-full");
  useEffect(() => {
    if (typeof window !== "undefined")
      if (!isSmallWindow(window.innerWidth)) {
        setRuleStyle("ml-72 mr-5 my-10 overflow-hidden");
      }
  }, [width]);
  return <div className={ruleStyle}>{children}</div>;
}
