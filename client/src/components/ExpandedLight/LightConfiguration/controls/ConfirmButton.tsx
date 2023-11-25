import useActiveLight from "@/hooks/useActiveLight";
import useSliderData from "@/hooks/useSliderData";
import { setLightState } from "@/lib/elysia";
import { cn, createColorBody, createWhiteBody } from "@/lib/utils";
import { useState } from "react";

export default function ConfirmButton() {
  const [isOnCooldown, setIsOnCooldown] = useState(false);
  const { lightConfig, isColor } = useSliderData();
  const { activeLight } = useActiveLight();
  if (!activeLight) return null;
  const handleClick = async () => {
    if (!isOnCooldown) {
      setIsOnCooldown(true);
      await setLightState({
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
