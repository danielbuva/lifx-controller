import useActiveLight from "@/hooks/useActiveLight";
import { AnimatePresence, motion } from "framer-motion";

import ExpandedLightHeader from "./ExpandedLightHeader";
import LightConfiguration from "./LightConfiguration";

export default function ExpandedLight() {
  const { activeLight } = useActiveLight();

  return (
    <AnimatePresence mode="wait">
      {activeLight && (
        <motion.div
          className="absolute w-3/5 flex flex-col border-2 bg-theme p-6 overflow-hidden gap-4 rounded-md"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0, y: -100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, transition: { delay: 0.5 } }}
          transition={{ delay: 0.2 }}
        >
          {/* pass light as prop so animation will play */}
          <ExpandedLightHeader light={activeLight} />
          <LightConfiguration light={activeLight} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
