import { render } from "@testing-library/react";
import React from "react";
import { CodeBlock } from ".";

jest.mock("react-codemirror2");

test("properly sanitizes code", () => {
  const result = render(
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
  );
  expect(result.container).toMatchSnapshot();
});
