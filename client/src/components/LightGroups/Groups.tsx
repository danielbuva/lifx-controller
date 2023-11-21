import { Reorder } from "framer-motion";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import useSystemTheme from "../../hooks/useSystemTheme";

import GroupCard from "./GroupCard";
import GroupCardHeader from "./GroupCard/GroupCardHeader";

import type { LightsResult } from "../../lib/types";
import { GroupCardLight } from "./GroupCard/GroupCardLight";

export default function Groups({
  iniitalItems,
}: {
  iniitalItems: Awaited<LightsResult>;
}) {
  const [items, setItems] = useState(iniitalItems);
  const theme = useSystemTheme();

  return (
    <Reorder.Group
      className="flex gap-4"
      values={items}
      onReorder={setItems}
      axis="x"
    >
      {items.map((item) => (
        <Reorder.Item
          className={twMerge(
            theme === "dark" && "bg-black",
            theme === "light" && "bg-white"
          )}
          key={item.groupId}
          value={item}
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
