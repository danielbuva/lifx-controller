import { Reorder } from "framer-motion";
import { useLightsData } from "../../hooks/get";
import { colorFromHsbk } from "../../lib/utils";
import Group, { GroupHeader, Light } from "./group";
import { useState } from "react";
import type { LightsResult } from "../../lib/types";
import useSystemTheme from "../../hooks/useSystemTheme";
import { twMerge } from "tailwind-merge";

export default function LightList() {
  const { data } = useLightsData();

  if (!data) return null;

  return <Groups iniitalItems={data} />;
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
          <Group
            header={<GroupHeader name={item.groupName} />}
            lights={item.lights.map((light) => {
              return (
                <Light
                  key={light.id}
                  color={colorFromHsbk(light.color)}
                  label={light.label}
                />
              );
            })}
          />
        </Reorder.Item>
      ))}
    </Reorder.Group>
  );
}
