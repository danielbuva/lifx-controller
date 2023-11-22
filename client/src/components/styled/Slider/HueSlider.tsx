import useSlideData from "@/hooks/useSliderData";
import useSliderSelect from "@/hooks/useSliderSelect";

export default function HueSlider() {
  const { lightConfig, setLightConfig } = useSlideData();
  const setHue = (hueValue: number) => {
    setLightConfig({ ...lightConfig, hue: hueValue });
  };
  const { handleMouseDown, handleMouseUp, ref } = useSliderSelect(
    setHue,
    360
  );

  return (
    <div
      className="w-44 h-7 bg-hue"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      ref={ref}
    ></div>
  );
}
