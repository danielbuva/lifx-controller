import ConfirmButton from "@/components/LifxRemote/ExpandedLight/LightConfiguration/controls/ConfirmButton";
import BrightnessSlider from "@/components/LifxRemote/Sliders/BrightnessSlider";
import HueSlider from "@/components/LifxRemote/Sliders/HueSlider";
import SaturationSlider from "@/components/LifxRemote/Sliders/SaturationSlider";

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
