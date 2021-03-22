import "@testing-library/jest-dom"; // Provides jest dom matchers
import { render } from "@testing-library/react";
import React from "react";
import { StableClassNames } from ".";

function Test({ children }: { children: React.ReactNode }): JSX.Element {
  return <>{children}</>;
}

test("renders correctly", () => {
  const result = render(
    <StableClassNames>
      <Test>Content</Test>
    </StableClassNames>
  );

  expect(result.container).toMatchSnapshot();
});
