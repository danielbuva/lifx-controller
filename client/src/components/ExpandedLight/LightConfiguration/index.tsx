import ColorOrWhite from "@/components/ExpandedLight/LightConfiguration/controls/ColorOrWhite";
import Presets from "@/components/PresetsCard/Presets";
import { SliderContext } from "@/hooks/useSliderData";
import type { LightConfigState } from "@/lib/types";
import type { Light } from "@server/types";
import { motion } from "framer-motion";
import { useState } from "react";

import AddPresetButton from "./AddPresetButton";
import ColorControls from "./controls/ColorControls";
import WhiteControls from "./controls/WhiteControls";

export default function LightConfiguration({ light }: { light: Light }) {
  const [isColor, setIsColor] = useState(light.color.saturation !== 0);
  const [lightConfig, setLightConfig] = useState<LightConfigState>({
    hue: light.color.hue,
    saturation: light.color.saturation,
    kelvin: light.color.kelvin,
    brightness: light.brightness,
    lightness: 50,
  });

  return (
    <motion.div
      className="flex flex-row gap-6"
      animate="origin"
      initial="bottom"
      exit="bottom"
      variants={controls}
    >
      <div className="flex flex-col gap-4">
        <SliderContext.Provider
          value={{
            lightConfig,
            setLightConfig,
            isColor,
          }}
        >
          <AddPresetButton />
          <ColorOrWhite setIsColor={setIsColor} />
          {isColor ? <ColorControls /> : <WhiteControls />}
        </SliderContext.Provider>
      </div>
      <Presets id={light.id} />
    </motion.div>
  );
}

const controls = {
  bottom: { y: 90, opacity: 0 },
  origin: { y: 0, opacity: 1, transition: { delay: 0.45 } },
};
