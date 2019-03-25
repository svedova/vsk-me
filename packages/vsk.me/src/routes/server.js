import clientRoutes from "./client";

const robotsTxt = `
User-agent: *
Allow: /
`;

export default clientRoutes.concat({
  path: "/robots.txt",
  setup: async () => ({
    headers: {
      "Content-Type": "text/plain; charset=utf-8"
    },
    body: robotsTxt.trim()
  })
});
