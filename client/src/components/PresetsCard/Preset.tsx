import { cn, kelvinToHsl } from "@/lib/utils";
import type { Preset } from "@server/types";

export default function Preset(
  props: Preset & {
    handleClick: (
      hue: number | null,
      saturation: number | null,
      lightness: number | null,
      brightness: number,
      kelvin: number | null,
      lightId: string,
      groupId: string
    ) => Promise<void>;
    handleDelete: (id: number) => Promise<void>;
    isOnCooldown: boolean;
  }
) {
  let backgroundColor: string;
  if (props.kelvin) {
    const { hue, saturation, lightness } = kelvinToHsl(props.kelvin);
    backgroundColor = `hsl(${hue}, ${saturation * 100}%, ${lightness}%)`;
  } else {
    backgroundColor = `hsl(${props.hue}, ${props.saturation! * 100}%, ${
      props.lightness
    }%)`;
  }

  return (
    <div
      className={cn(
        "w-24 h-16 rounded-md text-white m-2 p-1 cursor-pointer relative",
        { "cursor-wait": props.isOnCooldown }
      )}
      style={{
        backgroundColor,
      }}
      onClick={async () =>
        props.handleClick(
          props.hue,
          props.saturation,
          props.lightness,
          props.brightness,
          props.kelvin,
          props.lightId,
          props.groupId
        )
      }
    >
      {props.label}
      <div
        className="absolute top-[-8px] right-[-7px] text-black bg-theme flex flex-row justify-center items-center rounded-full w-4 h-4 border-[1px] border-inverseTheme m-0 p-0 cursor-pointer opacity-0 hover:opacity-100"
        onClick={async (e) => {
          e.stopPropagation();
          await props.handleDelete(props.id);
        }}
      >
        x
      </div>
    </div>
  );
}
