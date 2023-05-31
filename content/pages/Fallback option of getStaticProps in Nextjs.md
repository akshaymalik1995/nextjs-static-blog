---
title : "Tutorial: Fallback Option of getStaticProps in Next.js"
tags : ["nextjs"]
date : 2023-05-31 16:42
description : "`fallback` is an option in the `getStaticProps` function that determines how to generate pages for paths not returned by `getStaticPaths`. It is used in combination with `getStaticPaths` to enable Incremental Static Regeneration (ISR)"
---


In this tutorial, we will dive deep into the fallback option of `getStaticProps` in Next.js. We will cover the different types of fallbacks, their trade-offs, and how to implement them in your application.

## What is fallback in getStaticProps?

`fallback` is an option in the `getStaticProps` function that determines how to generate pages for paths not returned by `getStaticPaths`. It is used in combination with `getStaticPaths` to enable Incremental Static Regeneration (ISR) .

## Fallback Options

There are three options for the `fallback` parameter:

1. `fallback: true`: The default value. Pages not returned by `getStaticPaths` are generated on-demand, similar to Server-Side Rendering (SSR).

2. `fallback: false`: Pages not returned by `getStaticPaths` will result in a 404 error 

3. `fallback: 'blocking'`: Introduced in Next.js 10, this option blocks rendering and serves a loading state while the data is being fetched in the background 

## Implementing Fallback Options

### 1. fallback: true

By default, when `fallback` is set to `true`, pages not returned by `getStaticPaths` are generated on-demand. This means that the data is fetched in the browser after the initial page load. This can result in a longer Time to First Byte (TTFB)

Example:

```javascript
export async function getStaticProps() {
  // Fetch data for some dynamic pages
  const data = await fetchData();

  return {
    props: {
      data,
    },
  };
}
```

### 2. fallback: false

When `fallback` is set to `false`, pages not returned by `getStaticPaths` will result in a 404 error. This means that you should ensure that all required paths are returned by `getStaticPaths`

Example:

```javascript
export async function getStaticProps({ params }) {
  // Fetch data for all dynamic pages
  const data = await fetchData();

  return {
    props: {
      data,
    },
  };
}
```

### 3. fallback: 'blocking'

When `fallback` is set to `'blocking'`, a loading state is served while the data is being fetched in the background. This can result in a faster TTFB compared to `fallback: true`

Example:

```javascript
export async function getStaticProps() {
  // Fetch data for some dynamic pages
  const data = await fetchData();

  return {
    props: {
      data,
    },
    fallback: 'blocking',
  };
}
```

## Trade-offs and Considerations

- `fallback: true` provides faster TTFB compared to `fallback: false`, but it can result in a slower initial rendering due to data fetching in the browser
- `fallback: false` ensures that only valid paths are served, but it can result in a 404 error for pages not returned by `getStaticPaths`.
- `fallback: 'blocking'` provides a faster TTFB.

In summary, the choice of fallback option depends on your specific use case and performance requirements.

## Conclusion

In this tutorial, we covered the different fallback options for `getStaticProps` in Next.
js, their trade-offs, and how to implement them in your application.
Choose the appropriate fallback option based on your performance requirements and the structure of your application. 

> This article has been written by AI.