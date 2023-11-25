import type { GroupInfo } from "@server/types";
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

export default function Groups({
  iniitalItems,
}: {
  iniitalItems: GroupInfo[];
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
              return <GroupLightCard key={light.id} light={light} />;
            })}
          />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
