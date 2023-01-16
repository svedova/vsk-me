---
Title: All in one: SPA, SSR, SSG and API
Description: Set up a Vite.js app that depending on the route, it either serves static content or fallbacks to server-side rendering.
Date: 2023-01-11
# Draft: true
---

Recently, I started to work on [feez.ws](https://www.feez.ws), a new app that allows tracking progress in public, giving you a platform to share your journey with friends, family, and a community of like-minded individuals.

I am also the founder of [Stormkit](https://www.stormkit.io), so this was a perfect case for me **to dogfood my product and host Feez on Stormkit**.

In this blog post, I'll write about how I used [Vite](https://vitejs.dev/) with [React](https://reactjs.org/) to create a monorepo capable of server-side rendering, generating static pages and, at the same time, acting as a single page app.

If you're curious and would like to see the end result immediately, here's the repository: [Monorepo Template](https://github.com/stormkit-io/monorepo-template).

## How to structure the repository

Before starting to work on the application, I roughly had the following structure in mind:

<div class="max-w-auto" style="overflow-x: auto;"> 

| Route         | Page type             | Description | SEO  |
| ------------- | --------------------- | ----------- | ---- |
| feez.ws       | Static page (SSG)     | Home page, terms, pricing, etc... all static content. | Yes |
| feez.ws/my    | Single page app (SPA) | Authenticated part of the application. | No | 
| feez.ws/:name | Dynamic page (SSR)    | User-generated content. | Yes |

</div>

Usually, it is a common practice to have two different repositories for the landing page and the application. However, with Feez, I wanted to keep things simple and manage only one code base. The following
image illustrates what I wanted to achieve: 

![Page rendering logic](/content/programming/2023-01-12-page-rendering.svg)

## Why not use a framework?

As a matter of fact, I love using React, but I prefer not to use frameworks for a few reasons:

1. They change frequently, and it's hard to keep them up-to-date.
2. Every other day, there is a new framework in the space
3. The learning curve

Since I started experimenting with Vite, I found a built-in way to make everything these frameworks are doing, which I needed for my App: server-side rendering (SSR), static site generator (SSG), single-page application (SPA), and an application programming interface (API).

## How does Server side rendering work?

Let's have a look at the following chart. It explains the server-side rendering logic:

![Server side rendering flow chart](/content/programming/2023-01-12-ssr-flow-chart.svg)

The flow that the image describes is as follows:

1. User makes a request
2. Our Node Server receives the request and serves the entry file - <a href="https://github.com/stormkit-io/monorepo-template/blob/v1.0.0/src/vite-server.ts#L68" target="_blank" rel="noopener noreferrer">see code</a>. At this stage we:
    * Fetch async data based on route - <a href="https://github.com/stormkit-io/monorepo-template/blob/v1.0.0/src/routes.tsx#L40" target="_blank" rel="noopener noreferrer">see code</a>
    * Feed the App with the data - <a href="https://github.com/stormkit-io/monorepo-template/blob/v1.0.0/src/entry-server.tsx#L47" target="_blank" rel="noopener noreferrer">see code</a>
    * Return the content and meta tags to be rendered - <a href="https://github.com/stormkit-io/monorepo-template/blob/v1.0.0/src/entry-server.tsx#L43" target="_blank" rel="noopener noreferrer">see code</a>
3. Serve the response to the browser - <a href="https://github.com/stormkit-io/monorepo-template/blob/v1.0.0/src/vite-server.ts#L74" target="_blank" rel="noopener noreferrer">see code</a>
4. HTML document loads our client-side application - <a href="https://github.com/stormkit-io/monorepo-template/blob/v1.0.0/index.html#L8" target="_blank" rel="noopener noreferrer">see code</a>
5. The client-side application hydrates on top of the server-side rendered page - <a href="https://github.com/stormkit-io/monorepo-template/blob/v1.0.0/src/entry-client.tsx#L19" target="_blank" rel="noopener noreferrer">see code</a>
    * Hydration means how React “attaches” to existing HTML that was already rendered by React in a server environment.
6. After the hydration is complete, the App is reactive. 

## How to generate static pages?

This step is simply another little addition to the server-side rendering. All we have to do is to spawn a Node Server, ask it to render pages that we want to be static, take a "snapshot" of the response and, save it into an HTML file.

I created a file called <a href="https://github.com/stormkit-io/monorepo-template/blob/v1.0.0/src/prerender.ts" target="_blank" rel="noopener noreferrer">src/prerender.ts</a> which returns an array of routes to be generated statically. In this example it's a hard-coded string array, but it can also be a dynamically constructed array (such as the result of a directory scan).

Finally, I added a build step in <a href="https://github.com/stormkit-io/monorepo-template/blob/v1.0.0/package.json#L10" target="_blank" rel="noopener noreferrer">package.json</a> which calls the <a href="https://github.com/stormkit-io/monorepo-template/blob/v1.0.0/src/vite-server.ts#L152" target="_blank" rel="noopener noreferrer">src/vite-server.ts</a> file to generate static pages.

## How does hydration work? 

There are two things to keep in mind here: 

1. Use React.hydrateRoot instead of React.createRoot when mounting the App
2. If your page is making an async request, inject the response into the document on the server side and retrieve it on the client side to avoid redundant calls to the API.


## What about the API? 

The <a href="https://github.com/stormkit-io/monorepo-template/blob/v1.0.0/src/vite-server.ts#L33" target="_blank" rel="noopener noreferrer">src/vite-server.ts</a> file contains a route for `/api` endpoints. When it receives a request, it uses Stormkit's `matchPath` function to determine the file that will be loaded under the `src/api` directory.

## The end result

When you build the application this will create a `.stormkit` dist folder (you can change this setting in the vite configuration files) and inside it you'll find three subdirectories:

- `.stormkit/server`
- `.stormkit/public`
- `.stormkit/api`

If you go ahead, create a repository from the template and deploy this on Stormkit, it will upload the `public` folder to the CDN and the `server` and `api` folders to the lambdas. The load balancer will then load the static pages when the route exists and fallback to the server for dynamic rendering. Endpoints starting with `/api` will be forwarded to the API functions. So you have a fully hybrid with a monorepository. 

Here's an example: <a href="https://monorepo-template.stormkit.dev/" target="_blank" rel="noopener noreferrer">https://monorepo-template.stormkit.dev/</a>.

Pretty neat, isn't it? 

If you enjoyed this blog post, [give it a star](https://github.com/stormkit-io/monorepo-template) and deploy it on Stormkit 🙏🏻 And also, I'm happy to connect over <a href="https://twitter.com/savasvedova" target="_blank" rel="noopener noreferrer">Twitter</a>.