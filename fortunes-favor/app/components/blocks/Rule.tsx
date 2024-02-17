"use client";
import { isSmallWindow } from "@/app/utils/isSmallWindow";
import useWindowDimensions from "@/app/utils/useWindowDimensions";
import { useEffect, useState } from "react";

export default function Rule({ children }: { children: React.ReactNode }) {
  const { height, width } = useWindowDimensions();
  const [ruleStyle, setRuleStyle] = useState("mx-20 my-10");
  useEffect(() => {
    if (!isSmallWindow(window.innerWidth)) {
      setRuleStyle("mx-20 my-10");
    } else {
      setRuleStyle("m-5");
    }
  }, [width]);
  return <div className={ruleStyle}>{children}</div>;
}
