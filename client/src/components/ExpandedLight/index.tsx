import Switch from "@/components/styled/Switch";
import { useToggle } from "@/hooks/post";
import useActiveLight from "@/hooks/useActiveLight";
import { hsbkToHsl } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";

const expanded = {
  left: { x: -90 },
  origin: { x: 0, y: 0, transition: { delay: 0.6 } },
  right: { x: 90 },
};

export default function ExpandedLight() {
  const { activelight } = useActiveLight();
  const ref = useClickOutsideExpandedLight();
  const toggle = useToggle("id");
  return (
    <AnimatePresence mode="wait">
      {activelight && (
        <motion.div
          className="absolute w-3/5 h-2/4 flex border-2 bg-theme p-6 overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          ref={ref}
          initial={{ opacity: 0, scale: 0, y: -100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, transition: { delay: 0.5 } }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-full flex justify-between">
            <motion.h2
              animate="origin"
              initial="left"
              exit="left"
              variants={expanded}
            >
              {activelight.label}
            </motion.h2>
            <motion.div
              animate="origin"
              initial="right"
              exit="right"
              variants={expanded}
            >
              <Switch
                color={hsbkToHsl(activelight.color)}
                power={activelight.power}
                toggle={() => toggle(activelight.id)}
              />
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function useClickOutsideExpandedLight() {
  const { setActiveLight } = useActiveLight();
  const ref = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    (e: globalThis.MouseEvent) => {
      const target = e.target as Node;
      if (ref.current && target && !ref.current.contains(target)) {
        setActiveLight(null);
      }
    },
    [setActiveLight]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setActiveLight, handleClickOutside]);

  return ref;
}
