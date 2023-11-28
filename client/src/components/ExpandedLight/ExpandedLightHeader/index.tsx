import Switch from "@/components/styled/Switch";
import useActiveLight from "@/hooks/useActiveLight";
import useLifxState from "@/hooks/useLifxState";
import { hsbkToHsl } from "@/lib/utils";
import { Power, type Light } from "@server/types";
import { motion } from "framer-motion";

const expanded = {
  left: { x: -90 },
  origin: { x: 0, y: 0, transition: { delay: 0.45 } },
  right: { x: 90 },
};

export default function ExpandedLightHeader({ light }: { light: Light }) {
  const { toggleSwitch } = useLifxState();
  const { setActiveLight } = useActiveLight();

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
          hsl={hsbkToHsl(light.color)}
          power={light.power}
          toggle={async () => {
            setActiveLight((prev) => {
              if (prev) {
                return {
                  ...prev,
                  power: prev.power === Power.ON ? Power.OFF : Power.ON,
                };
              }
              return prev;
            });
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
