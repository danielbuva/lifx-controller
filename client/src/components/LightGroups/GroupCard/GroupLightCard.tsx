import Switch from "@/components/styled/Switch";
import useActiveLight from "@/hooks/useActiveLight";
import useLifxState from "@/hooks/useLifxState";
import { cn, hsbkToHsl } from "@/lib/utils";
import type { Light } from "@server/types";
import { AnimatePresence, motion } from "framer-motion";

import { itemVariant } from "./utils";

const expansion = {
  left: { x: -90 },
  center: { x: 0, y: 0, transition: { delay: 0.2 } },
  right: { x: 90 },
};

export function GroupLightCard({ light }: { light: Light }) {
  const { activeLight, setActiveLight } = useActiveLight();
  const { toggleSwitch } = useLifxState();

  return (
    <motion.div
      // hack border needs to be outside here or else exit animation doesn't play idk why :)
      // border looks bad during animation maybe i will remove
      // className={cn("border-2 border-theme", {
      //   "border-gray-400": border,
      // })}
      layout
      // hack because idk how to animate layout when removing element : )
      style={{ height: activeLight?.id === light.id ? 0 : "64px" }}
      variants={itemVariant}
      onClick={(e) => e.stopPropagation()}
    >
      <AnimatePresence mode="wait">
        {activeLight?.id !== light.id && (
          <motion.div
            className={cn(
              "p-4 flex w-80 justify-between cursor-pointer h-16"
            )}
            layout
            onClick={() => {
              setActiveLight(light);
            }}
          >
            <motion.p
              initial="left"
              animate="center"
              exit="left"
              variants={expansion}
              className="hover:underline"
            >
              {light.label}
            </motion.p>
            <motion.div
              initial="right"
              animate="center"
              exit="right"
              variants={expansion}
            >
              <Switch
                size="sm"
                hsl={hsbkToHsl(light.color)}
                power={light.power}
                toggle={async () =>
                  toggleSwitch({
                    type: "light",
                    groupId: light.group.id,
                    lightId: light.id,
                  })
                }
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
