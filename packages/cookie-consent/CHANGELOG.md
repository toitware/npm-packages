# Changelog

## 0.2.0

- Upgrade to @mui v5
- Add an actual test

## 0.1.4

### React icons

- Added react-icons to package.js as this was not the case before and therefore, the projects that used the cookie-consent had to have the package installed.

## 0.1.3

### Big zIndex

- zIndex has been set to a high number to insure that the cookie consent is displayed and not affected by other components in the view.

## 0.1.2

### Design changes

- the design now reflects the design of the new website design, despite the buttons. Will be fixed in the next release of the cookie consent.

## 0.1.1

### Features:

- Added callback onAnalyticsReady

### Bug fixes

- Include the `window.analytics` type in the build.

## 0.1.0

### Breaking changes

To make it work with version 0.1.0. Remove the callback and add a changeConsent (boolean). 'Show' is the master switch and it will hide the consent no matter what happens. 'changeConsent' can be changed from the app, where you are using <CookieConsent> and it will show the cookie consent to let the user change consent.

## 0.0.4

### Bug fixes

- use "'analytics' in window" to check if analytics exists.

## 0.0.3

- Removed cookieTheme prop

## 0.0.2

- Add missing dist files

## 0.0.1

### Features

- Fill in

### Bug Fixes

- None

### Breaking changes

- None
