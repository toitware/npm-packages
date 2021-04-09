import { makeStyles, useTheme } from "@material-ui/core";
import clsx from "clsx";
import "codemirror/mode/shell/shell";
import React, { useMemo } from "react";
import { UnControlled as CodeMirror } from "react-codemirror2";
import "./toit";
import { removeExcessWhitespace } from "./whitespace";

const useStyles = makeStyles((theme) => ({
  code: {
    "& .CodeMirror": {
      height: "auto",
    },
    "& .CodeMirror-lines": {
      padding: theme.spacing(3),
    },
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
  const codeMemo = useMemo(() => removeExcessWhitespace(code), [code]);
  const classes = useStyles();
  const theme = useTheme();

  return (
    <CodeMirror
      className={clsx(className, classes.code)}
      value={codeMemo}
      options={{
        theme: theme.palette.type == "dark" ? "material" : "3024-day",
        mode: mode,
        readOnly: true,
        autoScroll: false,
        tabSize: 2,
      }}
    />
  );
}

export default CodeBlock;
