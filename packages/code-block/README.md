# `<CodeBlock>` react component

This is a wrapper around [CodeMirror](https://codemirror.net) with a "toit
branded" theme, opinionated functionality and extensions.

The idea is that all projects at Toit use this package whenever code is being
displayed, so they all have a unified way of presenting code.

## Styles

This package uses `codemirror-theme-vars` which defines all colors as CSS
variables. The `src/styles.css` then simply sets these vars depending on the
preferred color scheme of the user.

This has the added benefit that you can very easily override specific colors if
they clash with your design. See the [original
`base.css`](https://github.com/antfu/codemirror-theme-vars/blob/main/base.css)
for all options.

## Install

First install this library and codemirror itself too.

```shell
yarn add @toitware/code-block
```

Once it's installed you need to import the CSS for codemirror and its themes.
This package provides a utility for that, so you don't need to import the
individual files yourself (and so we can easily upgrade themes across all
platforms).

If it's in a gatsby project, simply put this import in `gatsby-browser.js`:

```js
import "@toitware/code-block/dist/styles.js";
```

Otherwise import it wherever you import static assets.

## Usage

```jsx
<CodeBlock code={`
  any lines of code
  go here
`}>
```

ℹ️ CodeBlock is smart enough to remove unnecessary leading whitespace, so don't
worry about that.

CodeBlock will also remove leading and trailing empty lines.

### Modes

By default CodeBlock ships with only the `toit` and `shell` mode (a mode is a
language that codemirror can display).

~~If your project uses other languages, you need to import the modes yourself.~~

⚠️ Adding other modes is not implemented atm, if you need it right away, ping
@enyo and ask nicely 😇
