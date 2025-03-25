export const isSmallWindow = (windowWidth: number) => {
  const rootFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize,
  );
  return windowWidth <= 40 * rootFontSize;
};
