import useLifxState from "@/hooks/useLifxState";
import usePresets from "@/hooks/usePresets";
import { deletePreset } from "@/lib/elysia";
import { cn, kelvinToHsl } from "@/lib/utils";
import { useState } from "react";

import Preset from "./Preset";

export default function Presets({ id }: { id?: string }) {
  const [isOnCooldown, setIsOnCooldown] = useState(false);
  const { setHslbk } = useLifxState();
  const { presets, setPresets } = usePresets();

  if (!presets || presets.length === 0) return null;

  const presetsToShow = id
    ? presets.filter((p) => p.lightId === id)
    : presets;

  const handleClick = async (
    kelvin: number | null,
    lightId: string,
    brightness: number,
    lightness: number | null,
    saturation: number | null,
    hue: number | null,
    groupId: string
  ) => {
    if (!isOnCooldown) {
      setIsOnCooldown(true);
      if (kelvin) {
        await setHslbk({
          hslbk: { ...kelvinToHsl(kelvin), brightness, kelvin },
          groupId,
          lightId,
        });
      } else if (hue != null && saturation != null) {
        await setHslbk({
          hslbk: {
            hue,
            saturation,
            lightness: 50,
            brightness,
            kelvin: 1500,
          },
          groupId,
          lightId,
        });
      }
      setTimeout(() => {
        setIsOnCooldown(false);
      }, 1000);
    }
  };

  const handleDelete = async (id: number) => {
    await deletePreset(id);
    setPresets(presets.filter((p) => p.id !== id));
  };

  return (
    <div
      className={cn(
        "h-24 bg-theme w-full rounded-bl-md rounded-br-md p-2 flex flex-row",
        { "cursor-wait": isOnCooldown }
      )}
    >
      {presetsToShow.map((preset) => (
        <Preset
          key={preset.id}
          {...preset}
          handleClick={handleClick}
          handleDelete={handleDelete}
          isOnCooldown={isOnCooldown}
        />
      ))}
    </div>
  );
}
