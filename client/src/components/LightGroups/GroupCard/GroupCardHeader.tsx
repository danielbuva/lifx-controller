import Switch from "@/components/styled/Switch";
import { togglePower } from "@/lib/elysia";
import type { Power } from "@server/types";
import { motion } from "framer-motion";

import { itemVariant } from "./utils";

export default function GroupCardHeader({
  name,
  power,
}: {
  name: string;
  power: Power;
}) {
  return (
    <motion.div className="flex flex-row justify-between bg-slate-600 p-4 rounded-tl-md rounded-tr-md">
      <motion.h2
        className="text-xl font-semibold text-white"
        variants={itemVariant}
      >
        {name}
      </motion.h2>
      <Switch
        hsl={{ hue: 0, saturation: 0, lightness: 50 }}
        power={power}
        toggle={() => togglePower("group:" + name)}
      />
    </motion.div>
  );
}
