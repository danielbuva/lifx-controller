import { useLightsData } from "../../hooks/get";
import { colorFromHsbk } from "../../lib/utils";
import Group, { GroupHeader, Light } from "./group";

export default function LightList() {
  const { data } = useLightsData();

  if (!data) return null;

  return (
    <div className="flex gap-4">
      {data.map((item) => (
        <Group
          key={item.groupId}
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
      ))}
    </div>
  );
}
