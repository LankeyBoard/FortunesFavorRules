import { randomInt } from "crypto";
import Link from "next/link";

var split: RegExp = new RegExp(`\\[.*?\\)`, "g");

const linkMaker = (text: string) => {
  const i = text.indexOf("]");
  let href = text.substring(i + 2, text.length - 1);
  if (href[0] !== "/") href = "/" + href;
  return (
    <Link
      key={href + randomInt(1000)}
      href={href}
      className="text-teal-800 underline hover:text-teal-500 dark:text-teal-200"
    >
      {text.substring(1, i)}
    </Link>
  );
};

const parseLinksFromString = (text: string) => {
  if (typeof text !== "string") return;
  // TODO: slug should change the link href to the location of the slug
  const splitText = text.split(split);
  const links = Array.from(text.matchAll(split));
  const display: JSX.Element[] = [];
  let l = 0;
  let t = 0;
  // if there are no links
  if (links.length < 1) {
    return <span>{text}</span>;
  }
  //if there are only links
  if (splitText.length < 1) {
    links.forEach((link) => {
      display.push(linkMaker(link.toLocaleString()));
    });
  }
  //if text starts with a link
  if (text[0] === "[") {
    display.push(linkMaker(links[l].toLocaleString()));
    l++;
  }
  while (l < links.length || t < links.length) {
    if (l < t) {
      display.push(linkMaker(links[l].toLocaleString()));
      l++;
    } else {
      display.push(
        <span key={splitText[t] + Math.random() * 100}>{splitText[t]}</span>,
      );
      t++;
    }
  }
  return <>{display}</>;
};

const SlugLinker = ({ text }: { text: string | string[] | undefined }) => {
  if (!text) {
    return;
  } else if (typeof text === "string") {
    return parseLinksFromString(text);
  } else {
    return text.map((t) => {
      return parseLinksFromString(t);
    });
  }
};

export default SlugLinker;
