import ExpandedLight from "@/components/LifxRemote/ExpandedLight";
import PresetsCard from "@/components/LifxRemote/PresetsCard";
import LifxStateProvider from "@/components/wrappers/LifxStateProvider";
import PresetsProvider from "@/components/wrappers/PresetsProvider";

import Groups from "./Groups";

export default function LifxRemote() {
  return (
    <LifxStateProvider>
      <Groups />
      <PresetsProvider>
        <ExpandedLight />
        <PresetsCard />
      </PresetsProvider>
    </LifxStateProvider>
  );
}
