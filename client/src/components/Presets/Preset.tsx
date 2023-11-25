import { setLightState } from "@/lib/elysia";
import {
  createColorBody,
  createWhiteBody,
  kelvinToHsl,
} from "@/lib/utils";
import type { Preset } from "@server/types";

export default function Preset({
  lightId,
  label,
  hue,
  saturation,
  lightness,
  kelvin,
  brightness,
}: Preset) {
  let backgroundColor: string;
  if (kelvin) {
    const [hue, saturation, lightness] = kelvinToHsl(kelvin);
    backgroundColor = `hsl(${hue}, ${saturation * 100}%, ${lightness}%)`;
  } else {
    backgroundColor = `hsl(${hue}, ${saturation! * 100}%, ${lightness}%)`;
  }
  const handleClick = async () => {
    if (kelvin) {
      await setLightState({
        id: lightId,
        color: createWhiteBody({ kelvin, brightness }),
      });
    } else if (hue != null && saturation != null) {
      await setLightState({
        id: lightId,
        color: createColorBody({ hue, saturation, brightness }),
      });
    }
  };
  return (
    <div
      className="w-24 h-16 rounded-md text-white m-2 p-1 cursor-pointer"
      style={{
        backgroundColor,
      }}
      onClick={handleClick}
    >
      {label}
    </div>
  );
}
