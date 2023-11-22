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

  console.log(lightConfig);

  return (
    <SliderContext.Provider value={{ lightConfig, setLightConfig }}>
      {children}
    </SliderContext.Provider>
  );
}
