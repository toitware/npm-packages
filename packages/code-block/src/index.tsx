import React, { useMemo } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "./toit";
import { removeExcessWhitespace } from "./whitespace";

interface CodeBlockProps {
  code: string;
  className?: string;
}

export function CodeBlock(props: CodeBlockProps): JSX.Element {
  const codeMemo = useMemo(() => removeExcessWhitespace(props.code), [
    props.code,
  ]);

  return (
    <CodeMirror
      className={props.className}
      value={codeMemo}
      options={{
        mode: "toit",
        readOnly: true,
        tabSize: 2,
      }}
    />
  );
}

export default CodeBlock;
