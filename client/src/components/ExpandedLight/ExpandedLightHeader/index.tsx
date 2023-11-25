import Switch from "@/components/styled/Switch";
import { togglePower } from "@/lib/elysia";
import { hsbkToHsl } from "@/lib/utils";
import { Light } from "@server/types";
import { motion } from "framer-motion";

const expanded = {
  left: { x: -90 },
  origin: { x: 0, y: 0, transition: { delay: 0.45 } },
  right: { x: 90 },
};

export default function ExpandedLightHeader({ light }: { light: Light }) {
  return (
    <div className="w-full flex justify-between">
      <motion.h2
        animate="origin"
        initial="left"
        exit="left"
        variants={expanded}
      >
        {light.label}
      </motion.h2>
      <motion.div
        animate="origin"
        initial="right"
        exit="right"
        variants={expanded}
      >
        <Switch
          color={hsbkToHsl(light.color)}
          power={light.power}
          toggle={() => togglePower("id:" + light.id)}
        />
      </motion.div>
    </div>
  );
}
