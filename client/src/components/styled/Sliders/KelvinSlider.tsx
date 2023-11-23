import useSlideData from "@/hooks/useSliderData";
import { normalize, rgbToHsl } from "@/lib/utils";
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
    const [hue, saturation, lightness] = getHslAtPosition(pointerPosition);
    setLightConfig({
      ...lightConfig,
      hue,
      kelvin: normalize(1500, 9000, pointerPosition),
      saturation,
      lightness,
    });
  };

  const handleMouseUp = () => {
    window.removeEventListener("mousemove", handleDrag);
    window.removeEventListener("mouseup", handleMouseUp);
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    const pointerPosition = getPosition(e.pageX);
    const [hue, saturation, lightness] = getHslAtPosition(pointerPosition);
    setLightConfig({
      ...lightConfig,
      hue,
      kelvin: normalize(1500, 9000, pointerPosition),
      saturation,
      lightness,
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

type RGB = {
  r: number;
  b: number;
  g: number;
};

function interpolateComponent(
  componentStart: number,
  componentEnd: number,
  factor: number
) {
  return Math.round(
    componentStart + (componentEnd - componentStart) * factor
  );
}

function interpolateColor(colorStart: RGB, colorEnd: RGB, factor: number) {
  return {
    r: interpolateComponent(colorStart.r, colorEnd.r, factor),
    g: interpolateComponent(colorStart.g, colorEnd.g, factor),
    b: interpolateComponent(colorStart.b, colorEnd.b, factor),
  };
}

function getHslAtPosition(mouseX: number): [number, number, number] {
  // Define the start and end colors in RGB
  const colorStart = { r: 240, g: 162, b: 114 };
  const colorEnd = { r: 224, g: 228, b: 255 };

  // Normalize the mouse position
  const position = mouseX / 176;

  // Interpolate the color
  const interpolatedColor = interpolateColor(
    colorStart,
    colorEnd,
    position
  );

  return rgbToHsl(
    interpolatedColor.r,
    interpolatedColor.g,
    interpolatedColor.b
  );
}
