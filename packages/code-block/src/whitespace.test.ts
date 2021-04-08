import { removeExcessWhitespace } from "./whitespace";

test("does nothing if there is no excess whitespace", () => {
  const input = `foo
    bar
  foo`;

  expect(removeExcessWhitespace(input)).toEqual(input);
});

test("removes leading whitespace", () => {
  const input = `  foo
      bar
    foo`;
  const output = `foo
    bar
  foo`;

  expect(removeExcessWhitespace(input)).toEqual(output);
});

test("works with empty strings", () => {
  expect(removeExcessWhitespace("")).toEqual("");
  expect(removeExcessWhitespace("   ")).toEqual("");
});

test("removes leading and trailing newlines", () => {
  const input = `

foo

  
`;

  expect(removeExcessWhitespace(input)).toEqual("foo");
});

test("ignores empty lines in whitespace calculation", () => {
  // The second line here contains 2 spaces.
  // If the function would take them into account, then all lines containing
  // code would start with 2 spaces too.
  const input = `    foo
  
    bar
    foo`;
  const output = "foo\n\nbar\nfoo";

  expect(removeExcessWhitespace(input)).toEqual(output);
});
test("sanitizes empty lines", () => {
  // The empty lines contain a random amount of spaces.
  const input = `foo
  
    
 
bar`;
  const output = "foo\n\n\n\nbar";

  expect(removeExcessWhitespace(input)).toEqual(output);
});
