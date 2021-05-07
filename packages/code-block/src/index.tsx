import { makeStyles, useTheme } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import { useCodeMirror } from "use-codemirror";

const useStyles = makeStyles((theme) => ({
  code: {
    "& .CodeMirror": {
      height: "auto",
    },
    "& .CodeMirror-lines": {
      padding: theme.spacing(3),
    },
  },
  loadingCode: {
    position: "relative",
    display: "block",
    padding: theme.spacing(3),
  },
}));

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
  const classes = useStyles();
  const theme = useTheme();

  const codeMirrorTheme = theme.palette.type == "dark" ? "material" : "default";

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
    <div className={clsx(className, classes.code)}>
      <pre
        className={clsx(codeMirrorTheme, classes.loadingCode)}
        ref={codeMirror.ref}
      >
        {code}
      </pre>
    </div>
  );
}

export default CodeBlock;
