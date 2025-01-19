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
        backgroundColor: "transparent",
        overflow: "hidden",
        width: "100%",
        height: "100%",
      }}
    >
      {displayedContent}
    </SyntaxHighlighter>
  );
};

export default CodePreview;
