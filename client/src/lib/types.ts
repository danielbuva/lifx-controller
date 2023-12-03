import type { Power } from "@server/types";

export interface LightConfigState {
  hue: number;
  brightness: number;
  lightness: number;
  kelvin: number;
  saturation: number;
}

export type HSL = {
  hue: number;
  saturation: number;
  lightness: number;
};

export type HSLBK = HSL & {
  brightness: number;
  kelvin: number;
};

export type SwitchState = {
  lightId: string;
  color: HSL;
  power: Power;
};
