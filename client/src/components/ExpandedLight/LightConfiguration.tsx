import { SliderContext } from "@/hooks/useSliderData";
import { LightConfigState } from "@/lib/types";
import { type ReactNode, useState } from "react";

export default function LightConfiguration({
  children,
  initialState,
}: {
  children: ReactNode;
  initialState: LightConfigState;
}) {
  const [lightConfig, setLightConfig] =
    useState<LightConfigState>(initialState);
  const [isColor, setIsColor] = useState(lightConfig.saturation !== 0);

  console.log(lightConfig.kelvin);

  return (
    <SliderContext.Provider
      value={{
        lightConfig,
        setLightConfig,
        isColor,
        setIsColor,
      }}
    >
      {children}
    </SliderContext.Provider>
  );
}
