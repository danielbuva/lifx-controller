import { itemVariant } from "@/components/LifxRemote/Groups/GroupCard/utils";
import type { HSL } from "@/lib/types";
import { cn } from "@/lib/utils";
import type { Power } from "@server/types";
import { motion } from "framer-motion";
import { type MouseEvent, useState } from "react";

export default function Switch({
  hsl: { hue, saturation, lightness },
  size = "md",
  power,
  toggle,
}: {
  hsl: HSL;
  size?: "sm" | "md";
  power: Power;
  toggle: () => Promise<void>;
}) {
  const [isOnCooldown, setIsOnCooldown] = useState(false);
  const handleToggle = async (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!isOnCooldown) {
      setIsOnCooldown(true);
      await toggle();

      setTimeout(() => setIsOnCooldown(false), 1000);
    }
  };

  return (
    <motion.div
      className={cn(
        "h-7 w-14 justify-start rounded-full flex items-center box-border p-[2px] cursor-pointer transition-all-[0.3s] select-none",
        {
          "justify-end": power === "on",
          "h-8 w-16": size === "md",
          "cursor-wait": isOnCooldown,
        }
      )}
      style={{
        backgroundColor:
          power === "on"
            ? `hsl(${hue}, ${saturation - 30}%, ${lightness}%)`
            : `hsl(${hue}, ${saturation - 30}%, ${lightness - 10}%)`,
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
            backgroundColor:
              power === "on"
                ? `hsl(${hue}, ${saturation}%, ${lightness}%)`
                : `hsl(${hue}, ${saturation}%, ${lightness - 10}%)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
