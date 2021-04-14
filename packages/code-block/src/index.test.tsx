import { render } from "@testing-library/react";
import { StableClassNames } from "@toitware/testing-utils";
import React from "react";
import { CodeBlock } from ".";

jest.mock("use-codemirror");

test("properly sanitizes code", () => {
  const result = render(
    <StableClassNames>
      <CodeBlock
        code={`

      main:

      map ::= {
        1234: "Siri",
        2345: "John",
        3456: "Sue"
        }

      map.do: | id name |
        print "$name has ID $id"

  
    `}
      />
    </StableClassNames>
  );
  expect(result.container).toMatchSnapshot();
});
