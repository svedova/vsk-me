import clientRoutes from "./client";

const robotsTxt = `
User-agent: *
Allow: /
`;

const yandexVerification = `
<html>
  <head>
      <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  </head>
  <body>Verification: 1944487f2bf42ca9</body>
</html>
`;

export default clientRoutes.concat(
  {
    path: "/robots.txt",
    setup: async res => {
      res.setInterpolation(false);
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.send(robotsTxt.trim());
      return null;
    }
  },
  {
    path: "/yandex_1944487f2bf42ca9.html",
    setup: async res => {
      res.setInterpolation(false);
      res.setHeader("Content-Type", "text/html; charset=utf-8");
      res.send(yandexVerification.trim());
      return null;
    }
  }
);
