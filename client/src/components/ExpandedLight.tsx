import { AnimatePresence, motion } from "framer-motion";
import useActiveLight from "../hooks/useActiveLight";
import { useCallback, useEffect, useRef } from "react";
import { Switch } from "./LightGroups/group";
import { hsbkToHsl } from "../lib/utils";

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
          <Switch
            color={hsbkToHsl(activelight.color)}
            id={activelight.id}
            power={activelight.power}
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
