import { lights } from "@/lib/elysia";
import { Reorder } from "framer-motion";
import { useState } from "react";

import GroupCard from "./GroupCard";
import GroupCardHeader from "./GroupCard/GroupCardHeader";
import { GroupLightCard } from "./GroupCard/GroupLightCard";

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

export default function Groups() {
  const [items, setItems] = useState(lights);

  if (!items) return null;

  return (
    <Reorder.Group
      className="flex gap-4"
      values={items}
      onReorder={setItems}
      axis="x"
    >
      {items.map((item) => (
        <Reorder.Item
          key={item.groupId}
          value={item}
          animate="visible"
          initial="hidden"
          variants={container}
        >
          <GroupCard
            header={
              <GroupCardHeader
                groupName={item.groupName}
                name={item.groupName}
                power={item.power}
              />
            }
            lights={item.lights.map((light) => {
              return <GroupLightCard key={light.id} light={light} />;
            })}
          />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
