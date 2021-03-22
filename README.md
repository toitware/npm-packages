# Toit NPM Packages

This repository is the home of all private toit npm packages.

## Authenticate with GitHub registry

In order to be able to install packages from this repository on your machine,
you need to [authenticate with the GitHub
registry]((https://docs.github.com/en/packages/guides/configuring-npm-for-use-with-github-packages#authenticating-to-github-packages)).

Here's a short summary of what you need to do:

1. [Create a personal access token](https://github.com/settings/tokens/new)
   1. Name it appropriately
   2. Check `write:packages` and `read:packages`
2. Copy the token
3. Add the token to your `~/.npmrc`:  
   `echo "//npm.pkg.github.com/:_authToken=YOUR_TOKEN" >> ~/.npmrc`


Then run: `yarn install` from the root directory.

## How to start a new project

Copy the `packages/_template` to `_packages/your-name` and go through the files
to adopt them accordingly. Most importantly:

- `package.json`:
  - `name`
  - `description`
- `README.md`
- `CHANGELOG.md`

And then of course your code.

## Building

Inside the package you're working on:

```sh
yarn build
```

This will compile your TypeScript code to a publishable JavaScript module.

This will build the files to `dist/` which is not checked in. The CI pipeline
will build it by itself, and take care of testing and publishing.

## Testing

You can test all packages from root with:

```sh
yarn test
```

or if you want to test only a specific package:

```sh
yarn test --projects packages/testing-utils
```

## Publish a new version

Publish a new version by increasing the version in your `package.json` and merge
it into master (through a PR).
