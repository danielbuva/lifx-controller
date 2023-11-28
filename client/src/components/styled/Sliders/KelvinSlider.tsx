import useSlideData from "@/hooks/useSliderData";
import { getHslAtPosition, normalizeFrom176 } from "@/lib/utils";
import { clamp } from "framer-motion/dom";
import { type PointerEvent, useRef } from "react";

export default function KelvinSlider() {
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
    const pointerPosition = clamp(0, 176, getPosition(e.pageX));
    setLightConfig({
      ...lightConfig,
      ...getHslAtPosition(pointerPosition),
      kelvin: normalizeFrom176(1500, 9000, pointerPosition),
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
      ...getHslAtPosition(pointerPosition),
      kelvin: normalizeFrom176(1500, 9000, pointerPosition),
    });

    // need global mouseup to remove listener even when
    // user mouses up when out of element
    window.addEventListener("mousemove", handleDrag);
    window.addEventListener("mouseup", handleMouseUp);
  };
  return (
    <div
      className="w-44 h-9 bg-kelvin cursor-pointer rounded-md"
      onMouseDown={handlePointerDown}
      ref={interactableAreaRef}
    ></div>
  );
}
