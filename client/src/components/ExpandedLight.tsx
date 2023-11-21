import { AnimatePresence, motion } from "framer-motion";
import useActiveLight from "../hooks/useActiveLight";

export default function ExpandedLight() {
  const { activelight } = useActiveLight();
  return (
    <AnimatePresence>
      {activelight && (
        <motion.div
          onClick={(e) => e.stopPropagation()}
          layoutId={activelight.id}
          className="absolute w-3/5 h-2/4 bg-black flex border-2"
        >
          <motion.h2>{activelight.label}</motion.h2>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
