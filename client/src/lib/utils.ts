import { QueryClient } from "@tanstack/react-query";

import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const queryClient = new QueryClient();
export const url = "http://localhost:3000/lights";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function hsbkToHsl({
  hue,
  saturation,
  kelvin,
}: {
  hue: number;
  saturation: number;
  kelvin: number;
}) {
  saturation *= 100;
  if (saturation === 0) {
    // when saturation is zero, adjust hue based on kelvin
    const kelvinMin = 1500,
      kelvinMax = 9000;
    const kelvinRange = kelvinMax - kelvinMin;

    // normalize kelvin value to [0, 1]
    const normalizedKelvin = (kelvin - kelvinMin) / kelvinRange;

    // map kelvin to a hue value from orange (30) to blue (240)
    hue = 30 + normalizedKelvin * (240 - 30);

    // set saturation to a default value for visibility
    saturation = 80;
  }

  return { hue, saturation };
}
