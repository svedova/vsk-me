import clientRoutes from "./client";
import robots from "../robots.txt";

export default clientRoutes.concat([
  {
    path: "/robots.txt",
    setup: async () => ({
      headers: {
        "Content-Type": "text/plain; charset=utf-8"
      },
      body: robots
    })
  }
]);
