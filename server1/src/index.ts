import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import https from "https";

const headers = {
  Authorization: `Bearer ${process.env.TOKEN}`,
};

const app = new Elysia()
  .use(cors())
  .get("/", () => {
    return "yooo";
  })
  .get("/lights", async () => {
    return getAllLights();
  })
  .listen(3000);

function getAllLights() {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.lifx.com",
      path: "/v1/lights/all",
      method: "GET",
      headers,
    };

    const req = https.request(options, (res) => {
      let data = "";

      res.on("data", (chunk) => {
        data += chunk;
      });

      res.on("end", () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(error);
        }
      });
    });

    req.on("error", (error) => {
      reject(error);
    });

    req.end();
  });
}

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);
