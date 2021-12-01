import { render } from "@testing-library/react";
import React from "react";
import { CodeBlock } from ".";

jest.mock("use-codemirror");

test("properly sanitizes code", () => {
  const code = `

      main:

      map ::= {
        1234: "Siri",
        2345: "John",
        3456: "Sue"
        }

      map.do: | id name |
        print "$name has ID $id"

  
    `;
  const result = render(<CodeBlock code={code} />);

  expect(result.getByTestId("code-container").textContent).toBe(code);
});
