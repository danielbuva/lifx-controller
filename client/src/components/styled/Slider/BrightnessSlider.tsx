import useSlideData from "@/hooks/useSliderData";
import { motion, useDragControls } from "framer-motion";

import { hueToHex } from "./utils";

export default function BrightnessSlider() {
  const { lightConfig } = useSlideData();
  const dragControls = useDragControls();
  // const setBrightness = (brightnessValue: number) => {
  //   setLightConfig({ ...lightConfig, brightness: brightnessValue });
  // };

  return (
    <>
      <div
        className="relative w-44 h-7 overflow-hidden bg-gray-300"
        onPointerDown={(e) =>
          dragControls.start(e, { snapToCursor: true })
        }
      >
        <motion.div
          className="h-7 w-44 relative"
          drag="x"
          dragConstraints={{ left: -85, right: 88 }}
          dragMomentum={false}
          dragControls={dragControls}
          animate={{ x: normalizeBrightness(lightConfig.brightness) }}
        >
          <div
            className="h-7 w-44 absolute left-[-88px]"
            style={{ backgroundColor: hueToHex(lightConfig.hue) }}
          />
        </motion.div>
      </div>
    </>
  );
}

function normalizeBrightness(brightness: number) {
  return (brightness * 176) / 100 - 88;
}
