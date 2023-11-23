import ConfirmButton from "@/components/ExpandedLight/LightConfiguration/controls/ConfirmButton";
import BrightnessSlider from "@/components/styled/Sliders/BrightnessSlider";
import HueSlider from "@/components/styled/Sliders/HueSlider";
import SaturationSlider from "@/components/styled/Sliders/SaturationSlider";

export default function ColorControls() {
  return (
    <>
      <HueSlider />
      <SaturationSlider />
      <BrightnessSlider />
      <ConfirmButton />
    </>
  );
}
