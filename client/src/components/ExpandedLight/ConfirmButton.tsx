import { useLightState } from "@/hooks/put";
import useActiveLight from "@/hooks/useActiveLight";
import useSlideData from "@/hooks/useSliderData";
import type { LightConfigState } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState } from "react";

export default function ConfirmButton() {
  const [isOnCooldown, setIsOnCooldown] = useState(false);
  const setLightState = useLightState();
  const { lightConfig } = useSlideData();
  const { activeLight } = useActiveLight();
  if (!activeLight) return null;
  const handleClick = () => {
    setIsOnCooldown(true);
    setLightState({ id: activeLight.id, color: createBody(lightConfig) });
    setTimeout(() => {
      setIsOnCooldown(false);
    }, 1000);
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

function createBody({ hue, saturation, brightness }: LightConfigState) {
  return `hue:${hue} saturation:${saturation} brightness:${brightness}`;
}
