import useActiveLight from "@/hooks/useActiveLight";
import useSliderData from "@/hooks/useSliderData";
import { addPreset } from "@/lib/elysia";
import { useState } from "react";

export default function AddPresetButton() {
  const [label, setLabel] = useState("");
  const { lightConfig, isColor } = useSliderData();
  const { activeLight } = useActiveLight();
  const handleClick = async () => {
    if (!activeLight || !label) return null;
    if (isColor) {
      await addPreset({
        lightId: activeLight.id,
        label,
        hue: lightConfig.hue,
        saturation: lightConfig.saturation,
        lightness: lightConfig.lightness,
        brightness: lightConfig.brightness,
        kelvin: null,
      });
    } else {
      await addPreset({
        lightId: activeLight.id,
        label,
        hue: null,
        saturation: null,
        lightness: lightConfig.lightness,
        brightness: lightConfig.brightness,
        kelvin: lightConfig.kelvin,
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
