import { type MouseEvent, useState } from "react";

import { motion } from "framer-motion";

import { itemVariant } from "../LightGroups/GroupCard/utils";
import { Power } from "../../lib/types";
import { cn } from "../../lib/utils";

export default function Switch({
  color: { hue, saturation },
  size = "md",
  power,
  toggle,
}: {
  color: { hue: number; saturation: number };
  size?: "sm" | "md";
  power: Power;
  toggle: () => void;
}) {
  const [isOn, setIsOn] = useState(power === "on");
  const [isOnCooldown, setIsOnCooldown] = useState(false);
  const handleToggle = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!isOnCooldown) {
      setIsOn(!isOn);
      setIsOnCooldown(true);
      toggle();

      setTimeout(() => {
        setIsOnCooldown(false);
      }, 1000);
    }
  };
  return (
    <motion.div
      className={cn(
        "h-7 w-14 justify-start rounded-full flex items-center box-border p-[2px] cursor-pointer transition-all-[0.3s] select-none",
        {
          "justify-end": isOn,
          "h-8 w-16": size === "md",
          "cursor-wait": isOnCooldown,
        }
      )}
      style={{
        backgroundColor: isOn
          ? `hsl(${hue}, ${saturation - 30}%, 50%)`
          : `hsl(${hue}, ${saturation - 30}%, 40%)`,
      }}
      onClick={handleToggle}
      variants={itemVariant}
    >
      <motion.div
        className={cn(
          "h-[25px] w-[25px] rounded-full grid items-center justify-center bg-white overflow-hidden",
          { "h-[29px] w-[29px]": size === "md" }
        )}
        layout
        transition={{
          type: "spring",
          stiffness: 700,
          damping: 35,
        }}
      >
        <motion.div
          className={cn("h-5 w-5 rounded-full", {
            "h-6 w-6": size === "md",
          })}
          style={{
            backgroundColor: isOn
              ? `hsl(${hue}, ${saturation}%, 50%)`
              : `hsl(${hue}, ${saturation}%, 40%)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
