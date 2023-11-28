import useActiveLight from "@/hooks/useActiveLight";
import useLifxState from "@/hooks/useLifxState";
import useSliderData from "@/hooks/useSliderData";
import { cn } from "@/lib/utils";

export default function ConfirmButton() {
  const { lightConfig, isColor } = useSliderData();
  const { setHslbk, isOnCooldown } = useLifxState();
  const { activeLight } = useActiveLight();
  if (!activeLight) return null;
  const handleClick = async () => {
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
