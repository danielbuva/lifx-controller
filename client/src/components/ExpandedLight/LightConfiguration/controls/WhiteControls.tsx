import ConfirmButton from "@/components/ExpandedLight/LightConfiguration/controls/ConfirmButton";
import BrightnessSlider from "@/components/Sliders/BrightnessSlider";
import KelvinSlider from "@/components/Sliders/KelvinSlider";

export default function WhiteControls() {
  return (
    <>
      <KelvinSlider />
      <BrightnessSlider />
      <ConfirmButton />
    </>
  );
}
