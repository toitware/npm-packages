import { styled } from "@mui/material";
import React from "react";
import { useCodeMirror } from "use-codemirror";

const Wrapper = styled("div")`
  & .CodeMirror {
    height: auto;
  }
  & .CodeMirror-lines {
    padding: ${({ theme }) => theme.spacing(3)};
  }
`;

const Code = styled("pre")`
  position: relative;
  display: block;
  padding: ${({ theme }) => theme.spacing(3)};
`;

interface CodeBlockProps {
  code: string;
  mode?: "toit" | "shell" | "htmlmixed" | "yaml" | string;
  className?: string;
}

export function CodeBlock({
  code,
  mode = "toit",
  className,
}: CodeBlockProps): JSX.Element {
  const codeMirrorTheme = "vars";

  const codeMirror = useCodeMirror({
    value: code,
    importCodeMirrorAddons: () => {
      return Promise.all([
        import("./toit"),
        import("codemirror/mode/shell/shell"),
        import("codemirror/keymap/sublime"),
      ]);
    },
    config: {
      theme: codeMirrorTheme,
      mode: mode,
      readOnly: true,
      autoScroll: false,
      scrollbarStyle: "native",
      tabSize: 2,
    },
  });

  return (
    <Wrapper className={className}>
      <Code
        className={codeMirrorTheme}
        ref={codeMirror.ref}
        data-testid="code-container"
      >
        {code}
      </Code>
    </Wrapper>
  );
}

export default CodeBlock;
