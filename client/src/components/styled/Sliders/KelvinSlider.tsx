import useSliderSelect from "@/hooks/useSliderSelect";

export default function KelvinSlider() {
  const { handlePointerDown, interactableAreaRef } = useSliderSelect({
    configSelection: "kelvin",
    normalizeFrom: 1500,
    normalizeTo: 9000,
  });

  return (
    <div
      className="w-44 h-9 bg-kelvin cursor-pointer rounded-md"
      onMouseDown={handlePointerDown}
      ref={interactableAreaRef}
    ></div>
  );
}
