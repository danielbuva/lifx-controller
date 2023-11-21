import { Reorder } from "framer-motion";
import { useLightsData } from "../../hooks/get";
import GroupCard, { GroupCardHeader, GroupCardLight } from "./group";
import { useState } from "react";
import type { Light, LightsResult } from "../../lib/types";
import useSystemTheme from "../../hooks/useSystemTheme";
import { twMerge } from "tailwind-merge";
import { LightContext } from "../../hooks/useActiveLight";
import ExpandedLight from "../ExpandedLight";

export default function LightGroups() {
  const [activelight, setActiveLight] = useState<Light | null>(null);
  const { data } = useLightsData();

  if (!data) return null;

  return (
    <LightContext.Provider value={{ activelight, setActiveLight }}>
      <Groups iniitalItems={data} />
      <ExpandedLight />
    </LightContext.Provider>
  );
}

function Groups({
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
                groupId={item.groupId}
                name={item.groupName}
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
