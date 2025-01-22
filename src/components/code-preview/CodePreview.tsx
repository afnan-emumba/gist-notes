import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodePreviewProps {
  content: string;
  numOfLines?: number;
  language?: string;
}

const CodePreview = ({ content, numOfLines, language }: CodePreviewProps) => {
  const stringContent = typeof content === "string" ? content : "";
  const lines = stringContent.split("\n");
  const displayedContent = numOfLines
    ? lines.slice(0, numOfLines).join("\n")
    : stringContent;

  return (
    <SyntaxHighlighter
      language={language?.toLocaleLowerCase() || "javascript"}
      style={coy}
      showLineNumbers
      wrapLines
      wrapLongLines
      customStyle={{
        fontSize: "11px",
        backgroundColor: "#f5f5f5",
        overflow: "hidden",
        width: "100%", /* Ensure it takes full width of parent */
        whiteSpace: "pre-wrap", /* Ensure content wraps */
        wordBreak: "break-word", /* Break long words */
      }}
    >
      {displayedContent}
    </SyntaxHighlighter>
  );
};

export default CodePreview;
