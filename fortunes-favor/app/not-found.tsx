import Button, { ButtonType } from "@/components/blocks/Inputs/Button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Button buttonType={ButtonType.default}>
        <Link href="/">Return Home</Link>
      </Button>
    </div>
  );
}
