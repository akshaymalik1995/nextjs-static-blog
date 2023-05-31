---
title : Data Fetching with getStaticProps in Next.js
tags : ["nextjs"]
date : 2023-05-31 14:20
---

# getStaticProps

If you export a function called `getStaticProps` (Static Site Generation) from a page, Next.js will pre-render this page at build time using the props returned by `getStaticProps`.

```js
export const getStaticProps = async () => {
  const res = await fetch('https://api.github.com/repos/vercel/next.js');
  const repo = await res.json();
  return { props: { repo } };
};
 
export default function Page({ repo }) {
  return repo.stargazers_count;
}
```

## When should I use getStaticProps?

You should use `getStaticProps` if:
- The data required to render the page is available at build time ahead of a user’s request.
- The data comes from a headless CMS.
- The data can be publicly cached (not user-specific). This condition can be bypassed in certain specific situation by using a Middleware to rewrite the path.
- The page must be pre-rendered (for SEO) and be very fast — `getStaticProps` generates HTML and JSON files, both of which can be cached by a CDN for performance.


## When does getStaticProps run?
`getStaticProps` always runs on the server and never on the client.

- `getStaticProps` always runs during next build
- `getStaticProps` runs in the background when using `fallback: true`

- `getStaticProps` is called before initial render when using `fallback: blocking`
`getStaticProps` runs in the background when using `revalidate`
`getStaticProps` runs on-demand in the background when using `revalidate()`

When combined with **Incremental Static Regeneration**, `getStaticProps` will run in the background while the stale page is being revalidated, and the fresh page served to the browser.


`getStaticProps` does not have access to the incoming request (such as query parameters or HTTP headers) as it generates static HTML. If you need access to the request for your page, consider using Middleware in addition to `getStaticProps`.


## Statically generates both HTML and JSON

When a page with `getStaticProps` is pre-rendered at build time, in addition to the page HTML file, Next.js generates a JSON file holding the result of running getStaticProps.

This JSON file will be used in client-side routing through `next/link` or `next/router`. When you navigate to a page that’s pre-rendered using `getStaticProps`, Next.js fetches this JSON file (pre-computed at build time) and uses it as the props for the page component. This means that client-side page transitions will not call `getStaticProps` as only the exported JSON is used.

When using **Incremental Static Generation**, `getStaticProps` will be executed in the background to generate the JSON needed for client-side navigation. You may see this in the form of multiple requests being made for the same page, however, this is intended and has no impact on end-user performance.

## Where can I use getStaticProps

`getStaticProps` can only be exported from a page. You cannot export it from non-page files, `_app`, `_document`, or `_error`.

One of the reasons for this restriction is that React needs to have all the required data before the page is rendered.

Also, you must use export `getStaticProps` as a standalone function — it will not work if you add `getStaticProps` as a property of the page component.

## Runs on every request in development
In development (next dev), getStaticProps will be called on every request.
