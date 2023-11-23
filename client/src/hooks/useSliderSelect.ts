import type { LightConfigState } from "@/lib/types";
import { normalizeFrom176 } from "@/lib/utils";
import { type PointerEvent, useRef } from "react";

import useSlideData from "./useSliderData";

export default function useSliderSelect({
  configSelection,
  normalizeFrom = 0,
  normalizeTo = 1,
}: {
  configSelection: keyof LightConfigState;
  normalizeFrom?: number;
  normalizeTo?: number;
}) {
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
    setLightConfig({
      ...lightConfig,
      // normalize pointer position to normalizeFrom value - normalizeTo value
      [configSelection]: normalizeFrom176(
        normalizeFrom,
        normalizeTo,
        pointerPosition
      ),
    });
  };

  const handleMouseUp = () => {
    window.removeEventListener("mousemove", handleDrag);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const pointerPosition = getPosition(e.pageX);
    setLightConfig({
      ...lightConfig,
      // normalize pointer position to normalizeFrom value - normalizeTo value
      [configSelection]: normalizeFrom176(
        normalizeFrom,
        normalizeTo,
        pointerPosition
      ),
    });

    // need global mouseup to remove listener even when
    // user mouses up when out of element
    window.addEventListener("mousemove", handleDrag);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return { handlePointerDown, interactableAreaRef };
}
