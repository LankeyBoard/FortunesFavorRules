import Link from "next/link";

enum TOGGLE {
  START = "[",
  END = ")",
}

const toggleSplitter = (currentSplitter?: TOGGLE) => {
  switch (currentSplitter) {
    case TOGGLE.START:
      return TOGGLE.END;
    case TOGGLE.END:
      return TOGGLE.START;
    default:
      return TOGGLE.START;
  }
};

const splitLinks = {
  [Symbol.split](str: string) {
    let pos = 0;
    let currentSplitter = toggleSplitter();
    const result: string[] = [];
    while (pos < str.length) {
      let matchPos = str.indexOf(currentSplitter, pos);
      if (matchPos === -1) {
        result.push(str.substring(pos));
        break;
      } else if (
        str.indexOf("]", pos) + 1 === str.indexOf("(") &&
        str.indexOf(")") !== -1
      ) {
        result.push(str.substring(pos, matchPos));
        pos = matchPos + 1;
        matchPos = str.indexOf(")");
        if (pos >= str.length) break;
        result.push(str.substring(pos, matchPos));
        pos = matchPos + 1;
      } else {
        result.push(str.substring(pos));
        break;
      }
    }
    return result;
  },
};

const linkMaker = (text: string) => {
  const i = text.indexOf("]");
  return (
    <Link
      href={text.substring(i + 2, text.length)}
      className="text-teal-800 underline hover:text-teal-500 dark:text-teal-200"
    >
      {text.substring(0, i)}
    </Link>
  );
};

const parseLinksFromString = (text: string) => {
  if (typeof text !== "string") return;
  // TODO: slug should change the link href to the location of the slug
  const links = text.split(splitLinks);
  const display: JSX.Element[] = [];
  links.forEach((s) => {
    if (s.includes("](")) {
      display.push(linkMaker(s));
    } else {
      display.push(<span>{s}</span>);
    }
  });
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
