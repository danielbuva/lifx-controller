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
        "h-24 rounded-md text-white m-2 py-1 px-2 cursor-pointer relative",
        { "cursor-wait": props.isOnCooldown }
      )}
      style={{
        backgroundColor,
        minWidth: "144px",
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
        className="text-white absolute top-[-2px] right-1"
        onClick={async (e) => {
          e.stopPropagation();
          await props.handleDelete(props.id);
        }}
      >
        ×
      </div>
    </div>
  );
}
