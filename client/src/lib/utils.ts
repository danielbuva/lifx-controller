import { QueryClient } from "@tanstack/react-query";
import clsx, { type ClassValue } from "clsx";
import { clamp } from "framer-motion";
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

export function normalize(
  normalizeFrom: number,
  normalizeTo: number,
  value: number
) {
  return clamp(
    normalizeFrom,
    normalizeTo,
    (value / 176) * (normalizeTo - normalizeFrom) + normalizeFrom
  );
}

export function rgbToHsl(
  r: number,
  g: number,
  b: number
): [number, number, number] {
  (r /= 255), (g /= 255), (b /= 255);
  const max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h = 0,
    s = l;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [h * 360, s, l * 100];
}
