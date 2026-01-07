import { twMerge } from "tailwind-merge";
interface imgDisplayProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  img: { target: string; style?: string | null };
  altText?: string;
}
const ImgDisplay: React.FC<imgDisplayProps> = ({
  img,
  altText,
  ...props
}: imgDisplayProps) => {
  return (
    <img
      src={img.target}
      alt={altText}
      className={twMerge(props.className, img.style)}
    />
  );
};
export default ImgDisplay;
