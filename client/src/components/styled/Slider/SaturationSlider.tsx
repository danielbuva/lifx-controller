import useSlideData from "@/hooks/useSliderData";
import { type PointerEvent, useRef } from "react";

import { clamp, hueSaturationToHex, hueToHex } from "./utils";

export default function SaturationSlider() {
  const { lightConfig, setLightConfig } = useSlideData();
  const interactableAreaRef = useRef<HTMLDivElement>(null);

  const getPosition = (pageX: number) => {
    const interactableArea = interactableAreaRef.current;
    if (interactableArea) {
      // convert click coordinate to pixel coordinate within element 0 - 176
      return pageX - interactableArea.getBoundingClientRect().left;
    }
    return lightConfig.brightness;
  };

  const handleDrag = (e: MouseEvent) => {
    const pointerPosition = getPosition(e.pageX);
    setLightConfig({
      ...lightConfig,
      // normalize pointer position to 0 - 1
      saturation: clamp(pointerPosition / 176),
    });
    // sliderX.set(pointerPosition);
  };

  const handleMouseUp = () => {
    window.removeEventListener("mousemove", handleDrag);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const pointerPosition = getPosition(e.pageX);
    setLightConfig({
      ...lightConfig,
      saturation: clamp(pointerPosition / 176),
    });
    // animate(sliderX, getPosition(e.pageX));

    // need global mouseup to remove listener even when
    // user mouses up when out of element
    window.addEventListener("mousemove", handleDrag);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className="relative w-44 h-9 select-none rounded-md overflow-hidden cursor-pointer"
      style={{
        background: `linear-gradient(to right, ${hueSaturationToHex(
          lightConfig.hue,
          0
        )}, ${hueToHex(lightConfig.hue)})`,
      }}
    >
      <div
        ref={interactableAreaRef}
        className="absolute w-44 h-9"
        onPointerDown={handlePointerDown}
      />
    </div>
  );
}
