import type { ReactNode } from "react";
import { motion } from "framer-motion";

type GroupCardProps = {
  header: ReactNode;
  lights: ReactNode[];
};

export default function GroupCard({ header, lights }: GroupCardProps) {
  return (
    <motion.div className="h-80 w-80 shadow-theme rounded-md overflow-hidden bg-theme">
      {header}
      {lights}
    </motion.div>
  );
}
