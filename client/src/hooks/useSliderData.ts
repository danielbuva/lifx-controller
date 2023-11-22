import type { LightConfigState } from "@/lib/types";
import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
} from "react";

export const SliderContext = createContext<{
  lightConfig: {
    hue: number;
    brightness: number;
    saturation: number;
    lightness: number;
    kelvin: number;
  };
  setLightConfig: Dispatch<SetStateAction<LightConfigState>>;
} | null>(null);

export default function useSlideData() {
  const context = useContext(SliderContext);
  if (!context) {
    throw new Error(
      "Slider.* component must rendered as a child of Sliders component"
    );
  }
  return context;
}
