import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coy } from "react-syntax-highlighter/dist/esm/styles/prism";

interface CodePreviewProps {
  content: string;
}

const CodePreview = ({ content }: CodePreviewProps) => {
  return (
    <SyntaxHighlighter language='javascript' style={coy}>
      {content}
    </SyntaxHighlighter>
  );
};

export default CodePreview;
