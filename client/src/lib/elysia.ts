import { edenTreaty } from "@elysiajs/eden";
import type { App } from "@server/index";
import { Power, type PresetWithoutId } from "@server/types";

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
  await client.lights["id:" + id]?.state.put({ power: Power.ON, color });
}

export async function addPreset(preset: PresetWithoutId) {
  return (await client.lights.presets.add.post(preset)).data;
}

export async function deletePreset(id: number) {
  await client.lights.presets[id]?.delete();
}

export const { data: presets } = await client.lights.presets.get();

export const { data: lights } = await client.lights.get();
