# 🚧 React-Training

This is a demo project using **Vite**, **Typescript**, **TailwindCSS**, **React Router V6**, **Eslint** + **Prettier** and **PNPM**.

I put my _demo components_, _training exercises_ and miscellaneous React _webdev stuff_ on individual pages.

## Deployment

GitHub Actions checks pull requests and accepted `master` commits on `ubuntu-latest`. An accepted commit publishes one immutable GHCR image.

The production workflow promotes the exact staging digest after approval. Nomad jobs live in `deploy`.
