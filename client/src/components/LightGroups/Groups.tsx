import useLifxState from "@/hooks/useLifxState";

import GroupCard from "./GroupCard";
import GroupCardHeader from "./GroupCard/GroupCardHeader";
import { GroupLightCard } from "./GroupCard/GroupLightCard";

export default function Groups() {
  const { lifxState } = useLifxState();

  console.log("lifxstate: ", lifxState[0]?.lights[1]?.power);

  return (
    <div className="flex gap-4">
      {lifxState.map((item) => (
        <GroupCard
          key={item.groupId}
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
      ))}
    </div>
  );
}
