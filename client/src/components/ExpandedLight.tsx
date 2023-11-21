import { AnimatePresence, motion } from "framer-motion";
import useActiveLight from "../hooks/useActiveLight";
import { useEffect, useRef } from "react";

export default function ExpandedLight() {
  const { activelight } = useActiveLight();
  const ref = useClickOutsideExpandedLight();
  return (
    <AnimatePresence>
      {activelight && (
        <motion.div
          className="absolute w-3/5 h-2/4 bg-black flex border-2"
          layoutId={activelight.id}
          onClick={(e) => e.stopPropagation()}
          ref={ref}
        >
          <motion.h2>{activelight.label}</motion.h2>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function useClickOutsideExpandedLight() {
  const { setActiveLight } = useActiveLight();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    function handleClickOutside(e: globalThis.MouseEvent) {
      const target = e.target as Node;
      if (ref.current && target && !ref.current.contains(target)) {
        setActiveLight(null);
      }
    }

    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setActiveLight]);

  return ref;
}
