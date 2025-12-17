import { twMerge } from "tailwind-merge";
type imgDisplayProps = {
  img: { target: string; style?: string | null };
  altText?: string;
};
const ImgDisplay = ({ img, altText }: imgDisplayProps) => {
  return (
    <img
      src={img.target}
      alt={altText}
      className={twMerge("w-1/2 float-right m-4", img.style)}
    />
  );
};
export default ImgDisplay;
