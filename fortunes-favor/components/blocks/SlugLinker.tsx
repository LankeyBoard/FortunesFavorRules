import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

var split: RegExp = new RegExp(`\\[.*?\\)`, "g");

const isMarkdownTable = (text: string) => {
  console.log(text);
  // Checks if text starts with '|' and has at least one table row
  return (
    typeof text === "string" &&
    text.trim().startsWith("|") &&
    text.trim().endsWith("|")
  );
};

const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;

const renderMarkdownWithSpaces = (text: string, key: number) => {
  // Match leading and trailing whitespace
  const match = text.match(/^(\s*)(.*?)(\s*)$/s);
  if (!match) return text;
  const [, leading, core, trailing] = match;
  return (
    <span key={key}>
      {leading}
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{ p: ({ children }) => <span>{children}</span> }}
      >
        {core}
      </ReactMarkdown>
      {trailing}
    </span>
  );
};

const parseLinksFromString = (text: string) => {
  if (typeof text !== "string") return;

  if (isMarkdownTable(text)) {
    return (
      <div className="gap-2 overflow-auto">
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
            p: ({ children }) => <span>{children}</span>,
          }}
        >
          {text}
        </ReactMarkdown>
      </div>
    );
  }

  const elements: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let key = 0;

  while ((match = linkRegex.exec(text)) !== null) {
    // Add text before the link (preserving spaces)
    if (match.index > lastIndex) {
      elements.push(
        renderMarkdownWithSpaces(text.slice(lastIndex, match.index), key++),
      );
    }
    // Add the link
    elements.push(
      <Link
        key={key++}
        href={match[2].startsWith("/") ? match[2] : "/" + match[2]}
        className="text-teal-800 underline hover:text-teal-500 dark:text-teal-200 inline"
      >
        {match[1]}
      </Link>,
    );
    lastIndex = match.index + match[0].length;
  }
  // Add any remaining text after the last link (preserving spaces)
  if (lastIndex < text.length) {
    elements.push(renderMarkdownWithSpaces(text.slice(lastIndex), key++));
  }

  return <>{elements}</>;
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
