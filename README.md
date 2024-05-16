# Toit NPM Packages

This repository is the home of all toit's npm packages.

When a new commit is made in `main`, all packages are tested and built, and if a
`package.json` has a newer version than what is in our
[registry](https://github.com/orgs/toitware/packages), then it will be published
there.

## Authenticate with GitHub registry

In order to be able to install packages from this repository on your machine,
you need to [authenticate with the GitHub
registry](https://docs.github.com/en/packages/guides/configuring-npm-for-use-with-github-packages#authenticating-to-github-packages).

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

Checkout the [Publish a new version](#publish-a-new-version) section to see
how you get your package published.

## Testing

### Using it in your project

Normally, you'll develop a package because you want to use it in another
project. The easiest way to develop them side by side, is to use [yarn
link](https://classic.yarnpkg.com/en/docs/cli/link/) for that. Just make sure
you're building your package, and consider using `yarn build --watch` so it
stays up to date.

> ⚠️ **WARNING**: Sometimes linked packages don't behave as intended.
> Dependencies get duplicated (for example the @mui theme) and are not shared
> properly. If you run into any issues, the only solution we have found so far
> is to add the dependency as a local path dependency (with
> `../path/to/package`) and upgrade the specific dependency every time you make
> a change (with `yarn upgrade @toitware/code-block` for example)
>
> To add insult to injury, gatsby caches dependencies as well and if the version
> didn't change you won't get updated code. So if you're using a local package
> you need to run `gatsby clean` as well before restarting the server.
>
> So the full workflow looks like this:
>
> 1. Change the dependency to `"@toitware/code-block": "../path/to/npm-packages/packages/code-block"`
> 2. `yarn upgrade @toitware/code-block`
> 3. `gatsby clean && gatsby develop`
> 4. Repeat the previous 2 steps until you've finished with the development,
>    then change the dependency back to the version you're going to publish:
>    `"@toitware/code-block": "^2.0.0"`
> 5. Publish the packages first, then run `yarn upgrade @toitware/code-block`
>    again, make sure everything still works, and you're done.

### Running tests

You can test all packages from root with:

```sh
yarn test
```

or if you want to test only a specific package:

```sh
yarn test --projects packages/testing-utils
```

### Snapshots

React elements are tested with Snapshots. To update a snapshot, use:

```sh
yarn test -u
```

Make sure the new snapshot is correct before checking it in!

## Publish a new version

Publish a new version by increasing the version in your `package.json` and merge
it into master (through a PR).

### New package

> **⚠️ You need to publish the project manually the first time. Once it's
> published, you only need to increase the version and GitHub Actions will take
> care of it.**

Make sure you add your package to the workflow matrix in
`.github/workflows/node.js.yaml`.
