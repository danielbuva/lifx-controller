import { edenTreaty } from "@elysiajs/eden";
import type { App } from "@server/index";

export const client = edenTreaty<App>("http://localhost:3000");

export async function togglePower(id: string) {
  await client.lights[id]?.toggle.post();
}

export async function setLightState({
  id,
  color,
}: {
  id: string;
  color: string;
}) {
  await client.lights["id:" + id]?.state.put({ color });
}
