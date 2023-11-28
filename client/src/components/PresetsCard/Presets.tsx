import useLifxState from "@/hooks/useLifxState";
import usePresets from "@/hooks/usePresets";
import { deletePreset } from "@/lib/elysia";
import { cn, kelvinToHsl } from "@/lib/utils";
import { useState } from "react";

import Preset from "./Preset";

export default function Presets({ id }: { id?: string }) {
  const [isOnCooldown, setIsOnCooldown] = useState(false);
  const { presets, setPresets } = usePresets();
  const { setHslbk } = useLifxState();

  if (!presets || presets.length === 0) {
    return (
      <div className="h-24 bg-theme w-full rounded-bl-md rounded-br-md" />
    );
  }

  const presetsToShow = id
    ? presets.filter((p) => p.lightId === id)
    : presets;

  const activatePreset = async (
    hue: number | null,
    saturation: number | null,
    lightness: number | null,
    brightness: number,
    kelvin: number | null,
    lightId: string,
    groupId: string
  ) => {
    if (isOnCooldown) return;
    setIsOnCooldown(true);

    if (kelvin) {
      await setHslbk({
        hslbk: { ...kelvinToHsl(kelvin), brightness, kelvin },
        groupId,
        lightId,
        isColor: false,
      });
    } else if (hue != null && saturation != null) {
      await setHslbk({
        hslbk: {
          hue,
          saturation,
          lightness: lightness ?? 50,
          brightness,
          kelvin: 1500,
        },
        groupId,
        lightId,
        isColor: true,
      });
    }

    setTimeout(() => setIsOnCooldown(false), 1000);
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
          handleClick={activatePreset}
          handleDelete={handleDelete}
          isOnCooldown={isOnCooldown}
        />
      ))}
    </div>
  );
}
