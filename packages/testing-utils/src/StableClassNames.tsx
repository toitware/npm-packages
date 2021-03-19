import { StylesProvider } from "@material-ui/core";
import { GenerateId } from "jss";
import React, { ReactNode } from "react";

const generateClassName: GenerateId = (rule, styleSheet) =>
  `${styleSheet?.options?.classNamePrefix ?? "noprefix"}-${rule.key}`;

/**
 * Used in tests to make sure that className is reproducible for snapshots.
 *
 * The default `generateClassName` function appends a counter to each class,
 * which will break snapshots every time a new class is added.
 */
export function StableClassNames({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  return (
    <StylesProvider generateClassName={generateClassName}>
      {children}
    </StylesProvider>
  );
}

export default StableClassNames;
