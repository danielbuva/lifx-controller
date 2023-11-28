import Switch from "@/components/styled/Switch";
import useLifxState from "@/hooks/useLifxState";
import { hslkToHsl } from "@/lib/utils";
import { type Light } from "@server/types";
import { motion } from "framer-motion";

const expanded = {
  left: { x: -90 },
  origin: { x: 0, y: 0, transition: { delay: 0.45 } },
  right: { x: 90 },
};

export default function ExpandedLightHeader({ light }: { light: Light }) {
  const { toggleSwitch } = useLifxState();

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
          hsl={hslkToHsl(light.color)}
          power={light.power}
          toggle={async () => {
            await toggleSwitch({
              type: "light",
              groupId: light.group.id,
              lightId: light.id,
            });
          }}
        />
      </motion.div>
    </div>
  );
}
