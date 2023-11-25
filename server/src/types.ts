import type { Preset as dbPreset } from "@prisma/client";

export enum Power {
  ON = "on",
  OFF = "off",
}

export type Light = {
  brightness: number;
  color: { hue: number; saturation: number; kelvin: number };
  connected: boolean;
  effect: string;
  group: { id: string; name: string };
  label: string;
  last_seen: string;
  location: { id: string; name: string };
  id: string;
  power: Power;
  seconds_since_seen: number;
  uuid: string;
};

export type LightsResponse = Promise<Light[]>;
export interface GroupInfo {
  groupName: string;
  groupId: string;
  lights: Light[];
  power: Power;
}

export type Preset = dbPreset;
