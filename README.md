# UMA Documentation Website

Repository for: https://docs.umaproject.org/

This website is built using [Docusaurus 2](https://v2.docusaurus.io/), a modern
static website generator.test

Please read the instructions below if you need to run this project locally.

[![Powered by Vercel](./static/img/powered-by-vercel.svg)](https://vercel.com/?utm_source=uma%2Fdocs)

### Installation

```
$ yarn
```

### Local Development

```
$ yarn start
```

This command starts a local development server and open up a browser window.
Most changes are reflected live without having to restart the server.

### Build

You do not need to do this because our deployment process does the build
automatically (see deployment section below).

```
$ yarn build
```

This command generates static content into the `build` directory and can be
served using any static contents hosting service.

### Deployment (Vercel)

We have a team account on Vercel that watches the branches on this repo.
Whenever a new commit is pushed to the `master` branch (e.g. through merging a
PR), Vercel will deploy to https://docs.umaproject.org/.

### Deployment (Github)

This is not used because we are currently using Vercel for deployment/hosting.
These instructions are left here for posterity and reference only.

```
$ GIT_USER=<Your GitHub username> USE_SSH=true yarn deploy
```

If you are using GitHub pages for hosting, this command is a convenient way to
build the website and push to the `gh-pages` branch.
