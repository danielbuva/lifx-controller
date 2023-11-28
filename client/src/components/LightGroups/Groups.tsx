import useLifxState from "@/hooks/useLifxState";

import GroupCard from "./GroupCard";
import GroupCardHeader from "./GroupCard/GroupCardHeader";
import { GroupLightCard } from "./GroupCard/GroupLightCard";

export default function Groups() {
  const { lifxState } = useLifxState();

  return (
    <div className="flex gap-4">
      {lifxState.map((group) => (
        <GroupCard
          key={group.groupId}
          header={
            <GroupCardHeader name={group.groupName} power={group.power} />
          }
          lights={group.lights.map((light) => {
            return <GroupLightCard key={light.id} light={light} />;
          })}
        />
      ))}
    </div>
  );
}
