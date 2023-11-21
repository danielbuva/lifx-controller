import type { ReactNode } from "react";
import { motion } from "framer-motion";

import { cn } from "../../../lib/utils";

import useSystemTheme from "../../../hooks/useSystemTheme";

type GroupCardProps = {
  header: ReactNode;
  lights: ReactNode[];
};

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.1,
    },
  },
};

export default function GroupCard({ header, lights }: GroupCardProps) {
  const theme = useSystemTheme();
  return (
    <motion.div
      animate="visible"
      className={cn(
        "h-80 w-80 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-md, overflow-hidden",
        {
          "shadow-[rgba(255,_255,_255,_0.15)_1px_2px_5px_1px,_rgba(255,_255,_255,_0.05)_1px_2px_5px_1px]":
            theme === "dark",
        }
      )}
      initial="hidden"
      variants={container}
    >
      {header}
      {lights}
    </motion.div>
  );
}
