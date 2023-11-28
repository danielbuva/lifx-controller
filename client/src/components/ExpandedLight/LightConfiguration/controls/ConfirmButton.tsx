import useActiveLight from "@/hooks/useActiveLight";
import useLifxState from "@/hooks/useLifxState";
import useSliderData from "@/hooks/useSliderData";
import { cn } from "@/lib/utils";
import { Power } from "@server/types";
import { useState } from "react";

export default function ConfirmButton() {
  const [isOnCooldown, setIsOnCooldown] = useState(false);
  const { lightConfig, isColor } = useSliderData();
  const { setHslbk } = useLifxState();
  const { activeLight, setActiveLight } = useActiveLight();
  if (!activeLight) return null;
  const handleClick = async () => {
    if (isOnCooldown) return;
    setActiveLight((prev) => {
      if (prev) {
        return {
          ...prev,
          power: prev.power === Power.ON ? Power.OFF : Power.ON,
        };
      }
      return prev;
    });
    if (isColor) {
      await setHslbk({
        hslbk: lightConfig,
        groupId: activeLight.group.id,
        lightId: activeLight.id,
      });
    } else {
      await setHslbk({
        hslbk: lightConfig,
        groupId: activeLight.group.id,
        lightId: activeLight.id,
      });
    }
    setIsOnCooldown(true);
    setTimeout(() => setIsOnCooldown(false), 1000);
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
