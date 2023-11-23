import type { LightConfigState } from "@/lib/types";
import { clamp } from "framer-motion";
import { type PointerEvent, useRef } from "react";

import useSlideData from "./useSliderData";

export default function useSliderSelect(
  configSelection: keyof LightConfigState
) {
  const { lightConfig, setLightConfig } = useSlideData();
  const interactableAreaRef = useRef<HTMLDivElement>(null);

  const getPosition = (pageX: number) => {
    const interactableArea = interactableAreaRef.current;
    if (interactableArea) {
      // convert click coordinate to pixel coordinate within element 0 - 176
      return pageX - interactableArea.getBoundingClientRect().left;
    }
    return lightConfig[configSelection];
  };

  const handleDrag = (e: MouseEvent) => {
    const pointerPosition = getPosition(e.pageX);
    if (configSelection === "hue") {
      setLightConfig({
        ...lightConfig,
        hue: clamp(0, 360, (pointerPosition / 176) * 360),
      });
    } else {
      setLightConfig({
        ...lightConfig,
        // normalize pointer position to 0 - 1
        [configSelection]: clamp(0, 1, pointerPosition / 176),
      });
    }
  };

  const handleMouseUp = () => {
    window.removeEventListener("mousemove", handleDrag);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const pointerPosition = getPosition(e.pageX);
    if (configSelection === "hue") {
      setLightConfig({
        ...lightConfig,
        hue: clamp(0, 360, (pointerPosition / 176) * 360),
      });
    } else {
      setLightConfig({
        ...lightConfig,
        // normalize pointer position to 0 - 1
        [configSelection]: clamp(0, 1, pointerPosition / 176),
      });
    }

    // need global mouseup to remove listener even when
    // user mouses up when out of element
    window.addEventListener("mousemove", handleDrag);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return { handlePointerDown, interactableAreaRef };
}
