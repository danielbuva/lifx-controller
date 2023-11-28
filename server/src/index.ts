import { kelvinToHsl } from "@client/lib/utils";
import { cors } from "@elysiajs/cors";
import { PrismaClient } from "@prisma/client";
import { Elysia, t } from "elysia";
import https from "https";

import { Power, type Group, type LightsResponse } from "./types";

const prisma = new PrismaClient();

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
    const groupedLights: { [key: string]: Group } = {};

    for (const light of data) {
      if (light.color.saturation === 0) {
        const { hue, saturation, lightness } = kelvinToHsl(
          light.color.kelvin
        );
        light.color.hue = hue;
        light.color.saturation = saturation;
        light.lightness = lightness;
      } else {
        light.lightness = 50;
      }
      const groupName = light.group.name;
      const groupOfLights = groupedLights[groupName];

      if (!groupOfLights) {
        groupedLights[groupName] = {
          groupName: groupName,
          groupId: light.group.id,
          lights: [light],
          power: light.power,
        };
      } else {
        groupOfLights.lights.push(light);
        if (light.power === "on" && groupOfLights.power === "off") {
          groupOfLights.power = Power.ON;
        }
      }
    }

    return Object.values(groupedLights);
  })
  .get("/lights/presets", async () => {
    return prisma.preset.findMany();
  })
  .post("/lights/:id/toggle", async ({ params: { id } }) => {
    const data = await toggleLight(id);
    return data;
  })
  .post(
    "/lights/presets/add",
    async ({ body }) => {
      const newPreset = await prisma.preset.create({ data: body });
      return newPreset.id;
    },
    {
      body: t.Object({
        lightId: t.String(),
        label: t.String(),
        hue: t.Nullable(t.Number()),
        saturation: t.Nullable(t.Number()),
        lightness: t.Nullable(t.Number()),
        brightness: t.Number(),
        kelvin: t.Nullable(t.Number()),
      }),
    }
  )
  .put(
    "/lights/:id/state",
    async ({ body, params: { id } }) => {
      const data = await setLightState(id, body);
      return data;
    },
    {
      body: t.Object({
        power: t.Literal(Power.ON),
        color: t.String(),
      }),
    }
  )
  .delete("/lights/presets/:id", async ({ params: { id } }) => {
    await prisma.preset.delete({ where: { id: parseInt(id) } });
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

async function setLightState(id: string, body: { color: string }) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: "api.lifx.com",
      path: `/v1/lights/${id}/state`,
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
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

    req.write(JSON.stringify(body));

    req.end();
  });
}

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

export type App = typeof app;
