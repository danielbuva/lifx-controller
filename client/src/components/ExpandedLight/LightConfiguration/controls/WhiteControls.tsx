import ConfirmButton from "@/components/ExpandedLight/LightConfiguration/controls/ConfirmButton";
import BrightnessSlider from "@/components/styled/Sliders/BrightnessSlider";
import KelvinSlider from "@/components/styled/Sliders/KelvinSlider";

export default function WhiteControls() {
  return (
    <>
      <KelvinSlider />
      <BrightnessSlider />
      <ConfirmButton />
    </>
  );
}
