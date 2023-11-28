import useSliderSelect from "@/hooks/useSliderSelect";

export default function HueSlider() {
  const { handlePointerDown, interactableAreaRef } = useSliderSelect({
    configSelection: "hue",
    normalizeTo: 360,
  });

  return (
    <div
      className="w-44 h-9 bg-hue cursor-pointer rounded-md"
      onMouseDown={handlePointerDown}
      ref={interactableAreaRef}
    ></div>
  );
}
