import { motion } from "framer-motion";

import { itemVariant } from "./utils";

import Switch from "../../styled/Switch";
import { Power } from "../../../lib/types";
import { useToggle } from "../../../hooks/post";

export default function GroupCardHeader({
  groupName,
  name,
  power,
}: {
  groupName: string;
  name: string;
  power: Power;
}) {
  const togglePower = useToggle("group");
  return (
    <motion.div className="flex flex-row justify-between bg-slate-600 p-4 rounded-tl-md rounded-tr-md">
      <motion.h2
        className="text-xl font-semibold text-white"
        variants={itemVariant}
      >
        {name}
      </motion.h2>
      <Switch
        color={{ hue: 0, saturation: 0 }}
        power={power}
        toggle={() => togglePower(groupName)}
      />
    </motion.div>
  );
}
