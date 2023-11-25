import useActiveLight from "@/hooks/useActiveLight";
import useSlideData from "@/hooks/useSliderData";
import { setLightState } from "@/lib/elysia";
import type { LightConfigState } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function ConfirmButton() {
  const [isOnCooldown, setIsOnCooldown] = useState(false);
  const { lightConfig, isColor } = useSlideData();
  const { activeLight } = useActiveLight();
  if (!activeLight) return null;
  const handleClick = async () => {
    if (!isOnCooldown) {
      setIsOnCooldown(true);
      setLightState({
        id: activeLight.id,
        color: isColor
          ? createColorBody(lightConfig)
          : createWhiteBody(lightConfig),
      });
      setTimeout(() => {
        setIsOnCooldown(false);
      }, 1000);
    }
  };
  return (
    <button
      className={cn(
        "w-44 h-9 rounded-md justify-center items-center flex",
        { "cursor-wait": isOnCooldown }
      )}
      disabled={isOnCooldown}
      onClick={handleClick}
    >
      confirm
    </button>
  );
}

function createColorBody({
  hue,
  saturation,
  brightness,
}: LightConfigState) {
  return `hue:${hue} saturation:${saturation} brightness:${brightness}`;
}

function createWhiteBody({ kelvin, brightness }: LightConfigState) {
  return `kelvin:${kelvin} brightness:${brightness}`;
}
