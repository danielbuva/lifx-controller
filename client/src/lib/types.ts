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
  power: "on" | "off";
  seconds_since_seen: number;
  uuid: string;
};

export type LightsResult = Promise<
  {
    groupName: string;
    groupId: string;
    lights: Light[];
  }[]
>;
