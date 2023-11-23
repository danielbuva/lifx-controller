import useSlideData from "@/hooks/useSliderData";
import useSliderSelect from "@/hooks/useSliderSelect";

import { hueSaturationToHex, hueToHex } from "./utils";

export default function SaturationSlider() {
  const { lightConfig } = useSlideData();
  const { handlePointerDown, interactableAreaRef } = useSliderSelect(
    "saturation",
    1
  );

  return (
    <div
      className="relative w-44 h-9 select-none rounded-md overflow-hidden cursor-pointer"
      style={{
        background: `linear-gradient(to right, ${hueSaturationToHex(
          lightConfig.hue,
          0
        )}, ${hueToHex(lightConfig.hue)})`,
      }}
      onPointerDown={handlePointerDown}
      ref={interactableAreaRef}
    />
  );
}
