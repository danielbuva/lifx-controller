import { AnimatePresence, motion } from "framer-motion";

import useActiveLight from "@/hooks/useActiveLight";

import Switch from "@/components/styled/Switch";

import { cn, hsbkToHsl } from "@/lib/utils";
import type { Light } from "@/lib/types";
import { itemVariant } from "./utils";
import { useToggle } from "@/hooks/post";

const expansion = {
  left: { x: -90 },
  center: { x: 0, y: 0, transition: { delay: 0.2 } },
  right: { x: 90 },
};

export function GroupCardLight({ light }: { light: Light }) {
  const { activelight, setActiveLight } = useActiveLight();
  const toggle = useToggle("id");

  return (
    <motion.div
      // hack border needs to be outside here or else exit animation doesn't play idk why :)
      // border looks bad during animation maybe i will remove
      // className={cn("border-2 border-theme", {
      //   "border-gray-400": border,
      // })}
      layout
      // hack because idk how to animate layout when removing element : )
      style={{ height: activelight?.id === light.id ? 0 : "64px" }}
      variants={itemVariant}
    >
      <AnimatePresence mode="wait">
        {activelight?.id !== light.id && (
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
                color={hsbkToHsl(light.color)}
                power={light.power}
                toggle={() => toggle(light.id)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
