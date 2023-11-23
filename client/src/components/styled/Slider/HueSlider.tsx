import useSlideData from "@/hooks/useSliderData";
import useSliderSelect from "@/hooks/useSliderSelect";

// todo: refactor to use brightness slider logic

export default function HueSlider() {
  const { lightConfig, setLightConfig } = useSlideData();
  const setHue = (hueValue: number) => {
    setLightConfig({ ...lightConfig, hue: hueValue });
  };
  const { handleMouseDown, ref } = useSliderSelect(setHue, 360);

  return (
    <div
      className="w-44 h-9 bg-hue cursor-pointer rounded-md"
      onMouseDown={handleMouseDown}
      ref={ref}
    ></div>
  );
}
