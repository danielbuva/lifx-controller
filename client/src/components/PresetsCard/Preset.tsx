import { cn, kelvinToHsl } from "@/lib/utils";
import type { Preset } from "@server/types";

export default function Preset({
  id,
  label,
  hue,
  saturation,
  lightness,
  kelvin,
  lightId,
  brightness,
  handleClick,
  handleDelete,
  isOnCooldown,
}: Preset & {
  handleClick: (
    kelvin: number | null,
    lightId: string,
    brightness: number,
    saturation: number | null,
    hue: number | null
  ) => Promise<void>;
  handleDelete: (id: number) => Promise<void>;
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
        "w-24 h-16 rounded-md text-white m-2 p-1 cursor-pointer relative",
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
      <div
        className="absolute top-[-8px] right-[-7px] text-black bg-theme flex flex-row justify-center items-center rounded-full w-4 h-4 border-[1px] border-inverseTheme m-0 p-0 cursor-pointer opacity-0 hover:opacity-100"
        onClick={async (e) => {
          e.stopPropagation();
          await handleDelete(id);
        }}
      >
        x
      </div>
    </div>
  );
}
