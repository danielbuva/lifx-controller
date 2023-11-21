import { Reorder } from "framer-motion";
import { useState } from "react";

import GroupCard from "./GroupCard";
import GroupCardHeader from "./GroupCard/GroupCardHeader";

import type { LightsResult } from "../../lib/types";
import { GroupCardLight } from "./GroupCard/GroupCardLight";

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

export default function Groups({
  iniitalItems,
}: {
  iniitalItems: Awaited<LightsResult>;
}) {
  const [items, setItems] = useState(iniitalItems);

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
              return <GroupCardLight key={light.id} light={light} />;
            })}
          />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
