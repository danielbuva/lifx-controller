import ConfirmButton from "@/components/LifxRemote/ExpandedLight/LightConfiguration/controls/ConfirmButton";
import BrightnessSlider from "@/components/LifxRemote/Sliders/BrightnessSlider";
import KelvinSlider from "@/components/LifxRemote/Sliders/KelvinSlider";

export default function WhiteControls() {
  return (
    <>
      <KelvinSlider />
      <BrightnessSlider />
      <ConfirmButton />
    </>
  );
}
