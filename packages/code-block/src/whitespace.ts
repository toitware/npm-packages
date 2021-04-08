/**
 * Converts a block of text, so that there is no excess leading whitespace.
 *
 * For example, this:
 *
 * ```
 *   foo
 *       bar
 *     foo
 * ```
 *
 * will become this:
 *
 * ```
 * foo
 *     bar
 *   foo
 * ```
 */
export function removeExcessWhitespace(code: string): string {
  // Removing any trailing whitespace. No reason for that to be there.
  const codeLines = code
    .replace(/^(\s\n)*/, "")
    .trimEnd()
    .split("\n");

  let shortestWhitespace: string | undefined;

  codeLines.forEach((line) => {
    if (line.trim().length == 0) return;

    // Select all the whitespace until there is no more whitespace.
    const regResult = /^\s*/.exec(line);
    if (regResult !== null) {
      const leadingWhitespace = regResult[0];
      if (
        shortestWhitespace === undefined ||
        leadingWhitespace.length < shortestWhitespace.length
      ) {
        shortestWhitespace = leadingWhitespace;
      }
    }
  });
  return codeLines
    .map((line) => {
      if (line.trim().length == 0) return "";
      else if (
        shortestWhitespace === undefined ||
        shortestWhitespace.length == 0
      )
        return line;
      else return line.replace(shortestWhitespace, "");
    })
    .join("\n");
}
