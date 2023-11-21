import { motion } from "framer-motion";

import { itemVariant } from "./utils";

import Switch from "../../styled/Switch";

export default function GroupCardHeader({
  groupId,
  name,
}: {
  groupId: string;
  name: string;
}) {
  return (
    <motion.div className="flex flex-row justify-between bg-slate-600 p-4 rounded-tl-md rounded-tr-md">
      <motion.h2
        className="text-xl font-semibold text-white"
        variants={itemVariant}
      >
        {name}
      </motion.h2>
      <Switch color={{ hue: 0, saturation: 0 }} power="on" id={groupId} />
    </motion.div>
  );
}
