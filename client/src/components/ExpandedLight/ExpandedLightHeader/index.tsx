import Switch from "@/components/styled/Switch";
import { useToggle } from "@/hooks/post";
import type { Light } from "@/lib/types";
import { hsbkToHsl } from "@/lib/utils";
import { motion } from "framer-motion";

const expanded = {
  left: { x: -90 },
  origin: { x: 0, y: 0, transition: { delay: 0.45 } },
  right: { x: 90 },
};

export default function ExpandedLightHeader({ light }: { light: Light }) {
  const toggle = useToggle("id");

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
          toggle={() => toggle(light.id)}
        />
      </motion.div>
    </div>
  );
}
