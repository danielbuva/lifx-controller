import BrightnessSlider from "@/components/styled/Sliders/BrightnessSlider";
import HueSlider from "@/components/styled/Sliders/HueSlider";
import KelvinSlider from "@/components/styled/Sliders/KelvinSlider";
import SaturationSlider from "@/components/styled/Sliders/SaturationSlider";
import Switch from "@/components/styled/Switch";
import { useToggle } from "@/hooks/post";
import useActiveLight from "@/hooks/useActiveLight";
import { hsbkToHsl } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import ColorOrWhite from "./ColorOrWhite";
import ConfirmButton from "./ConfirmButton";
import LightConfiguration from "./LightConfiguration";

const expanded = {
  left: { x: -90 },
  origin: { x: 0, y: 0, transition: { delay: 0.6 } },
  right: { x: 90 },
};

export default function ExpandedLight() {
  const { activeLight } = useActiveLight();
  const [isColor, setIsColor] = useState(
    activeLight?.color.saturation !== 0
  );

  const ref = useClickOutsideExpandedLight();
  const toggle = useToggle("id");
  return (
    <AnimatePresence mode="wait">
      {activeLight && (
        <motion.div
          className="absolute w-3/5 h-2/4 flex flex-col border-2 bg-theme p-6 overflow-hidden gap-4 rounded-md"
          onClick={(e) => e.stopPropagation()}
          ref={ref}
          initial={{ opacity: 0, scale: 0, y: -100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, transition: { delay: 0.5 } }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-full flex justify-between">
            <motion.h2
              animate="origin"
              initial="left"
              exit="left"
              variants={expanded}
            >
              {activeLight.label}
            </motion.h2>
            <motion.div
              animate="origin"
              initial="right"
              exit="right"
              variants={expanded}
            >
              <Switch
                color={hsbkToHsl(activeLight.color)}
                power={activeLight.power}
                toggle={() => toggle(activeLight.id)}
              />
            </motion.div>
          </div>
          <LightConfiguration
            initialState={{
              hue: activeLight.color.hue,
              brightness: activeLight.brightness,
              lightness: 50,
              kelvin: activeLight.color.kelvin,
              saturation: activeLight.color.saturation,
            }}
            isColor={isColor}
          >
            <ColorOrWhite setIsColor={setIsColor} />
            {isColor ? (
              <>
                <HueSlider />
                <SaturationSlider />
                <BrightnessSlider />
              </>
            ) : (
              <>
                <BrightnessSlider />
                <KelvinSlider />
              </>
            )}

            <ConfirmButton />
          </LightConfiguration>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function useClickOutsideExpandedLight() {
  const { setActiveLight } = useActiveLight();
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (e: globalThis.MouseEvent) => {
      const target = e.target as Node;
      if (ref.current && target && !ref.current.contains(target)) {
        setActiveLight(null);
      }
    },
    [setActiveLight]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setActiveLight, handleClickOutside]);

  return ref;
}
