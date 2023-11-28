import { motion } from "framer-motion";
import type { ReactNode } from "react";

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
  return (
    <motion.div
      className="h-80 w-80 shadow-theme rounded-md overflow-hidden bg-theme"
      animate="visible"
      initial="hidden"
      variants={container}
    >
      {header}
      {lights}
    </motion.div>
  );
}
