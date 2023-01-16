---
Title: All in one: SPA, SSR, SSG and API
Description: Set up a Vite.js app that depending on the route, it either serves static content or fallbacks to server-side rendering.
Date: 2023-01-11
# Draft: true
---

Recently, I started to work on [feez.ws](https://www.feez.ws), a new app that allows tracking progress in public, giving you a platform to share your journey with friends, family, and a community of like-minded individuals.

I am also the founder of Stormkit, so this was a perfect case for me **to dogfood my product and host Feez on Stormkit**.

In this blog post, I'll write about how I used [Vite](https://vitejs.dev/) with [React](https://reactjs.org/) to create a monorepo capable of server-side rendering, generating static pages and, at the same time, acting as a single page app. Hang on tight!

## How to structure the repository

Before starting to work on the application, I roughly had the following structure in mind:

| Route         | Page type             | Description | SEO  |
| ------------- | --------------------- | ----------- | ---- |
| feez.ws       | Static page (SSG)     | Home page, terms, pricing, etc... all static content. | Yes |
| feez.ws/my    | Single page app (SPA) | Authenticated part of the application. | No | 
| feez.ws/:name | Dynamic page (SSR)    | User-generated content. | Yes |

Usually, it is a common practice to have two different repositories for the landing page and the application. However, with Feez, I wanted to keep things simple and manage only one code base. So essentially, the following
image illustrates what I wanted to achieve: 

![Page rendering logic](/content/programming/2023-01-12-page-rendering.svg)

## Why not use a framework?

As a matter of fact, I love using React, but I prefer not to use frameworks for a few reasons:

1. They change frequently, and it's hard to keep them up-to-date.
2. Every other day, there is a new framework in the space, and their popularity changes frequently.
3. The learning curve

Since I started experimenting with Vite, I found a built-in way to make everything these frameworks are doing, which I needed for my App: server-side rendering (SSR), static site generator (SSG), single-page application (SPA), and an application programming interface (API).

## How does Server side rendering work?

Before getting into details, let's have a look at the following chart:

![Server side rendering flow chart](/content/programming/2023-01-12-ssr-flow-chart.svg)

The flow that the image describes is as follows:

1. User makes a request
2. Our Node Server receives the request
3. It loads the server entry point. At this stage we:
    * Fetch async data
    * Feed the App with the data
    * Router renders the correct page with data
    * Return the rendered content and metatags
4. Serve the response to the browser
5. Document is parsed. It loads our client-side application.
6. The client-side application hydrates on top of the server-side rendered page.
    * Hydration means how React “attaches” to existing HTML that was already rendered by React in a server environment.
7. After the hydration is complete, the App is reactive. 

## How to generate static pages?

This step is simply another little addition to the server-side rendering. All we have to do is to spawn a Node Server, ask it to render pages that we want to be static, take a "snapshot" of the response and, save it into an HTML file.

## How does hydration work? 

There are two things to keep in mind here: 

1. Use React.hydrateRoot instead of React.createRoot when mounting the App
2. If your page is making an async request, inject the response into the document on the server side and retrieve it on the client side to avoid redundant calls to the API.

## How to set up the Node Server?

The first thing I did was scaffold a new project using Vite and choose React/TypeScript:

```bash
npm create vite@latest
```

Typically, this is enough if you need an SPA, but if you need SSR and/or SSG, you'll need to extend it and create
your own entry file:

```js
// src/vite-server.js

import fs from "fs";
import path from "path";
import express from "express";
import { fileURLToPath } from "node:url";
import { createServer as createViteServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();

  // Create Vite server in middleware mode and configure the app type as
  // 'custom', disabling Vite's own HTML serving logic so parent server
  // can take control
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  // use vite's connect instance as middleware
  // if you use your own express router (express.Router()), you should use router.use
  app.use(vite.middlewares);

  app.get("*", async (req, res, next) => {
    try {
      const url = req.originalUrl.split(/\?#/)[0] || "/";

      // // 1. Read and apply Vite HTML transforms. This injects the Vite HMR client, and
      // //    also applies HTML transforms from Vite plugins, e.g. global preambles
      // //    from @vitejs/plugin-react
      const template = await vite.transformIndexHtml(
        req.originalUrl,
        fs.readFileSync(path.resolve(__dirname, "..", "index.html"), "utf-8")
      );

      // 2. Load the server entry. vite.ssrLoadModule automatically transforms
      //    your ESM source code to be usable in Node.js! There is no bundling
      //    required, and provides efficient invalidation similar to HMR.
      const { render } = await vite.ssrLoadModule("./src/entry-server");
      const rendered = await render(url);

      return res
        .status(rendered.status)
        .set({ "Content-Type": "text/html" })
        .send(
          template
            .replace(`</head>`, `${rendered.head}</head>`)
            .replace(
              `<div id="root"></div>`,
              `<div id="root">${rendered.content}</div>`
            )
        );
    } catch (e) {
      // If an error is caught, let Vite fix the stack trace so it maps back to
      // your actual source code.
      if (e instanceof Error) {
        vite.ssrFixStacktrace(e);
      }

      next(e);
    }
  });

  app.listen(5173, () => {
    console.log(`Server listening on http://localhost:5173`);
  });
}

createServer();

```

We spawn an express server and listen to all requests with a handler. The handler then takes the request and loads the `src/entry-server.js` using Vite's built-in helper function. 

I needed to change the dev script and install express package as follows: 

```diff
diff --git a/package.json b/package.json
index 5d197e2..e6bae81 100644
--- a/package.json
+++ b/package.json
@@ -4,7 +4,7 @@
   "version": "0.0.0",
   "type": "module",
   "scripts": {
-    "dev": "vite",
+    "dev": "node ./src/vite-server.js",
     "build": "vite build",
     "preview": "vite preview"
   },
@@ -16,6 +16,7 @@
     "@types/react": "^18.0.26",
     "@types/react-dom": "^18.0.9",
     "@vitejs/plugin-react": "^3.0.0",
+    "express": "^4.18.2",
     "vite": "^4.0.0"
   }
 }
```

Now, if you run `npm run dev`, you'll see that a development server is spawned. However, when you visit http://localhost:5173 it won't work because we still miss the `src/entry-server.js` file. I want to avoid getting into the details of how to implement that file because the possibilities are endless. It's basically up to you. The idea is simple, though. You need to return the head properties (for SEO) and the rendered content. Here's an example:

```js
import { renderToString } from "react-dom/server";
import App from "./App";

export const render = async (url) => {
  return { 
    status: 200,
    content: renderToString(<App />),
    head: `<title>My Page Title</title>`
  }
}
```

The example above renders the App on the server side and returns it as a string. The `src/vite-server.js` file takes the result and serves that as a response. 

One thing to note is that React's `renderToString` function is synchronous. Therefore, if you need to fetch data from somewhere, you won't be able to use `useEffect` inside your component on the server side. Therefore, your implementation must fetch data before calling `renderToString` and pass that as an argument to the App. 

For example, for Feez, I plan to implement this logic inside a routes file shared between the server and client sides:

```js
// routes.jsx

import React from "react"
import { matchPath } from "react-router";

const routes = [
  { path: "/", chunk: () => import("~/pages") },
  { path: "/my", chunk: () => import("~/pages/my") },
  { path: "/:name", chunk: () => import("~/pages/[name]") },
];

const isServerSide = typeof window === "undefined";

export default async (url) => {
  let data;

  for (const r of routes) {
    // Code-splitting works only for the client-side because 
    // it is an asynchronous operation. Therefore load the chunk
    // before calling `renderToString`. 
    if (isServerSide) {
      const fileContent = await r.chunk();
      const Element = fileContent.default; 
      const fetchData = fileContent.fetchData;
      
      r.element = <Element />

      // If it is server-side and the file exports a function called `fetchData`
      // and the route matches, call `fetchData` and return the result.
      if (fetchData && matchPath(r.path, url)) {
        // This can return both the `head` and `data` that will be passed as an argument.
        data = await fetchData(url); 
      }
    } 
    // Otherwise, for client-side use React.lazy to do code-splitting.
    else { 
      const Component = React.lazy(dynamicImport);

      r.element = (
        <React.Suspense fallback={<div>Loading...</div>}>
          <Component />
        </React.Suspense>
      )
    }
  }

  return { routes, data };
}
```

And then modify the `src/entry-server.js` file to handle the changes:

```js
// src/entry-server.js

import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";
import App from "./App";
import createRoutes from "./routes";

export const render = async (url) => {
  const { routes, data } = await createRoutes(url);
  

  return { 
    status: 200,
    content: renderToString(
      <StaticRouter location={url}>
        <App data={data} routes={routes} /> 
      </StaticRouter>
    ),
    head: `<title>My Page Title</title>`
  }
}
```

So, now, the application can receive a request, make the necessary call based on the route, and render that content on the server side.


