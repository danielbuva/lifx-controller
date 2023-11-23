import useSlideData from "@/hooks/useSliderData";
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import { type PointerEvent, useRef } from "react";

import { clamp, hueSaturationToHex } from "./utils";

// it animates to cursor click
// if you start dragging before animation is over
// it does a jarring snap to cursor
// todo: find a way to animate between transitions of dragging and clicking

// w-44 = 176px

export default function BrightnessSlider() {
  const { lightConfig, setLightConfig } = useSlideData();
  const interactableAreaRef = useRef<HTMLDivElement>(null);
  const sliderX = useMotionValue(lightConfig.brightness);
  const background = useMotionTemplate`linear-gradient(90deg, ${hueSaturationToHex(
    lightConfig.hue,
    lightConfig.saturation * 100
  )} ${sliderX}px, #d1d5db 0)`;

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
      brightness: clamp(pointerPosition / 176),
    });
    sliderX.set(pointerPosition);
  };

  const handleMouseUp = () => {
    window.removeEventListener("mousemove", handleDrag);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const pointerPosition = getPosition(e.pageX);
    setLightConfig({
      ...lightConfig,
      brightness: clamp(pointerPosition / 176),
    });
    animate(sliderX, getPosition(e.pageX));

    // need global mouseup to remove listener even when
    // user mouses up when out of element
    window.addEventListener("mousemove", handleDrag);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <motion.div
      className="relative w-44 h-9 select-none rounded-md overflow-hidden cursor-pointer"
      onPointerDown={handlePointerDown}
      ref={interactableAreaRef}
      style={{
        background,
      }}
    ></motion.div>
  );
}
