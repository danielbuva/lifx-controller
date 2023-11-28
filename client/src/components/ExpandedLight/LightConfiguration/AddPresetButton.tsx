import useActiveLight from "@/hooks/useActiveLight";
import usePresets from "@/hooks/usePresets";
import useSliderData from "@/hooks/useSliderData";
import { addPreset } from "@/lib/elysia";
import { useState } from "react";

export default function AddPresetButton() {
  const [label, setLabel] = useState("");
  const { lightConfig, isColor } = useSliderData();
  const activeLight = useActiveLight();
  const { setPresets } = usePresets();
  const handleClick = async () => {
    if (!activeLight || !label) return null;
    let presetId: number | null;
    if (isColor) {
      presetId = await addPreset({
        groupId: activeLight.group.id,
        lightId: activeLight.id,
        label,
        hue: lightConfig.hue,
        saturation: lightConfig.saturation,
        lightness: lightConfig.lightness,
        brightness: lightConfig.brightness,
        kelvin: null,
      });
    } else {
      presetId = await addPreset({
        groupId: activeLight.group.id,
        lightId: activeLight.id,
        label,
        hue: null,
        saturation: null,
        lightness: lightConfig.lightness,
        brightness: lightConfig.brightness,
        kelvin: lightConfig.kelvin,
      });
    }
    if (presetId != null) {
      setPresets((prev) => {
        if (prev) {
          return [
            ...prev,
            {
              id: presetId as number,
              groupId: activeLight.group.id,
              lightId: activeLight.id,
              label,
              hue: lightConfig.hue,
              saturation: lightConfig.saturation,
              lightness: lightConfig.lightness,
              brightness: lightConfig.brightness,
              kelvin: null,
            },
          ];
        }
        return [
          {
            id: presetId as number,
            groupId: activeLight.group.id,
            lightId: activeLight.id,
            label,
            hue: lightConfig.hue,
            saturation: lightConfig.saturation,
            lightness: lightConfig.lightness,
            brightness: lightConfig.brightness,
            kelvin: null,
          },
        ];
      });
    }
  };

  return (
    <div className="gap-4 flex flex-col">
      <input
        className="w-44 h-9"
        onChange={(e) => setLabel(e.currentTarget.value)}
        value={label}
      />
      <button
        className="flex items-center w-44 h-9 justify-center"
        onClick={handleClick}
      >
        preset +
      </button>
    </div>
  );
}
