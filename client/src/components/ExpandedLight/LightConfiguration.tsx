import { SliderContext } from "@/hooks/useSliderData";
import { LightConfigState } from "@/lib/types";
import { type ReactNode, useState } from "react";

export default function LightConfiguration({
  children,
}: {
  children: ReactNode;
}) {
  const [lightConfig, setLightConfig] = useState<LightConfigState>({
    hue: 0,
    brightness: 0,
    lightness: 0.5,
    kelvin: 1500,
    saturation: 1,
  });

  // console.log(lightConfig);

  return (
    <SliderContext.Provider value={{ lightConfig, setLightConfig }}>
      {children}
    </SliderContext.Provider>
  );
}
