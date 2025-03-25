export const isSmallWindow = (windowWidth: number) => {
  if (typeof window === "undefined") return false;
  const rootFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize,
  );
  return windowWidth <= 40 * rootFontSize;
};
