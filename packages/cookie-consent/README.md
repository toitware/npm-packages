# `<CookieConsent>` react component

This is a cookie consent that fits the current needs of Toits tracking profile.

> **WARNING**: Starting with `v0.2.0` this package depends on `@mui` version 5.
> If you are still using the old `@material-ui` package, then make sure to use
> `v0.1.*`.

## Install

First install this library and segment-analytics too.

```shell
yarn add @toitware/code-block
```

## Usage

```jsx
<CookieConsent
  segmentKey={segmentAPIKey || "no-key"}
  show={showCookieConsent}
  callback={callbackSetCookieConsent}
/>
```

Place it somewhere in the app that is rendered on every page load. For instance, footer is a good place. The GDPR law says that the user should be able to opt out as easy as it was to make the initial decision. On toit.io the text in the footer is called: "Change cookie consent" and when the users presses it, the cookie consent is shown again.

### SegmentKey

Segment key is the key from segment.

### Show

Whether or not the Cookie Consent should be shown. Use state in your project to handle its state.

### Callback

Callback is triggered when the user presses on of the components buttons (Accept, Decline, x). Make a function in your project that sets state or use your setXXXXXXX if you are using react hooks.

### Theming

Use ThemeProvider to set the theme

### Maintenance

⚠️ Ping Jacob if you need new features and also please report if you find any bugs
