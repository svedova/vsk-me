import clientRoutes from "./client";

const robotsTxt = `
User-agent: *
Allow: /
`;

export default clientRoutes.concat(
  {
    path: "/robots.txt",
    setup: async () => ({
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      },
      body: robotsTxt.trim()
    })
  },
  {
    path: "/yandex_1944487f2bf42ca9.html",
    setup: async () => ({ body: `Verification: 1944487f2bf42ca9` })
  }
);
