# Changelog

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
