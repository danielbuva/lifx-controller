import { cn, kelvinToHsl } from "@/lib/utils";
import type { Preset } from "@server/types";

export default function Preset({
  label,
  hue,
  saturation,
  lightness,
  kelvin,
  lightId,
  brightness,
  handleClick,
  isOnCooldown,
}: Preset & {
  handleClick: (
    kelvin: number | null,
    lightId: string,
    brightness: number,
    saturation: number | null,
    hue: number | null
  ) => Promise<void>;
  isOnCooldown: boolean;
}) {
  let backgroundColor: string;
  if (kelvin) {
    const [hue, saturation, lightness] = kelvinToHsl(kelvin);
    backgroundColor = `hsl(${hue}, ${saturation * 100}%, ${lightness}%)`;
  } else {
    backgroundColor = `hsl(${hue}, ${saturation! * 100}%, ${lightness}%)`;
  }
  return (
    <div
      className={cn(
        "w-24 h-16 rounded-md text-white m-2 p-1 cursor-pointer",
        { "cursor-wait": isOnCooldown }
      )}
      style={{
        backgroundColor,
      }}
      onClick={async () =>
        handleClick(kelvin, lightId, brightness, saturation, hue)
      }
    >
      {label}
    </div>
  );
}
