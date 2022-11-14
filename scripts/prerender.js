// Pre-render the app into static HTML.
// run `npm run generate` and then `dist/static` can be served as a static site.
import fs from "node:fs";
import path from "node:path";
import url from "node:url";
import glob from "glob";

const __dirname = path.dirname(url.fileURLToPath(import.meta.url));

const toAbsolute = (p) => path.resolve(__dirname, p);

const template = fs.readFileSync(
  toAbsolute("../dist/static/src/index.html"),
  "utf-8"
);

const manifestFilePath = toAbsolute("../dist/static/ssr-manifest.json");
const manifest = JSON.parse(fs.readFileSync(manifestFilePath, "utf-8"));

const { render } = await import("../dist/server/entry-server.js");

const generateRoutes = async () => {
  const files = await glob.sync("**/*.tsx", {
    cwd: path.join(__dirname, "../src/pages"),
  });

  return files.map((file) => ({
    path: `/${file
      .replace(/\[/g, ":")
      .replace(/\]/g, "")
      .replace("index", "")
      .replace(".tsx", "")
      .replace(/\/$/, "")}`,
    file: file,
  }));
};

(async () => {
  // determine routes to pre-render from src/pages
  const routes = await generateRoutes();
  const routesToPrerender = routes
    .map((route) => ({
      file: path.join("src/pages", route.file),
      path: route.path,
    }))
    .filter((route) => !route.path.startsWith("/blog/"));

  // Special condition for /blog/:name
  const posts = glob.sync("**/*.md", {
    cwd: path.join(__dirname, "../", "src", "content"),
  });

  posts.forEach((post) => {
    const pieces = post.split("/");
    const path = pieces.length === 2 ? `[category]/[name]` : `[name]`;

    routesToPrerender.push({
      file: `src/pages/blog/${path}.tsx`,
      path: `/blog/${post.replace(".md", "")}`,
    });
  });

  // pre-render each route...
  for (const route of routesToPrerender) {
    const { status, content } = await render(route.path);
    const preloads = manifest[route.file];

    if (status !== 200) {
      continue;
    }

    const html = template
      .replace(
        "</head>",
        `${preloads?.map((file) => renderPreloadLink(file)).join(" ")}</head>`
      )
      .replace(`<div id="root"></div>`, `<div id="root">${content}</div>`)
      .replace(/>\s+</g, "><");

    const filePath = `../dist/static${
      route.path === "/" ? "/index" : route.path
    }.html`;

    fs.mkdirSync(toAbsolute(path.dirname(filePath)), { recursive: true });

    fs.writeFileSync(toAbsolute(filePath), html);
    console.log("pre-rendered:", filePath.replace("../dist/static", ""));
  }

  fs.unlinkSync(manifestFilePath);
  fs.rmSync(toAbsolute(path.join("../dist/static/src")), { recursive: true });
})();

function renderPreloadLink(file) {
  if (file.endsWith(".js")) {
    return `<link rel="modulepreload" crossorigin href="${file}">`;
  } else if (file.endsWith(".css")) {
    return `<link rel="stylesheet" href="${file}">`;
  } else {
    return "";
  }
}
