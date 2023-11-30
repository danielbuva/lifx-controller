import GroupCard from "@/components/LifxRemote/Groups/GroupCard";
import GroupCardHeader from "@/components/LifxRemote/Groups/GroupCard/GroupCardHeader";
import { GroupLightCard } from "@/components/LifxRemote/Groups/GroupCard/GroupLightCard";
import useLifxState from "@/hooks/useLifxState";

export default function Groups() {
  const { lifxState } = useLifxState();

  return (
    <div className="flex gap-4">
      {lifxState.map((group, groupIndex) => (
        <GroupCard
          key={group.groupId}
          header={
            <GroupCardHeader name={group.groupName} power={group.power} />
          }
          lights={group.lights.map((light, lightIndex) => (
            <GroupLightCard
              key={light.id}
              light={light}
              groupIndex={groupIndex}
              lightIndex={lightIndex}
            />
          ))}
        />
      ))}
    </div>
  );
}
