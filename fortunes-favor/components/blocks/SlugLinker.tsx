import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

var split: RegExp = new RegExp(`\\[.*?\\)`, "g");

const linkMaker = (text: string) => {
  const i = text.indexOf("]");
  let href = text.substring(i + 2, text.length - 1);
  if (href[0] !== "/") href = "/" + href;
  return (
    <Link
      key={href + Math.random() * 1000}
      href={href}
      className="text-teal-800 underline hover:text-teal-500 dark:text-teal-200"
    >
      {text.substring(1, i)}
    </Link>
  );
};

const isMarkdownTable = (text: string) => {
  // Checks if text starts with '|' and has at least one table row
  return (
    typeof text === "string" &&
    text.trim().startsWith("|") &&
    text.includes("\n|")
  );
};

const parseLinksFromString = (text: string) => {
  if (typeof text !== "string") return;

  if (isMarkdownTable(text)) {
    return (
      <div className="gap-2">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            table: ({ children }) => (
              <table className="min-w-full border border-slate-300 rounded overflow-hidden my-2">
                {children}
              </table>
            ),
            thead: ({ children }) => (
              <thead className="bg-teal-100 dark:bg-teal-900">{children}</thead>
            ),
            th: ({ children }) => (
              <th className="px-4 py-2 font-semibold text-left border-b border-slate-500">
                {children}
              </th>
            ),
            td: ({ children }) => <td className="px-4 py-2">{children}</td>,
            tr: ({ children }) => <tr className="">{children}</tr>,
          }}
        >
          {text}
        </ReactMarkdown>
      </div>
    );
  }

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
        <span key={splitText[t] + Math.random() * 100}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {splitText[t]}
          </ReactMarkdown>
        </span>,
      );
      t++;
    }
  }
  if (t < splitText.length) {
    display.push(
      <span key={splitText[t] + Math.random() * 100}>{splitText[t]}</span>,
    );
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
