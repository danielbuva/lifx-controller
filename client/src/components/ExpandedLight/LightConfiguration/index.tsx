import ColorOrWhite from "@/components/ExpandedLight/LightConfiguration/controls/ColorOrWhite";
import { SliderContext } from "@/hooks/useSliderData";
import type { Light, LightConfigState } from "@/lib/types";
import { motion } from "framer-motion";
import { useState } from "react";

import ColorControls from "./controls/ColorControls";
import WhiteControls from "./controls/WhiteControls";

export default function LightConfiguration({ light }: { light: Light }) {
  const [isColor, setIsColor] = useState(light.color.saturation !== 0);
  const [lightConfig, setLightConfig] = useState<LightConfigState>({
    ...light.color,
    brightness: light.brightness,
    lightness: 50,
  });

  return (
    <motion.div
      className="flex flex-col gap-4"
      animate="origin"
      initial="bottom"
      exit="bottom"
      variants={controls}
    >
      <SliderContext.Provider
        value={{
          lightConfig,
          setLightConfig,
          isColor,
        }}
      >
        <ColorOrWhite setIsColor={setIsColor} />
        {isColor ? <ColorControls /> : <WhiteControls />}
      </SliderContext.Provider>
    </motion.div>
  );
}

const controls = {
  bottom: { y: 90, opacity: 0 },
  origin: { y: 0, opacity: 1, transition: { delay: 0.45 } },
};
