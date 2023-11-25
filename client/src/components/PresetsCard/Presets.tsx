import useActiveLight from "@/hooks/useActiveLight";
import { presets, setLightState } from "@/lib/elysia";
import {
  cn,
  createColorBody,
  createWhiteBody,
  hsbkToHs,
  kelvinToHsl,
} from "@/lib/utils";
import { useState } from "react";

import Preset from "./Preset";

export default function Presets({ id }: { id?: string }) {
  const [isOnCooldown, setIsOnCooldown] = useState(false);
  const { setNewHs } = useActiveLight();
  if (!presets || presets.length === 0) return null;
  let presetsToShow = presets;
  if (id) {
    presetsToShow = presetsToShow.filter(
      (preset) => preset.lightId === id
    );
  }
  if (presetsToShow.length === 0) return null;

  const handleClick = async (
    kelvin: number | null,
    lightId: string,
    brightness: number,
    saturation: number | null,
    hue: number | null
  ) => {
    if (!isOnCooldown) {
      setIsOnCooldown(true);
      if (kelvin) {
        const [hue, saturation] = kelvinToHsl(kelvin);
        setNewHs({
          hs: hsbkToHs({ hue, saturation: saturation * 1.8, kelvin }),
          from: lightId,
        });
        await setLightState({
          id: lightId,
          color: createWhiteBody({ kelvin, brightness }),
        });
      } else if (hue != null && saturation != null) {
        setNewHs({
          hs: { hue, saturation: saturation * 100 },
          from: lightId,
        });
        await setLightState({
          id: lightId,
          color: createColorBody({ hue, saturation, brightness }),
        });
      }
      setTimeout(() => {
        setIsOnCooldown(false);
      }, 1000);
    }
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
          isOnCooldown={isOnCooldown}
        />
      ))}
    </div>
  );
}
