import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import https from "https";
import type { GroupInfo, LightsResponse } from "./types";

const headers = {
  Authorization: `Bearer ${process.env.TOKEN}`,
};

const app = new Elysia()
  .use(cors())
  .get("/", () => {
    return "yooo";
  })
  .get("/lights", async () => {
    const data = await getAllLights();
    const groupedLights: { [key: string]: GroupInfo } = {};

    for (const light of data) {
      const groupName = light.group.name;

      if (!groupedLights[groupName]) {
        groupedLights[groupName] = {
          groupName: groupName,
          groupId: light.group.id,
          lights: [],
          power: light.power,
        };
      } else {
        groupedLights[groupName].lights.push(light);
        if (
          light.power === "on" &&
          groupedLights[groupName].power === "off"
        ) {
          groupedLights[groupName].power = "on";
        }
      }
    }

    return Object.values(groupedLights);
  })
  .post("/lights/:id/toggle", async ({ params }) => {
    const data = await toggleLight(params.id);
    console.log({ data });
    return data;
  })
  .listen(3000);

async function getAllLights(): LightsResponse {
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

async function toggleLight(id: string) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.lifx.com",
      path: `/v1/lights/${id}/toggle`,
      method: "POST",
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
