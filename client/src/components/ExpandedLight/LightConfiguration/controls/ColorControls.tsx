import ConfirmButton from "@/components/ExpandedLight/LightConfiguration/controls/ConfirmButton";
import BrightnessSlider from "@/components/Sliders/BrightnessSlider";
import HueSlider from "@/components/Sliders/HueSlider";
import SaturationSlider from "@/components/Sliders/SaturationSlider";

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
