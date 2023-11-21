import { type MouseEvent, ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";
import useSystemTheme from "../../hooks/useSystemTheme";
import { useToggle } from "../../hooks/post";

const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const item = {
  hidden: { y: 30, opacity: 0.01 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

type GroupProps = {
  header: ReactNode;
  lights: ReactNode[];
};

export default function Group({ header, lights }: GroupProps) {
  const theme = useSystemTheme();
  return (
    <motion.div
      animate="visible"
      className={cn(
        "h-80 w-80 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-md",
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

export function GroupHeader({
  groupId,
  name,
}: {
  groupId: string;
  name: string;
}) {
  return (
    <div className="flex flex-row justify-between bg-slate-600 p-4 rounded-tl-md rounded-tr-md">
      <motion.h2
        className="text-xl font-semibold text-white"
        variants={item}
      >
        {name}
      </motion.h2>
      <Switch color={{ hue: 0, saturation: 0 }} power="on" id={groupId} />
    </div>
  );
}

function Switch({
  color,
  size = "md",
  id,
  power,
}: {
  color: { hue: number; saturation: number };
  size?: "sm" | "md";
  id: string;
  power: "on" | "off";
}) {
  const [isOn, setIsOn] = useState(power === "on");
  const [isOnCooldown, setIsOnCooldown] = useState(false);
  const togglePower = useToggle();
  const handleToggle = (e: MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (!isOnCooldown) {
      setIsOn(!isOn);
      setIsOnCooldown(true);
      togglePower(id);

      setTimeout(() => {
        setIsOnCooldown(false);
      }, 1000); // Cooldown for 1 second
    }
  };
  const { hue, saturation } = color;
  return (
    <motion.div
      className={cn(
        "h-7 w-14 justify-start rounded-full flex items-center box-border px-[1px] cursor-pointer transition-all-[0.3s] select-none",
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
      variants={item}
    >
      <motion.div
        layout
        className={cn(
          "h-[26px] w-[26px] rounded-full grid items-center justify-center bg-white overflow-hidden",
          { "h-[30px] w-[30px]": size === "md" }
        )}
      >
        <div
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

export function Light({
  color,
  label,
  id,
  power,
}: {
  color: { hue: number; saturation: number };
  label: string;
  id: string;
  power: "on" | "off";
}) {
  return (
    <div className="p-4 flex w-full justify-between">
      <motion.p variants={item}>{label}</motion.p>
      <Switch size="sm" color={color} power={power} id={id} />
    </div>
  );
}
