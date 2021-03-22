import { makeStyles } from "@material-ui/core";
import "@testing-library/jest-dom"; // Provides jest dom matchers
import { render } from "@testing-library/react";
import React from "react";
import { StableClassNames } from ".";

const useStyles = makeStyles(() => ({
  test: {
    color: "red",
  },
}));

function Test({ children }: { children: React.ReactNode }): JSX.Element {
  const classes = useStyles();
  return <h1 className={classes.test}>{children}</h1>;
}

test("renders correctly", () => {
  const result = render(
    <StableClassNames>
      <Test>Content</Test>
    </StableClassNames>
  );

  expect(result.container).toMatchSnapshot();
  expect(result.getByText("Content")).toHaveAttribute(
    "class",
    "makeStyles-test" // No numnber at the end.
  );
});
