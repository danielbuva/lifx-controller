import { useLightState } from "@/hooks/put";
import useActiveLight from "@/hooks/useActiveLight";
import useSlideData from "@/hooks/useSliderData";
import type { LightConfigState } from "@/lib/types";

export default function ConfirmButton() {
  const setLightState = useLightState();
  const { lightConfig } = useSlideData();
  const { activeLight } = useActiveLight();
  if (!activeLight) return null;
  const handleClick = () => {
    setLightState({ id: activeLight.id, color: createBody(lightConfig) });
  };
  return <button onClick={handleClick}>confirm</button>;
}

function createBody({ hue, saturation, brightness }: LightConfigState) {
  return `hue:${hue} saturation:${saturation} brightness:${brightness}`;
}
