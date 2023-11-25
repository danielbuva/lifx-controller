import useActiveLight from "@/hooks/useActiveLight";
import { setLightState } from "@/lib/elysia";
import {
  createColorBody,
  createWhiteBody,
  hsbkToHs,
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
  const { setNewHs } = useActiveLight();
  let backgroundColor: string;
  if (kelvin) {
    const [hue, saturation, lightness] = kelvinToHsl(kelvin);
    backgroundColor = `hsl(${hue}, ${saturation * 100}%, ${lightness}%)`;
  } else {
    backgroundColor = `hsl(${hue}, ${saturation! * 100}%, ${lightness}%)`;
  }
  const handleClick = async () => {
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
