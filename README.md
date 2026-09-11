# 🚧 React-Training

This is a demo project using **Vite**, **Typescript**, **TailwindCSS**, **React Router V6**, **Eslint** + **Prettier** and **PNPM**.

I put my _demo components_, _training exercises_ and miscellaneous React _webdev stuff_ on individual pages.

## Deployment

GitHub Actions checks every branch on GitHub-hosted runners. A commit on `master` publishes one immutable GHCR image and deploys staging.

The production workflow promotes the exact staging digest after approval. Nomad jobs live in `deploy/nomad`.
