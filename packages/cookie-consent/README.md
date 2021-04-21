# `<CookieConsent>` react component

This is a cookie consent that fits the current needs of Toits tracking profile.

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
  cookieTheme={secondaryTheme}
/>
```

Place it somewhere in the app that is rendered on every page load. For instance, footer is a good place. The GDPR law says that the user should be able to opt out as easy as it was to make the initial decision. On toit.io the text in the footer is called: "Change cookie consent" and when the users presses it, the cookie consent is shown again.

### SegmentKey

Segment key is the key from segment.

### Show

Whether or not the Cookie Consent should be shown. Use state in your project to handle its state.

### Callback

Callback is triggered when the user presses on of the components buttons (Accept, Decline, x). Make a function in your project that sets state or use your setXXXXXXX if you are using react hooks.

### CookieTheme

CookieTheme is used to style the component. If you want to customize it on your own, you can create a new material UI Theme file with createMuiTheme.

### Maintenance

⚠️ Ping Jacob if you need new features and also please report if you find any bugs
