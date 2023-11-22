import { onSliderSelect } from "@/components/styled/Slider/utils";
import { useCallback, useRef } from "react";

export default function useSliderSelect(
  onChange: (sliderValue: number) => void,
  normalizeTo: number = 100
) {
  const ref = useRef<HTMLDivElement>(null);

  const onDrag = useCallback(
    (e: MouseEvent) => {
      if (ref.current) {
        onChange(onSliderSelect(e, ref.current, normalizeTo));
      }
    },
    [normalizeTo, onChange]
  );

  const handleMouseDown = () => {
    window.addEventListener("mousemove", onDrag);
  };

  const handleMouseUp = () => {
    window.removeEventListener("mousemove", onDrag);
  };

  return { handleMouseDown, handleMouseUp, ref };
}
