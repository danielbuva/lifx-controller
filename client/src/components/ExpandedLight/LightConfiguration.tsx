import { SliderContext } from "@/hooks/useSliderData";
import { LightConfigState } from "@/lib/types";
import { type ReactNode, useState } from "react";

export default function LightConfiguration({
  children,
  initialState,
  isColor,
}: {
  children: ReactNode;
  initialState: LightConfigState;
  isColor: boolean;
}) {
  const [lightConfig, setLightConfig] =
    useState<LightConfigState>(initialState);

  // console.log(lightConfig.kelvin);

  return (
    <SliderContext.Provider
      value={{
        lightConfig,
        setLightConfig,
        isColor,
      }}
    >
      {children}
    </SliderContext.Provider>
  );
}
