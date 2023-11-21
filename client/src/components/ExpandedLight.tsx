import { AnimatePresence, motion } from "framer-motion";
import useActiveLight from "../hooks/useActiveLight";
import { useCallback, useEffect, useRef } from "react";
import { hsbkToHsl } from "../lib/utils";
import Switch from "./styled/Switch";
import { useToggle } from "../hooks/post";

export default function ExpandedLight() {
  const { activelight } = useActiveLight();
  const ref = useClickOutsideExpandedLight();
  const toggle = useToggle("id");
  return (
    <AnimatePresence mode="wait">
      {activelight && (
        <motion.div
          className="absolute w-3/5 h-2/4 flex border-2 bg-theme"
          onClick={(e) => e.stopPropagation()}
          ref={ref}
          initial={{ opacity: 0, scale: 0, y: -100 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <motion.h2>{activelight.label}</motion.h2>
          <Switch
            color={hsbkToHsl(activelight.color)}
            power={activelight.power}
            toggle={() => toggle(activelight.id)}
          />
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
